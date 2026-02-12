"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { musicItems, musicTitle, musicSubtitle } from "@content/music";
import { getShimmerPlaceholder } from "@/lib/image";
import type { MusicItem } from "@/lib/types";

/**
 * 音乐模块 — v3 旋律与空间
 *
 * - 分层进入: 标题 → 描述 → 卡片 stagger
 * - hover: SpotlightCard 鼠标追踪光影 + 上浮
 * - 进入带 blur 景深
 */
export default function MusicSection() {
  return (
    <SectionWrapper id="music">
      {/* 分层 1: 副标题 */}
      <ScrollReveal delay={0} distance={30} duration={1.2}>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {musicSubtitle}
        </p>
      </ScrollReveal>

      {/* 分层 2: 主标题 */}
      <ScrollReveal delay={0.15} distance={35} duration={1.3}>
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
    <ScrollReveal
      delay={0.3 + index * 0.2}
      distance={40}
      duration={1.3}
      className={offsetClass}
    >
      <SpotlightCard>
        {/* 封面图 — 不做 scale 动画 */}
        {item.coverSrc && (
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.coverSrc}
              alt={`${item.title} - ${item.artist}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={getShimmerPlaceholder(600, 600)}
              className="object-cover"
            />
          </div>
        )}

        {/* 文字信息 */}
        <div className="relative z-20 p-6">
          <h3 className="font-[family-name:var(--font-noto-serif)] text-lg font-semibold">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{item.artist}</p>
          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          )}

          {/* 链接按钮 */}
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
                className="transition-transform duration-500 group-hover:translate-x-0.5"
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
      </SpotlightCard>
    </ScrollReveal>
  );
}
