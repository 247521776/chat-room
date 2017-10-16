const fs    = require("fs");
const files = fs.readdirSync(__dirname);
files.splice(files.indexOf("index.js"), 1);

//将manage目录下的文件都挂载到index文件上
for (let filename of files) {
    const file = require(`${__dirname}/${filename}`);
    for(let manage in file) {
        exports[manage] = file[manage];
    }
}
//当有人离开
exports.disconnect = (io, socket) => {
    const username = socket.username;
    try {
        redis.pipeline([
            ["hdel", "users", username],
            ["hdel", username, "id"],
            ["hdel", username, "username"],
            ["hdel", username, "image"]
        ]).exec(() => {});
    }
    catch(err) {}
    socket.broadcast.emit("left user", {
        code: 200,
        fromUser: {
            id: socket.id
        }
    });
};

//重新连接
exports.reconnect = (io, socket, user) => {
    socket.username = user.username;
    socket.iamge = user.iamge;
}