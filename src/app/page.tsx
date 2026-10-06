import { cars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { newsArticles } from "@/data/news";
import PromotionTabs, { type PromotionTabItem } from "@/components/PromotionTabs";
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


// Ưu đãi từng dòng xe lấy từ promotions.ts (file này bị add-news.mjs ghi đè mỗi tháng,
// nên xử lý dữ liệu ở đây thay vì thêm hàm vào promotions.ts).
const promotionItems: PromotionTabItem[] = cars.map((car) => {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);

  const variants = (promotion?.variants ?? []).map((variant) => ({
    name: [variant.variantName, variant.modelYear].filter(Boolean).join(" "),
    price: variant.retailPrice,
    benefits: variant.benefits.map(({ label, value }) => ({ label, value })),
    total: variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0),
  }));

  return {
    carId: car.id,
    carName: car.name,
    carSlug: car.slug,
    carImage: car.image,
    maxValue: Math.max(0, ...variants.map((variant) => variant.total)),
    variants,
  };
});

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
          {cars.map((car) => (
            <article
              key={car.slug}
              className="rounded-xl border border-gray-200 p-6 shadow-sm"
            >
<div className="mb-3 h-40 overflow-hidden">
  <div className="relative h-52 w-full -translate-y-6">
    <Image
      src={car.image}
      alt={car.name}
      fill
      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
      className="object-contain"
    />
  </div>
</div>
<h3 className="text-2xl font-bold">{car.name}</h3>

              

              <div className="mt-6">
                <span className="text-sm text-gray-500">
                  Giá tham khảo
                </span>

                <p className="text-xl font-bold text-red-600">
                  {car.variants[0]?.price
                    ? `${car.variants[0].price.toLocaleString("vi-VN")} ₫`
                    : "Liên hệ"}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
  <Link
    href={`/xe/${car.slug}`}
    className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
  >
    Xem chi tiết
  </Link>

  <a
    href={siteConfig.contact.zaloUrl}
    className="rounded border border-gray-300 px-4 py-2 font-semibold transition hover:border-red-600 hover:text-red-600"
  >
    Nhận báo giá
  </a>
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