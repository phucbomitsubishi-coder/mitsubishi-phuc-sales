import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <p className="font-semibold uppercase tracking-widest text-red-500">
            Mitsubishi Motors
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Mitsubishi Bình Dương
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Đồng hành cùng khách hàng trong quá trình tìm hiểu, lựa chọn và
            sở hữu các dòng xe Mitsubishi phù hợp với nhu cầu sử dụng.
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
              Tư vấn qua Zalo
            </a>
          </div>
        </div>
      </section>

      {/* GIỚI THIỆU */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Về chúng tôi
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Hỗ trợ khách hàng lựa chọn xe Mitsubishi
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Website cung cấp thông tin về các dòng xe Mitsubishi, giá tham
              khảo, chương trình ưu đãi, dự toán chi phí và những nội dung tư
              vấn cần thiết trong quá trình tìm hiểu xe.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Khách hàng có thể tham khảo thông tin trực tuyến, yêu cầu báo giá,
              đăng ký lái thử và liên hệ trực tiếp để được hỗ trợ theo nhu cầu
              thực tế.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-100 p-8">
            <h3 className="text-2xl font-bold">
              Hỗ trợ khách hàng
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-bold text-red-600">
                  Tư vấn lựa chọn xe
                </h4>
                <p className="mt-1 text-gray-600">
                  Tham khảo dòng xe và phiên bản phù hợp với nhu cầu sử dụng.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-red-600">
                  Báo giá & chi phí
                </h4>
                <p className="mt-1 text-gray-600">
                  Hỗ trợ tham khảo giá xe, chi phí lăn bánh và phương án trả góp.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-red-600">
                  Đăng ký lái thử
                </h4>
                <p className="mt-1 text-gray-600">
                  Đăng ký trải nghiệm thực tế mẫu xe Mitsubishi đang quan tâm.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-red-600">
                  Hỗ trợ sau bán hàng
                </h4>
                <p className="mt-1 text-gray-600">
                  Cung cấp thông tin tham khảo về bảo hành, bảo dưỡng và sử dụng
                  xe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAM KẾT */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Giá trị hướng tới
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Thông tin rõ ràng – Tư vấn thuận tiện – Hỗ trợ nhanh chóng
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-7 shadow-sm">
              <div className="text-3xl font-bold text-red-600">01</div>
              <h3 className="mt-4 text-xl font-bold">
                Thông tin dễ tham khảo
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Tổng hợp thông tin xe, phiên bản, giá tham khảo và các nội dung
                cần thiết giúp khách hàng dễ dàng tìm hiểu.
              </p>
            </div>

            <div className="rounded-xl bg-white p-7 shadow-sm">
              <div className="text-3xl font-bold text-red-600">02</div>
              <h3 className="mt-4 text-xl font-bold">
                Tư vấn theo nhu cầu
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Tiếp nhận nhu cầu thực tế để hỗ trợ khách hàng tham khảo mẫu xe
                và phương án phù hợp.
              </p>
            </div>

            <div className="rounded-xl bg-white p-7 shadow-sm">
              <div className="text-3xl font-bold text-red-600">03</div>
              <h3 className="mt-4 text-xl font-bold">
                Kết nối thuận tiện
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Khách hàng có thể liên hệ, yêu cầu báo giá hoặc đăng ký lái thử
                trực tiếp từ website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA CUỐI TRANG */}
      <section className="bg-red-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Bạn đang quan tâm xe Mitsubishi?
            </h2>

            <p className="mt-2 text-red-100">
              Đăng ký lái thử hoặc liên hệ để được hỗ trợ thông tin phù hợp.
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