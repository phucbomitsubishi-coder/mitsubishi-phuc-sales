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
  title: "So sánh Mitsubishi Xforce và Kia Seltos: nên mua SUV nào?",
  description:
    "So sánh Mitsubishi Xforce và Kia Seltos về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ 1.5L và 1.5 Turbo, hộp số và trang bị từng phiên bản. Gợi ý chọn SUV cỡ B 5 chỗ theo nhu cầu.",
  path: "/tu-van/so-sanh-xforce-va-kia-seltos",
  hasOgImageFile: true,
});

// Số liệu Kia Seltos nằm ở src/data/competitors.ts
const seltos: CompetitorCar = competitors.kiaSeltos;

export default function XforceVsSeltosPage() {
  const xforce = getCarBySlug("mitsubishi-xforce");
  if (!xforce) return null;

  const xforceRows = getCarPriceRows(xforce);
  const maxPromotion = Math.max(0, ...xforceRows.map((row) => row.promotionValue ?? 0));

  const xforceBase = xforce.variants[0];
  const xforceLuxury = xforce.variants.find((variant) => variant.name === "Luxury") ?? xforce.variants[1];
  const xforceTop = xforce.variants[xforce.variants.length - 1];
  const seltosBase = seltos.variants[0];
  const seltosLuxury = seltos.variants[2];
  const seltosTurboLuxury = seltos.variants[4];
  const spec = xforceTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV cỡ B, 5 chỗ", competitor: seltos.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: seltos.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: seltos.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: "219 mm (GLX), 222 mm (Luxury, Ultimate)", competitor: seltos.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: seltos.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: seltos.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: seltos.specs.torque },
    { label: "Hộp số", car: "Vô cấp CVT", competitor: seltos.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: seltos.specs.drivetrain },
    { label: "Mâm xe", car: "17 inch (GLX), 18 inch (Luxury, Ultimate)", competitor: seltos.specs.wheels },
    { label: "Túi khí", car: "4 túi khí (GLX), 6 túi khí (Luxury, Ultimate)", competitor: seltos.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xforce-va-kia-seltos"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-19"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xforce và Kia Seltos: nên mua SUV nào?">
          Xforce và Seltos cùng là SUV cỡ B 5 chỗ, giá từ khoảng 550 đến 720 triệu đồng, được nhiều gia
          đình trẻ cân nhắc. Xforce có gầm cao và nhiều trang bị an toàn ở bản cao, Seltos có giá khởi
          điểm thấp hơn và thêm lựa chọn máy 1.5 Turbo. Bài viết so sánh theo từng phiên bản để bạn chọn
          đúng xe cho nhu cầu và ngân sách.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Seltos</span> có giá khởi điểm thấp hơn{" "}
              {formatMillion(xforceBase.price - seltosBase.price)} đồng ({formatMillion(seltosBase.price)} so
              với {formatMillion(xforceBase.price)}) và có thêm bản máy 1.5 Turbo 158 mã lực, 253 Nm cho
              người thích xe bốc.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Xforce</span> có khoảng sáng gầm 219–222 mm
              (Seltos 190 mm), thân xe và chiều dài cơ sở nhỉnh hơn một chút, bản Luxury trở lên có 6 túi
              khí, cảnh báo điểm mù và cảnh báo phương tiện cắt ngang khi lùi.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Xforce có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              Cùng khoảng 605–609 triệu đồng: Xforce GLX gầm cao hơn, Seltos 1.5L Luxury nhiều tiện nghi
              hơn (ghế lái chỉnh điện, điều hòa 2 vùng). Cùng 665 triệu đồng: Xforce Luxury và Seltos 1.5
              Turbo Luxury, một bên thiên về gầm cao và an toàn, một bên thiên về động cơ mạnh.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={xforce} competitor={seltos} />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={xforce.name} competitorName={seltos.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> hai xe gần tương đương.
                Xforce dài 4.390 mm, rộng 1.810 mm, chiều dài cơ sở 2.650 mm; Seltos dài 4.365 mm, rộng
                1.800 mm, chiều dài cơ sở 2.610 mm.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm của Xforce là
                222 mm ở bản Luxury và Ultimate, cao hơn Seltos (190 mm) khoảng 30 mm. Khác biệt này dễ
                thấy khi đi đường ngập, leo lề hoặc đường xấu ở ngoại thành.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> ở các bản 1.5L, hai xe gần
                nhau (Xforce 105 PS, 141 Nm; Seltos 113 mã lực, 144 Nm), cùng hộp số vô cấp CVT. Seltos
                có thêm bản 1.5 Turbo (158 mã lực, 253 Nm, ly hợp kép 7 cấp), mạnh hơn rõ khi vượt xe và
                chạy cao tốc. Mức tiêu hao kết hợp của Xforce theo công bố của Mitsubishi là 6,30 lít/100
                km.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị ở tầm giá 609–665 triệu đồng</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Xforce ${xforceLuxury.name} (${formatMillion(xforceLuxury.price)} đồng)`,
                items: [
                  "Đèn LED T-Shape, đèn sương mù LED, đèn và gạt mưa tự động, mâm 18 inch",
                  "Màn hình giải trí 12,3 inch, đồng hồ kỹ thuật số 8 inch",
                  "Ghế da, ghế lái chỉnh điện, điều hòa tự động 2 vùng",
                  "Phanh tay điện tử, Auto Hold, kiểm soát hành trình",
                  "6 túi khí, cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Cảm biến áp suất lốp, camera lùi",
                ],
              }}
              right={{
                title: `Kia Seltos ${seltosLuxury.name} (${formatMillion(seltosLuxury.price)} đồng)`,
                items: [
                  "Đèn trước và đèn hậu LED, đèn tự động bật tắt",
                  "Màn hình giải trí 10,25 inch, Apple CarPlay và Android Auto không dây",
                  "Ghế da, ghế lái chỉnh điện, điều hòa tự động 2 vùng",
                  "Phanh tay điện tử, Auto Hold, kiểm soát hành trình",
                  "Cảm biến áp suất lốp, camera lùi",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Bản cao nhất Xforce Ultimate ({formatMillion(xforceTop.price)} đồng) có thêm gói an toàn chủ
              động Diamond Sense (cảnh báo và giảm thiểu va chạm phía trước, kiểm soát hành trình thích
              ứng), camera 360 độ, âm thanh Yamaha 8 loa và cốp điện rảnh tay. Seltos 1.5 Turbo Luxury (
              {formatMillion(seltosTurboLuxury.price)} đồng) phù hợp hơn nếu bạn ưu tiên sức kéo động cơ.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xforce nếu bạn",
                items: [
                  "Hay đi đường ngập, đường xấu hoặc về quê, cần gầm cao 222 mm",
                  "Ưu tiên an toàn: 6 túi khí, cảnh báo điểm mù, gói Diamond Sense ở bản Ultimate",
                  "Muốn tận dụng ưu đãi tháng và lái thử tận nhà trước khi quyết định",
                ],
              }}
              right={{
                title: "Chọn Seltos nếu bạn",
                items: [
                  "Muốn giá khởi điểm thấp nhất có thể",
                  "Thích động cơ mạnh, chọn bản 1.5 Turbo 158 mã lực",
                  "Chủ yếu đi phố, không cần khoảng sáng gầm lớn",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-xforce-va-creta" className="font-semibold text-red-700 underline">
                so sánh Xforce và Hyundai Creta
              </Link>{" "}
              và{" "}
              <Link href="/tu-van/so-sanh-xforce-va-yaris-cross" className="font-semibold text-red-700 underline">
                so sánh Xforce và Toyota Yaris Cross
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe trên đoạn đường bạn hay đi; với Xforce, bạn có thể
              lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xforce} source="So-sanh-Seltos" />
          </section>

          <CarLinkCard car={xforce} />

          <ComparisonSources car={xforce} competitor={seltos} />
        </div>
      </main>
    </>
  );
}
