#!/usr/bin/env python3
# vim: fileencoding=utf-8 fdm=indent sw=4 ts=4 sts=4

import argparse
import inspect
import ipaddress
import logging
import os
import shutil

# https://stackoverflow.com/questions/3718657/how-to-properly-determine-current-script-directory
# detect the file location before any chdir command
# use realpath to resolve symlinks
FILENAME = inspect.getframeinfo(inspect.currentframe()).filename
BASE_DIR = os.path.dirname(os.path.abspath(FILENAME))
PROJECT_ROOT = os.path.split(BASE_DIR)[0]
CWD = os.getcwd()

rule_file = os.path.join(PROJECT_ROOT, "Surge3", "Reject.list")


class Parser:
    def __init__(self, inputs, input_dir, output_dir=None):
        # logging into console
        self.logger = logging.getLogger(self.__class__.__name__)
        # Avoid duplicate logs in console by disabling propagation
        self.logger.setLevel("DEBUG")
        self.logger.propagate = False
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        console_handler.setFormatter(formatter)

        self.logger.addHandler(console_handler)

        self.inputs = inputs
        self.input_dir = input_dir
        self.output_dir = output_dir

        if output_dir is None:
            self.output_dir = os.path.join(CWD, "output")

        # Available actions
        # <Action type="Block"/>
        # <Action type="Direct"/>
        # <Action type="Proxy">100</Action>
        self.rule_actions = {
            "block": '<Action type="Block"/>',
            "direct": '<Action type="Direct"/>',
            "proxy": '<Action type="Proxy">100</Action>',
        }
        self.rule_target_template = """        <Rule enabled="true">
            <Name>{}</Name>
            <Targets>
{}
            </Targets>
            {}
        </Rule>
"""
        self.rule_application_template = """        <Rule enabled="true">
            <Name>{}</Name>
            <Applications>
{}
            </Applications>
            {}
        </Rule>
"""

    def setup(self):
        # output_dir = os.path.join(BASE_DIR, "output")
        if os.path.exists(self.output_dir):
            if os.path.isdir(self.output_dir):
                shutil.rmtree(self.output_dir)
            else:
                os.remove(self.output_dir)
        os.mkdir(self.output_dir)

        # self.file_parsed = open(os.path.join(self.output_dir, "parsed.txt"), "w")
        self.file_parsed = open(os.path.join(BASE_DIR, "proxifier.ppx"), "w")
        self.file_untouched = open(os.path.join(self.output_dir, "untouched.txt"), "w")

        with open(os.path.join(BASE_DIR, "snippets", "head.xml")) as f:
            self.file_parsed.write(f.read())

    def teardown(self):
        with open(os.path.join(BASE_DIR, "snippets", "tail.xml")) as f:
            self.file_parsed.write(f.read())

        self.file_parsed.close()
        self.file_untouched.close()

    def cidr2iprange(self, cidr):
        if cidr.endswith("/32"):
            return cidr[:-3]

        # process cidr with host bits set
        r = ipaddress.ip_network(cidr, strict=False)
        # convert Network obj into string
        return "{0!s}-{1!s}".format(r[0], r[-1])

    def stripped_len(self, values):
        # strip <!-- --> from list
        stripped_values = [_ for _ in values if not _.startswith("<!--")]
        return len(stripped_values)

    def parse_one(self, input_, decision="proxy"):
        decision = decision.lower()

        with open(input_, "r", encoding="utf-8") as f:
            rule_parsed = []
            rule_untouched = []
            rule_ip = []
            rule_process = []
            for line in f.readlines():
                processed_text = ""
                if line.startswith("DOMAIN-SUFFIX"):
                    processed_text = [l.strip() for l in line.split(",")]
                    processed_text = "*.{0};".format(processed_text[1])
                    # discard domains with space
                    if " " in processed_text or "_" in processed_text:
                        continue
                elif line.startswith("DOMAIN-KEYWORD"):
                    processed_text = [l.strip() for l in line.split(",")]
                    processed_text = "*{0}*;".format(processed_text[1])
                elif line.startswith("DOMAIN"):
                    processed_text = [l.strip() for l in line.split(",")]
                    processed_text = "{0};".format(processed_text[1])
                elif line.startswith("IP-CIDR"):
                    processed_text = [l.strip() for l in line.split(",")]
                    processed_text = processed_text[1]
                    if "/" in processed_text:
                        processed_text = self.cidr2iprange(processed_text)
                    processed_text = "{0};".format(processed_text)
                    rule_ip.append(processed_text)
                    continue
                elif line.startswith("PROCESS-NAME"):
                    processed_text = [l.strip() for l in line.split(",")][1]
                    # Quote process names with spaces
                    if " " in processed_text:
                        processed_text = '"{}"'.format(processed_text)
                    processed_text = "{0};".format(processed_text)
                    rule_process.append(processed_text)
                    continue
                elif line.startswith("# >"):
                    processed_text = line.strip("# >").strip()
                    processed_text = "<!-- {0} -->".format(processed_text)
                # Skip other comments
                # elif line.startswith("//"):
                #     processed_text = line.strip("/").strip()
                #     processed_text = "\n<!-- {0} -->".format(processed_text)
                # elif line.startswith("# "):
                #     processed_text = line.strip("# ").strip()
                #     processed_text = "\n{0}".format(line.strip())
                elif line.strip() != "":
                    rule_untouched.append(line.strip())
                    continue
                else:
                    continue

                rule_parsed.append(processed_text)

            # Write to file
            rule_name = os.path.basename(input_).rpartition(".")[0]

            # Skip rules only contain comments: MOO, YouTube Music
            if self.stripped_len(rule_parsed) or self.stripped_len(rule_ip):
                target_value = ""
                for item in rule_parsed:
                    target_value += " " * 16 + item + "\n"
                if len(rule_ip):
                    target_value += "\n"
                    for item in rule_ip:
                        target_value += " " * 16 + item + "\n"

                self.file_parsed.write(
                    self.rule_target_template.format(
                        rule_name, target_value, self.rule_actions[decision]
                    )
                )

            if len(rule_process):
                application_value = ""
                for item in rule_process:
                    application_value += " " * 16 + item + "\n"

                self.file_parsed.write(
                    self.rule_application_template.format(
                        rule_name + " (Process)",
                        application_value,
                        self.rule_actions[decision],
                    )
                )

            if len(rule_untouched):
                for item in rule_untouched:
                    self.file_untouched.write("{}\n".format(item))

    def parse(self):
        for decision, item in self.inputs:
            self.parse_one(os.path.join(self.input_dir, item), decision)

    def main(self):
        self.setup()
        self.parse()
        self.teardown()


