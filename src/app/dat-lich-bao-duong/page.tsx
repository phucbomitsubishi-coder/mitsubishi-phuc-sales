import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import ServiceBookingForm from "@/components/ServiceBookingForm";
import { createPageMetadata } from "@/lib/metadata";
import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site";

// Đặt lịch bảo dưỡng qua anh Phúc (25/10/2026, kiểu đặt lịch dịch vụ của Mercedes/Volvo). Hotline = siteConfig.sales.phone2.
export const metadata: Metadata = createPageMetadata({
  title: "Đặt lịch bảo dưỡng xe Mitsubishi tại Moveo New City",
  description:
    "Đặt lịch bảo dưỡng, sửa chữa xe Mitsubishi tại xưởng dịch vụ Mitsubishi Moveo New City (Bình Dương cũ): chọn ngày, khung giờ, Phúc gọi xác nhận lịch với xưởng.",
  path: "/dat-lich-bao-duong",
});

// Xe đang bán + các dòng xe Mitsubishi đời trước khách hay mang tới xưởng
const carNames = [...cars.map((car) => car.name), "Mitsubishi Pajero Sport", "Mitsubishi Outlander", "Mitsubishi Mirage", "Mitsubishi Triton (thế hệ trước)", "Dòng xe khác"];

export default function ServiceBookingPage() {
  const { sales, dealer } = siteConfig;
  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/dat-lich-bao-duong"
        parents={[{ name: "Dịch vụ", path: "/ho-tro" }]}
        name="Đặt lịch bảo dưỡng"
        type="WebPage"
        datePublished="2026-10-25"
      />
      <SiteHeader />

      <main className="bg-gray-50 text-gray-900">
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Dịch vụ</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Đặt lịch bảo dưỡng</h1>
            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              Chọn ngày và khung giờ mang xe tới xưởng dịch vụ {dealer.name}. Phúc gọi lại xác nhận giờ hẹn để bạn không phải chờ lâu.
            </p>
            <a
              href={`tel:${sales.phone2}`}
              className="mt-6 inline-block bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
            >
              Hotline đặt lịch: {sales.phone2Display}
            </a>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_340px]">
          <div className="bg-white p-6 shadow-lg sm:p-10">
            <h2 className="mb-8 text-2xl font-black tracking-tight">Thông tin đặt lịch</h2>
            <ServiceBookingForm carNames={carNames} />
          </div>
          <aside className="space-y-6 text-sm leading-6 text-gray-700">
            <div className="border border-gray-300 bg-white p-6">
              <h2 className="text-lg font-black tracking-tight text-gray-950">Xưởng dịch vụ</h2>
              <p className="mt-2">{dealer.name}</p>
              <p>{dealer.address}</p>
              <p className="mt-2">Giờ làm việc: {siteConfig.hours.display}</p>
            </div>
            <div className="border border-gray-300 bg-white p-6">
              <h2 className="text-lg font-black tracking-tight text-gray-950">Xem thêm</h2>
              <ul className="mt-2 space-y-1">
                <li><Link href="/ho-tro/bao-duong-dinh-ky" className="text-red-700 underline-offset-4 hover:underline">Lịch bảo dưỡng định kỳ</Link></li>
                <li><Link href="/ho-tro/chinh-sach-bao-hanh" className="text-red-700 underline-offset-4 hover:underline">Chính sách bảo hành</Link></li>
                <li><Link href="/ho-tro/bao-hanh-mo-rong" className="text-red-700 underline-offset-4 hover:underline">Bảo hành mở rộng</Link></li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
