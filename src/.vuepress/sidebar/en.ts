import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Guide",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      collapsible: true,
      children: [
        {
          text: "Getting Started",
          icon: "lightbulb",
          link: "/guide/",
        },
        "configuration",
        "providers",
        "docker",
        "chat-apps",
      ],
    },
    {
      text: "Channels",
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
          text: "DingTalk",
          icon: "dingtalk",
          link: "dingtalk/",
        },
        {
          text: "Feishu",
          icon: "feishu",
          link: "feishu/",
        },
        {
          text: "WeCom",
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
          text: "WeChat",
          icon: "wechat",
          link: "weixin/",
        },
      ],
    },
    {
      text: "Advanced",
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
    {
      text: "Developer",
      icon: "code",
      prefix: "guide/",
      collapsible: true,
      children: [
        "design/provider-refactoring",
        "design/steering-spec",
        "hooks/",
        "migration/model-list-migration",
        "agent-refactor/",
      ],
    },
  ],
});
