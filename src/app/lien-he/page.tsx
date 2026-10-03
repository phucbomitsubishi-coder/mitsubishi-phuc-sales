import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Liên hệ tư vấn Mitsubishi",
  description:
    "Liên hệ tư vấn xe Mitsubishi, báo giá, ưu đãi, trả góp và đăng ký lái thử tại Mitsubishi Moveo New City.",
      alternates: {
    canonical: "/lien-he",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
              Liên hệ Mitsubishi
            </p>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Tư vấn mua xe Mitsubishi nhanh chóng và thuận tiện
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Liên hệ để được hỗ trợ về mẫu xe, phiên bản, giá bán, chương trình
              ưu đãi, phương án trả góp và đăng ký lái thử Mitsubishi.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:0858678929"
                className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Gọi ngay: 0858 678 929
              </a>

              <Link
                href="/#bao-gia"
                className="rounded-lg border border-neutral-600 px-6 py-3 font-bold text-white transition hover:border-white"
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
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">
                Thông tin liên hệ
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950 md:text-3xl">
                Mitsubishi Moveo New City
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-neutral-600">
                Hỗ trợ khách hàng tham khảo xe Mitsubishi mới, chương trình ưu
                đãi, dự toán chi phí và các dịch vụ liên quan.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* TƯ VẤN KINH DOANH */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
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
              <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase text-red-600">
                  Hotline & Zalo
                </p>

                <div className="mt-3 space-y-3">
                  <a
                    href="tel:0858678929"
                    className="block text-2xl font-bold text-neutral-950 transition hover:text-red-600"
                  >
                    0858 678 929
                  </a>

                  <a
                    href="tel:0967354821"
                    className="block text-2xl font-bold text-neutral-950 transition hover:text-red-600"
                  >
                    0967 354 821
                  </a>
                </div>

                <p className="mt-4 leading-7 text-neutral-600">
                  Liên hệ trực tiếp để được hỗ trợ nhanh về xe, giá bán và
                  chương trình ưu đãi.
                </p>
              </div>

              {/* EMAIL */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase text-red-600">
                  Email
                </p>

                <a
                  href="mailto:phucbo.mitsubishi@gmail.com"
                  className="mt-3 block break-all text-lg font-bold text-neutral-950 transition hover:text-red-600"
                >
                  phucbo.mitsubishi@gmail.com
                </a>

                <p className="mt-3 leading-7 text-neutral-600">
                  Gửi yêu cầu tư vấn hoặc thông tin cần hỗ trợ qua email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ĐỊA CHỈ + HÀNH ĐỘNG */}
        <section className="bg-neutral-100">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:py-16">
            {/* ĐỊA CHỈ */}
            <div className="rounded-2xl bg-white p-7 shadow-sm md:p-9">
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">
                Địa chỉ
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                Mitsubishi Moveo New City
              </h2>

              <p className="mt-5 leading-8 text-neutral-600">
                Lô C1C, Đường Hùng Vương,
                <br />
                Phường Bình Dương, Thành phố Hồ Chí Minh.
              </p>

              <p className="mt-5 rounded-lg bg-neutral-100 p-4 text-sm leading-6 text-neutral-600">
                Khu vực phục vụ: Bình Dương cũ (TP. Hồ Chí Minh mới).
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-neutral-950 p-7 text-white shadow-sm md:p-9">
              <p className="text-sm font-bold uppercase tracking-wider text-red-500">
                Bạn đang quan tâm xe Mitsubishi?
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Chọn hình thức hỗ trợ phù hợp
              </h2>

              <p className="mt-4 leading-7 text-neutral-300">
                Bạn có thể nhận báo giá, đăng ký lái thử hoặc dự toán chi phí
                trước khi quyết định mua xe.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/#bao-gia"
                  className="rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  Nhận báo giá
                </Link>

                <Link
                  href="/dang-ky-lai-thu"
                  className="rounded-lg border border-neutral-600 px-5 py-3 font-bold text-white transition hover:border-white"
                >
                  Đăng ký lái thử
                </Link>

                <Link
                  href="/du-toan/gia-lan-banh"
                  className="rounded-lg border border-neutral-600 px-5 py-3 font-bold text-white transition hover:border-white"
                >
                  Dự toán chi phí
                </Link>
              </div>

              <div className="mt-8 border-t border-neutral-800 pt-6">
                <p className="text-sm text-neutral-400">
                  Hotline tư vấn
                </p>

                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="tel:0858678929"
                    className="font-bold text-white transition hover:text-red-500"
                  >
                    0858 678 929
                  </a>

                  <a
                    href="tel:0967354821"
                    className="font-bold text-white transition hover:text-red-500"
                  >
                    0967 354 821
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}