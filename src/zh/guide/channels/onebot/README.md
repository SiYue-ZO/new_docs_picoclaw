> 返回 [首页](/zh/)

# OneBot

OneBot 是一个面�?QQ 机器人的开放协议标准，为多�?QQ 机器人实现（例如 go-cqhttp、Mirai）提供了统一的接口。它使用 WebSocket 进行通信�?

## 配置

```json
{
  "channels": {
    "onebot": {
      "enabled": true,
      "ws_url": "ws://localhost:8080",
      "access_token": "",
      "allow_from": []
    }
  }
}
```

| 字段         | 类型   | 必填 | 描述                             |
| ------------ | ------ | ---- | -------------------------------- |
| enabled      | bool   | �?  | 是否启用 OneBot 频道             |
| ws_url       | string | �?  | OneBot 服务器的 WebSocket URL    |
| access_token | string | �?  | 连接 OneBot 服务器的访问令牌     |
| allow_from   | array  | �?  | 用户ID白名单，空表示允许所有用�?|

## 设置流程

1. 部署一�?OneBot 兼容的实�?例如napcat)
2. 配置 OneBot 实现以启�?WebSocket 服务并设置访问令�?如果需�?
3. �?WebSocket URL 和访问令牌填入配置文件中
