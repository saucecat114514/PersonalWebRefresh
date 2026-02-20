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

          {/* Action Group：Spotify 主入口 + YouTube 次入口 */}
          {(item.spotifyUrl ?? item.link || item.youtubeUrl) && (
            <div
              role="group"
              aria-label="聆听入口"
              className="mt-5 flex flex-wrap items-center gap-3 sm:gap-[10px]"
            >
              {(item.spotifyUrl ?? item.link) && (
                <div className="relative w-full sm:w-auto">
                  <a
                    href={item.spotifyUrl ?? item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="在 Spotify 中打开"
                    className="
                      group/btn inline-flex h-11 min-h-[40px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-card-border
                      bg-white/90 px-4 shadow-[var(--shadow-card)]
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5 hover:border-sage-light hover:bg-sage-light/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]
                      active:translate-y-0 active:shadow-[var(--shadow-card)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/30 focus-visible:ring-offset-2
                    "
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="shrink-0 text-sage-dark"
                      aria-hidden
                    >
                      <path
                        d="M4 3.5v7l7-3.5L4 3.5z"
                        fill="currentColor"
                      />
                      <path
                        d="M11 4v6"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-sm font-medium text-sage-dark">
                      Spotify 聆听
                    </span>
                  </a>
                  <div
                    className="
                      pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2
                      rounded-md bg-text/90 px-2 py-1 text-xs text-white shadow-sm
                      opacity-0 transition-opacity duration-200 ease-out
                      group-hover/btn:opacity-100
                    "
                    role="tooltip"
                  >
                    在 Spotify 中打开
                  </div>
                </div>
              )}
              {item.youtubeUrl && (
                <div className="relative w-full sm:w-auto">
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="备用入口（无会员墙更友好）"
                    className="
                      group/btn inline-flex h-11 min-h-[40px] w-full sm:w-auto items-center justify-center gap-2 rounded-full
                      border border-transparent bg-sage-light/10 px-4
                      text-sm text-text-muted
                      transition-all duration-200 ease-out
                      hover:border-card-border hover:bg-sage-light/25 hover:text-text-muted
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/30 focus-visible:ring-offset-2
                    "
                  >
                    <span>备用：YouTube</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="shrink-0 opacity-70"
                      aria-hidden
                    >
                      <path
                        d="M4.5 2.5H9.5V7.5M2 10L9.5 2.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <div
                    className="
                      pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2
                      rounded-md bg-text/90 px-2 py-1 text-xs text-white shadow-sm
                      opacity-0 transition-opacity duration-200 ease-out
                      group-hover/btn:opacity-100
                    "
                    role="tooltip"
                  >
                    备用入口（无会员墙更友好）
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}
