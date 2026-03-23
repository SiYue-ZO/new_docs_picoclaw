> 返回 [首页](/zh/)

# Matrix 通道配置指南

## 1. 配置示例

�?`config.json` 中添加：

```json
{
  "channels": {
    "matrix": {
      "enabled": true,
      "homeserver": "https://matrix.org",
      "user_id": "@your-bot:matrix.org",
      "access_token": "YOUR_MATRIX_ACCESS_TOKEN",
      "device_id": "",
      "join_on_invite": true,
      "allow_from": [],
      "group_trigger": {
        "mention_only": true
      },
      "placeholder": {
        "enabled": true,
        "text": "Thinking... 💭"
      },
      "reasoning_channel_id": ""
    }
  }
}
```

## 2. 参数说明

| 字段                 | 类型     | 必填 | 说明 |
|----------------------|----------|------|------|
| enabled              | bool     | �?  | 是否启用 Matrix 通道 |
| homeserver           | string   | �?  | Matrix 服务器地址（例�?`https://matrix.org`�?|
| user_id              | string   | �?  | 机器�?Matrix 用户 ID（例�?`@bot:matrix.org`�?|
| access_token         | string   | �?  | 机器�?access token |
| device_id            | string   | �?  | 设备 ID（可选） |
| join_on_invite       | bool     | �?  | 是否自动加入邀请房�?|
| allow_from           | []string | �?  | 白名单用户（Matrix 用户 ID�?|
| group_trigger        | object   | �?  | 群聊触发策略（支�?`mention_only` / `prefixes`�?|
| placeholder          | object   | �?  | 占位消息配置 |
| reasoning_channel_id | string   | �?  | 思维链输出目标通道 |
| message_format       | string   | �?  | 消息格式：`richtext`（富文本）或 `plain`（纯文本�?|

## 3. 当前支持

- 文本消息收发
- 图片/音频/视频/文件消息入站下载（写�?MediaStore / 本地路径回退�?
- 音频消息按统一标记进入现有转写流程（`[audio: ...]`�?
- 图片/音频/视频/文件消息出站发送（上传�?Matrix 媒体库后发送）
- 群聊触发规则（支持仅 @ 提及时响应）
- Typing 状态（`m.typing`�?
- 占位消息（`Thinking... 💭`�? 最终回复替�?
- 自动加入邀请房间（可关闭）

## 4. TODO

- 富媒体细节增强（�?image/video 的尺寸、缩略图�?metadata�?
