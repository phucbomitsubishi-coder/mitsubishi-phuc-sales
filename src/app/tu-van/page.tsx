import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Tư vấn mua xe Mitsubishi",
  description:
    "Thông tin tư vấn giúp khách hàng chọn mẫu xe Mitsubishi phù hợp, lựa chọn phiên bản, tham khảo chi phí lăn bánh và nhận báo giá.",
      alternates: {
    canonical: "/tu-van",
  },
};

const advisoryItems = [
  {
    number: "01",
    title: "Chọn xe Mitsubishi phù hợp",
    description:
      "Gợi ý lựa chọn mẫu xe theo nhu cầu gia đình, công việc, số chỗ ngồi và mục đích sử dụng.",
    href: "/tu-van/chon-xe-mitsubishi-phu-hop",
  },
  {
    number: "02",
    title: "Chọn phiên bản xe Mitsubishi",
    description:
      "So sánh và tham khảo các phiên bản để lựa chọn trang bị và mức giá phù hợp với nhu cầu.",
    href: "/tu-van/chon-phien-ban-xe-mitsubishi",
  },
  {
    number: "03",
    title: "Chi phí lăn bánh Mitsubishi",
    description:
      "Tìm hiểu các khoản chi phí cần chuẩn bị khi mua xe và tham khảo tổng chi phí lăn bánh.",
    href: "/tu-van/chi-phi-lan-banh-mitsubishi",
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
              Tư vấn mua xe Mitsubishi
            </p>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Chọn đúng mẫu xe, đúng phiên bản và chủ động chi phí
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Những nội dung tư vấn giúp bạn dễ dàng xác định mẫu xe phù hợp,
              lựa chọn phiên bản và dự tính ngân sách trước khi quyết định mua
              xe Mitsubishi.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#bao-gia"
                className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Nhận báo giá
              </Link>

              <Link
                href="/dang-ky-lai-thu?nguon=Tu-van"
                className="rounded-lg border border-neutral-600 px-6 py-3 font-bold text-white transition hover:border-white"
              >
                Đăng ký lái thử
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">
                Hướng dẫn lựa chọn
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950 md:text-3xl">
                Bắt đầu từ nhu cầu của bạn
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-neutral-600">
                Tham khảo lần lượt các nội dung dưới đây để rút ngắn quá trình
                lựa chọn và xác định ngân sách mua xe.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {advisoryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-red-600">
                      {item.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-lg text-neutral-900 transition group-hover:bg-red-600 group-hover:text-white">
                      →
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-neutral-600">
                    {item.description}
                  </p>

                  <p className="mt-6 text-sm font-bold text-red-600">
                    Xem tư vấn →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-100">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-5 md:grid-cols-2">
              <Link
                href="/du-toan/gia-lan-banh"
                className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <p className="text-sm font-bold uppercase text-red-600">
                  Công cụ dự toán
                </p>

                <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                  Tính giá lăn bánh
                </h2>

                <p className="mt-3 leading-7 text-neutral-600">
                  Chọn mẫu xe và phiên bản để tham khảo chi phí lăn bánh cùng
                  chương trình ưu đãi hiện có.
                </p>

                <p className="mt-5 font-bold text-red-600">
                  Tính ngay →
                </p>
              </Link>

              <Link
                href="/du-toan/tra-gop"
                className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <p className="text-sm font-bold uppercase text-red-600">
                  Kế hoạch tài chính
                </p>

                <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                  Dự tính trả góp
                </h2>

                <p className="mt-3 leading-7 text-neutral-600">
                  Tham khảo khoản trả trước, số tiền vay và lịch thanh toán để
                  chủ động kế hoạch tài chính.
                </p>

                <p className="mt-5 font-bold text-red-600">
                  Dự tính ngay →
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="rounded-2xl bg-neutral-950 px-7 py-9 text-white md:flex md:items-center md:justify-between md:px-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-500">
                  Cần tư vấn trực tiếp?
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Nhận tư vấn xe Mitsubishi
                </h2>

                <p className="mt-2 max-w-2xl text-neutral-300">
                  Gửi thông tin mẫu xe bạn quan tâm để được hỗ trợ về phiên bản,
                  giá bán, ưu đãi và phương án mua xe.
                </p>
              </div>

              <Link
                href="/#bao-gia"
                className="mt-6 inline-flex rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 md:mt-0"
              >
                Nhận tư vấn ngay
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}