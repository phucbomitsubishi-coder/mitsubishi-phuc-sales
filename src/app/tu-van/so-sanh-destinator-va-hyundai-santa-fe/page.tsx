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
  title: "So sánh Mitsubishi Destinator và Hyundai Santa Fe: SUV 7 chỗ nào hợp hơn?",
  description:
    "So sánh Mitsubishi Destinator và Hyundai Santa Fe về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ 1.5 turbo và 2.5L, trang bị an toàn. Gợi ý chọn SUV 7 chỗ theo nhu cầu và ngân sách.",
  path: "/tu-van/so-sanh-destinator-va-hyundai-santa-fe",
  hasOgImageFile: true,
});

// Số liệu Hyundai Santa Fe nằm ở src/data/competitors.ts
const santaFe: CompetitorCar = competitors.hyundaiSantaFe;

export default function DestinatorVsSantaFePage() {
  const destinator = getCarBySlug("mitsubishi-destinator");
  if (!destinator) return null;

  const destinatorRows = getCarPriceRows(destinator);
  const maxPromotion = Math.max(0, ...destinatorRows.map((row) => row.promotionValue ?? 0));

  const destinatorBase = destinator.variants[0];
  const destinatorTop = destinator.variants[destinator.variants.length - 1];
  const santaFeBase = santaFe.variants[0];
  const spec = destinatorTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV cỡ C, 7 chỗ", competitor: santaFe.specs.type },
    { label: "Kích thước", car: spec?.dimensions, competitor: santaFe.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: santaFe.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: santaFe.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L turbo MIVEC", competitor: santaFe.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: santaFe.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: santaFe.specs.torque },
    { label: "Hộp số", car: "Vô cấp CVT", competitor: santaFe.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: santaFe.specs.drivetrain },
    { label: "Mâm xe", car: "18 inch", competitor: santaFe.specs.wheels },
    { label: "Tiêu hao nhiên liệu (hỗn hợp)", car: "7,30 L/100 km", competitor: santaFe.specs.fuelConsumption },
    { label: "Túi khí", car: "6 túi khí", competitor: santaFe.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-destinator-va-hyundai-santa-fe"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-19"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Destinator và Hyundai Santa Fe: SUV 7 chỗ nào hợp hơn?">
          Nhiều gia đình đang tìm SUV 7 chỗ phân vân giữa Destinator và Santa Fe. Hai xe khác phân khúc:
          Destinator là SUV cỡ C giá dưới 900 triệu đồng, Santa Fe là SUV cỡ D giá từ hơn 1 tỷ đồng. Bài
          viết so sánh để bạn thấy khoản chênh lệch giá đổi lại được những gì.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Giá:</span> Destinator Premium{" "}
              {formatMillion(destinatorBase.price)} đồng, thấp hơn Santa Fe Exclusive{" "}
              {formatMillion(santaFeBase.price - destinatorBase.price)} đồng. Bản cao nhất Destinator
              Ultimate ({formatMillion(destinatorTop.price)} đồng) vẫn thấp hơn bản rẻ nhất của Santa Fe.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Destinator có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Santa Fe</span> lớn hơn (dài 4.830 mm, rộng
              1.900 mm), máy 2.5L 194 mã lực, các bản từ Prestige có dẫn động 4 bánh HTRAC, phù hợp người
              cần xe cỡ lớn và sẵn sàng chi thêm.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Destinator</span> có chiều dài cơ sở bằng Santa
              Fe (2.815 mm), khoảng sáng gầm cao hơn (214 mm so với 177 mm), mô-men xoắn tương đương (250
              Nm so với 246 Nm) và bản Ultimate có gói an toàn chủ động Diamond Sense.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={destinator} competitor={santaFe} />

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={destinator.name} competitorName={santaFe.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> Santa Fe dài hơn 150 mm và
                rộng hơn 60 mm, nên khoang hành lý và hàng ghế 3 rộng rãi hơn. Tuy vậy chiều dài cơ sở của
                hai xe bằng nhau (2.815 mm), nên khoảng để chân hàng ghế 2 gần tương đương.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> Destinator có khoảng sáng gầm
                214 mm, cao hơn Santa Fe 37 mm, thuận lợi khi đi đường ngập, đường đất hoặc lên lề.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Destinator dùng máy 1.5L
                turbo 163 PS, mô-men xoắn 250 Nm từ 2.000 vòng/phút, hộp số CVT. Santa Fe dùng máy 2.5L
                194 mã lực, 246 Nm, hộp số tự động 8 cấp; bản Calligraphy 2.5 Turbo và Hybrid mạnh hơn
                nữa nhưng giá từ 1,365 tỷ đồng. Theo số liệu công bố, mức tiêu hao hỗn hợp là 7,30
                lít/100 km (Destinator) và 8,31 lít/100 km (Santa Fe Exclusive).
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">3. Trang bị: Destinator Ultimate và Santa Fe Exclusive</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Destinator ${destinatorTop.name} (${formatMillion(destinatorTop.price)} đồng)`,
                items: [
                  "Diamond Sense: cảnh báo và giảm thiểu va chạm phía trước, kiểm soát hành trình thích ứng, cảnh báo lệch làn",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Camera 360 độ, cảm biến trước và sau, cảm biến áp suất lốp",
                  "Âm thanh Yamaha 8 loa, màn hình 12,3 inch",
                  "Ghế lái và ghế hành khách trước chỉnh điện, điều hòa tự động 2 vùng",
                  "Cốp điện rảnh tay, 6 túi khí",
                ],
              }}
              right={{
                title: `Hyundai Santa Fe ${santaFeBase.name} (${formatMillion(santaFeBase.price)} đồng)`,
                items: [
                  "Màn hình cảm ứng 12,3 inch, sạc không dây",
                  "Ghế lái chỉnh điện, điều hòa tự động 2 vùng",
                  "Cốp điện, đèn LED, gạt mưa tự động",
                  "Phanh tay điện tử, Auto Hold, kiểm soát hành trình",
                  "6 túi khí, camera lùi, cảm biến áp suất lốp",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Với khoảng {formatMillion(santaFeBase.price - destinatorTop.price)} đồng chênh lệch giữa
              Destinator Ultimate và Santa Fe Exclusive, bạn đổi lấy xe lớn hơn và máy 2.5L; còn Destinator
              Ultimate có nhiều tính năng an toàn chủ động hơn trong tầm giá dưới 900 triệu
              đồng.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Destinator nếu bạn",
                items: [
                  "Muốn SUV 7 chỗ dưới 900 triệu đồng, chi phí lăn bánh thấp hơn",
                  "Cần gầm cao 214 mm cho đường ngập, đường quê",
                  "Muốn gói an toàn chủ động Diamond Sense, bảo hành 5 năm hoặc 150.000 km",
                ],
              }}
              right={{
                title: "Chọn Santa Fe nếu bạn",
                items: [
                  "Cần xe cỡ lớn, khoang hành lý và hàng ghế 3 rộng hơn",
                  "Muốn động cơ 2.5L hoặc dẫn động 4 bánh",
                  "Ngân sách từ 1,07 tỷ đồng trở lên",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-destinator-va-innova-cross" className="font-semibold text-red-700 underline">
                so sánh Destinator và Toyota Innova Cross
              </Link>
              . Cách chắc chắn nhất là lái thử khi chở đủ người; với Destinator, bạn có thể lái thử tại
              showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={destinator} source="So-sanh-SantaFe" />
          </section>

          <CarLinkCard car={destinator} />

          <ComparisonSources car={destinator} competitor={santaFe} />
        </div>
      </main>
    </>
  );
}
