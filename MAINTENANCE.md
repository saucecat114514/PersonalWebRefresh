# 网站维护文档

> **项目名称**：Charlie 的小站（PersonalWebRefresh）
> **技术栈**：Next.js 15 · React 19 · Tailwind CSS v4 · Framer Motion · Lenis

---

## 目录

- [一、构建模式切换](#一构建模式切换)
- [二、内容配置修改](#二内容配置修改)
- [三、动画系统配置](#三动画系统配置)
- [四、样式与主题](#四样式与主题)
- [五、常用命令速查](#五常用命令速查)
- [六、常见问题排查](#六常见问题排查)

---

## 一、构建模式切换

本项目支持两种运行模式，通过修改 `next.config.mjs` 进行切换。

### 1.1 静态导出模式（当前模式）

适用于部署到 **GitHub Pages、Nginx 静态托管、Cloudflare Pages** 等不支持 Node.js 运行时的环境。

```js
// next.config.mjs
const nextConfig = {
  output: 'export',        // ← 启用静态导出
  images: {
    unoptimized: true,     // ← 静态导出必须开启（无服务端图片优化）
    formats: ["image/avif", "image/webp"],
  },
};
```

构建后会在项目根目录生成 `out/` 文件夹，内含所有静态 HTML、CSS、JS 和图片资源，可直接部署。

**注意事项：**
- 静态导出模式下 `next/image` 的自动压缩/格式转换不生效，建议在放入 `public/images/` 之前手动将图片转为 `.webp` 格式并压缩
- 不支持 API Routes、Server Actions 等服务端功能

### 1.2 Node 服务器模式

适用于部署到 **Vercel、自建 Node 服务器** 等支持 Node.js 运行时的环境。

```js
// next.config.mjs
const nextConfig = {
  // output: 'export',     // ← 注释掉或删除
  images: {
    // unoptimized: true,  // ← 注释掉，启用服务端图片优化
    formats: ["image/avif", "image/webp"],
  },
};
```

**优势：**
- `next/image` 自动按需压缩图片、生成 AVIF/WebP 格式
- 支持 ISR（增量静态再生）、API Routes 等高级功能
- 无需手动预处理图片

### 1.3 切换步骤总结

| 操作 | 静态导出 → Node 服务器 | Node 服务器 → 静态导出 |
|------|----------------------|----------------------|
| `output` | 注释掉 `output: 'export'` | 取消注释 |
| `unoptimized` | 注释掉 `unoptimized: true` | 取消注释 |
| 构建命令 | `npm run build` | `npm run build`（产出到 `out/`） |
| 启动命令 | `npm run start` | 无需启动，直接部署 `out/` |

---

## 二、内容配置修改

所有网站内容集中在 `content/` 目录下，修改对应文件即可更新页面，无需改动组件代码。

### 2.1 文件一览

| 文件 | 说明 |
|------|------|
| `content/site.config.ts` | 站点名称、标题、描述、导航栏链接、社交链接 |
| `content/hero.ts` | 首屏主标题、副标题、背景图路径、滚动提示开关 |
| `content/photography.ts` | 摄影模块标题 & 照片列表 |
| `content/music.ts` | 音乐模块标题 & 音乐卡片列表 |
| `content/games.ts` | 游戏模块标题 & 游戏卡片列表 |
| `content/projects.ts` | 足迹模块标题 & 项目/经历列表 |
| `content/contact.ts` | 联系模块标题、联系方式、友情链接列表 |

### 2.2 站点基础信息 — `content/site.config.ts`

```ts
export const siteConfig = {
  name: "Charlie的小站",                           // 导航栏显示的名称
  title: "Charlie的小站 — 自然 · 生活 · 摄影",       // 浏览器标签页标题
  description: "一个关于自然摄影、音乐与生活的个人空间", // SEO 描述
  url: "https://slowmoments.site",                 // 部署后的网站地址
};

// 导航栏链接：增删改会同步到页面顶部导航
export const navItems: NavItem[] = [
  { label: "关于", href: "#about" },
  { label: "摄影", href: "#photography" },
  // ... 添加或删除导航项
];

// 社交链接：显示在联系区域
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/saucecat114514" },
  { name: "Email", url: "mailto:1972372765@qq.com" },
];
```

### 2.3 首屏 Hero — `content/hero.ts`

```ts
export const heroContent = {
  title: "在光影中寻找安静",            // 主标题（支持逐字动画）
  subtitle: "自然 · 摄影 · 生活",       // 副标题
  backgroundImage: "/images/hero.webp", // 背景图路径（建议 16:9 横向风景照）
  showScrollHint: true,                 // 是否显示"SCROLL"向下提示
};
```

### 2.4 摄影照片 — `content/photography.ts`

```ts
export const photos: Photo[] = [
  {
    src: "/images/photo-1.webp",   // 图片路径
    title: "碧蓝急流",              // 照片标题
    description: "水声很近...",     // 照片描述（悬停时显示）
    ratio: "3:2",                  // 图片比例: "3:2" | "16:9" | "4:5"
    size: "large",                 // 在马赛克布局中的位置权重: "large" | "medium" | "small"
  },
  // ... 更多照片
];
```

**关于 `size` 字段：** 马赛克布局会根据 `size` 自动分配网格位置：
- `large` → 主视觉位（Hero 区域，最大）
- `medium` → 中等区域
- `small` → 较小区域

### 2.5 音乐卡片 — `content/music.ts`

```ts
export const musicItems: MusicItem[] = [
  {
    title: "august",                    // 歌曲名
    artist: "Taylor Swift",             // 艺术家
    description: "像八月傍晚的风...",     // 描述文字
    coverSrc: "/images/music-1.webp",   // 封面图
    link: "https://open.spotify.com",   // 点击跳转链接
  },
];
```

### 2.6 游戏卡片 — `content/games.ts`

```ts
export const gameItems: GameItem[] = [
  {
    title: "战争雷霆",                    // 游戏名
    description: "高速贴云穿行...",        // 描述
    screenshotSrc: "/images/game-1.webp", // 截图
    platform: "PC",                       // 平台
  },
];
```

### 2.7 项目/经历 — `content/projects.ts`

```ts
export const projectItems: ProjectItem[] = [
  {
    title: "个人摄影集网站",             // 项目名
    description: "基于 Next.js 构建...", // 描述
    period: "2026",                     // 时间
    tags: ["Next.js", "设计", "摄影"],   // 标签
    link: "#",                          // 可选：点击跳转链接
  },
];
```

> **提示**：如果不提供 `link` 字段，卡片将不可点击；提供后卡片会变为可点击的链接。

### 2.8 联系方式 & 友情链接 — `content/contact.ts`

```ts
// 联系方式
export const contactItems: ContactInfo[] = [
  { label: "邮箱", value: "xxx@qq.com", href: "mailto:xxx@qq.com" },
  { label: "GitHub", value: "github.com/xxx", href: "https://github.com/xxx" },
];

// 友情链接
export const friendLinks: FriendLink[] = [
  {
    name: "Jona",                           // 名称（卡片上显示首字母头像）
    url: "https://www.infinite.moe/",       // 链接地址
    description: "一个很棒的网站",            // 可选描述
  },
];
```

### 2.9 图片资源管理

所有图片统一放在 `public/images/` 目录下：

| 用途 | 建议命名 | 建议格式 | 建议尺寸 |
|------|---------|---------|---------|
| Hero 背景 | `hero.webp` | WebP | 1920×1080 或更大 |
| 摄影照片 | `photo-N.webp` | WebP | 长边 1600px 以上 |
| 音乐封面 | `music-N.webp` | WebP | 800×800 |
| 游戏截图 | `game-N.webp` | WebP | 1600×900 |

> **静态导出模式提示**：由于不支持服务端图片优化，建议使用 [Squoosh](https://squoosh.app/) 或 [TinyPNG](https://tinypng.com/) 预先压缩图片。

---

## 三、动画系统配置

### 3.1 ScrollReveal 组件

`ScrollReveal` 是全站通用的滚入动画组件，包裹内容即可实现"从模糊中浮现"效果。

**文件位置：** `src/components/ui/ScrollReveal.tsx`

**核心参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `once` | `boolean` | `true` | **动画触发模式**：`true` 只播放一次，`false` 每次滚入视口都播放 |
| `direction` | `string` | `"up"` | 滑入方向：`"up"` / `"down"` / `"left"` / `"right"` / `"none"` |
| `distance` | `number` | `60` | 滑入距离（px） |
| `duration` | `number` | `1.3` | 动画时长（秒） |
| `delay` | `number` | `0` | 动画延迟（秒） |
| `blur` | `boolean` | `true` | 是否启用模糊效果（Depth Reveal） |
| `blurAmount` | `number` | `8` | 模糊强度（px），建议不超过 10 |

**切换动画为"单次播放"或"始终播放"：**

组件中 `once` 参数默认为 `true`（只播放一次）。如需每次滚入都播放动画：

```tsx
// 方式一：在使用 ScrollReveal 的地方传入 once={false}
<ScrollReveal once={false}>
  <p>每次滚入都会播放动画</p>
</ScrollReveal>

// 方式二：修改默认值（全局生效）
// 在 ScrollReveal.tsx 中将默认值改为 false：
export default function ScrollReveal({
  once = false,  // ← 改为 false 即全局每次滚入都播放
  // ...
}) { ... }
```

### 3.2 Hero 首屏动画

**文件位置：** `src/components/sections/HeroSection.tsx`

可调节的动画参数：

```ts
// 逐字符出现间隔（秒）— 越小字符出现越快
const titleContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.06,   // ← 字符间隔时间
      delayChildren: 0.3,      // ← 首字符延迟
    },
  },
};

// 单个字符的动画表现
const charVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(8px)" },  // 初始状态
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8 },                      // ← 单字符动画时长
  },
};
```

**关闭滚动提示（SCROLL 箭头）：**

在 `content/hero.ts` 中设置：

```ts
export const heroContent = {
  showScrollHint: false,  // ← 设为 false 关闭
};
```

### 3.3 平滑滚动

**文件位置：** `src/components/providers/SmoothScrollProvider.tsx`

基于 [Lenis](https://github.com/darkroomengineering/lenis) 实现全站平滑滚动。

```ts
<ReactLenis
  root
  options={{
    lerp: 0.1,          // 插值系数：越小越丝滑，越大越跟手（0.05~0.2）
    duration: 1.2,       // 滚动惯性时长（秒）
    smoothWheel: true,   // 鼠标滚轮平滑
  }}
>
```

**如需关闭平滑滚动：**

在 `src/app/layout.tsx` 中移除 `SmoothScrollProvider` 包裹：

```tsx
// 关闭前：
<SmoothScrollProvider>
  <Navigation />
  <main>{children}</main>
</SmoothScrollProvider>

// 关闭后：
<Navigation />
<main>{children}</main>
```

### 3.4 全局缓动曲线

全站动画统一使用 Bézier 缓动曲线，定义在 `ScrollReveal.tsx` 中并导出：

```ts
const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];
```

其他组件通过 `import { EASE_CURVE } from "@/components/ui/ScrollReveal"` 引用，确保全站动画节奏一致。如需修改全局动画手感，只需更改此处。

---

## 四、样式与主题

### 4.1 设计令牌（Design Tokens）

**文件位置：** `src/app/globals.css` 的 `@theme` 块

```css
@theme {
  --color-bg: #F6F5F1;           /* 页面主背景 */
  --color-bg-muted: #ECEAE4;     /* 交替区域背景 */
  --color-card: #FFFFFF;          /* 卡片背景 */
  --color-card-border: #E6E3DC;   /* 卡片边框 / 分隔线 */

  --color-sage: #A8B6A1;          /* 主强调色 */
  --color-sage-dark: #8FA195;     /* 深强调色 */
  --color-sage-light: #CBD4C6;    /* 浅强调色 */

  --color-text: #2F2E2B;          /* 主文字 */
  --color-text-muted: #7B7A74;    /* 次要文字 */

  --shadow-card: 0 18px 50px rgba(0,0,0,0.05);        /* 卡片阴影 */
  --shadow-card-hover: 0 18px 50px rgba(0,0,0,0.07);  /* 卡片悬停阴影 */

  --radius-card: 16px;            /* 卡片圆角 */
  --radius-sm: 10px;              /* 小圆角 */
  --radius-lg: 20px;              /* 大圆角 */
}
```

修改这些变量即可全局调整网站配色和视觉风格。

### 4.2 字体

在 `src/app/layout.tsx` 中配置，使用 Google Fonts 自动加载：

- **Inter** — 英文无衬线体（正文）
- **Noto Serif SC** — 中文宋体（标题、强调）

```ts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifSC = Noto_Serif_SC({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-serif" });
```

---

## 五、常用命令速查

### 5.1 开发

```bash
# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 5.2 构建

```bash
# 标准构建
npm run build

# 构建前清除缓存（推荐，可避免缓存导致的构建错误）
# Windows PowerShell:
Remove-Item -Recurse -Force .next; npm run build

# macOS / Linux:
rm -rf .next && npm run build
```

### 5.3 启动生产服务器（仅 Node 服务器模式）

```bash
npm run start
```

### 5.4 代码检查

```bash
npm run lint
```

### 5.5 完整部署流程（静态导出模式）

```bash
# 1. 确认 next.config.mjs 中启用了 output: 'export' 和 unoptimized: true
# 2. 清除缓存并构建
Remove-Item -Recurse -Force .next; npm run build
# 3. 部署 out/ 文件夹中的所有文件到托管平台
```

---

## 六、常见问题排查

### 6.1 构建报错 `EINVAL: invalid argument, readlink '.next/...'`

**原因：** `.next/` 缓存目录损坏（常见于 Windows + OneDrive 环境）。

**解决：**

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
npm run build

# macOS / Linux
rm -rf .next && npm run build
```

### 6.2 图片不显示

**检查清单：**
1. 图片文件是否存在于 `public/images/` 目录中
2. `content/` 中配置的路径是否以 `/images/` 开头（不是 `public/images/`）
3. 图片文件名大小写是否与配置一致
4. 静态导出模式下确认 `unoptimized: true` 已开启

### 6.3 动画不播放 / 性能差

- 确认组件被 `"use client"` 标记（动画组件必须为客户端组件）
- `blur` 动画在低端设备上可能卡顿，可将 `ScrollReveal` 的 `blur` 设为 `false`
- 如果动画只需播放一次，保持 `once={true}`（默认值）以减少重复计算

### 6.4 导航栏锚点跳转不平滑

确认 `SmoothScrollProvider` 已在 `layout.tsx` 中正确包裹页面内容。如果仍有问题，检查 `globals.css` 中是否存在 `scroll-behavior: smooth`——Lenis 接管后应移除此 CSS 规则。

---

## 附录：项目目录结构

```
PersonalWebRefresh/
├── content/                    # 📝 网站内容配置（修改这里更新页面内容）
│   ├── site.config.ts          #    站点信息 & 导航
│   ├── hero.ts                 #    首屏配置
│   ├── photography.ts          #    摄影照片
│   ├── music.ts                #    音乐卡片
│   ├── games.ts                #    游戏卡片
│   ├── projects.ts             #    项目/经历
│   └── contact.ts              #    联系方式 & 友情链接
├── public/images/              # 🖼️ 静态图片资源
├── src/
│   ├── app/                    #    Next.js App Router
│   │   ├── layout.tsx          #    全局布局（字体、平滑滚动）
│   │   ├── page.tsx            #    首页（模块组装）
│   │   └── globals.css         #    全局样式 & 设计令牌
│   ├── components/
│   │   ├── layout/             #    布局组件（Navigation, Footer）
│   │   ├── providers/          #    Provider（SmoothScrollProvider）
│   │   ├── sections/           #    页面各区域模块
│   │   └── ui/                 #    通用 UI（ScrollReveal, SpotlightCard 等）
│   └── lib/                    #    工具函数 & 类型定义
├── next.config.mjs             # ⚙️ Next.js 配置（构建模式切换在这里）
├── package.json                #    依赖 & 脚本
└── MAINTENANCE.md              #    📖 本文档
```
