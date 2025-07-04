"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <nav className="bg-green-50 border-b border-green-200 p-6">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-green-800">
          QAnything
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href="/chat"
          className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive("/chat")
              ? "bg-green-200 text-green-900 border-l-4 border-green-600 shadow-sm"
              : "text-green-800 hover:text-green-900 hover:bg-green-100"
          }`}
        >
          💬 智能对话
        </Link>

        <Link
          href="/agents"
          className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive("/agents")
              ? "bg-green-200 text-green-900 border-l-4 border-green-600 shadow-sm"
              : "text-green-800 hover:text-green-900 hover:bg-green-100"
          }`}
        >
          🤖 智能助手
        </Link>

        <Link
          href="/"
          className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive("/") && pathname === "/"
              ? "bg-green-200 text-green-900 border-l-4 border-green-600 shadow-sm"
              : "text-green-800 hover:text-green-900 hover:bg-green-100"
          }`}
        >
          📚 知识库
        </Link>

        <Link
          href="/homework"
          className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive("/homework")
              ? "bg-green-200 text-green-900 border-l-4 border-green-600 shadow-sm"
              : "text-green-800 hover:text-green-900 hover:bg-green-100"
          }`}
        >
          📝 作业展示
        </Link>
      </div>
    </nav>
  );
}
