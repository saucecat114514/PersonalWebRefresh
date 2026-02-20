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
  /** 主入口：在 Spotify 中打开 */
  spotifyUrl?: string;
  /** 次入口：备用聆听（如 YouTube） */
  youtubeUrl?: string;
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
  subtitle?: string;
  previewText?: string;
  /** 使用「专题入口卡」布局（章节封面式） */
  featureEntry?: true;
  /** 专题入口卡副标题一行，如「季节｜空间｜记忆｜情绪」 */
  featureTagline?: string;
  /** 专题入口卡 CTA 文案，如「进入气味世界」 */
  featureCta?: string;
}

/** 香水条目数据 */
export interface ScentEntry {
  id: string;
  name: string;
  brand: string;
  year: string;
  concentration: string;
  family: string[];
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  tags: string[];
  season: string[];
  scene: string[];
  mood: string[];
  /** 1-5 */
  longevity: number;
  /** 1-5 */
  sillage: number;
  /** 1-5 */
  liking: number;
  text: string;
  shortFeeling: string;
  sceneMemory?: string;
  memoryAnchor?: string;
  imageSrc: string;
  featured?: boolean;
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
