import { cars, upcomingCars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { newsArticles } from "@/data/news";
import { advisoryArticles } from "@/data/advisory";
import { isRepublishedArticle } from "@/lib/news";
import PromotionTabs from "@/components/PromotionTabs";
import { buildPromotionItem } from "@/lib/promotionItems";
import { siteConfig } from "@/config/site";
import { Suspense } from "react";
import QuoteForm, { QuoteFormFromUrl } from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";
import HeroShowroom from "@/components/HeroShowroom";
import { showrooms } from "@/data/showroom";
import CarLineup from "@/components/CarLineup";
import { carCards, lineupNeeds } from "@/lib/carCards";
import HandoverStrip from "@/components/HandoverStrip";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};



// Ưu đãi từng dòng xe (xem src/lib/promotionItems.ts)
const promotionItems = cars.map(buildPromotionItem);

// Bài tin tức của chương trình khuyến mãi hiện tại (add-news tạo bài cùng tiêu đề)
const promotionArticle = newsArticles.find(
  (article) => article.title === currentPromotion.title
);

// Khối "Bài viết mới": 3 bài so sánh mới nhất + 3 tin mới nhất được Google lập chỉ mục,
// để trang chủ luôn có link tới bài mới (Google thấy trang được cập nhật, bài mới được phát hiện nhanh)
const latestComparisons = advisoryArticles
  .filter((article) => article.href.startsWith("/tu-van/so-sanh-"))
  .slice(-3)
  .reverse();
const latestNews = newsArticles
  .filter((article) => !isRepublishedArticle(article))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

// Bài tin của xe sắp ra mắt (thẻ "Sắp ra mắt" dẫn sang bài để khách đọc thêm)
const upcomingNews: Record<string, string> = {
  outlander: "mitsubishi-outlander-the-he-moi-xuat-hien-tai-viet-nam-mo-ban-2026",
  pajero: "mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc",
};

// Banner trang chủ: chỉ các xe đã có bộ ảnh showroom (đủ 6 xe đang bán)
const heroCars = carCards.flatMap((card) => {
  const showroom = showrooms[card.id];
  if (!showroom) return [];
  return [{
    id: card.id,
    slug: card.slug,
    name: card.name,
    shortName: card.shortName,
    priceLabel: card.priceLabel,
    promotionLabel: card.promotionLabel,
    slogan: showroom.slogan,
    logo: showroom.logo,
    poster: showroom.poster,
    mobilePoster: showroom.mobilePoster,
    video: showroom.video,
  }];
});
const monthLabel = `${String(currentPromotion.month).padStart(2, "0")}/${currentPromotion.year}`;
const { sales, dealer } = siteConfig;

