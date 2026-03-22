import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "快速开始",
    icon: "lightbulb",
    link: "/zh/guide/",
  },
  {
    text: "配置",
    icon: "gear",
    link: "/zh/guide/config.html",
  },
  {
    text: "更新日志",
    icon: "clock-rotate-left",
    link: "/zh/changelog.html",
  },
]);
