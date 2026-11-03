import ZaloIcon from "@/components/ZaloIcon";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import TradeInForm from "@/components/TradeInForm";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Thu cũ đổi mới xe Mitsubishi: thẩm định miễn phí, MMV UCAR",
  description:
    "Thu cũ đổi mới tại Mitsubishi Moveo New City, nhà phân phối trong hệ thống MMV UCAR: thẩm định xe miễn phí, định giá minh bạch, bán cũ mua mới tại cùng một nơi. Khách đang dùng xe Mitsubishi có thêm phiếu dịch vụ 3 triệu đồng và lãi suất vay ưu đãi.",
  path: "/thu-cu-doi-moi",
});

// Quy trình theo chương trình Thu cũ đổi mới của MMV (MMV UCAR, mitsubishi-motors.com.vn, đọc 03/11/2026)
const steps = [
  {
    title: "Đăng ký",
    text: "Điền form trên trang này (hoặc trong ứng dụng Mitsubishi Connect+, mục Xe của tôi > Thu cũ đổi mới): thông tin liên hệ, xe đang đi và mẫu xe Mitsubishi mới bạn quan tâm. Phúc liên hệ trong vòng 24 giờ để tư vấn và hẹn lịch thẩm định.",
  },
  {
    title: "Thẩm định xe miễn phí",
    text: "Mang xe đến showroom Mitsubishi Moveo New City hoặc hẹn thẩm định tại nơi bạn tiện. Khoảng 30 phút với xe thông thường, khoảng 60 phút nếu cần thiết bị chuyên dụng.",
  },
  {
    title: "Nhận giá thu",
    text: "Báo giá thu mua trọn gói dựa trên tình trạng thực tế, kết quả thẩm định và mặt bằng giá thị trường. Phúc gửi kèm báo giá lăn bánh xe mới đã trừ ưu đãi tháng và lãi suất vay phù hợp.",
  },
  {
    title: "Cấn trừ và nhận xe mới",
    text: "Tiền thu xe cũ được cấn trừ vào khoản thanh toán xe mới, bán xe cũ và mua xe mới tại cùng một nơi. Phần còn lại có thể trả góp.",
  },
];

// Theo 3 trang MMV (đọc đủ ngày 03/11/2026): "Giới thiệu chương trình thu cũ – đổi mới" (n150033), "Chương trình xe qua
// sử dụng chính hãng – MMV UCAR" (n140453) và điều khoản "Nâng cấp hành trình, thăng hạng ưu đãi" (01/04/2026–31/03/2027).
// Lãi suất khách thân thiết theo công văn MMV Auto Finance 11/2026. Khi MMV đổi điều khoản thì sửa ở đây.
const services = [
  { title: "Kiểm tra và định giá miễn phí", text: "Thẩm định xe miễn phí tại showroom hoặc tại địa điểm bạn chọn. Khoảng 30 phút với xe thông thường, khoảng 60 phút nếu cần kiểm tra bằng thiết bị chuyên dụng tại xưởng." },
  { title: "Định giá minh bạch", text: "Giá dựa trên tình trạng thực tế và kết quả thẩm định, có tham chiếu mặt bằng giá thị trường. Bạn nắm rõ tình trạng xe và kết quả thẩm định trước khi quyết định bán." },
  { title: "Thu mua xe cũ linh hoạt", text: "Thu mua tại địa điểm thuận tiện cho bạn hoặc tại showroom. Có thể chỉ bán xe cũ, hoặc thu cũ đổi mới lên xe Mitsubishi mới." },
  { title: "Bán cũ, mua mới tại cùng một nơi", text: "Thẩm định, định giá, bán xe cũ và ký hợp đồng xe mới đều làm tại showroom, do nhân sự được MMV đào tạo về thẩm định và mua bán xe qua sử dụng thực hiện." },
];

const loyaltyTerms = [
  "Dành cho người đang hoặc đã từng sở hữu xe Mitsubishi (mua mới hay mua cũ đều được), kể cả người đã chuyển sang hãng khác rồi quay lại mua xe Mitsubishi mới.",
  "Đăng ký Chương trình Khách hàng thân thiết trên ứng dụng Mitsubishi Connect+, chọn \"Nâng cấp hành trình, Thăng hạng ưu đãi\" trước khi hợp đồng mua xe mới được ghi nhận (hoặc không quá 180 ngày sau khi mua), và mua xe mới trong vòng 6 tháng kể từ khi đăng ký.",
  "Quà: phiếu ưu đãi dịch vụ tổng giá trị 3.000.000 đồng (3.000 điểm trên Mitsubishi Connect+) cho mỗi xe mua thêm hoặc thay thế, gửi vào tài khoản sau khi bàn giao xe. Không quy đổi tiền mặt, chỉ dùng cho xe đã đăng ký nhận quà.",
  "Áp dụng từ 01/04/2026 đến 31/03/2027 trên toàn quốc, không áp dụng mua lô. Chương trình dừng khi tổng giá trị quà đã phát hết.",
  "Lãi suất vay ưu đãi cho khách hàng thân thiết (VPBank, theo chương trình Mitsubishi Auto Finance 11/2026): 7,6%/năm cố định 6 tháng, 9,2%/năm cố định 12 tháng; vay tối đa 85% giá xe (Triton 75%). Áp dụng theo điều kiện của ngân hàng.",
];

