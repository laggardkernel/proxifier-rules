function asyncInitialize() {
    updateSpecialReg()
}

function updateSpecialReg() {
    $http.download({
        showsProgress: false,
        url: "https://raw.githubusercontent.com/Fndroid/specialReg/master/specialReg.js?t=" + new Date().getTime()
    }).then(resp => {
        if (resp.response.statusCode === 200) {
            let success = $file.write({
                data: resp.data,
                path: "scripts/videoReg.js"
            });
        }
    })
}

module.exports = {
    asyncInitialize: asyncInitialize
}