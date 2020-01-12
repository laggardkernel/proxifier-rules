let githubRawReg = /^https:\/\/raw\.githubusercontent\.com\/(.*?)\/(.*?)\/master\/(.*?)$/

const FILE = 'data.js'

function getRulesReplacement(content = '') {
    let advanceSettings = content ? content : JSON.parse($file.read(FILE).string)
    if (advanceSettings.customSettings) {
        let cs = advanceSettings.customSettings;
        let pat = cs.match(/\/\/\s*replacement\s*:\s*(.*?)[\n\r]/);
        if (pat && pat[1]) {
            return pat[1];
        }
    }
    return null;
}

function getSoftwareType() {
    let file = JSON.parse($file.read(FILE).string)
    let workspace = file.workspace
    let outputFormat = workspace.outputFormat
    if (outputFormat === 'Surge 3 TF') {
        return 0
    } else if (outputFormat === 'Surge 2') {
        return 2
    } else if (outputFormat === 'Quantumult') {
        return 3
    }
    return 1
}

function checkUpdate(oldSha, newSha) {
    return Object.keys(newSha).some(i => oldSha[i] !== newSha[i])
}

function setFilesSha(sha) {
    let file = JSON.parse($file.read(FILE).string)
    file['repoSha'] = sha
    $file.write({
        data: $data({ "string": JSON.stringify(file) }),
        path: FILE
    })
}

function getFilesSha() {
    let file = JSON.parse($file.read(FILE).string)
    return file['repoSha'] || {}
}

function getGitHubFilesSha(params) {
  params.handler({})
}

function getRepoInfo() {
    let owner = 'lhie1';
    let repoName = 'Rules';
    let filePath = 'Auto';
    let softwareType = getSoftwareType()
    if (softwareType === 0) {
        filePath = 'Auto_New'
    } else if (softwareType === 3) {
        filePath = 'Quantumult'
    }
    console.log(filePath)
    let rulesRep = getRulesReplacement();
    if (rulesRep) {
        let reg = rulesRep.match(githubRawReg);
        if (reg && reg.length === 4) {
            owner = reg[1];
            repoName = reg[2];
            filePath = reg[3];
        }
    }
    return { owner, repoName, filePath };
}

function getLatestCommitMessage(params) {
    params.handler(null)
}

module.exports = {
    checkUpdate: checkUpdate,
    getGitHubFilesSha: getGitHubFilesSha,
    setFilesSha: setFilesSha,
    getFilesSha: getFilesSha,
    getLatestCommitMessage: getLatestCommitMessage,
    getRepoInfo: getRepoInfo
}