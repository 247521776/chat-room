# 本项目为一个简易聊天室

## 所用技术

-  express
-  socket.io
-  ioredis

## 配置文件 

``` 
|- config  
     |- default.json 项目默认配置信息  
     |- redis.json redis配置信息  
```
  
### default.json

`port`: 端口  
  
### tuling.json

该配置文件为图灵机器人配置文件。
```
{
    "APIkey": "xxxx"
}
```  
配置成功后，在聊天框中输入`@机器人`，即可与机器人聊天，并且所有人可见  
  
[点击进入聊天室](woshiyang.xyz:3000)
