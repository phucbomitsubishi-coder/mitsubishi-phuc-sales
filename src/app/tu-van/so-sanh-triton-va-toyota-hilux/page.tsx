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
  title: "So sánh Mitsubishi Triton và Toyota Hilux: nên mua bán tải nào?",
  description:
    "So sánh Mitsubishi Triton và Toyota Hilux về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ dầu, hộp số, hệ dẫn động 4WD và trang bị an toàn từng phiên bản. Gợi ý chọn bán tải theo nhu cầu.",
  path: "/tu-van/so-sanh-triton-va-toyota-hilux",
  hasOgImageFile: true,
});

// Số liệu Toyota Hilux nằm ở src/data/competitors.ts
const hilux: CompetitorCar = competitors.toyotaHilux;

export default function TritonVsHiluxPage() {
  const triton = getCarBySlug("mitsubishi-triton");
  if (!triton) return null;

  const tritonRows = getCarPriceRows(triton);
  const maxPromotion = Math.max(0, ...tritonRows.map((row) => row.promotionValue ?? 0));

  const glx = triton.variants[0];
  const athlete = triton.variants[triton.variants.length - 1];
  const tritonPremium4wd = triton.variants.find((variant) => variant.name === "4WD AT Premium");
  const hiluxStandard = hilux.variants[0];
  const hiluxPro = hilux.variants[1];
  const hiluxTop = hilux.variants[hilux.variants.length - 1];

  const base = glx.specifications;
  const top = athlete.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "Bán tải cỡ trung, 5 chỗ", competitor: hilux.specs.type },
    {
      label: "Kích thước D × R × C",
      car: `${base?.dimensions} (Athlete: ${top?.dimensions})`,
      competitor: hilux.specs.dimensions,
    },
    { label: "Chiều dài cơ sở", car: base?.wheelbase, competitor: hilux.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: base?.groundClearance, competitor: hilux.specs.groundClearance },
    {
      label: "Động cơ",
      car: "Dầu 2.4L MIVEC Turbo (Athlete: Bi-Turbo)",
      competitor: hilux.specs.engine,
    },
    { label: "Công suất", car: `${base?.power} (Athlete: ${top?.power})`, competitor: hilux.specs.power },
    { label: "Mô-men xoắn", car: `${base?.torque} (Athlete: ${top?.torque})`, competitor: hilux.specs.torque },
    { label: "Hộp số", car: "Tự động 6 cấp (mọi phiên bản)", competitor: hilux.specs.transmission },
    {
      label: "Dẫn động",
      car: "Cầu sau (2WD) hoặc Super Select 4WD-II (4WD)",
      competitor: hilux.specs.drivetrain,
    },
    { label: "Mâm xe", car: "16 inch (GLX), 18 inch (các bản còn lại)", competitor: hilux.specs.wheels },
    { label: "Túi khí", car: "3 túi khí (GLX), 7 túi khí (các bản còn lại)", competitor: hilux.specs.airbags },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-triton-va-toyota-hilux"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-10-15"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Triton và Toyota Hilux: nên mua bán tải nào?">
          Triton và Hilux là hai mẫu bán tải Nhật được nhiều người chọn để vừa chở hàng vừa đi gia
          đình. Hilux thế hệ mới dùng máy dầu 2.8L và có khoảng sáng gầm 312 mm, Triton có hộp số
          tự động từ bản thấp nhất và nhiều túi khí hơn ở tầm giá giữa. Bài viết so sánh từng phiên
          bản để bạn chọn đúng xe.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Triton</span> có hộp số tự động 6 cấp
              ngay từ bản GLX ({formatMillion(glx.price)} đồng), trong khi bản số tự động rẻ nhất của
              Hilux là Pro ({formatMillion(hiluxPro.price)} đồng). Các bản Premium và Athlete có 7
              túi khí; bản 4WD Premium ({formatMillion(tritonPremium4wd?.price ?? 0)} đồng) đã có hai
              cầu, khóa vi sai cầu sau và 7 chế độ lái địa hình.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Triton có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Hilux</span> có động cơ dầu 2.8L lớn hơn
              (201 mã lực, 500 Nm ở bản số tự động) và khoảng sáng gầm 312 mm. Bản Standard số sàn có
              giá khởi điểm {formatMillion(hiluxStandard.price)} đồng.
            </li>
            <li>
              Ở bản cao nhất, Triton Athlete ({formatMillion(athlete.price)} đồng) và Hilux
              Trailhunter ({formatMillion(hiluxTop.price)} đồng) đều có camera 360 độ, kiểm soát hành
              trình thích ứng và gói cảnh báo va chạm, điểm mù, lệch làn.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={triton} competitor={hilux} />

          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước, động cơ và hệ dẫn động</h2>

            <SpecTable carName={triton.name} competitorName={hilux.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Kích thước:</span> hai xe dài bằng nhau
                (5.320 mm ở các bản thường). Triton có chiều dài cơ sở 3.130 mm, dài hơn Hilux 45 mm,
                nên hàng ghế sau rộng chân hơn một chút. Hilux có khoảng sáng gầm 312 mm theo công bố
                của Toyota, cao hơn Triton (222 mm), có lợi khi lội nước hoặc đi đường đất nhiều ổ gà.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ:</span> Hilux dùng máy dầu 2.8L
                201 mã lực; bản số tự động có mô-men xoắn 500 Nm, bản số sàn 420 Nm. Triton dùng máy dầu
                2.4L 184 PS, 430 Nm; riêng Athlete có máy Bi-Turbo 204 PS, 470 Nm. Khi chở nặng hoặc
                kéo thùng, máy lớn của Hilux có lợi thế; Triton dung tích nhỏ hơn, phù hợp người chủ
                yếu chạy phố và đường trường.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Hộp số và hai cầu:</span> mọi bản Triton
                dùng hộp số tự động 6 cấp, Hilux Standard là số sàn 6 cấp. Muốn có hai cầu, Triton có
                bản 4WD Premium và Athlete với hệ Super Select 4WD-II (đi được hai cầu trên đường nhựa,
                có khóa vi sai cầu sau); Hilux chỉ có hai cầu bán thời gian ở bản Trailhunter.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn ở tầm giá giữa</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Triton ${tritonPremium4wd?.name ?? "4WD AT Premium"}`,
                items: [
                  "Hai cầu Super Select 4WD-II, khóa vi sai cầu sau, 7 chế độ lái địa hình",
                  "Hỗ trợ đổ đèo (HDC), kiểm soát vào cua chủ động (AYC)",
                  "7 túi khí, camera lùi, cảm biến trước và sau",
                  "Đèn LED projector, đèn sương mù LED, đèn và gạt mưa tự động",
                  "Màn hình 9 inch, Apple CarPlay và Android Auto, 6 loa",
                  "Điều hòa tự động, chìa khóa thông minh, kiểm soát hành trình",
                ],
              }}
              right={{
                title: `Toyota Hilux ${hiluxPro.name}`,
                items: [
                  "Cầu sau, hộp số tự động 6 cấp, máy 2.8L 500 Nm",
                  "3 túi khí (hai túi khí trước và túi khí đầu gối người lái)",
                  "Camera lùi, cảm biến góc trước, góc sau và phía sau",
                  "Đèn LED projector, đèn sương mù LED, đèn tự động",
                  "Màn hình 9 inch, 8 loa, sạc không dây, kiểm soát hành trình",
                  "Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Ở tầm giá 700–800 triệu đồng, Triton 4WD Premium có hai cầu và 7 túi khí, còn Hilux Pro
              là bản cầu sau nhưng có máy lớn hơn, 8 loa và sạc không dây. Nếu cần một cầu và chủ yếu
              đi phố, có thể so thêm Triton 2WD AT Premium (ghế da, ghế lái chỉnh điện 8 hướng, cảm
              biến áp suất lốp).
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Triton nếu bạn",
                items: [
                  "Muốn số tự động với giá khởi điểm hợp lý",
                  "Cần hai cầu, khóa vi sai và nhiều túi khí ở tầm giá dưới 800 triệu",
                  "Hay chở gia đình, cần hàng ghế sau rộng chân",
                  "Muốn tận dụng ưu đãi trong tháng để kéo giá xuống",
                ],
              }}
              right={{
                title: "Chọn Hilux nếu bạn",
                items: [
                  "Thường chở nặng, kéo thùng, cần máy 2.8L mô-men xoắn lớn",
                  "Hay đi đường ngập, đường đất, cần gầm 312 mm",
                  "Chấp nhận số sàn ở bản rẻ nhất hoặc giá cao hơn cho bản số tự động",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-triton-va-ford-ranger" className="font-semibold text-red-700 underline">
                so sánh Triton và Ford Ranger
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe, nếu được thì chở theo tải bạn hay chở. Với
              Triton, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={triton} source="So-sanh-Hilux" />
          </section>

          <CarLinkCard car={triton} />

          <ComparisonSources car={triton} competitor={hilux} />
        </div>
      </main>
    </>
  );
}
