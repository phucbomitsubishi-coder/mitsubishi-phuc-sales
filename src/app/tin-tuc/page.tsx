import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { newsArticles } from "@/data/news";
import { advisoryArticles } from "@/data/advisory";
import NewsList from "./NewsList";

export const metadata: Metadata = createPageMetadata({
  title: "Tin tức & Tư vấn Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Tin tức Mitsubishi, tư vấn mua xe, kinh nghiệm sử dụng, khuyến mãi và thông tin thị trường ô tô.",
  path: "/tin-tuc",
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

// Số bài tư vấn hiện sẵn (bài mới nhất trước); các bài còn lại vẫn có trong HTML nhưng ẩn, xem đủ ở /tu-van
const ADVISORY_SHOWN = 6;

export default function NewsPage() {
  const featuredArticle = newsArticles.find((article) => article.featured);

  const otherArticles = newsArticles.filter((article) => article.slug !== featuredArticle?.slug);

  // Bài so sánh/tư vấn mới nhất trước (bài mới được thêm vào cuối advisory.ts)
  const advisoryNewestFirst = [...advisoryArticles].reverse();

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* BANNER: bài nổi bật, ảnh tràn ngang (đồng bộ banner trang chủ, trang xe) */}
        <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
          {featuredArticle && (
            <>
              <Image
                src={featuredArticle.image}
                alt=""
                fill
                preload
                sizes="100vw"
                className="-z-20 object-cover opacity-60"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </>
          )}
          <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-6 md:pb-16 md:pt-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">Mitsubishi · Lưu Hoàng Phúc</p>
            <h1 className="mt-2 text-lg font-semibold text-white/90 md:text-xl">Tin tức & Tư vấn</h1>

            {featuredArticle && (
              <div className="mt-16 max-w-3xl md:mt-28">
                <p className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.15em]">
                  <span className="bg-red-600 px-2.5 py-1">{featuredArticle.category}</span>
                  <span className="text-white/80">{formatDate(featuredArticle.publishedAt)}</span>
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  {featuredArticle.seoTitle ?? featuredArticle.title}
                </h2>
                <p className="mt-4 line-clamp-3 max-w-2xl leading-7 text-white/80">{featuredArticle.excerpt}</p>
                <Link
                  href={`/tin-tuc/${featuredArticle.slug}`}
                  className="mt-7 inline-block bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-gray-200"
                >
                  Đọc bài viết
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* SO SÁNH & TƯ VẤN CHỌN XE (src/data/advisory.ts), thẻ có ảnh chia sẻ của từng bài */}
        <section className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">So sánh & tư vấn</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Tư vấn chọn xe</h2>
            </div>
            <Link
              href="/tu-van"
              className="border-b-2 border-gray-900 pb-0.5 text-sm font-black uppercase tracking-[0.2em] transition hover:border-red-600 hover:text-red-700"
            >
              Xem tất cả {advisoryArticles.length} bài
            </Link>
          </div>

          {/* Điện thoại: vuốt ngang (21/10/2026); từ sm: lưới như cũ */}
          <div className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {advisoryNewestFirst.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto ${
                  index >= ADVISORY_SHOWN ? "hidden" : ""
                }`}
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-gray-100">
                  <Image
                    src={`${item.href}/opengraph-image`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 82vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold leading-snug group-hover:text-red-700 md:text-lg">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BÀI VIẾT MỚI */}
        {otherArticles.length > 0 && (
          <section className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-20">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Tin tức</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Bài viết mới</h2>

              <NewsList
                articles={otherArticles.map((article) => ({
                  id: article.id,
                  slug: article.slug,
                  title: article.title,
                  excerpt: article.excerpt,
                  image: article.image,
                  category: article.category,
                  date: formatDate(article.publishedAt),
                }))}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
