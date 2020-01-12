const knownURLs = [
    {domain: 'api.rixcloud.io', name: 'rixCloud'},
    {domain: 'dler.cloud', name: 'Dler Cloud'}
]

function getConfName(url) {
    let matchConst = knownURLs.find(i => url.indexOf(i.domain) > -1)
    if (matchConst) {
        return matchConst.name
    } else {
        let path = url.split('?')[0].split('/')
        let filename = path[path.length - 1]
        if (filename.indexOf('.conf') == filename.length - 5) {
            return filename.substring(0, filename.length - 5)
        } else {
            return filename
        }
    }
}

module.exports = {
    getConfName: getConfName
}