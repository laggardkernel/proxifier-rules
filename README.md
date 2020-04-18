# Proxifier Rules

Rules for proxifier based on [lhie1/Rules][Rules].

> A proxifier is a software program which can make other programs pass through a proxy server by intercepting and modifying their network requests.

## Proxifier

Raw files

- [Proxifier rule][proxifier-release]

### Anti DNS Pollution
**Warning**: "Detect DNS settings automatically" and "Resolve hostnames through
proxy" are not designed for handling DNS pollution. Please **use a clean DNS**.

[shawn1m/overture][overture] is recommended if you wanna setup a local
stub/forwarding DNS.
> overture, A customized DNS forwarder written in Go

Another setup with "dnsmasq/unbound + chinadns + dnsforwarder/cdns/..." is also
popular, and may be lighter than overture.

### Features
Default conf
- proxy: `socks5://127.0.0.1:1080`
- Proxy rule as the fallback rule

Optional rules, put at the top for quick switch
- Direct network tool or not? (`nslookup`, `dig`, `traceroute`, `mtr`, etc)

Direct rules
- Apple services
- Part of Google domains available in China
- Proxy client applications
- BT client applications
- Common domestic domains
- IRC domains from [rahatarmanahmed/irc-networks][irc-network-list]
- China IP list from [17mon/china_ip_list][china_ip_list] based on routing tables

Proxy rules
- Foreign IM applications
- Common foreign domains
- Top blocked domains
- Amazon IP
- Facebook IP
- Google IP
- Kakao Talk IP
- Potato Chat IP
- Telegram IP
- Blacklist from [gfwlist][gfwlist]

Block/Reject rules (Separated)
- Ads domains in video apps
- Huge list of ads domains
- China Railcom

URL related rules are dropped cause Proxifier doesn't support it. Luckily, these
rules are used for redirection and ads block only.

## Kitsunebi-Android, Mellow

Raw files

- [Kitsunebi-Android][kitsunebi-release]
- [Kitsunebi-Android Lite][kitsunebi-lite-release], without ad block
- [Mellow][mellow-release]
- [Mellow Lite][mellow-lite-release]

You need to change the proxy conf in the Mellow rule.

**Caveats**

- Rule syntax for Kitsunebi iOS and Android are different
- only `;` is supported as comment mark in Mellow
- only `#` is supported as comment mark in Kitsunebi-Android
- Unsupported rules in Mellow: USER-AGENT
- Unsupported rules in Kitsunebi-Android: Custom Endpoint, PROCESS-NAME, USER-AGENT, maybe IP-CIDR
- Conf in Mellow is case sensitive, but not in Kitsunebi-Android

## How to Contribute
Edit the source file named `proxifier/Proxifier.ppx`. `Proxifer.ppx` under project root
directory is used for release only. Besides, `Proxifier.ppx` under project root is
compressed to speedup config loading.

## Todo
- [x] Merge rules from [gfwlist][gfwlist]
- [x] Use [17mon/china_ip_list][china_ip_list] instead of the delegated APNIC list
- [x] Diff `*.ppx` within `proxifier/` as text, treat released `*.ppx` as binary
- [x] ~~Merge [Jamesits/proxifier-profiles][jamesits-rules]~~
    - Proxy client apps **ONLY**
    - All the other app specific rules are useless, since there's huge domain
	based rules already
- [x] Merge [felixonmars/dnsmasq-china-list][dnsmasq-china-list]
    - Merged Apple China domains
    - Merged Google China domains
    - Dropped China site domains cause it's so huge
- [x] Convert REJECT rules as confs for dnsmasq, unbound
- [x] Direct IRC connections cause proxy may close TCP connection after timeout

## F.A.Q.
### Proxy Rules doesn't Work on macOS
The DNS resolution feature from Proxifier macOS is not designed for handling DNS pollution.
There's performance issue in real use for handling DNS pollution. In case that
is causes problem for users, I disabled this feature in the config file.

Please set a clean DNS in your Network Setting.

### Why do you use Proxifier instead of Surge?

I used to be a user of Surge 2. I mainly used its *Enhanced Mode* to proxy
all the TCP connections. (UDP is not available until v2.5.3)

The rules from Proxifier seems to be more flexible for me, `port` nubmer rule is
supported, different kinds of rules could be chained together.
This combination logical is not available in Surge until *Surge 3*.

Besides, Surge 2 has some serious drawbacks/bugs in the *Enhanced Mode*:
- Virtual machines need to be configured in bridged mode.
- Many **unknown process** appearr in the monitor panel.

Another drawback of Surge is that, HTTP**S** rules could NOT be used for proxy.

| Rules Support | Proxifier | Surge 2 | Surge 3 |
| --- | --- | --- | --- |
| Domain | ✅ | ✅ | ✅ |
| Domain Suffix | ✅ | ✅ | ✅ |
| Application/PROCESS-NAME | ✅ | ✅ | ✅ |
| Port | ✅ (dst port) | ❌ | ✅ (in, dst port) |
| Header | ❌ | ✅ | ✅ |
| HTTP(S) Redirect, Reject | ❌ | ✅ | ✅ |
| HTTPS Proxy | ❌ | ❌ | ❌ |
| TCP | ✅ | ✅ | ✅ |
| UDP | ❌ | ✅ (added after v2.5.3) | ✅ |
| Proxy Chain | ✅ | ❌ | ❌ |
| Config Import/RULESET | ❌ | ❌ | ✅ |
| **Combination Logical** | ✅ | ❌ | ✅ |
| Price | [¥141.55 on lizhi.io][proxifier-special-offer]  | $49.99 for 1 license | $49.99 for 1 license |
| Problems | DNS on macOS | Unknow process, bridged requirement for VM in Enhanced Mode | Not sure the problems from 2 are fixed or not |

## Credit
- [Proxifier Documentation][proxifier-doc]
- [lhie1/Rules][Rules]
- [gfwlist][gfwlist]
- [cokebar/gfwlist2dnsmasq][gfwlist2dnsmasq]
- [17mon/china_ip_list][china_ip_list]
- [felixonmars/dnsmasq-china-list][dnsmasq-china-list]
- [rahatarmanahmed/irc-networks][irc-network-list]

## License

GNU General Public License v2.0

[proxifier-release]: https://github.com/laggardkernel/proxifier-rules/raw/master/proxifier.ppx
[kitsunebi-release]: https://github.com/laggardkernel/proxifier-rules/raw/master/kitsunebi-android/rule.conf
[kitsunebi-lite-release]: https://github.com/laggardkernel/proxifier-rules/raw/master/kitsunebi-android/rule-lite.conf
[mellow-release]: https://github.com/laggardkernel/proxifier-rules/raw/master/mellow/rule.conf
[mellow-lite-release]: https://github.com/laggardkernel/proxifier-rules/raw/master/mellow/rule-lite.conf

[Rules]: https://github.com/lhie1/Rules
[overture]: https://github.com/shawn1m/overture
[gfwlist]: https://github.com/gfwlist/gfwlist
[gfwlist2dnsmasq]: https://github.com/cokebar/gfwlist2dnsmasq
[china_ip_list]: https://github.com/17mon/china_ip_list
[irc-network-list]: https://github.com/rahatarmanahmed/irc-networks
[jamesits-rules]: https://github.com/Jamesits/proxifier-profiles
[dnsmasq-china-list]: https://github.com/felixonmars/dnsmasq-china-list
[proxifier-doc]: http://www.proxifier.com/docs/mac-v2/
[proxifier-special-offer]: https://item.taobao.com/item.htm?id=535723275520
