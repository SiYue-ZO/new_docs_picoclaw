import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "指南",
    icon: "book",
    prefix: "/zh/guide/",
    children: [
      {
        text: "快速开始",
        icon: "lightbulb",
        link: "/zh/guide/",
      },
      {
        text: "配置",
        icon: "gear",
        link: "/zh/guide/configuration.html",
      },
      {
        text: "提供商",
        icon: "plug",
        link: "/zh/guide/providers.html",
      },
      {
        text: "Docker",
        icon: "docker",
        link: "/zh/guide/docker.html",
      },
    ],
  },
  {
    text: "渠道",
    icon: "comments",
    prefix: "/zh/guide/channels/",
    children: [
      {
        text: "Telegram",
        icon: "telegram",
        link: "/zh/guide/channels/telegram/",
      },
      {
        text: "Discord",
        icon: "discord",
        link: "/zh/guide/channels/discord/",
      },
      {
        text: "钉钉",
        icon: "dingtalk",
        link: "/zh/guide/channels/dingtalk/",
      },
      {
        text: "飞书",
        icon: "feishu",
        link: "/zh/guide/channels/feishu/",
      },
      {
        text: "企业微信",
        icon: "wecom",
        children: [
          {
            text: "企业微信机器人",
            link: "/zh/guide/channels/wecom/wecom_bot/",
          },
          {
            text: "企业微信应用",
            link: "/zh/guide/channels/wecom/wecom_app/",
          },
          {
            text: "企业微信 AI 机器人",
            link: "/zh/guide/channels/wecom/wecom_aibot/",
          },
        ],
      },
      {
        text: "更多",
        icon: "ellipsis",
        children: [
          {
            text: "Slack",
            link: "/zh/guide/channels/slack/",
          },
          {
            text: "LINE",
            link: "/zh/guide/channels/line/",
          },
          {
            text: "QQ",
            link: "/zh/guide/channels/qq/",
          },
          {
            text: "Matrix",
            link: "/zh/guide/channels/matrix/",
          },
          {
            text: "OneBot",
            link: "/zh/guide/channels/onebot/",
          },
          {
            text: "MaixCam",
            link: "/zh/guide/channels/maixcam/",
          },
          {
            text: "微信",
            link: "/zh/guide/channels/weixin/",
          },
        ],
      },
    ],
  },
  {
    text: "高级",
    icon: "cogs",
    prefix: "/zh/guide/",
    children: [
      {
        text: "调试",
        icon: "bug",
        link: "/zh/guide/debug.html",
      },
      {
        text: "故障排除",
        icon: "wrench",
        link: "/zh/guide/troubleshooting.html",
      },
      {
        text: "任务派生",
        icon: "tasks",
        link: "/zh/guide/spawn-tasks.html",
      },
      {
        text: "工具配置",
        icon: "toolbox",
        link: "/zh/guide/tools_configuration.html",
      },
      {
        text: "凭据加密",
        icon: "lock",
        link: "/zh/guide/credential_encryption.html",
      },
      {
        text: "硬件兼容性",
        icon: "microchip",
        link: "/zh/guide/hardware-compatibility.html",
      },
    ],
  },
]);
