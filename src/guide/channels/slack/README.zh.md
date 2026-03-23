> 返回 [首页](/zh/)

# Slack

Slack 是全球领先的企业级即时通讯平台。PicoClaw 采用 Slack �?Socket Mode 实现实时双向通信，无需配置公开�?Webhook 端点�?

## 配置

```json
{
  "channels": {
    "slack": {
      "enabled": true,
      "bot_token": "xoxb-...",
      "app_token": "xapp-...",
      "allow_from": []
    }
  }
}
```

| 字段       | 类型   | 必填 | 描述                                                     |
| ---------- | ------ | ---- | -------------------------------------------------------- |
| enabled    | bool   | �?  | 是否启用 Slack 频道                                      |
| bot_token  | string | �?  | Slack 机器人的 Bot User OAuth Token (�?xoxb- 开�?      |
| app_token  | string | �?  | Slack 应用�?Socket Mode App Level Token (�?xapp- 开�? |
| allow_from | array  | �?  | 用户ID白名单，空表示允许所有用�?                        |

## 设置流程

1. 前往 [Slack API](https://api.slack.com/) 创建一个新�?Slack 应用
2. 启用 Socket Mode 并获�?App Level Token
3. 添加 Bot Token Scopes(例如`chat:write`、`im:history`�?
4. 安装应用到工作区并获�?Bot User OAuth Token
5. �?Bot Token �?App Token 填入配置文件�?
