import { getCarBySlug } from "@/data/cars";
import SiteHeader from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import VariantSelector from "./VariantSelector";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import BackToPrevious from "@/components/BackToPrevious";
import CarGallery from "./CarGallery";
import { currentPromotion } from "@/data/promotions";

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

  return {
    title: `${car.name} | Giá xe & ưu đãi | Lưu Hoàng Phúc`,
    description: `${car.name} tại Bình Dương. Xem giá xe, phiên bản, thông số kỹ thuật và ưu đãi mới. Liên hệ Lưu Hoàng Phúc để nhận báo giá và tư vấn.`,
    alternates: {
      canonical: `/xe/${slug}`,
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
    availability: "https://schema.org/InStock",
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
      item: "https://www.mitsubishiauto.vn/#xe-mitsubishi",
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
  <SiteHeader />

  <section className="mx-auto max-w-7xl px-6 pt-4 pb-2 md:pt-6 md:pb-3">
        <BackToPrevious />

        <div className="grid gap-5 md:gap-10 lg:grid-cols-2 lg:items-center">
         <CarGallery carName={car.name} />

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
  ) : (
    <>
      <p>✓ Dynamic Shield thế hệ mới</p>
      <p>✓ Khoảng sáng gầm lên đến 222 mm</p>
      <p>✓ 4 chế độ lái</p>
      <p>✓ Màn hình lên đến 12,3 inch</p>
      <p>✓ Hệ thống an toàn Diamond Sense</p>
    </>

  )}
</div>
  <div className="mt-6 flex flex-wrap gap-4">
    <a
      href={`/?car=${encodeURIComponent(car.name)}#bao-gia`}
      className="rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
    >
      Nhận báo giá
    </a>

    <a
      href="https://zalo.me/0858678929"
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

      {/* MOBILE CONTACT BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-3 shadow-lg md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a
            href={siteConfig.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded border border-blue-600 bg-white px-4 py-3 text-center font-semibold text-blue-600"
          >
            Zalo
          </a>

          <a
            href={siteConfig.contact.phoneUrl}
            className="flex-1 rounded bg-red-600 px-4 py-3 text-center font-semibold text-white"
          >
            Gọi ngay
          </a>
        </div>
      </div>
    </main>
  );
}