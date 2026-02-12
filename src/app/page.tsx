import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

/* 首屏以下的 Section 使用动态导入，减少首屏 JS 体积 */
const PhotoSection = dynamic(
  () => import("@/components/sections/PhotoSection")
);
const MusicSection = dynamic(
  () => import("@/components/sections/MusicSection")
);
const GameSection = dynamic(
  () => import("@/components/sections/GameSection")
);
const ProjectSection = dynamic(
  () => import("@/components/sections/ProjectSection")
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

/**
 * 首页 — 按设计文档推荐结构组装
 *
 * 1. 大幅自然摄影 Hero
 * 2. 简短个人介绍
 * 3. 摄影精选模块
 * 4. 音乐兴趣卡片
 * 5. 游戏兴趣卡片
 * 6. 近期项目/经历
 * 7. 联系方式
 *
 * 每一模块之间必须有明显留白断层（由 SectionWrapper 保证）
 * 页面切换动画由 PageTransition 包裹实现"轻轻翻页"效果
 */
export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <PhotoSection />
      <MusicSection />
      <GameSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </PageTransition>
  );
}
