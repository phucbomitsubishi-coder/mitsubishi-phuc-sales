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
  title: "So sánh Mitsubishi Xpander Cross và Suzuki XL7 Hybrid: nên mua xe nào?",
  description:
    "So sánh Mitsubishi Xpander Cross và Suzuki XL7 Hybrid về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, mức tiêu thụ nhiên liệu và trang bị. Gợi ý chọn xe 7 chỗ phong cách SUV.",
  path: "/tu-van/so-sanh-xpander-cross-va-suzuki-xl7",
  hasOgImageFile: true,
});

// Số liệu Suzuki XL7 nằm ở src/data/competitors.ts
const xl7 = competitors.suzukiXL7;

export default function XpanderCrossVsXL7Page() {
  const cross = getCarBySlug("mitsubishi-xpander-cross");
  if (!cross) return null;

  const crossRows = getCarPriceRows(cross);
  const promotion = crossRows[0].promotionValue ?? 0;
  const priceGap = crossRows[0].price - xl7.variants[0].price;
  const spec = cross.variants[0].specifications;

  const specRows = [
    { label: "Kiểu xe", car: "MPV phong cách SUV, 7 chỗ", competitor: xl7.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: xl7.specs.dimensions },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: xl7.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: xl7.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: xl7.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: xl7.specs.torque },
    { label: "Hộp số", car: "Tự động 4 cấp", competitor: xl7.specs.transmission },
    { label: "Mâm xe", car: "17 inch", competitor: xl7.specs.wheels },
    { label: "Tiêu thụ nhiên liệu (kết hợp)", car: spec?.fuelConsumptionCombined, competitor: xl7.specs.fuelConsumption },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xpander-cross-va-suzuki-xl7"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-12"
        dateModified="2026-10-12"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xpander Cross và Suzuki XL7 Hybrid: nên mua xe nào?">
          Xpander Cross và XL7 Hybrid đều là xe 7 chỗ khoác dáng SUV, hướng đến gia đình muốn
          một chiếc xe rộng, gầm cao nhưng chi phí vừa phải. XL7 có giá thấp hơn và công nghệ
          hybrid nhẹ, Xpander Cross lớn hơn và gầm cao hơn. Bài viết so sánh chi tiết để bạn
          chọn đúng xe.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Xpander Cross</span> dài hơn 145 mm,
              khoảng sáng gầm 225 mm (cao hơn XL7 25 mm), mâm 17 inch, có phanh tay điện tử, Auto
              Hold và kiểm soát vào cua AYC.
              {promotion > 0 && ` Tháng ${promotionMonthLabel} có ưu đãi khoảng ${formatMillion(promotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">XL7 Hybrid</span> giá niêm yết thấp hơn{" "}
              {formatMillion(priceGap)} đồng, hệ thống hybrid nhẹ giúp mức tiêu thụ khoảng 5,9
              lít/100 km, có Apple CarPlay và Android Auto không dây.
            </li>
            <li>
              Ưu tiên chi phí mua và tiền xăng thì XL7 có lợi thế. Ưu tiên không gian, gầm cao và
              trang bị vận hành thì Xpander Cross nhỉnh hơn. Cả hai hãng thường có ưu đãi theo
              tháng, nên hãy so sánh giá sau ưu đãi khi nhận báo giá.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={cross}
            competitor={xl7}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước và vận hành</h2>

            <SpecTable carName={cross.name} competitorName={xl7.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xpander Cross dài
                4.595 mm, rộng 1.790 mm, lớn hơn XL7 (4.450 × 1.775 mm). Phần thân dài hơn 145 mm
                giúp hàng ghế thứ ba và khoang hành lý của Xpander Cross rộng rãi hơn khi chở đủ 7
                người.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm 225 mm
                của Xpander Cross cao hơn XL7 (200 mm), thuận lợi hơn khi đi đường ngập, đường quê
                hoặc lên xuống lề.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> hai xe đều dùng máy
                xăng 1.5L và hộp số tự động 4 cấp, công suất tương đương (105 PS so với 103 mã lực).
                Điểm khác là XL7 có hệ thống hybrid nhẹ: máy phát khởi động hỗ trợ động cơ khi tăng
                tốc và tắt máy tạm thời khi dừng, nhờ đó tiêu thụ khoảng 5,9 lít/100 km so với 7,23
                lít/100 km của Xpander Cross (số liệu hãng công bố, chu trình kết hợp).
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị</h2>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Xpander Cross",
                items: [
                  "Màn hình 10 inch, Apple CarPlay và Android Auto, đồng hồ kỹ thuật số 8 inch",
                  "Phanh tay điện tử và Auto Hold, chìa khóa thông minh",
                  "Kiểm soát hành trình (Cruise Control), gạt mưa và đèn tự động",
                  "Ghế da, cửa gió điều hòa cho hàng ghế sau",
                  "Đèn LED, đèn sương mù LED, mâm 17 inch",
                  "6 túi khí, camera lùi",
                  "Cân bằng điện tử, kiểm soát lực kéo, kiểm soát vào cua chủ động AYC",
                ],
              }}
              right={{
                title: "Suzuki XL7 Hybrid",
                items: [
                  "Màn hình 10 inch, Apple CarPlay và Android Auto không dây, 6 loa",
                  "Kiểm soát hành trình (Cruise Control)",
                  "Đèn pha LED, đèn tự động bật/tắt, gương gập tự động",
                  "Khóa ghế trẻ em ISOFIX",
                  "Hệ thống hybrid nhẹ, tiết kiệm nhiên liệu",
                  "Mâm 16 inch, xe nhập khẩu từ Indonesia",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Hai xe có trang bị tiện nghi tương đối giống nhau ở màn hình 10 inch và kiểm soát
              hành trình. Xpander Cross có thêm phanh tay điện tử, Auto Hold và kiểm soát vào cua
              AYC; XL7 có kết nối điện thoại không dây. Số túi khí của XL7 các nguồn ghi chưa thống
              nhất, bạn nên hỏi rõ đại lý Suzuki khi so sánh mức an toàn.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xpander Cross nếu bạn",
                items: [
                  "Thường chở đủ 7 người và hành lý, cần xe dài, rộng hơn",
                  "Hay đi đường ngập, đường quê, cần gầm cao 225 mm",
                  "Muốn có phanh tay điện tử, Auto Hold, kiểm soát vào cua AYC",
                  "Muốn tận dụng ưu đãi trong tháng để kéo giá xuống",
                ],
              }}
              right={{
                title: "Chọn XL7 Hybrid nếu bạn",
                items: [
                  "Ưu tiên giá niêm yết thấp hơn",
                  "Đi phố nhiều, muốn tiết kiệm xăng nhờ hybrid nhẹ",
                  "Thích kết nối Apple CarPlay, Android Auto không dây",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Nếu cần xe 7 chỗ giá thấp hơn nữa, bạn có thể xem{" "}
              <Link href="/xe/mitsubishi-xpander" className="font-semibold text-red-700 underline">
                Mitsubishi Xpander
              </Link>{" "}
              (có bản số sàn), hoặc so sánh{" "}
              <Link href="/tu-van/so-sanh-xpander-va-veloz-cross" className="font-semibold text-red-700 underline">
                Xpander và Toyota Veloz Cross
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe khi chở đủ người; với Xpander Cross, bạn có
              thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={cross} source="So-sanh-XL7" />
          </section>

          <CarLinkCard car={cross} />

          <ComparisonSources car={cross} competitor={xl7} />
        </div>
      </main>
    </>
  );
}
