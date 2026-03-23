> 返回 [首页](/zh/)

# 钉钉

钉钉是阿里巴巴的企业通讯平台，在中国职场中广受欢迎。它采用流式 SDK 来维持持久连接�?

## 配置

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "client_id": "YOUR_CLIENT_ID",
      "client_secret": "YOUR_CLIENT_SECRET",
      "allow_from": []
    }
  }
}
```

| 字段          | 类型   | 必填 | 描述                             |
| ------------- | ------ | ---- | -------------------------------- |
| enabled       | bool   | �?  | 是否启用钉钉频道                 |
| client_id     | string | �?  | 钉钉应用�?Client ID             |
| client_secret | string | �?  | 钉钉应用�?Client Secret         |
| allow_from    | array  | �?  | 用户ID白名单，空表示允许所有用�?|

## 设置流程

1. 前往 [钉钉开放平台](https://open.dingtalk.com/)
2. 创建一个企业内部应�?
3. 从应用设置中获取 Client ID �?Client Secret
4. 配置OAuth和事件订�?如需�?
5. �?Client ID �?Client Secret 填入配置文件�?
