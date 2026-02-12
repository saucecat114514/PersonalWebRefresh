import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** 是否使用过渡背景色 */
  muted?: boolean;
}

/**
 * 区块包裹器 — 统一区块间距（80-140px）和最大宽度
 * 每一模块之间必须有明显留白断层
 *
 * v3: 添加渐变过渡带，muted 区域上下边缘与白色背景柔和过渡
 */
export default function SectionWrapper({
  children,
  className = "",
  id,
  muted = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`
        relative
        py-20 md:py-28 lg:py-[140px]
        ${muted ? "bg-bg-muted" : ""}
        ${className}
      `}
    >
      {/* 顶部渐变过渡带: 从上一个区域的颜色柔和过渡 */}
      {muted && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg to-transparent" />
      )}

      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        {children}
      </div>

      {/* 底部渐变过渡带: 柔和过渡到下一个区域 */}
      {muted && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
      )}
    </section>
  );
}
