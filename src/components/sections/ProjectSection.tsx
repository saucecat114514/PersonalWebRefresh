"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  projectItems,
  projectsTitle,
  projectsSubtitle,
} from "@content/projects";
import type { ProjectItem } from "@/lib/types";

/**
 * 足迹模块 — v3 时间线卡片
 *
 * v3 动画规范：
 * - 分层进入: 标题 → 卡片从一侧轻微位移进入
 * - SpotlightCard 鼠标追踪光影
 * - 像记忆一条条浮现
 */
export default function ProjectSection() {
  return (
    <SectionWrapper id="projects">
      {/* 分层 1: 副标题 */}
      <ScrollReveal delay={0} distance={30} duration={1.2}>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {projectsSubtitle}
        </p>
      </ScrollReveal>

      {/* 分层 2: 主标题 */}
      <ScrollReveal delay={0.15} distance={35} duration={1.3}>
        <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
          {projectsTitle}
        </h2>
      </ScrollReveal>

      <div className="mt-14 space-y-6 md:space-y-8">
        {projectItems.map((item, index) => (
          <ProjectCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  return (
    <ScrollReveal
      delay={0.3 + index * 0.15}
      direction="left"
      distance={25}
      duration={1.2}
    >
      <SpotlightCard
        className="p-6 md:p-8"
        hoverY={-3}
        as={item.link ? "a" : "div"}
        href={item.link}
        target={item.link ? "_blank" : undefined}
        rel={item.link ? "noopener noreferrer" : undefined}
      >
        <div className="relative z-20 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-[family-name:var(--font-noto-serif)] text-xl font-semibold">
                {item.title}
              </h3>
              {item.link && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-text-muted transition-transform duration-500 group-hover:translate-x-0.5 group-hover:text-sage-dark"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <p className="mt-2 leading-[1.7] text-text-muted">
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sage-light/40 px-3 py-1 text-xs text-sage-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {item.period && (
            <span className="shrink-0 text-sm text-text-muted md:mt-1">
              {item.period}
            </span>
          )}
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}