def main():
    input_dir = os.path.join(PROJECT_ROOT, "Surge", "Surge 3", "Provider")
    inputs = [
        ("Proxy", "Media/Netflix.list"),
        ("Proxy", "Media/Spotify.list"),
        # AsianTV
        ("Direct", "Media/Bilibili.list"),
        ("Direct", "Media/iQiyi.list"),
        ("Direct", "Media/Letv.list"),
        ("Direct", "Media/MOO.list"),
        ("Direct", "Media/Tencent Video.list"),
        ("Direct", "Media/Youku.list"),
        # GlobalTV
        ("Proxy", "Media/ABC.list"),
        ("Proxy", "Media/Abema TV.list"),
        ("Proxy", "Media/Amazon.list"),
        ("Proxy", "Media/Apple News.list"),
        ("Proxy", "Media/Apple TV.list"),
        ("Proxy", "Media/Bahamut.list"),
        ("Proxy", "Media/BBC iPlayer.list"),
        ("Proxy", "Media/DAZN.list"),
        ("Proxy", "Media/Disney Plus.list"),
        ("Proxy", "Media/encoreTVB.list"),
        ("Proxy", "Media/Fox Now.list"),
        ("Proxy", "Media/Fox+.list"),
        ("Proxy", "Media/HBO.list"),
        ("Proxy", "Media/Hulu Japan.list"),
        ("Proxy", "Media/Hulu.list"),
        ("Proxy", "Media/Japonx.list"),
        ("Proxy", "Media/JOOX.list"),
        ("Proxy", "Media/KKBOX.list"),
        ("Proxy", "Media/KKTV.list"),
        ("Proxy", "Media/Line TV.list"),
        ("Proxy", "Media/myTV SUPER.list"),
        ("Proxy", "Media/Pandora.list"),
        ("Proxy", "Media/PBS.list"),
        ("Proxy", "Media/Pornhub.list"),
        ("Proxy", "Media/Soundcloud.list"),
        ("Proxy", "Media/ViuTV.list"),
        ("Proxy", "Media/YouTube Music.list"),
        ("Proxy", "Media/YouTube.list"),
        #
        ("Proxy", "Telegram.list"),
        ("Proxy", "Steam.list"),
        ("Proxy", "Speedtest.list"),
        ("Proxy", "PayPal.list"),
        ("Direct", "Microsoft.list"),
        ("Direct", "Media/Netease Music.list"),
        #
        ("Direct", "Special.list"),
        #
        ("Proxy", "Proxy.list"),
        ("Direct", "Domestic.list"),
        ("Direct", "Apple.list"),
    ]

    parser = Parser(inputs=inputs, input_dir=input_dir)
    parser.main()


if __name__ == "__main__":
    main()
