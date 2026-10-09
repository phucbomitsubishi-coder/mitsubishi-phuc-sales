import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cars } from "@/data/cars";
import { provinces, plateFeeByArea } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

export const metadata: Metadata = createPageMetadata({
  title: "Mua xe Mitsubishi từ tỉnh khác: cọc online, đăng ký, giao xe toàn quốc | Lưu Hoàng Phúc",
  description:
    "Mua xe Mitsubishi khi ở tỉnh khác: báo giá qua Zalo, đặt cọc online, ký hợp đồng trước, hỗ trợ đăng ký xe, nhận xe sau 10–15 ngày. Giá lăn bánh 6 dòng xe tại 34 tỉnh, thành.",
  path: "/mua-xe-mitsubishi-toan-quoc",
  hasOgImageFile: true,
});

// Quy trình, thời gian và phí vận chuyển do anh Phúc cung cấp (09/10/2026).
// Khi chính sách đổi, sửa các hằng số dưới đây.
const deliveryDays = { hcm: "7–10 ngày", province: "10–15 ngày" };
const freeDeliveryKm = 10;
const deliveryFeePerKm = 30_000;

const vnd = (value: number) => `${Math.round(value).toLocaleString("vi-VN")} đ`;
const percent = (rate: number) =>
  `${(rate * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`;

// Phiên bản giá thấp nhất của mỗi dòng xe, dùng cho bảng lăn bánh theo tỉnh
const entryVariants = cars.map((car) => {
  const variant = car.variants.reduce((min, item) => (item.price < min.price ? item : min), car.variants[0]);
  const label = car.name.endsWith(variant.name)
    ? car.name.replace("Mitsubishi ", "")
    : `${car.name.replace("Mitsubishi ", "")} ${variant.name}`;
  return { car, variant, label };
});

const provinceRows = provinces.map((province) => ({
  province,
  plateFee: plateFeeByArea.car[province.plateArea],
  cars: entryVariants.map((item) => ({
    ...item,
    onRoad: calculateOnRoadPrice({
      carName: item.car.name,
      price: item.variant.price,
      seats: item.variant.specifications?.seats,
      province,
    }).onRoadPrice,
  })),
}));

const steps = [
  {
    title: "Báo giá theo tỉnh của bạn",
    text: "Nhắn Zalo hoặc gọi cho Phúc: mẫu xe, phiên bản, màu và nơi đăng ký. Bạn nhận bảng giá lăn bánh tính đúng mức trước bạ và biển số của tỉnh mình, đã trừ ưu đãi tháng.",
  },
  {
    title: "Đặt cọc online, ký hợp đồng trước",
    text: "Không cần lên showroom để đặt xe. Bạn chuyển khoản đặt cọc, Phúc gửi hợp đồng mua bán để bạn ký nhận trước.",
  },
  {
    title: "Thanh toán hoặc làm hồ sơ trả góp",
    text: "Mua trả góp: tùy ngân hàng, có ngân hàng hỗ trợ ký hồ sơ vay ngay tại địa phương của bạn. Phúc sẽ báo ngân hàng phù hợp với nơi bạn ở.",
  },
  {
    title: "Đăng ký xe",
    text: "Khách ở tỉnh vẫn có thể dùng dịch vụ đăng ký xe bên Phúc. Giấy tờ cần chuẩn bị và chi phí dịch vụ được báo rõ trong báo giá.",
  },
  {
    title: "Nhận xe",
    text: `Mặc định nhận xe tại showroom ${siteConfig.dealer.name}. Nếu muốn giao tận nhà, bạn xác nhận trước để Phúc báo chi phí vận chuyển.`,
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Mua xe ở TP.HCM rồi về tỉnh, bảo hành có được không?",
    answer:
      "Được. Xe được bảo hành và bảo dưỡng tại bất kỳ nhà phân phối ủy quyền nào của Mitsubishi Motors Việt Nam trên toàn quốc, không bắt buộc quay lại nơi mua.",
  },
  {
    question: "Đăng ký ở tỉnh thì giá lăn bánh có rẻ hơn TP.HCM không?",
    answer: `Thường rẻ hơn. Lệ phí đăng ký và biển số xe con tại TP.HCM và Hà Nội là ${vnd(plateFeeByArea.car.I)}, còn các tỉnh, thành khác là ${vnd(plateFeeByArea.car.II)}. Một số tỉnh thu trước bạ 11–12% thay vì 10%, nên cần xem đúng tỉnh của bạn ở bảng bên dưới.`,
  },
  {
    question: "Có cần lên showroom để xem xe trước khi đặt không?",
    answer:
      "Không bắt buộc. Phúc gửi ảnh, video thực tế của xe và màu bạn chọn qua Zalo. Nếu tiện, bạn có thể ghé showroom hoặc đại lý Mitsubishi gần nhà để xem và lái thử mẫu xe trước khi quyết định.",
  },
  {
    question: "Bao lâu thì nhận được xe?",
    answer: `Khách TP.HCM thường khoảng ${deliveryDays.hcm}, khách ở tỉnh khoảng ${deliveryDays.province}, tính từ khi đặt cọc. Thời gian thực tế phụ thuộc tiến độ thanh toán và xe có sẵn màu, phiên bản bạn chọn hay không.`,
  },
];

