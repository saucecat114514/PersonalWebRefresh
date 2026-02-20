import { ProjectItem } from "@/lib/types";

/** 项目模块标题 */
export const projectsTitle = "足迹";
export const projectsSubtitle = "近期的一些经历与在做的事";

/**
 * 项目/经历列表
 * 修改此数组即可更新项目展示区
 */
export const projectItems: ProjectItem[] = [
  {
    title: "气味收藏：香气与季节",
    description: "收集并记录不同气味带来的空间感与记忆：从花香到木香，从清新到沉稳，从季节变化到时光流逝。",
    period: "2026",
    subtitle: "Scent Journal",
    previewText: "从果园走进壁炉旁的旅程 · 像秋天午后下过雨的窗台",
    tags: ["香水", "气味", "记忆", "花香", "木质", "皂感"],
    link: "/notes/scents",
    featureEntry: true,
    featureTagline: "季节｜空间｜记忆｜情绪",
    featureCta: "进入气味世界",
  },
  {
    title: "个人摄影集网站",
    description: "基于 Next.js 构建的个人摄影展示平台，强调视觉体验与内容优先。",
    period: "2026",
    tags: ["Next.js", "设计", "摄影"],
    link: "#",
  },
  {
    title: "游戏小记：慢游与收藏",
    description: "偏向“体验与风景”的游戏记录：截图、简短文字、以及当下的节奏与感受",
    period: "2026",
    tags: ["游戏", "截图", "体验"],
  },
];
