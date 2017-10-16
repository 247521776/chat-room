module.exports = {
    "add user"(io, socket, user) {
        if (!user) {
            socket.emit("add user", {
                code: 403,
                msg: "缺少用户信息"
            });
        }
        const username = user.username;
        const image = user.image;
        if (!username && !image) {
            socket.emit("add user", {
                code: 403,
                msg: "缺少用户信息"
            });
        }
        const redisCommand = [];
        const sockets = io.sockets.sockets;
        try{
            const id = socket.id;
            redisCommand.push(["hmset", "users", username, id]);
            user.id = id;
            redisCommand.push(["hmset", username, user]);
            socket.username = username;
            socket.image = image;
            const users = {};
            for (let id in sockets) {
                users[id] = {
                    username: sockets[id].username,
                    image: sockets[id].image
                }
            }
            redis.pipeline(redisCommand).exec(() => {
                socket.emit("add user", {
                    code: 200,
                    msg: "添加用户成功",
                    users
                });
                socket.broadcast.emit("new user", {
                    code: 200,
                    fromUser: user
                });
            });
        }
        catch(err) {
            console.log(err);
            socket.emit("add user", {
                code: 500,
                msg: "添加用户失败"
            });
        }
    },
    //重新连接
    "reconnect user"(io, socket, user) {
        socket.username = user.username;
        socket.iamge = user.image;
    }
};