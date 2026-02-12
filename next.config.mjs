/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发时使用默认 Node 服务器模式
  // 部署时取消下面一行的注释以生成静态文件：
  // output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
