const request = require("request");
const fs      = require("fs");
let   tuling;
if (fs.existsSync(`${rootname}/config/tuling.json`)) {
    tuling = require(`${rootname}/config/tuling.json`);
}

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
            if (massage.massage.indexOf("@机器人") != -1) {
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
                        io.sockets.emit("send massage", {
                            robot: socket.robot,
                            massage: data.text
                        });
                    }
                });
            }
            broadcast();
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