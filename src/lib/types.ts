/** 照片数据 */
export interface Photo {
  src: string;
  title: string;
  description?: string;
  /** 图片比例: "3:2" | "16:9" | "4:5" */
  ratio: "3:2" | "16:9" | "4:5";
  /** 在 bento grid 中的尺寸: "large" | "medium" | "small" */
  size?: "large" | "medium" | "small";
}

/** 音乐卡片数据 */
export interface MusicItem {
  title: string;
  artist: string;
  description?: string;
  coverSrc?: string;
  link?: string;
}

/** 游戏卡片数据 */
export interface GameItem {
  title: string;
  description: string;
  screenshotSrc: string;
  /** 游戏平台 */
  platform?: string;
}

/** 项目/经历数据 */
export interface ProjectItem {
  title: string;
  description: string;
  period?: string;
  tags?: string[];
  link?: string;
}

/** 联系方式 */
export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  icon?: string;
}

/** 社交链接 */
export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

/** 导航项 */
export interface NavItem {
  label: string;
  href: string;
}

/** 友情链接 */
export interface FriendLink {
  name: string;
  url: string;
  description?: string;
}
