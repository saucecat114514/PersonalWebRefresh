"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { heroContent } from "@content/hero";
import { EASE_CURVE } from "@/components/ui/ScrollReveal";

/* ── 逐字符 Stagger 动画 variants ── */
const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
};

/**
 * Hero 首屏
 *
 * v3 升级：
 * - 主标题: 逐字符 stagger 从模糊中浮现
 * - 副标题: 整体 blur 景深进入
 * - Scroll 指示: 用户滚动后自动淡出
 * - 背景: next/image + priority 预加载 + 视差
 */
export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 视差效果
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  // 滚动提示：滚动后快速淡出
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // 将标题拆成字符数组
  const titleChars = heroContent.title.split("");

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* 背景图 + 视差 */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="relative h-[120%] w-full">
          <Image
            src={heroContent.backgroundImage}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </motion.div>

      {/* 标题内容 */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* 主标题: 逐字符 stagger — 文字从雾中逐个浮现 */}
        <motion.h1
          className="font-[family-name:var(--font-noto-serif)] text-4xl font-semibold leading-tight tracking-wide text-white/95 md:text-5xl lg:text-6xl"
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          aria-label={heroContent.title}
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={charVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* 副标题: 整体 blur 景深进入 */}
        <motion.p
          className="mt-5 text-base tracking-widest text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.0, ease: EASE_CURVE }}
        >
          {heroContent.subtitle}
        </motion.p>
      </motion.div>

      {/* 向下滚动提示: 用户开始滚动后淡出 */}
      {heroContent.showScrollHint && (
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.2, ease: EASE_CURVE }}
          style={{ opacity: hintOpacity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 3.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs tracking-widest text-white/50">
              SCROLL
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white/50"
            >
              <path
                d="M10 4L10 16M10 16L5 11M10 16L15 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
