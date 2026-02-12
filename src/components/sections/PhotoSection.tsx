"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  photos,
  photographyTitle,
  photographySubtitle,
} from "@content/photography";
import { getShimmerPlaceholder } from "@/lib/image";
import type { Photo } from "@/lib/types";

/* ================================================================
 *  Editorial Mosaic — 拼贴布局引擎
 * ================================================================
 *
 *  桌面端使用 globals.css 中的 .mosaic-* 类进行 CSS Grid 定位：
 *    - mosaic-hero            → 左上主视觉 (8col × 3row)
 *    - mosaic-portrait-top    → 右上竖图   (4col × 2row)
 *    - mosaic-portrait-bottom → 右下竖图   (4col × 3row)
 *    - mosaic-landscape-left  → 左下横图   (5col × 2row)
 *    - mosaic-landscape-right → 中下横图   (3col × 2row)
 *
 *  移动端退化为 2 列简洁网格，hero 优先展示。
 *
 *  扩展照片（第 6 张起）按 3 张一行追加，列宽交替 [5,4,3]。
 * ================================================================ */

interface MosaicTile {
  photo: Photo;
  mobileClass: string;
  desktopClass: string;
  delay: number;
}

/** 核心 5 区域的位置定义 */
const CORE_SLOTS = [
  { mobile: "col-span-2 row-span-2", desktop: "mosaic-hero", delay: 0 },
  { mobile: "col-span-1 row-span-2", desktop: "mosaic-portrait-top", delay: 0.08 },
  { mobile: "col-span-1 row-span-2", desktop: "mosaic-portrait-bottom", delay: 0.12 },
  { mobile: "col-span-1",            desktop: "mosaic-landscape-left", delay: 0.16 },
  { mobile: "col-span-1",            desktop: "mosaic-landscape-right", delay: 0.2 },
];

/** 扩展行列宽交替模式（避免等宽） */
const EXT_PATTERNS = [
  ["mosaic-ext-w5", "mosaic-ext-w4", "mosaic-ext-w3"],
  ["mosaic-ext-w3", "mosaic-ext-w5", "mosaic-ext-w4"],
  ["mosaic-ext-w4", "mosaic-ext-w3", "mosaic-ext-w5"],
];

/**
 * 将照片数组分配到拼贴位置
 *
 * 规则：
 * 1. size="large" 的照片作为 hero（主视觉）
 * 2. 4:5 竖图优先分配到右侧竖列
 * 3. 横图优先分配到底部横列
 * 4. 不足时交叉填补（object-cover 裁切适配）
 * 5. 超出 5 张的照片按 3 张/行追加到底部
 */
function buildMosaicTiles(allPhotos: Photo[]): MosaicTile[] {
  if (allPhotos.length === 0) return [];

  // 1. 找到主视觉
  const heroIdx = allPhotos.findIndex((p) => p.size === "large");
  const hero = allPhotos[heroIdx >= 0 ? heroIdx : 0];
  const rest = allPhotos.filter((p) => p !== hero);

  // 2. 按比例分类
  const portraits = rest.filter((p) => p.ratio === "4:5");
  const landscapes = rest.filter((p) => p.ratio !== "4:5");

  // 3. 按优先级填充：hero → 竖图(右列) → 横图(底部)
  const rightCol = [...portraits.slice(0, 2)];
  const bottomRow = [...landscapes.slice(0, 2)];
  const overflow = [...portraits.slice(2), ...landscapes.slice(2)];

  // 不够时交叉补位
  while (rightCol.length < 2 && overflow.length > 0) {
    rightCol.push(overflow.shift()!);
  }
  while (bottomRow.length < 2 && overflow.length > 0) {
    bottomRow.push(overflow.shift()!);
  }

  const ordered = [hero, ...rightCol, ...bottomRow];

  // 4. 核心位置
  const tiles: MosaicTile[] = ordered
    .slice(0, CORE_SLOTS.length)
    .map((photo, i) => ({
      photo,
      mobileClass: CORE_SLOTS[i].mobile,
      desktopClass: CORE_SLOTS[i].desktop,
      delay: CORE_SLOTS[i].delay,
    }));

  // 5. 扩展位置（第 6 张起）
  overflow.forEach((photo, i) => {
    const pattern = EXT_PATTERNS[Math.floor(i / 3) % EXT_PATTERNS.length];
    tiles.push({
      photo,
      mobileClass: "col-span-1",
      desktopClass: `${pattern[i % 3]} mosaic-ext-row`,
      delay: 0.24 + i * 0.04,
    });
  });

  return tiles;
}

/* ================================================================
 *  PhotoSection — 主组件
 * ================================================================ */

export default function PhotoSection() {
  const tiles = useMemo(() => buildMosaicTiles(photos), []);

  return (
    <SectionWrapper id="photography" muted>
      <ScrollReveal delay={0} distance={30} duration={1.2}>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {photographySubtitle}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15} distance={35} duration={1.3}>
        <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
          {photographyTitle}
        </h2>
      </ScrollReveal>

      {/* ── 拼贴画布 ── */}
      <ScrollReveal delay={0.3} duration={1.4} blur={false} distance={30}>
        <div className="mt-14 overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]">
          <div
            className="mosaic-grid grid grid-cols-2 auto-rows-[140px] gap-[3px] md:gap-1"
            style={{ backgroundColor: "var(--color-card-border)" }}
          >
            {tiles.map((tile) => (
              <MosaicTileCard key={tile.photo.src} tile={tile} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}

/* ================================================================
 *  MosaicTileCard — 单张拼贴图片
 * ================================================================ */

function MosaicTileCard({ tile }: { tile: MosaicTile }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setTapped((prev) => !prev);
    }
  }, []);

  return (
    <div
      className={`
        group relative overflow-hidden cursor-pointer
        ${tile.mobileClass} ${tile.desktopClass}
      `}
      onClick={handleTap}
    >
      <Image
        src={tile.photo.src}
        alt={tile.photo.title}
        fill
        sizes="(max-width: 768px) 50vw, 40vw"
        placeholder="blur"
        blurDataURL={getShimmerPlaceholder()}
        className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
      />

      {/* 信息叠层 — hover 时从底部浮现 */}
      <div
        className={`
          absolute inset-0 flex items-end
          bg-gradient-to-t from-black/50 via-black/5 to-transparent
          transition-opacity duration-500
          ${tapped ? "opacity-100" : "opacity-0"}
          md:opacity-0 md:group-hover:opacity-100
        `}
      >
        <div
          className={`
            w-full p-4 md:p-5
            transition-transform duration-500 ease-out
            ${tapped ? "translate-y-0" : "translate-y-2"}
            md:translate-y-2 md:group-hover:translate-y-0
          `}
        >
          <h3 className="font-[family-name:var(--font-noto-serif)] text-base font-medium text-white md:text-lg">
            {tile.photo.title}
          </h3>
          {tile.photo.description && (
            <p className="mt-0.5 text-xs leading-relaxed text-white/70 md:text-sm">
              {tile.photo.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
