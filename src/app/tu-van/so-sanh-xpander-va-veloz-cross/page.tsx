import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
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
  title: "So sánh Mitsubishi Xpander và Toyota Veloz Cross: nên mua xe nào?",
  description:
    "So sánh Mitsubishi Xpander và Toyota Veloz Cross về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, hộp số và trang bị an toàn. Gợi ý chọn xe 7 chỗ theo nhu cầu.",
  path: "/tu-van/so-sanh-xpander-va-veloz-cross",
});

// Số liệu Toyota Veloz Cross nằm ở src/data/competitors.ts
const veloz = competitors.toyotaVelozCross;

export default function XpanderVsVelozPage() {
  const xpander = getCarBySlug("mitsubishi-xpander");
  if (!xpander) return null;

  const xpanderRows = getCarPriceRows(xpander);
  const maxXpanderPromotion = Math.max(0, ...xpanderRows.map((row) => row.promotionValue ?? 0));
  const spec = xpander.variants[xpander.variants.length - 1].specifications;

  const specRows = [
    { label: "Kiểu xe", car: "MPV 7 chỗ", competitor: veloz.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: veloz.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: veloz.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: veloz.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: veloz.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: veloz.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: veloz.specs.torque },
    { label: "Hộp số", car: "Số sàn 5 cấp (MT), tự động 4 cấp (AT)", competitor: veloz.specs.transmission },
    { label: "Mâm xe", car: "16 inch, 17 inch (AT Premium)", competitor: veloz.specs.wheels },
    { label: "Túi khí", car: "2 túi khí", competitor: veloz.specs.airbags },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xpander và Toyota Veloz Cross: nên mua xe nào?">
          Xpander và Veloz Cross là hai mẫu MPV 7 chỗ được nhiều gia đình và người chạy
          dịch vụ cân nhắc nhất trong tầm giá 570–700 triệu đồng. Bài viết so sánh giá,
          kích thước, vận hành và trang bị an toàn để bạn chọn đúng xe cho nhu cầu của
          mình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Xpander</span> giá khởi điểm
              thấp hơn (từ {formatMillion(xpanderRows[0].price)} đồng, có bản số sàn), xe
              dài hơn 120 mm, gầm cao hơn 20 mm và trong tháng {promotionMonthLabel} có ưu
              đãi lên đến {formatMillion(maxXpanderPromotion)} đồng.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Veloz Cross</span> dùng hộp số
              CVT, bản CVT Top có 6 túi khí, camera 360 độ và gói an toàn Toyota Safety
              Sense.
            </li>
            <li>
              Nếu ưu tiên chi phí và không gian, Xpander có lợi thế. Nếu ưu tiên trang bị
              an toàn chủ động, Veloz Cross CVT Top nhỉnh hơn.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={xpander}
            competitor={veloz}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước và vận hành</h2>

            <SpecTable carName={xpander.name} competitorName={veloz.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xpander
                dài 4.595 mm so với 4.475 mm của Veloz Cross, chiều dài cơ sở 2.775 mm so
                với 2.750 mm. Phần chênh lệch này giúp hàng ghế thứ ba và khoang hành lý
                của Xpander rộng rãi hơn khi chở đủ 7 người.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng
                gầm 225 mm của Xpander cao hơn Veloz Cross (205 mm) 20 mm, có lợi khi đi
                đường ngập, đường quê hoặc chở nặng.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ và hộp số:</span>{" "}
                hai xe có công suất bằng nhau (105), Xpander nhỉnh hơn một chút về mô-men
                xoắn (141 Nm so với 138 Nm). Veloz Cross dùng hộp số CVT cho cảm giác tăng
                tốc mượt hơn khi đi phố. Xpander dùng hộp số tự động 4 cấp có cấu tạo đơn
                giản, ngoài ra còn có bản số sàn giá thấp phù hợp chạy dịch vụ.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Xpander (bản AT Premium)",
                items: [
                  "Ghế và vô-lăng bọc da, màn hình giải trí cảm ứng",
                  "Điều hòa tự động, cửa gió cho hàng ghế sau",
                  "Phanh tay điện tử và Auto Hold, chìa khóa thông minh",
                  "Đèn LED, gương gập điện, mâm 17 inch",
                  "2 túi khí, camera lùi, cảm biến đỗ xe",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                ],
              }}
              right={{
                title: "Toyota Veloz Cross (bản CVT Top)",
                items: [
                  "Màn hình 9 inch, Apple CarPlay và Android Auto, sạc không dây",
                  "Ghế da pha nỉ, hàng ghế có thể gập thành chế độ sofa",
                  "Phanh tay điện tử và Auto Hold, chìa khóa thông minh",
                  "6 túi khí, camera 360 độ",
                  "Toyota Safety Sense: cảnh báo tiền va chạm, cảnh báo lệch làn, đèn pha tự động, cảnh báo phương tiện cắt ngang khi lùi",
                  "Không có kiểm soát hành trình (cruise control)",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Về an toàn chủ động, Veloz Cross CVT Top có lợi thế rõ ràng với 6 túi khí
              và gói Toyota Safety Sense. Đổi lại, bản này đắt hơn Xpander AT Premium và
              chưa có ưu đãi tương đương. Khi so sánh bản tiêu chuẩn, nên hỏi kỹ số túi
              khí và trang bị an toàn của từng phiên bản.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xpander nếu bạn",
                items: [
                  "Muốn chi phí mua xe thấp, tận dụng ưu đãi trong tháng",
                  "Thường chở đủ 7 người, cần hàng ghế 3 và cốp rộng",
                  "Hay đi đường ngập, đường quê, cần gầm cao",
                  "Chạy dịch vụ, cần bản số sàn giá thấp",
                ],
              }}
              right={{
                title: "Chọn Veloz Cross nếu bạn",
                items: [
                  "Ưu tiên 6 túi khí và các tính năng an toàn chủ động",
                  "Thích hộp số CVT, chủ yếu đi trong phố",
                  "Cần camera 360 độ, sạc không dây",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Nếu thích kiểu dáng gầm cao, thể thao hơn, bạn có thể xem thêm{" "}
              <Link href="/xe/mitsubishi-xpander-cross" className="font-semibold text-red-700 underline">
                Mitsubishi Xpander Cross
              </Link>
              . Cách chắc chắn nhất vẫn là lái thử cả hai xe khi chở đủ người. Với
              Xpander, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nhà.
            </p>

            <ComparisonCta car={xpander} source="So-sanh-Veloz" />
          </section>

          <CarLinkCard car={xpander} />

          <ComparisonSources car={xpander} competitor={veloz} />
        </div>
      </main>
    </>
  );
}
