import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { promotionMonthLabel } from "@/lib/promotionItems";
import {
  CarLinkCard,
  ComparisonCta,
  ComparisonHero,
  ComparisonSources,
  PriceComparison,
  QuickSummary,
  SpecTable,
  TwoColumnLists,
} from "@/components/CarComparison";

export const metadata: Metadata = createPageMetadata({
  title: "So sánh Mitsubishi Xforce và Hyundai Creta: nên chọn xe nào?",
  description:
    "So sánh Mitsubishi Xforce và Hyundai Creta về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ và trang bị. Gợi ý nên chọn xe nào theo nhu cầu.",
  path: "/tu-van/so-sanh-xforce-va-creta",
});

// Số liệu Hyundai Creta nằm ở src/data/competitors.ts
const creta = competitors.hyundaiCreta;

export default function XforceVsCretaPage() {
  const xforce = getCarBySlug("mitsubishi-xforce");
  if (!xforce) return null;

  const glx = xforce.variants[0].specifications;
  const top = xforce.variants[xforce.variants.length - 1].specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV cỡ B, 5 chỗ", competitor: creta.specs.type },
    { label: "Kích thước D × R × C", car: glx?.dimensions, competitor: creta.specs.dimensions },
    { label: "Chiều dài cơ sở", car: glx?.wheelbase, competitor: creta.specs.wheelbase },
    {
      label: "Khoảng sáng gầm",
      car: `${glx?.groundClearance} (GLX) – ${top?.groundClearance}`,
      competitor: creta.specs.groundClearance,
    },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: creta.specs.engine },
    { label: "Công suất", car: glx?.power, competitor: creta.specs.power },
    { label: "Mô-men xoắn", car: glx?.torque, competitor: creta.specs.torque },
    { label: "Hộp số, dẫn động", car: "CVT, cầu trước", competitor: creta.specs.transmission },
    { label: "Mâm xe", car: "17 inch (GLX), 18 inch (Luxury, Ultimate)", competitor: creta.specs.wheels },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xforce và Hyundai Creta: nên chọn xe nào?">
          Xforce và Creta là hai mẫu SUV cỡ B 5 chỗ, cùng dùng máy xăng 1.5L, hộp số vô
          cấp và có giá trong khoảng 600–720 triệu đồng. Bài viết so sánh giá, kích thước,
          vận hành và trang bị để bạn chọn đúng xe cho nhu cầu của mình.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Xforce</span> lớn hơn (dài hơn
              60 mm, trục cơ sở dài hơn 40 mm) và gầm cao hơn khoảng 20 mm, trong tháng{" "}
              {promotionMonthLabel} có ưu đãi tương đương 100% lệ phí trước bạ.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Creta</span> có động cơ mạnh
              hơn một chút (115 mã lực so với 105 PS) và có thêm bản thể thao N Line.
            </li>
            <li>
              Giá niêm yết hai xe gần như ngang nhau ở từng mức phiên bản, nên khác biệt
              chính nằm ở ưu đãi, kích thước và trang bị.
            </li>
          </QuickSummary>

          <PriceComparison
            heading="1. Giá niêm yết và giá lăn bánh"
            car={xforce}
            competitor={creta}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước và vận hành</h2>

            <SpecTable carName={xforce.name} competitorName={creta.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xforce
                dài và rộng hơn, chiều dài cơ sở 2.650 mm so với 2.610 mm của Creta, nên
                hàng ghế sau và khoang hành lý có lợi thế hơn khi chở đủ 5 người.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng
                gầm 219–222 mm của Xforce cao hơn Creta (200 mm) khoảng 20 mm, có lợi
                khi đi đường ngập nhẹ, ổ gà hoặc leo lề. Mức 200 mm của Creta vẫn đủ
                dùng cho đường phố.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Creta nhỉnh
                hơn về công suất và mô-men xoắn, có lợi khi chở đủ tải hoặc vượt xe trên
                cao tốc. Xforce bù lại bằng hệ thống kiểm soát vào cua chủ động AYC và 4
                chế độ lái (bản Ultimate), giúp xe ổn định khi vào cua và đi đường trơn.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <TwoColumnLists
              left={{
                title: "Mitsubishi Xforce (bản Ultimate)",
                items: [
                  "Màn hình giải trí 12,3 inch, đồng hồ kỹ thuật số 8 inch",
                  "Âm thanh Dynamic Sound Yamaha Premium 8 loa",
                  "Điều hòa tự động 2 vùng, ghế lái chỉnh điện, cốp điện rảnh tay",
                  "6 túi khí, camera 360 độ",
                  "Gói Diamond Sense: kiểm soát hành trình thích ứng, cảnh báo và giảm thiểu va chạm phía trước, cảnh báo điểm mù, hỗ trợ chuyển làn, cảnh báo phương tiện cắt ngang khi lùi, đèn pha tự động",
                ],
              }}
              right={{
                title: "Hyundai Creta (các bản cao)",
                items: [
                  "Cụm màn hình đôi 10,25 inch",
                  "Âm thanh Bose 8 loa",
                  "Ghế trước thông gió, sạc không dây, khởi động từ xa",
                  "Camera 360 độ",
                  "Gói Hyundai SmartSense: kiểm soát hành trình thích ứng, phòng tránh va chạm, cảnh báo điểm mù, giữ làn, cảnh báo mở cửa an toàn",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ở bản cao nhất, hai xe có danh sách trang bị an toàn chủ động tương
              đương. Creta có thêm ghế thông gió và sạc không dây, Xforce có màn hình
              giải trí lớn hơn và cốp điện. Ở bản tiêu chuẩn, nên xem kỹ từng xe vì trang
              bị giữa các phiên bản chênh lệch khá nhiều.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên chọn xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xforce nếu bạn",
                items: [
                  "Thường chở đủ 5 người hoặc cần khoang hành lý rộng",
                  "Hay đi đường ngập, đường xấu, cần gầm cao",
                  "Muốn tận dụng ưu đãi trước bạ đang có trong tháng",
                  "Thích âm thanh Yamaha và màn hình giải trí lớn",
                ],
              }}
              right={{
                title: "Chọn Creta nếu bạn",
                items: [
                  "Ưu tiên động cơ mạnh hơn một chút",
                  "Cần ghế thông gió, sạc không dây",
                  "Thích phong cách thể thao của bản N Line",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Cách chắc chắn nhất là lái thử cả hai xe trên cùng một cung đường. Với
              Xforce, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nhà.
            </p>

            <ComparisonCta car={xforce} source="So-sanh-Creta" />
          </section>

          <CarLinkCard car={xforce} />

          <ComparisonSources car={xforce} competitor={creta} />
        </div>
      </main>
    </>
  );
}
