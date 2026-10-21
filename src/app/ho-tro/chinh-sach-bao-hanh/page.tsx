import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Chính sách bảo hành Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Thông tin tham khảo về chính sách bảo hành xe Mitsubishi, thời hạn bảo hành và hỗ trợ khách hàng tại Mitsubishi Moveo New City.",
  path: "/ho-tro/chinh-sach-bao-hanh",
});

export default function WarrantyPage() {
  const { sales, dealer, contact } = siteConfig;

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Hero */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8">
            <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Dịch vụ
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Chính sách bảo hành Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Thông tin tóm tắt giúp khách hàng dễ dàng tham khảo thời hạn
              và một số điều kiện bảo hành xe Mitsubishi tại Việt Nam.
            </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-4 border-red-600">
              <Image
                src="/images/about/xuong-dich-vu.jpg"
                alt="Kỹ thuật viên kiểm tra khoang máy tại xưởng dịch vụ Mitsubishi Moveo"
                fill
                preload
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Warranty periods */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black md:text-3xl">
            Thời hạn bảo hành xe mới
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <div className="border-x border-b border-t-4 border-gray-200 border-t-gray-950 p-6">
              <p className="text-sm font-semibold uppercase text-red-600">
                All-New Triton & Destinator
              </p>

              <p className="mt-3 text-3xl font-bold">
                60 tháng
              </p>

              <p className="mt-2 text-gray-600">
                hoặc 150.000 km
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Tùy điều kiện nào đến trước.
              </p>
            </div>

            <div className="border-x border-b border-t-4 border-gray-200 border-t-gray-950 p-6">
              <p className="text-sm font-semibold uppercase text-red-600">
                Các mẫu xe Mitsubishi khác
              </p>

              <p className="mt-3 text-3xl font-bold">
                36 tháng
              </p>

              <p className="mt-2 text-gray-600">
                hoặc 100.000 km
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Tùy điều kiện nào đến trước.
              </p>
            </div>

            <div className="border-x border-b border-t-4 border-gray-200 border-t-gray-950 p-6">
              <p className="text-sm font-semibold uppercase text-red-600">
                Ắc-quy nguyên bản
              </p>

              <p className="mt-3 text-3xl font-bold">
                12 tháng
              </p>

              <p className="mt-2 text-gray-600">
                hoặc 20.000 km
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Tùy điều kiện nào đến trước.
              </p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-red-600 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
            Thời gian bảo hành được tính từ thời điểm xe mới được giao
            cho người mua đầu tiên theo Biên Bản Bàn Giao Xe.
          </div>
        </section>

        {/* Bảo hành mở rộng */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/ho-tro/bao-hanh-mo-rong"
            className="group grid gap-4 bg-neutral-950 p-7 text-white transition hover:bg-neutral-900 md:grid-cols-[1fr_auto] md:items-center md:p-9"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-red-500">Sau 3 năm</span>
              <span className="mt-2 block text-2xl font-black md:text-3xl">Bảo hành mở rộng thêm 1 hoặc 2 năm</span>
              <span className="mt-2 block leading-7 text-gray-300">
                Nâng tổng thời gian bảo hành lên tới 5 năm hoặc 150.000 km. Xem gói Cơ bản, Cao cấp, giá từng dòng xe và điều kiện mua.
              </span>
            </span>
            <span className="w-fit border border-white/60 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition group-hover:bg-white group-hover:text-gray-950">
              Xem chi tiết
            </span>
          </Link>
        </section>

        {/* Covered */}
        <section className="bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">
                Phạm vi bảo hành
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Theo chính sách của Mitsubishi Motors Việt Nam, những
                chi tiết thuộc phạm vi bảo hành nếu được xác định hư hỏng
                trong điều kiện sử dụng và bảo dưỡng bình thường, đồng
                thời còn trong thời hạn bảo hành, sẽ được xử lý theo
                chính sách bảo hành hiện hành tại hệ thống Nhà phân phối
                ủy quyền.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black md:text-3xl">
                Một số trường hợp không thuộc bảo hành
              </h2>

              <ul className="mt-4 space-y-3 text-gray-600">
                <li>• Các chi tiết hao mòn và hạng mục bảo dưỡng thông thường.</li>
                <li>• Một số vật tư, dầu mỡ, chất lỏng và nhiên liệu.</li>
                <li>• Hư hỏng do sử dụng hoặc bảo dưỡng không đúng cách.</li>
                <li>• Hư hỏng liên quan đến sửa đổi xe không phù hợp.</li>
                <li>• Hư hỏng do tai nạn, thiên tai hoặc tác động bên ngoài.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Official source */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold">
              Xem chính sách chính thức
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-gray-600">
              Nội dung trên được trình bày dưới dạng tóm tắt để thuận tiện
              tham khảo. Điều kiện và phạm vi áp dụng thực tế được xác định
              theo chính sách hiện hành của Mitsubishi Motors Việt Nam.
            </p>

            <a
              href="https://www.mitsubishi-motors.com.vn/dich-vu/chinh-sach-bao-hanh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex border-2 border-gray-900 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-gray-900 hover:text-white"
            >
              Xem chính sách Mitsubishi Motors Việt Nam
            </a>
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
                  Cần tư vấn thêm về bảo hành?
                </h2>

                <p className="mt-3 leading-7 text-gray-300">
                  Liên hệ {sales.name} tại {dealer.name} để được hỗ trợ
                  thông tin và hướng dẫn phù hợp.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  {dealer.address}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={contact.phoneUrl}
                  className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-red-700"
                >
                  Gọi {sales.phoneDisplay}
                </a>

                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-500 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  Mở Zalo
                </a>

                <Link
                  href="/"
                  className="border border-gray-600 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black"
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