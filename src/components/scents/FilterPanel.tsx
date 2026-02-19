"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScentEntry } from "@/lib/types";
import { SEASONS, SCENES, FAMILIES, MOODS } from "@content/scents";

export interface FilterState {
  season: string[];
  scene: string[];
  family: string[];
  mood: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  entries: ScentEntry[];
  mobile?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getTopKeywords(entries: ScentEntry[], n: number): string[] {
  const freq: Record<string, number> = {};
  entries.forEach((e) =>
    e.tags.forEach((t) => {
      freq[t] = (freq[t] || 0) + 1;
    }),
  );
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

function getSeasonalTop3(
  entries: ScentEntry[],
  currentSeason: string,
): ScentEntry[] {
  return entries
    .filter((e) => e.season.includes(currentSeason))
    .sort((a, b) => b.liking - a.liking)
    .slice(0, 3);
}

function getCurrentSeason(): string {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "春";
  if (m >= 5 && m <= 7) return "夏";
  if (m >= 8 && m <= 10) return "秋";
  if ((m >= 11 && m <= 12) || (m == 1)) return "冬";
  return "季";
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs transition-all duration-300 ${
        active
          ? "bg-sage-dark text-white shadow-sm"
          : "bg-sage-light/30 text-sage-dark hover:bg-sage-light/50"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSection({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (val: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-card-border/60 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-xs font-medium tracking-wide text-text-muted uppercase"
      >
        {title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-1 pb-1">
              {options.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  active={selected.includes(opt)}
                  onClick={() => onToggle(opt)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterPanel({
  filters,
  onFilterChange,
  entries,
  mobile = false,
}: FilterPanelProps) {
  const currentSeason = getCurrentSeason();
  const seasonalTop3 = getSeasonalTop3(entries, currentSeason);
  const topKeywords = getTopKeywords(entries, 5);
  const recentEntries = [...entries].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 3);

  const hasFilters =
    filters.season.length > 0 ||
    filters.scene.length > 0 ||
    filters.family.length > 0 ||
    filters.mood.length > 0;

  function toggle(key: keyof FilterState, val: string) {
    const arr = filters[key];
    const next = arr.includes(val)
      ? arr.filter((v) => v !== val)
      : [...arr, val];
    onFilterChange({ ...filters, [key]: next });
  }

  function clearAll() {
    onFilterChange({ season: [], scene: [], family: [], mood: [] });
  }

  if (mobile) {
    const allChips = [
      ...SEASONS.map((s) => ({ label: s, key: "season" as const })),
      ...MOODS.map((s) => ({ label: s, key: "mood" as const })),
      ...FAMILIES.map((s) => ({ label: s, key: "family" as const })),
    ];

    return (
      <div className="md:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="shrink-0 rounded-full border border-card-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-sage"
            >
              清除
            </button>
          )}
          {allChips.map((chip) => (
            <Chip
              key={`${chip.key}-${chip.label}`}
              label={chip.label}
              active={filters[chip.key].includes(chip.label)}
              onClick={() => toggle(chip.key, chip.label)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* 筛选头部 */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-medium tracking-wider text-text-muted uppercase">
          筛选
        </h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-text-muted transition-colors hover:text-sage-dark"
          >
            清空
          </button>
        )}
      </div>

      <FilterSection
        title="季节"
        options={SEASONS}
        selected={filters.season}
        onToggle={(v) => toggle("season", v)}
      />
      <FilterSection
        title="场景"
        options={SCENES}
        selected={filters.scene}
        onToggle={(v) => toggle("scene", v)}
      />
      <FilterSection
        title="气味家族"
        options={FAMILIES}
        selected={filters.family}
        onToggle={(v) => toggle("family", v)}
      />
      <FilterSection
        title="情绪"
        options={MOODS}
        selected={filters.mood}
        onToggle={(v) => toggle("mood", v)}
        defaultOpen={false}
      />

      {/* Mini Stats */}
      <div className="mt-6 space-y-5 pt-4">
        <div>
          <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-muted uppercase">
            本{currentSeason}最常用
          </h4>
          <div className="space-y-1.5">
            {seasonalTop3.map((e) => (
              <p key={e.id} className="text-xs text-text-muted">
                <span className="text-text">{e.name}</span>
                <span className="mx-1.5 text-card-border">·</span>
                {e.brand}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-muted uppercase">
            最近新增
          </h4>
          <div className="space-y-1.5">
            {recentEntries.map((e) => (
              <p key={e.id} className="text-xs text-text-muted">
                <span className="text-text">{e.name}</span>
                <span className="mx-1.5 text-card-border">·</span>
                {e.year}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-muted uppercase">
            高频关键词
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {topKeywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-sage-light/25 px-2 py-0.5 text-[10px] text-sage-dark"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
