import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";
import {
  CarLinkCard,
  ComparisonCta,
  ComparisonHero,
  ComparisonSources,
  getCarPriceRows,
  PriceComparison,
  QuickSummary,
  SpecTable,
  TwoColumnLists,
} from "@/components/CarComparison";

export const metadata: Metadata = createPageMetadata({
  title: "So sánh Mitsubishi Xforce và Toyota Yaris Cross: nên mua xe nào?",
  description:
    "So sánh Mitsubishi Xforce và Toyota Yaris Cross (xăng và hybrid) về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, mức tiêu thụ nhiên liệu và trang bị an toàn. Gợi ý chọn xe theo nhu cầu.",
  path: "/tu-van/so-sanh-xforce-va-yaris-cross",
  hasOgImageFile: true,
});

// Số liệu Toyota Yaris Cross nằm ở src/data/competitors.ts
const yaris = competitors.toyotaYarisCross;

export default function XforceVsYarisCrossPage() {
  const xforce = getCarBySlug("mitsubishi-xforce");
  if (!xforce) return null;

  const xforceRows = getCarPriceRows(xforce);
  const maxPromotion = Math.max(0, ...xforceRows.map((row) => row.promotionValue ?? 0));
  const glx = xforce.variants[0].specifications;
  const top = xforce.variants[xforce.variants.length - 1].specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV cỡ B, 5 chỗ", competitor: yaris.specs.type },
    { label: "Kích thước D × R × C", car: glx?.dimensions, competitor: yaris.specs.dimensions },
    { label: "Chiều dài cơ sở", car: glx?.wheelbase, competitor: yaris.specs.wheelbase },
    {
      label: "Khoảng sáng gầm",
      car: `${glx?.groundClearance} (GLX) – ${top?.groundClearance}`,
      competitor: yaris.specs.groundClearance,
    },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: yaris.specs.engine },
    { label: "Công suất", car: glx?.power, competitor: yaris.specs.power },
    { label: "Mô-men xoắn", car: glx?.torque, competitor: yaris.specs.torque },
    { label: "Hộp số, dẫn động", car: "CVT, cầu trước", competitor: yaris.specs.transmission },
    { label: "Mâm xe", car: "17 inch (GLX), 18 inch (Luxury, Ultimate)", competitor: yaris.specs.wheels },
    {
      label: "Tiêu thụ nhiên liệu (kết hợp)",
      car: glx?.fuelConsumptionCombined,
      competitor: yaris.specs.fuelConsumption,
    },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xforce-va-yaris-cross"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-13"
        dateModified="2026-10-13"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xforce và Toyota Yaris Cross: nên mua xe nào?">
          Yaris Cross và Xforce là hai mẫu SUV cỡ B 5 chỗ bán chạy tại Việt Nam: theo số liệu
          VAMA 9 tháng đầu năm 2026, Yaris Cross đạt 12.646 xe, Xforce đạt 9.456 xe. Bài viết so
          sánh giá, kích thước, động cơ xăng và hybrid, mức tiêu thụ nhiên liệu và trang bị để bạn
          chọn đúng xe.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Xforce</span> lớn hơn (dài hơn 80 mm,
              rộng hơn 40 mm, trục cơ sở dài hơn 30 mm), gầm cao hơn khoảng 10 mm, giá khởi điểm
              thấp hơn (605 triệu so với 650 triệu đồng).
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Yaris Cross</span> có bản hybrid tiêu
              thụ khoảng 3,8 lít/100 km, và cả hai phiên bản đều có sẵn camera 360 độ cùng gói an
              toàn chủ động Toyota Safety Sense.
            </li>
            <li>
              Muốn đủ trang bị an toàn chủ động thì so Xforce Ultimate (720 triệu) với Yaris Cross
              xăng (650 triệu) hoặc hybrid (728 triệu). Cả hai hãng thường có ưu đãi theo tháng,
              nên hãy so sánh giá sau ưu đãi khi nhận báo giá.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={xforce}
            competitor={yaris}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước và vận hành</h2>

            <SpecTable carName={xforce.name} competitorName={yaris.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xforce dài
                4.390 mm, rộng 1.810 mm, lớn hơn Yaris Cross (4.310 × 1.770 mm). Trục cơ sở 2.650
                mm so với 2.620 mm giúp hàng ghế sau của Xforce rộng hơn một chút khi chở đủ 5
                người.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm
                219–222 mm của Xforce cao hơn Yaris Cross (210 mm). Cả hai đều đủ cao cho đường
                phố, đường ngập nhẹ và leo lề.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> bản xăng của hai xe
                gần như ngang nhau (105 PS, 141 Nm của Xforce so với 105 mã lực, 138 Nm của Yaris
                Cross), cùng hộp số vô cấp và dẫn động cầu trước. Theo số liệu hãng công bố, Xforce
                tiêu thụ 6,30 lít/100 km, Yaris Cross xăng 5,95 lít/100 km.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Bản hybrid:</span> Yaris Cross HEV
                kết hợp máy xăng 1.5L với mô-tơ điện, mức tiêu thụ khoảng 3,8 lít/100 km, phù hợp
                người đi phố nhiều. Xforce hiện chưa có bản hybrid tại Việt Nam. Bản HEV có giá
                niêm yết 728 triệu đồng, cao hơn bản xăng 78 triệu, nên cần tính quãng đường đi mỗi
                năm để biết bao lâu thì bù được phần chênh lệch.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Xforce (bản Ultimate)",
                items: [
                  "Màn hình giải trí 12,3 inch, đồng hồ kỹ thuật số 8 inch",
                  "Âm thanh Dynamic Sound Yamaha Premium 8 loa",
                  "Điều hòa tự động 2 vùng, cốp điện rảnh tay, sạc không dây",
                  "Phanh tay điện tử và Auto Hold (có từ bản GLX)",
                  "6 túi khí, camera 360 độ",
                  "Gói Diamond Sense: kiểm soát hành trình thích ứng, cảnh báo và giảm thiểu va chạm phía trước, cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Kiểm soát vào cua chủ động AYC, 4 chế độ lái",
                ],
              }}
              right={{
                title: "Toyota Yaris Cross (cả 2 phiên bản)",
                items: [
                  "Màn hình cảm ứng 10 inch, đồng hồ kỹ thuật số, màn hình thông tin 7 inch",
                  "Âm thanh 6 loa, điều hòa tự động, ghế lái chỉnh điện 8 hướng, sạc không dây",
                  "Phanh tay điện tử, chìa khóa thông minh",
                  "6 túi khí, camera 360 độ",
                  "Gói an toàn chủ động Toyota Safety Sense (TSS): cảnh báo tiền va chạm, cảnh báo lệch làn và hỗ trợ giữ làn, điều khiển hành trình chủ động, đèn chiếu xa tự động",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang phía sau",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ở mức trang bị đầy đủ nhất, hai xe có danh sách an toàn chủ động tương đương. Điểm
              khác: Yaris Cross có sẵn gói an toàn và camera 360 ngay từ bản 650 triệu, còn Xforce
              chỉ có ở bản Ultimate. Bù lại Xforce Ultimate có màn hình giải trí lớn hơn (12,3 inch so
              với 10 inch) và âm thanh Yamaha 8 loa (Yaris Cross 6 loa). Nếu không cần gói an toàn chủ động, Xforce GLX
              (605 triệu) và Luxury (665 triệu, đã có cảnh báo điểm mù) là lựa chọn tiết kiệm hơn.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xforce nếu bạn",
                items: [
                  "Thường chở đủ 5 người, cần xe rộng và gầm cao hơn",
                  "Muốn giá khởi điểm thấp hơn hoặc nhiều lựa chọn phiên bản",
                  "Thích âm thanh Yamaha 8 loa và màn hình giải trí 12,3 inch",
                  "Muốn tận dụng ưu đãi trong tháng để kéo giá xuống",
                ],
              }}
              right={{
                title: "Chọn Yaris Cross nếu bạn",
                items: [
                  "Đi phố nhiều, muốn tiết kiệm xăng với bản hybrid",
                  "Muốn có gói an toàn chủ động và camera 360 ở mức giá 650 triệu",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Nếu đang cân nhắc thêm các mẫu SUV cỡ B khác, bạn có thể xem bài{" "}
              <Link href="/tu-van/so-sanh-xforce-va-creta" className="font-semibold text-red-700 underline">
                so sánh Xforce và Hyundai Creta
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe trên cùng một cung đường; với Xforce, bạn có
              thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xforce} source="So-sanh-Yaris-Cross" />
          </section>

          <CarLinkCard car={xforce} />

          <ComparisonSources car={xforce} competitor={yaris} />
        </div>
      </main>
    </>
  );
}
