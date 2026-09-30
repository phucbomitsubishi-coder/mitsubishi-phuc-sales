import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import {
  getNewsArticleBySlug,
  newsArticles,
} from "@/data/news";
import { siteConfig } from "@/config/site";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: `${article.title} | Mitsubishi Lưu Hoàng Phúc`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { sales, contact } = siteConfig;

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Article header */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-red-600 px-3 py-1 font-semibold">
                {article.category}
              </span>

              <span className="text-gray-400">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {article.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Article content */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {article.content.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                {section.heading && (
                  <h2 className="text-2xl font-bold">
                    {section.heading}
                  </h2>
                )}

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-[17px] leading-8 text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Source */}
          {article.source && (
            <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-600">
                Nguồn tham khảo:
              </p>

              <a
                href={article.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex font-semibold text-red-600 hover:text-red-700"
              >
                {article.source.name} →
              </a>
            </div>
          )}

          {/* Back */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link
              href="/tin-tuc"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              ← Quay lại Tin tức & Tư vấn
            </Link>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-neutral-950 p-7 text-white sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                Tư vấn Mitsubishi
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Cần tư vấn chọn xe hoặc nhận báo giá?
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                Liên hệ {sales.name} để được hỗ trợ về mẫu xe,
                phiên bản, giá xe, chương trình bán hàng và phương án
                mua xe phù hợp.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={contact.phoneUrl}
                  className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                >
                  Gọi {sales.phoneDisplay}
                </a>

                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-blue-500 px-6 py-3 font-bold text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  Mở Zalo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}