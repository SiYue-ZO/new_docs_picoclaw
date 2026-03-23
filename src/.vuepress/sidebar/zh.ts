import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "指南",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      collapsible: true,
      children: [
        {
          text: "快速开始",
          icon: "lightbulb",
          link: "/zh/guide/",
        },
        "configuration",
        "providers",
        "docker",
        "chat-apps",
      ],
    },
    {
      text: "渠道",
      icon: "comments",
      prefix: "guide/channels/",
      collapsible: true,
      children: [
        {
          text: "Telegram",
          icon: "telegram",
          link: "telegram/",
        },
        {
          text: "Discord",
          icon: "discord",
          link: "discord/",
        },
        {
          text: "钉钉",
          icon: "dingtalk",
          link: "dingtalk/",
        },
        {
          text: "飞书",
          icon: "feishu",
          link: "feishu/",
        },
        {
          text: "企业微信",
          icon: "wecom",
          collapsible: true,
          prefix: "wecom/",
          children: [
            "wecom_bot/",
            "wecom_app/",
            "wecom_aibot/",
          ],
        },
        {
          text: "Slack",
          icon: "slack",
          link: "slack/",
        },
        {
          text: "LINE",
          icon: "line",
          link: "line/",
        },
        {
          text: "QQ",
          icon: "qq",
          link: "qq/",
        },
        {
          text: "Matrix",
          icon: "matrix",
          link: "matrix/",
        },
        {
          text: "OneBot",
          icon: "robot",
          link: "onebot/",
        },
        {
          text: "MaixCam",
          icon: "camera",
          link: "maixcam/",
        },
        {
          text: "微信",
          icon: "wechat",
          link: "weixin/",
        },
      ],
    },
    {
      text: "高级",
      icon: "cogs",
      prefix: "guide/",
      collapsible: true,
      children: [
        "debug",
        "troubleshooting",
        "spawn-tasks",
        "tools_configuration",
        "credential_encryption",
        "hardware-compatibility",
        "ANTIGRAVITY_AUTH",
        "ANTIGRAVITY_USAGE",
      ],
    },
  ],
});
