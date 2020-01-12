/*

提示：自定义颜色请建立_custom/color.js文件以覆盖默认颜色，
格式：

module.exports = {
    editorItemText: "tint",
    editorItemIcon: "tint",
}

*/

const DEFAULT = {
    statusBar: "#000000", // 状态栏文字颜色，#ffffff为白色，clear隐藏，其他为黑色
    navBar: "#ffffff", // 导航栏颜色
    navTitleText: "tint", // 标题栏文字颜色
    navIconLoading: "tint", // 加载图标颜色
    navIconLeft: "tint", // 标题栏红包按钮文字颜色
    navIconRight: "tint", // 标题栏备份按钮文字颜色
    importBtnText: "tint", // 导入按钮文字颜色 
    controlBtnText: "#000000", // 操作栏文字颜色
    editorItemText: "tint", // 服务器列表文字颜色
    editorItemIcon: "tint", // 服务器列表图标颜色
    outputFormatText: "tint", // 输出格式文字颜色
    usualBtnOnBg: "#ff6666", // 常规选项按钮开启背景色
    usualBtnOnFg: "#ffffff", // 常规选项按钮开启前景色
    usualBtnOffBg: "#ffffff", // 常规选项按钮关闭背景色
    usualBtnOffFg: "#000000", // 常规选项按钮关闭前景色
    advanceBtnBg: "#808080", // 进阶按钮背景色
    advanceBtnFg: "#ffffff", // 进阶按钮前景色
    aboutBtnBg: "#808080", // 关于按钮背景色
    aboutBtnFg: "#ffffff", // 关于按钮前景色
    genBtnBg: "tint", // 生成按钮背景色
    genBtnFg: "#ffffff", // 生成按钮前景色
    advanceGridOnBg: "#ffda40", // 进阶设置网格选中背景色
    advanceGridOnFg: "#034769", // 进阶设置网格选中前景色
    advanceGridOffBg: "#63add0", // 进阶设置网格默认背景色
    advanceGridOffFg: "#ffffff", // 进阶设置网格默认前景色
}

const customColor = $file.exists("_custom/color.js") ? require('_custom/color.js') : {}

function isEqual(color1, color2) {
    return color1.runtimeValue().invoke('isEqual', color2)
}

function getColor(name, hex = false) {
    let resColor = "tint"
    if (name in customColor) {
        resColor = customColor[name]
    } else if (name in DEFAULT) {
        resColor = DEFAULT[name]
    }
    return hex ? resColor : $color(resColor)
}

module.exports = {
    isEqual: isEqual,
    getColor: getColor
}