import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Guide",
    icon: "book",
    prefix: "/guide/",
    children: [
      {
        text: "Getting Started",
        icon: "lightbulb",
        link: "/guide/",
      },
      {
        text: "Configuration",
        icon: "gear",
        link: "/guide/configuration.html",
      },
      {
        text: "Providers",
        icon: "plug",
        link: "/guide/providers.html",
      },
      {
        text: "Docker",
        icon: "docker",
        link: "/guide/docker.html",
      },
    ],
  },
  {
    text: "Channels",
    icon: "comments",
    prefix: "/guide/channels/",
    children: [
      {
        text: "Telegram",
        icon: "telegram",
        link: "/guide/channels/telegram/",
      },
      {
        text: "Discord",
        icon: "discord",
        link: "/guide/channels/discord/",
      },
      {
        text: "DingTalk",
        icon: "dingtalk",
        link: "/guide/channels/dingtalk/",
      },
      {
        text: "Feishu",
        icon: "feishu",
        link: "/guide/channels/feishu/",
      },
      {
        text: "WeCom",
        icon: "wecom",
        children: [
          {
            text: "WeCom Bot",
            link: "/guide/channels/wecom/wecom_bot/",
          },
          {
            text: "WeCom App",
            link: "/guide/channels/wecom/wecom_app/",
          },
          {
            text: "WeCom AIBot",
            link: "/guide/channels/wecom/wecom_aibot/",
          },
        ],
      },
      {
        text: "More",
        icon: "ellipsis",
        children: [
          {
            text: "Slack",
            link: "/guide/channels/slack/",
          },
          {
            text: "LINE",
            link: "/guide/channels/line/",
          },
          {
            text: "QQ",
            link: "/guide/channels/qq/",
          },
          {
            text: "Matrix",
            link: "/guide/channels/matrix/",
          },
          {
            text: "OneBot",
            link: "/guide/channels/onebot/",
          },
          {
            text: "MaixCam",
            link: "/guide/channels/maixcam/",
          },
          {
            text: "WeChat",
            link: "/guide/channels/weixin/",
          },
        ],
      },
    ],
  },
  {
    text: "Advanced",
    icon: "cogs",
    prefix: "/guide/",
    children: [
      {
        text: "Debug",
        icon: "bug",
        link: "/guide/debug.html",
      },
      {
        text: "Troubleshooting",
        icon: "wrench",
        link: "/guide/troubleshooting.html",
      },
      {
        text: "Spawn Tasks",
        icon: "tasks",
        link: "/guide/spawn-tasks.html",
      },
      {
        text: "Tools Config",
        icon: "toolbox",
        link: "/guide/tools_configuration.html",
      },
      {
        text: "Credential Encryption",
        icon: "lock",
        link: "/guide/credential_encryption.html",
      },
      {
        text: "Hardware Compatibility",
        icon: "microchip",
        link: "/guide/hardware-compatibility.html",
      },
    ],
  },
]);
