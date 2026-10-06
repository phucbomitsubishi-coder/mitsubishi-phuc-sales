import { cars, getCarBySlug } from "@/data/cars";
import SiteHeader from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import VariantSelector from "./VariantSelector";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import BackToPrevious from "@/components/BackToPrevious";
import MobileContactBar from "@/components/MobileContactBar";
import CarGallery from "./CarGallery";
import { currentPromotion } from "@/data/promotions";
import Link from "next/link";
import Image from "next/image";
import PromotionTabs from "@/components/PromotionTabs";
import { usedCars } from "@/data/usedCars";
import { newsArticles } from "@/data/news";
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

  return {
    title: `${car.name} | Giá xe & ưu đãi | Lưu Hoàng Phúc`,
    description: `${car.name} tại Bình Dương. Xem giá xe, phiên bản, thông số kỹ thuật và ưu đãi mới. Liên hệ Lưu Hoàng Phúc để nhận báo giá và tư vấn.`,
    alternates: {
      canonical: `/xe/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `/xe/${slug}`,
      title: `${car.name} | Giá xe & ưu đãi | Lưu Hoàng Phúc`,
      description: `${car.name} tại Bình Dương. Xem giá xe, phiên bản, thông số kỹ thuật và ưu đãi mới. Liên hệ Lưu Hoàng Phúc để nhận báo giá và tư vấn.`,
      images: [
        {
          url: car.image,
          alt: car.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.name} | Giá xe & ưu đãi | Lưu Hoàng Phúc`,
      description: `${car.name} tại Bình Dương. Xem giá xe, phiên bản, thông số kỹ thuật và ưu đãi mới. Liên hệ Lưu Hoàng Phúc để nhận báo giá và tư vấn.`,
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

// 3 dòng xe khác theo thứ tự hiển thị
const otherCars = cars.filter((item) => item.id !== car.id).slice(0, 3);

// Thời hạn bảo hành theo trang /ho-tro/chinh-sach-bao-hanh
const isLongWarranty = car.id === "triton" || car.id === "destinator";
const { hours, dealer } = siteConfig;

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
    answer: `Bạn có thể dự tính phương án vay với mức trả trước từ 15% giá trị xe bằng công cụ dự tính trả góp. Lãi suất, thời hạn vay và hồ sơ cụ thể tùy ngân hàng. Phúc sẽ hỗ trợ so sánh phương án và chuẩn bị hồ sơ.`,
  },
  {
    question: `Có thể lái thử ${shortName} không?`,
    answer: `Có. Bạn đăng ký lịch lái thử tại showroom ${dealer.brand} – ${dealer.name.replace("Mitsubishi ", "")}, giờ làm việc ${hours.display}. ${hours.afterHours}.`,
  },
  {
    question: `${shortName} được bảo hành bao lâu?`,
    answer: `${car.name} được bảo hành ${isLongWarranty ? "60 tháng hoặc 150.000 km" : "36 tháng hoặc 100.000 km"}, tùy điều kiện nào đến trước, theo chính sách của Mitsubishi Motors Việt Nam.`,
  },
];

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

  <section className="mx-auto max-w-7xl px-6 pt-4 pb-2 md:pt-6 md:pb-3">
        <BackToPrevious />

        <div className="grid gap-5 md:gap-10 lg:grid-cols-2 lg:items-center">
         <CarGallery carName={car.name} fallbackImage={car.image} />

          <div>
            <p className="mb-2 font-semibold uppercase tracking-wider text-red-600">
              {car.category}
            </p>

            <h1 className="text-4xl font-bold">
              {car.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {car.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3">
              <div>
                <p className="text-sm text-gray-600">Giá từ</p>
                <p className="text-3xl font-extrabold tabular-nums text-red-700">
                  {minPrice.toLocaleString("vi-VN")} đ
                </p>
              </div>

              {promotionItem.maxValue > 0 && (
                <a
                  href="#uu-dai"
                  className="mb-1 rounded-full bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100"
                >
                  Ưu đãi tháng {promotionMonthLabel} đến {formatMillion(promotionItem.maxValue)} ↓
                </a>
              )}
            </div>

            <div className="mt-6">
  <p className="text-sm font-bold uppercase tracking-wide text-red-600">
    Điểm nổi bật
  </p>

 <div className="mt-3 grid gap-2 text-gray-700">
  {car.id === "xpander" ? (
    <>
      <p>✓ MPV 7 chỗ rộng rãi, linh hoạt</p>
      <p>✓ Khoảng sáng gầm 225 mm</p>
      <p>✓ Động cơ 1.5L MIVEC</p>
      <p>✓ Mâm hợp kim lên đến 17 inch</p>
      <p>✓ Phanh tay điện tử & Auto Hold</p>
    </>
  ) : car.id === "xpander-cross" ? (
    <>
      <p>✓ MPV 7 chỗ phong cách SUV mạnh mẽ</p>
      <p>✓ Khoảng sáng gầm 225 mm</p>
      <p>✓ Động cơ 1.5L MIVEC</p>
      <p>✓ Mâm hợp kim 17 inch</p>
      <p>✓ Hệ thống kiểm soát vào cua chủ động AYC</p>
    </>
  ) : car.id === "attrage" ? (
    <>
      <p>✓ Sedan 5 chỗ nhỏ gọn, linh hoạt</p>
      <p>✓ Động cơ 1.2L MIVEC</p>
      <p>✓ Khoảng sáng gầm 170 mm</p>
      <p>✓ Mâm hợp kim 15 inch</p>
      <p>✓ Phiên bản CVT Premium trang bị tiện nghi nổi bật</p>
    </>
    ) : car.id === "triton" ? (
  <>
    <p>✓ Động cơ Diesel 2.4L MIVEC mạnh mẽ</p>
    <p>✓ Công suất lên đến 204 PS, mô-men xoắn 470 Nm</p>
    <p>✓ Hệ dẫn động Super Select 4WD-II</p>
    <p>✓ 7 chế độ lái hỗ trợ đa địa hình</p>
    <p>✓ Mitsubishi Motors Safety Sensing (MMSS) trên bản Athlete</p>
  </>
  ) : car.id === "destinator" ? (
  <>
    <p>✓ SUV 7 chỗ rộng rãi dành cho gia đình</p>
    <p>✓ Động cơ Turbo 1.5L MIVEC, công suất 163 PS</p>
    <p>✓ Mô-men xoắn cực đại 250 Nm</p>
    <p>✓ Khoảng sáng gầm 214 mm, mâm hợp kim 18 inch</p>
    <p>✓ Hệ thống an toàn Diamond Sense trên bản Ultimate</p>
  </>
  ) : car.id === "xforce" ? (
    <>
      <p>✓ Dynamic Shield thế hệ mới</p>
      <p>✓ Khoảng sáng gầm lên đến 222 mm</p>
      <p>✓ 4 chế độ lái</p>
      <p>✓ Màn hình lên đến 12,3 inch</p>
      <p>✓ Hệ thống an toàn Diamond Sense</p>
    </>
  ) : (
    // Xe mới chưa có nội dung riêng: lấy từ highlights trong dữ liệu xe
    <>
      {[
        ...car.highlights.performance,
        ...car.highlights.interior,
        ...car.highlights.safety,
      ]
        .slice(0, 5)
        .map((item) => (
          <p key={item}>✓ {item}</p>
        ))}
    </>
  )}
</div>
  <div className="mt-6 flex flex-wrap gap-4">
    <Link
      href={`/?car=${encodeURIComponent(car.name)}&nguon=Chi-tiet-xe#bao-gia`}
      className="rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
    >
      Nhận báo giá
    </Link>

    <Link
      href={`/dang-ky-lai-thu?xe=${car.id}&nguon=Chi-tiet-xe`}
      className="rounded border border-red-600 px-6 py-3 font-semibold text-red-700 hover:bg-red-50"
    >
      Đăng ký lái thử
    </Link>

    <a
      href={siteConfig.contact.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"
    >
      Tư vấn Zalo
    </a>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* PHIÊN BẢN & GIÁ XE */}

      {/* THÔNG SỐ KỸ THUẬT */}
<VariantSelector
  carName={car.name}
  variants={car.variants}
  promotions={carPromotion?.variants}
/>

      {/* ƯU ĐÃI RIÊNG CỦA XE */}
      {promotionItem.maxValue > 0 && (
        <section
          id="uu-dai"
          className="relative mt-12 scroll-mt-28 overflow-clip bg-neutral-950 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-red-600/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Khuyến mãi
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Ưu đãi {shortName} tháng {promotionMonthLabel}
            </h2>

            <PromotionTabs items={[promotionItem]} />

            <p className="mt-5 text-xs leading-5 text-neutral-400">
              * Chương trình của {currentPromotion.source}. Giá trị ưu đãi mang
              tính tham khảo và có thể thay đổi theo từng thời điểm.
            </p>
          </div>
        </section>
      )}

      {/* CÂU HỎI THƯỜNG GẶP */}
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
          Câu hỏi thường gặp
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
          Thắc mắc khi mua {shortName}
        </h2>

        <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200">
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

      {/* GỢI Ý LIÊN QUAN */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-14 px-6 py-14 md:py-16">
          {relatedUsedCars.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {shortName} đã qua sử dụng đang có sẵn
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedUsedCars.map((usedCar) => (
                  <Link
                    key={usedCar.id}
                    href={`/xe-cu/${usedCar.slug}`}
                    className="group overflow-clip rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <Image
                        src={usedCar.image}
                        alt={`${usedCar.name} ${usedCar.modelYear}`}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
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
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Tin tức về {shortName}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map((article) => (
                  <Link
                    key={article.id}
                    href={`/tin-tuc/${article.slug}`}
                    className="group overflow-clip rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9] bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
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
            </div>
          )}

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Có thể bạn quan tâm
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherCars.map((other) => (
                <Link
                  key={other.id}
                  href={`/xe/${other.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-lg"
                >
                  <div className="relative h-36">
                    <Image
                      src={other.image}
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
          </div>
        </div>
      </section>

            {/* MOBILE CONTACT BAR */}
      <MobileContactBar
        zaloUrl={siteConfig.contact.zaloUrl}
        phoneUrl={siteConfig.contact.phoneUrl}
      />
    </main>
  );
}