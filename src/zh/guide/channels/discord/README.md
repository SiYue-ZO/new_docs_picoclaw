> 返回 [首页](/zh/)

# Discord

Discord 是一个专为社区设计的免费语音、视频和文本聊天应用。PicoClaw 通过 Discord Bot API 连接�?Discord 服务器，支持接收和发送消息�?

## 配置

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN",
      "allow_from": ["YOUR_USER_ID"],
      "group_trigger": {
        "mention_only": false
      }
    }
  }
}
```

| 字段         | 类型   | 必填 | 描述                             |
| ------------ | ------ | ---- | -------------------------------- |
| enabled      | bool   | �?  | 是否启用 Discord 频道            |
| token        | string | �?  | Discord 机器�?Token             |
| allow_from   | array  | �?  | 用户ID白名单，空表示允许所有用�?|
| group_trigger | object | �?  | 群组触发设置（示�? { "mention_only": false }�?|

## 设置流程

1. 前往 [Discord 开发者门户](https://discord.com/developers/applications) 创建一个新的应�?
2. 启用 Intents:
   - Message Content Intent
   - Server Members Intent
3. 获取 Bot Token
4. �?Bot Token 填入配置文件�?
5. 邀请机器人加入服务器并授予必要权限(例如发送消息、读取消息历史等)
