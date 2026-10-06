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
  title: "So sánh Mitsubishi Xforce và Hyundai Creta: nên chọn xe nào?",
  description:
    "So sánh Mitsubishi Xforce và Hyundai Creta về giá niêm yết, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ và trang bị. Gợi ý nên chọn xe nào theo nhu cầu.",
  path: "/tu-van/so-sanh-xforce-va-creta",
});

// Số liệu Hyundai Creta tại Việt Nam, tổng hợp từ VnExpress (giá niêm yết tháng 9/2026)
// và trang đại lý Hyundai. Khi Hyundai đổi giá, cập nhật mảng này và `cretaUpdated`.
const cretaUpdated = "09/2026";
const cretaVariants = [
  { name: "1.5 Tiêu chuẩn", price: 599_000_000 },
  { name: "1.5 Đặc biệt", price: 659_000_000 },
  { name: "1.5 Cao cấp", price: 705_000_000 },
  { name: "1.5 N Line", price: 715_000_000 },
];

const sources = [
  {
    name: "VnExpress – Hyundai Creta: giá lăn bánh, thông số kỹ thuật",
    url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/hyundai-creta-204",
  },
  {
    name: "Hyundai City – New Hyundai Creta 2026: giá và thông số",
    url: "https://hyundaicity.com.vn/hyundai-creta",
  },
];

const province =
  provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

