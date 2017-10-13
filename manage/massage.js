const request = require("request");
const tuling = require(`${rootname}/config/tuling.json`);

module.exports = {
    "send massage"(io, socket, massage) {
        const toUser = massage.toUser;
        if (!toUser) {
            socket.emit("send massage", {
                code: 400,
                msg: "缺少目标对象"
            });
        }
        io.sockets.sockets[toUser].emit("send massage", {
            fromUser: socket.id,
            massage: massage.massage
        });
    },
    "send all massage"(io, socket, massage) {
        if (tuling) {
            const sockets = io.sockets.sockets;
            if (Object.keys(sockets).length === 1) {
                request.post({
                    url: "http://www.tuling123.com/openapi/api",
                    form: {
                        key: tuling.APIkey,
                        info: massage.massage,
                        userid: socket.username
                    }
                }, (err, res, body) => {
                    const data = JSON.parse(body);
                    if(!err) {
                        socket.emit("send massage", {
                            robot: socket.robot,
                            massage: data.text
                        });
                    }
                });
            }
            else {
                broadcast();
            }
        }
        else {
            broadcast();
        }

        function broadcast() {
            socket.broadcast.emit("send all massage", {
                code: 200,
                fromUser: socket.id,
                massage: massage.massage
            });
        }
    }
};