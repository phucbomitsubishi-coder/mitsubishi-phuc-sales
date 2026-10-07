import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import { cars, upcomingCars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";
import { siteConfig } from "@/config/site";

// Toàn bộ số liệu lấy từ cars.ts, promotions.ts và registrationFees.ts.
// Sang tháng mới chỉ cần cập nhật promotions.ts (npm run add-news), trang tự đổi theo.

export const metadata: Metadata = createPageMetadata({
  title: `Bảng giá xe Mitsubishi tháng ${promotionMonthLabel}: giá lăn bánh và ưu đãi`,
  description: `Bảng giá xe Mitsubishi tháng ${promotionMonthLabel} đầy đủ các phiên bản Destinator, Triton, Xforce, Xpander Cross, Xpander, Attrage: giá niêm yết, ưu đãi trong tháng và giá lăn bánh tại TP.HCM, Bình Dương.`,
  path: "/bang-gia-xe-mitsubishi",
  hasOgImageFile: true,
});

const province =
  provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

// "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)" -> "100% phí trước bạ (~ 78 triệu VNĐ)"
function benefitText(label: string) {
  return label.replace(/^Ưu đãi tương đương\s*/i, "").trim();
}

const priceList = cars.map((car) => {
  const carPromotion = currentPromotion.cars.find(
    (item) => item.carId === car.id
  );

  const variants = car.variants.map((variant) => {
    const promotion = carPromotion?.variants.find(
      (item) => item.variantName === variant.name
    );
    const benefits = promotion?.benefits ?? [];
    const promotionValue = benefits.reduce(
      (sum, benefit) => sum + (benefit.value ?? 0),
      0
    );
    const { onRoadPrice } = calculateOnRoadPrice({
      carName: car.name,
      price: variant.price,
      seats: variant.specifications?.seats,
      province,
    });

    return {
      name: variant.name,
      price: variant.price,
      benefits,
      promotionValue,
      onRoadPrice,
      onRoadAfterPromotion: Math.max(0, onRoadPrice - promotionValue),
    };
  });

  return {
    car,
    shortName: car.name.replace(/^Mitsubishi /, ""),
    minPrice: Math.min(...variants.map((variant) => variant.price)),
    maxPromotion: Math.max(0, ...variants.map((variant) => variant.promotionValue)),
    variants,
  };
});

const cheapest = [...priceList].sort((a, b) => a.minPrice - b.minPrice)[0];

export default function PriceListPage() {
  const { contact, sales, dealer } = siteConfig;

  return (
    <>
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* HERO */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Cập nhật tháng {promotionMonthLabel}
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Bảng giá xe Mitsubishi tháng {promotionMonthLabel}
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-300">
              Giá niêm yết, ưu đãi trong tháng và giá lăn bánh dự kiến của{" "}
              {priceList.length} dòng xe Mitsubishi đang bán tại Việt Nam. Giá lăn
              bánh tính cho xe đăng ký tại TP. Hồ Chí Minh (gồm cả khu vực Bình
              Dương cũ), biển trắng.
            </p>

            {/* Mục lục nhanh */}
            <nav aria-label="Chọn dòng xe" className="mt-6 flex flex-wrap gap-2">
              {priceList.map(({ car, shortName }) => (
                <a
                  key={car.id}
                  href={`#${car.id}`}
                  className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:border-red-500 hover:text-red-400"
                >
                  {shortName}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* BẢNG TÓM TẮT */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Tóm tắt giá các dòng xe</h2>
          <p className="mt-2 text-gray-600">
            Mẫu xe có giá khởi điểm thấp nhất hiện nay là {cheapest.car.name}, từ{" "}
            {formatMillion(cheapest.minPrice)} đồng.
          </p>

          <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Dòng xe</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Loại xe</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Giá từ</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Ưu đãi tối đa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceList.map(({ car, minPrice, maxPromotion, variants }) => (
                  <tr key={car.id}>
                    <th scope="row" className="px-4 py-3 font-semibold">
                      <a href={`#${car.id}`} className="hover:text-red-700">
                        {car.name}
                      </a>
                      <span className="block text-xs font-normal text-gray-600">
                        {variants.length} phiên bản
                      </span>
                    </th>
                    <td className="px-4 py-3 text-gray-700">
                      {car.category === "Pickup" ? "Bán tải" : car.category}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatMillion(minPrice)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-red-700">
                      {maxPromotion > 0 ? formatMillion(maxPromotion) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CHI TIẾT TỪNG DÒNG XE */}
        <div className="bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            {priceList.map(({ car, shortName, minPrice, variants }) => (
              <section
                key={car.id}
                id={car.id}
                className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
                  <div className="relative h-32 md:h-36">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(min-width: 768px) 220px, 300px"
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Giá xe {car.name}</h2>
                    <p className="mt-2 leading-7 text-gray-600">
                      {car.name} có {variants.length} phiên bản, giá niêm yết từ{" "}
                      {vnd(minPrice)}. {car.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Phiên bản</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                          Giá niêm yết
                        </th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                          Lăn bánh TP.HCM
                        </th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                          Ưu đãi tháng {promotionMonthLabel}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">
                          Lăn bánh sau ưu đãi*
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {variants.map((variant) => (
                        <tr key={variant.name}>
                          <th scope="row" className="px-4 py-3 font-semibold">
                            {variant.name}
                          </th>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {vnd(variant.price)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-gray-700">
                            {vnd(variant.onRoadPrice)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-red-700">
                            {variant.promotionValue > 0
                              ? `− ${vnd(variant.promotionValue)}`
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-right font-bold tabular-nums">
                            {vnd(variant.onRoadAfterPromotion)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {variants.some((variant) => variant.benefits.length > 0) && (
                  <div className="mt-5">
                    <h3 className="font-bold">
                      Ưu đãi {shortName} tháng {promotionMonthLabel}
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm leading-6 text-gray-700">
                      {variants
                        .filter((variant) => variant.benefits.length > 0)
                        .map((variant) => (
                          <li key={variant.name}>
                            <span className="font-semibold text-gray-900">
                              {variant.name}:
                            </span>{" "}
                            {variant.benefits
                              .map((benefit) => benefitText(benefit.label))
                              .join("; ")}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/?car=${encodeURIComponent(car.name)}&nguon=Bang-gia#bao-gia`}
                    className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                  >
                    Nhận báo giá {shortName}
                  </Link>
                  <Link
                    href={`/xe/${car.slug}`}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-900 transition hover:border-red-600 hover:text-red-700"
                  >
                    Thông số và hình ảnh {shortName}
                  </Link>
                </div>
              </section>
            ))}

            {upcomingCars.length > 0 && (
              <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-5 sm:p-8">
                <h2 className="text-2xl font-bold">Mẫu xe sắp ra mắt</h2>
                <p className="mt-2 leading-7 text-gray-600">
                  {upcomingCars.map((car) => car.name).join(" và ")} chưa được
                  Mitsubishi Motors Việt Nam công bố giá bán. Để lại số điện thoại để
                  được báo ngay khi có giá chính thức.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {upcomingCars.map((car) => (
                    <Link
                      key={car.id}
                      href={`/?car=${encodeURIComponent(car.name)}&nguon=Sap-ra-mat#bao-gia`}
                      className="rounded-lg bg-neutral-950 px-5 py-2.5 font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Đăng ký nhận giá {car.name.replace(/^Mitsubishi /, "")}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* GHI CHÚ CÁCH TÍNH */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Cách tính giá lăn bánh trong bảng</h2>
          <div className="mt-4 space-y-3 leading-7 text-gray-700">
            <p>
              Giá lăn bánh = giá niêm yết + lệ phí trước bạ + lệ phí đăng ký và biển số
              + phí đăng kiểm + phí đường bộ 12 tháng + bảo hiểm trách nhiệm dân sự bắt
              buộc. Tại TP. Hồ Chí Minh, lệ phí trước bạ là{" "}
              {(province.taxRate * 100).toLocaleString("vi-VN")}% giá niêm yết (Triton
              là xe bán tải chở hàng nên chỉ chịu 60% mức này) và lệ phí biển số là 14
              triệu đồng.
            </p>
            <p>
              * Cột &quot;Lăn bánh sau ưu đãi&quot; đã trừ tổng giá trị ưu đãi trong
              tháng. Ưu đãi có thể là hỗ trợ lệ phí trước bạ, phiếu nhiên liệu hoặc
              phụ kiện, không phải tiền mặt. Bảng giá chỉ mang tính tham khảo, chi phí
              thực tế có thể thay đổi theo thời điểm và hồ sơ đăng ký.
            </p>
            <p>
              Nếu đăng ký xe ở tỉnh, thành khác, dùng công cụ{" "}
              <Link href="/du-toan/gia-lan-banh" className="font-semibold text-red-700 underline">
                tính giá lăn bánh theo 34 tỉnh, thành
              </Link>{" "}
              hoặc{" "}
              <Link href="/du-toan/tra-gop" className="font-semibold text-red-700 underline">
                dự tính trả góp
              </Link>
              .
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-neutral-950 p-6 text-white sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">
              Cần báo giá chính xác cho phiên bản bạn chọn?
            </h2>
            <p className="mt-3 leading-7 text-gray-300">
              {sales.name}, {sales.title} tại {dealer.name}, sẽ gửi báo giá chi tiết
              kèm ưu đãi mới nhất và phương án trả góp phù hợp.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={contact.phoneUrl}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
              >
                Gọi {sales.phoneDisplay}
              </a>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-600 px-5 py-2.5 font-semibold text-white transition hover:border-white"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
