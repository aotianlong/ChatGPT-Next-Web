import { BuiltinPlugin } from "./typing";

export const CN_PLUGINS: BuiltinPlugin[] = [
  {
    name: "联网引擎",
    toolName: "web-search",
    lang: "cn",
    description: "对gpt进行联网，在必要的时候会去网上搜索资料进行知识丰富。使用google搜索引擎",
    builtin: true,
    createdAt: 1693744292000,
    enable: true,
    onlyNodeRuntime: false,
    billing:'免 费，但问答token略有增加'
  },
  {
    name: "计算器",
    toolName: "calculator",
    lang: "cn",
    description: "用于计算数学表达式的工具。",
    builtin: true,
    createdAt: 1693744292000,
    enable: true,
    onlyNodeRuntime: false,
    billing:'免 费'
  },
  {
    name: "浏览器解析器",
    toolName: "web-browser",
    lang: "cn",
    description:
      "用于与网页进行交互的工具，可以从网页中提取信息或总结其内容。",
    builtin: true,
    createdAt: 1693744292000,
    enable: true,
    onlyNodeRuntime: false,
    billing:'免 费，但问答token略有增加'
  },
  {
    name: "维基百科",
    toolName: "WikipediaQueryRun",
    lang: "cn",
    description: "用于与Wiki交互和从Wiki获取数据的工具。",
    builtin: true,
    createdAt: 1694235989000,
    enable: false,
    onlyNodeRuntime: false,
    billing:'免 费，但问答token略有增加'
  },
  {
    name: "DALL·E",
    toolName: "dalle_image_generator",
    lang: "cn",
    description:
      "DALL·E 3 可以根据自然语言的描述创建逼真的图像和艺术。",
    builtin: true,
    createdAt: 1694703673000,
    enable: false,
    onlyNodeRuntime: false,
    billing:'1000Token/张'
  },
  // {
  //   name: "Stable Diffusion",
  //   toolName: "stable_diffusion_image_generator",
  //   lang: "cn",
  //   description:
  //     "Stable Diffusion 图像生成模型。使用本插件需要配置 Cloudflare R2 对象存储服务以及 stable-diffusion-webui 接口。",
  //   builtin: true,
  //   createdAt: 1688899480510,
  //   enable: false,
  //   onlyNodeRuntime: false,
  // },
  // {
  //   name: "arxiv文章引擎",
  //   toolName: "arxiv",
  //   lang: "cn",
  //   description: "在arxiv中查找各种丰富文章，询问文章等相关信息时会有不错的效果。",
  //   builtin: true,
  //   createdAt: 1699265115000,
  //   enable: false,
  //   onlyNodeRuntime: false,
  // },
  // {
  //   name: "PDF浏览器",
  //   toolName: "pdf-browser",
  //   lang: "cn",
  //   description: "可以从pdf文件的url中提取信息或总结其内容。",
  //   builtin: true,
  //   createdAt: 1700907315000,
  //   enable: false,
  //   onlyNodeRuntime: true,
  // },
];
