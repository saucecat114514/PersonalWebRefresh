/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发时使用默认 Node 服务器模式
  // 部署时取消下面一行的注释以生成静态文件：
  // output: 'export',
  images: {
    // 部署为静态导出时取消下行注释：
    // unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
