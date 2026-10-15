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
  title: "So sánh Mitsubishi Xpander và Toyota Avanza Premio: nên mua MPV 7 chỗ nào?",
  description:
    "So sánh Mitsubishi Xpander và Toyota Avanza Premio về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, hộp số và trang bị an toàn từng phiên bản. Gợi ý chọn MPV 7 chỗ theo nhu cầu.",
  path: "/tu-van/so-sanh-xpander-va-toyota-avanza-premio",
  hasOgImageFile: true,
});

// Số liệu Toyota Avanza Premio nằm ở src/data/competitors.ts
const avanza: CompetitorCar = competitors.toyotaAvanzaPremio;

export default function XpanderVsAvanzaPage() {
  const xpander = getCarBySlug("mitsubishi-xpander");
  if (!xpander) return null;

  const xpanderRows = getCarPriceRows(xpander);
  const maxPromotion = Math.max(0, ...xpanderRows.map((row) => row.promotionValue ?? 0));

  const xpMt = xpander.variants[0];
  const xpAt = xpander.variants.find((variant) => variant.name === "AT");
  const xpPremium = xpander.variants[xpander.variants.length - 1];
  const avanzaMt = avanza.variants[0];
  const avanzaCvt = avanza.variants[avanza.variants.length - 1];
  const spec = xpAt?.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "MPV 7 chỗ", competitor: avanza.specs.type },
    {
      label: "Kích thước D × R × C",
      car: `${spec?.dimensions} (AT Premium cao 1.750 mm)`,
      competitor: avanza.specs.dimensions,
    },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: avanza.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: avanza.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: avanza.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: avanza.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: avanza.specs.torque },
    { label: "Hộp số", car: "Số sàn 5 cấp (MT), tự động 4 cấp (AT, AT Premium)", competitor: avanza.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: avanza.specs.drivetrain },
    { label: "Mâm xe", car: "16 inch (MT, AT), 17 inch (AT Premium)", competitor: avanza.specs.wheels },
    { label: "Túi khí", car: "2 túi khí (MT, AT), 6 túi khí (AT Premium)", competitor: avanza.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xpander-va-toyota-avanza-premio"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-15"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xpander và Toyota Avanza Premio: nên mua MPV 7 chỗ nào?">
          Xpander và Avanza Premio là hai mẫu MPV 7 chỗ giá dưới 700 triệu đồng, được nhiều gia đình
          và người chạy dịch vụ cân nhắc. Hai xe có giá các bản gần nhau nhưng khác về kích thước,
          hộp số và cách chia trang bị an toàn. Bài viết so sánh từng phiên bản để bạn chọn đúng xe.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Xpander</span> dài hơn 200 mm, rộng hơn
              20 mm, chiều dài cơ sở dài hơn và gầm cao hơn (225 mm so với 205 mm). Bản AT Premium (
              {formatMillion(xpPremium.price)} đồng) có 6 túi khí, màn hình 10 inch, kiểm soát hành
              trình, phanh tay điện tử và cảm biến lùi.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Xpander có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Avanza Premio</span> dùng hộp số vô cấp
              CVT; bản CVT ({formatMillion(avanzaCvt.price)} đồng) có 6 túi khí, cảnh báo điểm mù và
              cảnh báo phương tiện cắt ngang phía sau, đèn LED và chìa khóa thông minh.
            </li>
            <li>
              Cùng mức giá {formatMillion(avanzaCvt.price)} đồng, Avanza Premio CVT có nhiều trang bị
              an toàn hơn Xpander AT; muốn đủ 6 túi khí trên Xpander thì chọn bản AT Premium. Xpander
              rộng và gầm cao hơn ở mọi phiên bản.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={xpander} competitor={avanza} />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={xpander.name} competitorName={avanza.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xpander dài 4.595 mm,
                Avanza Premio dài 4.395 mm; chiều dài cơ sở chênh 25 mm (2.775 mm so với 2.750 mm). Xe
                dài hơn thường còn nhiều chỗ để đồ phía sau hàng ghế thứ ba hơn, nhưng nên mở cốp xem
                trực tiếp nếu bạn hay chở đủ 7 người kèm hành lý.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm 225 mm
                của Xpander cao hơn Avanza Premio (205 mm). Cả hai đều đủ cao cho đường phố, đường ngập
                nhẹ và leo lề.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ và hộp số:</span> hai xe cùng
                dùng máy xăng 1.5L, công suất ngang nhau (105 PS của Xpander, 105 mã lực của Avanza
                Premio); mô-men xoắn của Xpander nhỉnh hơn (141 Nm so với 138 Nm). Khác biệt lớn là hộp
                số: Xpander dùng số tự động 4 cấp, Avanza Premio dùng hộp số vô cấp CVT. Nên lái thử cả
                hai để cảm nhận độ mượt khi đi phố.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Xpander ${xpPremium.name}`,
                items: [
                  "6 túi khí, camera lùi, cảm biến lùi",
                  "Cân bằng điện tử, kiểm soát vào cua chủ động AYC, hỗ trợ khởi hành ngang dốc",
                  "Màn hình 10 inch, Apple CarPlay và Android Auto, 6 loa, đồng hồ kỹ thuật số 8 inch",
                  "Kiểm soát hành trình, phanh tay điện tử và Auto Hold",
                  "Đèn LED, đèn và gạt mưa tự động, mâm 17 inch",
                  "Ghế và vô-lăng bọc da, điều hòa chỉnh kỹ thuật số, cửa gió hàng ghế sau",
                ],
              }}
              right={{
                title: `Toyota Avanza Premio ${avanzaCvt.name}`,
                items: [
                  "6 túi khí, camera lùi",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang phía sau",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                  "Màn hình cảm ứng 9 inch",
                  "Đèn LED, chìa khóa thông minh và khởi động nút bấm",
                  "Ghế nỉ, điều hòa chỉnh tay, hàng ghế thứ hai trượt và ngả",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ở bản thấp nhất, Avanza Premio MT ({formatMillion(avanzaMt.price)} đồng) có camera lùi,
              màn hình 9 inch và chìa khóa thông minh; Xpander MT ({formatMillion(xpMt.price)} đồng) có
              màn hình 7 inch và không có camera lùi, đổi lại xe rộng và gầm cao hơn. Ở bản cao nhất,
              Xpander AT Premium đắt hơn Avanza Premio CVT{" "}
              {formatMillion(xpPremium.price - avanzaCvt.price)} đồng nhưng có thêm kiểm soát hành
              trình, phanh tay điện tử, cảm biến lùi, ghế da và màn hình lớn hơn.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xpander nếu bạn",
                items: [
                  "Thường chở đủ 7 người và hành lý, cần xe rộng hơn",
                  "Hay đi đường ngập, leo lề, cần gầm cao 225 mm",
                  "Muốn bản đủ tiện nghi: kiểm soát hành trình, phanh tay điện tử, ghế da",
                  "Muốn tận dụng ưu đãi trong tháng để kéo giá xuống",
                ],
              }}
              right={{
                title: "Chọn Avanza Premio nếu bạn",
                items: [
                  "Ưu tiên 6 túi khí và cảnh báo điểm mù ở mức giá dưới 600 triệu",
                  "Thích hộp số vô cấp CVT",
                  "Chủ yếu đi phố, ít khi chở đủ 7 người",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Nếu muốn MPV phong cách gầm cao hơn, bạn có thể xem bài{" "}
              <Link href="/tu-van/so-sanh-xpander-va-veloz-cross" className="font-semibold text-red-700 underline">
                so sánh Xpander và Toyota Veloz Cross
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe; với Xpander, bạn có thể lái thử tại showroom
              hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xpander} source="So-sanh-Avanza" />
          </section>

          <CarLinkCard car={xpander} />

          <ComparisonSources car={xpander} competitor={avanza} />
        </div>
      </main>
    </>
  );
}
