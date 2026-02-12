import { GameItem } from "@/lib/types";

/** 游戏模块标题 */
export const gamesTitle = "沉浸之旅";
export const gamesSubtitle = "在虚拟世界中寻找另一种真实";

/**
 * 游戏卡片列表
 * 修改此数组即可更新游戏展示区
 */
export const gameItems: GameItem[] = [
  {
    title: "战争雷霆",
    description:
      "高速贴云穿行，雷达回波在屏幕上不断逼近。金属机身的重量、引擎的低鸣与瞬间拉升的压迫感，让每一次交汇都真实而紧张。",
    screenshotSrc: "/images/game-1.webp",
    platform: "PC",
  },
  {
    title: "彩虹六号：围攻",
    description:
      "节奏紧，但不浮躁：信息、声音和配合比枪法更重要。每一局像一次小型推演——从安静的等待到瞬间的决策，紧张感很干净。",
    screenshotSrc: "/images/game-2.webp",
    platform: "PC",
  },
];
