import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Không tìm thấy trang | ${siteConfig.sales.name}`,
};

export default function NotFound() {
  const { sales, contact } = siteConfig;

  return (
    <>
      <SiteHeader />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">
            Lỗi 404
          </p>

          <h1 className="mt-3 text-3xl font-bold text-neutral-950 md:text-4xl">
            Không tìm thấy trang bạn cần
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-neutral-600">
            Đường dẫn có thể đã thay đổi hoặc không còn tồn tại. Bạn có thể quay
            về trang chủ, xem các dòng xe Mitsubishi hoặc liên hệ trực tiếp để
            được tư vấn.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
            >
              Về trang chủ
            </Link>

            <Link
              href="/#san-pham"
              className="rounded-lg border border-neutral-300 px-6 py-3 font-bold text-neutral-900 transition hover:border-neutral-900"
            >
              Xem các dòng xe
            </Link>

            <Link
              href="/xe-cu"
              className="rounded-lg border border-neutral-300 px-6 py-3 font-bold text-neutral-900 transition hover:border-neutral-900"
            >
              Xe đã qua sử dụng
            </Link>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <p className="text-neutral-600">
              Cần hỗ trợ ngay? Liên hệ {sales.name}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={contact.phoneUrl}
                className="rounded-lg bg-neutral-950 px-6 py-3 font-bold text-white transition hover:bg-neutral-800"
              >
                Gọi {sales.phoneDisplay}
              </a>

              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-blue-600 px-6 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
