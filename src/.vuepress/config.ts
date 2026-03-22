import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/new_docs_picoclaw/",

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
  ],


  locales: {
    "/": {
      lang: "en-US",
      title: "PicoClaw",
      description: "Docs for PicoClaw",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "PicoClaw",
      description: "PicoClaw 的文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
