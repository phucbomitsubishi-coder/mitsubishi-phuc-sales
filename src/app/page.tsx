import { cars, upcomingCars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { newsArticles } from "@/data/news";
import PromotionTabs from "@/components/PromotionTabs";
import { buildPromotionItem, formatMillion } from "@/lib/promotionItems";
import { siteConfig } from "@/config/site";
import { Suspense } from "react";
import QuoteForm, { QuoteFormFromUrl } from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};


const categoryLabel: Record<string, string> = { Pickup: "Bán tải" };

// Ưu đãi từng dòng xe (xem src/lib/promotionItems.ts)
const promotionItems = cars.map(buildPromotionItem);
const maxPromotionByCar = Object.fromEntries(
  promotionItems.map((item) => [item.carId, item.maxValue])
);

// Bài tin tức của chương trình khuyến mãi hiện tại (add-news tạo bài cùng tiêu đề)
const promotionArticle = newsArticles.find(
  (article) => article.title === currentPromotion.title
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO SLIDER */}
<HeroSlider />

      {/* DANH SÁCH XE */}
      <section
  id="san-pham"
  className="mx-auto max-w-7xl px-6 py-8 sm:py-10"
>
        <div className="mb-6">
          <p className="font-semibold uppercase tracking-wider text-red-600">
            Sản phẩm
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Các dòng xe Mitsubishi
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => {
            const minPrice = Math.min(...car.variants.map((variant) => variant.price));
            const maxPromotion = maxPromotionByCar[car.id] ?? 0;

            return (
              <article
                key={car.slug}
                className="group relative flex flex-col rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-lg"
              >
                {maxPromotion > 0 && (
                  <a
                    href={`#khuyen-mai-${car.id}`}
                    className="absolute right-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md shadow-red-600/30 transition hover:bg-red-700"
                  >
                    Ưu đãi đến {formatMillion(maxPromotion)}
                  </a>
                )}

                <div className="mb-3 h-40 overflow-hidden">
                  <div className="relative h-52 w-full -translate-y-6">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">{car.name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {[
                    categoryLabel[car.category] ?? car.category,
                    `${car.specifications.seats} chỗ`,
                    car.specifications.engine,
                    // Bỏ nhiên liệu nếu tên động cơ đã có (vd "Xăng Turbo 1.5L", "Diesel")
                    /xăng|diesel|dầu|điện/i.test(car.specifications.engine)
                      ? null
                      : car.specifications.fuel,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                <div className="mt-5">
                  <span className="text-sm text-gray-600">Giá từ</span>
                  <p className="text-xl font-bold text-red-700">
                    {minPrice.toLocaleString("vi-VN")} ₫
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/xe/${car.slug}`}
                    className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                  >
                    Xem chi tiết
                  </Link>

                  <Link
                    href={`/?car=${encodeURIComponent(car.name)}&nguon=Trang-chu-san-pham#bao-gia`}
                    className="rounded border border-gray-300 px-4 py-2 font-semibold transition hover:border-red-600 hover:text-red-700"
                  >
                    Nhận báo giá
                  </Link>
                </div>
              </article>
            );
          })}

          {/* XE SẮP RA MẮT (đang ẩn trong cars.ts) */}
          {upcomingCars.map((car) => (
            <article
              key={car.slug}
              className="relative flex flex-col overflow-clip rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6"
            >
              <span className="absolute right-4 top-4 z-10 rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Sắp ra mắt
              </span>

              <div className="relative mb-4 h-40 overflow-clip rounded-lg bg-gray-200">
                <Image
                  src={car.image}
                  alt={`${car.name} sắp ra mắt tại Việt Nam`}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold">{car.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                {car.shortDescription}
              </p>

              <div className="mt-5">
                <span className="text-sm text-gray-600">Giá dự kiến</span>
                <p className="text-xl font-bold text-gray-900">Đang cập nhật</p>
              </div>

              <div className="mt-6">
                <Link
                  href={`/?car=${encodeURIComponent(car.name)}&nguon=Sap-ra-mat#bao-gia`}
                  className="inline-block rounded bg-neutral-950 px-4 py-2 font-semibold text-white transition hover:bg-neutral-800"
                >
                  Đăng ký nhận thông tin
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* KHUYẾN MÃI */}
<section
  id="khuyen-mai"
  className="relative scroll-mt-28 overflow-clip bg-neutral-950 text-white md:scroll-mt-24"
>
  {/* Ánh đỏ nền trang trí */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-red-600/20 blur-3xl"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-red-900/20 blur-3xl"
  />

  <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
          Khuyến mãi
        </p>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Ưu đãi Mitsubishi tháng{" "}
          {String(currentPromotion.month).padStart(2, "0")}/{currentPromotion.year}
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
          Chọn dòng xe để xem chi tiết ưu đãi từng phiên bản. Liên hệ trực tiếp
          để nhận báo giá và chính sách hiện hành.
        </p>
      </div>

      {promotionArticle && (
        <Link
          href={`/tin-tuc/${promotionArticle.slug}`}
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white"
        >
          Xem toàn bộ chương trình
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>

    <PromotionTabs items={promotionItems} />

    <p className="mt-5 text-xs leading-5 text-neutral-400">
      * Chương trình của {currentPromotion.source}. Giá trị ưu đãi mang tính
      tham khảo và có thể thay đổi theo từng thời điểm.
    </p>
  </div>
</section>

{/* TIN TỨC & TƯ VẤN */}
<section
  id="tin-tuc"
  className="scroll-mt-28 bg-white md:scroll-mt-24"
>
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="font-semibold uppercase tracking-wider text-red-600">
      Tin tức & Tư vấn
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Kinh nghiệm chọn mua xe Mitsubishi
    </h2>

    <p className="mt-4 max-w-2xl leading-7 text-gray-600">
      Thông tin tham khảo giúp khách hàng lựa chọn mẫu xe, phiên bản và
      phương án mua xe phù hợp với nhu cầu sử dụng.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="text-sm font-semibold uppercase text-red-600">
          Tư vấn chọn xe
        </p>

        <h3 className="mt-3 text-xl font-bold">
          Chọn Mitsubishi nào phù hợp với nhu cầu của bạn?
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Gợi ý lựa chọn dòng xe phù hợp cho gia đình, công việc và nhu cầu
          di chuyển hằng ngày.
        </p>
        <Link
  href="/tu-van/chon-xe-mitsubishi-phu-hop"
  className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Đọc bài tư vấn →
</Link>
      </article>

      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
  <p className="text-sm font-semibold uppercase text-red-600">
    Chi phí mua xe
  </p>

  <h3 className="mt-3 text-xl font-bold">
    Giá lăn bánh Mitsubishi gồm những khoản nào?
  </h3>

  <p className="mt-3 leading-7 text-gray-600">
    Tìm hiểu các khoản chi phí dự kiến khi đăng ký xe để chủ động
    chuẩn bị ngân sách.
  </p>

  <Link
    href="/tu-van/chi-phi-lan-banh-mitsubishi"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Đọc bài tư vấn →
  </Link>
</article>

      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
  <p className="text-sm font-semibold uppercase text-red-600">
    Phiên bản & ưu đãi
  </p>

  <h3 className="mt-3 text-xl font-bold">
    Nên chọn phiên bản xe Mitsubishi như thế nào?
  </h3>

  <p className="mt-3 leading-7 text-gray-600">
    So sánh nhu cầu sử dụng, trang bị và ngân sách trước khi lựa chọn
    phiên bản phù hợp.
  </p>

  <Link
    href="/tu-van/chon-phien-ban-xe-mitsubishi"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Đọc bài tư vấn →
  </Link>
</article>
        </div>

    <div className="mt-10 flex justify-center">
      <Link
        href="/tin-tuc"
        className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Xem tất cả Tin tức & Tư vấn →
      </Link>
    </div>
  </div>
</section>

{/* NHẬN BÁO GIÁ */}
<Suspense fallback={<QuoteForm />}>
  <QuoteFormFromUrl />
</Suspense>

{/* LIÊN HỆ */}
<section id="lien-he" className="bg-neutral-950 text-white">
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="font-semibold uppercase tracking-wider text-red-500">
      Liên hệ
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Lưu Hoàng Phúc
    </h2>

    <p className="mt-2 text-lg font-semibold text-gray-200">
      Tư vấn Kinh doanh Mitsubishi
    </p>

    <p className="mt-4 max-w-2xl leading-7 text-gray-300">
      Tư vấn mua xe Mitsubishi, báo giá, chương trình ưu đãi, hỗ trợ trả góp
      và đăng ký lái thử tại khu vực Bình Dương.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {/* HOTLINE */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Hotline tư vấn
        </p>

        <a
          href={siteConfig.contact.phoneUrl}
          className="mt-2 block text-xl font-bold text-white transition hover:text-red-500"
        >
          {siteConfig.sales.phoneDisplay}
        </a>

        <a
          href={siteConfig.contact.phoneUrl}
          className="mt-5 block rounded bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700"
        >
          Gọi ngay
        </a>
      </div>

      {/* ZALO */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Zalo tư vấn
        </p>

        <p className="mt-2 text-xl font-bold">
          {siteConfig.sales.phoneDisplay}
        </p>

        <a
          href={siteConfig.contact.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded border border-blue-500 px-4 py-3 text-center font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          Mở Zalo
        </a>
      </div>

      {/* EMAIL */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Email
        </p>

        <a
          href={siteConfig.contact.emailUrl}
          className="mt-2 block break-all font-semibold text-white transition hover:text-red-500"
        >
          {siteConfig.sales.email}
        </a>

        <a
          href={siteConfig.contact.emailUrl}
          className="mt-5 block rounded border border-gray-600 px-4 py-3 text-center font-semibold transition hover:border-white"
        >
          Gửi email
        </a>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
      Mitsubishi Motors Bình Dương • Tư vấn Kinh doanh: Lưu Hoàng Phúc
    </div>
  </div>
</section>
    </main>
  );
}