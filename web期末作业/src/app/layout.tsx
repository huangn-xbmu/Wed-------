import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { WakaTimeStats } from "@/components/wakatime-stats";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QAnything Dashboard",
  description: "QAnything知识库和Agent管理平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-green-50`}
      >
        <div className="flex min-h-screen">
          {/* 主内容区域 */}
          <main className="flex-1 pr-80 pb-20">{children}</main>
          
          {/* 右侧边栏 */}
          <div className="fixed right-0 top-0 h-full w-80 bg-green-50 border-l border-green-200 shadow-lg z-10">
            <Navigation />
          </div>
          
          {/* 底部 WakaTime 统计 */}
          <div className="fixed bottom-0 left-0 right-80 bg-green-50 border-t border-green-200 shadow-lg z-10">
            <WakaTimeStats />
          </div>
        </div>
      </body>
    </html>
  );
}
