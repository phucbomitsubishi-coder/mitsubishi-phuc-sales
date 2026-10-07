import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cars } from "@/data/cars";
import { getCarPriceRows } from "@/components/CarComparison";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

export const metadata: Metadata = createPageMetadata({
  title: "Nên chọn phiên bản nào? Khác biệt giữa các phiên bản xe Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Lên phiên bản cao hơn được thêm gì, chênh bao nhiêu tiền? So sánh từng phiên bản Xforce, Xpander, Destinator, Triton, Attrage và gợi ý bản nên mua theo nhu cầu.",
  path: "/tu-van/chon-phien-ban-xe-mitsubishi",
  hasOgImageFile: true,
});

// Trang bị từng phiên bản đã đối chiếu với mitsubishi-motors.com.vn (10/2026).
// Giá lấy tự động từ cars.ts theo tên phiên bản; tên không khớp thì build báo lỗi.
type VariantGuide = { name: string; summary: string; adds: string[] };
type CarGuide = { carId: string; variants: VariantGuide[]; advice: ReactNode };

const guides: CarGuide[] = [
  {
    carId: "destinator",
    variants: [
      {
        name: "Premium",
        summary: "Đã đủ dùng cho gia đình",
        adds: [
          "Động cơ 1.5L tăng áp 163 PS, 6 túi khí, kiểm soát vào cua AYC",
          "Cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi, Cruise Control",
          "Màn hình 12,3 inch, đồng hồ kỹ thuật số 8 inch, điều hòa tự động 2 vùng",
          "Ghế da, ghế lái chỉnh điện 6 hướng, camera lùi, cảm biến trước và sau",
        ],
      },
      {
        name: "Ultimate",
        summary: "Thêm gói an toàn chủ động và tiện nghi cao cấp",
        adds: [
          "Diamond Sense: kiểm soát hành trình thích ứng, cảnh báo và giảm thiểu va chạm phía trước, cảnh báo lệch làn, đèn pha tự động",
          "Camera 360 độ, cảm biến áp suất lốp",
          "Âm thanh Yamaha 8 loa, ghế hành khách trước chỉnh điện, lọc không khí nanoe X",
          "Cốp điện rảnh tay, ngoại thất 2 tông màu, kết nối Mitsubishi Connect",
        ],
      },
    ],
    advice: (
      <>
        Bản Premium đã có cảnh báo điểm mù và 6 túi khí, đủ cho phần lớn gia đình. Nên
        lên Ultimate nếu hay đi cao tốc đường dài (kiểm soát hành trình thích ứng, cảnh báo
        va chạm giúp đỡ mệt hơn) hoặc thường đỗ xe chỗ hẹp (camera 360 độ).
      </>
    ),
  },
  {
    carId: "triton",
    variants: [
      {
        name: "2WD AT GLX",
        summary: "Bản cơ bản, một cầu",
        adds: [
          "Máy dầu 2.4L 184 PS, hộp số tự động 6 cấp",
          "3 túi khí, camera lùi, Cruise Control",
          "Màn hình 8 inch, 4 loa, điều hòa chỉnh cơ, ghế nỉ, mâm 16 inch",
        ],
      },
      {
        name: "2WD AT Premium",
        summary: "Một cầu, tiện nghi đầy đủ",
        adds: [
          "7 túi khí, đèn LED, mâm 18 inch",
          "Màn hình 9 inch, 6 loa, điều hòa tự động, chìa khóa thông minh",
          "Ghế da, ghế lái chỉnh điện 8 hướng",
          "Cảm biến trước và sau, cảm biến áp suất lốp",
        ],
      },
      {
        name: "4WD AT Premium",
        summary: "Hai cầu, ưu tiên khả năng vượt địa hình",
        adds: [
          "Super Select 4WD-II, khóa vi sai cầu sau, 7 chế độ lái",
          "Kiểm soát vào cua AYC, hỗ trợ xuống dốc HDC",
          "Giữ 7 túi khí, đèn LED, màn hình 9 inch như bản 2WD Premium",
          "Khác bản 2WD Premium: ghế nỉ, ghế lái chỉnh cơ, không có cảm biến áp suất lốp",
        ],
      },
      {
        name: "4WD AT Athlete",
        summary: "Bản cao nhất, máy mạnh và đủ công nghệ an toàn",
        adds: [
          "Máy Bi-Turbo 204 PS, 470 Nm, trợ lực lái điện",
          "Gói an toàn MMSS: kiểm soát hành trình thích ứng, cảnh báo va chạm phía trước, cảnh báo điểm mù, cảnh báo lệch làn",
          "Camera 360 độ, sạc không dây, gương chống chói tự động",
          "Ghế da phối da lộn, điều hòa tự động 2 vùng",
        ],
      },
    ],
    advice: (
      <>
        Điểm đáng chú ý: <strong>2WD AT Premium và 4WD AT Premium cùng giá</strong>. Chạy
        chủ yếu đường nhựa, cần thoải mái thì chọn 2WD (ghế da, ghế lái chỉnh điện). Hay
        đi đường đất, dốc, ngập thì chọn 4WD. Chở hàng thuần túy, cần giá thấp thì bản GLX
        là đủ.
      </>
    ),
  },
  {
    carId: "xforce",
    variants: [
      {
        name: "GLX",
        summary: "Bản tiêu chuẩn",
        adds: [
          "4 túi khí, kiểm soát vào cua AYC, phanh tay điện tử và Auto Hold",
          "Đèn LED, camera lùi, cảm biến sau",
          "Màn hình 8 inch, 6 loa, ghế nỉ, mâm 17 inch",
        ],
      },
      {
        name: "Luxury",
        summary: "Thêm an toàn và tiện nghi rõ rệt",
        adds: [
          "6 túi khí, cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi",
          "Cruise Control, 4 chế độ lái, cảm biến áp suất lốp",
          "Màn hình 12,3 inch (CarPlay không dây), đồng hồ kỹ thuật số 8 inch",
          "Ghế da, ghế lái chỉnh điện, điều hòa tự động 2 vùng, lọc không khí nanoe X, mâm 18 inch",
        ],
      },
      {
        name: "Ultimate",
        summary: "Bản cao cấp, thêm gói an toàn Diamond Sense",
        adds: [
          "Diamond Sense: kiểm soát hành trình thích ứng, cảnh báo và giảm thiểu va chạm phía trước, đèn pha tự động",
          "Camera 360 độ, âm thanh Yamaha 8 loa",
          "Sạc không dây, cốp điện rảnh tay",
        ],
      },
    ],
    advice: (
      <>
        <strong>Luxury là bản cân bằng</strong>: so với GLX có thêm 2 túi khí, cảnh báo
        điểm mù, Cruise Control, ghế da và màn hình lớn. GLX hợp khi ngân sách sát. Ultimate
        đáng tiền nếu bạn đi cao tốc thường xuyên.
      </>
    ),
  },
  {
    carId: "xpander-cross",
    variants: [
      {
        name: "Xpander Cross",
        summary: "Một phiên bản duy nhất",
        adds: [
          "6 túi khí, kiểm soát vào cua AYC, Cruise Control, phanh tay điện tử và Auto Hold",
          "Thân xe rộng 1.790 mm, ngoại thất kiểu SUV, giá nóc, mâm 17 inch",
          "Màn hình 10 inch, đồng hồ kỹ thuật số 8 inch, ghế da, nội thất 2 tông màu",
        ],
      },
    ],
    advice: (
      <>
        Trang bị gần tương đương Xpander AT Premium; khác biệt chủ yếu ở kiểu dáng SUV và
        thân xe rộng hơn. Nếu không quá đặt nặng kiểu dáng, Xpander AT Premium giúp tiết
        kiệm hơn.
      </>
    ),
  },
  {
    carId: "xpander",
    variants: [
      {
        name: "MT",
        summary: "Số sàn, giá thấp",
        adds: [
          "Động cơ 1.5L, số sàn 5 cấp, 2 túi khí, cân bằng điện tử",
          "Màn hình 7 inch (CarPlay, Android Auto), đèn halogen",
          "Không có camera lùi và chìa khóa thông minh",
        ],
      },
      {
        name: "AT",
        summary: "Số tự động",
        adds: [
          "Hộp số tự động 4 cấp",
          "Camera lùi, chìa khóa thông minh, gương gập điện",
        ],
      },
      {
        name: "AT Premium",
        summary: "Bản đủ trang bị cho gia đình",
        adds: [
          "6 túi khí, kiểm soát vào cua AYC, Cruise Control",
          "Phanh tay điện tử và Auto Hold, gạt mưa tự động",
          "Đèn LED, màn hình 10 inch, đồng hồ kỹ thuật số 8 inch, 6 loa",
          "Ghế da, điều hòa kỹ thuật số, mâm 17 inch",
        ],
      },
    ],
    advice: (
      <>
        Chạy dịch vụ, cần chi phí thấp: <strong>MT</strong>. Xe gia đình: nên cân nhắc lên{" "}
        <strong>AT Premium</strong> vì là bản duy nhất của Xpander có 6 túi khí. Bản AT hợp
        khi cần số tự động nhưng ngân sách không đủ cho AT Premium.
      </>
    ),
  },
  {
    carId: "attrage",
    variants: [
      {
        name: "MT",
        summary: "Số sàn, giá thấp",
        adds: [
          "Động cơ 1.2L, số sàn 5 cấp, 2 túi khí, camera lùi",
          "Màn hình cảm ứng 7 inch, ghế nỉ, đèn halogen",
        ],
      },
      {
        name: "CVT Premium",
        summary: "Số tự động, nhiều tiện nghi",
        adds: [
          "Hộp số CVT, cân bằng điện tử và kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc",
          "Đèn Bi-LED, đèn sương mù LED, tự động bật đèn và gạt mưa",
          "Cruise Control, chìa khóa thông minh, điều hòa tự động",
          "Ghế da, CarPlay và Android Auto, gương gập điện",
        ],
      },
    ],
    advice: (
      <>
        Chạy dịch vụ, đi tỉnh nhiều: <strong>MT</strong> tiết kiệm. Chủ yếu đi phố, kẹt xe:{" "}
        <strong>CVT Premium</strong>, đây cũng là bản duy nhất có cân bằng điện tử.
      </>
    ),
  },
];

