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
        py-20 md:py-28 lg:py-[140px]
        ${muted ? "bg-bg-muted" : ""}
        ${className}
      `}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  );
}
