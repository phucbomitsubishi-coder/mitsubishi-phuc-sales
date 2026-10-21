import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { carCards } from "@/lib/carCards";
import { upcomingCars } from "@/data/cars";
import { siteConfig } from "@/config/site";

// Trang "Danh sách xe" kiểu trang Tất cả dòng xe của MMV (21/10/2026): lưới 2 cột, mỗi xe ảnh có cảnh nền,
// tên, giá từ, mô tả, nhiên liệu + số chỗ, nút Khám phá; cuối trang khối Trải nghiệm lái thử.
export const metadata: Metadata = createPageMetadata({
  title: "Danh sách xe Mitsubishi đang bán: giá, số chỗ, nhiên liệu",
  description:
    "Tất cả dòng xe Mitsubishi đang bán: Destinator, Triton, Xforce, Xpander Cross, Xpander, Attrage. Giá niêm yết từng xe, số chỗ, nhiên liệu và ưu đãi tháng.",
  path: "/xe",
});

const fuelIcon = "M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z";
const seatIcon = "M7 4v8l2 7h8v-3l-4-1-2-4V4H7z";

export default function CarListPage() {
  return (
    <>
      <PageSchema metadata={metadata} path="/xe" type="CollectionPage" name="Danh sách xe Mitsubishi" datePublished="2026-10-21" />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <section className="mx-auto max-w-3xl px-6 pb-4 pt-12 text-center md:pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Mitsubishi Motors</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Danh sách xe</h1>
          <p className="mt-5 leading-8 text-gray-700">
            Từ SUV 7 chỗ, xe đô thị nhỏ gọn, xe gia đình đến bán tải, Mitsubishi có lựa chọn cho từng nhu cầu.
            Bấm vào từng xe để xem giá lăn bánh, phiên bản và ưu đãi tháng.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-x-12 gap-y-16 px-6 py-12 md:grid-cols-2 md:py-16">
          {carCards.map((car) => (
            <article key={car.id} className="group flex flex-col text-center">
              <Link href={`/xe/${car.slug}`} className="relative block aspect-[760/351] overflow-hidden bg-gray-100">
                <Image
                  src={car.listImage ?? car.sideImage ?? car.image}
                  alt={car.name}
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                  className={`${car.listImage ? "object-cover" : "object-contain p-6"} transition duration-700 group-hover:scale-105`}
                />
                {car.promotionLabel && (
                  <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {car.promotionLabel}
                  </span>
                )}
              </Link>
              <h2 className="mt-8 text-3xl font-black tracking-tight md:text-4xl">
                <Link href={`/xe/${car.slug}`} className="hover:text-red-700">
                  {car.shortName}
                </Link>
              </h2>
              <p className="mt-3 text-lg text-gray-800">
                Giá từ <span className="tabular-nums">{car.priceFull}</span>
              </p>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-700">{car.description}</p>
              <ul className="mt-6 flex justify-center gap-8 text-xs font-bold uppercase tracking-[0.25em]">
                <li className="flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={fuelIcon} />
                  </svg>
                  {car.fuel}
                </li>
                <li className="flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={seatIcon} />
                  </svg>
                  {car.seats} chỗ
                </li>
              </ul>
              <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-3">
                <Link
                  href={`/xe/${car.slug}`}
                  className="border-2 border-gray-900 px-4 py-3.5 text-sm font-black uppercase tracking-[0.2em] transition hover:bg-gray-900 hover:text-white"
                >
                  Khám phá
                </Link>
                <Link
                  href={`/?car=${encodeURIComponent(car.name)}&nguon=Danh-sach-xe#bao-gia`}
                  className="bg-red-600 px-4 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
                >
                  Báo giá
                </Link>
              </div>
            </article>
          ))}
        </section>

        {upcomingCars.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-12">
            <h2 className="text-2xl font-black tracking-tight">Sắp ra mắt</h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-gray-700">
              {upcomingCars.map((car) => (
                <li key={car.slug}>
                  {car.name}:{" "}
                  <Link href={`/?car=${encodeURIComponent(car.name)}&nguon=Sap-ra-mat#bao-gia`} className="font-semibold text-red-700 hover:underline">
                    Nhận tin mở bán
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* TRẢI NGHIỆM LÁI THỬ (kiểu khối cuối trang Tất cả dòng xe của MMV) */}
        <section className="border-t border-gray-200">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_1.3fr] md:py-20">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Trải nghiệm các mẫu xe Mitsubishi</h2>
              <p className="mt-5 max-w-lg leading-8 text-gray-700">
                Lái thử tại showroom {siteConfig.dealer.name} hoặc Phúc mang xe đến tận nhà. Chọn mẫu xe và để lại thông tin,
                Phúc gọi lại sắp xếp lịch lái thử sớm nhất.
              </p>
              <Link
                href="/dang-ky-lai-thu?nguon=Danh-sach-xe"
                className="mt-8 inline-block border-2 border-gray-900 px-10 py-4 text-sm font-black uppercase tracking-[0.2em] transition hover:bg-gray-900 hover:text-white"
              >
                Đăng ký lái thử
              </Link>
            </div>
            <div className="relative aspect-[2/1] overflow-hidden bg-gray-100">
              <Image src="/images/cars/test-drive.jpg" alt="Mitsubishi Destinator chạy trên đường" fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
