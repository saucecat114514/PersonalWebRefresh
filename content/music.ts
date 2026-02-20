import { MusicItem } from "@/lib/types";

/** 音乐模块标题 */
export const musicTitle = "旋律与空间";
export const musicSubtitle = "那些陪伴过安静时光的音乐";

/**
 * 音乐卡片列表
 * 修改此数组即可更新音乐展示区
 */
export const musicItems: MusicItem[] = [
  {
    title: "august",
    artist: "Taylor Swift",
    description: "像八月傍晚的风：温柔、金色、带一点点来不及说出口的遗憾。很适合在日落散步或翻看风景照片时循环。",
    coverSrc: "/images/music-1.webp",
    spotifyUrl: "https://open.spotify.com/search/august%20Taylor%20Swift",
    youtubeUrl: "https://www.youtube.com/results?search_query=Taylor+Swift+august",
  },
  {
    title: "Everglow",
    artist: "Coldplay",
    description: "克制但很亮的情绪：不是悲伤的告别，更像把温暖留在心里。适合清晨薄雾、林间光斑、以及慢慢展开的一天。",
    coverSrc: "/images/music-2.webp",
    spotifyUrl: "https://open.spotify.com/search/Everglow%20Coldplay",
    youtubeUrl: "https://www.youtube.com/results?search_query=Coldplay+Everglow",
  },
  {
    title: "Crystal Ball",
    artist: "Lenka",
    description: "轻盈又有一点点梦：像把未来装进玻璃球里轻轻摇晃。适合晴天、路边小花、或者旅途中随手拍下的明亮瞬间。",
    coverSrc: "/images/music-3.webp",
    spotifyUrl: "https://open.spotify.com/search/Crystal%20Ball%20Lenka",
    youtubeUrl: "https://www.youtube.com/results?search_query=Lenka+Crystal+Ball",
  },
];
