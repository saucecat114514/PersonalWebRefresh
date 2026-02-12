"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export default function Card({
  children,
  className = "",
  hover = true,
  as = "div",
}: CardProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={`
        bg-card border border-card-border
        rounded-[var(--radius-card)]
        shadow-[var(--shadow-card)]
        p-6 md:p-8
        ${className}
      `}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 20px 55px rgba(0,0,0,0.06)",
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
