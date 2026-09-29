import { getCarBySlug } from "@/data/cars";
import SiteHeader from "@/components/SiteHeader";
import { notFound } from "next/navigation";
import VariantSelector from "./VariantSelector";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

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

  return (
    <main className="min-h-screen bg-white text-black">
  <SiteHeader />

  <section className="mx-auto max-w-7xl px-6 py-6 md:py-12">
        <a
          href="/#san-pham"
          className="mb-4 inline-block font-semibold text-red-600 md:mb-8"
        >
          ← Quay lại danh sách xe
        </a>

        <div className="grid gap-5 md:gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <img
              src={car.image}
              alt={car.name}
              className="w-full object-contain"
            />
          </div>

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

            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Giá tham khảo
              </p>

              <p className="mt-1 text-3xl font-bold text-red-600">
                {car.variants[0]?.price
                  ? `${car.variants[0].price.toLocaleString("vi-VN")} đ`
                  : "Liên hệ"}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
/>
   

{/* ĐIỂM NỔI BẬT */}
<section className="bg-white py-16">
  <div className="mx-auto max-w-7xl px-6">
    <p className="font-semibold uppercase tracking-wider text-red-600">
      Điểm nổi bật
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Khám phá {car.name}
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold">Ngoại thất</h3>
        <ul className="mt-4 space-y-2 text-gray-600">
          {car.highlights.exterior.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold">Nội thất</h3>
        <ul className="mt-4 space-y-2 text-gray-600">
          {car.highlights.interior.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold">An toàn</h3>
        <ul className="mt-4 space-y-2 text-gray-600">
          {car.highlights.safety.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold">Vận hành</h3>
        <ul className="mt-4 space-y-2 text-gray-600">
          {car.highlights.performance.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
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