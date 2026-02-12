/**
 * 图片相关工具函数
 * 提供 shimmer 占位符和通用图片辅助
 */

/** 生成 shimmer 加载占位 SVG（适用于 next/image blurDataURL） */
function shimmerSvg(w: number, h: number): string {
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ECEAE4" offset="20%" />
      <stop stop-color="#F6F5F1" offset="50%" />
      <stop stop-color="#ECEAE4" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ECEAE4" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite" />
  </rect>
</svg>`;
}

function toBase64(str: string): string {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : btoa(str);
}

/**
 * 生成 shimmer 占位符 data URL，用于 next/image 的 blurDataURL
 * @param w 宽度（默认 700）
 * @param h 高度（默认 475）
 */
export function getShimmerPlaceholder(w = 700, h = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(w, h))}`;
}
