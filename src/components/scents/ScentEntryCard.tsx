"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScentEntry } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function RatingDots({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 text-[10px] text-text-muted">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`inline-block h-[6px] w-[6px] rounded-full ${
              i < value ? "bg-sage-dark" : "bg-card-border/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function NoteColumn({
  title,
  notes,
}: {
  title: string;
  notes: string[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className="mb-1.5 text-[10px] font-medium tracking-wider text-text-muted uppercase">
        {title}
      </p>
      <div className="flex flex-wrap gap-1">
        {notes.map((n) => (
          <span
            key={n}
            className="rounded bg-bg-muted/60 px-2 py-0.5 text-xs text-text-muted"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScentEntryCard({ entry }: { entry: ScentEntry }) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [textExpanded, setTextExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setImgLoaded(true);
  }, []);

  const shouldTruncate = entry.text.length > 80;

  return (
    <div
      id={`entry-${entry.id}`}
      className="rounded-[var(--radius-card)] border border-card-border bg-card shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* === 上半区：档案栏 === */}
      <div className="p-5 pb-4 md:p-6 md:pb-4">
        {/* 标题行 */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-noto-serif)] text-lg font-semibold">
              {entry.name}
            </h3>
            <p className="mt-0.5 text-xs text-text-muted">{entry.brand}</p>
          </div>
          <span className="shrink-0 text-sm text-text-muted">{entry.year}</span>
        </div>

        {/* 次级信息 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
          <span>{entry.concentration}</span>
          <span className="text-card-border">·</span>
          <span>{entry.family.join(" / ")}</span>
          {entry.season.length > 0 && (
            <>
              <span className="text-card-border">·</span>
              <span>{entry.season.join(" / ")}</span>
            </>
          )}
        </div>

        {/* 评分 */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <RatingDots label="喜欢" value={entry.liking} />
          <RatingDots label="扩散" value={entry.sillage} />
          <RatingDots label="持久" value={entry.longevity} />
        </div>

        {/* 标签 */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage-light/30 px-2.5 py-0.5 text-xs text-sage-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* === 中部：香调结构（可折叠） === */}
      <div className="border-t border-card-border/50 px-5 md:px-6">
        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className="flex w-full items-center justify-between py-3 text-xs text-text-muted transition-colors hover:text-sage-dark"
        >
          <span>
            {notesOpen ? "收起香调" : "展开香调"}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-300 ${notesOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence initial={false}>
          {notesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="flex gap-4 pb-4 md:gap-6">
                <NoteColumn title="前调" notes={entry.topNotes} />
                <NoteColumn title="中调" notes={entry.middleNotes} />
                <NoteColumn title="后调" notes={entry.baseNotes} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === 下半区：文字记录 === */}
      <div className="border-t border-card-border/50 p-5 md:p-6">
        <div className="relative">
          <p
            className={`text-sm leading-[1.85] text-text/85 ${
              !textExpanded && shouldTruncate ? "line-clamp-2" : ""
            }`}
          >
            {entry.text}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setTextExpanded(!textExpanded)}
              className="mt-2 text-xs text-text-muted transition-colors hover:text-sage-dark"
            >
              {textExpanded ? "收起" : "展开全文"}
            </button>
          )}
        </div>

        {/* 场景与记忆锚点 */}
        {(entry.sceneMemory || entry.memoryAnchor) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
            {entry.sceneMemory && (
              <div>
                <span className="mr-1.5 text-[10px] tracking-wider uppercase opacity-60">
                  场景
                </span>
                {entry.sceneMemory}
              </div>
            )}
            {entry.memoryAnchor && (
              <div>
                <span className="mr-1.5 text-[10px] tracking-wider uppercase opacity-60">
                  记忆
                </span>
                {entry.memoryAnchor}
              </div>
            )}
          </div>
        )}
      </div>

      {/* === 尾部：氛围图 === */}
      <div className="overflow-hidden rounded-b-[var(--radius-card)]">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <img
            ref={imgRef}
            src={entry.imageSrc}
            alt={`${entry.name} 氛围`}
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
