## Proxifier Rules

Rules for proxifier based on [lhie1/Rules][Rules].

### Features in the Fork

More `Application/PROCESS-NAME` rules for macOS apps.

Blacklist from [gfwlist][gfwlist] are added.

China IP list from [17mon/china_ip_list][china_ip_list] based on routing tables.

URL related rules are dropped cause Proxifier doesn't support it. Luckily, these
rules are used for redirection and ads block only.

### How to Contribute
Edit the source file named `proxifier/Proxifier.ppx`. `Proxifer.ppx` under project root
directory is used for release only. Besides, `Proxifier.ppx` under project root is
compressed to speedup config loading.

### Todo
- [x] Merge rules from [gfwlist][gfwlist]
- [x] Use [17mon/china_ip_list][china_ip_list] instead of the delegated APNIC list
- [x] Diff `*.ppx` within `proxifier/` as text, treat released `*.ppx` as binary
- [ ] Merge rules for Windows apps from [Jamesits/proxifier-profiles][jamesits-rules]
- [ ] Merge China direct domains from [felixonmars/dnsmasq-china-list][dnsmasq-china-list]
    (maybe not a good idea)

### F.A.Q.
#### Proxy Rules doesn't Work on macOS
Proxifier macOS may have some problem handling DNS pollution.
Set a clean DNS in your Network Setting.

#### Why do you use Proxifier instead of Surge?

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
| Config Import/RULESET | ❌ | ❌ | ✅ |
| **Combination Logical** | ✅ | ❌ | ✅ |
| Price | [¥141.55 on lizhi.io][proxifier-special-offer]  | $49.99 for 1 license | $49.99 for 1 license |
| Problems | DNS on macOS | Unknow process, bridged requirement for VM in Enhanced Mode | Not sure the problems from 2 are fixed or not |

At last, I'm poor and not that stupid to spend ￥100 just for a watermelon, **for the 2nd time**.

### Credit
- [lhie1/Rules][Rules]
- [Proxifier Documentation][proxifier-doc]
- [gfwlist][gfwlist]
- [17mon/china_ip_list][china_ip_list]

### License

Just non-commercial.

[Rules]: https://github.com/lhie1/Rules
[gfwlist]: https://github.com/gfwlist/gfwlist
[china_ip_list]: https://github.com/17mon/china_ip_list
[jamesits-rules]: https://github.com/Jamesits/proxifier-profiles
[dnsmasq-china-list]: https://github.com/felixonmars/dnsmasq-china-list
[proxifier-doc]: http://www.proxifier.com/docs/mac-v2/
[proxifier-special-offer]: https://item.taobao.com/item.htm?id=535723275520
