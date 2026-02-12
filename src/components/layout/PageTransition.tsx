"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * 页面切换动画包裹器 — v2 空间切换
 *
 * v2 规范要求：
 * - Enter: opacity 0→1, translateY 30→0, scale 0.98→1, blur 6px→0
 * - 视觉目标：页面像在"空间中前后移动"
 * - 速度放缓以增加沉浸感
 */
const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{ duration: 1.0, ease: EASE_CURVE }}
    >
      {children}
    </motion.div>
  );
}
