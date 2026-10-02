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

  return (
    <main className="min-h-screen bg-white text-black">
  <SiteHeader />

  <section className="mx-auto max-w-7xl px-6 pt-4 pb-2 md:pt-6 md:pb-3">
        <BackToPrevious />

        <div className="grid gap-5 md:gap-10 lg:grid-cols-2 lg:items-center">
         <CarGallery />

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
    <p>✓ Dynamic Shield thế hệ mới</p>
    <p>✓ Khoảng sáng gầm lên đến 222 mm</p>
    <p>✓ 4 chế độ lái</p>
    <p>✓ Màn hình lên đến 12,3 inch</p>
    <p>✓ Hệ thống an toàn Diamond Sense</p>
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