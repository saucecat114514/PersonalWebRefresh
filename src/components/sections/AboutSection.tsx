import { getMDXContent } from "@/lib/mdx";
import SectionWrapper from "@/components/ui/SectionWrapper";

/**
 * 个人简介区块
 * 结构：半屏宽文字块 + 留白/摄影
 * 气质像序言，而不是简历
 */
export default async function AboutSection() {
  const { content, frontmatter } = await getMDXContent("about.mdx");
  const title = (frontmatter.title as string) ?? "关于我";
  const subtitle = frontmatter.subtitle as string | undefined;

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* 文字区域 — 占 7 列 */}
        <div className="lg:col-span-7">
          {subtitle && (
            <p className="mb-3 text-sm tracking-widest text-sage-dark uppercase">
              {subtitle}
            </p>
          )}
          <h2 className="font-[family-name:var(--font-noto-serif)] text-3xl font-semibold leading-snug md:text-4xl">
            {title}
          </h2>
          <div className="prose prose-lg mt-8 max-w-none leading-[1.8] text-text-muted">
            {content}
          </div>
        </div>

        {/* 右侧留白 + 装饰图形 — 占 5 列 */}
        <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
          <div className="relative h-72 w-56">
            {/* 装饰性抽象形状组合 */}
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sage-light/20" />
            <div className="absolute bottom-4 left-0 h-36 w-36 rounded-[var(--radius-lg)] bg-sage/10" />
            <div className="absolute right-8 bottom-12 h-20 w-20 rounded-full border border-card-border" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
