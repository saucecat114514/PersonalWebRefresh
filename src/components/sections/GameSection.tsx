"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gameItems, gamesTitle, gamesSubtitle } from "@content/games";
import { getShimmerPlaceholder } from "@/lib/image";
import type { GameItem } from "@/lib/types";

/**
 * 游戏模块 — v2 沉浸之旅
 *
 * - 分层进入: 标题 → 卡片 stagger
 * - hover: 图片内部微 scale + 轻微对比增强（CSS transition）
 * - 进入带 blur 景深
 * - 避免科技风特效、发光或粒子
 */
export default function GameSection() {
  return (
    <SectionWrapper id="games" muted>
      {/* 分层 1: 副标题 */}
      <ScrollReveal delay={0} distance={30} duration={1.2}>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {gamesSubtitle}
        </p>
      </ScrollReveal>

      {/* 分层 2: 主标题 */}
      <ScrollReveal delay={0.15} distance={35} duration={1.3}>
        <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
          {gamesTitle}
        </h2>
      </ScrollReveal>

      <div className="mt-14 space-y-8 md:space-y-10">
        {gameItems.map((item, index) => (
          <GameCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function GameCard({ item, index }: { item: GameItem; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <ScrollReveal distance={40} duration={1.1} delay={0.3 + index * 0.2}>
      <div
        className={`grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12`}
      >
        {/* 截图 — v2: 容器不动，图片内部微 scale + 对比增强 */}
        <div
          className={`group overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] ${
            reversed
              ? "md:order-2 md:col-span-7"
              : "md:col-span-7"
          }`}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={item.screenshotSrc}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              placeholder="blur"
              blurDataURL={getShimmerPlaceholder(1200, 675)}
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.04]"
            />
          </div>
        </div>

        {/* 文字说明 */}
        <div
          className={`${
            reversed ? "md:order-1 md:col-span-5" : "md:col-span-5"
          }`}
        >
          <h3 className="font-[family-name:var(--font-noto-serif)] text-2xl font-semibold">
            {item.title}
          </h3>
          {item.platform && (
            <p className="mt-2 text-xs tracking-wider text-sage-dark uppercase">
              {item.platform}
            </p>
          )}
          <p className="mt-4 leading-[1.8] text-text-muted">
            {item.description}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