export default function XforceVsCretaPage() {
  const xforce = getCarBySlug("mitsubishi-xforce");
  if (!xforce) return null;

  const xforcePromotion = currentPromotion.cars.find(
    (item) => item.carId === xforce.id
  );

  const xforceRows = xforce.variants.map((variant) => {
    const promotionValue =
      xforcePromotion?.variants
        .find((item) => item.variantName === variant.name)
        ?.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0) ?? 0;

    return {
      name: variant.name,
      price: variant.price,
      promotionValue,
      onRoadPrice: calculateOnRoadPrice({
        carName: xforce.name,
        price: variant.price,
        seats: variant.specifications?.seats,
        province,
      }).onRoadPrice,
    };
  });

  // Creta tính lăn bánh theo cùng công thức để so sánh công bằng (không gồm ưu đãi đại lý)
  const cretaRows = cretaVariants.map((variant) => ({
    ...variant,
    onRoadPrice: calculateOnRoadPrice({
      carName: "Hyundai Creta",
      price: variant.price,
      seats: 5,
      province,
    }).onRoadPrice,
  }));

  const glx = xforce.variants[0].specifications;
  const top = xforce.variants[xforce.variants.length - 1].specifications;

  const specRows = [
    { label: "Kiểu xe", xforce: "SUV cỡ B, 5 chỗ", creta: "SUV cỡ B, 5 chỗ" },
    { label: "Kích thước D × R × C", xforce: glx?.dimensions ?? "", creta: "4.330 × 1.790 × 1.660 mm" },
    { label: "Chiều dài cơ sở", xforce: glx?.wheelbase ?? "", creta: "2.610 mm" },
    {
      label: "Khoảng sáng gầm",
      xforce: `${glx?.groundClearance} (GLX) – ${top?.groundClearance}`,
      creta: "200 mm",
    },
    { label: "Động cơ", xforce: "Xăng 1.5L MIVEC", creta: "Xăng 1.5L Smartstream" },
    { label: "Công suất", xforce: glx?.power ?? "", creta: "115 mã lực / 6.300 vòng/phút" },
    { label: "Mô-men xoắn", xforce: glx?.torque ?? "", creta: "144 Nm / 4.500 vòng/phút" },
    { label: "Hộp số, dẫn động", xforce: "CVT, cầu trước", creta: "IVT (vô cấp), cầu trước" },
    { label: "Mâm xe", xforce: "17 inch (GLX), 18 inch (Luxury, Ultimate)", creta: "17 inch, 18 inch (N Line)" },
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
              So sánh Mitsubishi Xforce và Hyundai Creta: nên chọn xe nào?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              Xforce và Creta là hai mẫu SUV cỡ B 5 chỗ, cùng dùng máy xăng 1.5L,
              hộp số vô cấp và có giá trong khoảng 600–720 triệu đồng. Bài viết so
              sánh giá, kích thước, vận hành và trang bị để bạn chọn đúng xe cho nhu
              cầu của mình.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-14">
          {/* TÓM TẮT NHANH */}
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold">Tóm tắt nhanh</h2>
            <ul className="mt-4 space-y-2 leading-7 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Xforce</span> lớn hơn
                (dài hơn 60 mm, trục cơ sở dài hơn 40 mm) và gầm cao hơn khoảng 20 mm,
                trong tháng {promotionMonthLabel} có ưu đãi tương đương 100% lệ phí
                trước bạ.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Creta</span> có động cơ
                mạnh hơn một chút (115 mã lực so với 105 PS) và có thêm bản thể thao N
                Line.
              </li>
              <li>
                Giá niêm yết hai xe gần như ngang nhau ở từng mức phiên bản, nên khác
                biệt chính nằm ở ưu đãi, kích thước và trang bị.
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
                    Mitsubishi Xforce
                  </caption>
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-semibold">Phiên bản</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Niêm yết</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Lăn bánh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {xforceRows.map((row) => (
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
                    Hyundai Creta
                  </caption>
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-semibold">Phiên bản</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Niêm yết</th>
                      <th scope="col" className="px-4 py-2 text-right font-semibold">Lăn bánh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cretaRows.map((row) => (
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
              Giá Xforce và ưu đãi theo chương trình của Mitsubishi Motors Việt Nam
              tháng {promotionMonthLabel}. Giá Creta là giá niêm yết tham khảo tháng{" "}
              {cretaUpdated}, chưa gồm ưu đãi của đại lý Hyundai. Ưu đãi có thể là hỗ
              trợ lệ phí trước bạ hoặc quà tặng, không phải tiền mặt. Xem giá các phiên
              bản Mitsubishi khác tại{" "}
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
                    <th scope="col" className="px-4 py-3 font-semibold">Mitsubishi Xforce</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Hyundai Creta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {specRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="px-4 py-3 font-semibold text-gray-700">
                        {row.label}
                      </th>
                      <td className="px-4 py-3">{row.xforce}</td>
                      <td className="px-4 py-3">{row.creta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

          {/* TRANG BỊ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">3. Trang bị và an toàn</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold">Mitsubishi Xforce (bản Ultimate)</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-700">
                  <li>Màn hình giải trí 12,3 inch, đồng hồ kỹ thuật số 8 inch</li>
                  <li>Âm thanh Dynamic Sound Yamaha Premium 8 loa</li>
                  <li>Điều hòa tự động 2 vùng, ghế lái chỉnh điện, cốp điện rảnh tay</li>
                  <li>6 túi khí, camera 360 độ</li>
                  <li>
                    Gói Diamond Sense: kiểm soát hành trình thích ứng, cảnh báo và giảm
                    thiểu va chạm phía trước, cảnh báo điểm mù, hỗ trợ chuyển làn, cảnh báo
                    phương tiện cắt ngang khi lùi, đèn pha tự động
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold">Hyundai Creta (các bản cao)</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-700">
                  <li>Cụm màn hình đôi 10,25 inch</li>
                  <li>Âm thanh Bose 8 loa</li>
                  <li>Ghế trước thông gió, sạc không dây, khởi động từ xa</li>
                  <li>Camera 360 độ</li>
                  <li>
                    Gói Hyundai SmartSense: kiểm soát hành trình thích ứng, phòng tránh va
                    chạm, cảnh báo điểm mù, giữ làn, cảnh báo mở cửa an toàn
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-4 leading-7 text-gray-700">
              Ở bản cao nhất, hai xe có danh sách trang bị an toàn chủ động tương
              đương. Creta có thêm ghế thông gió và sạc không dây, Xforce có màn hình
              giải trí lớn hơn và cốp điện. Ở bản tiêu chuẩn, nên xem kỹ từng xe vì trang
              bị giữa các phiên bản chênh lệch khá nhiều.
            </p>
          </section>

          {/* NÊN CHỌN */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">4. Nên chọn xe nào?</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-red-600 p-5">
                <h3 className="font-bold text-red-700">Chọn Xforce nếu bạn</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700">
                  <li>Thường chở đủ 5 người hoặc cần khoang hành lý rộng</li>
                  <li>Hay đi đường ngập, đường xấu, cần gầm cao</li>
                  <li>Muốn tận dụng ưu đãi trước bạ đang có trong tháng</li>
                  <li>Thích âm thanh Yamaha và màn hình giải trí lớn</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-300 p-5">
                <h3 className="font-bold">Chọn Creta nếu bạn</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700">
                  <li>Ưu tiên động cơ mạnh hơn một chút</li>
                  <li>Cần ghế thông gió, sạc không dây</li>
                  <li>Thích phong cách thể thao của bản N Line</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 leading-7 text-gray-700">
              Cách chắc chắn nhất là lái thử cả hai xe trên cùng một cung đường. Với
              Xforce, bạn có thể lái thử tại showroom hoặc đăng ký để Phúc mang xe đến
              tận nhà.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dang-ky-lai-thu?xe=xforce&nguon=So-sanh-Creta"
                className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Đăng ký lái thử Xforce
              </Link>
              <Link
                href="/?car=Mitsubishi%20Xforce&nguon=So-sanh-Creta#bao-gia"
                className="rounded-lg border border-gray-300 px-6 py-3 font-bold text-gray-900 transition hover:border-red-600 hover:text-red-700"
              >
                Nhận báo giá Xforce
              </Link>
            </div>
          </section>

          {/* ẢNH + LINK XE */}
          <section className="mt-12 grid items-center gap-6 rounded-2xl bg-gray-50 p-6 md:grid-cols-[240px_1fr]">
            <div className="relative h-36">
              <Image
                src={xforce.image}
                alt="Mitsubishi Xforce"
                fill
                sizes="240px"
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Xem chi tiết Mitsubishi Xforce</h2>
              <p className="mt-2 leading-7 text-gray-700">
                Thông số đầy đủ, màu xe, hình ảnh và công cụ tính giá lăn bánh theo 34
                tỉnh, thành.
              </p>
              <Link
                href={`/xe/${xforce.slug}`}
                className="mt-3 inline-block font-semibold text-red-700 underline"
              >
                Đến trang Mitsubishi Xforce →
              </Link>
            </div>
          </section>

          {/* NGUỒN */}
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="text-base font-bold">Nguồn số liệu Hyundai Creta</h2>
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
              Thông số Mitsubishi Xforce theo công bố của Mitsubishi Motors Việt Nam.
              Thông số và giá có thể thay đổi, vui lòng liên hệ để được xác nhận.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
