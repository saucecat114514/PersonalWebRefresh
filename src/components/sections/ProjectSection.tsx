"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  projectItems,
  projectsTitle,
  projectsSubtitle,
} from "@content/projects";
import type { ProjectItem } from "@/lib/types";

/**
 * 项目/经历展示区块
 * 使用时间线式的卡片排列
 */
export default function ProjectSection() {
  return (
    <SectionWrapper id="projects">
      <ScrollReveal>
        <p className="text-sm tracking-widest text-sage-dark uppercase">
          {projectsSubtitle}
        </p>
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
  const CardWrapper = item.link ? "a" : "div";
  const linkProps = item.link
    ? { href: item.link, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{
          y: -3,
          boxShadow: "0 18px 50px rgba(0,0,0,0.07)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CardWrapper
          {...linkProps}
          className="group block overflow-hidden rounded-[var(--radius-card)] border border-card-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
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
                    className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-sage-dark"
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
        </CardWrapper>
      </motion.div>
    </ScrollReveal>
  );
}
