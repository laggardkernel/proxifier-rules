function pc(x) {
    let sw = $device.info.screen.width
    return x * sw / 100
}

module.exports = {
    pc: pc
}