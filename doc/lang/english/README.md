#English READMe File:

# manual

### Introduction

This project was originally modified by Fork [scomper/surge.conf] (https://gist.github.com/scomper/915b04a974f9e11952babfd0bbb241a8).

---
* [Compatible](#application)
	* Surge
	* Shadowrocket
	* Quantumult
* [Available functions](#function)
* Import method
    * [URL](#remote-files)
    * [JSBox](#jsbox)
* [Certificate installation and trust](#mitm-1)
* [Android SSR ACL](#android-ssr-acl)
* [Browser Ads] (#browser-ads)
* [about] (#about)
* [Q&A](#qa)
* [client] (# client has r flag to indicate support for -ssr)
* [Tutorial / Description] (#Tutorial - Description)
* [Profile Sample] (#Profile Sample)
* [Acknowledgment] (#Acknowledgment)
* [License](#license)

---

### Application

Configuration | Source | Group
----|----|----
Rules | [Rules Channel](https://t.me/RuleNews) | [Rules](https://t.me/lhie1x)
Surge | [@lhie1](https://t.me/lhie1) | [Surge](https://t.me/loveapps)
Shadowrocket | [@lhie1](https://t.me/lhie1) | [Shadowrocket](https://t.me/ShadowrocketApp)
Quantumult | [@Jacky Y](https://t.me/WatanabeMayu) | [Quantumult](https://t.me/quantumultapp)

---

### Function
- [x] automatic proxy / global proxy
- [x] Resolve possible interference from local DNS
- [x] Solving some website jump issues
- [x] can break through some intranet restrictions (company, school)
- [x] Intercept part mining JS plugin
- [x] Intercepting behavior analysis of commonly used applications and web pages
- [x] Block data statistics for popular apps and web pages
- [x] Block privacy tracking for popular apps and web pages
- [x] Interceptee hijacking of major shopping sites
- [x] Block Content Security Policy hijacking
- [x] Intercept CNNIC Root Certificate Hijacking
- [x] Block some apps’ startup ads
- [x] Block traffic statistics from some operators’ hijacked webpages
- [x] Block some of the floating ball ads popped up by the operator hijacking webpage
- [x] Block common video ads
- [x] Block common website ads, other streaming website ads
- [x] Shielding Falun Gong and other anti-China forces websites
- [x] All domestic websites are connected in a straight line
- [x] Apple Service Acceleration (App Store, Apple Music, Apple Streaming, iCloud Backup, iCloud Drive, iTunes, etc.)
- [x] Accelerated foreign websites (Google/Youtube/Twitter/Facebook/instagram/wikipedia/Github, etc.)

---

### JSBox

````
Surge：https://xteko.com/redir?name=Rules-lhie1&url=https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/.output/Rules-lhie1.box
````

---

### Remote Files

````
Shadowrocket：https://raw.githubusercontent.com/lhie1/Rules/master/Shadowrocket.conf


Quantumult_Filter：https://raw.githubusercontent.com/lhie1/Rules/master/Quantumult/Quantumult.conf

Quantumult_Rejection：https://raw.githubusercontent.com/lhie1/Rules/master/Quantumult/Quantumult_URL.conf
````

---

### MitM

Introduction: MitM (Man-in-the-middle attack, used to decrypt HTTPS traffic)

iOS：
````
All systems with iOS 9 or higher need to trust the certificate in the machine after installing the certificate to make the certificate valid.

1. Installation:
*  Surge: Configuration - Edit Configuration - HTTPS Decryption - Install Certificate
*  Shadowrocket: Settings - Certificate - Install Certificate
*  Quantumult: Settings - HTTPS - HTTPS Decryption

2. Trust:
Settings - General - About this machine - Certificate trust settings - Trust

Note: You only need to install and trust once. Using the JSBox upgrade rules does not affect the certificate.
Note: Do not generate a new certificate by yourself. As a result, the rule does not match the certificate, which causes the MitM to fail and directly fails to load. After the rule is exported,it can be installed and trusted. If you accidentally click it, re-run the JSBox export rules to install them correctly.
````

macOS：

![](https://raw.githubusercontent.com/lhie1/Rules/master/images/macOS_MitM.jpg)

---

### About

Rules（(rule discussion / communication流）：[https://telegram.me/lhie1x](https://telegram.me/lhie1x)

Rule update notification (new feature / tutorial / description): [http://t.me/RuleNews](http://t.me/RuleNews)

---

### Android SSR ACL
Project homepage：https://github.com/ACL4SSR/ACL4SSR

````
1. banAD.acl (default proxy) to advertising + LAN direct connection + domestic IP segment direct connection + domestic common domain name direct connection + foreign agent
https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/banAD.acl

2. gfwlist-banAD.acl (default direct connection) to advertising + LAN direct connection + foreign gfwlist list agent
https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/gfwlist-banAD.acl

3. onlybanAD.acl (default proxy) to advertising + LAN direct connection + global proxy
https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/onlybanAD.acl

4. fullgfwlist.acl (default direct) foreign gfwlist list proxy, no advertising, no whitelist (original SS can directly copy file content)
https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/fullgfwlist.acl

5. backcn-banAD.acl (default direct connection) to advertising + domestic IP segment agent + domestic common domain name agent + LAN direct connection + foreign direct connection
https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/backcn-banAD.acl
````
---

### Browser Ads
````
Adguard：https://adguard.com/en/welcome.html
````
---

### Q&A

#### Surge Open sharing mode
````
Surge has added a proxy sharing mode that only needs to be turned on to allow other devices on the Wi-Fi network to access the network through this iPhone proxy.

Open Allow Wi-Fi Access in the advanced settings, or modify the configuration file directly, add a line of parameters allow-wifi-access = true

Devices in other Wi-Fi network environments can enter the IP address and port number of the Surge device that has the shared proxy enabled. (Tip: The Surge Log can see the IP address and listening port of the local machine after being turned on.) Fill in the IP address to You need to share the Wi-Fi information of the device in the HTTP proxy.
````

#### 🍃 Proxy & 🍂 Domestic & ☁️ Others & 🍎 Only
````
🍃 Proxy：Controls foreign traffic; 🚀 Direct - Direct connection, non-accessible external network; Proxy server - Accessible external network

🍂 Domestic: Control domestic traffic; 🚀 Direct - Smart Offload (Pac); 🍃 Proxy - Global Agent

☁️ Others: Control the flow of non-domestic IP outside the list of rules

🍎 Only: Controls Apple's traffic; if some of Apple's services are difficult to connect directly, setting it as a proxy may improve some issues: 🍎 Only - Proxy

Recommendations: 🍃 Proxy - Proxy Server; 🍂 Domestic - 🚀 Direct ; ☁️ Others - 🍃 Proxy ; 🍎 Only - 🚀 Direct / Proxy Server
````

#### 🏃 Auto
````
The test results are for reference only and cannot detect the bandwidth of the VPS.

Please do not use google.com as the test target, which may cause the proxy server ip to be blacklisted, resulting in various operations requiring a verification code.
The target URL is fairly fair to all policies, so choose a URL with nodes around the world like gstatic.com as the test target.
Author's suggestion: http://www.gstatic.com/generate_204
````

#### Ad blocking is not in effect
````
Most ads are cached locally when Surge/Shadowrocket is not enabled. Ad blocking is not effective immediately. Generally, the cache is cleared. Some applications need to be uninstalled and reloaded.
````

#### Power consumption
````
When such an application is turned on, since all network communication is taken over by such software, all network communication power consumption (such as WiFi, 4G) is calculated in such applications, so that such software is in the electricity statistics. The proportion is very high.
But in fact, turning on such apps does not have a significant impact on power consumption.
````

#### Does the number of rules affect power consumption, memory, and speed?
````
No, such an application will generate a search tree each time the rule is loaded. It can be understood as a finite state machine DFA with a host name from the back to the front, not a line-by-line match, and there is a match for each match. Hash cache. In other words, the rule of 2000 rows and the rule of 50 rows are time complexity O(1) of the same order of magnitude.
````

#### Surge 2 Prompt to activate too many devices
````
Surge 2's anti-piracy policy is a single purchase, in the last 180 days, if more than 10 devices have been activated, the new device will be refused (the family share will share the purchaser's account 10 times limit). If you have a special situation, please send an email to the author to reproduce.
````

#### Surge 3 Too many prompt rules
````
Since most of the rules I maintain are used to block ads, they can't be streamlined. If you mind, you can turn off the blocking ads feature when generating rules through JSBox. If you don't mind, please go to More - Warnings and turn off the warning.
````

#### What is MitM?
````
Used to decrypt HTTPS traffic (ie Man-in-the-middle attack referred to as MitM).
````

#### Why do I need to enable the MitM function?
````
Blocking some ads (such as Sina Weibo's launch ads) requires decrypting their HTTPS traffic to get ad requests and block them.
````

#### Open some applications (eg: know, instantly, etc.) can't connect?
````
Check the certificate, make sure the certificate is installed and trusted.
````

#### Why is the Surge/Shadowrocket/Quantumult speed difference so large?
````
Surge is the time to return the http response header packet from the target policy

Shadowrocket supports two speed measurement methods (ICMP/TCP). The default is ICMP mode (ie, Ping). This method is generally used to test whether this server is online.

Quantumult is the time to return the http response header packet from the target policy

Accuracy: Surge -> Quantumult -> Shadowrocket
````

#### Why can't Surge block Youku ads?
````
In order to prevent the ad request from being blocked, Youku is forced to access it through the proxy. Other similar applications use HTTP first packet identification, so the request is also recognized in TUN mode. Surge is a full HTTP Proxy Server and does not attempt HTTP parsing in TUN mode. So this request will not be recognized. However, other similar applications use a problem when using Keep-Alive for HTTP requests, and subsequent requests are not recognized.
````

#### What is the difference between the three?
````
The functions are similar, and the rules based on rules can achieve automatic shunt/ad blocking.
````

#### Does MitM affect security (shopping/online/privacy) or performance/speed?
````
MitM only decrypts HTTPS traffic for addresses in the default Hostname list (open/open source), without security issues and with little impact on performance/speed.
MitM：https://zh.wikipedia.org/wiki/中间人攻击
Surge MitM：https://medium.com/@Blankwonder/5281d8ace79d
````

#### Does the usage rule affect the free flow (eg Dawang card)?
````
My rules are automatically offloaded by default (domestic direct/foreign agent), as long as you don't change the rules or change the proxy mode, it will not affect the flow-free effect.

Suggestions (other random):

🍂 Domestic - DIRECT

☁ Other - DIRECT
````

#### Client (with "R" sign indicating support for SSR):
````
• iOS

Surge: https://appsto.re/cn/D0Q_9.i

Shadowrocket (R): https://appsto.re/cn/UDjM3.i

Quantumult(R): https://itunes.apple.com/us/app/quantumult/id1252015438?mt=8
        
• Android

ShadowsocksR (R): http://omgib13x8.bkt.clouddn.com/ssr-android.apk

Postern (R): http://www.tunnel-workshop.com

• macOS

ShadowsocksX: http://omgib13x8.bkt.clouddn.com/ss-mac.zip

ShadowsocksX-R (R): http://omgib13x8.bkt.clouddn.com/ssr-mac.dmg
        
Flora: https://github.com/huacnlee/flora-kit

Specht Lite: https://github.com/zhuhaow/SpechtLite/releases
        
Surge: http://nssurge.com

• Windows

Shadowsocks: http://omgib13x8.bkt.clouddn.com/ss-win.zip
    
ShadowsocksR (R): http://omgib13x8.bkt.clouddn.com/ssr-win.7z

• Router firmware

Old Maozi: http://www.right.com.cn/forum/thread-161324-1-1.html

Merlin: http://koolshare.cn/thread-133873-1-1.html
````

---

#### Tutorial / Description:
````
Surge for iOS: https://medium.com/@scomper/a1533c10e80b
    
Surge for macOS: https://medium.com/@scomper/bb7cf735b1b8
    
Shadowrocket for iOS: http://matrix.sspai.com/p/c113cba0
    
SSR for Windows: https://ocvpn.wordpress.com/2016/10/15/shadowsocksr-for-windows setup tutorial
    
SSR for Android: https://yhyy135.github.io/how-to-use-ssr-android/
````

---

### Acknowledgement
* @Eval](https://twitter.com/OAuth4)
* @Scomper](https://medium.com/@scomper)
* @Neurogram](http://www.taguage.com/user?id=181456)
* @suisr9255
* @Hackl0us
* @unknownTokyo
* @Jacky Y
* @Fndroid

---

### License
* Can be copied, forwarded, but the original author information must be provided, and the project cannot be used for commercial purposes.
