import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cars } from "@/data/cars";
import { provinces, defaultProvinceId, plateFeeByArea } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";
import { currentPromotion } from "@/data/promotions";

export const metadata: Metadata = createPageMetadata({
  title: `Giá lăn bánh xe Mitsubishi gồm những khoản nào? Cách tính chi tiết ${promotionMonthLabel} | Lưu Hoàng Phúc`,
  description:
    "Cách tính giá lăn bánh xe Mitsubishi: lệ phí trước bạ 10–12%, biển số 14 triệu tại TP.HCM, phí đường bộ, đăng kiểm, bảo hiểm bắt buộc. Bảng lăn bánh 6 dòng xe và ví dụ tính từng khoản.",
  path: "/tu-van/chi-phi-lan-banh-mitsubishi",
  hasOgImageFile: true,
});

// Mọi con số trong bài lấy từ calculateOnRoadPrice và registrationFees.ts,
// nên bài viết luôn khớp với công cụ tính giá lăn bánh. Sửa phí ở đó, không sửa ở đây.

const vnd = (value: number) => `${Math.round(value).toLocaleString("vi-VN")} đ`;
const percent = (rate: number) =>
  `${(rate * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`;

const hcm = provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];
const nearbyProvince = provinces.find((item) => item.id === "dong-nai") ?? provinces[1];
const ratesAbove10 = provinces.filter((item) => item.taxRate > 0.1);

// Phí cố định lấy từ chính công thức (xe con 5 chỗ, 7 chỗ và bán tải)
const sample5 = calculateOnRoadPrice({ carName: "", price: 0, seats: 5, province: hcm }).fees;
const sample7 = calculateOnRoadPrice({ carName: "", price: 0, seats: 7, province: hcm }).fees;
const samplePickup = calculateOnRoadPrice({ carName: "Mitsubishi Triton", price: 0, seats: 5, province: hcm }).fees;
const feeValue = (fees: typeof sample5, label: string) =>
  fees.find((fee) => fee.label.startsWith(label))?.value ?? 0;

// Mức hỗ trợ trước bạ của tháng hiện hành, đọc từ nhãn "Ưu đãi tương đương 100% phí trước bạ"
const taxSupportPercents = currentPromotion.cars.flatMap((car) =>
  car.variants.flatMap((variant) =>
    variant.benefits.flatMap((benefit) => {
      const match = benefit.label.match(/tương đương (\d+)%[^,]*trước bạ/i);
      return match ? [Number(match[1])] : [];
    })
  )
);
const taxSupportText =
  taxSupportPercents.length === 0
    ? ""
    : Math.min(...taxSupportPercents) === Math.max(...taxSupportPercents)
      ? `${Math.max(...taxSupportPercents)}%`
      : `${Math.min(...taxSupportPercents)}–${Math.max(...taxSupportPercents)}%`;

