import { upcomingCars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { newsArticles } from "@/data/news";
import { advisoryArticles } from "@/data/advisory";
import { isRepublishedArticle } from "@/lib/news";
import { siteConfig } from "@/config/site";
import { Suspense } from "react";
import QuoteForm, { QuoteFormFromUrl } from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";
import HeroShowroom from "@/components/HeroShowroom";
import { showrooms } from "@/data/showroom";
import CarLineup from "@/components/CarLineup";
import { carCards } from "@/lib/carCards";
import HandoverStrip from "@/components/HandoverStrip";
import Link from "next/link";
import Image from "next/image";
import PromoCountdown from "@/components/PromoCountdown";
import { promotionMonthLabel } from "@/lib/promotionItems";

// Tiêu đề trang chủ tự đổi theo tháng khuyến mãi (khách hay tìm "giá xe Mitsubishi Bình Dương tháng ...")
export const metadata = {
  title: `Mitsubishi Bình Dương: giá xe, khuyến mãi tháng ${promotionMonthLabel}`,
  alternates: {
    canonical: "/",
  },
};



// Bài tin tức của chương trình khuyến mãi hiện tại (add-news tạo bài cùng tiêu đề)
const promotionArticle = newsArticles.find(
  (article) => article.title === currentPromotion.title
);

// Khối "Bài viết mới" (gọn lại 21/10/2026): tin mới nhất được Google lập chỉ mục + 2 bài so sánh mới nhất,
// để trang chủ luôn có link tới bài mới (Google thấy trang được cập nhật, bài mới được phát hiện nhanh)
const latestNews = newsArticles
  .filter((article) => !isRepublishedArticle(article))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
const latestComparisons = advisoryArticles
  .filter((article) => article.href.startsWith("/tu-van/so-sanh-"))
  .slice(-2)
  .reverse();
const latestPosts = [
  ...(latestNews
    ? [{
        href: `/tin-tuc/${latestNews.slug}`,
        image: latestNews.image,
        og: false,
        label: `Tin tức · ${latestNews.publishedAt.split("-").reverse().join("/")}`,
        title: latestNews.seoTitle ?? latestNews.title,
      }]
    : []),
  ...latestComparisons.map((article) => ({
    href: article.href,
    image: `${article.href}/opengraph-image`,
    og: true,
    label: "So sánh xe",
    title: article.title,
  })),
];

// Khối Khuyến mãi gọn kiểu MMV: mỗi xe một dòng "ưu đãi đến ..." (chi tiết từng phiên bản ở bảng giá và trang xe)
const promoCars = carCards.filter((card) => card.promotionLabel);

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
          <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-gray-100 md:h-28 md:w-24">
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
        {/* Băng chuyền kiểu trang chủ MMV: không tiêu đề, không tab lọc (bỏ 21/10/2026 theo ý anh Phúc); h2 ẩn cho cấu trúc trang */}
        <div className="reveal mx-auto max-w-7xl px-6 py-10 md:py-16">
          <h2 className="sr-only">Các dòng xe Mitsubishi</h2>

          <CarLineup cars={carCards} needs={[]} />

          {/* XE SẮP RA MẮT (đang ẩn trong cars.ts) */}
          {upcomingCars.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-extrabold">Sắp ra mắt</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {upcomingCars.map((car) => (
                  <article key={car.slug} className="flex gap-3 overflow-hidden bg-neutral-950 p-3 text-white sm:p-4">
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden sm:h-28 sm:w-40">
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

      {/* LÁI THỬ: banner kiểu "Trải nghiệm các mẫu xe" trang chủ MMV */}
      <section className="bg-white md:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden bg-neutral-950 text-white">
          <div className="relative aspect-[2/1] md:absolute md:inset-0 md:aspect-auto">
            <Image
              src="/images/cars/test-drive.jpg"
              alt="Mitsubishi Destinator chạy trên đường"
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover md:object-right"
            />
            <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/55 to-transparent md:block" />
          </div>
          <div className="relative px-6 py-10 md:max-w-xl md:px-14 md:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Lái thử</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Trải nghiệm trước khi quyết định</h2>
            <p className="mt-4 leading-7 text-gray-300">
              Lái thử các dòng xe Mitsubishi tại showroom {dealer.name} hoặc hẹn lịch lái thử tại nhà. Phúc đi cùng, giải thích từng tính năng trên đường thật.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dang-ky-lai-thu?nguon=Trang-chu-lai-thu"
                className="bg-red-600 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
              >
                Đăng ký lái thử
              </Link>
              <Link
                href="/du-toan/gia-lan-banh"
                className="border border-white/60 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-gray-950"
              >
                Tính giá lăn bánh
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KHÁCH HÀNG NHẬN XE */}
      <section className="overflow-hidden bg-white pb-12 pt-12 md:pb-20 md:pt-20">
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

      {/* KHUYẾN MÃI: khối ảnh trái, chữ phải kiểu trang chủ MMV (21/10/2026; trước đó là tab chi tiết PromotionTabs) */}
      <section id="khuyen-mai" className="scroll-mt-28 bg-gray-100 md:scroll-mt-24">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_1fr]">
          <div className="relative aspect-[1440/583] lg:self-center">
            <Image
              src="/images/cars/promo-banner.jpg"
              alt="Mitsubishi Xforce, Triton và Destinator"
              fill
              sizes="(min-width: 1280px) 690px, (min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-10 md:px-12 md:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Khuyến mãi</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Ưu đãi Mitsubishi tháng {monthLabel}</h2>
            <PromoCountdown month={currentPromotion.month} year={currentPromotion.year} className="mt-2 text-sm font-bold text-red-700" />
            <ul className="mt-6 divide-y divide-gray-300 border-y border-gray-300">
              {promoCars.map((car) => (
                <li key={car.id}>
                  <Link href={`/xe/${car.slug}`} className="flex items-center justify-between gap-4 py-2.5 transition hover:text-red-700">
                    <span className="font-bold uppercase tracking-wide">{car.shortName}</span>
                    <span className="text-sm font-semibold text-red-700">{car.promotionLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/bang-gia-xe-mitsubishi"
                className="border-2 border-gray-950 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-gray-950 hover:text-white"
              >
                Ưu đãi từng phiên bản
              </Link>
              {promotionArticle && (
                <Link href={`/tin-tuc/${promotionArticle.slug}`} className="text-sm font-bold text-gray-900 underline-offset-4 hover:text-red-700 hover:underline">
                  Toàn bộ chương trình →
                </Link>
              )}
            </div>
            <p className="mt-5 text-xs leading-5 text-gray-600">
              * Chương trình của {currentPromotion.source}. Ưu đãi (hỗ trợ lệ phí trước bạ, phiếu nhiên liệu...) được trừ trực tiếp vào giá xe khi ký hợp đồng.
            </p>
          </div>
        </div>
      </section>

      {/* NHẬN BÁO GIÁ: ngay sau Khuyến mãi, lúc khách đang có ý định mua */}
      <Suspense fallback={<QuoteForm />}>
        <QuoteFormFromUrl />
      </Suspense>

      {/* BÀI VIẾT MỚI: 3 thẻ có ảnh; điện thoại vuốt ngang */}
      <section id="tin-tuc" className="scroll-mt-28 bg-white md:scroll-mt-24">
        <div className="reveal mx-auto max-w-7xl py-12 md:px-6 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-0">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Tin tức & Tư vấn</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Bài viết mới</h2>
            </div>
            <Link href="/tin-tuc" className="font-semibold text-red-700 hover:text-red-800">
              Xem tất cả →
            </Link>
          </div>
          <ul className="mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {latestPosts.map((post) => (
              <li key={post.href} className="w-[80%] shrink-0 snap-start md:w-auto">
                <Link href={post.href} className="group block">
                  <span aria-hidden="true" className="relative block aspect-[1200/630] overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized={post.og}
                      sizes="(min-width: 768px) 400px, 80vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-4 block text-xs font-bold uppercase tracking-[0.15em] text-red-700">{post.label}</span>
                  <span className="mt-1.5 line-clamp-2 block text-lg font-bold leading-snug text-gray-950 group-hover:text-red-700">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LIÊN HỆ: dải gọn (bản đồ chi tiết ở /gioi-thieu và /lien-he) */}
      <section id="lien-he" className="bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Liên hệ</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              {sales.name} · Showroom {dealer.name}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Tư vấn mua xe Mitsubishi tại {dealer.salesArea}: báo giá, trả góp, lái thử, thủ tục đăng ký.{" "}
              <Link href="/mua-xe-mitsubishi-toan-quoc" className="font-semibold text-white underline hover:text-red-400">
                Khách ở tỉnh khác
              </Link>{" "}
              vẫn được hỗ trợ đăng ký và giao xe tận nơi.
            </p>
            <dl className="mt-5 grid gap-x-6 gap-y-1 text-sm text-gray-300 sm:grid-cols-[auto_1fr]">
              <dt className="font-semibold text-white">Địa chỉ</dt>
              <dd>{dealer.address}</dd>
              <dt className="font-semibold text-white">Giờ làm việc</dt>
              <dd>
                {siteConfig.hours.display}. {siteConfig.hours.afterHours}
              </dd>
            </dl>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col">
            <a href={siteConfig.contact.phoneUrl} className="bg-red-600 px-6 py-3.5 text-center text-xs font-black uppercase tracking-[0.2em] transition hover:bg-red-700">
              Gọi {sales.phoneDisplay}
            </a>
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 px-6 py-3.5 text-center text-xs font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-gray-950"
            >
              Nhắn Zalo
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Mitsubishi+Motors+Moveo+New+City+Binh+Duong"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 px-6 py-3.5 text-center text-xs font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-gray-950"
            >
              Chỉ đường
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}