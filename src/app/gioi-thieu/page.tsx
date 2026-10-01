import SiteHeader from "@/components/SiteHeader";
import MoveoEcosystem from "@/components/MoveoEcosystem";
import MoveoTimeline from "@/components/MoveoTimeline";
import MoveoLocation from "@/components/MoveoLocation";
import { siteConfig } from "@/config/site";

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
          <p className="font-semibold uppercase tracking-widest text-red-500">
            Mitsubishi Motors – Moveo New City
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Đồng hành cùng khách hàng trên hành trình lựa chọn và sở hữu xe
            Mitsubishi
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Kết nối khách hàng với các sản phẩm, dịch vụ và giải pháp hỗ trợ
            tại Mitsubishi Motors – Moveo New City, trên nền tảng phát triển
            của hệ thống Moveo Auto.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/dang-ky-lai-thu"
              className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
            >
              Đăng ký lái thử
            </a>

            <a
              href={siteConfig.contact.zaloUrl}
              className="rounded-lg border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-black"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </section>

      {/* MOVEO NEW CITY */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Mitsubishi Motors – Moveo New City
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Một điểm đến trong hệ thống phân phối Mitsubishi Motors
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Mitsubishi Motors – Moveo New City là Nhà Phân Phối chính thức
              được ủy quyền bởi Mitsubishi Motors Việt Nam, cung cấp các sản
              phẩm và dịch vụ dành cho khách hàng Mitsubishi.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Bên cạnh hoạt động kinh doanh xe mới, Moveo New City còn cung
              cấp dịch vụ, phụ tùng và xe đã qua sử dụng chính hãng, hướng
              đến việc đồng hành cùng khách hàng trong suốt quá trình tìm
              hiểu, sở hữu và sử dụng xe.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-100 p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-red-600">
              Hỗ trợ khách hàng
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <h3 className="font-bold">Xe Mitsubishi mới</h3>
                <p className="mt-1 text-gray-600">
                  Tìm hiểu các dòng xe, phiên bản và thông tin sản phẩm.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Dịch vụ & phụ tùng</h3>
                <p className="mt-1 text-gray-600">
                  Hỗ trợ nhu cầu bảo dưỡng, dịch vụ và phụ tùng trong quá
                  trình sử dụng xe.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Xe đã qua sử dụng</h3>
                <p className="mt-1 text-gray-600">
                  Tham khảo các lựa chọn xe đã qua sử dụng phù hợp với nhu
                  cầu thực tế.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* HÀNH TRÌNH PHÁT TRIỂN MOVEO */}
      <MoveoTimeline />

            {/* HỆ SINH THÁI MOVEO */}
      <MoveoEcosystem />

      {/* WEBSITE GIÚP GÌ CHO KHÁCH HÀNG */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-wider text-red-500">
                Kết nối & hỗ trợ
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Thuận tiện hơn trong quá trình tìm hiểu xe Mitsubishi
              </h2>

              <p className="mt-5 leading-8 text-gray-300">
                Website được xây dựng như một kênh thông tin và kết nối,
                giúp khách hàng chủ động tìm hiểu sản phẩm trước khi đưa ra
                lựa chọn phù hợp với nhu cầu sử dụng.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
  { label: "Tìm hiểu các dòng xe", href: "/#san-pham" },
  { label: "Tham khảo giá & chi phí", href: "/du-toan/gia-lan-banh" },
{ label: "Dự tính phương án trả góp", href: "/du-toan/tra-gop" },
  { label: "Theo dõi thông tin & ưu đãi", href: "/tin-tuc" },
  { label: "Đăng ký lái thử", href: "/dang-ky-lai-thu" },
  { label: "Kết nối tư vấn trực tiếp", href: "https://zalo.me/0858678929" },
].map((item) => (
                <a
  key={item.label}
  href={item.href}
  className="rounded-lg border border-gray-700 bg-gray-900 p-4 font-semibold transition hover:border-red-500 hover:bg-gray-800"
>
  {item.label}
</a>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* ĐỊA ĐIỂM & LIÊN HỆ */}
      <MoveoLocation />

      {/* CTA CUỐI TRANG */}
      <section className="bg-red-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-red-100">
              Kết nối trực tiếp
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Bạn đang quan tâm xe Mitsubishi?
            </h2>

            <p className="mt-2 max-w-2xl text-red-100">
              Đăng ký lái thử hoặc kết nối trực tiếp để được hỗ trợ thông tin
              sản phẩm và phương án phù hợp tại Mitsubishi Motors – Moveo
              New City.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/dang-ky-lai-thu"
              className="rounded-lg bg-white px-6 py-3 font-bold text-red-600 transition hover:bg-gray-100"
            >
              Đăng ký lái thử
            </a>

            <a
              href={siteConfig.contact.zaloUrl}
              className="rounded-lg border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-red-600"
            >
              Liên hệ Zalo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}