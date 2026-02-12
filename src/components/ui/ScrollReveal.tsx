"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

/**
 * Slow Moments Motion System v2 — 统一缓动曲线
 * cubic-bezier(0.22, 1, 0.36, 1)
 */
const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** 动画延迟（秒） */
  delay?: number;
  /** 从哪个方向滑入 */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** 滑入距离（px） */
  distance?: number;
  /** 动画时长（秒），默认 1.3s（v2: 放慢节奏） */
  duration?: number;
  /** 是否只触发一次，默认 true（规范要求） */
  once?: boolean;
  /** 是否启用景深模糊（Depth Reveal），默认 true */
  blur?: boolean;
  /** 模糊强度 (px)，默认 8，不超过 10 */
  blurAmount?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  duration = 1.3,
  once = true,
  blur = true,
  blurAmount = 8,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px 0px",
  });

  // 动画完成后移除 will-change 释放 GPU 内存
  const [animationComplete, setAnimationComplete] = useState(false);

  const directionOffset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  // v2: Depth Reveal — 进入前带轻微模糊，元素像从空气中浮现
  const blurFilter = blur ? `blur(${blurAmount}px)` : "blur(0px)";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        willChange: animationComplete ? "auto" : "transform, opacity, filter",
      }}
      initial={{
        opacity: 0,
        filter: blurFilter,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, filter: blurFilter, ...directionOffset[direction] }
      }
      transition={{
        duration,
        delay,
        ease: EASE_CURVE,
      }}
      onAnimationComplete={() => {
        if (isInView) setAnimationComplete(true);
      }}
    >
      {children}
    </motion.div>
  );
}

export { EASE_CURVE };
