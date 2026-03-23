---
title: 指南
icon: lightbulb
---

## 快速开始

PicoClaw 是一款轻量级、高性能的多通道消息通知机器人。本指南将帮助您快速上手。

## 快速链接

### 配置

- [配置指南](configuration.md) - 了解如何配置 PicoClaw
- [提供商](providers.md) - 配置 LLM 提供商和模型
- [Docker](docker.md) - 在 Docker 中运行 PicoClaw

### 渠道

将 PicoClaw 连接到各种消息平台：

- [Telegram](channels/telegram/)
- [Discord](channels/discord/)
- [钉钉](channels/dingtalk/)
- [飞书](channels/feishu/)
- [企业微信](channels/wecom/wecom_bot/)
- [Slack](channels/slack/)
- [更多渠道...](channels/)

### 高级

- [调试](debug.md) - 调试指南
- [故障排除](troubleshooting.md) - 常见问题与解决方案
- [任务派生](spawn-tasks.md) - 异步任务执行
- [工具配置](tools_configuration.md) - 配置工具

## 特性

- **超轻量** - 内存占用不足 10MB
- **多通道支持** - 支持 Telegram、Discord、Slack、钉钉、飞书、企业微信、LINE、QQ 等
- **AI 驱动** - 95% 的核心代码由 AI Agent 生成
- **真正便携** - 单一二进制文件，支持 RISC-V、ARM64 和 x86_64
