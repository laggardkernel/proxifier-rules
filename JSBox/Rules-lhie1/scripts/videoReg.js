module.exports = {
    Netflix: /(?=USER-AGENT,Argo\*,|DOMAIN-SUFFIX,netflix.com,|DOMAIN-SUFFIX,netflix.net,|DOMAIN-SUFFIX,nflxext.com,|DOMAIN-SUFFIX,nflximg.com,|DOMAIN-SUFFIX,nflximg.net,|DOMAIN-SUFFIX,nflxvideo.net,)[^\n]+/g,
    Spotify: /(?=PROCESS-NAME,Spotify,|DOMAIN-SUFFIX,spoti.fi,|DOMAIN-KEYWORD,spotify,)[^\n]+/g,
    YouTube: /(?=USER-AGENT,com.google.ios.youtube\*,|USER-AGENT,YouTube\*,|DOMAIN-SUFFIX,googlevideo.com,|DOMAIN-SUFFIX,youtube.com,)[^\n]+/g,
    MytvSUPER: /(?=DOMAIN-KEYWORD,nowtv100,|DOMAIN-KEYWORD,rthklive,|DOMAIN-SUFFIX,mytvsuper.com,|DOMAIN-SUFFIX,tvb.com,)[^\n]+/g,
    BBC: /(?=USER-AGENT,BBCiPlayer\*,|DOMAIN-KEYWORD,co.uk,|DOMAIN-KEYWORD,uk-live,|DOMAIN-SUFFIX,bbc.co,|DOMAIN-SUFFIX,bbc.com,)[^\n]+/g,
    LINE: /(?=DOMAIN-SUFFIX,lin.ee,|DOMAIN-SUFFIX,line.me,|DOMAIN-SUFFIX,line.naver.jp,|DOMAIN-SUFFIX,line-apps.com,|DOMAIN-SUFFIX,line-cdn.net,|DOMAIN-SUFFIX,line-scdn.net,|DOMAIN-SUFFIX,nhncorp.jp,|IP-CIDR,103.2.28.0\/22,|IP-CIDR,119.235.224.0\/21,|IP-CIDR,119.235.232.0\/23,|IP-CIDR,119.235.235.0\/24,|IP-CIDR,119.235.236.0\/23,|IP-CIDR,125.6.146.0\/24,|IP-CIDR,125.6.149.0\/24,|IP-CIDR,125.6.190.0\/24,|IP-CIDR,125.209.208.0\/20,|IP-CIDR,203.104.103.0\/24,|IP-CIDR,203.104.128.0\/20,|IP-CIDR,203.174.66.64\/26,|IP-CIDR,203.174.77.0\/24,)[^\n]+/g
}