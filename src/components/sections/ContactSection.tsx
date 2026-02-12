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
 * 联系方式区块
 * 简约风格 — 清晰的链接列表 + 友情链接
 */
export default function ContactSection() {
  return (
    <SectionWrapper id="contact" muted>
      <ScrollReveal>
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
              <div className="mt-5 flex flex-wrap justify-center gap-4">
                {friendLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm text-text-muted shadow-[var(--shadow-card)] transition-all hover:border-sage-light hover:text-sage-dark hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
                    title={link.description}
                  >
                    {link.name}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-0 transition-opacity group-hover/link:opacity-100"
                    >
                      <path
                        d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5V7"
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
