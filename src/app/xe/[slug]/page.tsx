import { cars, getCarBySlug } from "@/data/cars";
import { stockByVariant, stockDateLabel } from "@/lib/stock";
import SiteHeader from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import VariantSelector from "./VariantSelector";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import BackToPrevious from "@/components/BackToPrevious";
import CarGallery from "./CarGallery";
import { currentPromotion, getMaxPromotionValue } from "@/data/promotions";
import Link from "next/link";
import Image from "next/image";
import { usedCars } from "@/data/usedCars";
import { newsArticles } from "@/data/news";
import { advisoryArticles } from "@/data/advisory";
import { brochures } from "@/data/brochures";
import { getCarFacts } from "@/lib/carFacts";
import CarSectionNav from "./CarSectionNav";
import CarFeatures from "./CarFeatures";
import ShowroomHero from "./ShowroomHero";
import ShowroomFeatures from "./ShowroomFeatures";
import Tabs from "@/components/Tabs";
import { showrooms } from "@/data/showroom";
import HandoverStrip from "@/components/HandoverStrip";
import { featuredImages } from "@/lib/carCards";
import {
  benefitSummary,
  buildPromotionItem,
  formatMillion,
  promotionMonthLabel,
} from "@/lib/promotionItems";

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

// Cụm từ khách hay tìm cho từng xe (Search Console: "mitsubishi 5 chỗ gầm cao"...)
const carSeoTags: Record<string, string> = {
  xforce: "SUV 5 chỗ gầm cao 222 mm",
  xpander: "MPV 7 chỗ gia đình",
  "xpander-cross": "MPV 7 chỗ phong cách SUV, gầm cao 225 mm",
  destinator: "SUV 7 chỗ động cơ turbo",
  triton: "bán tải 5 chỗ máy dầu",
  attrage: "sedan 5 chỗ tiết kiệm xăng",
};

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    return {
      title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
    };
  }

  // Tiêu đề, mô tả tự đổi theo tháng của currentPromotion (khách hay tìm "giá xe ... tháng", "lăn bánh")
  const title = `Giá xe ${car.name} tháng ${promotionMonthLabel}: lăn bánh, ưu đãi | Lưu Hoàng Phúc`;
  const prices = car.variants.map((variant) => variant.price).filter((price) => price > 0);
  const maxPromotion = getMaxPromotionValue(car.id);
  const description = [
    `${car.name} ${carSeoTags[car.id] ?? car.category}`,
    prices.length > 0 && `: giá niêm yết từ ${formatMillion(Math.min(...prices))} đồng`,
    maxPromotion > 0 && `, ưu đãi tháng ${promotionMonthLabel} đến ${formatMillion(maxPromotion)} đồng`,
    ". Xem giá lăn bánh, thông số và trang bị từng phiên bản. Tư vấn: Lưu Hoàng Phúc, Mitsubishi Moveo New City.",
  ]
    .filter(Boolean)
    .join("");

  return {
    title,
    description,
    alternates: {
      canonical: `/xe/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `/xe/${slug}`,
      title,
      description,
      images: [
        {
          url: car.image,
          alt: car.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.image],
    },
  };
}
export default async function CarDetailPage({
  params,
}: CarDetailPageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const carPromotion = currentPromotion.cars.find(
  (promotionCar) => promotionCar.carId === car.id
);
const variantPrices = car.variants.map((variant) => variant.price);
const minPrice = Math.min(...variantPrices);
const shortName = car.name.replace(/^Mitsubishi /, "");
const promotionItem = buildPromotionItem(car);

// Xe cũ cùng dòng đang bán (không lẫn "Xpander" với "Xpander Cross")
const relatedUsedCars = usedCars.filter((usedCar) => {
  if (usedCar.status !== "available") return false;
  if (usedCar.name === car.name) return true;
  if (!usedCar.name.startsWith(`${car.name} `)) return false;
  return !cars.some(
    (other) =>
      other.name.length > car.name.length &&
      other.name.startsWith(car.name) &&
      usedCar.name.startsWith(other.name)
  );
});

// Tin tức có nhắc tới dòng xe này (mới nhất trước)
const relatedNews = newsArticles
  .filter((article) => article.title.toLowerCase().includes(shortName.toLowerCase()))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

// Bài tư vấn, so sánh gắn với dòng xe này (src/data/advisory.ts)
const relatedAdvisory = advisoryArticles.filter((item) =>
  item.carIds?.includes(car.id)
);

// 3 dòng xe khác theo thứ tự hiển thị
const otherCars = cars.filter((item) => item.id !== car.id).slice(0, 3);

// Thời hạn bảo hành theo trang /ho-tro/chinh-sach-bao-hanh
const isLongWarranty = car.id === "triton" || car.id === "destinator";
const { hours, dealer } = siteConfig;
const facts = getCarFacts(car);
const brochure = brochures[car.id];

// Câu hỏi về chính chiếc xe (khách hay tìm trên Google, giống mục hỏi đáp của Ford),
// trả lời bằng thông số từng phiên bản trong cars.ts (đã đối chiếu MMV)
const specFaqs = [
  facts.seats && {
    question: `${shortName} có mấy chỗ ngồi?`,
    answer: `${car.name} là ${car.category === "Pickup" ? "xe bán tải" : car.category} ${facts.seats} chỗ ngồi${facts.groundClearance ? `, khoảng sáng gầm ${facts.groundClearance}` : ""}.`,
  },
  facts.engine && {
    question: `${shortName} chạy xăng hay dầu, động cơ gì?`,
    answer: `${car.name} dùng động cơ ${facts.fuel === "Dầu" ? "dầu (diesel)" : (facts.fuel ?? "").toLowerCase()}. ${facts.engine}.`,
  },
  facts.transmission && {
    question: `${shortName} có số tự động không?`,
    answer: `Hộp số và dẫn động của ${car.name}: ${facts.transmission}.`,
  },
  facts.fuelConsumption && {
    question: `${shortName} tiêu hao bao nhiêu lít xăng/100 km?`,
    answer: `Mức tiêu hao nhiên liệu kết hợp theo công bố của Mitsubishi Motors Việt Nam: ${facts.fuelConsumption}. Mức thực tế thay đổi theo cách lái, tải trọng và điều kiện đường.`,
  },
  facts.dimensions && {
    question: `Kích thước ${shortName} bao nhiêu?`,
    answer: `Kích thước tổng thể (dài × rộng × cao) của ${car.name}: ${facts.dimensions}.`,
  },
  facts.airbags && {
    question: `${shortName} có bao nhiêu túi khí?`,
    answer: `Số túi khí theo phiên bản: ${facts.airbags}. Xem đầy đủ hệ thống an toàn trong mục Trang bị ở trên.`,
  },
].filter((item): item is { question: string; answer: string } => !!item);

const faqs = [
  {
    question: `Giá lăn bánh ${shortName} bao nhiêu?`,
    answer: `${car.name} có giá niêm yết từ ${minPrice.toLocaleString("vi-VN")} đồng (${car.variants.length} phiên bản). Giá lăn bánh thay đổi theo nơi đăng ký xe. Bạn có thể chọn tỉnh, thành trong mục "Dự tính giá lăn bánh" ở trên để xem chi tiết từng khoản.`,
  },
  ...(promotionItem.maxValue > 0
    ? [
        {
          question: `${shortName} đang có ưu đãi gì trong tháng ${promotionMonthLabel}?`,
          answer: `Trong tháng ${promotionMonthLabel}, ${car.name} có ưu đãi lên đến ${formatMillion(promotionItem.maxValue)}, gồm ${benefitSummary(promotionItem)}. Ưu đãi khác nhau theo từng phiên bản, liên hệ để nhận báo giá chính xác.`,
        },
      ]
    : []),
  {
    question: `Mua ${shortName} trả góp cần trả trước bao nhiêu?`,
    answer: `Bạn có thể dự tính phương án vay với mức trả trước từ 20% giá trị xe bằng công cụ dự tính trả góp. Lãi suất, thời hạn vay và hồ sơ cụ thể tùy ngân hàng. Phúc sẽ hỗ trợ so sánh phương án và chuẩn bị hồ sơ.`,
  },
  {
    question: `Có thể lái thử ${shortName} không?`,
    answer: `Có. Bạn có thể lái thử tại showroom ${dealer.brand} – ${dealer.name.replace("Mitsubishi ", "")} (${hours.display}) hoặc đăng ký lái thử tại nhà, Phúc sẽ mang xe đến tận nơi theo lịch hẹn.`,
  },
  {
    question: `${shortName} được bảo hành bao lâu?`,
    answer: `${car.name} được bảo hành ${isLongWarranty ? "60 tháng hoặc 150.000 km" : "36 tháng hoặc 100.000 km"}, tùy điều kiện nào đến trước, theo chính sách của Mitsubishi Motors Việt Nam.`,
  },
  ...specFaqs,
];

// Mục lục bám đầu trang
// Thứ tự giống trang sản phẩm MMV: phiên bản & giá trước, rồi tới các khối tính năng
const sectionNav = [
  { id: "phien-ban", label: "Giá & phiên bản" },
  { id: "lan-banh", label: "Lăn bánh" },
  { id: "trang-bi", label: "Trang thiết bị" },
  { id: "tinh-nang", label: "Tính năng" },
  { id: "hinh-anh", label: "Hình ảnh" },
  { id: "hoi-dap", label: "Hỏi đáp" },
];

// Bộ hình ảnh kiểu trang MMV (src/data/showroom.ts); xe chưa có thì dùng banner mặc định
const showroom = showrooms[car.id];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const vehicleSchema = {
  "@context": "https://schema.org",
  "@type": "Vehicle",
  "@id": `https://www.mitsubishiauto.vn/xe/${car.slug}#vehicle`,
  name: car.name,
  url: `https://www.mitsubishiauto.vn/xe/${car.slug}`,
  description: car.shortDescription,
  image: `https://www.mitsubishiauto.vn${car.image}`,
  brand: {
    "@type": "Brand",
    name: "Mitsubishi Motors",
  },
  vehicleConfiguration: car.category,
  vehicleSeatingCapacity: car.specifications.seats,
  fuelType: car.specifications.fuel,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: Math.min(...variantPrices),
    highPrice: Math.max(...variantPrices),
    offerCount: car.variants.length,
    url: `https://www.mitsubishiauto.vn/xe/${car.slug}`,
  },
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: "https://www.mitsubishiauto.vn",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Xe Mitsubishi",
      item: "https://www.mitsubishiauto.vn/#san-pham",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: car.name,
      item: `https://www.mitsubishiauto.vn/xe/${car.slug}`,
    },
  ],
};

  return (
    <main className="min-h-screen bg-white text-black">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(vehicleSchema),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
  />
  <SiteHeader />

  {showroom ? (
    <>
      <ShowroomHero
        showroom={showroom}
        carName={car.name}
        carId={car.id}
        priceLabel={`${minPrice.toLocaleString("vi-VN")} đ`}
        promotionLabel={promotionItem.maxValue > 0 ? `Ưu đãi tháng ${promotionMonthLabel} đến ${formatMillion(promotionItem.maxValue)}` : undefined}
        brochureUrl={brochure?.url}
        stats={facts.stats}
      />
    </>
  ) : (
  /* BANNER XE mặc định (xe chưa có bộ ảnh showroom): nền tối, tên xe lớn, ảnh xe tách nền, 4 số liệu nhanh */
  <section className="relative overflow-clip bg-neutral-950 text-white">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_65%_80%,rgba(220,38,38,0.35),transparent_60%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]" />

    <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-4 md:px-6 md:pb-12 md:pt-6">
      <BackToPrevious className="text-sm text-white/70 hover:text-white" />

      <div className="mt-2 grid items-center gap-2 md:grid-cols-[1fr_1.3fr] md:gap-8">
        <div className="hero-fade order-2 md:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            {carSeoTags[car.id] ?? car.category}
          </p>
          <h1 className="mt-2 font-black leading-none tracking-tight">
            <span className="block text-lg font-bold tracking-[0.3em] text-white/60 md:text-xl">MITSUBISHI</span>
            <span className="mt-1 block text-5xl md:text-7xl">{shortName}</span>
          </h1>
          <p className="mt-4 max-w-md leading-7 text-white/70">{car.shortDescription}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              <span className="block text-xs text-white/60">Giá niêm yết từ</span>
              <span className="text-3xl font-extrabold tabular-nums">{minPrice.toLocaleString("vi-VN")} đ</span>
            </p>
            {promotionItem.maxValue > 0 && (
              <a
                href="#lan-banh"
                className="bg-red-600 px-3 py-1.5 text-sm font-bold shadow-lg shadow-red-900/40 transition hover:bg-red-700"
              >
                Ưu đãi tháng {promotionMonthLabel} đến {formatMillion(promotionItem.maxValue)} ↓
              </a>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link
              href={`/?car=${encodeURIComponent(car.name)}&nguon=Chi-tiet-xe#bao-gia`}
              className="bg-red-600 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700 sm:px-7"
            >
              Nhận báo giá
            </Link>
            <Link
              href={`/dang-ky-lai-thu?xe=${car.id}&nguon=Chi-tiet-xe`}
              className="bg-white px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-gray-200 sm:px-7"
            >
              Lái thử
            </Link>
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10 sm:px-7"
            >
              Tư vấn Zalo
            </a>
            {brochure && (
              <a
                href={brochure.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10 sm:px-7"
              >
                Brochure <span className="text-xs font-normal text-white/60">PDF</span>
              </a>
            )}
          </div>
        </div>

        <div className="relative order-1 h-[220px] sm:h-[320px] md:order-2 md:h-[440px]">
          <p
            aria-hidden="true"
            className="hero-mark pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[24vw] font-black uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)] md:text-[11rem]"
          >
            {shortName}
          </p>
          <div className="absolute inset-0 scale-[1.25] md:scale-[1.15]">
            <Image
              src={car.image}
              alt={car.name}
              fill
              preload
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* 4 số liệu nhanh (giống hàng số liệu của Ford) */}
      <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4">
        {facts.stats.map((stat, index) => (
          <div key={stat.label} className={`flex flex-col-reverse px-1 ${index % 2 ? "border-l border-white/10 pl-4 md:pl-6" : ""} ${index === 2 ? "md:border-l md:border-white/10 md:pl-6" : ""}`}>
            <dt className="mt-1 text-xs uppercase tracking-wider text-white/60">{stat.label}</dt>
            <dd className="text-xl font-extrabold tabular-nums md:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
  )}

      <CarSectionNav
        items={sectionNav}
        carName={car.name}
        quoteHref={`/?car=${encodeURIComponent(car.name)}&nguon=Thanh-muc-luc#bao-gia`}
      />

      {/* PHIÊN BẢN & GIÁ XE, THÔNG SỐ, TRANG BỊ, LĂN BÁNH */}
      <VariantSelector
        carName={car.name}
        variants={car.variants}
        promotions={carPromotion?.variants}
        sideImages={showroom?.sideImages}
        stock={stockByVariant(car.id)}
        stockDate={stockDateLabel}
      />

      {showroom ? <ShowroomFeatures car={car} showroom={showroom} /> : <CarFeatures car={car} />}

      {/* THƯ VIỆN ẢNH */}
      <section id="hinh-anh" className="scroll-mt-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Thư viện ảnh</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Hình ảnh {shortName}</h2>
          <div className="mt-6">
            <CarGallery carName={car.name} fallbackImage={car.image} />
          </div>
        </div>
      </section>


      {/* KHÁCH HÀNG NHẬN XE (tạo tin tưởng; ảnh đã được khách đồng ý, dùng chung với /gioi-thieu) */}
      <section className="overflow-hidden bg-white py-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Khách hàng nhận xe</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{siteConfig.sales.carsDelivered} chiếc xe đã lăn bánh cùng Phúc</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Showroom {dealer.name} được đánh giá{" "}
              <span className="font-bold text-gray-900">{dealer.googleRating.score}★ trên Google</span> ({dealer.googleRating.count} đánh giá).
            </p>
          </div>
          <Link href="/gioi-thieu" className="font-semibold text-red-700 hover:text-red-800">
            Xem thêm về Phúc →
          </Link>
        </div>
        <div className="mt-6">
          <HandoverStrip />
        </div>
      </section>

      {/* CÂU HỎI THƯỜNG GẶP */}
      <section id="hoi-dap" className="mx-auto max-w-4xl scroll-mt-32 px-6 py-12 md:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
          Câu hỏi thường gặp
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
          Thắc mắc khi mua {shortName}
        </h2>

        <div className="mt-8 divide-y divide-gray-200 border border-gray-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-xl text-red-700 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DẢI CHỐT CUỐI TRANG: nút lái thử / báo giá mở hộp thoại dùng chung (QuoteDialog trong layout) */}
      <section className="relative overflow-clip bg-neutral-950 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(220,38,38,0.4),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">Bước tiếp theo</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Sẵn sàng trải nghiệm {shortName}?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/75">
            Lái thử tại showroom {dealer.name} hoặc tại nhà. Phúc gửi báo giá lăn bánh, ưu đãi tháng và phương án trả góp qua Zalo.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            <Link
              href={`/dang-ky-lai-thu?xe=${car.id}&nguon=Cuoi-trang-xe`}
              className="bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-gray-200"
            >
              Đăng ký lái thử
            </Link>
            <Link
              href={`/?car=${encodeURIComponent(car.name)}&nguon=Cuoi-trang-xe#bao-gia`}
              className="bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
            >
              Nhận báo giá
            </Link>
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] transition hover:border-white hover:bg-white/10"
            >
              Nhắn Zalo
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">
            <Link href="/du-toan/tra-gop" className="underline-offset-4 hover:text-white hover:underline">Dự tính trả góp</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/thu-cu-doi-moi" className="underline-offset-4 hover:text-white hover:underline">Thu cũ đổi mới</Link>
            {brochure && (
              <>
                <span aria-hidden="true"> · </span>
                <a href={brochure.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-white hover:underline">
                  Tải brochure (PDF {brochure.size})
                </a>
              </>
            )}
          </p>
        </div>
      </section>

      {/* GỢI Ý LIÊN QUAN (gộp 21/10/2026): 1 khối tab So sánh / Xe cũ / Tin tức / Dòng xe khác;
          điện thoại vuốt ngang, máy tính dạng lưới; tab ẩn vẫn trong HTML */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Xem thêm về {shortName}</h2>
          <div className="mt-6">
          <Tabs
            label={`Xem thêm về ${shortName}`}
            tabs={[
          ...(relatedAdvisory.length > 0 ? [{ id: "so-sanh", label: "So sánh & tư vấn", content: (
              <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
                {relatedAdvisory.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group w-[80%] shrink-0 snap-start border border-gray-200 bg-white p-5 transition hover:border-red-600 hover:shadow-lg sm:w-auto"
                  >
                    <p className="font-bold leading-6 group-hover:text-red-700">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-semibold text-red-700">
                      Đọc bài so sánh →
                    </span>
                  </Link>
                ))}
              </div>
          ) }] : []),
          ...(relatedUsedCars.length > 0 ? [{ id: "xe-cu", label: `${shortName} đã qua sử dụng`, content: (
              <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
                {relatedUsedCars.map((usedCar) => (
                  <Link
                    key={usedCar.id}
                    href={`/xe-cu/${usedCar.slug}`}
                    className="group w-[72%] shrink-0 snap-start overflow-clip border border-gray-200 bg-white transition hover:shadow-lg sm:w-auto"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <Image
                        src={usedCar.image}
                        alt={`${usedCar.name} ${usedCar.modelYear}`}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 72vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="font-bold">
                        {usedCar.name} {usedCar.modelYear}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {usedCar.mileage.toLocaleString("vi-VN")} km · {usedCar.color}
                      </p>
                      <p className="mt-2 text-lg font-bold text-red-700">
                        {usedCar.price.toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
          ) }] : []),
          ...(relatedNews.length > 0 ? [{ id: "tin-tuc", label: "Tin tức", content: (
              <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
                {relatedNews.map((article) => (
                  <Link
                    key={article.id}
                    href={`/tin-tuc/${article.slug}`}
                    className="group w-[80%] shrink-0 snap-start overflow-clip border border-gray-200 bg-white transition hover:shadow-lg sm:w-auto"
                  >
                    <div className="relative aspect-[16/9] bg-gray-100">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="p-5 font-semibold leading-6 group-hover:text-red-700">
                      {article.title}
                    </p>
                  </Link>
                ))}
              </div>
          ) }] : []),
          { id: "xe-khac", label: "Dòng xe khác", content: (
            <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {otherCars.map((other) => (
                <Link
                  key={other.id}
                  href={`/xe/${other.slug}`}
                  className="group w-[72%] shrink-0 snap-start border border-gray-200 bg-white p-5 transition hover:shadow-lg sm:w-auto"
                >
                  <div className="relative h-36">
                    <Image
                      src={featuredImages[other.id] ?? other.image}
                      alt={other.name}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-lg font-bold">{other.name}</p>
                  <p className="text-sm text-gray-600">
                    Giá từ{" "}
                    <span className="font-semibold text-red-700">
                      {Math.min(...other.variants.map((v) => v.price)).toLocaleString("vi-VN")} đ
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          ) },
            ]}
          />
          </div>
        </div>
      </section>
    </main>
  );
}