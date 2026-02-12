"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  contactItems,
  contactTitle,
  contactSubtitle,
  friendLinks,
} from "@content/contact";

/**
 * 联系方式区块 — v2 结尾
 *
 * v2 动画规范（找到我）：
 * - 只做 opacity 0→1, 无位移, 无 scale
 * - duration 1.8s（放慢节奏）
 * - 无 blur（自然落地，不需要景深效果）
 * - 效果：自然落地
 */
export default function ContactSection() {
  return (
    <SectionWrapper id="contact" muted>
      <ScrollReveal direction="none" duration={1.8} distance={0} blur={false}>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm tracking-widest text-sage-dark uppercase">
            {contactSubtitle}
          </p>
          <h2 className="font-[family-name:var(--font-noto-serif)] mt-2 text-3xl font-semibold md:text-4xl">
            {contactTitle}
          </h2>

          <div className="mt-12 space-y-6">
            {contactItems.map((item) => (
              <div key={item.label} className="group">
                <p className="text-xs tracking-wider text-text-muted uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={
                      item.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-lg text-text transition-colors hover:text-sage-dark"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-lg text-text">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* 友情链接 */}
          {friendLinks.length > 0 && (
            <div className="mt-16 border-t border-card-border pt-10">
              <p className="text-xs tracking-wider text-text-muted uppercase">
                友情链接
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-5">
                {friendLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-card-border bg-card px-8 py-5 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-sage-light hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                    title={link.description}
                  >
                    {/* 头像占位符 */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light/30 text-sm font-semibold text-sage-dark">
                      {link.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base font-medium text-text transition-colors group-hover/link:text-sage-dark">
                      {link.name}
                    </span>
                    {link.description && (
                      <span className="text-xs text-text-muted">
                        {link.description}
                      </span>
                    )}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-1 text-text-muted/40 transition-all duration-400 group-hover/link:text-sage-dark group-hover/link:translate-x-0.5"
                    >
                      <path
                        d="M4 10L10 4M10 4H5.5M10 4V8.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