export default function MitsubishiOnRoadCostGuidePage() {
  const carRows = cars.map((car) => {
    const variant = car.variants.reduce((min, item) => (item.price < min.price ? item : min), car.variants[0]);
    const input = { carName: car.name, price: variant.price, seats: variant.specifications?.seats };
    const atHcm = calculateOnRoadPrice({ ...input, province: hcm });
    const atNearby = calculateOnRoadPrice({ ...input, province: nearbyProvince });
    return { car, variant, atHcm, atNearby };
  });

  const feeTotals = carRows.map((row) => row.atHcm.totalFees);
  const minFees = Math.min(...feeTotals);
  const maxFees = Math.max(...feeTotals);

  // Ví dụ chi tiết: phiên bản thấp nhất của Xpander
  const example = carRows.find((row) => row.car.id === "xpander") ?? carRows[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <PageSchema
        metadata={metadata}
        path="/tu-van/chi-phi-lan-banh-mitsubishi"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        name="Chi phí lăn bánh Mitsubishi"
        datePublished="2026-09-29"
        dateModified="2026-10-07"
        hasOgImage
      />
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <Link
          href="/tu-van"
          className="font-semibold text-red-700 transition hover:text-red-800"
        >
          ← Tư vấn chọn xe
        </Link>

        <p className="mt-8 font-semibold uppercase tracking-wider text-red-700">
          Chi phí mua xe · Cập nhật {promotionMonthLabel}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Giá lăn bánh xe Mitsubishi gồm những khoản nào?
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          Giá lăn bánh là tổng số tiền để chiếc xe được đăng ký, gắn biển và chạy
          hợp pháp trên đường: <strong>giá xe + 5 khoản phí bắt buộc</strong>. Với xe
          đăng ký tại TP. Hồ Chí Minh, phần phí này của các phiên bản Mitsubishi từ khoảng{" "}
          {formatMillion(minFees)} đến {formatMillion(maxFees)} đồng, tùy giá xe.
        </p>

        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">
          <p className="font-bold text-gray-900">Ví dụ nhanh</p>
          <p className="mt-2 leading-7 text-gray-800">
            {example.car.name} {example.variant.name} giá niêm yết{" "}
            <strong>{formatMillion(example.variant.price)}</strong>, lăn bánh tại TP.HCM
            khoảng <strong>{formatMillion(example.atHcm.onRoadPrice)}</strong> (phí{" "}
            {formatMillion(example.atHcm.totalFees)}). Cùng xe đó đăng ký tại{" "}
            {nearbyProvince.name} chỉ khoảng{" "}
            <strong>{formatMillion(example.atNearby.onRoadPrice)}</strong>, vì lệ phí
            biển số ở tỉnh thấp hơn nhiều.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold md:text-3xl">1. Năm khoản phí khi lăn bánh</h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Khoản phí</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Mức thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 align-top">
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Lệ phí trước bạ</th>
                  <td className="px-4 py-3 text-gray-700">
                    {percent(hcm.taxRate)} giá niêm yết tại TP.HCM, 10–12% tùy tỉnh. Xe bán
                    tải chở hàng (Triton) chỉ chịu 60% mức này.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Đăng ký và biển số</th>
                  <td className="px-4 py-3 text-gray-700">
                    {vnd(plateFeeByArea.car.I)} tại Hà Nội và TP.HCM; {vnd(plateFeeByArea.car.II)} tại
                    các tỉnh, thành khác (xe con, theo Thông tư 155/2025/TT-BTC).
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Phí đăng kiểm</th>
                  <td className="px-4 py-3 text-gray-700">{vnd(feeValue(sample5, "Phí đăng kiểm"))}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Phí đường bộ 12 tháng</th>
                  <td className="px-4 py-3 text-gray-700">
                    {vnd(feeValue(sample5, "Phí đường bộ"))} với xe con cá nhân;{" "}
                    {vnd(feeValue(samplePickup, "Phí đường bộ"))} với Triton.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Bảo hiểm TNDS bắt buộc</th>
                  <td className="px-4 py-3 text-gray-700">
                    {vnd(feeValue(sample5, "Bảo hiểm"))} với xe dưới 6 chỗ và Triton;{" "}
                    {vnd(feeValue(sample7, "Bảo hiểm"))} với xe 7 chỗ. Phí 1 năm cho xe không kinh
                    doanh, đã gồm VAT, theo Nghị định 67/2023/NĐ-CP.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4 leading-8 text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Trước bạ là khoản lớn nhất,</span>{" "}
              chiếm phần lớn tổng chi phí lăn bánh. Hầu hết các tỉnh thu 10%. Những nơi
              thu cao hơn gồm:{" "}
              {ratesAbove10.map((item) => `${item.name} (${percent(item.taxRate)})`).join(", ")}.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Khách ở Bình Dương cũ lưu ý:</span>{" "}
              từ khi sáp nhập, xe đăng ký tại Bình Dương cũ thuộc TP. Hồ Chí Minh nên áp
              dụng lệ phí biển số {formatMillion(plateFeeByArea.car.I)} đồng như các quận nội
              thành, thay vì mức {vnd(plateFeeByArea.car.II)} của tỉnh trước đây.
            </p>
          </div>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            2. Giá lăn bánh 6 dòng xe Mitsubishi
          </h2>
          <p className="mt-3 leading-7 text-gray-700">
            Tính cho phiên bản có giá thấp nhất của mỗi dòng xe, chưa trừ ưu đãi tháng{" "}
            {promotionMonthLabel}. Giá lăn bánh tất cả phiên bản có tại{" "}
            <InlineLink href="/bang-gia-xe-mitsubishi">bảng giá xe Mitsubishi</InlineLink>.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Xe</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">TP.HCM</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{nearbyProvince.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {carRows.map(({ car, variant, atHcm, atNearby }) => (
                  <tr key={car.id}>
                    <th scope="row" className="px-4 py-3 font-normal">
                      <Link
                        href={`/xe/${car.slug}`}
                        className="font-semibold text-red-700 underline hover:text-red-800"
                      >
                        {car.name.endsWith(variant.name) ? variant.name : `${car.name.replace("Mitsubishi ", "")} ${variant.name}`}
                      </Link>
                      <span className="mt-1 block text-xs text-gray-600">
                        Niêm yết {formatMillion(variant.price)}
                      </span>
                    </th>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatMillion(atHcm.onRoadPrice)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatMillion(atNearby.onRoadPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            3. Ví dụ tính từng khoản: {example.car.name} {example.variant.name}
          </h2>
          <p className="mt-3 leading-7 text-gray-700">Đăng ký tại TP. Hồ Chí Minh, biển trắng.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold">Giá niêm yết</th>
                  <td className="px-4 py-3 text-right tabular-nums">{vnd(example.variant.price)}</td>
                </tr>
                {example.atHcm.fees.map((fee) => (
                  <tr key={fee.label}>
                    <th scope="row" className="px-4 py-3 font-normal text-gray-700">+ {fee.label}</th>
                    <td className="px-4 py-3 text-right tabular-nums">{vnd(fee.value)}</td>
                  </tr>
                ))}
                <tr className="bg-red-50">
                  <th scope="row" className="px-4 py-3 font-bold">Giá lăn bánh dự kiến</th>
                  <td className="px-4 py-3 text-right font-bold tabular-nums">{vnd(example.atHcm.onRoadPrice)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">4. Những điều nên biết thêm</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-gray-700">
            <Tip title="Ưu đãi tháng có thể giảm đáng kể tiền lăn bánh.">
              {taxSupportText
                ? `Chương trình của Mitsubishi tháng ${promotionMonthLabel} hỗ trợ tương đương ${taxSupportText} lệ phí trước bạ tùy phiên bản.`
                : "Chương trình ưu đãi của Mitsubishi thay đổi theo từng tháng."}{" "}
              Xem mức hỗ trợ của từng xe tại{" "}
              <InlineLink href="/bang-gia-xe-mitsubishi">bảng giá</InlineLink>.
            </Tip>
            <Tip title="Các khoản không bắt buộc tính riêng.">
              Bảo hiểm vật chất (thân vỏ), phim cách nhiệt, phụ kiện là tùy chọn, không nằm
              trong giá lăn bánh ở trên. Nên hỏi rõ khi nhận báo giá để so sánh đúng.
            </Tip>
            <Tip title="Xe chạy dịch vụ, biển vàng có mức phí khác.">
              Phí đường bộ và bảo hiểm bắt buộc của xe kinh doanh vận tải cao hơn xe cá
              nhân. Công cụ tính trên website có tùy chọn biển vàng.
            </Tip>
            <Tip title="Mua trả góp vẫn phải trả đủ phí lăn bánh.">
              Ngân hàng thường chỉ cho vay trên giá xe, nên tiền chuẩn bị ban đầu gồm phần
              trả trước cộng toàn bộ phí lăn bánh. Thử các mức trả trước tại{" "}
              <InlineLink href="/du-toan/tra-gop">công cụ tính trả góp</InlineLink>.
            </Tip>
          </ul>
        </section>

        <p className="mt-10 text-sm leading-6 text-gray-600">
          Số liệu là dự tính tham khảo theo quy định hiện hành (cập nhật {promotionMonthLabel}),
          có thể thay đổi theo địa phương, thời điểm đăng ký và hồ sơ thực tế.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Tính giá lăn bánh cho đúng xe và nơi bạn đăng ký</h2>

          <p className="mt-3 leading-7 text-gray-700">
            Chọn mẫu xe, phiên bản và 1 trong 34 tỉnh, thành để xem từng khoản phí, đã trừ
            ưu đãi tháng. Cần báo giá chính xác, liên hệ Phúc để được gửi bảng chi tiết.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/du-toan/gia-lan-banh"
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Tính giá lăn bánh
            </Link>

            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Tư vấn Zalo
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function Tip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <span className="font-semibold text-gray-900">{title}</span> {children}
    </li>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
