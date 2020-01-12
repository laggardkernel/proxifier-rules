console.clear()

const app = require('scripts/app')
const init = require('scripts/init')
const today = require('scripts/today')
const extension = require('scripts/extension')
const updateUtil = require('scripts/updateUtil')
const siri = require('scripts/siri')

$app.autoKeyboardEnabled = true
$app.rotateDisabled = true
$app.keyboardToolbarEnabled = true

let query = $context.query

$objc('notification').invoke('objectForKey')

if (query.auto == 1) {
    app.autoGen()
    return
}

if ($app.env === $env.today) {
    today.renderTodayUI()
    return
} else if ($app.env === $env.safari) {
    extension.renderExtensionUI()
    return
} else if ($app.env === $env.action) {
    extension.collectRules()
    return
} else if ($app.env === $env.siri) {
    siri.renderSiriUI()
    return
}

app.setUpWorkspace()

init.asyncInitialize()

app.renderUI()

updateUtil.getLatestVersion({
    handler: version => {
        if (updateUtil.needUpdate(version, updateUtil.getCurVersion())) {
            $http.get({
                url: 'https://raw.githubusercontent.com/Fndroid/jsbox_script/master/Rules-lhie1/updateLog.md' + '?t=' + new Date().getTime(),
                handler: resp => {
                    updateUtil.updateScript(version)
                }
            })

        }
    }
})
