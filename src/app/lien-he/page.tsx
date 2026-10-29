import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = createPageMetadata({
  title: "Liên hệ tư vấn xe Mitsubishi Bình Dương: hotline, Zalo, showroom",
  description:
    "Liên hệ tư vấn xe Mitsubishi, báo giá, ưu đãi, trả góp và đăng ký lái thử tại Mitsubishi Moveo New City.",
  path: "/lien-he",
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Liên hệ Mitsubishi
            </p>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl tracking-tight">
              Tư vấn mua xe Mitsubishi nhanh chóng và thuận tiện
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Liên hệ để được hỗ trợ về mẫu xe, phiên bản, giá bán, chương trình
              ưu đãi, phương án trả góp và đăng ký lái thử Mitsubishi.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneUrl}
                className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Gọi ngay: {siteConfig.sales.phoneDisplay}
              </a>

              <Link
                href="/?nguon=Lien-he#bao-gia"
                className="border border-neutral-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-white"
              >
                Nhận báo giá
              </Link>
            </div>
          </div>
        </section>

        {/* THÔNG TIN LIÊN HỆ */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
                Thông tin liên hệ
              </p>

              <h2 className="mt-2 text-2xl font-black text-neutral-950 md:text-3xl tracking-tight">
                Liên hệ tư vấn mua xe
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-neutral-600">
                Hỗ trợ khách hàng tham khảo xe Mitsubishi mới, chương trình ưu
                đãi, dự toán chi phí và các dịch vụ liên quan.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* TƯ VẤN KINH DOANH */}
              <div className="border border-neutral-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase text-red-600">
                  Tư vấn kinh doanh
                </p>

                <h3 className="mt-3 text-xl font-bold text-neutral-950">
                  Lưu Hoàng Phúc
                </h3>

                <p className="mt-3 leading-7 text-neutral-600">
                  Hỗ trợ tư vấn mẫu xe, phiên bản, giá bán, ưu đãi và phương án
                  mua xe Mitsubishi.
                </p>
              </div>

              {/* HOTLINE */}
              <div className="border border-neutral-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase text-red-600">
                  Hotline & Zalo
                </p>

                <div className="mt-3 space-y-3">
                  <a
                    href={siteConfig.contact.phoneUrl}
                    className="block text-2xl font-bold text-neutral-950 transition hover:text-red-600"
                  >
                    {siteConfig.sales.phoneDisplay}
                  </a>

                  <a
                    href={`tel:${siteConfig.sales.phone2}`}
                    className="block text-2xl font-bold text-neutral-950 transition hover:text-red-600"
                  >
                    {siteConfig.sales.phone2Display}
                  </a>
                </div>

                <p className="mt-4 leading-7 text-neutral-600">
                  Liên hệ trực tiếp để được hỗ trợ nhanh về xe, giá bán và
                  chương trình ưu đãi.
                </p>
              </div>

              {/* EMAIL */}
              <div className="border border-neutral-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase text-red-600">
                  Email
                </p>

                <a
                  href={siteConfig.contact.emailUrl}
                  className="mt-3 block break-all text-lg font-bold text-neutral-950 transition hover:text-red-600"
                >
                  {siteConfig.sales.email}
                </a>

                <p className="mt-3 leading-7 text-neutral-600">
                  Gửi yêu cầu tư vấn hoặc thông tin cần hỗ trợ qua email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 SHOWROOM PHÚC TIẾP KHÁCH (siteConfig.dealer.showrooms) */}
        <section className="bg-neutral-100">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">
              Địa chỉ
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
              Hẹn gặp Phúc tại showroom gần bạn
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
              Phúc tiếp khách tại 3 showroom Mitsubishi Moveo ở {siteConfig.dealer.salesArea}. Gọi
              hoặc nhắn Zalo trước khi đến để Phúc có mặt và chuẩn bị đúng xe bạn muốn xem.
            </p>

            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {siteConfig.dealer.showrooms.map((showroom) => (
                <li key={showroom.short} className="flex flex-col bg-white p-6 shadow-sm md:p-7">
                  <h3 className="text-lg font-black tracking-tight text-neutral-950">{showroom.name}</h3>
                  <p className="mt-3 leading-7 text-neutral-600">{showroom.address}</p>
                  <p className="mb-6 mt-3 text-sm text-neutral-600">{siteConfig.hours.display}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${showroom.name}, ${showroom.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto self-start border border-neutral-950 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                  >
                    Chỉ đường
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HÀNH ĐỘNG */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 md:items-center md:py-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Bạn đang quan tâm xe Mitsubishi?
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                Chọn hình thức hỗ trợ phù hợp
              </h2>

              <p className="mt-4 leading-7 text-neutral-300">
                Nhận báo giá, đăng ký lái thử hoặc dự toán chi phí trước khi quyết định mua xe.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <span className="text-sm text-neutral-400">Hotline tư vấn</span>
                <a
                  href={siteConfig.contact.phoneUrl}
                  className="font-bold text-white transition hover:text-red-500"
                >
                  {siteConfig.sales.phoneDisplay}
                </a>
                <a
                  href={`tel:${siteConfig.sales.phone2}`}
                  className="font-bold text-white transition hover:text-red-500"
                >
                  {siteConfig.sales.phone2Display}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/?nguon=Lien-he#bao-gia"
                className="bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Nhận báo giá
              </Link>

              <Link
                href="/dang-ky-lai-thu?nguon=Lien-he"
                className="border border-neutral-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-white"
              >
                Đăng ký lái thử
              </Link>

              <Link
                href="/du-toan/gia-lan-banh"
                className="border border-neutral-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-white"
              >
                Dự toán chi phí
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}