# 个人网站 — Warm Organic Bento

一个自然 × 生活 × 摄影融合的个人空间，基于 Next.js 构建。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态文件（可部署到任何静态托管）
npm run build
```

构建后的静态文件位于 `out/` 目录，可直接部署到 Vercel、Netlify、GitHub Pages 等平台。

---

## 如何修改内容

**所有可编辑内容都集中在 `content/` 目录**，无需修改任何组件代码。

### 文件说明

| 文件 | 内容 | 格式 |
|------|------|------|
| `content/site.config.ts` | 站点名称、导航链接、社交链接 | TypeScript |
| `content/hero.ts` | Hero 区标题、副标题、背景图 | TypeScript |
| `content/about.mdx` | 个人简介（支持 Markdown） | MDX |
| `content/photography.ts` | 摄影精选照片列表 | TypeScript |
| `content/music.ts` | 音乐兴趣卡片 | TypeScript |
| `content/games.ts` | 游戏兴趣卡片 | TypeScript |
| `content/projects.ts` | 项目/经历列表 | TypeScript |
| `content/contact.ts` | 联系方式 | TypeScript |

### 修改示例

#### 更换 Hero 背景图

1. 将你的风景照片放入 `public/images/` 目录
2. 编辑 `content/hero.ts`：

```typescript
export const heroContent = {
  title: "你的标题",
  subtitle: "你的副标题",
  backgroundImage: "/images/your-photo.jpg",  // 修改这里
  showScrollHint: true,
};
```

#### 添加摄影作品

编辑 `content/photography.ts`，在 `photos` 数组中添加一项：

```typescript
{
  src: "/images/new-photo.jpg",
  title: "照片标题",
  description: "简短描述",
  ratio: "3:2",     // 可选: "3:2" | "16:9" | "4:5"
  size: "medium",   // 可选: "large" | "medium" | "small"
},
```

#### 修改个人简介

直接编辑 `content/about.mdx`，使用 Markdown 语法：

```markdown
---
title: 关于我
subtitle: 你的副标题
---

在这里写你的个人介绍...
支持 **加粗**、*斜体*、[链接](url) 等 Markdown 语法。
```

### 图片管理

- 所有图片放在 `public/images/` 目录下
- 在内容文件中使用 `/images/文件名` 引用
- 推荐比例：横向 3:2 或 16:9，竖向 4:5
- 占位图在 `public/images/placeholder/`，替换为真实照片即可

---

## 技术栈

- **Next.js 15** — React 框架（App Router）
- **Tailwind CSS v4** — 原子化 CSS
- **Framer Motion** — 柔和滚动动画
- **MDX** — Markdown + JSX 内容管理
- **TypeScript** — 类型安全

## 设计规范

遵循 Warm Organic Bento 设计系统，详见 `.cursor/rules/design-doc.mdc`。

核心原则：
- 内容优先，UI 隐身
- 低饱和暖色 + 大留白
- 非规则模块排列（杂志构图）
- 柔和自然光影
- 每一屏只讲一件事

## 部署

本项目配置为静态导出（`output: 'export'`），构建后生成纯静态 HTML/CSS/JS 文件。

```bash
npm run build
# 将 out/ 目录部署到任何静态托管平台
```

支持的部署平台：Vercel、Netlify、GitHub Pages、Cloudflare Pages 等。
