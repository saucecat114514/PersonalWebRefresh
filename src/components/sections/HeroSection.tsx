"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { heroContent } from "@content/hero";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 视差效果：背景图滚动速度慢于页面
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* 背景图 + 视差 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="h-[130%] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroContent.backgroundImage})`,
          }}
        />
        {/* 渐变遮罩 — 让文字更可读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </motion.div>

      {/* 标题内容 */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.h1
          className="font-[family-name:var(--font-noto-serif)] text-4xl font-semibold leading-tight tracking-wide text-white/95 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heroContent.title}
        </motion.h1>
        <motion.p
          className="mt-5 text-base tracking-widest text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heroContent.subtitle}
        </motion.p>
      </motion.div>

      {/* 向下滚动提示 */}
      {heroContent.showScrollHint && (
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
