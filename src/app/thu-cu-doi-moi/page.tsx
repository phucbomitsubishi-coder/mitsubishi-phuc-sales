import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import TradeInForm from "@/components/TradeInForm";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Thu cũ đổi mới: định giá xe cũ, lên đời xe Mitsubishi",
  description:
    "Gửi thông tin xe đang sử dụng để nhận báo giá thu sơ bộ và báo giá xe Mitsubishi mới. Tiền thu xe cũ được cấn trừ khi mua Destinator, Xforce, Xpander, Triton.",
  path: "/thu-cu-doi-moi",
});

const steps = [
  {
    title: "Gửi thông tin xe đang đi",
    text: "Hãng, dòng xe, năm sản xuất, số km. Có thể gửi thêm ảnh xe qua Zalo để báo giá sát hơn.",
  },
  {
    title: "Nhận báo giá thu sơ bộ",
    text: "Phúc liên hệ báo mức giá thu tham khảo cùng báo giá lăn bánh xe Mitsubishi bạn muốn đổi, đã trừ ưu đãi tháng.",
  },
  {
    title: "Kiểm tra xe thực tế",
    text: "Xe được kiểm tra tình trạng và giấy tờ tại showroom. Giá thu chính thức chốt sau bước này.",
  },
  {
    title: "Cấn trừ và nhận xe mới",
    text: "Tiền thu xe cũ được cấn trừ vào khoản thanh toán xe mới. Bạn có thể kết hợp mua trả góp cho phần còn lại.",
  },
];

const documents = [
  "Giấy đăng ký xe (cà vẹt) bản gốc",
  "Căn cước công dân của chủ xe",
  "Giấy chứng nhận kiểm định (đăng kiểm) còn hiệu lực",
  "Nếu xe đang thế chấp ngân hàng: thông tin khoản vay để làm thủ tục giải chấp",
];

export default function TradeInPage() {
  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/thu-cu-doi-moi"
        name="Thu cũ đổi mới"
        type="WebPage"
        datePublished="2026-10-12"
        dateModified="2026-10-12"
      />
      <SiteHeader />

      <main className="bg-gray-50 text-gray-900">
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Thu cũ đổi mới
            </p>
            <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl tracking-tight">
              Định giá xe cũ, lên đời xe Mitsubishi mới
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Gửi thông tin chiếc xe bạn đang đi để nhận báo giá thu sơ bộ. Số tiền thu xe
              cũ được cấn trừ khi mua xe Mitsubishi mới.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="bg-white p-6 shadow-lg sm:p-10">
            <h2 className="mb-6 text-2xl font-black tracking-tight">Thông tin xe của bạn</h2>
            <TradeInForm />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-12">
          <h2 className="text-2xl font-black md:text-3xl tracking-tight">Quy trình thu cũ đổi mới</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-red-600 font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold">{step.title}</p>
                  <p className="mt-1 leading-7 text-gray-700">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-2xl font-black md:text-3xl tracking-tight">Giấy tờ cần chuẩn bị</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700">
            {documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-black md:text-3xl tracking-tight">Lưu ý về giá thu</h2>
          <div className="mt-4 space-y-3 leading-7 text-gray-700">
            <p>
              Giá thu phụ thuộc đời xe, số km, tình trạng thân vỏ, máy móc, lịch sử bảo dưỡng
              và giá thị trường tại thời điểm bán. Báo giá qua điện thoại hoặc Zalo là mức
              tham khảo; giá chính thức được chốt sau khi kiểm tra xe thực tế.
            </p>
            <p>
              Bạn có thể tham khảo giá xe mới tại{" "}
              <Link href="/bang-gia-xe-mitsubishi" className="font-semibold text-red-700 underline hover:text-red-800">
                bảng giá xe Mitsubishi
              </Link>{" "}
              và tính trước khoản vay cho phần còn lại tại{" "}
              <Link href="/du-toan/tra-gop" className="font-semibold text-red-700 underline hover:text-red-800">
                công cụ tính trả góp
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 bg-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-black tracking-tight">Gửi ảnh xe để báo giá nhanh hơn</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Chụp 4 góc xe, nội thất, đồng hồ số km và gửi qua Zalo cho Phúc.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-blue-700"
              >
                Gửi ảnh qua Zalo
              </a>
              <a
                href={siteConfig.contact.phoneUrl}
                className="rounded bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Gọi {siteConfig.sales.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
