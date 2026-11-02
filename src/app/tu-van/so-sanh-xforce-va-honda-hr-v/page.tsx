import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { comparisonSeo } from "@/lib/comparisonSeo";
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

// Tiêu đề/mô tả tự tính chênh lệch giá (src/lib/comparisonSeo.ts)
const seo = comparisonSeo({ slug: "mitsubishi-xforce", short: "Xforce", rival: "hondaHRV", rivalShort: "HR-V" });

export const metadata: Metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/tu-van/so-sanh-xforce-va-honda-hr-v",
  hasOgImageFile: true,
});

// Số liệu Honda HR-V nằm ở src/data/competitors.ts
const hrv: CompetitorCar = competitors.hondaHRV;

export default function XforceVsHrvPage() {
  const xforce = getCarBySlug("mitsubishi-xforce");
  if (!xforce) return null;

  const xforceRows = getCarPriceRows(xforce);
  const maxPromotion = Math.max(0, ...xforceRows.map((row) => row.promotionValue ?? 0));

  const xforceBase = xforce.variants[0];
  const xforceTop = xforce.variants[xforce.variants.length - 1];
  const hrvBase = hrv.variants[0];
  const hrvL = hrv.variants[1];
  const hrvTop = hrv.variants[hrv.variants.length - 1];
  const spec = xforceTop.specifications;

  const specRows = [
    { label: "Kiểu xe", car: "SUV cỡ B, 5 chỗ", competitor: hrv.specs.type },
    { label: "Kích thước D × R × C", car: spec?.dimensions, competitor: hrv.specs.dimensions },
    { label: "Chiều dài cơ sở", car: spec?.wheelbase, competitor: hrv.specs.wheelbase },
    { label: "Khoảng sáng gầm", car: "219 mm (GLX), 222 mm (Luxury, Ultimate)", competitor: hrv.specs.groundClearance },
    { label: "Động cơ", car: "Xăng 1.5L MIVEC", competitor: hrv.specs.engine },
    { label: "Công suất", car: spec?.power, competitor: hrv.specs.power },
    { label: "Mô-men xoắn", car: spec?.torque, competitor: hrv.specs.torque },
    { label: "Hộp số", car: "Vô cấp CVT", competitor: hrv.specs.transmission },
    { label: "Dẫn động", car: "Cầu trước", competitor: hrv.specs.drivetrain },
    { label: "Mâm xe", car: "17 inch (GLX), 18 inch (Luxury, Ultimate)", competitor: hrv.specs.wheels },
    { label: "Tiêu hao nhiên liệu (kết hợp)", car: "6,30 L/100 km", competitor: hrv.specs.fuelConsumption },
  ];

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/tu-van/so-sanh-xforce-va-honda-hr-v"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        datePublished="2026-11-02"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <ComparisonHero title="So sánh Mitsubishi Xforce và Honda HR-V: nên mua SUV nào?">
          Xforce và HR-V đều là SUV 5 chỗ máy 1.5L, dẫn động cầu trước, hợp gia đình trẻ đi phố. Xforce
          có giá dễ tiếp cận hơn và gầm cao hơn, HR-V có thêm bản hybrid tiết kiệm xăng. Bài viết so sánh
          từng phiên bản để bạn chọn đúng xe theo ngân sách và nhu cầu.
        </ComparisonHero>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          <QuickSummary>
            <li>
              <span className="font-semibold text-gray-900">Giá:</span> Xforce khởi điểm{" "}
              {formatMillion(xforceBase.price)} đồng, thấp hơn HR-V G ({formatMillion(hrvBase.price)} đồng){" "}
              {formatMillion(hrvBase.price - xforceBase.price)} đồng. Bản cao nhất Xforce Ultimate{" "}
              {formatMillion(xforceTop.price)} đồng, HR-V e:HEV RS {formatMillion(hrvTop.price)} đồng.
              {maxPromotion > 0 &&
                ` Tháng ${promotionMonthLabel} Xforce có ưu đãi đến khoảng ${formatMillion(maxPromotion)} đồng.`}
            </li>
            <li>
              <span className="font-semibold text-gray-900">Xforce</span> rộng hơn 20 mm, cao hơn 70 mm, chiều
              dài cơ sở dài hơn 40 mm và gầm cao 219–222 mm (HR-V 190–195 mm).
            </li>
            <li>
              <span className="font-semibold text-gray-900">HR-V</span> máy xăng mạnh hơn (119 mã lực, 145 Nm
              so với 105 PS, 141 Nm) và có bản hybrid e:HEV RS tiêu hao kết hợp 4,44 lít/100 km.
            </li>
          </QuickSummary>

          <PriceComparison heading="1. Giá niêm yết và giá lăn bánh" car={xforce} competitor={hrv} />

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">2. Kích thước, động cơ và hộp số</h2>

            <SpecTable carName={xforce.name} competitorName={hrv.name} rows={specRows} />

            <div className="mt-6 space-y-3 leading-7 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Không gian:</span> Xforce dài 4.390 mm, rộng
                1.810 mm, chiều dài cơ sở 2.650 mm; HR-V dài 4.347 mm (bản RS 4.385 mm), rộng 1.790 mm, chiều
                dài cơ sở 2.610 mm. Hai xe gần ngang nhau về chiều dài, Xforce nhỉnh hơn về chiều rộng và
                chiều cao.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gầm xe:</span> khoảng sáng gầm của Xforce là 219
                mm (GLX) và 222 mm (Luxury, Ultimate), cao hơn HR-V 24–32 mm. Lợi thế này rõ khi đi đường
                ngập mùa mưa, đường quê hoặc lên vỉa hè.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Động cơ, nhiên liệu:</span> bản xăng HR-V mạnh hơn
                Xforce một chút. Bản e:HEV RS dùng hệ hybrid, mô-tơ điện 129 mã lực, 253 Nm, tăng tốc êm và
                tiết kiệm xăng hơn rõ khi đi phố, đổi lại giá cao hơn Xforce Ultimate{" "}
                {formatMillion(hrvTop.price - xforceTop.price)} đồng. Mức tiêu hao kết hợp của Xforce theo công
                bố của Mitsubishi là 6,30 lít/100 km.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">3. Cùng tầm giá 720–750 triệu đồng</h2>
            <TwoColumnLists
              left={{
                title: `Mitsubishi Xforce ${xforceTop.name} (${formatMillion(xforceTop.price)} đồng)`,
                items: [
                  "Gói an toàn chủ động Diamond Sense: cảnh báo và giảm thiểu va chạm phía trước, kiểm soát hành trình thích ứng",
                  "6 túi khí, cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
                  "Camera 360 độ, âm thanh Yamaha 8 loa, cốp điện rảnh tay",
                  "Màn hình giải trí 12,3 inch, đồng hồ kỹ thuật số 8 inch",
                  "Mâm 18 inch, gầm cao 222 mm",
                ],
              }}
              right={{
                title: `Honda HR-V ${hrvL.name} (${formatMillion(hrvL.price)} đồng)`,
                items: [
                  "Máy xăng 1.5L i-VTEC 119 mã lực, hộp số CVT",
                  "Mâm 17 inch, gầm 195 mm",
                  "Gói hỗ trợ lái Honda SENSING (theo thông tin đại lý Honda)",
                ],
              }}
            />
            <p className="mt-4 leading-7 text-gray-700">
              Danh sách trang bị HR-V ở trên chỉ gồm các mục các nguồn ghi giống nhau; bạn nên xem bảng
              thông số tại đại lý Honda trước khi quyết định. Ở tầm khoảng 720–750 triệu đồng, Xforce Ultimate
              rẻ hơn HR-V L {formatMillion(hrvL.price - xforceTop.price)} đồng và là bản cao nhất, nhiều trang bị
              tiện nghi và an toàn.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">4. Nên mua xe nào?</h2>
            <TwoColumnLists
              emphasizeLeft
              left={{
                title: "Chọn Xforce nếu bạn",
                items: [
                  "Muốn SUV 5 chỗ giá dễ tiếp cận, khởi điểm thấp hơn HR-V",
                  "Hay đi đường ngập, đường xấu hoặc về quê, cần gầm cao 222 mm",
                  "Muốn tận dụng ưu đãi tháng và lái thử tận nhà trước khi quyết định",
                ],
              }}
              right={{
                title: "Chọn HR-V nếu bạn",
                items: [
                  "Đi phố nhiều, muốn bản hybrid e:HEV tiết kiệm xăng",
                  "Thích máy xăng mạnh hơn một chút",
                  "Ngân sách thoải mái trên 800 triệu đồng cho bản hybrid",
                ],
              }}
            />

            <p className="mt-6 leading-7 text-gray-700">
              Bạn có thể xem thêm bài{" "}
              <Link href="/tu-van/so-sanh-xforce-va-yaris-cross" className="font-semibold text-red-700 underline">
                so sánh Xforce và Toyota Yaris Cross
              </Link>{" "}
              và{" "}
              <Link href="/tu-van/so-sanh-xforce-va-kia-seltos" className="font-semibold text-red-700 underline">
                so sánh Xforce và Kia Seltos
              </Link>
              . Cách chắc chắn nhất là lái thử cả hai xe trên đoạn đường bạn hay đi; với Xforce, bạn có thể
              lái thử tại showroom hoặc đăng ký để Phúc mang xe đến tận nhà.
            </p>

            <ComparisonCta car={xforce} source="So-sanh-HR-V" />
          </section>

          <CarLinkCard car={xforce} />

          <ComparisonSources car={xforce} competitor={hrv} />
        </div>
      </main>
    </>
  );
}
