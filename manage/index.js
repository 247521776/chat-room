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
    socket.broadcast.emit("left user", {
        code: 200,
        fromUser: {
            id: socket.id
        }
    });
}