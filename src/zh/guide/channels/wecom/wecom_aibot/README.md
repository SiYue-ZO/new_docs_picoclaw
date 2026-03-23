> 返回 [首页](/zh/)

# 企业微信智能机器�?(AI Bot)

企业微信智能机器人（AI Bot）是企业微信官方提供�?AI 对话接入方式，支持私聊与群聊，内置流式响应协议。PicoClaw 当前同时支持两种接入模式�?

- WebSocket 长连接模式：使用 `bot_id` + `secret`，优先级更高，推荐使�?
- Webhook 短连接模式：使用 `token` + `encoding_aes_key`，兼容传统回调，并支持超时后通过 `response_url` 主动推送最终回�?

## 与其�?WeCom 通道的对�?

| 特�?| WeCom Bot | WeCom App | **WeCom AI Bot** |
|------|-----------|-----------|-----------------|
| 私聊 | �?| �?| �?|
| 群聊 | �?| �?| �?|
| 流式输出 | �?| �?| �?|
| 超时主动推�?| �?| �?| �?|
| 配置复杂�?| �?| �?| �?|

## 配置

### WebSocket 长连接模式（推荐�?

```json
{
  "channels": {
    "wecom_aibot": {
      "enabled": true,
      "bot_id": "YOUR_BOT_ID",
      "secret": "YOUR_SECRET",
      "allow_from": [],
      "welcome_message": "你好！有什么可以帮助你的吗�?,
      "max_steps": 10
    }
  }
}
```

### Webhook 短连接模�?

```json
{
  "channels": {
    "wecom_aibot": {
      "enabled": true,
      "token": "YOUR_TOKEN",
      "encoding_aes_key": "YOUR_43_CHAR_ENCODING_AES_KEY",
      "webhook_path": "/webhook/wecom-aibot",
      "allow_from": [],
      "welcome_message": "你好！有什么可以帮助你的吗�?,
      "processing_message": "�?Processing, please wait. The results will be sent shortly.",
      "max_steps": 10
    }
  }
}
```

### WebSocket 模式字段

| 字段   | 类型   | 必填 | 描述                                       |
|--------|--------|------|--------------------------------------------|
| bot_id | string | �?  | AI Bot 的唯一标识，在 AI Bot 管理页面配置 |
| secret | string | �?  | AI Bot 的密钥，�?AI Bot 管理页面配置     |

### Webhook 模式字段

| 字段             | 类型   | 必填 | 描述                                         |
|------------------|--------|------|----------------------------------------------|
| token            | string | �?  | 回调验证令牌，在 AI Bot 管理页面配置         |
| encoding_aes_key | string | �?  | 43 字符 AES 密钥，在 AI Bot 管理页面随机生成 |
| webhook_path     | string | �?  | Webhook 路径，默�?`/webhook/wecom-aibot`    |
| processing_message | string | �?| 流式超时后返回给用户的提示语                 |

### 通用字段

| 字段            | 类型   | 必填 | 描述                                     |
|-----------------|--------|------|------------------------------------------|
| allow_from      | array  | �?  | 用户 ID 白名单，空数组表示允许所有用�?  |
| welcome_message | string | �?  | 用户进入聊天时发送的欢迎语，留空则不发�?|
| reply_timeout   | int    | �?  | 回复超时时间（秒，默认：5�?             |
| max_steps       | int    | �?  | Agent 最大执行步骤数（默认：10�?        |

## 模式选择

- �?`bot_id` �?`secret` 同时存在时，PicoClaw 会优先使�?WebSocket 长连接模�?
- 否则，当 `token` �?`encoding_aes_key` 同时存在时，PicoClaw 会使�?Webhook 短连接模�?

## 设置流程

### WebSocket 长连接模�?

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin)
2. 进入"应用管理" �?"智能机器�?，创建或选择一�?AI Bot
3. �?AI Bot 配置页面，配�?Bot 的名称、头像等信息，获�?`Bot ID` �?`Secret`
4. �?PicoClaw 配置文件中添加上述配置，重启 PicoClaw

### Webhook 短连接模�?

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin)
2. 进入"应用管理" �?"智能机器�?，创建或选择一�?AI Bot
3. �?AI Bot 配置页面，填�?消息接收"信息�?
   - **URL**：`http://<your-server-ip>:18790/webhook/wecom-aibot`
   - **Token**：随机生成或自定�?
   - **EncodingAESKey**：点�?随机生成"，得�?43 字符密钥
4. �?Token �?EncodingAESKey 填入 PicoClaw 配置文件，启动服务后回到管理后台保存

> [!TIP]
> 服务器需要能被企业微信服务器访问。如在内网或本地开发，可使�?[ngrok](https://ngrok.com) �?frp 做内网穿透�?

## Webhook 模式的流式响应协�?

Webhook 模式使用"流式拉取"协议，区别于普�?Webhook 的一次性回复：

```
用户发消�?
  �?
  �?
PicoClaw 立即返回 {finish: false}（Agent 开始处理）
  �?
  �?
企业微信每隔�?1 秒拉取一�?{msgtype: "stream", stream: {id: "..."}}
  �?
  ├─ Agent 未完�?�?返回 {finish: false}（继续等待）
  �?
  └─ Agent 完成 �?返回 {finish: true, content: "回答内容"}
```

**超时处理**（任务超过约 30 秒）�?

�?Agent 处理时间超过轮询窗口，PicoClaw 会：

1. 立即关闭流，向用户显�?`processing_message` 提示�?
2. Agent 继续在后台运�?
3. Agent 完成后，通过消息中携带的 `response_url` 将最终回复主动推送给用户

> `response_url` 由企业微信颁发，有效�?1 小时，只可使用一次，无需加密，直�?POST markdown 消息体即可�?

## 超时提示�?

配置 `processing_message` 后，�?Webhook 模式的流式轮询超时并切换�?`response_url` 主动推送模式时，PicoClaw 会先返回这段提示语来结束当前流�?

```json
"processing_message": "�?Processing, please wait. The results will be sent shortly."
```

## 欢迎�?

配置 `welcome_message` 后，当用户打开�?AI Bot 的聊天窗口时（`enter_chat` 事件），PicoClaw 会自动回复该欢迎语。留空则静默忽略�?

```json
"welcome_message": "你好！我�?PicoClaw AI 助手，有什么可以帮你？"
```

## 常见问题

### WebSocket 模式无法连接

- 检�?`bot_id` �?`secret` 是否填写正确
- 查看日志中是否有 WebSocket 连接或鉴权失败信�?
- 确认服务器可以访问企业微信长连接接口

### 回调 URL 验证失败


- 确认 `token` �?`encoding_aes_key` 填写正确
- 确认服务器防火墙已开放对应端�?
- 检�?PicoClaw 日志是否收到了来自企业微信的验证请求

### 消息没有回复

- 检�?`allow_from` 是否意外限制了发送�?
- 查看日志中是否出�?`context canceled` �?Agent 错误
- 确认 Agent 配置（`model_name` 等）正确

### 超长任务没有收到最终推�?

- 确认消息回调中携带了 `response_url`
- 确认服务器能主动访问外网
- 查看日志关键�?`response_url mode` �?`Sending reply via response_url`

## 参考文�?

- [企业微信 AI Bot 接入文档](https://developer.work.weixin.qq.com/document/path/101463)
- [流式响应协议说明](https://developer.work.weixin.qq.com/document/path/100719)
- [response_url 主动回复](https://developer.work.weixin.qq.com/document/path/101138)
