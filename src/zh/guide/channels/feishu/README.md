> 返回 [首页](/zh/)

# 飞书

飞书（国际版名称：Lark）是字节跳动旗下的企业协作平台。它通过事件驱动�?Webhook 同时支持中国和全球市场�?

## 配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "app_id": "cli_xxx",
      "app_secret": "xxx",
      "encrypt_key": "",
      "verification_token": "",
      "allow_from": [],
      "is_lark": false
    }
  }
}
```

| 字段                  | 类型   | 必填 | 描述                                                                                             |
| --------------------- | ------ | ---- | ------------------------------------------------------------------------------------------------ |
| enabled               | bool   | �?  | 是否启用飞书频道                                                                                 |
| app_id                | string | �?  | 飞书应用�?App ID(以cli\_开�?                                                                   |
| app_secret            | string | �?  | 飞书应用�?App Secret                                                                            |
| encrypt_key           | string | �?  | 事件回调加密密钥                                                                                 |
| verification_token    | string | �?  | 用于Webhook事件验证的Token                                                                       |
| allow_from            | array  | �?  | 用户ID白名单，空表示所有用�?                                                                    |
| random_reaction_emoji | array  | �?  | 随机添加的表情列表，空则使用默认 "Pin"                                                           |
| is_lark               | bool   | �?  | 是否使用 Lark 国际版域名（`open.larksuite.com`），默认�?`false`（使用飞书域�?`open.feishu.cn`�?|

## 设置流程

1. 前往 [飞书开放平台](https://open.feishu.cn/)（国际版用户请前往 [Lark 开放平台](https://open.larksuite.com/)）创建应用程�?
2. 获取 App ID �?App Secret
3. 配置事件订阅和Webhook URL
4. 设置加密(可�?生产环境建议启用)
5. �?App ID、App Secret、Encrypt Key �?Verification Token(如果启用加密) 填入配置文件�?
6. 自定义你希望 PicoClaw react 你消息时的表情（可�? Reference URL: [Feishu Emoji List](https://open.larkoffice.com/document/server-docs/im-v1/message-reaction/emojis-introduce))

## 平台限制

> ⚠️ **飞书通道不支�?32 位设备�?* 飞书官方 SDK 仅提�?64 位构建，armv6 / armv7 / mipsle �?32 位架构无法使用飞书通道。如需�?32 位设备上接入即时通讯，请改用 Telegram、Discord �?OneBot 等通道�?
