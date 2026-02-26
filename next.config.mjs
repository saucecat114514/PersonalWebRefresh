/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  /** 生成 notes/scents/index.html，便于静态服务器按目录提供页面 */
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
