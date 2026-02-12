"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gameItems, gamesTitle, gamesSubtitle } from "@content/games";
import type { GameItem } from "@/lib/types";

/**
 * 游戏模块 — 大截图 + 简短说明
 *
 * 呈现为视觉内容而非功能列表：
 * - 大截图为主
 * - 简短文字说明
 * - 强调体验，不强调参数
 */
export default function GameSection() {
  return (
    <SectionWrapper id="games" muted>
      <ScrollReveal>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {gamesSubtitle}
        </p>
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
  // 交替布局：奇数图文左右互换
  const reversed = index % 2 === 1;

  return (
    <ScrollReveal>
      <div
        className={`grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12 ${
          reversed ? "" : ""
        }`}
      >
        {/* 截图 — 占据大部分空间 */}
        <motion.div
          className={`overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] ${
            reversed
              ? "md:order-2 md:col-span-7"
              : "md:col-span-7"
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.screenshotSrc}
            alt={item.title}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </motion.div>

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
