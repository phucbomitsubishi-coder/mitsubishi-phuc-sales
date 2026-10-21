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
  title: "So sánh Mitsubishi Xpander và Kia Carens: nên mua xe 7 chỗ nào?",
  description:
    "So sánh Mitsubishi Xpander và Kia Carens về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, hộp số và trang bị an toàn từng phiên bản. Gợi ý chọn xe 7 chỗ gia đình dưới 700 triệu.",
  path: "/tu-van/so-sanh-xpander-va-kia-carens",
  hasOgImageFile: true,
});

// Số liệu Kia Carens nằm ở src/data/competitors.ts
const carens: CompetitorCar = competitors.kiaCarens;

export default function XpanderVsCarensPage() {
  const xpander = getCarBySlug("mitsubishi-xpander");
  if (!xpander) return null;

  const xpanderRows = getCarPriceRows(xpander);
  const maxPromotion = Math.max(0, ...xpanderRows.map((row) => row.promotionValue ?? 0));

  const xpanderBase = xpander.variants[0];
  const xpanderAt = xpander.variants[1];
  const xpanderTop = xpander.variants[xpander.variants.length - 1];
  const carensBase = carens.variants[0];
  const carensIvt = carens.variants[1];
  const carensTop = carens.variants[carens.variants.length - 1];
  const spec = xpanderTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "MPV 7 chỗ", competitor: carens.specs.type },
    { label: "Kích thước D × R × C", car: "4.595 × 1.750 × 1.730 mm (AT Premium cao 1.750 mm)", competitor: carens.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: carens.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: carens.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC, tương thích E10", competitor: carens.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: carens.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: carens.specs.torque },
    { label: "Hộp số", car: "Số sàn 5 cấp (MT), tự động 4 cấp (AT, AT Premium)", competitor: carens.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: carens.specs.drivetrain },
    { label: "Mâm xe", car: "16 inch (MT, AT), 17 inch (AT Premium)", competitor: carens.specs.wheels },
    { label: "Túi khí", car: "2 túi khí (MT, AT), 6 túi khí (AT Premium)", competitor: carens.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xpander-va-kia-carens"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-19"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xpander và Kia Carens: nên mua xe 7 chỗ nào?">
          Xpander và Carens là hai mẫu xe 7 chỗ gia đình giá dưới 700 triệu đồng, cùng máy 1.5L và dẫn
          động cầu trước. Xpander nổi bật ở khoảng sáng gầm và bản cao có 6 túi khí, Carens có giá khởi
          điểm thấp hơn một chút và hộp số vô cấp IVT. Bài viết so sánh từng phiên bản để bạn chọn đúng
          xe cho gia đình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Giá:</span> Carens khởi điểm{" "}
              {formatMillion(carensBase.price)} đồng, thấp hơn Xpander MT {formatMillion(xpanderBase.price - carensBase.price)}{" "}
              đồng. Bản số tự động rẻ nhất: Carens IVT {formatMillion(carensIvt.price)} đồng, Xpander AT{" "}
              {formatMillion(xpanderAt.price)} đồng.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Xpander có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Xpander</span> có khoảng sáng gầm 225 mm (Carens
              190 mm), dài hơn 55 mm; bản AT Premium có 6 túi khí, trong khi các bản Carens trong bài có 2
              túi khí.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Carens</span> rộng hơn 50 mm, động cơ nhỉnh hơn
              một chút (113 mã lực, 144 Nm so với 105 PS, 141 Nm) và dùng hộp số vô cấp IVT ở bản tự động.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={xpander} competitor={carens} />

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={xpander.name} competitorName={carens.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> chiều dài cơ sở gần như
                bằng nhau (Xpander 2.775 mm, Carens 2.780 mm), nên khoảng để chân hàng ghế 2 và 3 tương
                đương. Xpander dài hơn, Carens rộng hơn.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> Xpander có khoảng sáng gầm
                225 mm, cao hơn Carens 35 mm. Khi chở đủ 7 người và hành lý, gầm cao giúp xe ít bị chạm gầm
                ở gờ giảm tốc, đường ngập hoặc đường quê.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ, hộp số:</span> cả hai dùng máy xăng
                1.5L. Xpander tự động 4 cấp, Carens vô cấp IVT. Mức tiêu hao kết hợp của Xpander theo công
                bố của Mitsubishi là 6,80 lít/100 km (MT), 7,10 (AT) và 6,99 (AT Premium).
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
                title: `Kia Carens ${carensTop.name} (${formatMillion(carensTop.price)} đồng)`,
                items: [
                  "Đèn trước và đèn hậu LED, đèn và gạt mưa tự động",
                  "Ghế da, điều hòa tự động, cửa gió cho hàng ghế sau",
                  "Chìa khóa thông minh, khởi động nút bấm, kiểm soát hành trình",
                  "2 túi khí, camera lùi",
                  "Cân bằng điện tử, hỗ trợ khởi hành ngang dốc",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Xpander AT Premium đắt hơn Carens 1.5G Luxury {formatMillion(xpanderTop.price - carensTop.price)}{" "}
              đồng, đổi lại có 6 túi khí và gầm cao hơn. Nếu ngân sách khoảng 600 triệu
              đồng, Xpander AT ({formatMillion(xpanderAt.price)} đồng) và Carens Luxury là hai lựa chọn nên
              xem trực tiếp.
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
                  "Muốn 6 túi khí (bản AT Premium)",
                  "Muốn tận dụng ưu đãi tháng và lái thử tận nhà trước khi quyết định",
                ],
              }}
              right={{
                title: "Chọn Carens nếu bạn",
                items: [
                  "Muốn giá khởi điểm thấp nhất cho xe 7 chỗ",
                  "Thích hộp số vô cấp IVT",
                  "Chủ yếu đi phố, không cần khoảng sáng gầm lớn",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-xpander-va-veloz-cross" className="font-semibold text-red-700 underline">
                so sánh Xpander và Toyota Veloz Cross
              </Link>{" "}
              và{" "}
              <Link href="/tu-van/so-sanh-xpander-va-toyota-avanza-premio" className="font-semibold text-red-700 underline">
                so sánh Xpander và Toyota Avanza Premio
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe khi chở đủ người; với Xpander, bạn có thể lái thử
              tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xpander} source="So-sanh-Carens" />
          </section>

          <CarLinkCard car={xpander} />

          <ComparisonSources car={xpander} competitor={carens} />
        </div>
      </main>
    </>
  );
}
