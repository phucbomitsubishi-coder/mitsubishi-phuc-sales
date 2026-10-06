import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Bảo dưỡng định kỳ Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Thông tin tham khảo về chu kỳ bảo dưỡng định kỳ xe Mitsubishi và hỗ trợ khách hàng tại Mitsubishi Moveo New City.",
  path: "/ho-tro/bao-duong-dinh-ky",
});

export default function MaintenancePage() {
  const { sales, dealer, contact } = siteConfig;

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Hero */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Hỗ trợ khách hàng
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Bảo dưỡng định kỳ Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Bảo dưỡng đúng định kỳ giúp duy trì tình trạng vận hành,
              độ an toàn và độ bền của xe trong quá trình sử dụng.
            </p>
          </div>
        </section>

        {/* Chu kỳ */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Chu kỳ bảo dưỡng tham khảo
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Theo thông tin hướng dẫn của Mitsubishi Motors Việt Nam,
            chu kỳ bảo dưỡng cần được thực hiện theo quãng đường hoặc
            thời gian, tùy điều kiện nào đến trước.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-red-600">
                Đa số mẫu xe Mitsubishi
              </p>

              <p className="mt-3 text-3xl font-bold">
                5.000 km
              </p>

              <p className="mt-2 text-gray-600">
                hoặc 3 tháng
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Tùy điều kiện nào đến trước.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-red-600">
                All-New Triton động cơ 4N16
              </p>

              <p className="mt-3 text-3xl font-bold">
                10.000 km
              </p>

              <p className="mt-2 text-gray-600">
                hoặc 6 tháng
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Tùy điều kiện nào đến trước.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-gray-50 p-5 text-sm leading-6 text-gray-600">
            Lịch bảo dưỡng cụ thể có thể khác nhau tùy mẫu xe, phiên bản,
            điều kiện vận hành và hướng dẫn sử dụng đi kèm xe. Khách hàng
            nên kiểm tra tài liệu hướng dẫn của xe và thực hiện bảo dưỡng
            theo khuyến nghị của Mitsubishi.
          </div>
        </section>

        {/* Hạng mục */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
              Một số hạng mục cần kiểm tra định kỳ
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Dầu động cơ và lọc dầu",
                "Hệ thống phanh",
                "Lốp xe và áp suất lốp",
                "Nước làm mát",
                "Ắc-quy",
                "Hệ thống đèn và điện",
                "Lọc gió động cơ",
                "Lọc gió điều hòa",
                "Các loại dầu và chất lỏng",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-500">
              Hạng mục kiểm tra, điều chỉnh hoặc thay thế thực tế phụ
              thuộc vào cấp bảo dưỡng và tình trạng của từng xe.
            </p>
          </div>
        </section>

        {/* Lợi ích */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Vì sao nên bảo dưỡng đúng định kỳ?
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold">
                Duy trì vận hành ổn định
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Kiểm tra định kỳ giúp phát hiện sớm những dấu hiệu bất
                thường trong quá trình sử dụng xe.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold">
                Hỗ trợ duy trì an toàn
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Các hệ thống quan trọng như phanh, lốp, đèn và chất
                lỏng được kiểm tra theo từng cấp bảo dưỡng.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold">
                Theo dõi lịch sử chăm sóc xe
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Bảo dưỡng theo lịch giúp chủ xe thuận tiện theo dõi
                quá trình sử dụng và chăm sóc phương tiện.
              </p>
            </div>
          </div>
        </section>

        {/* Nguồn chính thức */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                Tra cứu thông tin bảo dưỡng chính thức
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                Khách hàng có thể tham khảo lịch bảo dưỡng và công cụ
                dự toán chi phí trên website chính thức của Mitsubishi
                Motors Việt Nam. Chi phí hiển thị trên công cụ của hãng
                chỉ mang tính tham khảo và có thể thay đổi.
              </p>

              <a
                href="https://www.mitsubishi-motors.com.vn/dich-vu/bao-duong-dinh-ky"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-lg border border-gray-900 px-5 py-3 font-semibold transition hover:bg-gray-900 hover:text-white"
              >
                Xem thông tin Mitsubishi Motors Việt Nam
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                  Hỗ trợ khách hàng
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Cần hỗ trợ thêm về bảo dưỡng?
                </h2>

                <p className="mt-3 leading-7 text-gray-300">
                  Liên hệ {sales.name} tại {dealer.name} để được hỗ trợ
                  thông tin phù hợp với mẫu xe đang sử dụng.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  {dealer.address}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={contact.phoneUrl}
                  className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                >
                  Gọi {sales.phoneDisplay}
                </a>

                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-blue-500 px-6 py-3 font-bold text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  Mở Zalo
                </a>

                <Link
                  href="/"
                  className="rounded-lg border border-gray-600 px-6 py-3 font-semibold hover:bg-white hover:text-black"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}