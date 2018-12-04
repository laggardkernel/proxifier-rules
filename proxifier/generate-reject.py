#!/usr/bin/env python3
# vim: fileencoding=utf-8 fdm=indent sw=4 ts=4 sts=4

import inspect
import os
import shutil
import ipaddress

# https://stackoverflow.com/questions/3718657/how-to-properly-determine-current-script-directory
# detect the file location before any chdir command
# use realpath to resolve symlinks
filename = inspect.getframeinfo(inspect.currentframe()).filename
base_dir = os.path.dirname(os.path.abspath(filename))
project_dir = os.path.split(base_dir)[0]

rule_file = os.path.join(project_dir, "Auto", "REJECT.conf")


def cidr2iprange(cidr):
    if cidr.endswith("/32"):
        return cidr[:-3]

    # process cidr with host bits set
    r = ipaddress.ip_network(cidr, strict=False)
    # convert Network obj into string
    return "{0!s}-{1!s}".format(r[0], r[-1])


with open(rule_file, "r", encoding="utf-8") as f:
    output_processed = []
    output_unprocessed = []
    output_ip = []
    for line in f.readlines():
        processed_text = ""
        if line.startswith("DOMAIN-SUFFIX"):
            processed_text = [l.strip() for l in line.split(",")]
            processed_text = "*.{0};".format(processed_text[1])
            # discard domains with space
            if " " in processed_text:
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
                processed_text = cidr2iprange(processed_text)
            processed_text = "{0};".format(processed_text)
            output_ip.append(processed_text)
            continue
        elif line.startswith("//"):
            processed_text = line.strip("/").strip()
            processed_text = "\n<!-- {0} -->".format(processed_text)
        elif line.startswith("#"):
            processed_text = "\n{0}".format(line.strip())
        elif line.strip() != "":
            output_unprocessed.append(line.strip())
            continue
        else:
            continue

        output_processed.append(processed_text)

    output_dir = os.path.join(base_dir, "output")
    if os.path.lexists(output_dir):
        if os.path.isdir(output_dir):
            shutil.rmtree(output_dir)
        else:
            os.remove(output_dir)
    os.mkdir(output_dir)

    file_processed = os.path.join(output_dir, "reject-processed.txt")
    file_unprocessed = os.path.join(output_dir, "reject-unprocessed.txt")
    file_ip = os.path.join(output_dir, "reject-ip.txt")
    with open(file_processed, "w", encoding="utf-8") as f_out:
        # write with newline
        for item in output_processed:
            f_out.write("{}\n".format(item))
    if file_unprocessed:
        with open(file_unprocessed, "w", encoding="utf-8") as f_out:
            for item in output_unprocessed:
                f_out.write("{}\n".format(item))
    if file_ip:
        with open(file_ip, "w", encoding="utf-8") as f_out:
            for item in output_ip:
                f_out.write("{}\n".format(item))
