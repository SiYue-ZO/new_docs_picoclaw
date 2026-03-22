import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Quick Start",
    icon: "lightbulb",
    link: "/guide/",
  },
  {
    text: "Config",
    icon: "gear",
    link: "/guide/config.html",
  },
  {
    text: "Changelog",
    icon: "clock-rotate-left",
    link: "/changelog.html",
  },
]);
