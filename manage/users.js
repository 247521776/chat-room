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
        try{
            // const userCount = redis.incr("usersCount");
            // user.id = userCount;
            // redis.hmset("users", username, userCount);
            // redis.hmset(username, user);
            socket.username = username;
            socket.image = image;
            user.id = socket.id;
            const users = {};
            for (let id in io.sockets.sockets) {
                users[id] = {
                    username: io.sockets.sockets[id].username,
                    image: io.sockets.sockets[id].image
                }
            }
            socket.emit("add user", {
                code: 200,
                msg: "添加用户成功",
                users
            });
            socket.broadcast.emit("new user", {
                code: 200,
                fromUser: user
            });
        }
        catch(err) {
            socket.emit("add user", {
                code: 400,
                msg: "添加用户失败"
            });
        }
    }
};