function getCurVersion() {
    let version = $file.read("version.fndroid").string
    return version
}

function needRestart() {
    return $http.get({
        url: 'https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/restart.fndroid'
    })
}

function getLatestVersion(params) {
    $http.get({
        url: 'https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/version.fndroid' + '?t=' + new Date().getTime(),
        handler: res => {
            params.handler(res.data)
        }
    })
}

function updateScript(version) {
    let url = 'https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/.output/Rules-lhie1.box' + '?t=' + new Date().getTime()
    const scriptName = $addin.current.name
    let downloadBox = $http.download({
        url: url
    })
    Promise.all([downloadBox, needRestart()]).then(res => {
        let box = res[0].data
        let restart = /true/.test(res[1].data)
        $addin.save({
            name: scriptName,
            data: box,
            handler: (success) => {
                if (success) {
                    $ui.toast(`更新完成`)
                    if (restart) {
                        $delay(0.3, () => {
                            $addin.run(scriptName)
                        })
                    }
                }
            }
        })
    })
}

function needUpdate(nv, ov) {
    let getVersionWeight = i => {
        return i.split('.').map(i => i * 1).reduce((s, i) => s * 100 + i)
    }
    return getVersionWeight(nv) > getVersionWeight(ov)
}


module.exports = {
    getCurVersion: getCurVersion,
    getLatestVersion: getLatestVersion,
    updateScript: updateScript,
    needUpdate: needUpdate
}
