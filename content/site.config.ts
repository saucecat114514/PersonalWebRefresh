import { NavItem, SocialLink } from "@/lib/types";

/** 站点全局配置 */
export const siteConfig = {
  /** 站点名称 */
  name: "Charlie的小站",
  /** 站点标题 */
  title: "Charlie的小站 — 自然 · 生活 · 摄影",
  /** 站点描述 */
  description: "一个关于自然摄影、音乐与生活的个人空间",
  /** 站点 URL（部署后替换） */
  url: "https://slowmoments.site",
};

/** 导航栏链接 */
export const navItems: NavItem[] = [
  { label: "关于", href: "#about" },
  { label: "摄影", href: "#photography" },
  { label: "音乐", href: "#music" },
  { label: "游戏", href: "#games" },
  { label: "项目", href: "#projects" },
  { label: "联系", href: "#contact" },
];

/** 社交链接 */
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/saucecat114514" },
  { name: "Email", url: "mailto:1972372765@qq.com" },
];
