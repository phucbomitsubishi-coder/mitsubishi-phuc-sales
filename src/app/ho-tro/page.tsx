import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = createPageMetadata({
  title: "Hỗ trợ khách hàng Mitsubishi",
  description:
    "Thông tin bảo hành, bảo dưỡng định kỳ, phụ tùng chính hãng, hướng dẫn sử dụng và giải đáp các câu hỏi thường gặp dành cho khách hàng Mitsubishi.",
  path: "/ho-tro",
});

const supportItems = [
  {
    title: "Chính sách bảo hành",
    description:
      "Tra cứu thời hạn, phạm vi và các điều kiện bảo hành dành cho xe Mitsubishi.",
    href: "/ho-tro/chinh-sach-bao-hanh",
    number: "01",
  },
  {
    title: "Bảo dưỡng định kỳ",
    description:
      "Tham khảo các mốc bảo dưỡng giúp xe vận hành ổn định, bền bỉ và an toàn.",
    href: "/ho-tro/bao-duong-dinh-ky",
    number: "02",
  },
  {
    title: "Phụ tùng chính hãng",
    description:
      "Thông tin về phụ tùng Mitsubishi chính hãng và lợi ích khi sử dụng đúng tiêu chuẩn.",
    href: "/ho-tro/phu-tung-chinh-hang",
    number: "03",
  },
  {
    title: "Hướng dẫn sử dụng",
    description:
      "Các thông tin hữu ích giúp khách hàng sử dụng và chăm sóc xe Mitsubishi thuận tiện hơn.",
    href: "/ho-tro/huong-dan-su-dung",
    number: "04",
  },
  {
    title: "Câu hỏi thường gặp",
    description:
      "Giải đáp nhanh những vấn đề khách hàng thường quan tâm trong quá trình mua và sử dụng xe.",
    href: "/ho-tro/cau-hoi-thuong-gap",
    number: "05",
  },
];

export default function SupportPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
              Hỗ trợ khách hàng
            </p>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Đồng hành cùng bạn trong suốt hành trình sử dụng xe Mitsubishi
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Tổng hợp các thông tin hữu ích về bảo hành, bảo dưỡng, phụ tùng,
              hướng dẫn sử dụng và những câu hỏi thường gặp dành cho khách hàng
              Mitsubishi.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-red-600">
                Trung tâm hỗ trợ
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950 md:text-3xl">
                Bạn cần hỗ trợ nội dung nào?
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {supportItems.map((item) => (
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
                    Xem chi tiết →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-100">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="rounded-2xl bg-neutral-950 px-7 py-9 text-white md:flex md:items-center md:justify-between md:px-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-500">
                  Cần hỗ trợ thêm?
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Liên hệ tư vấn Mitsubishi
                </h2>

                <p className="mt-2 text-neutral-300">
                  Gửi yêu cầu để được hỗ trợ nhanh về xe, giá bán và các dịch vụ
                  liên quan.
                </p>
              </div>

              <Link
                href="/?nguon=Ho-tro#bao-gia"
                className="mt-6 inline-flex rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 md:mt-0"
              >
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}