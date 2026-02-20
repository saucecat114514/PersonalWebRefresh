"use client";

import { useRef, useState, useCallback, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { EASE_CURVE } from "@/components/ui/ScrollReveal";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** hover 上浮距离 (px)，默认 -5 */
  hoverY?: number;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * 带鼠标追踪光影效果的卡片
 * hover 时跟随鼠标显示一个柔和的径向渐变光斑
 */
export default function SpotlightCard({
  children,
  className = "",
  style,
  hoverY = -5,
  as = "div",
  href,
  target,
  rel,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const Component = as === "a" ? motion.a : motion.div;
  const linkProps = as === "a" ? { href, target, rel } : {};

  return (
    <Component
      ref={cardRef as React.Ref<HTMLDivElement> & React.Ref<HTMLAnchorElement>}
      className={`
        group relative block overflow-hidden
        rounded-[var(--radius-card)] border border-card-border
        bg-card shadow-[var(--shadow-card)]
        ${className}
      `}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: hoverY,
        boxShadow: "0 20px 55px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.6, ease: EASE_CURVE }}
      {...linkProps}
    >
      {/* Spotlight 光影层 */}
      <div
        className="pointer-events-none absolute -inset-px z-10 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 182, 161, 0.12), transparent 60%)`
            : "none",
        }}
      />
      {children}
    </Component>
  );
}
