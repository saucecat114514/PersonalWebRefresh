import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import { siteConfig } from "@content/site.config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body className="bg-bg text-text antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