// Khối "Dịch vụ & công cụ": lối vào nhanh các trang tiện ích
const serviceLinks = [
  { href: "/du-toan/gia-lan-banh", title: "Tính giá lăn bánh", description: "Đủ 34 tỉnh, đã trừ ưu đãi tháng", icon: "M5 3h14v18H5zM8 7h8M8 11h2m3 0h3m-8 4h2m3 0h3" },
  { href: "/du-toan/tra-gop", title: "Dự tính trả góp", description: "Trả trước, số tiền góp hằng tháng", icon: "M3 6h18v12H3zM3 10h18M7 15h4" },
  { href: "/thu-cu-doi-moi", title: "Thu cũ đổi mới", description: "Định giá xe đang đi, đổi sang Mitsubishi", icon: "M4 9h13l-3-3m6 9H7l3 3" },
  { href: "/phu-kien-xe-mitsubishi", title: "Phụ kiện xe", description: "Bảng giá phụ kiện từng dòng xe", icon: "M14 6a4 4 0 0 1-5 5l-5 5 3 3 5-5a4 4 0 0 1 5-5l-2-2 2-2a4 4 0 0 0-3-1z" },
  { href: "/dang-ky-lai-thu", title: "Đăng ký lái thử", description: "Tại showroom hoặc mang xe đến nhà", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9.5 4h5.5m8 0h5.5M12 16v5.5" },
  { href: "/mua-xe-mitsubishi-toan-quoc", title: "Mua xe từ tỉnh khác", description: "Cọc online, giao xe toàn quốc", icon: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* BANNER kiểu trang chủ MMV: ảnh/video thật từng xe, đồng bộ banner trang xe (chứa h1 duy nhất) */}
      <HeroShowroom
        cars={heroCars}
        kicker={`Ưu đãi tháng ${monthLabel}`}
        heading={<>Tư vấn mua xe Mitsubishi Bình Dương – {sales.name}</>}
      />

      {/* NGƯỜI TƯ VẤN: gương mặt thật + số liệu thật (điểm Google là của showroom) */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5 md:gap-6 md:py-7">
          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-gray-100 md:h-28 md:w-24">
            <Image
              src="/images/about/luu-hoang-phuc.jpg"
              alt={`${sales.name} – ${sales.title}`}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Người tư vấn của bạn</p>
            <p className="mt-0.5 text-lg font-extrabold leading-tight md:text-2xl">{sales.name}</p>
            <p className="mt-1 text-sm leading-5 text-gray-600">
              {sales.yearsOfExperience} năm kinh nghiệm · {sales.carsDelivered} xe đã giao · Showroom {dealer.name}
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex">
            <a href={siteConfig.contact.phoneUrl} className="bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-700">
              Gọi {sales.phoneDisplay}
            </a>
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-blue-700 transition hover:bg-blue-50"
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
      </section>

      {/* CHỌN XE THEO NHU CẦU */}
      <section id="san-pham" className="scroll-mt-28 bg-white">
        <div className="reveal mx-auto max-w-7xl px-6 py-12 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Các dòng xe Mitsubishi</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Xe nào hợp với bạn?</h2>

          <CarLineup cars={carCards} needs={lineupNeeds} />

          {/* XE SẮP RA MẮT (đang ẩn trong cars.ts) */}
          {upcomingCars.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-extrabold">Sắp ra mắt</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {upcomingCars.map((car) => (
                  <article key={car.slug} className="flex gap-3 overflow-hidden rounded-2xl bg-neutral-950 p-3 text-white sm:p-4">
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                      <Image
                        src={car.image}
                        alt={`${car.name} sắp ra mắt tại Việt Nam`}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <p className="font-extrabold">{car.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400 sm:text-sm">{car.shortDescription}</p>
                      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm font-semibold">
                        <Link href={`/?car=${encodeURIComponent(car.name)}&nguon=Sap-ra-mat#bao-gia`} className="text-red-400 hover:text-red-300">
                          Nhận tin mở bán →
                        </Link>
                        {upcomingNews[car.id] && (
                          <Link href={`/tin-tuc/${upcomingNews[car.id]}`} className="text-white/80 hover:text-white">
                            Đọc tin xe
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* KHÁCH HÀNG NHẬN XE */}
      <section className="overflow-hidden bg-white pb-12 md:pb-20">
        <div className="reveal mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Khách hàng nhận xe</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{sales.carsDelivered} chiếc xe đã lăn bánh</h2>
            </div>
            <Link href="/gioi-thieu" className="font-semibold text-red-700 hover:text-red-800">
              Xem thêm về Phúc →
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-gray-600">
            Showroom {dealer.name} được đánh giá <span className="font-bold text-gray-900">{dealer.googleRating.score}★ trên Google</span> ({dealer.googleRating.count} đánh giá).
          </p>
        </div>
        <div className="mt-6">
          <HandoverStrip />
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

        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
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

{/* NHẬN BÁO GIÁ: ngay sau Khuyến mãi, lúc khách đang có ý định mua */}
<Suspense fallback={<QuoteForm />}>
  <QuoteFormFromUrl />
</Suspense>

{/* DỊCH VỤ & CÔNG CỤ */}
<section className="border-b border-gray-200 bg-gray-50">
  <div className="reveal mx-auto max-w-7xl px-6 py-12 md:py-20">
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">
      Dịch vụ & công cụ
    </p>
    <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Hỗ trợ mua xe trọn gói</h2>

    <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
      {serviceLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-2xl bg-white p-4 ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-300 md:p-6"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white md:h-12 md:w-12">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
          </span>
          <h3 className="mt-3 font-bold text-gray-900 transition group-hover:text-red-700 md:text-lg">
            {item.title} <span aria-hidden="true" className="hidden md:inline">→</span>
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-gray-600">{item.description}</p>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* TIN TỨC & TƯ VẤN */}
<section
  id="tin-tuc"
  className="scroll-mt-28 bg-white md:scroll-mt-24"
>
  <div className="reveal mx-auto max-w-7xl px-6 py-12 md:py-20">
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">
      Tin tức & Tư vấn
    </p>

    <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
      Bài viết mới
    </h2>

    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-bold">So sánh với xe đối thủ</h3>
        <ul className="mt-4 space-y-3">
          {latestComparisons.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-red-600"
              >
                <span className="font-bold text-gray-900">{article.title}</span>
                <span className="mt-1 block text-sm leading-6 text-gray-600">{article.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/tu-van" className="mt-4 inline-block font-semibold text-red-700 hover:text-red-800">
          Tất cả bài so sánh và tư vấn →
        </Link>
      </div>

      <div>
        <h3 className="text-lg font-bold">Tin Mitsubishi mới</h3>
        <ul className="mt-4 space-y-3">
          {latestNews.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-red-600"
              >
                <span className="text-xs font-semibold uppercase text-red-700">
                  {article.publishedAt.split("-").reverse().join("/")}
                </span>
                <span className="mt-1 block font-bold text-gray-900">{article.seoTitle ?? article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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

{/* LIÊN HỆ */}
<section id="lien-he" className="bg-neutral-950 text-white">
  <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
      Liên hệ
    </p>

    <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
      Lưu Hoàng Phúc
    </h2>

    <p className="mt-2 text-lg font-semibold text-gray-200">
      Tư vấn Kinh doanh Mitsubishi
    </p>

    <p className="mt-4 max-w-2xl leading-7 text-gray-300">
      Tư vấn mua xe Mitsubishi, báo giá, chương trình ưu đãi, hỗ trợ trả góp
      và đăng ký lái thử tại khu vực Bình Dương.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-2">
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
    </div>

    {/* SHOWROOM: nơi anh Phúc làm việc (cho từ khóa "mitsubishi bình dương", "moveo new city") */}
    <div className="mt-8 grid gap-6 rounded-xl border border-gray-700 bg-neutral-900 p-6 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h3 className="text-xl font-bold">
          Showroom {siteConfig.dealer.name}
        </h3>
        <p className="mt-3 leading-7 text-gray-300">
          Phúc làm việc tại showroom {siteConfig.dealer.name}, khu vực {siteConfig.dealer.salesArea}.
          Anh chị có thể đến xem xe, lái thử và làm thủ tục mua xe trực tiếp tại showroom, hoặc
          nhận báo giá, tư vấn trả góp qua điện thoại và Zalo.{" "}
          <Link href="/mua-xe-mitsubishi-toan-quoc" className="font-semibold text-white underline hover:text-red-400">
            Khách ở tỉnh khác
          </Link>{" "}
          vẫn được hỗ trợ đăng ký và giao xe tận nơi.
        </p>
        <dl className="mt-4 grid gap-2 text-sm text-gray-300 sm:grid-cols-[auto_1fr] sm:gap-x-4">
          <dt className="font-semibold text-white">Địa chỉ</dt>
          <dd>{siteConfig.dealer.address}</dd>
          <dt className="font-semibold text-white">Giờ làm việc</dt>
          <dd>
            {siteConfig.hours.display}. {siteConfig.hours.afterHours}
          </dd>
        </dl>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Mitsubishi+Motors+Moveo+New+City+Binh+Duong"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-white px-5 py-3 text-center font-semibold text-neutral-950 transition hover:bg-gray-200"
        >
          Chỉ đường đến showroom
        </a>
        <Link
          href="/gioi-thieu"
          className="rounded border border-gray-600 px-5 py-3 text-center font-semibold transition hover:border-white"
        >
          Về Lưu Hoàng Phúc
        </Link>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
      {siteConfig.dealer.name} • Tư vấn Kinh doanh: {siteConfig.sales.name}
    </div>
  </div>
</section>
    </main>
  );
}