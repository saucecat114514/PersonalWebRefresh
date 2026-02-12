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
              boxShadow: "0 18px 50px rgba(0,0,0,0.07)",
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
