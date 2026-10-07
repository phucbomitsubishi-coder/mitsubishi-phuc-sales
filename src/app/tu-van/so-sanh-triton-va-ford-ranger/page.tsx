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
  title: "So sánh Mitsubishi Triton và Ford Ranger: nên mua bán tải nào?",
  description:
    "So sánh Mitsubishi Triton và Ford Ranger về giá niêm yết, giá lăn bánh, động cơ, hộp số, hệ dẫn động, trang bị và bảo hành. Gợi ý chọn xe bán tải theo nhu cầu.",
  path: "/tu-van/so-sanh-triton-va-ford-ranger",
});

// Số liệu Ford Ranger nằm ở src/data/competitors.ts
const ranger: CompetitorCar = competitors.fordRanger;

export default function TritonVsRangerPage() {
  const triton = getCarBySlug("mitsubishi-triton");
  if (!triton) return null;

  const tritonRows = getCarPriceRows(triton);
  const maxTritonPromotion = Math.max(0, ...tritonRows.map((row) => row.promotionValue ?? 0));

  // Chênh lệch giá bản thấp nhất và bản cao nhất dùng máy 2.0L/2.4L của hai xe
  const tritonBase = triton.variants[0];
  const tritonTop = triton.variants[triton.variants.length - 1];
  const rangerBase = ranger.variants[0];
  const rangerWildtrak = ranger.variants.find((variant) => variant.name.startsWith("Wildtrak 2.0L"));

  const base = triton.variants[0].specifications;
  const top = tritonTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "Bán tải cỡ trung, 5 chỗ", competitor: ranger.specs.type },
    {
      label: "Kích thước D × R × C",
      car: `${base?.dimensions} (Athlete: ${top?.dimensions})`,
      competitor: ranger.specs.dimensions,
    },
    { label: "Chiều dài cơ sở", car: base?.wheelbase, competitor: ranger.specs.wheelbase },
    {
      label: "Động cơ",
      car: "Dầu 2.4L MIVEC Turbo (Athlete: Bi-Turbo)",
      competitor: ranger.specs.engine,
    },
    {
      label: "Công suất",
      car: `${base?.power} (Athlete: ${top?.power})`,
      competitor: ranger.specs.power,
    },
    {
      label: "Mô-men xoắn",
      car: `${base?.torque} (Athlete: ${top?.torque})`,
      competitor: ranger.specs.torque,
    },
    { label: "Hộp số", car: base?.transmission, competitor: ranger.specs.transmission },
    {
      label: "Dẫn động",
      car: "Cầu sau (2WD) hoặc Super Select 4WD-II (4WD)",
      competitor: ranger.specs.drivetrain,
    },
    { label: "Bảo hành", car: "5 năm hoặc 150.000 km", competitor: ranger.specs.warranty },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Triton và Ford Ranger: nên mua bán tải nào?">
          Ford Ranger đang dẫn đầu doanh số bán tải tại Việt Nam, còn Triton thế hệ mới
          là đối thủ đáng chú ý với động cơ 2.4L và hệ dẫn động Super Select 4WD-II. Bài viết so
          sánh giá, vận hành, trang bị và bảo hành để bạn chọn đúng xe cho công việc và
          gia đình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Triton</span> có giá khởi điểm
              thấp hơn {formatMillion(rangerBase.price - tritonBase.price)} đồng (
              {formatMillion(tritonBase.price)} so với {formatMillion(rangerBase.price)}),
              động cơ 2.4L mạnh hơn máy 2.0L của Ranger ở cùng tầm giá, và trong tháng{" "}
              {promotionMonthLabel} có ưu đãi lên đến {formatMillion(maxTritonPromotion)}{" "}
              đồng.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Ranger</span> có hộp số 10 cấp,
              thân xe dài và rộng hơn, bản tiêu chuẩn XLS được trang bị tiện nghi tốt (màn
              hình 12 inch, điều hòa tự động 2 vùng), có thêm bản Wildtrak V6 3.0L cho
              người cần sức mạnh lớn.
            </li>
            <li>
              Hai xe cùng được bảo hành 5 năm hoặc 150.000 km và cùng tính lệ phí trước bạ
              60% như xe bán tải chở hàng.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={triton}
            competitor={ranger}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Động cơ, hộp số và kích thước</h2>

            <SpecTable carName={triton.name} competitorName={ranger.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> ở tầm giá
                dưới 1 tỷ đồng, Triton dùng máy dầu 2.4L ({base?.power}, {base?.torque}),
                bản Athlete dùng Bi-Turbo ({top?.power}, {top?.torque}). Ranger XLS và
                Wildtrak 2.0L dùng máy 2.0L Turbo (170 PS, 405 Nm). Khi chở nặng hoặc kéo
                thêm rơ-moóc, mô-men xoắn cao hơn của Triton là lợi thế. Nếu cần sức mạnh
                tối đa, Ranger Wildtrak V6 3.0L (250 PS, 600 Nm) vượt trội nhưng giá trên 1
                tỷ đồng.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Hộp số:</span> Ranger dùng
                hộp số tự động 10 cấp cho tất cả phiên bản, chuyển số mượt và giữ vòng tua
                thấp khi chạy đường trường. Triton dùng hộp số tự động 6 cấp, cấu tạo đơn
                giản hơn.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Dẫn động:</span> Triton 4WD
                có hệ Super Select 4WD-II với 7 chế độ lái và khóa vi sai cầu sau, cho phép
                chạy hai cầu cả trên đường nhựa khi trời mưa. Đây là điểm mạnh khi đi công
                trình, đường đồi núi hoặc đường trơn trượt.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> Ranger có
                chiều dài cơ sở 3.270 mm, dài hơn Triton 140 mm, thân xe cũng rộng hơn, nên
                hàng ghế sau thoải mái hơn. Triton gọn hơn, dễ xoay trở trong hẻm và
                đường phố.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị bản tiêu chuẩn</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Phần lớn khách mua bán tải cho công việc chọn bản tiêu chuẩn, nên đây là hai
              phiên bản đáng so sánh nhất.
            </p>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Triton ${tritonBase.name}`,
                items: [
                  "Máy dầu 2.4L, 184 PS, 430 Nm, hộp số tự động 6 cấp",
                  "Màn hình giải trí 8 inch, đồng hồ kỹ thuật số 7 inch",
                  "Kiểm soát hành trình (Cruise Control)",
                  "Camera lùi, túi khí phía trước",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                  "Mâm hợp kim 16 inch",
                ],
              }}
              right={{
                title: `Ford Ranger ${rangerBase.name}`,
                items: [
                  "Máy dầu 2.0L Turbo, 170 PS, 405 Nm, hộp số tự động 10 cấp",
                  "Màn hình 12 inch SYNC 4A, Apple CarPlay và Android Auto không dây",
                  "Điều hòa tự động 2 vùng, cửa gió và cổng sạc cho hàng ghế sau",
                  "Đèn hậu LED, gương chỉnh và gập điện",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ranger XLS được nâng cấp nhiều tiện nghi trong năm 2026 và nhỉnh hơn Triton
              GLX về màn hình và điều hòa. Đổi lại, Triton GLX rẻ hơn{" "}
              {formatMillion(rangerBase.price - tritonBase.price)} đồng và có động cơ mạnh
              hơn. Ở bản cao, Triton {tritonTop.name} có camera 360 độ, 7 túi khí, gói an
              toàn Mitsubishi Motors Safety Sensing (cảnh báo va chạm phía trước, cảnh báo
              điểm mù, hỗ trợ chuyển làn) và kiểm soát vào cua chủ động AYC
              {rangerWildtrak
                ? `, với giá thấp hơn Ranger ${rangerWildtrak.name} ${formatMillion(
                    rangerWildtrak.price - tritonTop.price
                  )} đồng`
                : ""}
              .
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Triton nếu bạn",
                items: [
                  "Muốn giá mua thấp hơn, tận dụng ưu đãi trong tháng",
                  "Thường chở nặng, cần động cơ có mô-men xoắn lớn",
                  "Hay đi công trình, đồi núi, đường trơn, cần hệ dẫn động 4WD linh hoạt",
                  "Cần xe gọn, dễ xoay trở trong phố và hẻm",
                ],
              }}
              right={{
                title: "Chọn Ranger nếu bạn",
                items: [
                  "Ưu tiên hộp số 10 cấp và tiện nghi ở bản tiêu chuẩn",
                  "Cần hàng ghế sau rộng hơn cho gia đình",
                  "Muốn động cơ V6 3.0L (250 PS, 600 Nm) và chấp nhận giá trên 1 tỷ đồng",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Cách chắc chắn nhất là lái thử cả hai xe khi chở hàng hoặc chở đủ người.
              Với Triton, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nơi, kể cả công trình hay xưởng của bạn.
            </p>

            <ComparisonCta car={triton} source="So-sanh-Ranger" />
          </section>

          <CarLinkCard car={triton} />

          <ComparisonSources car={triton} competitor={ranger} />
        </div>
      </main>
    </>
  );
}
