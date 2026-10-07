import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

// Nội dung còn mỏng nên không cho Google lập chỉ mục (vẫn mở được bình thường, đã bỏ khỏi sitemap).
// Khi viết lại có thông tin thật (giá phụ tùng, thời gian đặt hàng...) thì bỏ robots và thêm lại vào sitemap.ts.
export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Phụ tùng chính hãng Mitsubishi | Lưu Hoàng Phúc",
    description:
      "Thông tin tham khảo về phụ tùng chính hãng Mitsubishi và hỗ trợ khách hàng tại Mitsubishi Moveo New City.",
    path: "/ho-tro/phu-tung-chinh-hang",
  }),
  robots: { index: false, follow: true },
};

export default function GenuinePartsPage() {
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
              Phụ tùng chính hãng Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Tham khảo thông tin về phụ tùng chính hãng và lựa chọn
              sản phẩm phù hợp trong quá trình chăm sóc, bảo dưỡng
              xe Mitsubishi.
            </p>
          </div>
        </section>

        {/* Giới thiệu */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Phụ tùng Mitsubishi
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Phù hợp và đồng bộ với chiếc xe
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Phụ tùng chính hãng Mitsubishi được sản xuất nhằm phục vụ
                việc vận hành của xe Mitsubishi, với yêu cầu về chất lượng,
                tính đồng bộ và khả năng phù hợp với từng mẫu xe.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Khi cần kiểm tra hoặc thay thế phụ tùng, khách hàng nên
                xác định đúng mẫu xe, phiên bản và thông tin kỹ thuật để
                lựa chọn sản phẩm phù hợp.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-7">
              <h3 className="text-xl font-bold">
                Vì sao nên chọn đúng phụ tùng?
              </h3>

              <div className="mt-5 space-y-4 text-gray-600">
                <p>✓ Phù hợp với thiết kế và thông số của xe.</p>
                <p>✓ Hỗ trợ duy trì khả năng vận hành ổn định.</p>
                <p>✓ Thuận tiện kiểm tra và thay thế tại hệ thống dịch vụ.</p>
                <p>✓ Có chính sách áp dụng theo quy định của Mitsubishi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nhóm phụ tùng */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
              Một số nhóm sản phẩm thường gặp
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-gray-600">
              Mitsubishi Motors Việt Nam cung cấp thông tin về nhiều
              nhóm phụ tùng và sản phẩm phục vụ quá trình sử dụng,
              bảo dưỡng xe.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Lưỡi gạt nước",
                  text: "Chi tiết cần được kiểm tra khi có dấu hiệu gạt không sạch, rung hoặc xuống cấp.",
                },
                {
                  title: "Má phanh",
                  text: "Một trong những chi tiết quan trọng của hệ thống phanh cần được kiểm tra định kỳ.",
                },
                {
                  title: "Hệ thống truyền động cam",
                  text: "Các chi tiết liên quan cần được kiểm tra và bảo dưỡng theo hướng dẫn của từng mẫu xe.",
                },
                {
                  title: "Dầu và chất bôi trơn",
                  text: "Sử dụng sản phẩm phù hợp với yêu cầu kỹ thuật của xe và cấp bảo dưỡng.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lưu ý */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Khi cần thay phụ tùng
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-2xl font-bold text-red-600">01</p>
              <h3 className="mt-3 font-bold">
                Xác định đúng xe
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Cung cấp chính xác mẫu xe, phiên bản và năm sản xuất
                để hỗ trợ tra cứu phù hợp.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-2xl font-bold text-red-600">02</p>
              <h3 className="mt-3 font-bold">
                Kiểm tra tình trạng
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Việc kiểm tra thực tế giúp xác định hạng mục cần sửa
                chữa hoặc thay thế.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-2xl font-bold text-red-600">03</p>
              <h3 className="mt-3 font-bold">
                Tra cứu phụ tùng
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Kiểm tra mã phụ tùng, khả năng cung ứng và chi phí
                trước khi thực hiện.
              </p>
            </div>
          </div>
        </section>

        {/* Nguồn chính thức */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                Thông tin phụ tùng từ Mitsubishi Motors Việt Nam
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                Nội dung trên website này được trình bày dưới dạng
                thông tin tham khảo. Danh mục, khả năng cung ứng,
                giá bán và chính sách áp dụng có thể thay đổi theo
                từng thời điểm.
              </p>

              <a
                href="https://www.mitsubishi-motors.com.vn/dich-vu/phu-tung"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-lg border border-gray-900 px-5 py-3 font-semibold transition hover:bg-gray-900 hover:text-white"
              >
                Xem thông tin chính thức Mitsubishi
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
                  Cần hỗ trợ thông tin phụ tùng?
                </h2>

                <p className="mt-3 leading-7 text-gray-300">
                  Liên hệ {sales.name} tại {dealer.name} để được hỗ trợ
                  kết nối và tra cứu thông tin phù hợp với mẫu xe.
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