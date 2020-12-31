const importFresh = require('import-fresh');

function listen(id, callback) {
    const ipc = importFresh('node-ipc');

    ipc.config.id = id;
    ipc.config.retry = 1500;
    ipc.config.silent=true;

    ipc.serve(
        function () {
            ipc.server.on(
                'app.message',
                function (data, socket) {
                    callback(data.message);
                    ipc.server.emit(
                        socket,
                        'disconnect'
                    );
                }
            );
        }
    );
    ipc.server.start();
}

function sendMsg(serverid, clientid, msg) {
    return new Promise((resolve) => {
        const ipc = importFresh('node-ipc');
        ipc.config.id = clientid;
        ipc.config.retry = 1000;
        ipc.config.silent = true;

        ipc.connectTo(
            serverid,
            function () {
                ipc.of[serverid].on(
                    'connect',
                    function () {
                        ipc.of[serverid].emit(
                            'app.message',
                            {
                                id: ipc.config.id,
                                message: msg
                            }
                        );
                    }
                );
                ipc.of[serverid].on(
                    'disconnect',
                    function () {
                        ipc.disconnect(serverid);
                        resolve();
                    }
                );
            }
        );
    });
}

module.exports.sendMsg = sendMsg;
module.exports.listen = listen;