module.exports = {
    init: (address, port, clearFirst = true, debug = true) => {
        var oldLog = console.log;
        var oldInfo = console.info;
        var oldWarn = console.warn;
        var oldError = console.error;
        let start = clearFirst
        var socket = $socket.new(`ws://${address}:${port}`);
        socket.open()
        console.log = function (obj) {
            if (debug) {
                let msg = JSON.stringify({ type: 'log', args: Array.prototype.slice.call(arguments) });
                start = sendMessage(start, socket, msg);
            }
            oldLog.apply(console, arguments);
        }
        console.info = function (obj) {
            if (debug) {
                let msg = JSON.stringify({ type: 'info', args: Array.prototype.slice.call(arguments) });
                start = sendMessage(start, socket, msg);
            }
            oldInfo.apply(console, arguments);
        }
        console.warn = function (obj) {
            if (debug) {
                let msg = JSON.stringify({ type: 'warn', args: Array.prototype.slice.call(arguments) });
                start = sendMessage(start, socket, msg);
            }
            oldWarn.apply(console, arguments);
        }
        console.error = function (obj) {
            if (debug) {
                let msg = JSON.stringify({ type: 'error', args: Array.prototype.slice.call(arguments) });
                start = sendMessage(start, socket, msg);
            }
            oldError.apply(console, arguments);
        }
    }
}

function sendMessage(start, socket, msg) {
    if (start) {
        socket.send(JSON.stringify({ type: "_open" }));
        start = false;
    }
    socket.send(msg);
    return start;
}

