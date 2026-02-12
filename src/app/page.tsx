import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PhotoSection from "@/components/sections/PhotoSection";
import MusicSection from "@/components/sections/MusicSection";
import GameSection from "@/components/sections/GameSection";
import ProjectSection from "@/components/sections/ProjectSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

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
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PhotoSection />
      <MusicSection />
      <GameSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </>
  );
}
