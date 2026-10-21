"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type NewsListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

const PAGE_SIZE = 6;

// Danh sách bài: lọc theo chủ đề, thẻ ngang gọn trên điện thoại (ảnh trái, tiêu đề phải), nút "Xem thêm".
// Bài vượt quá số đang hiện chỉ ẩn bằng CSS, link vẫn có trong HTML để Google thu thập.
export default function NewsList({ articles }: { articles: NewsListItem[] }) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const categories = useMemo(() => [...new Set(articles.map((article) => article.category))], [articles]);
  const filtered = articles.filter((article) => !category || article.category === category);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-red-400"
    }`;

  const choose = (value: string) => {
    setCategory(value);
    setLimit(PAGE_SIZE);
  };

  return (
    <>
      {categories.length > 1 && (
        <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          <button type="button" aria-pressed={!category} onClick={() => choose("")} className={chip(!category)}>
            Tất cả ({articles.length})
          </button>
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => choose(item)} className={chip(category === item)}>
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {articles.map((article) => {
          const index = filtered.indexOf(article);
          const visible = index >= 0 && index < limit;
          return (
            <article
              key={article.id}
              className={`${visible ? "" : "hidden"} overflow-hidden border border-gray-200 bg-white`}
            >
              <Link href={`/tin-tuc/${article.slug}`} className="group flex gap-3 p-3 sm:block sm:p-0">
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden sm:aspect-[16/9] sm:w-full sm:rounded-none">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="min-w-0 sm:p-6">
                  <p className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                    <span className="font-semibold text-red-700">{article.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{article.date}</span>
                  </p>

                  <h3 className="mt-1 line-clamp-3 font-bold leading-snug group-hover:text-red-700 sm:mt-3 sm:text-xl">
                    {article.title}
                  </h3>

                  <p className="mt-3 hidden leading-7 text-gray-600 sm:line-clamp-3">{article.excerpt}</p>

                  <span className="mt-4 hidden font-semibold text-red-700 sm:inline-flex">Đọc tiếp →</span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {filtered.length > limit && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setLimit(limit + PAGE_SIZE)}
            className="rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-700"
          >
            Xem thêm {Math.min(PAGE_SIZE, filtered.length - limit)} bài
          </button>
        </div>
      )}
    </>
  );
}
