import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { siteConfig } from "@/config/site";
import { cars } from "@/data/cars";
import { usedCars } from "@/data/usedCars";
import { currentPromotion } from "@/data/promotions";
import { plateFeeByArea } from "@/data/registrationFees";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

export const metadata: Metadata = createPageMetadata({
  title: "Câu hỏi thường gặp khi mua xe Mitsubishi: giá, trả góp, bảo hành | Lưu Hoàng Phúc",
  description:
    "Giải đáp nhanh: giá xe Mitsubishi bao nhiêu, lăn bánh gồm những khoản nào, trả trước bao nhiêu khi mua trả góp, bảo hành mấy năm, bao lâu bảo dưỡng một lần.",
  path: "/ho-tro/cau-hoi-thuong-gap",
});

// Số liệu bảo hành, bảo dưỡng đã đối chiếu mitsubishi-motors.com.vn (10/2026).
// Giá, ưu đãi, số xe cũ lấy tự động từ src/data nên câu trả lời tự cập nhật.
const allVariants = cars.flatMap((car) => car.variants.map((variant) => ({ car, variant })));
const cheapest = allVariants.reduce((min, item) => (item.variant.price < min.variant.price ? item : min), allVariants[0]);
const priciest = allVariants.reduce((max, item) => (item.variant.price > max.variant.price ? item : max), allVariants[0]);
const maxPromotion = Math.max(
  0,
  ...currentPromotion.cars.flatMap((car) =>
    car.variants.map((variant) => variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0))
  )
);
const availableUsedCars = usedCars.filter((car) => car.status === "available").length;
const variantLabel = (item: typeof cheapest) =>
  item.car.name.endsWith(item.variant.name) ? item.car.name : `${item.car.name} ${item.variant.name}`;

type FaqItem = { question: string; answer: string; link?: { href: string; label: string } };

