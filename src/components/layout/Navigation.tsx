"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, siteConfig } from "@content/site.config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-bg/80 backdrop-blur-md shadow-[0_1px_0_var(--color-card-border)]"
              : "bg-transparent"
          }
        `}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          {/* Logo / Site name */}
          <a
            href="#"
            className={`
              font-[family-name:var(--font-noto-serif)] text-lg font-semibold
              transition-colors duration-300
              ${scrolled ? "text-text" : "text-card"}
            `}
          >
            {siteConfig.name}
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`
                    text-sm tracking-wide
                    transition-colors duration-300 hover:text-sage-dark
                    ${scrolled ? "text-text-muted" : "text-card/80"}
                  `}
                >
                  {item.label}
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
                  : scrolled
                    ? "bg-text"
                    : "bg-card"
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${
                mobileOpen
                  ? "-translate-y-[4.5px] -rotate-45 bg-text"
                  : scrolled
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
            className="fixed inset-0 z-40 flex items-center justify-center bg-bg/95 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
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
