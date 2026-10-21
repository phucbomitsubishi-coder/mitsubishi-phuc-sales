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
  title: "So sánh Mitsubishi Destinator và Toyota Innova Cross: nên mua xe nào?",
  description:
    "So sánh Mitsubishi Destinator và Toyota Innova Cross về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ turbo và hybrid, trang bị an toàn. Gợi ý chọn xe gầm cao 7–8 chỗ theo nhu cầu.",
  path: "/tu-van/so-sanh-destinator-va-innova-cross",
  hasOgImageFile: true,
});

// Số liệu Toyota Innova Cross nằm ở src/data/competitors.ts (lấy từ toyota.com.vn, 10/2026)
const innova = competitors.toyotaInnovaCross;

export default function DestinatorVsInnovaCrossPage() {
  const destinator = getCarBySlug("mitsubishi-destinator");
  if (!destinator) return null;

  const destinatorRows = getCarPriceRows(destinator);
  const maxPromotion = Math.max(0, ...destinatorRows.map((row) => row.promotionValue ?? 0));
  const spec = destinator.variants[0].specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV 7 chỗ", competitor: innova.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: innova.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: innova.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: spec?.groundClearance, competitor: innova.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L Turbo MIVEC", competitor: innova.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: innova.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: innova.specs.torque },
    { label: "Hộp số", car: "Vô cấp CVT", competitor: innova.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: innova.specs.drivetrain },
    { label: "Mâm xe", car: "18 inch", competitor: innova.specs.wheels },
    { label: "Tiêu thụ nhiên liệu (kết hợp)", car: spec?.fuelConsumptionCombined, competitor: innova.specs.fuelConsumption },
    { label: "Túi khí", car: "6 túi khí", competitor: innova.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-destinator-va-innova-cross"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-12"
        dateModified="2026-10-12"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Destinator và Toyota Innova Cross: nên mua xe nào?">
          Destinator và Innova Cross là hai mẫu xe gầm cao nhiều chỗ ngồi cùng tầm giá
          730–960 triệu đồng, hướng đến gia đình đông người. Hai xe đi theo hai hướng khác
          nhau: Destinator là SUV động cơ turbo, Innova Cross là MPV có thêm bản hybrid. Bài
          viết so sánh giá, không gian, vận hành và trang bị để bạn chọn đúng xe.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Destinator</span> có gầm cao 214
              mm, động cơ turbo mô-men xoắn 250 Nm từ 2.000 vòng/phút, mâm 18 inch cho cả hai
              phiên bản và bảo hành 5 năm hoặc 150.000 km. Trong tháng {promotionMonthLabel}{" "}
              có ưu đãi lên đến {formatMillion(maxPromotion)} đồng.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Innova Cross</span> dài hơn 75 mm,
              chiều dài cơ sở 2.850 mm, bản 2.0G và 2.0V có 8 chỗ. Bản HEV hybrid tiêu thụ
              khoảng 4,7 lít/100 km và có gói an toàn chủ động đầy đủ.
            </li>
            <li>
              Cần gầm cao, máy khỏe và nhiều trang bị trong tầm dưới 860 triệu thì Destinator
              có lợi thế. Cần 8 chỗ hoặc ưu tiên tiết kiệm xăng tối đa với ngân sách gần 1 tỷ
              thì Innova Cross đáng cân nhắc.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={destinator}
            competitor={innova}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">2. Kích thước và vận hành</h2>

            <SpecTable carName={destinator.name} competitorName={innova.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Innova Cross
                dài 4.755 mm và có chiều dài cơ sở 2.850 mm, nhỉnh hơn Destinator (4.680 mm,
                2.815 mm). Bản 2.0G, 2.0V xếp ghế 8 chỗ nên phù hợp gia đình rất đông người.
                Destinator là 7 chỗ, hai hàng ghế sau đều gập linh hoạt để tăng khoang hành lý.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm
                214 mm của Destinator cao hơn Innova Cross (170 mm, bản HEV 167 mm) khoảng 44
                mm. Đây là chênh lệch đáng kể khi đi đường ngập, đường quê, leo lề hoặc chở đủ
                người và hành lý.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Destinator dùng
                máy 1.5L turbo, mô-men xoắn 250 Nm đạt từ 2.000 vòng/phút nên xe bốc ngay ở
                tua thấp, đặc biệt khi chở đủ 7 người. Innova Cross bản máy xăng 2.0L có công
                suất 172 mã lực nhưng mô-men xoắn 205 Nm phải lên khoảng 4.500 vòng/phút mới
                đạt tối đa.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Tiêu thụ nhiên liệu:</span> theo
                số liệu công bố, Destinator khoảng 7,3 lít/100 km, Innova Cross bản máy xăng
                7,1–7,2 lít/100 km, tương đương nhau. Bản Innova Cross HEV hybrid chỉ khoảng 4,7
                lít/100 km, tiết kiệm hơn rõ rệt nhưng giá cao hơn Destinator Ultimate{" "}
                {formatMillion(innova.variants[2].price - destinatorRows[destinatorRows.length - 1].price)}{" "}
                đồng.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">3. Trang bị và an toàn</h2>
            <p className="mt-3 leading-7 text-gray-700">
              So sánh từng cặp phiên bản có giá gần nhau.
            </p>

            <h3 className="mt-8 text-xl font-bold">
              Destinator Premium ({formatMillion(destinatorRows[0].price)}) và Innova Cross 2.0V (
              {formatMillion(innova.variants[1].price)})
            </h3>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Destinator Premium",
                items: [
                  "Màn hình 12,3 inch, Apple CarPlay và Android Auto, đồng hồ kỹ thuật số 8 inch",
                  "Điều hòa tự động hai vùng, cửa gió cho hàng ghế sau",
                  "Phanh tay điện tử và Auto Hold, kiểm soát hành trình (Cruise Control)",
                  "Mâm 18 inch, khoảng sáng gầm 214 mm",
                  "6 túi khí, camera lùi, cảm biến trước và sau",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Cân bằng điện tử, kiểm soát vào cua chủ động AYC",
                ],
              }}
              right={{
                title: "Toyota Innova Cross 2.0V",
                items: [
                  "Màn hình 10,1 inch, đồng hồ TFT 7 inch",
                  "Ghế lái chỉnh điện 8 hướng, cốp điều khiển điện",
                  "Phanh tay điện tử và giữ phanh tự động, điều hòa tự động",
                  "Mâm 17 inch, 8 chỗ ngồi",
                  "6 túi khí, camera toàn cảnh, 8 cảm biến đỗ xe",
                  "Không có cảnh báo điểm mù và cảnh báo phương tiện cắt ngang khi lùi",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Destinator Premium rẻ hơn Innova Cross 2.0V{" "}
              {formatMillion(innova.variants[1].price - destinatorRows[0].price)} đồng nhưng có
              màn hình lớn hơn, cảnh báo điểm mù và cảnh báo phương tiện cắt ngang. Innova Cross
              2.0V có camera toàn cảnh, cốp điện và thêm một chỗ ngồi.
            </p>

            <h3 className="mt-10 text-xl font-bold">
              Destinator Ultimate ({formatMillion(destinatorRows[destinatorRows.length - 1].price)}) và
              Innova Cross HEV ({formatMillion(innova.variants[2].price)})
            </h3>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Destinator Ultimate",
                items: [
                  "Âm thanh Yamaha 8 loa, đèn viền nội thất 64 màu, lọc không khí nanoe X",
                  "Ghế lái và ghế hành khách trước chỉnh điện, ngoại thất hai tông màu",
                  "Camera 360 độ, cảm biến áp suất lốp",
                  "Cảnh báo và giảm thiểu va chạm phía trước, cảnh báo lệch làn",
                  "Kiểm soát hành trình thích ứng (ACC), đèn pha tự động",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Kết nối xe thông minh Mitsubishi Connect",
                ],
              }}
              right={{
                title: "Toyota Innova Cross HEV",
                items: [
                  "Động cơ hybrid, khoảng 4,7 lít/100 km",
                  "Cửa sổ trời toàn cảnh, cốp điện, ghế lái chỉnh điện 8 hướng",
                  "Màn hình 10,1 inch, mâm 18 inch, 7 chỗ ngồi",
                  "Camera toàn cảnh",
                  "Cảnh báo tiền va chạm, cảnh báo chệch làn, hỗ trợ giữ làn",
                  "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ở bản cao nhất, hai xe đều có gói an toàn chủ động. Innova Cross HEV có thêm hỗ trợ
              giữ làn, cửa sổ trời và tiết kiệm nhiên liệu nhờ hybrid. Destinator Ultimate có
              kiểm soát hành trình thích ứng, âm thanh Yamaha, gầm cao hơn và giá thấp hơn khoảng{" "}
              {formatMillion(innova.variants[2].price - destinatorRows[destinatorRows.length - 1].price)}{" "}
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
                  "Thích kiểu dáng SUV, cần gầm cao để đi đường ngập, đường quê",
                  "Thường chở đủ người và hành lý, cần máy turbo bốc ở tua thấp",
                  "Muốn nhiều trang bị an toàn trong tầm giá dưới 860 triệu",
                  "Ưu tiên bảo hành 5 năm hoặc 150.000 km",
                  "Muốn tận dụng ưu đãi trong tháng",
                ],
              }}
              right={{
                title: "Chọn Innova Cross nếu bạn",
                items: [
                  "Cần xe 8 chỗ (bản 2.0G, 2.0V)",
                  "Đi nhiều trong phố và muốn tiết kiệm xăng tối đa (bản HEV)",
                  "Cần cửa sổ trời, hỗ trợ giữ làn và có ngân sách gần 1 tỷ",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Nếu ngân sách thấp hơn và không cần gầm SUV, bạn có thể xem thêm{" "}
              <Link href="/xe/mitsubishi-xpander-cross" className="font-semibold text-red-700 underline">
                Mitsubishi Xpander Cross
              </Link>{" "}
              (7 chỗ, gầm cao) hoặc bài{" "}
              <Link href="/tu-van/chon-phien-ban-xe-mitsubishi" className="font-semibold text-red-700 underline">
                nên chọn phiên bản Destinator nào
              </Link>
              . Cách chắc chắn nhất vẫn là lái thử khi chở đủ người. Với Destinator, bạn có thể
              lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={destinator} source="So-sanh-Innova-Cross" />
          </section>

          <CarLinkCard car={destinator} />

          <ComparisonSources car={destinator} competitor={innova} />
        </div>
      </main>
    </>
  );
}