const faqGroups: { title: string; items: FaqItem[] }[] = [
  {
    title: "Giá xe & lăn bánh",
    items: [
      {
        question: "Giá xe Mitsubishi hiện nay bao nhiêu?",
        answer: `Tháng ${promotionMonthLabel}, giá niêm yết xe Mitsubishi từ ${formatMillion(cheapest.variant.price)} đồng (${variantLabel(cheapest)}) đến ${formatMillion(priciest.variant.price)} đồng (${variantLabel(priciest)}). Giá niêm yết do Mitsubishi Motors Việt Nam công bố, đã gồm VAT.`,
        link: { href: "/bang-gia-xe-mitsubishi", label: "Xem bảng giá tất cả phiên bản" },
      },
      {
        question: "Giá lăn bánh gồm những khoản nào?",
        answer:
          "Giá lăn bánh = giá xe + lệ phí trước bạ (10% tại TP.HCM, 10–12% tùy tỉnh) + lệ phí đăng ký biển số + phí đăng kiểm + phí đường bộ 12 tháng + bảo hiểm trách nhiệm dân sự bắt buộc. Xe bán tải Triton chỉ chịu 60% mức trước bạ.",
        link: { href: "/tu-van/chi-phi-lan-banh-mitsubishi", label: "Xem cách tính chi tiết và ví dụ" },
      },
      {
        question: "Đăng ký xe ở Bình Dương cũ thì biển số bao nhiêu tiền?",
        answer: `Bình Dương cũ nay thuộc TP. Hồ Chí Minh nên lệ phí đăng ký và biển số xe con là ${formatMillion(plateFeeByArea.car.I)} đồng, bằng mức của TP.HCM (Thông tư 155/2025/TT-BTC). Các tỉnh, thành khác ngoài Hà Nội và TP.HCM là ${plateFeeByArea.car.II.toLocaleString("vi-VN")} đồng.`,
      },
      {
        question: "Giá trên website có phải giá cuối cùng không?",
        answer:
          "Giá niêm yết trên website là giá của Mitsubishi Motors Việt Nam. Giá lăn bánh là số tạm tính theo quy định hiện hành, chưa gồm các khoản tùy chọn như bảo hiểm thân vỏ, phụ kiện. Ưu đãi thay đổi theo tháng, nên trước khi đặt cọc bạn nên nhận báo giá chi tiết bằng văn bản.",
        link: { href: "/du-toan/gia-lan-banh", label: "Tự tính giá lăn bánh theo nơi đăng ký" },
      },
    ],
  },
  {
    title: "Khuyến mãi",
    items: [
      {
        question: "Mitsubishi đang có khuyến mãi gì?",
        answer: `Chương trình tháng ${promotionMonthLabel} có ưu đãi đến ${formatMillion(maxPromotion)} đồng tùy phiên bản, gồm hỗ trợ tương đương lệ phí trước bạ, phiếu nhiên liệu hoặc quà tặng. Mức ưu đãi khác nhau giữa các phiên bản và thay đổi mỗi tháng.`,
        link: { href: "/bang-gia-xe-mitsubishi", label: "Xem ưu đãi từng phiên bản" },
      },
      {
        question: "Ưu đãi “hỗ trợ lệ phí trước bạ” có được nhận tiền mặt không?",
        answer:
          "Không. Đây là khoản hỗ trợ có giá trị tương đương lệ phí trước bạ theo chương trình của hãng, không phải tiền mặt. Cách áp dụng cụ thể được ghi trong báo giá và hợp đồng mua bán.",
      },
    ],
  },
  {
    title: "Mua xe trả góp",
    items: [
      {
        question: "Mua trả góp cần trả trước bao nhiêu?",
        answer:
          "Công cụ trên website cho thử mức trả trước từ 20% đến 70% giá xe, thời hạn vay 1–8 năm. Mức tối thiểu thực tế do ngân hàng quyết định theo hồ sơ. Lưu ý: ngoài phần trả trước, bạn cần chuẩn bị thêm toàn bộ phí lăn bánh vì ngân hàng thường chỉ cho vay trên giá xe.",
        link: { href: "/du-toan/tra-gop", label: "Tính số tiền trả hằng tháng" },
      },
      {
        question: "Hồ sơ vay mua xe gồm những gì?",
        answer:
          "Với cá nhân, hồ sơ thường gồm: căn cước công dân, giấy tờ về tình trạng hôn nhân, giấy tờ chứng minh thu nhập (hợp đồng lao động và sao kê lương, hoặc giấy phép kinh doanh). Mỗi ngân hàng có yêu cầu riêng, Phúc sẽ gửi danh sách cụ thể khi bạn chọn ngân hàng.",
      },
      {
        question: "Lãi suất trên công cụ trả góp có phải lãi suất của ngân hàng không?",
        answer:
          "Không. Lãi suất trên công cụ do bạn tự nhập để tham khảo. Lãi suất thực tế do ngân hàng xét duyệt theo hồ sơ và thời điểm vay; thường có giai đoạn ưu đãi đầu kỳ rồi thả nổi, nên hỏi rõ lãi suất sau giai đoạn ưu đãi.",
      },
    ],
  },
  {
    title: "Bảo hành & bảo dưỡng",
    items: [
      {
        question: "Xe Mitsubishi được bảo hành bao lâu?",
        answer:
          "Triton và Destinator: 5 năm hoặc 150.000 km. Các mẫu xe còn lại: 3 năm hoặc 100.000 km. Ắc-quy nguyên bản: 12 tháng hoặc 20.000 km. Tính theo điều kiện nào đến trước, kể từ ngày bàn giao xe.",
        link: { href: "/ho-tro/chinh-sach-bao-hanh", label: "Xem chính sách bảo hành" },
      },
      {
        question: "Bao lâu bảo dưỡng xe Mitsubishi một lần?",
        answer:
          "Mỗi 5.000 km hoặc 3 tháng, tùy điều kiện nào đến trước. Riêng Triton dùng động cơ 4N16 là mỗi 10.000 km hoặc 6 tháng.",
        link: { href: "/ho-tro/bao-duong-dinh-ky", label: "Xem lịch bảo dưỡng" },
      },
      {
        question: "Bảo hành, bảo dưỡng ở đâu?",
        answer:
          "Tại bất kỳ nhà phân phối ủy quyền nào của Mitsubishi Motors Việt Nam trên toàn quốc, không bắt buộc phải quay lại nơi mua xe.",
      },
      {
        question: "Lốp, má phanh có được bảo hành không?",
        answer:
          "Các chi tiết hao mòn như má phanh, lưỡi gạt mưa, lọc gió, lọc dầu không thuộc bảo hành của Mitsubishi. Lốp xe do nhà sản xuất lốp bảo hành theo chính sách riêng.",
      },
    ],
  },
  {
    title: "Lái thử & nhận xe",
    items: [
      {
        question: "Có lái thử tại nhà được không?",
        answer: `Được. Trong khu vực ${siteConfig.dealer.salesArea}, Phúc có thể mang xe đến tận nhà để bạn lái thử, tùy lịch xe lái thử. Bạn cũng có thể lái thử tại showroom ${siteConfig.dealer.name}.`,
        link: { href: "/dang-ky-lai-thu?nguon=FAQ", label: "Đăng ký lái thử" },
      },
      {
        question: "Đặt cọc bao lâu thì nhận được xe?",
        answer:
          "Tùy phiên bản và màu xe có sẵn tại đại lý hay phải chờ hãng phân bổ. Khi báo giá, Phúc sẽ kiểm tra tình trạng xe và báo thời gian giao dự kiến trước khi bạn đặt cọc.",
      },
    ],
  },
  {
    title: "Xe đã qua sử dụng",
    items: [
      {
        question: "Website có bán xe Mitsubishi đã qua sử dụng không?",
        answer: `Có. Hiện có ${availableUsedCars} xe đang bán, mỗi xe ghi rõ năm sản xuất, số km, phiên bản, màu, giá và hình ảnh thực tế.`,
        link: { href: "/xe-cu", label: "Xem xe đã qua sử dụng" },
      },
      {
        question: "Mua xe cũ nên kiểm tra những gì?",
        answer:
          "Nên xem trực tiếp xe, kiểm tra giấy tờ đăng ký và lịch sử bảo dưỡng, lái thử, và đối chiếu số km với sổ bảo dưỡng. Những cam kết cụ thể của từng xe được ghi trong trang chi tiết xe.",
      },
    ],
  },
];

export default function FAQPage() {
  const { sales, dealer, contact } = siteConfig;

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/ho-tro/cau-hoi-thuong-gap"
        parents={[{ name: "Hỗ trợ", path: "/ho-tro" }]}
        name="Câu hỏi thường gặp"
        type="WebPage"
        dateModified="2026-10-07"
      />
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
                        <p className="leading-7 text-gray-700">
                          {item.answer}
                        </p>
                        {item.link && (
                          <Link
                            href={item.link.href}
                            className="mt-3 inline-block font-semibold text-red-700 underline hover:text-red-800"
                          >
                            {item.link.label} →
                          </Link>
                        )}
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