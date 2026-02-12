"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { musicItems, musicTitle, musicSubtitle } from "@content/music";
import type { MusicItem } from "@/lib/types";

/**
 * 音乐模块 — 杂志专栏卡片风格
 *
 * 呈现为像杂志专栏卡片：
 * - 大标题 + 少量说明
 * - 简洁播放/链接按钮
 * - 错位排列，非对齐网格
 */
export default function MusicSection() {
  return (
    <SectionWrapper id="music">
      <ScrollReveal>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {musicSubtitle}
        </p>
        <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
          {musicTitle}
        </h2>
      </ScrollReveal>

      {/* 错位排列的卡片 */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
        {musicItems.map((item, index) => (
          <MusicCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function MusicCard({ item, index }: { item: MusicItem; index: number }) {
  // 错位效果：奇数卡片向下偏移
  const offsetClass = index % 2 === 1 ? "md:mt-10" : "";

  return (
    <ScrollReveal delay={index * 0.12} className={offsetClass}>
      <motion.div
        className="group overflow-hidden rounded-[var(--radius-card)] bg-card border border-card-border shadow-[var(--shadow-card)]"
        whileHover={{
          y: -4,
          boxShadow: "0 18px 50px rgba(0,0,0,0.07)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* 封面图 */}
        {item.coverSrc && (
          <div className="aspect-square overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.coverSrc}
              alt={`${item.title} - ${item.artist}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* 文字信息 */}
        <div className="p-6">
          <h3 className="font-[family-name:var(--font-noto-serif)] text-lg font-semibold">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{item.artist}</p>
          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          )}

          {/* 链接按钮 — 简洁风格 */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-sage-dark transition-colors hover:text-sage"
            >
              <span>聆听</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
