import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";

const contentDir = path.join(process.cwd(), "content");

/**
 * 读取并编译 MDX 文件
 * @param filename - content 目录下的文件名，如 "about.mdx"
 */
export async function getMDXContent(filename: string): Promise<{
  content: ReactElement;
  frontmatter: Record<string, unknown>;
}> {
  const filePath = path.join(contentDir, filename);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: frontmatter } = matter(source);

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      parseFrontmatter: false,
    },
  });

  return { content, frontmatter };
}
