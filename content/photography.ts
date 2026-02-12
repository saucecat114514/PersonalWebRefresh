import { Photo } from "@/lib/types";

/** 摄影精选 — 区域标题 */
export const photographyTitle = "光与影";
export const photographySubtitle = "用镜头收集自然的诗句";

/**
 * 摄影精选照片列表
 * 修改此数组即可更新摄影展示区
 *
 * - src: 图片路径，支持 .jpg / .png / .webp 等任意格式
 * - ratio: "3:2" | "16:9" | "4:5"
 * - size: "large" 占据更大区域 | "medium" 中等 | "small" 较小
 */
export const photos: Photo[] = [
  {
    src: "/images/photo-5.webp",
    title: "奥克兰",
    description: "云很低，风很清，城市像一段清晰的轮廓。",
    ratio: "3:2",
    size: "small",
  },
  {
    src: "/images/photo-1.webp",
    title: "碧蓝急流",
    description: "水声很近，山林在两侧安静地展开。",
    ratio: "4:5",
    size: "medium",
  },
  {
    src: "/images/photo-3.webp", 
    title: "云上黄昏",
    description: "机翼划过渐变的天空，光在金与蓝之间过渡。",
    ratio: "3:2",
    size: "medium",
  },
  {
    src: "/images/photo-4.webp",
    title: "坚尼地城",
    description: "城市让出一条缝，远处的海面正好发亮。",
    ratio: "4:5",
    size: "small",
  },
  {
    src: "/images/photo-2.webp",
    title: "暮色海面",
    description: "云层点燃天际，海风把一天慢慢收拢。",
    ratio: "3:2",
    size: "large",
  },
];
