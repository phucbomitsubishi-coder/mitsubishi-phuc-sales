import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Chính sách bảo mật thông tin | Lưu Hoàng Phúc",
  description:
    "Chính sách thu thập, sử dụng và bảo vệ thông tin cá nhân khi khách hàng gửi yêu cầu báo giá hoặc đăng ký lái thử xe Mitsubishi trên website.",
  path: "/chinh-sach-bao-mat",
});

// Cập nhật ngày này mỗi khi sửa nội dung chính sách
const lastUpdated = "06/10/2026";

export default function PrivacyPolicyPage() {
  const { sales, dealer, contact } = siteConfig;

  const sections = [
    {
      heading: "1. Thông tin được thu thập",
      paragraphs: [
        "Website chỉ thu thập thông tin khi bạn chủ động gửi biểu mẫu Nhận báo giá hoặc Đăng ký lái thử, gồm: họ và tên, số điện thoại, mẫu xe và phiên bản quan tâm, ghi chú bạn tự nhập (ví dụ thời gian hoặc địa chỉ lái thử tại nhà).",
        "Website không yêu cầu tài khoản, không thu thập số CMND/CCCD, thông tin ngân hàng hay thẻ thanh toán, và không dùng cookie quảng cáo hay công cụ theo dõi hành vi.",
      ],
    },
    {
      heading: "2. Mục đích sử dụng",
      paragraphs: [
        "Thông tin chỉ được dùng để liên hệ tư vấn, gửi báo giá, sắp xếp lịch lái thử và hỗ trợ thủ tục mua xe theo đúng yêu cầu bạn đã gửi.",
        "Thông tin không được bán, cho thuê hay trao đổi với bên thứ ba vì mục đích quảng cáo.",
      ],
    },
    {
      heading: "3. Lưu trữ và chia sẻ",
      paragraphs: [
        "Dữ liệu biểu mẫu được lưu trên dịch vụ Google (Google Apps Script và Google Sheets) do người tư vấn quản lý, có bảo vệ bằng tài khoản và mật khẩu.",
        `Khi bạn đồng ý mua xe, đăng ký lái thử tại showroom hoặc làm hồ sơ trả góp, thông tin cần thiết sẽ được chuyển cho ${dealer.name}, ngân hàng hoặc công ty bảo hiểm mà bạn lựa chọn để hoàn tất thủ tục.`,
        "Thông tin được lưu trong thời gian cần thiết để tư vấn và chăm sóc khách hàng, và sẽ được xóa khi bạn yêu cầu.",
      ],
    },
    {
      heading: "4. Quyền của khách hàng",
      paragraphs: [
        "Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, bạn có quyền yêu cầu xem, chỉnh sửa, xóa thông tin của mình hoặc rút lại sự đồng ý, ngừng nhận liên hệ tư vấn bất cứ lúc nào.",
        "Để thực hiện, bạn chỉ cần liên hệ qua điện thoại, Zalo hoặc email bên dưới. Yêu cầu sẽ được xử lý trong vòng 72 giờ.",
      ],
    },
    {
      heading: "5. Liên kết bên ngoài",
      paragraphs: [
        "Website có liên kết tới Zalo, Facebook, TikTok, Google Maps và website của Mitsubishi Motors Việt Nam. Các trang này áp dụng chính sách bảo mật riêng của từng nơi.",
      ],
    },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Hero */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Chính sách
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Chính sách bảo mật thông tin
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Website này là website cá nhân của {sales.name}, Tư vấn Kinh
              doanh tại {dealer.name}. Trang này giải thích thông tin nào được
              thu thập khi bạn gửi biểu mẫu và cách thông tin đó được sử dụng.
            </p>

            <p className="mt-3 text-sm text-gray-400">
              Cập nhật lần cuối: {lastUpdated}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-3 leading-7 text-gray-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-bold">6. Liên hệ về dữ liệu cá nhân</h2>

              <div className="mt-4 space-y-2 leading-7 text-gray-700">
                <p>
                  Người chịu trách nhiệm:{" "}
                  <span className="font-semibold text-gray-900">{sales.name}</span>
                </p>
                <p>
                  Điện thoại / Zalo:{" "}
                  <a href={contact.phoneUrl} className="font-semibold text-red-700 hover:underline">
                    {sales.phoneDisplay}
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href={contact.emailUrl} className="break-all font-semibold text-red-700 hover:underline">
                    {sales.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
