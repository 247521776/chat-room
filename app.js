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

app.use(express.static(`${__dirname}/view`));

server.listen(port, () => {
    console.log("Server running port: " + port);
});

io.on("connection", (socket) => {
    for(let eventName in manage) {
        socket.on(eventName, (massage) => {
            manage[eventName](io, socket, massage);
        });
    }
});