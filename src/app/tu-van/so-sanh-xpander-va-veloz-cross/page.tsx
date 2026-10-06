import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import { getCarBySlug } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

export const metadata: Metadata = createPageMetadata({
  title: "So sánh Mitsubishi Xpander và Toyota Veloz Cross: nên mua xe nào?",
  description:
    "So sánh Mitsubishi Xpander và Toyota Veloz Cross về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, hộp số và trang bị an toàn. Gợi ý chọn xe 7 chỗ theo nhu cầu.",
  path: "/tu-van/so-sanh-xpander-va-veloz-cross",
});

// Số liệu Toyota Veloz Cross tại Việt Nam, tổng hợp từ VnExpress và Toyota Việt Nam
// (giá niêm yết tháng 10/2026). Khi Toyota đổi giá, cập nhật mảng này và `velozUpdated`.
const velozUpdated = "10/2026";
const velozVariants = [
  { name: "Veloz Cross CVT", price: 638_000_000 },
  { name: "Veloz Cross CVT Top", price: 660_000_000 },
];

const sources = [
  {
    name: "VnExpress – Toyota Veloz Cross: giá lăn bánh, thông số kỹ thuật",
    url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/toyota-veloz-cross-205",
  },
  {
    name: "Toyota Việt Nam – Giá xe Veloz Cross",
    url: "https://www.toyota.com.vn/tin-tuc/thong-tin-bo-tro/gia-xe-veloz-cross-43152",
  },
];

