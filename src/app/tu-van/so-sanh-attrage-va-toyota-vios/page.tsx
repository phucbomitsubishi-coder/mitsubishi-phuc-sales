import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
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
  title: "So sánh Mitsubishi Attrage và Toyota Vios: nên mua sedan nào?",
  description:
    "So sánh Mitsubishi Attrage và Toyota Vios về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, mức tiêu thụ nhiên liệu và trang bị an toàn. Gợi ý chọn sedan hạng B theo nhu cầu.",
  path: "/tu-van/so-sanh-attrage-va-toyota-vios",
});

// Số liệu Toyota Vios nằm ở src/data/competitors.ts
const vios: CompetitorCar = competitors.toyotaVios;

export default function AttrageVsViosPage() {
  const attrage = getCarBySlug("mitsubishi-attrage");
  if (!attrage) return null;

  const attrageRows = getCarPriceRows(attrage);
  const maxAttragePromotion = Math.max(0, ...attrageRows.map((row) => row.promotionValue ?? 0));

  const attrageBase = attrage.variants[0];
  const attrageTop = attrage.variants[attrage.variants.length - 1];
  const viosBase = vios.variants[0];
  const viosTop = vios.variants[vios.variants.length - 1];
  const spec = attrageTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "Sedan hạng B, 5 chỗ", competitor: vios.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: vios.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: vios.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: vios.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.2L MIVEC, 3 xi-lanh", competitor: vios.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: vios.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: vios.specs.torque },
    {
      label: "Hộp số",
      car: "Số sàn 5 cấp (MT), vô cấp CVT (CVT Premium)",
      competitor: vios.specs.transmission,
    },
    {
      label: "Tiêu thụ nhiên liệu (tổ hợp)",
      car: "5,30 lít/100 km (MT), 5,59 lít/100 km (CVT Premium)",
      competitor: vios.specs.fuelConsumption,
    },
    { label: "Túi khí", car: "2 túi khí", competitor: vios.specs.airbags },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Attrage và Toyota Vios: nên mua sedan nào?">
          Attrage và Vios là hai mẫu sedan hạng B được nhiều người mua xe lần đầu và
          người chạy dịch vụ cân nhắc. Attrage có giá dễ tiếp cận và tiết kiệm nhiên liệu,
          Vios có động cơ lớn hơn và nhiều trang bị an toàn hơn. Bài viết so sánh chi
          tiết để bạn chọn đúng xe cho nhu cầu và ngân sách của mình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Attrage</span> có giá khởi điểm
              thấp hơn {formatMillion(viosBase.price - attrageBase.price)} đồng (
              {formatMillion(attrageBase.price)} so với {formatMillion(viosBase.price)}),
              gầm cao hơn, ít tốn xăng hơn, và trong tháng {promotionMonthLabel} có ưu đãi
              lên đến {formatMillion(maxAttragePromotion)} đồng.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Vios</span> lớn hơn, dùng động
              cơ 1.5L 4 xi-lanh mạnh và êm hơn, bản G có 7 túi khí, cảnh báo tiền va chạm
              và cảnh báo lệch làn.
            </li>
            <li>
              Nếu ưu tiên chi phí mua và chi phí nuôi xe, Attrage có lợi thế. Nếu ưu tiên
              sức mạnh và trang bị an toàn, Vios nhỉnh hơn nhưng giá cao hơn.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={attrage}
            competitor={vios}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước, động cơ và mức tiêu thụ nhiên liệu</h2>

            <SpecTable carName={attrage.name} competitorName={vios.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> Vios dài
                hơn 120 mm và rộng hơn 60 mm, nên cabin và khoang hành lý rộng hơn khi đi
                đủ 5 người. Hai xe có cùng chiều dài cơ sở 2.550 mm, nên chỗ để chân hàng
                ghế sau không chênh lệch nhiều.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe và xoay trở:</span>{" "}
                khoảng sáng gầm của Attrage là 170 mm, cao hơn Vios (133 mm) 37 mm, ít lo
                cạ gầm khi leo lề, qua gờ giảm tốc hoặc đường ngập nhẹ. Bán kính quay vòng
                của Attrage chỉ 4,8 m, dễ quay đầu trong hẻm nhỏ.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Vios dùng máy
                1.5L 4 xi-lanh (106 mã lực, 140 Nm), tăng tốc tốt và êm hơn khi chạy cao
                tốc hoặc chở đủ người. Attrage dùng máy 1.2L 3 xi-lanh (78 PS, 100 Nm),
                đủ dùng trong phố. Đổi lại, xe nhẹ (khoảng 905 kg) nên tiêu thụ trung bình
                khoảng 5,3 lít/100 km theo nhãn năng lượng, thấp hơn Vios.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Attrage ${attrageTop.name}`,
                items: [
                  "Đèn Bi-LED, đèn sương mù LED, gương gập điện",
                  "Ghế và vô-lăng bọc da",
                  "Màn hình cảm ứng 7 inch, Apple CarPlay và Android Auto",
                  "Điều hòa tự động, chìa khóa thông minh, khởi động nút bấm",
                  "Kiểm soát hành trình (Cruise Control)",
                  "2 túi khí, camera lùi",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                ],
              }}
              right={{
                title: `Toyota Vios ${viosTop.name}`,
                items: [
                  "Màn hình cảm ứng 9 inch, Apple CarPlay và Android Auto",
                  "Lẫy chuyển số sau vô-lăng",
                  "7 túi khí",
                  "Cảnh báo tiền va chạm (PCS), cảnh báo lệch làn (LDA)",
                  "Camera lùi, cân bằng điện tử, hỗ trợ khởi hành ngang dốc",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Về an toàn, Vios {viosTop.name} có lợi thế rõ ràng với 7 túi khí và các tính
              năng cảnh báo chủ động. Attrage {attrageTop.name} thắng về tiện nghi trong
              tầm giá (đèn Bi-LED, chìa khóa thông minh, cruise control) và rẻ hơn{" "}
              {formatMillion(viosTop.price - attrageTop.price)} đồng. Ở các bản thấp hơn của
              Vios, số túi khí và trang bị có khác, nên hỏi kỹ đại lý khi so sánh.
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
                  "Chạy dịch vụ, cần xe tiết kiệm nhiên liệu",
                  "Hay đi hẻm nhỏ, leo lề, đường ngập nhẹ, cần gầm cao và xe dễ xoay trở",
                  "Muốn chìa khóa thông minh, cruise control ở mức giá dưới 500 triệu",
                ],
              }}
              right={{
                title: "Chọn Vios nếu bạn",
                items: [
                  "Thường chạy cao tốc, chở đủ người, cần động cơ mạnh hơn",
                  "Ưu tiên 7 túi khí và tính năng an toàn chủ động",
                  "Cần cabin và cốp rộng hơn",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Cách chắc chắn nhất là lái thử cả hai xe trên đoạn đường bạn hay đi. Với
              Attrage, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nhà.
            </p>

            <ComparisonCta car={attrage} source="So-sanh-Vios" />
          </section>

          <CarLinkCard car={attrage} />

          <ComparisonSources car={attrage} competitor={vios} />
        </div>
      </main>
    </>
  );
}
