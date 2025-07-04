"use client";

import { useState } from "react";
import Link from "next/link";

interface Homework {
  title: string;
  description: string;
  file: string;
  date: string;
  category: string;
}

const homeworkList: Homework[] = [
  {
    title: "CSS 基础练习 1",
    description: "学习CSS的三种使用方式：外部样式表、内部样式表和内嵌样式表",
    file: "/01-css-01.html",
    date: "2024-03-01",
    category: "CSS",
  },
  {
    title: "CSS 基础练习 2",
    description: "学习CSS选择器、字体样式和链接样式",
    file: "/01-css-02.html",
    date: "2024-03-02",
    category: "CSS",
  },
  {
    title: "法式烘焙网站设计",
    description: "使用CSS制作一个完整的法式烘焙网站，包含响应式设计",
    file: "/04-css-01.html",
    date: "2024-03-05",
    category: "CSS",
  },
  {
    title: "JavaScript 核心语法",
    description: "学习JavaScript的基础语法、变量、数据类型和函数",
    file: "/05-news-01.html",
    date: "2024-03-10",
    category: "JavaScript",
  },
  {
    title: "JavaScript 面向对象编程",
    description: "学习JavaScript的类、继承和DOM操作",
    file: "/06-news-01.html",
    date: "2024-03-15",
    category: "JavaScript",
  },
  {
    title: "JavaScript 异步编程",
    description: "学习JavaScript的异步编程、Promise和定时器",
    file: "/07-async-01.html",
    date: "2024-03-20",
    category: "JavaScript",
  },
];

export default function HomeworkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(homeworkList.map((hw) => hw.category))];

  const filteredHomework =
    selectedCategory === "all"
      ? homeworkList
      : homeworkList.filter((hw) => hw.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        前端开发作业展示
      </h1>

      {/* 分类筛选 */}
      <div className="mb-8">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-green-200 text-green-900"
                  : "bg-green-50 text-green-800 hover:bg-green-100"
              }`}
            >
              {category === "all" ? "全部" : category}
            </button>
          ))}
        </div>
      </div>

      {/* 作业列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomework.map((homework, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {homework.category}
                </span>
                <span className="text-sm text-gray-500">{homework.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {homework.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {homework.description}
              </p>
              <Link
                href={homework.file}
                target="_blank"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                查看作业
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