export default function MitsubishiVariantGuidePage() {
  const sections = guides.flatMap((guide) => {
    const car = cars.find((item) => item.id === guide.carId);
    if (!car) return [];
    const prices = getCarPriceRows(car);
    const variants = guide.variants.map((variant, index) => {
      const row = prices.find((item) => item.name === variant.name);
      if (!row) {
        throw new Error(`chon-phien-ban: không tìm thấy phiên bản "${variant.name}" của ${car.name} trong cars.ts`);
      }
      const previous = index > 0 ? prices.find((item) => item.name === guide.variants[index - 1].name) : undefined;
      return { ...variant, row, diff: previous ? row.price - previous.price : undefined };
    });
    return [{ car, variants, advice: guide.advice }];
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <PageSchema
        metadata={metadata}
        path="/tu-van/chon-phien-ban-xe-mitsubishi"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        name="Chọn phiên bản xe Mitsubishi"
        datePublished="2026-09-29"
        dateModified="2026-10-07"
        hasOgImage
      />
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <Link
          href="/tu-van"
          className="font-semibold text-red-700 transition hover:text-red-800"
        >
          ← Tư vấn chọn xe
        </Link>

        <p className="mt-8 font-semibold uppercase tracking-wider text-red-700">
          Phiên bản & trang bị · Cập nhật {promotionMonthLabel}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Nên chọn phiên bản nào? Khác biệt giữa các phiên bản xe Mitsubishi
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          Câu hỏi khách hay hỏi sau khi chọn được dòng xe là: lên bản cao hơn thì
          được thêm gì, chênh bao nhiêu tiền, có đáng không? Dưới đây là từng phiên bản của
          6 dòng xe Mitsubishi, xếp từ thấp đến cao. Mỗi bản chỉ liệt kê những gì{" "}
          <strong>có thêm so với bản ngay trước nó</strong>.
        </p>

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Chọn dòng xe">
          {sections.map(({ car }) => (
            <a
              key={car.id}
              href={`#${car.id}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-700"
            >
              {car.name.replace("Mitsubishi ", "")}
            </a>
          ))}
        </nav>

        {sections.map(({ car, variants, advice }) => (
          <section key={car.id} id={car.id} className="mt-12 scroll-mt-24 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold md:text-3xl">{car.name}</h2>

            <div className="mt-6 grid gap-4">
              {variants.map((variant) => (
                <div key={variant.name} className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-bold">
                      {variant.name === car.name.replace("Mitsubishi ", "") ? car.name : variant.name}
                      <span className="ml-2 text-sm font-normal text-gray-600">{variant.summary}</span>
                    </h3>
                    <p className="text-right">
                      <span className="font-bold tabular-nums">{formatMillion(variant.row.price)}</span>
                      {variant.diff !== undefined && (
                        <span className="ml-2 text-sm text-red-700">
                          {variant.diff > 0 ? `+${formatMillion(variant.diff)}` : "cùng giá"}
                        </span>
                      )}
                    </p>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700">
                    {variant.adds.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    Lăn bánh TP.HCM khoảng {formatMillion(variant.row.onRoadPrice)}
                    {(variant.row.promotionValue ?? 0) > 0
                      ? ` · ưu đãi tháng ${promotionMonthLabel}: ${formatMillion(variant.row.promotionValue ?? 0)}`
                      : ""}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-xl bg-gray-50 p-4 leading-7 text-gray-700">
              <span className="font-semibold text-gray-900">Nên chọn bản nào: </span>
              {advice}
            </p>

            <Link
              href={`/xe/${car.slug}`}
              className="mt-4 inline-block font-semibold text-red-700 transition hover:text-red-800"
            >
              Thông số đầy đủ và màu xe {car.name} →
            </Link>
          </section>
        ))}

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">Mẹo chọn phiên bản</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">So sánh theo giá lăn bánh sau ưu đãi.</span>{" "}
              Ưu đãi mỗi tháng khác nhau giữa các phiên bản, nên khoảng chênh thực tế có thể nhỏ
              hơn chênh lệch giá niêm yết. Xem tại{" "}
              <InlineLink href="/bang-gia-xe-mitsubishi">bảng giá xe Mitsubishi</InlineLink>.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Ưu tiên trang bị an toàn.</span>{" "}
              Túi khí, cảnh báo điểm mù, cân bằng điện tử không lắp thêm được sau khi mua, còn
              màn hình, camera hay phim cách nhiệt thì có thể bổ sung sau.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Chưa chọn được dòng xe?</span>{" "}
              Xem <InlineLink href="/tu-van/chon-xe-mitsubishi-phu-hop">chọn xe Mitsubishi theo nhu cầu</InlineLink>{" "}
              hoặc <InlineLink href="/tu-van/chi-phi-lan-banh-mitsubishi">cách tính giá lăn bánh</InlineLink>.
            </li>
          </ul>
        </section>

        <p className="mt-10 text-sm leading-6 text-gray-600">
          Trang bị theo công bố của Mitsubishi Motors Việt Nam, đối chiếu tháng 10/2026. Giá
          lăn bánh tạm tính cho TP. Hồ Chí Minh (gồm Bình Dương cũ), chưa trừ ưu đãi.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Đang phân vân giữa hai phiên bản?</h2>

          <p className="mt-3 leading-7 text-gray-700">
            Gửi cho Phúc hai phiên bản bạn đang cân nhắc, Phúc sẽ gửi bảng so sánh lăn bánh
            sau ưu đãi và đề xuất bản phù hợp nhu cầu.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/?nguon=Chon-phien-ban#bao-gia"
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Nhận báo giá
            </Link>

            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Tư vấn Zalo
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