const province =
  provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default function XpanderVsVelozPage() {
  const xpander = getCarBySlug("mitsubishi-xpander");
  if (!xpander) return null;

  const xpanderPromotion = currentPromotion.cars.find(
    (item) => item.carId === xpander.id
  );

  const xpanderRows = xpander.variants.map((variant) => {
    const promotionValue =
      xpanderPromotion?.variants
        .find((item) => item.variantName === variant.name)
        ?.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0) ?? 0;

    return {
      name: variant.name,
      price: variant.price,
      promotionValue,
      onRoadPrice: calculateOnRoadPrice({
        carName: xpander.name,
        price: variant.price,
        seats: variant.specifications?.seats,
        province,
      }).onRoadPrice,
    };
  });

  // Veloz tính lăn bánh theo cùng công thức để so sánh công bằng (không gồm ưu đãi đại lý)
  const velozRows = velozVariants.map((variant) => ({
    ...variant,
    onRoadPrice: calculateOnRoadPrice({
      carName: "Toyota Veloz Cross",
      price: variant.price,
      seats: 7,
      province,
    }).onRoadPrice,
  }));

  const maxXpanderPromotion = Math.max(0, ...xpanderRows.map((row) => row.promotionValue));
  const spec = xpander.variants[xpander.variants.length - 1].specifications;

  const specRows = [
    { label: "Kiểu xe", xpander: "MPV 7 chỗ", veloz: "MPV 7 chỗ" },
    { label: "Kích thước D × R × C", xpander: spec?.dimensions ?? "", veloz: "4.475 × 1.750 × 1.700 mm" },
    { label: "Chiều dài cơ sở", xpander: spec?.wheelbase ?? "", veloz: "2.750 mm" },
    { label: "Khoảng sáng gầm", xpander: spec?.groundClearance ?? "", veloz: "205 mm" },
    { label: "Động cơ", xpander: "Xăng 1.5L MIVEC", veloz: "Xăng 1.5L 2NR-VE" },
    { label: "Công suất", xpander: spec?.power ?? "", veloz: "105 mã lực / 6.000 vòng/phút" },
    { label: "Mô-men xoắn", xpander: spec?.torque ?? "", veloz: "138 Nm / 4.200 vòng/phút" },
    { label: "Hộp số", xpander: "Số sàn 5 cấp (MT), tự động 4 cấp (AT)", veloz: "Vô cấp CVT" },
    { label: "Mâm xe", xpander: "16 inch, 17 inch (AT Premium)", veloz: "16 inch (CVT), 17 inch (CVT Top)" },
    { label: "Túi khí", xpander: "2 túi khí", veloz: "6 túi khí (CVT Top)" },
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* HERO */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
              Tư vấn chọn xe · Cập nhật {promotionMonthLabel}
            </p>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              So sánh Mitsubishi Xpander và Toyota Veloz Cross: nên mua xe nào?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Xpander và Veloz Cross là hai mẫu MPV 7 chỗ được nhiều gia đình và
              người chạy dịch vụ cân nhắc nhất trong tầm giá 570–700 triệu đồng. Bài
              viết so sánh giá, kích thước, vận hành và trang bị an toàn để bạn chọn
              đúng xe cho nhu cầu của mình.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          {/* TÓM TẮT NHANH */}
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold">Tóm tắt nhanh</h2>
            <ul className="mt-4 space-y-2 leading-7 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Xpander</span> giá khởi
                điểm thấp hơn (từ {formatMillion(xpanderRows[0].price)} đồng, có bản số
                sàn), xe dài hơn 120 mm, gầm cao hơn 20 mm và trong tháng{" "}
                {promotionMonthLabel} có ưu đãi lên đến{" "}
                {formatMillion(maxXpanderPromotion)} đồng.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Veloz Cross</span> dùng
                hộp số CVT, bản CVT Top có 6 túi khí, camera 360 độ và gói an toàn
                Toyota Safety Sense.
              </li>
              <li>
                Nếu ưu tiên chi phí và không gian, Xpander có lợi thế. Nếu ưu tiên
                trang bị an toàn chủ động, Veloz Cross CVT Top nhỉnh hơn.
              </li>
            </ul>
          </section>

          {/* GIÁ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">1. Giá niêm yết và giá lăn bánh</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Giá lăn bánh tạm tính cho xe đăng ký tại TP. Hồ Chí Minh (gồm cả Bình
              Dương cũ), dùng cùng một cách tính cho cả hai xe.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <caption className="bg-red-50 px-4 py-3 text-left font-bold text-gray-900">
                    Mitsubishi Xpander
                  </caption>
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-semibold">Phiên bản</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Niêm yết</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Lăn bánh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {xpanderRows.map((row) => (
                      <tr key={row.name}>
                        <th scope="row" className="px-4 py-2.5 font-semibold">
                          {row.name}
                          {row.promotionValue > 0 && (
                            <span className="block text-xs font-normal text-red-700">
                              Ưu đãi {formatMillion(row.promotionValue)}
                            </span>
                          )}
                        </th>
                        <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.price)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.onRoadPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <caption className="bg-gray-100 px-4 py-3 text-left font-bold text-gray-900">
                    Toyota Veloz Cross
                  </caption>
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-semibold">Phiên bản</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Niêm yết</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Lăn bánh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {velozRows.map((row) => (
                      <tr key={row.name}>
                        <th scope="row" className="px-4 py-2.5 font-semibold">{row.name}</th>
                        <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.price)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.onRoadPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Giá Xpander và ưu đãi theo chương trình của Mitsubishi Motors Việt Nam
              tháng {promotionMonthLabel}. Giá Veloz Cross là giá niêm yết tham khảo
              tháng {velozUpdated} (màu trắng ngọc trai cộng thêm 8 triệu đồng), chưa gồm
              ưu đãi của đại lý Toyota. Ưu đãi có thể là hỗ trợ lệ phí trước bạ hoặc quà
              tặng, không phải tiền mặt. Xem giá các mẫu Mitsubishi khác tại{" "}
              <Link href="/bang-gia-xe-mitsubishi" className="font-semibold text-red-700 underline">
                bảng giá xe Mitsubishi
              </Link>
              .
            </p>
          </section>

          {/* THÔNG SỐ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">2. Kích thước và vận hành</h2>

            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Thông số</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Mitsubishi Xpander</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Toyota Veloz Cross</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {specRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="px-4 py-3 font-semibold text-gray-700">
                        {row.label}
                      </th>
                      <td className="px-4 py-3">{row.xpander}</td>
                      <td className="px-4 py-3">{row.veloz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

          {/* TRANG BỊ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold">Mitsubishi Xpander (bản AT Premium)</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-700">
                  <li>Ghế và vô-lăng bọc da, màn hình giải trí cảm ứng</li>
                  <li>Điều hòa tự động, cửa gió cho hàng ghế sau</li>
                  <li>Phanh tay điện tử và Auto Hold, chìa khóa thông minh</li>
                  <li>Đèn LED, gương gập điện, mâm 17 inch</li>
                  <li>2 túi khí, camera lùi, cảm biến đỗ xe</li>
                  <li>Cân bằng điện tử, kiểm soát lực kéo, hỗ trợ khởi hành ngang dốc</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold">Toyota Veloz Cross (bản CVT Top)</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-700">
                  <li>Màn hình 9 inch, Apple CarPlay và Android Auto, sạc không dây</li>
                  <li>Ghế da pha nỉ, hàng ghế có thể gập thành chế độ sofa</li>
                  <li>Phanh tay điện tử và Auto Hold, chìa khóa thông minh</li>
                  <li>6 túi khí, camera 360 độ</li>
                  <li>
                    Toyota Safety Sense: cảnh báo tiền va chạm, cảnh báo lệch làn, đèn pha
                    tự động, cảnh báo phương tiện cắt ngang khi lùi
                  </li>
                  <li>Không có kiểm soát hành trình (cruise control)</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 leading-7 text-gray-700">
              Về an toàn chủ động, Veloz Cross CVT Top có lợi thế rõ ràng với 6 túi khí
              và gói Toyota Safety Sense. Đổi lại, bản này đắt hơn Xpander AT Premium và
              chưa có ưu đãi tương đương. Khi so sánh bản tiêu chuẩn, nên hỏi kỹ số túi
              khí và trang bị an toàn của từng phiên bản.
            </p>
          </section>

          {/* NÊN CHỌN */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên mua xe nào?</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-600 p-5">
                <h3 className="font-bold text-red-700">Chọn Xpander nếu bạn</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700">
                  <li>Muốn chi phí mua xe thấp, tận dụng ưu đãi trong tháng</li>
                  <li>Thường chở đủ 7 người, cần hàng ghế 3 và cốp rộng</li>
                  <li>Hay đi đường ngập, đường quê, cần gầm cao</li>
                  <li>Chạy dịch vụ, cần bản số sàn giá thấp</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-300 p-5">
                <h3 className="font-bold">Chọn Veloz Cross nếu bạn</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700">
                  <li>Ưu tiên 6 túi khí và các tính năng an toàn chủ động</li>
                  <li>Thích hộp số CVT, chủ yếu đi trong phố</li>
                  <li>Cần camera 360 độ, sạc không dây</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 leading-7 text-gray-700">
              Nếu thích kiểu dáng gầm cao, thể thao hơn, bạn có thể xem thêm{" "}
              <Link href="/xe/mitsubishi-xpander-cross" className="font-semibold text-red-700 underline">
                Mitsubishi Xpander Cross
              </Link>
              . Cách chắc chắn nhất vẫn là lái thử cả hai xe khi chở đủ người. Với
              Xpander, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nhà.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dang-ky-lai-thu?xe=xpander&nguon=So-sanh-Veloz"
                className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Đăng ký lái thử Xpander
              </Link>
              <Link
                href="/?car=Mitsubishi%20Xpander&nguon=So-sanh-Veloz#bao-gia"
                className="rounded-lg border border-gray-300 px-6 py-3 font-bold text-gray-900 transition hover:border-red-600 hover:text-red-700"
              >
                Nhận báo giá Xpander
              </Link>
            </div>
          </section>

          {/* ẢNH + LINK XE */}
          <section className="mt-12 grid items-center gap-6 rounded-2xl bg-gray-50 p-6 md:grid-cols-[240px_1fr]">
            <div className="relative h-36">
              <Image
                src={xpander.image}
                alt="Mitsubishi Xpander"
                fill
                sizes="240px"
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Xem chi tiết Mitsubishi Xpander</h2>
              <p className="mt-2 leading-7 text-gray-700">
                Thông số đầy đủ, màu xe, hình ảnh và công cụ tính giá lăn bánh theo 34
                tỉnh, thành.
              </p>
              <Link
                href={`/xe/${xpander.slug}`}
                className="mt-3 inline-block font-semibold text-red-700 underline"
              >
                Đến trang Mitsubishi Xpander →
              </Link>
            </div>
          </section>

          {/* NGUỒN */}
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="text-base font-bold">Nguồn số liệu Toyota Veloz Cross</h2>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline hover:text-red-700"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Thông số Mitsubishi Xpander theo công bố của Mitsubishi Motors Việt Nam.
              Thông số và giá có thể thay đổi, vui lòng liên hệ để được xác nhận.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
