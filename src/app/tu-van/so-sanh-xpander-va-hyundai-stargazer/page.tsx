import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { comparisonSeo } from "@/lib/comparisonSeo";
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

// Tiêu đề/mô tả tự tính chênh lệch giá (src/lib/comparisonSeo.ts)
const seo = comparisonSeo({ slug: "mitsubishi-xpander", short: "Xpander", rival: "hyundaiStargazer", rivalShort: "Stargazer", variant: "AT", rivalVariant: "Đặc biệt", scope: "số tự động" });

export const metadata: Metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/tu-van/so-sanh-xpander-va-hyundai-stargazer",
  hasOgImageFile: true,
});

// Số liệu Hyundai Stargazer nằm ở src/data/competitors.ts
const stargazer: CompetitorCar = competitors.hyundaiStargazer;

export default function XpanderVsStargazerPage() {
  const xpander = getCarBySlug("mitsubishi-xpander");
  if (!xpander) return null;

  const xpanderRows = getCarPriceRows(xpander);
  const maxPromotion = Math.max(0, ...xpanderRows.map((row) => row.promotionValue ?? 0));

  const xpanderAt = xpander.variants[1];
  const xpanderTop = xpander.variants[xpander.variants.length - 1];
  const stargazerBase = stargazer.variants[0];
  const stargazerTop = stargazer.variants[stargazer.variants.length - 1];
  const spec = xpanderTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "MPV 7 chỗ", competitor: stargazer.specs.type },
    { label: "Kích thước", car: "4.595 × 1.750 × 1.730 mm (AT Premium cao 1.750 mm)", competitor: stargazer.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: stargazer.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: stargazer.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC, tương thích E10", competitor: stargazer.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: stargazer.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: stargazer.specs.torque },
    { label: "Hộp số", car: "Số sàn 5 cấp (MT), tự động 4 cấp (AT, AT Premium)", competitor: stargazer.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: stargazer.specs.drivetrain },
    { label: "Túi khí", car: "2 túi khí (MT, AT), 6 túi khí (AT Premium)", competitor: stargazer.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xpander-va-hyundai-stargazer"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-29"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xpander và Hyundai Stargazer: nên mua xe 7 chỗ nào?">
          Xpander và Stargazer là hai mẫu MPV 7 chỗ máy 1.5L, dẫn động cầu trước, giá dưới 700 triệu đồng.
          Xpander có gầm cao hơn và nhiều phiên bản để chọn, Stargazer bản nâng cấp có hộp số vô cấp và
          gói hỗ trợ lái ở bản Cao cấp. Bài viết so sánh từng phiên bản để bạn chọn đúng xe cho gia đình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Giá:</span> bản số tự động rẻ nhất của Stargazer
              (Đặc biệt) là {formatMillion(stargazerBase.price)} đồng, Xpander AT{" "}
              {formatMillion(xpanderAt.price)} đồng. Xpander còn bản số sàn MT{" "}
              {formatMillion(xpander.variants[0].price)} đồng cho người cần giá thấp.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Xpander có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Xpander</span> có khoảng sáng gầm 225 mm (Stargazer
              195–205 mm) và dài hơn 20 mm; bản AT Premium có 6 túi khí.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Stargazer</span> rộng hơn 30 mm, máy nhỉnh hơn một
              chút (115 PS, 144 Nm so với 105 PS, 141 Nm), hộp số vô cấp; bản Cao cấp có 6 túi khí và gói an
              toàn chủ động SmartSense.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={xpander} competitor={stargazer} />

          <p className="mt-4 leading-7 text-gray-700">
            Giá trên là giá niêm yết. Đại lý Hyundai có thể có ưu đãi riêng cho Stargazer theo từng thời điểm,
            nên khi so sánh bạn nên hỏi giá lăn bánh cuối cùng của cả hai xe.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={xpander.name} competitorName={stargazer.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> chiều dài cơ sở gần như bằng
                nhau (Xpander 2.775 mm, Stargazer 2.780 mm), nên chỗ để chân hàng ghế 2 và 3 tương đương.
                Xpander dài hơn, Stargazer rộng hơn.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> Xpander có khoảng sáng gầm 225 mm,
                cao hơn Stargazer Cao cấp 20 mm và bản Đặc biệt 30 mm. Khi chở đủ 7 người và hành lý, gầm cao
                giúp xe ít chạm gầm ở gờ giảm tốc, đường ngập hoặc đường quê.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ, hộp số:</span> cả hai dùng máy xăng
                1.5L. Xpander tự động 4 cấp, Stargazer vô cấp. Mức tiêu hao kết hợp của Xpander theo công bố
                của Mitsubishi là 6,80 lít/100 km (MT), 7,10 (AT) và 6,99 (AT Premium).
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">3. Trang bị bản cao nhất</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Xpander ${xpanderTop.name} (${formatMillion(xpanderTop.price)} đồng)`,
                items: [
                  "Đèn LED, đèn sương mù LED, đèn và gạt mưa tự động, mâm 17 inch",
                  "Màn hình cảm ứng 10 inch, đồng hồ kỹ thuật số 8 inch",
                  "Ghế da, cửa gió điều hòa cho hàng ghế sau",
                  "Phanh tay điện tử, Auto Hold, kiểm soát hành trình",
                  "6 túi khí, camera lùi, cảm biến lùi",
                  "Cân bằng điện tử, hỗ trợ khởi hành ngang dốc",
                ],
              }}
              right={{
                title: `Hyundai Stargazer ${stargazerTop.name} (${formatMillion(stargazerTop.price)} đồng)`,
                items: [
                  "Hộp số vô cấp, dẫn động cầu trước",
                  "6 túi khí",
                  "Gói SmartSense: cảnh báo điểm mù, hỗ trợ giữ làn, phanh khẩn cấp tự động",
                  "Khoảng sáng gầm 205 mm",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Xpander AT Premium đắt hơn Stargazer Cao cấp {formatMillion(xpanderTop.price - stargazerTop.price)}{" "}
              đồng. Stargazer Cao cấp có gói hỗ trợ lái mà Xpander chưa có; Xpander bù lại bằng gầm cao hơn và
              ưu đãi tháng. Danh sách trang bị Stargazer ở trên chỉ gồm các mục các nguồn ghi giống nhau; bạn
              nên xem bảng thông số tại đại lý Hyundai trước khi quyết định.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xpander nếu bạn",
                items: [
                  "Thường chở đủ 7 người về quê, đi đường xấu hoặc ngập, cần gầm cao 225 mm",
                  "Cần bản số sàn giá thấp, hoặc muốn nhiều phiên bản để chọn",
                  "Muốn tận dụng ưu đãi tháng và lái thử tận nhà trước khi quyết định",
                ],
              }}
              right={{
                title: "Chọn Stargazer nếu bạn",
                items: [
                  "Thích hộp số vô cấp",
                  "Cần gói hỗ trợ lái như cảnh báo điểm mù, giữ làn (bản Cao cấp)",
                  "Chủ yếu đi phố, không cần khoảng sáng gầm lớn",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-xpander-va-kia-carens" className="font-semibold text-red-700 underline">
                so sánh Xpander và Kia Carens
              </Link>{" "}
              và{" "}
              <Link href="/tu-van/so-sanh-xpander-va-veloz-cross" className="font-semibold text-red-700 underline">
                so sánh Xpander và Toyota Veloz Cross
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe khi chở đủ người; với Xpander, bạn có thể lái thử tại
              showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xpander} source="So-sanh-Stargazer" />
          </section>

          <CarLinkCard car={xpander} />

          <ComparisonSources car={xpander} competitor={stargazer} />
        </div>
      </main>
    </>
  );
}
