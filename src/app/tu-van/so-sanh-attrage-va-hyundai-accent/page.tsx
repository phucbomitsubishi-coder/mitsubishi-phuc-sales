import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { getCarBySlug } from "@/data/cars";
import { competitors, type CompetitorCar } from "@/data/competitors";
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
  title: "So sánh Mitsubishi Attrage và Hyundai Accent: nên mua sedan nào?",
  description:
    "So sánh Mitsubishi Attrage và Hyundai Accent về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, hộp số và trang bị an toàn từng phiên bản. Gợi ý chọn sedan hạng B theo nhu cầu và ngân sách.",
  path: "/tu-van/so-sanh-attrage-va-hyundai-accent",
  hasOgImageFile: true,
});

// Số liệu Hyundai Accent nằm ở src/data/competitors.ts
const accent: CompetitorCar = competitors.hyundaiAccent;

export default function AttrageVsAccentPage() {
  const attrage = getCarBySlug("mitsubishi-attrage");
  if (!attrage) return null;

  const attrageRows = getCarPriceRows(attrage);
  const maxPromotion = Math.max(0, ...attrageRows.map((row) => row.promotionValue ?? 0));

  const attrageBase = attrage.variants[0];
  const attrageTop = attrage.variants[attrage.variants.length - 1];
  const accentBase = accent.variants[0];
  const accentAt = accent.variants[1];
  const accentTop = accent.variants[accent.variants.length - 1];
  const spec = attrageTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "Sedan hạng B, 5 chỗ", competitor: accent.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: accent.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: accent.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: accent.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.2L MIVEC, 3 xi-lanh", competitor: accent.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: accent.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: accent.specs.torque },
    { label: "Hộp số", car: "Số sàn 5 cấp (MT), vô cấp CVT (CVT Premium)", competitor: accent.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: accent.specs.drivetrain },
    { label: "Mâm xe", car: "15 inch", competitor: accent.specs.wheels },
    { label: "Túi khí", car: "2 túi khí", competitor: accent.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-attrage-va-hyundai-accent"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-15"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Attrage và Hyundai Accent: nên mua sedan nào?">
          Attrage và Accent là hai mẫu sedan hạng B được nhiều người mua xe lần đầu và người chạy
          dịch vụ cân nhắc. Attrage có giá dễ tiếp cận và máy nhỏ tiết kiệm, Accent thế hệ mới lớn
          hơn, máy mạnh hơn và có nhiều phiên bản để chọn. Bài viết so sánh từng phiên bản để bạn
          chọn đúng xe cho nhu cầu và ngân sách.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Attrage</span> có giá khởi điểm thấp hơn{" "}
              {formatMillion(accentBase.price - attrageBase.price)} đồng ({formatMillion(attrageBase.price)}{" "}
              so với {formatMillion(accentBase.price)}), gầm cao hơn một chút và bán kính quay vòng
              4,8 m, dễ xoay trở trong hẻm.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Attrage có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Accent</span> dài hơn 230 mm, chiều dài cơ
              sở dài hơn 120 mm, dùng máy 1.5L 4 xi-lanh (115 PS, 144 Nm). Bản Cao cấp (
              {formatMillion(accentTop.price)} đồng) có 6 túi khí và các cảnh báo va chạm, điểm mù.
            </li>
            <li>
              Cùng mức giá khoảng 490 triệu đồng, Attrage CVT Premium nhiều tiện nghi hơn (đèn Bi-LED,
              ghế da, điều hòa tự động, kiểm soát hành trình), còn Accent 1.5 AT rộng hơn và máy mạnh
              hơn.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={attrage} competitor={accent} />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={attrage.name} competitorName={accent.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> Accent dài 4.535 mm,
                rộng 1.765 mm, lớn hơn rõ so với Attrage (4.305 × 1.670 mm). Chiều dài cơ sở 2.670 mm
                giúp hàng ghế sau của Accent rộng chân hơn khi chở đủ 5 người.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe và xoay trở:</span> khoảng sáng
                gầm của Attrage là 170 mm, Accent 165 mm, gần tương đương. Attrage nhỏ gọn, bán kính
                quay vòng 4,8 m, nên quay đầu và đỗ xe trong phố dễ hơn.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Accent dùng máy 1.5L 4
                xi-lanh 115 PS, 144 Nm, tăng tốc tốt hơn khi chở đủ người hoặc chạy cao tốc. Attrage
                dùng máy 1.2L 3 xi-lanh 78 PS, 100 Nm, xe nhẹ (875–905 kg) nên đủ dùng trong phố; mức
                tiêu hao kết hợp theo công bố của Mitsubishi là 5,30 lít/100 km (MT) và 5,59 lít/100 km
                (CVT Premium).
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị ở cùng tầm giá</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Attrage ${attrageTop.name}`,
                items: [
                  "Đèn Bi-LED, đèn sương mù LED, đèn và gạt mưa tự động",
                  "Ghế và vô-lăng bọc da, điều hòa tự động",
                  "Màn hình cảm ứng 7 inch, Apple CarPlay và Android Auto",
                  "Chìa khóa thông minh, khởi động nút bấm, kiểm soát hành trình",
                  "2 túi khí, camera lùi",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                ],
              }}
              right={{
                title: `Hyundai Accent ${accentAt.name}`,
                items: [
                  "Hộp số vô cấp CVT, máy 1.5L 115 PS",
                  "Màn hình cảm ứng 8 inch, đồng hồ kỹ thuật số 10,25 inch",
                  "Chìa khóa thông minh, khởi động nút bấm",
                  "Đèn sương mù, gương gập điện",
                  "2 túi khí, camera lùi, cân bằng điện tử",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Accent còn có bản Đặc biệt ({formatMillion(accent.variants[2].price)} đồng, 4 túi khí,
              cảm biến áp suất lốp) và Cao cấp ({formatMillion(accentTop.price)} đồng, 6 túi khí, mâm
              16 inch, cảnh báo va chạm phía trước, cảnh báo điểm mù và cảnh báo phương tiện cắt
              ngang). Nếu ưu tiên an toàn chủ động, bản Cao cấp có lợi thế nhưng giá cao hơn Attrage CVT
              Premium {formatMillion(accentTop.price - attrageTop.price)} đồng.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Attrage nếu bạn",
                items: [
                  "Mua xe lần đầu, muốn tổng chi phí thấp, tận dụng ưu đãi trong tháng",
                  "Chạy dịch vụ hoặc đi phố nhiều, cần xe nhỏ gọn, tiết kiệm nhiên liệu",
                  "Muốn ghế da, điều hòa tự động, kiểm soát hành trình ở mức giá dưới 500 triệu",
                ],
              }}
              right={{
                title: "Chọn Accent nếu bạn",
                items: [
                  "Thường chở đủ 5 người, chạy cao tốc, cần xe rộng và máy mạnh hơn",
                  "Muốn 6 túi khí và cảnh báo va chạm (bản Cao cấp)",
                  "Chấp nhận giá cao hơn để có nhiều lựa chọn phiên bản",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-attrage-va-toyota-vios" className="font-semibold text-red-700 underline">
                so sánh Attrage và Toyota Vios
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe trên đoạn đường bạn hay đi; với Attrage, bạn có
              thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={attrage} source="So-sanh-Accent" />
          </section>

          <CarLinkCard car={attrage} />

          <ComparisonSources car={attrage} competitor={accent} />
        </div>
      </main>
    </>
  );
}
