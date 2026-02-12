"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  photos,
  photographyTitle,
  photographySubtitle,
} from "@content/photography";
import type { Photo } from "@/lib/types";

/**
 * 根据图片比例返回 aspect-ratio CSS 类
 */
function getAspectClass(ratio: Photo["ratio"]) {
  switch (ratio) {
    case "3:2":
      return "aspect-[3/2]";
    case "16:9":
      return "aspect-[16/9]";
    case "4:5":
      return "aspect-[4/5]";
    default:
      return "aspect-[3/2]";
  }
}

/**
 * 摄影展示区块 — Organic Bento 不规则网格
 *
 * 布局策略:
 * - 第1张(large): 横跨 2 列, 高度大
 * - 第2张(medium, 竖图): 1 列, 竖向占 2 行
 * - 第3张(medium): 横跨 2 列
 * - 第4/5张(small): 各占 1 列
 *
 * 禁止严格网格对齐 — 使用不同 gap 和错位实现杂志感
 */
export default function PhotoSection() {
  return (
    <SectionWrapper id="photography" muted>
      <ScrollReveal>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {photographySubtitle}
        </p>
        <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
          {photographyTitle}
        </h2>
      </ScrollReveal>

      {/* Organic Bento Grid */}
      <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-5 md:grid-cols-4 md:gap-6 lg:gap-7">
        {photos.map((photo, index) => (
          <PhotoCard key={photo.src} photo={photo} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  /**
   * Bento 布局规则:
   * - index 0 (large): col-span-2, row-span-2
   * - index 1 (medium, 竖图): col-span-1, row-span-2 (右上角)
   * - index 2 (medium, 宽图): col-span-2, row-span-1 (第二行跨左)
   * - index 3 (small): col-span-1, row-span-1
   * - index 4 (small): col-span-1, row-span-1
   * 超出5张的图片使用默认 1x1
   */
  const gridClass = [
    "md:col-span-2 md:row-span-2", // 大图
    "md:col-span-2 md:row-span-2", // 竖图（占据2行）
    "md:col-span-2 md:row-span-1", // 宽图
    "md:col-span-1 md:row-span-1", // 小图
    "md:col-span-1 md:row-span-1", // 小图
  ][index] || "md:col-span-1 md:row-span-1";

  return (
    <ScrollReveal delay={index * 0.1} className={gridClass}>
      <motion.div
        className={`
          group relative h-full w-full overflow-hidden
          rounded-[var(--radius-card)]
          shadow-[var(--shadow-card)]
          ${getAspectClass(photo.ratio)} md:aspect-auto
        `}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* 图片 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover 信息叠层 */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="p-6">
            <h3 className="font-[family-name:var(--font-noto-serif)] text-lg font-medium text-white">
              {photo.title}
            </h3>
            {photo.description && (
              <p className="mt-1 text-sm text-white/70">{photo.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
