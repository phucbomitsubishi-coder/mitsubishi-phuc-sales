import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Hướng dẫn sử dụng xe Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Trung tâm hướng dẫn sử dụng xe Mitsubishi, liên kết tài liệu và video hướng dẫn chính thức từ Mitsubishi Motors Việt Nam.",
  path: "/ho-tro/huong-dan-su-dung",
});

const models = [
  {
    name: "Destinator",
    note: "Tra cứu tài liệu hướng dẫn phù hợp với mẫu xe và năm model.",
  },
  {
    name: "Xforce",
    note: "Tài liệu sử dụng và video hướng dẫn các tính năng trên xe.",
  },
  {
    name: "Xpander",
    note: "Tài liệu sử dụng và video hướng dẫn các tính năng thường dùng.",
  },
  {
    name: "Xpander Cross",
    note: "Tài liệu sử dụng và video hướng dẫn các trang bị, tính năng.",
  },
  {
    name: "Triton",
    note: "Tra cứu hướng dẫn vận hành phù hợp với phiên bản và năm model.",
  },
  {
    name: "Attrage",
    note: "Tài liệu sử dụng và video hướng dẫn các tính năng trên xe.",
  },
];

export default function UserGuidePage() {
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
              Hướng dẫn sử dụng xe Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Tra cứu tài liệu và video hướng dẫn sử dụng chính thức
              để hiểu rõ hơn các tính năng và cách vận hành chiếc xe
              Mitsubishi của bạn.
            </p>
          </div>
        </section>

        {/* Models */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Chọn mẫu xe cần hướng dẫn
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Nội dung và cách vận hành có thể khác nhau tùy phiên bản
            và năm model. Khi tra cứu, hãy chọn đúng thông tin chiếc
            xe đang sử dụng.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.name}
                className="rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                  Mitsubishi
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {model.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {model.note}
                </p>

                <a
                  href="https://www.mitsubishi-motors.com.vn/huong-dan-su-dung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex font-semibold text-red-600 hover:text-red-700"
                >
                  Tra cứu hướng dẫn →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Official resources */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
              Nguồn hướng dẫn chính thức
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-7">
                <p className="text-sm font-semibold uppercase text-red-600">
                  Tài liệu
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Sách hướng dẫn sử dụng trực tuyến
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Chọn mẫu xe phù hợp để đọc tài liệu hướng dẫn sử dụng
                  được Mitsubishi Motors Việt Nam cung cấp trực tuyến.
                </p>

                <a
                  href="https://www.mitsubishi-motors.com.vn/huong-dan-su-dung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                >
                  Mở tài liệu chính thức
                </a>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-7">
                <p className="text-sm font-semibold uppercase text-red-600">
                  Video
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Video hướng dẫn tính năng
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Xem các video hướng dẫn sử dụng một số tính năng trên
                  các mẫu xe Mitsubishi do Mitsubishi Motors Việt Nam
                  cung cấp.
                </p>

                <a
                  href="https://www.mitsubishi-motors.com.vn/dich-vu/huong-dan-su-dung-xe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-lg border border-gray-900 px-5 py-3 font-semibold hover:bg-gray-900 hover:text-white"
                >
                  Xem video hướng dẫn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold">
              Lưu ý khi sử dụng tài liệu
            </h2>

            <p className="mt-3 max-w-4xl leading-7 text-gray-700">
              Hướng dẫn có thể khác nhau giữa các năm model hoặc phiên
              bản của cùng một mẫu xe. Với các thao tác liên quan đến
              an toàn, vận hành, bảo dưỡng hoặc cảnh báo trên xe, hãy
              ưu tiên tài liệu dành chính xác cho chiếc xe của bạn.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
              Có thể bạn cần
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/ho-tro/chinh-sach-bao-hanh"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold hover:border-red-500"
              >
                Chính sách bảo hành →
              </Link>

              <Link
                href="/ho-tro/bao-duong-dinh-ky"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold hover:border-red-500"
              >
                Bảo dưỡng định kỳ →
              </Link>

              <Link
                href="/ho-tro/phu-tung-chinh-hang"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold hover:border-red-500"
              >
                Phụ tùng chính hãng →
              </Link>

              <Link
                href="/ho-tro/cau-hoi-thuong-gap"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold hover:border-red-500"
              >
                Câu hỏi thường gặp →
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                  Cần hỗ trợ?
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Liên hệ trực tiếp để được hướng dẫn
                </h2>

                <p className="mt-3 leading-7 text-gray-300">
                  {sales.name} – {dealer.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
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