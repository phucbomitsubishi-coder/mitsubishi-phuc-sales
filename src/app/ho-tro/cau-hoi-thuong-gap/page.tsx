import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Câu hỏi thường gặp | Mitsubishi Lưu Hoàng Phúc",
  description:
    "Giải đáp các câu hỏi thường gặp khi mua và sử dụng xe Mitsubishi: báo giá, khuyến mãi, trả góp, bảo hành, bảo dưỡng và xe đã qua sử dụng.",
  path: "/ho-tro/cau-hoi-thuong-gap",
});

const faqGroups = [
  {
    title: "Mua xe & báo giá",
    items: [
      {
        question: "Làm thế nào để nhận báo giá xe Mitsubishi?",
        answer:
          "Bạn có thể liên hệ trực tiếp Lưu Hoàng Phúc qua điện thoại hoặc Zalo. Khi yêu cầu báo giá, nên cung cấp mẫu xe, phiên bản và khu vực đăng ký để được tư vấn sát với nhu cầu.",
      },
      {
        question: "Giá xe trên website có phải giá cuối cùng không?",
        answer:
          "Giá và thông tin trên website mang tính tham khảo. Giá thực tế có thể thay đổi theo phiên bản, màu xe, chương trình bán hàng và thời điểm mua xe. Vui lòng liên hệ trực tiếp để nhận báo giá cập nhật.",
      },
      {
        question: "Website có hỗ trợ tính giá lăn bánh không?",
        answer:
          "Có. Bạn có thể sử dụng công cụ Dự toán giá lăn bánh trên website để tham khảo các khoản chi phí dự kiến trước khi mua xe.",
      },
    ],
  },
  {
    title: "Khuyến mãi & đặt xe",
    items: [
      {
        question: "Khuyến mãi Mitsubishi có thay đổi theo từng tháng không?",
        answer:
          "Chương trình bán hàng có thể thay đổi theo từng thời điểm, mẫu xe và phiên bản. Vì vậy, khách hàng nên kiểm tra thông tin cập nhật trước khi quyết định mua xe.",
      },
      {
        question: "Tôi có thể kiểm tra màu xe và tình trạng xe trước khi đặt không?",
        answer:
          "Có thể liên hệ trực tiếp để được hỗ trợ kiểm tra thông tin xe, phiên bản và màu sắc theo tình trạng thực tế tại thời điểm tư vấn.",
      },
    ],
  },
  {
    title: "Mua xe trả góp",
    items: [
      {
        question: "Website có công cụ dự toán trả góp không?",
        answer:
          "Có. Công cụ Dự toán trả góp giúp bạn tham khảo khoản vay, tiền trả trước và số tiền thanh toán dự kiến. Kết quả chỉ mang tính tham khảo; điều kiện thực tế phụ thuộc ngân hàng và hồ sơ khách hàng.",
      },
      {
        question: "Mua xe trả góp cần chuẩn bị những gì?",
        answer:
          "Hồ sơ cụ thể phụ thuộc ngân hàng và hình thức vay của cá nhân hoặc doanh nghiệp. Khi có nhu cầu, bạn có thể liên hệ để được hướng dẫn chuẩn bị hồ sơ phù hợp trước khi làm thủ tục.",
      },
      {
        question: "Lãi suất trên công cụ trả góp có phải lãi suất ngân hàng chính thức không?",
        answer:
          "Không. Các con số trên công cụ dự toán được sử dụng để tham khảo. Lãi suất và điều kiện tín dụng thực tế do ngân hàng hoặc tổ chức tài chính xác định tại thời điểm xét duyệt.",
      },
    ],
  },
  {
    title: "Bảo hành & bảo dưỡng",
    items: [
      {
        question: "Tôi có thể xem chính sách bảo hành Mitsubishi ở đâu?",
        answer:
          "Website có trang Chính sách bảo hành tóm tắt các thông tin chính và dẫn đến nguồn chính thức của Mitsubishi Motors Việt Nam để khách hàng kiểm tra điều kiện áp dụng hiện hành.",
      },
      {
        question: "Bao lâu nên bảo dưỡng xe Mitsubishi?",
        answer:
          "Chu kỳ bảo dưỡng phụ thuộc mẫu xe và hướng dẫn áp dụng cho xe. Website có trang Bảo dưỡng định kỳ để tham khảo; khi sử dụng thực tế, khách hàng nên tuân theo tài liệu hướng dẫn và khuyến nghị của Mitsubishi.",
      },
      {
        question: "Tôi có thể sử dụng phụ tùng chính hãng Mitsubishi không?",
        answer:
          "Có. Website có trang Phụ tùng chính hãng để tham khảo. Khi cần thay thế, nên xác định đúng mẫu xe, phiên bản và thông tin kỹ thuật để tra cứu phụ tùng phù hợp.",
      },
    ],
  },
  {
    title: "Xe đã qua sử dụng",
    items: [
      {
        question: "Website có bán xe Mitsubishi đã qua sử dụng không?",
        answer:
          "Có. Mục Xe đã qua sử dụng hiển thị các xe đang được đăng bán cùng thông tin như năm sản xuất, số km đã đi, phiên bản, màu xe và giá tham khảo.",
      },
      {
        question: "Xe đã bán có bị xóa khỏi website không?",
        answer:
          "Không nhất thiết. Một số xe đã bán được giữ lại trong mục Xe đã bán để khách hàng tham khảo thông tin và lịch sử các xe từng được đăng.",
      },
      {
        question: "Thông tin tình trạng xe cũ có thể kiểm tra lại không?",
        answer:
          "Khách hàng nên kiểm tra trực tiếp từng xe và các hồ sơ liên quan trước khi giao dịch. Những cam kết cụ thể được trình bày theo thông tin của từng xe đang đăng bán.",
      },
    ],
  },
];

export default function FAQPage() {
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
              Câu hỏi thường gặp
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Tổng hợp những câu hỏi thường gặp khi tìm hiểu, mua và sử
              dụng xe Mitsubishi.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-2xl font-bold">
                  {group.title}
                </h2>

                <div className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-gray-200 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                        <span>{item.question}</span>

                        <span className="text-xl text-red-600 transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-gray-100 px-5 py-5">
                        <p className="leading-7 text-gray-600">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">
              Thông tin hỗ trợ
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Link
                href="/ho-tro/chinh-sach-bao-hanh"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold transition hover:border-red-500"
              >
                Chính sách bảo hành →
              </Link>

              <Link
                href="/ho-tro/bao-duong-dinh-ky"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold transition hover:border-red-500"
              >
                Bảo dưỡng định kỳ →
              </Link>

              <Link
                href="/ho-tro/phu-tung-chinh-hang"
                className="rounded-xl border border-gray-200 bg-white p-5 font-semibold transition hover:border-red-500"
              >
                Phụ tùng chính hãng →
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
                  Chưa tìm thấy câu trả lời?
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Liên hệ trực tiếp để được hỗ trợ
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