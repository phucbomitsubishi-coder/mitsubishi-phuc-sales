import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { newsArticles } from "@/data/news";
import { advisoryArticles } from "@/data/advisory";
import NewsPromotionCover from "@/components/NewsPromotionCover";

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

export default function NewsPage() {
  const featuredArticle = newsArticles.find(
    (article) => article.featured
  );

  const otherArticles = newsArticles.filter(
    (article) => article.slug !== featuredArticle?.slug
  );

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Hero */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Mitsubishi Lưu Hoàng Phúc
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Tin tức & Tư vấn
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Cập nhật thông tin Mitsubishi, tư vấn lựa chọn xe,
              kinh nghiệm sử dụng và những nội dung hữu ích dành cho
              khách hàng.
            </p>
          </div>
        </section>

                {/* Promotion Cover */}
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <NewsPromotionCover />
        </section>

        {/* Featured */}
        {featuredArticle && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-red-600" />
              <h2 className="text-2xl font-bold">
                Bài viết nổi bật
              </h2>
            </div>

            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[260px] sm:min-h-[340px]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    preload
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700">
                      {featuredArticle.category}
                    </span>

                    <span className="text-gray-500">
                      {formatDate(featuredArticle.publishedAt)}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-4 leading-7 text-gray-600">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-7">
                    <Link
                      href={`/tin-tuc/${featuredArticle.slug}`}
                      className="inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                      Đọc bài viết
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Tư vấn chọn xe (src/data/advisory.ts) */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-red-600" />
              <h2 className="text-2xl font-bold">Tư vấn chọn xe</h2>
            </div>
            <Link href="/tu-van" className="font-semibold text-red-700 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryArticles.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-gray-200 p-5 transition hover:border-red-600 hover:shadow-md"
              >
                <span className="text-sm font-bold text-red-700">{item.number}</span>
                <p className="mt-2 font-bold leading-6 group-hover:text-red-700">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Other articles */}
        {otherArticles.length > 0 && (
          <section className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold">
                Bài viết mới
              </h2>

              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherArticles.map((article) => (
                  <article
                    key={article.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-semibold text-red-600">
                          {article.category}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold">
                        {article.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 leading-7 text-gray-600">
                        {article.excerpt}
                      </p>

                      <Link
                        href={`/tin-tuc/${article.slug}`}
                        className="mt-5 inline-flex font-semibold text-red-600 hover:text-red-700"
                      >
                        Đọc tiếp →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}