"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import ScentsHero from "@/components/scents/ScentsHero";
import FilterPanel, {
  type FilterState,
} from "@/components/scents/FilterPanel";
import FeaturedPickCard from "@/components/scents/FeaturedPickCard";
import ScentEntryCard from "@/components/scents/ScentEntryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { scentEntries } from "@content/scents";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScentsPage() {
  const [filters, setFilters] = useState<FilterState>({
    season: [],
    scene: [],
    family: [],
    mood: [],
  });

  const featuredEntry = scentEntries.find((e) => e.featured);

  const filteredEntries = useMemo(() => {
    return scentEntries.filter((entry) => {
      if (
        filters.season.length > 0 &&
        !entry.season.some((s) => filters.season.includes(s))
      )
        return false;
      if (
        filters.scene.length > 0 &&
        !entry.scene.some((s) => filters.scene.includes(s))
      )
        return false;
      if (
        filters.family.length > 0 &&
        !entry.family.some((s) => filters.family.includes(s))
      )
        return false;
      if (
        filters.mood.length > 0 &&
        !entry.mood.some((s) => filters.mood.includes(s))
      )
        return false;
      return true;
    });
  }, [filters]);

  const nonFeaturedEntries = filteredEntries.filter((e) => !e.featured);
  const showFeatured =
    featuredEntry && filteredEntries.some((e) => e.id === featuredEntry.id);

  const hasFilters =
    filters.season.length > 0 ||
    filters.scene.length > 0 ||
    filters.family.length > 0 ||
    filters.mood.length > 0;

  return (
    <PageTransition>
      <ScentsHero />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-16">
        {/* 移动端筛选 */}
        <div className="mb-6 md:hidden">
          <FilterPanel
            mobile
            filters={filters}
            onFilterChange={setFilters}
            entries={scentEntries}
          />
        </div>

        <div className="flex gap-10 lg:gap-12">
          {/* 桌面端左栏：筛选面板 */}
          <aside className="hidden w-[240px] shrink-0 md:block lg:w-[260px]">
            <div className="sticky top-24">
              <motion.div
                className="rounded-[var(--radius-card)] border border-card-border bg-card p-5 shadow-[var(--shadow-card)]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              >
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  entries={scentEntries}
                />
              </motion.div>
            </div>
          </aside>

          {/* 右栏：主内容 */}
          <div className="min-w-0 flex-1">
            {/* Featured 主视觉 */}
            {showFeatured && featuredEntry && (
              <div className="mb-6">
                <FeaturedPickCard entry={featuredEntry} />
              </div>
            )}

            {/* Featured 完整条目卡（锚点目标，供"阅读这条记录"跳转） */}
            {showFeatured && featuredEntry && (
              <ScrollReveal
                delay={0.1}
                direction="up"
                distance={20}
                duration={1}
                blur={false}
              >
                <div className="mb-6">
                  <ScentEntryCard entry={featuredEntry} />
                </div>
              </ScrollReveal>
            )}

            {/* 其余条目列表 */}
            {nonFeaturedEntries.length > 0 ? (
              <div className="space-y-6">
                {nonFeaturedEntries.map((entry, index) => (
                  <ScrollReveal
                    key={entry.id}
                    delay={0.1 + index * 0.08}
                    direction="up"
                    distance={20}
                    duration={1}
                    blur={false}
                  >
                    <ScentEntryCard entry={entry} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              hasFilters && (
                <motion.div
                  className="py-20 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-text-muted">
                    没有匹配的记录，试试调整筛选条件
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        season: [],
                        scene: [],
                        family: [],
                        mood: [],
                      })
                    }
                    className="mt-3 text-xs text-sage-dark transition-colors hover:text-sage"
                  >
                    清空筛选
                  </button>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
