const app = require('scripts/app')

const FILE = 'data.js'

let screenHeight = $device.info.screen.height
const screenWidth = $device.info.screen.width

const iPhoneX = screenWidth == 375 && screenHeight == 812
if (iPhoneX) {
    screenHeight -= 48
}

let renderExtensionUI = function () {
    const host = $context.safari.items.location.hostname
    $ui.render({
        props: {
            title: "增加规则"
        },
        views: [{
            type: "scroll",
            props: {
                id: "mainScrollView",
                bgcolor: $color("#f0f5f5")
            },
            layout: $layout.fill,
            views: [{
                type: "label",
                props: {
                    text: "当前网页路径"
                },
                layout: (make, view) => {
                    make.width.equalTo(view.super)
                    make.left.equalTo(5)
                    make.height.equalTo(30)
                    make.top.equalTo(view.super.top).offset(10)
                }
            }, {
                type: "text",
                props: {
                    editable: false,
                    text: $context.safari.items.baseURI
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(5)
                    make.width.equalTo(view.super)
                    make.height.equalTo(60)
                }
            }, {
                type: "label",
                props: {
                    text: "规则匹配项"
                },
                layout: (make, view) => {
                    make.width.equalTo(view.super)
                    make.left.equalTo(5)
                    make.height.equalTo(30)
                    make.top.equalTo(view.prev.bottom).offset(10)
                }
            }, {
                type: "list",
                props: {
                    rowHeight: 60,
                    id: "styleList",
                    template: {
                        views: [{
                            type: "label",
                            props: {
                                id: "styleName",
                                font: $font("bold", 16)
                            },
                            layout: (make, view) => {
                                make.width.equalTo(view.super)
                                make.height.equalTo(view.super).dividedBy(2)
                                make.left.equalTo(view.super.left).offset(15)
                                make.top.equalTo(view.super.top).offset(5)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "styleValue",
                            },
                            layout: (make, view) => {
                                make.width.equalTo(view.super)
                                make.height.equalTo(view.super).dividedBy(2)
                                make.left.equalTo(view.super.left).offset(15)
                                make.top.equalTo(view.prev.bottom).offset(-10)
                            }
                        }, {
                            type: "image",
                            props: {
                                id: "styleSelected",
                                bgcolor: $color("#ffffff")
                            },
                            layout: (make, view) => {
                                make.centerY.equalTo(view.super)
                                make.height.width.equalTo(20)
                                make.right.equalTo(view.super.right).offset(-20)
                            }
                        }]
                    }
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(5)
                    make.width.equalTo(view.super)
                    make.height.equalTo(0)
                },
                events: {
                    didSelect: (sender, indexPath, data) => {
                        let uiData = sender.data.map((i, idx) => {
                            return {
                                styleName: i.styleName,
                                styleValue: i.styleValue,
                                styleSelected: { data: null }
                            }
                        })
                        uiData[indexPath.row].styleSelected = { data: $file.read("assets/selected_icon.png") }
                        sender.data = uiData
                        sender.info = indexPath.row
                    }
                }
            }, {
                type: "label",
                props: {
                    text: "选择代理"
                },
                layout: (make, view) => {
                    make.width.equalTo(view.super)
                    make.left.equalTo(5)
                    make.height.equalTo(30)
                    make.top.equalTo(view.prev.bottom).offset(10)
                }
            }, {
                type: "list",
                props: {
                    id: "proxyList",
                    rowHeight: 40,
                    template: {
                        views: [{
                            type: "label",
                            props: {
                                id: "proxyName"
                            },
                            layout: (make, view) => {
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(view.super).offset(-80)
                                make.height.equalTo(view.super)
                                make.left.equalTo(view.super.left).offset(15)
                            }
                        }, {
                            type: "image",
                            props: {
                                id: "proxySelected",
                                bgcolor: $color("#ffffff")
                            },
                            layout: (make, view) => {
                                make.centerY.equalTo(view.super)
                                make.height.width.equalTo(20)
                                make.right.equalTo(view.super.right).offset(-20)
                            }
                        }]
                    }
                },
                layout: (make, view) => {
                    make.top.equalTo(view.prev.bottom).offset(5)
                    make.width.equalTo(view.super)
                    make.height.equalTo(0)
                },
                events: {
                    didSelect: (sender, indexPath, data) => {
                        let uiData = sender.data.map((i, idx) => {
                            return {
                                proxyName: i.proxyName,
                                proxySelected: { data: null }
                            }
                        })
                        uiData[indexPath.row].proxySelected = { data: $file.read("assets/selected_icon.png") }
                        sender.data = uiData
                        sender.info = indexPath.row
                    }
                }
            }, {
                type: "label",
                props: {
                    text: "添加规则",
                    align: $align.center,
                    bgcolor: $color("#fff")
                },
                layout: (make, view) => {
                    make.width.equalTo(view.super)
                    make.height.equalTo(40)
                    make.top.equalTo(view.prev.bottom).offset(20)
                },
                events: {
                    tapped: sender => {
                        if ($("styleList").info !== null && $("proxyList").info !== null) {
                            let styleName = $("styleList").data[$("styleList").info].styleName.text
                            let styleValue = $("styleList").data[$("styleList").info].styleValue.text
                            let proxy = $("proxyList").data[$("proxyList").info].proxyName.text
                            let rule = [styleName, styleValue, proxy].join(',')
                            saveRule(rule)
                            $context.close()
                        } else {
                            $ui.alert("请选择匹配项和代理")
                        }
                    }
                }
            }]
        }]
    })
    let styles = genStyleDefaultData(host)
    let styleListHeight = styles.length * 60
    $("styleList").data = styles
    $("styleList").updateLayout(make => {
        make.height.equalTo(styleListHeight)
    })
    let savedData = JSON.parse($file.read(FILE).string)
    let proxyGroup = savedData.proxyGroupSettings.split('\n').filter(i => /^(?!\/|#)[\s\S]+=/.test(i)).map(i => i.split(/[\s]*=/)[0])
    let flatServerData = savedData.workspace.serverData.reduce((all, cur) => {
        return {
            rows: all.rows.concat(cur.rows)
        }
    }).rows
    let proxies = ['🚀 Direct'].concat(proxyGroup, ['REJECT', 'REJECT-TINYGIF'], flatServerData.map(i => i.proxyName.text))
    let proxiesData = genProxyDefaultData(proxies)
    let proxiesListHeight = proxiesData.length * 40
    $("proxyList").data = proxiesData
    $("proxyList").updateLayout(make => {
        make.height.equalTo(proxiesListHeight)
    })
    resizeScrollView(styleListHeight + proxiesListHeight)

}

let resizeScrollView = function (listHeight) {
    $("mainScrollView").contentSize = $size(screenWidth, 350 + listHeight)
}

let genStyleDefaultData = function (domain) {
    let dp = domain.split('.')
    let res = []
    res.push({
        styleName: { text: 'DOMAIN' },
        styleValue: { text: domain }
    })
    return res.concat(dp.map((item, idx, obj) => {
        return {
            styleName: { text: 'DOMAIN-SUFFIX' },
            styleValue: { text: obj.slice(idx).join('.') }
        }
    }))
}

let saveRule = function (rule) {
    let data = JSON.parse($file.read(FILE).string)
    data.customSettings += `\n${rule}\n`
    $file.write({
        data: $data({ "string": JSON.stringify(data) }),
        path: FILE
    })
}

let genProxyDefaultData = function (proxies) {
    return proxies.map(i => {
        return {
            proxyName: { text: i }
        }
    })
}

function collectRules() {
    let confFile = $context.data.string
    let surgeReg = /\[Rule\]\n([\s\S]+)\n# Custom/
    let quanReg = /\[SERVER\]\n([\s\S]+)\n\[SOURCE\]/
    if (surgeReg.test(confFile)) {
        let matcher = confFile.match(surgeReg)
        if (matcher.length === 2) {
            let rules = matcher[1]
            saveRule(rules)
        }
        $context.close()    
    } else if (quanReg.test(confFile)) {
        let matcher = confFile.match(quanReg);
        let serversRaw = matcher[1]
        let servers = serversRaw.split(/[\r\n]+/).filter(i => /.*?=/.test(i))
        let serverDataItem = {
            title: "Quantumult导出节点",
            url: "",
            rows: servers.map(server => {
                return {
                    proxyLink: server,
                    proxyName: {
                        bgcolor: false,
                        text: server.split(/=/)[0].trim()
                    }
                }
            })
        }
        let file = JSON.parse($file.read(FILE).string);
        let workspace = file.workspace;
        let serverData = workspace.serverData;
        serverData.unshift(serverDataItem);
        let success = $file.write({
            data: $data({ "string": JSON.stringify(file) }),
            path: FILE
        })
        $ui.alert({
            title: "导入" + success ? '成功': '失败',
            message: success ? `已经成功导入${serverDataItem.rows.length}个服务器至脚本，请重启脚本查看` : '文件格式有误',
            actions: [{
                title: 'OK',
                handler: () => {
                    $context.close()  
                }
            }]
        });
    } else {
        $ui.alert("分享文件不合法")
    }
}


module.exports = {
    renderExtensionUI: renderExtensionUI,
    collectRules: collectRules
}