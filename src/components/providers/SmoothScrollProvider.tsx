"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * 全局平滑滚动 Provider
 * 基于 Lenis，提供柔和的惯性滚动体验
 * 与 Framer Motion useScroll 完全兼容
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
