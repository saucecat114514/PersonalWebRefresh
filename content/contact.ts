import { ContactInfo, FriendLink } from "@/lib/types";

/** 联系模块标题 */
export const contactTitle = "找到我";
export const contactSubtitle = "期待与你交流";

/**
 * 联系方式列表
 * 修改此数组即可更新联系方式区域
 */
export const contactItems: ContactInfo[] = [
  {
    label: "邮箱",
    value: "1972372765@qq.com",
    href: "mailto:1972372765@qq.com",
  },
  {
    label: "GitHub",
    value: "github.com/saucecat114514",
    href: "https://github.com/saucecat114514",
  },
  {
    label: "微信",
    value: "@C1972372765",
    href: "",
  },
];

/**
 * 友情链接列表
 * 修改此数组即可更新友情链接区域
 */
export const friendLinks: FriendLink[] = [
  {
    name: "Jona",
    url: "https://www.infinite.moe/",
    description: "一个很棒的个人网站",
  },
  // 添加更多友情链接：
  // { name: "名称", url: "https://...", description: "简短描述（可选）" },
];
