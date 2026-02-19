"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { ScentEntry } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FeaturedPickCard({ entry }: { entry: ScentEntry }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setImageLoaded(true);
  }, []);

  return (
    <motion.div
      className="group overflow-hidden rounded-[var(--radius-lg)] border border-card-border bg-card shadow-[var(--shadow-card)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
    >
      <div className="flex flex-col md:flex-row">
        {/* 左侧图片 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-[45%]">
          <img
            ref={imgRef}
            src={entry.imageSrc}
            alt={entry.name}
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-card/10" />
        </div>

        {/* 右侧内容 */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-10">
          {/* 品牌 */}
          <p className="text-xs tracking-wider text-text-muted uppercase">
            {entry.brand}
          </p>

          {/* 香水名 */}
          <h2 className="mt-2 font-[family-name:var(--font-noto-serif)] text-2xl font-semibold md:text-3xl">
            {entry.name}
          </h2>

          {/* 关键词 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sage-light/40 px-3 py-1 text-xs text-sage-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 核心感受 */}
          <p className="mt-5 font-[family-name:var(--font-noto-serif)] text-base leading-[1.8] text-text/90 italic">
            &ldquo;{entry.shortFeeling}&rdquo;
          </p>

          {/* 季节理由 */}
          {entry.sceneMemory && (
            <p className="mt-2 text-sm text-text-muted">
              {entry.sceneMemory}
            </p>
          )}

          {/* 阅读按钮 */}
          <a
            href={`#entry-${entry.id}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-300 hover:text-sage-dark"
          >
            阅读这条记录
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-400 group-hover:translate-x-0.5"
            >
              <path
                d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