export default function NationwidePurchasePage() {
  const xpanderRow = entryVariants.find((item) => item.car.id === "xpander") ?? entryVariants[0];
  const xpanderOnRoad = provinceRows.map((row) => row.cars.find((item) => item.car.id === xpanderRow.car.id)?.onRoad ?? 0);
  const minXpander = Math.min(...xpanderOnRoad);
  const maxXpander = Math.max(...xpanderOnRoad);

  return (
    <main className="min-h-screen bg-white text-black">
      <PageSchema
        metadata={metadata}
        path="/mua-xe-mitsubishi-toan-quoc"
        name="Mua xe Mitsubishi toàn quốc"
        type="WebPage"
        datePublished="2026-10-09"
        dateModified="2026-10-09"
        hasOgImage
      />
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <p className="font-semibold uppercase tracking-wider text-red-700">
          Mua xe từ tỉnh khác · Cập nhật {promotionMonthLabel}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Mua xe Mitsubishi khi ở tỉnh khác: đặt cọc online, nhận xe toàn quốc
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          Phúc tư vấn và bán xe Mitsubishi cho khách ở tất cả các tỉnh, thành. Bạn nhận báo
          giá, đặt cọc và ký hợp đồng từ xa; xe nhận tại showroom {siteConfig.dealer.name}{" "}
          hoặc giao tận nhà theo yêu cầu.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Fact title="Đặt cọc online">Ký hợp đồng mua bán trước, không cần lên showroom.</Fact>
          <Fact title="Hỗ trợ đăng ký xe">Khách ở tỉnh vẫn dùng được dịch vụ đăng ký bên Phúc.</Fact>
          <Fact title={`Nhận xe sau ${deliveryDays.province}`}>
            Khách TP.HCM khoảng {deliveryDays.hcm}, tùy tiến độ thanh toán.
          </Fact>
          <Fact title="Giao xe tận nhà">
            Miễn phí trong {freeDeliveryKm} km; xa hơn báo phí trước khi giao.
          </Fact>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold md:text-3xl">1. Quy trình mua xe từ xa</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-red-600 font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-gray-900">{step.title}</p>
                  <p className="mt-1 leading-7 text-gray-700">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">2. Thời gian nhận xe và phí vận chuyển</h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-200 align-top">
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Khách TP. Hồ Chí Minh</th>
                  <td className="px-4 py-3 text-gray-700">Khoảng {deliveryDays.hcm} từ khi đặt cọc</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Khách ở tỉnh, thành khác</th>
                  <td className="px-4 py-3 text-gray-700">Khoảng {deliveryDays.province} từ khi đặt cọc</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Nhận xe tại showroom</th>
                  <td className="px-4 py-3 text-gray-700">{siteConfig.dealer.address}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Giao xe tận nhà</th>
                  <td className="px-4 py-3 text-gray-700">
                    Miễn phí trong bán kính {freeDeliveryKm} km. Ngoài {freeDeliveryKm} km, phí tham
                    khảo {vnd(deliveryFeePerKm)}/km, tùy vị trí. Có trường hợp được hỗ trợ một
                    phần chi phí; mức cụ thể được thống nhất trước khi giao.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-7 text-gray-700">
            Thời gian thực tế phụ thuộc tiến độ thanh toán và việc xe có sẵn đúng phiên bản,
            màu bạn chọn. Phúc sẽ báo ngày giao dự kiến trước khi bạn đặt cọc.
          </p>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            3. Giá lăn bánh tại 34 tỉnh, thành
          </h2>
          <p className="mt-3 leading-7 text-gray-700">
            Tính cho phiên bản có giá thấp nhất của mỗi dòng xe, biển trắng, chưa trừ ưu đãi
            tháng {promotionMonthLabel}. Ví dụ {xpanderRow.label} lăn bánh từ khoảng{" "}
            {formatMillion(minXpander)} đến {formatMillion(maxXpander)} đồng tùy nơi đăng ký.
            Bấm vào tỉnh của bạn để xem.
          </p>

          <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200">
            {provinceRows.map(({ province, plateFee, cars: rows }) => (
              <details key={province.id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50">
                  <span className="shrink-0 font-semibold text-gray-900">{province.name}</span>
                  <span className="text-right text-xs text-gray-600 sm:text-sm">
                    Trước bạ {percent(province.taxRate)} · Biển số {vnd(plateFee)}
                    <span className="ml-2 inline-block transition group-open:rotate-180">▾</span>
                  </span>
                </summary>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {rows.map(({ car, variant, label, onRoad }) => (
                      <tr key={car.id}>
                        <th scope="row" className="px-4 py-2 font-normal">
                          <Link
                            href={`/xe/${car.slug}`}
                            className="font-semibold text-red-700 underline hover:text-red-800"
                          >
                            {label}
                          </Link>
                          <span className="ml-2 text-xs text-gray-600">
                            niêm yết {formatMillion(variant.price)}
                          </span>
                        </th>
                        <td className="px-4 py-2 text-right font-semibold tabular-nums">
                          {formatMillion(onRoad)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            Triton là xe bán tải chở hàng nên chịu 60% mức trước bạ của tỉnh. Lăn bánh gồm giá
            xe, trước bạ, đăng ký và biển số, đăng kiểm, phí đường bộ 12 tháng, bảo hiểm TNDS
            bắt buộc. Xem cách tính từng khoản tại{" "}
            <InlineLink href="/tu-van/chi-phi-lan-banh-mitsubishi">chi phí lăn bánh Mitsubishi</InlineLink>{" "}
            hoặc tính cho đúng phiên bản tại{" "}
            <InlineLink href="/du-toan/gia-lan-banh">công cụ tính giá lăn bánh</InlineLink>.
          </p>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">4. Câu hỏi thường gặp</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((item) => (
              <div key={item.question}>
                <h3 className="font-bold text-gray-900">{item.question}</h3>
                <p className="mt-2 leading-7 text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm leading-6 text-gray-600">
          Giá lăn bánh là dự tính tham khảo theo quy định hiện hành (cập nhật{" "}
          {promotionMonthLabel}). Thời gian giao và phí vận chuyển có thể thay đổi theo từng
          trường hợp, được ghi rõ trong báo giá và hợp đồng.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Nhận báo giá lăn bánh cho tỉnh của bạn</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Gửi mẫu xe và nơi đăng ký, Phúc gửi bảng giá chi tiết đã trừ ưu đãi tháng{" "}
            {promotionMonthLabel}, kèm thời gian giao xe dự kiến.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Nhắn Zalo
            </a>
            <a
              href={siteConfig.contact.phoneUrl}
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Gọi {siteConfig.sales.phoneDisplay}
            </a>
            <Link
              href="/?nguon=Toan-quoc#bao-gia"
              className="rounded border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              Gửi yêu cầu báo giá
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

function Fact({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
      <p className="font-bold text-gray-900">{title}</p>
      <p className="mt-1 leading-7 text-gray-700">{children}</p>
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
