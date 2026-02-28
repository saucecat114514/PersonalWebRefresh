import Image from "next/image";
import { siteConfig, socialLinks } from "@content/site.config";

/**
 * 简约底部 — 站点名 + 社交链接 + 备案信息
 */
export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-bg py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-sage-dark"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sage-dark"
          >
            {siteConfig.icpRecord}
          </a>
          {siteConfig.gonganRecord && siteConfig.gonganRecordCode && (
            <a
              href={`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${siteConfig.gonganRecordCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-sage-dark"
            >
              <Image
                src="/images/gongicon.webp"
                alt="公安备案"
                width={14}
                height={14}
                className="shrink-0"
              />
              {siteConfig.gonganRecord}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
