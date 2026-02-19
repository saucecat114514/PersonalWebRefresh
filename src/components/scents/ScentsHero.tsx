"use client";

import { motion } from "framer-motion";
import {
  scentsTitle,
  scentsSubtitle,
  scentsQuote,
  scentEntries,
} from "@content/scents";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const KEYWORD_CHIPS = ["花香", "木质", "皂感", "雨后", "夜晚", "秋意"];

export default function ScentsHero() {
  const totalCount = scentEntries.length;
  const latestYear = scentEntries.reduce(
    (max, e) => (e.year > max ? e.year : max),
    "2024",
  );

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      {/* 柔和渐变背景 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f0efe9] via-bg to-bg" />

      {/* 极淡装饰线条 */}
      <svg
        className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-[0.04]"
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-50 200 C200 120, 400 280, 600 180 S1000 260, 1250 160"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-sage-dark"
        />
        <path
          d="M-50 260 C150 180, 350 340, 550 240 S950 320, 1250 220"
          stroke="currentColor"
          strokeWidth="1"
          className="text-sage"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        {/* 返回链接 */}
        <motion.a
          href="/#projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-sage-dark"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          返回足迹
        </motion.a>

        {/* 英文副标题 */}
        <motion.p
          className="text-sm tracking-[0.2em] text-sage-dark uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        >
          {scentsSubtitle}
        </motion.p>

        {/* 主标题 */}
        <motion.h1
          className="mt-3 font-[family-name:var(--font-noto-serif)] text-3xl font-semibold md:text-4xl lg:text-[2.5rem]"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        >
          {scentsTitle}
        </motion.h1>

        {/* 引言 */}
        <motion.p
          className="mt-4 max-w-xl leading-[1.8] text-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
        >
          {scentsQuote}
        </motion.p>

        {/* 信息条 + 关键词 */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3 text-xs text-text-muted"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          <span className="rounded-full border border-card-border px-3 py-1">
            {totalCount} 条记录
          </span>
          <span className="rounded-full border border-card-border px-3 py-1">
            更新于 {latestYear}
          </span>
          <span className="mx-1 text-card-border">|</span>
          {KEYWORD_CHIPS.map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-sage-light/30 px-2.5 py-0.5 text-sage-dark"
            >
              {kw}
            </span>
          ))}
        </motion.div>

        {/* 季节时间线 */}
        <motion.div
          className="mt-8 flex items-center gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.65, ease: EASE }}
        >
          {(["Spring", "Summer", "Autumn", "Winter"] as const).map(
            (s, i) => (
              <div key={s} className="flex items-center">
                {i > 0 && (
                  <div className="h-px w-8 bg-card-border md:w-12" />
                )}
                <span className="text-[10px] tracking-wider text-text-muted/60 uppercase">
                  {s}
                </span>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
