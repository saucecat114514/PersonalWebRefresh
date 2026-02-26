import { siteConfig, socialLinks } from "@content/site.config";

/**
 * 简约底部 — 站点名 + 社交链接
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

        <p className="mt-6 text-center text-xs text-text-muted">
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sage-dark"
          >
            闽ICP备2026005708号
          </a>
        </p>
      </div>
    </footer>
  );
}