const cpoStandards = [
  "Không quá 5 năm kể từ ngày bắt đầu bảo hành xe mới, hoặc đi không quá 140.000 km",
  "Rõ nguồn gốc, không có lịch sử tai nạn nặng, thủy kích hay can thiệp đồng hồ km",
  "Đạt kiểm tra kỹ thuật 160 điểm, có lịch sử bảo dưỡng đầy đủ",
  "Bảo hành CPO 12 tháng hoặc 20.000 km (tùy điều kiện nào đến trước) cho bộ phận cơ khí bên trong động cơ, hộp số và hộp điều khiển (ECU, AT/CVT ECU), không gồm ly hợp và biến mô; áp dụng tại nhà phân phối Mitsubishi ủy quyền trên toàn quốc",
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
        dateModified="2026-11-03"
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
              {siteConfig.dealer.name} là nhà phân phối trong hệ thống <strong className="text-white">MMV UCAR</strong>,
              chương trình xe qua sử dụng chính hãng của Mitsubishi Motors Việt Nam. Bán xe cũ và mua xe mới
              tại cùng một nơi, thẩm định miễn phí, tiền thu xe cũ được cấn trừ khi mua xe Mitsubishi mới.
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">MMV UCAR tại {siteConfig.dealer.name}</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl tracking-tight">Dịch vụ thu cũ đổi mới MMV UCAR</h2>
          <p className="mt-3 leading-7 text-gray-700">
            MMV UCAR là chương trình xe qua sử dụng chính hãng của Mitsubishi Motors Việt Nam, triển khai từ năm 2022 qua các nhà
            phân phối ủy quyền có dịch vụ xe qua sử dụng chính hãng. {siteConfig.dealer.name} là một trong các nhà phân phối này.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((item) => (
              <li key={item.title} className="border border-gray-200 bg-white p-5">
                <p className="font-black text-gray-950">{item.title}</p>
                <p className="mt-1 leading-7 text-gray-700">{item.text}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-black md:text-3xl tracking-tight">Ưu đãi cho khách đang dùng xe Mitsubishi</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Khi đổi lên xe Mitsubishi mới, bạn có thể nhận thêm ưu đãi từ chương trình &quot;Nâng cấp hành trình, Thăng hạng ưu
            đãi&quot; của Mitsubishi Motors Việt Nam:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700">
            {loyaltyTerms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Ưu đãi áp dụng theo thể lệ, điều kiện và thời gian của từng chương trình Mitsubishi Motors Việt Nam. Phúc hướng dẫn
            đăng ký trên ứng dụng trước khi ký hợp đồng để bạn không bị lỡ quà. Xem lãi suất các ngân hàng tại{" "}
            <Link href="/du-toan/tra-gop" className="font-semibold text-red-700 underline hover:text-red-800">trang tính trả góp</Link>.
          </p>

          <h2 className="mt-12 text-2xl font-black md:text-3xl tracking-tight">Quy trình thu cũ đổi mới</h2>
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

          <h2 className="mt-12 text-2xl font-black md:text-3xl tracking-tight">Muốn mua xe Mitsubishi đã qua sử dụng?</h2>
          <div className="mt-4 space-y-3 leading-7 text-gray-700">
            <p>
              Xe qua sử dụng bán trong chương trình MMV UCAR được kiểm tra kỹ thuật theo tiêu chuẩn 160 điểm. Xe đạt đủ tiêu chuẩn
              dưới đây được Mitsubishi Motors Việt Nam cấp chứng nhận xe qua sử dụng chính hãng (CPO):
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {cpoStandards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>Không phải xe cũ nào cũng có chứng nhận CPO, hỏi Phúc để biết xe cụ thể.</p>
            <p>
              <Link href="/xe-cu" className="font-semibold text-red-700 underline hover:text-red-800">Xem xe đã qua sử dụng đang có</Link>
              {" · "}
              <Link href="/tin-tuc/xe-mitsubishi-cu-chinh-hang-mmv-ucar-bao-hanh-cpo" className="font-semibold text-red-700 underline hover:text-red-800">
                Tìm hiểu MMV UCAR và bảo hành CPO
              </Link>
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
                className="inline-flex rounded bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-blue-700 items-center justify-center gap-2"
              >
                <ZaloIcon className="h-5 w-5 shrink-0" variant="white" />
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
