import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { cars, upcomingCars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";
import { featuredImages } from "@/lib/carCards";
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
// (tiêu đề cột đã ghi "tương đương", tránh lặp ở mọi dòng)
const benefitText = (label: string) => label.replace(/^Ưu đãi tương đương\s*/i, "").trim();

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
      // Năm sản xuất theo bài khuyến mãi MMV (không có thì để trống)
      modelYear: promotion?.modelYear ?? "",
      price: variant.price,
      benefits,
      promotionValue,
      onRoadPrice,
      onRoadAfterPromotion: Math.max(0, onRoadPrice - promotionValue),
    };
  });

  // Mọi phiên bản cùng năm sản xuất thì ghi 1 lần ở đầu xe, bỏ cột Năm SX
  const years = [...new Set(variants.map((variant) => variant.modelYear))];

  return {
    car,
    commonYear: years.length === 1 ? years[0] : null,
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
      <PageSchema
        metadata={metadata}
        path="/bang-gia-xe-mitsubishi"
        type="WebPage"
        name="Bảng giá xe Mitsubishi"
        dateModified={`${currentPromotion.year}-${String(currentPromotion.month).padStart(2, "0")}-01`}
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* HERO */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Cập nhật tháng {promotionMonthLabel}
            </p>

            <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Bảng giá xe Mitsubishi tháng {promotionMonthLabel}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
              Giá niêm yết, ưu đãi trong tháng và giá lăn bánh dự kiến của{" "}
              {priceList.length} dòng xe Mitsubishi đang bán tại Việt Nam. Giá lăn
              bánh tính cho xe đăng ký tại TP. Hồ Chí Minh (gồm cả khu vực Bình
              Dương cũ), biển trắng. Mẫu xe có giá khởi điểm thấp nhất hiện nay là{" "}
              {cheapest.car.name}, từ {formatMillion(cheapest.minPrice)} đồng.
            </p>

          </div>
        </section>

        {/* TÓM TẮT + MỤC LỤC: mỗi xe 1 thẻ (giá từ, ưu đãi đến), bấm để tới bảng của xe đó */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="sr-only">Tóm tắt giá các dòng xe</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {priceList.map(({ car, shortName, minPrice, maxPromotion }) => (
              <li key={car.id}>
                <a href={`#${car.id}`} className="group block h-full p-3 text-center transition hover:bg-gray-50">
                  <span className="relative block h-16 sm:h-20">
                    <Image src={featuredImages[car.id] ?? car.image} alt="" fill sizes="200px" className="object-contain" />
                  </span>
                  <span className="mt-2 block text-sm font-black uppercase tracking-wide group-hover:text-red-700">{shortName}</span>
                  <span className="block text-sm text-gray-700">
                    Từ <span className="font-semibold tabular-nums text-gray-950">{formatMillion(minPrice)}</span>
                  </span>
                  {maxPromotion > 0 && (
                    <span className="block text-xs font-bold text-red-700">Ưu đãi đến {formatMillion(maxPromotion)}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* CHI TIẾT TỪNG DÒNG XE: bảng kiểu bài khuyến mãi MMV (21/10/2026): Phiên bản | Năm SX | Giá niêm yết |
            Ưu đãi (từng khoản trong ô) | Lăn bánh sau ưu đãi; điện thoại mỗi phiên bản một khối dọc */}
        <div className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
            {priceList.map(({ car, shortName, minPrice, maxPromotion, commonYear, variants }) => (
              <section key={car.id} id={car.id} className="scroll-mt-28 py-12 md:py-16">
                <div className="relative mx-auto h-36 max-w-xl sm:h-44 md:h-56">
                  <Image
                    src={featuredImages[car.id] ?? car.image}
                    alt={car.name}
                    fill
                    sizes="(min-width: 768px) 576px, 90vw"
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <div>
                    <h2>
                      <span className="block text-xs font-bold uppercase tracking-[0.25em] text-red-700">Giá xe Mitsubishi</span>{" "}
                      <span className="mt-1 block text-3xl font-black uppercase tracking-tight md:text-4xl">{shortName}</span>
                    </h2>
                    <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
                      <span>{variants.length} phiên bản</span>
                      {commonYear && <span>Sản xuất {commonYear}</span>}
                      <span>
                        Từ <strong className="tabular-nums text-gray-950">{vnd(minPrice)}</strong>
                      </span>
                      {maxPromotion > 0 && <strong className="text-red-700">Ưu đãi đến {formatMillion(maxPromotion)}</strong>}
                    </p>
                  </div>
                </div>

                {/* Máy tính, tablet: bảng */}
                <div tabIndex={0} role="region" aria-label={`Bảng giá ${car.name}`} className="mx-auto mt-8 hidden max-w-5xl overflow-x-auto border border-gray-200 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-700">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-bold">Phiên bản</th>
                        {!commonYear && <th scope="col" className="px-4 py-3 font-bold">Năm SX</th>}
                        <th scope="col" className="px-4 py-3 text-right font-bold">Giá niêm yết</th>
                        <th scope="col" className="px-4 py-3 font-bold">Ưu đãi tương đương (tháng {promotionMonthLabel})</th>
                        <th scope="col" className="px-4 py-3 text-right font-bold">Lăn bánh sau ưu đãi*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {variants.map((variant) => (
                        <tr key={variant.name} className="align-top even:bg-gray-50">
                          <th scope="row" className="px-4 py-4 font-bold">{variant.name}</th>
                          {!commonYear && <td className="px-4 py-4 tabular-nums text-gray-700">{variant.modelYear}</td>}
                          <td className="whitespace-nowrap px-4 py-4 text-right font-semibold tabular-nums">{vnd(variant.price)}</td>
                          <td className="px-4 py-4">
                            {variant.benefits.length > 0 ? (
                              variant.benefits.length === 1 ? (
                                <span className="font-bold text-red-700">{benefitText(variant.benefits[0].label)}</span>
                              ) : (
                                <>
                                  <span className="block font-bold text-red-700">Tổng ~ {formatMillion(variant.promotionValue)}</span>
                                  <ul className="mt-1 space-y-0.5 text-gray-700">
                                    {variant.benefits.map((benefit) => (
                                      <li key={benefit.label}>{benefitText(benefit.label)}</li>
                                    ))}
                                  </ul>
                                </>
                              )
                            ) : (
                              <span className="text-gray-600">—</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <span className="block text-base font-black tabular-nums">{vnd(variant.onRoadAfterPromotion)}</span>
                            {variant.promotionValue > 0 && (
                              <span className="mt-0.5 block text-xs text-gray-600">
                                Chưa trừ ưu đãi: <span className="tabular-nums">{vnd(variant.onRoadPrice)}</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Điện thoại: mỗi phiên bản một khối */}
                <ul className="mx-auto mt-6 max-w-xl divide-y divide-gray-200 border-y border-gray-200 md:hidden">
                  {variants.map((variant) => (
                    <li key={variant.name} className="py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-bold">
                          {variant.name}
                          {!commonYear && variant.modelYear && <span className="ml-1.5 text-sm font-normal text-gray-600">{variant.modelYear}</span>}
                        </h3>
                        <span className="font-semibold tabular-nums">{vnd(variant.price)}</span>
                      </div>
                      {variant.benefits.length > 0 && (
                        <div className="mt-2 text-sm leading-6">
                          {variant.benefits.length === 1 ? (
                            <p className="font-bold text-red-700">Ưu đãi tương đương {benefitText(variant.benefits[0].label)}</p>
                          ) : (
                            <>
                              <p className="font-bold text-red-700">Ưu đãi tương đương ~ {formatMillion(variant.promotionValue)}</p>
                              <ul className="text-gray-700">
                                {variant.benefits.map((benefit) => (
                                  <li key={benefit.label}>{benefitText(benefit.label)}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                      <p className="mt-2 flex items-baseline justify-between gap-3 bg-gray-50 px-3 py-2 text-sm">
                        <span className="text-gray-700">Lăn bánh TP.HCM sau ưu đãi*</span>
                        <span className="text-base font-black tabular-nums">{vnd(variant.onRoadAfterPromotion)}</span>
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  <Link
                    href={`/?car=${encodeURIComponent(car.name)}&nguon=Bang-gia#bao-gia`}
                    className="bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
                  >
                    Nhận báo giá {shortName}
                  </Link>
                  <Link
                    href={`/xe/${car.slug}`}
                    className="text-sm font-bold text-gray-950 underline-offset-4 hover:text-red-700 hover:underline"
                  >
                    Xem chi tiết {shortName} →
                  </Link>
                </div>
              </section>
            ))}

            {upcomingCars.length > 0 && (
              <section className="py-12 text-center md:py-16">
                <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Mẫu xe sắp ra mắt</h2>
                <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
                  {upcomingCars.map((car) => car.name).join(" và ")} chưa được
                  Mitsubishi Motors Việt Nam công bố giá bán. Để lại số điện thoại để
                  được báo ngay khi có giá chính thức.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {upcomingCars.map((car) => (
                    <Link
                      key={car.id}
                      href={`/?car=${encodeURIComponent(car.name)}&nguon=Sap-ra-mat#bao-gia`}
                      className="border-2 border-gray-950 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-gray-950 hover:text-white"
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
          <h2 className="text-2xl font-black tracking-tight">Cách tính giá lăn bánh trong bảng</h2>
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
              tháng. Ưu đãi (hỗ trợ lệ phí trước bạ, phiếu nhiên liệu...) được trừ trực
              tiếp vào giá xe khi ký hợp đồng. Bảng giá chỉ mang tính tham khảo, chi phí
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

          <div className="mt-8 bg-neutral-950 p-6 text-white sm:p-8">
            <h2 className="text-xl font-black sm:text-2xl tracking-tight">
              Cần báo giá chính xác cho phiên bản bạn chọn?
            </h2>
            <p className="mt-3 leading-7 text-gray-300">
              {sales.name}, {sales.title} tại {dealer.name}, sẽ gửi báo giá chi tiết
              kèm ưu đãi mới nhất và phương án trả góp phù hợp.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={contact.phoneUrl}
                className="bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Gọi {sales.phoneDisplay}
              </a>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/60 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-gray-950"
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
