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
        socket.broadcast.emit("send all massage", {
            code: 200,
            fromUser: socket.id,
            massage: massage.massage
        });
    }
};