const express       = require("express");
const app           = express();
const http          = require("http");
const server        = http.createServer(app);
const io            = require("socket.io")(server);
const config        = require(__dirname + "/config/default.json");
const configRedis   = require(__dirname + "/config/redis.json");
const redis         = require("ioredis");
const port          = config.port || 3000;
global.rootname     = __dirname;
global.redis        = new redis(configRedis);
const manage        = require(rootname + "/manage");
const faker         = require("faker");
//机器人名称与头像
const robot         = {
    username: faker.name.findName(),
    image: faker.image.avatar()
};

app.use(express.static(`${__dirname}/view`));

app.use((req, res) => {
    if (req.url.length < 2) {
        res.render("index.html");        
    }
    else {
        res.json("恭喜你进入了聊天室");
    }
})

server.listen(port, () => {
    console.log("Server running port: " + port);
});

io.on("connection", (socket) => {
    socket.robot = robot;
    for(let eventName in manage) {
        socket.on(eventName, (massage) => {
            manage[eventName](io, socket, massage);
        });
    }
});