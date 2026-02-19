"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { navItems, siteConfig } from "@content/site.config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const darkText = scrolled || !isHome;

  // 滚动进度指示条
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* v3: 导航栏 — 滚动后半透明 + backdrop blur + 平滑过渡 */}
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-700 ease-out
          ${
            scrolled
              ? "bg-bg/75 backdrop-blur-lg shadow-[0_1px_0_var(--color-card-border)]"
              : "bg-transparent backdrop-blur-none"
          }
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 滚动进度指示条 */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-sage/60"
          style={{ width: progressWidth }}
        />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          {/* Logo / Site name */}
          <a
            href="#"
            className={`
              font-[family-name:var(--font-noto-serif)] text-lg font-semibold
              transition-colors duration-300
              ${darkText ? "text-text" : "text-card"}
            `}
          >
            {siteConfig.name}
          </a>

          {/* Desktop nav links — hover 下划线动画 */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`
                    group relative text-sm tracking-wide
                    transition-colors duration-300 hover:text-sage-dark
                    ${darkText ? "text-text-muted" : "text-card/80"}
                  `}
                >
                  {item.label}
                  {/* hover 下划线: scaleX(0) -> scaleX(1) */}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-sage-dark transition-transform duration-400 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${
                mobileOpen
                  ? "translate-y-[4.5px] rotate-45 bg-text"
                  : darkText
                    ? "bg-text"
                    : "bg-card"
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${
                mobileOpen
                  ? "-translate-y-[4.5px] -rotate-45 bg-text"
                  : darkText
                    ? "bg-text"
                    : "bg-card"
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-bg/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    className="font-[family-name:var(--font-noto-serif)] text-xl text-text transition-colors hover:text-sage-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
