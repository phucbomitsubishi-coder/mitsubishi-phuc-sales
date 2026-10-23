import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getCarBySlug } from "@/data/cars";
import { dealerPromotion } from "@/data/dealerPromotions";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import LandingLeadForm from "@/components/LandingLeadForm";
import MobileContactBar from "@/components/MobileContactBar";

// Khuôn landing page chạy quảng cáo Facebook/Google (/uu-dai/<xe>, anh Phúc chọn "cách B" 16/10/2026):
// ghi CHƯƠNG TRÌNH ĐẠI LÝ (dealerPromotions.ts, tự sinh từ app báo giá) vì trang chỉ dành cho người bấm quảng cáo:
// mỗi trang phải đặt robots noindex, không đưa vào sitemap, không link từ web chính. Không có menu, chỉ 1 việc: để lại số điện thoại.
// URL quảng cáo nên thêm ?nguon=... (vd ?nguon=FB-Xforce-T10) để biết khách đến từ quảng cáo nào.
// Điểm mạnh (highlights) chỉ ghi số liệu đã đối chiếu MMV trong cars.ts, không viết câu khẳng định hơn thua.

export type AdLandingPageProps = {
  carSlug: string;
  // Gộp thêm dòng xe cùng nhóm khách (vd Xpander Cross vào trang Xpander): thêm phiên bản vào bảng, ưu đãi và form
  extraCarSlugs?: string[];
  // Tiêu đề lớn, mặc định là tên xe chính
  heading?: string;
  defaultSource: string;
  kicker: string;
  heroImage: string;
  whyTitle: string;
  highlights: { title: string; text: string }[];
};

const million = (value: number) =>
  `${(value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu`;

const deliveryPhotos = ["ban-giao-01.jpg", "ban-giao-02.jpg", "ban-giao-03.jpg"];

export default function AdLandingPage({ carSlug, extraCarSlugs = [], heading, defaultSource, kicker, heroImage, highlights, whyTitle }: AdLandingPageProps) {
  const car = getCarBySlug(carSlug);
  if (!car) notFound();

  // Chương trình đại lý chỉ hiện đúng tháng của nó; hết tháng mà chưa đồng bộ thì ẩn phần ưu đãi.
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const isPromoActive =
    now.getFullYear() === dealerPromotion.year && now.getMonth() + 1 === dealerPromotion.month;
  const promoMonthLabel = `${String(dealerPromotion.month).padStart(2, "0")}/${dealerPromotion.year}`;
  const province = provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];
  const landingCars = [car, ...extraCarSlugs.map((slug) => getCarBySlug(slug)).filter((item) => item !== undefined)];
  const rows = landingCars.flatMap((item) => {
    const dealerVariants = isPromoActive ? dealerPromotion.cars[item.id] ?? [] : [];
    return item.variants.map((variant) => {
      const benefits = dealerVariants.find((promo) => promo.variant === variant.name)?.benefits ?? [];
      const { onRoadPrice } = calculateOnRoadPrice({
        carName: item.name,
        price: variant.price,
        seats: variant.specifications?.seats,
        province,
      });
      return { carName: item.name, name: variant.name, price: variant.price, onRoadPrice, benefits };
    });
  });
  const maxBenefit = Math.max(0, ...rows.map((row) => row.benefits.reduce((sum, b) => sum + b.value, 0)));

  return (
    <main className="bg-white pb-24 md:pb-0">
      {/* Đầu trang: chỉ logo tên người tư vấn + nút gọi, không có menu */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="font-bold text-gray-900">{siteConfig.sales.name}</p>
            <p className="text-xs text-gray-600">{siteConfig.sales.title} · {siteConfig.dealer.name}</p>
          </div>
          <a
            href={siteConfig.contact.phoneUrl}
            className="hidden rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 md:inline-block"
          >
            {siteConfig.sales.phoneDisplay}
          </a>
        </div>
      </header>

      {/* Ảnh xe + ưu đãi + form */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1.2fr_1fr] md:py-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">{kicker}</p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">{heading ?? car.name}</h1>
            <p className="mt-3 text-lg text-gray-300">
              Giá niêm yết từ {million(Math.min(...rows.map((row) => row.price)))} đồng
            </p>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={heroImage}
                alt={car.name}
                fill
                preload
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>

            {maxBenefit > 0 && (
              <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-600/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-400">Ưu đãi tháng {promoMonthLabel}</p>
                <p className="mt-1 text-2xl font-bold md:text-3xl">Đến {million(maxBenefit)} đồng</p>
                <ul className="mt-3 space-y-1.5 text-gray-200">
                  {rows.filter((row) => row.benefits.length > 0).map((row) => (
                    <li key={row.name}>
                      <span className="font-semibold text-white">{row.name}:</span>{" "}
                      {row.benefits.map((b) => `${b.label.replace(/^Ưu đãi /, "ưu đãi tương đương ")} (~${million(b.value)})`).join(", ")}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-gray-400">
                  Ưu đãi được trừ trực tiếp vào giá xe khi ký hợp đồng; áp dụng theo điều kiện ghi trong báo giá và hợp đồng.
                </p>
              </div>
            )}
          </div>

          <div id="dang-ky" className="self-start rounded-2xl bg-white p-6 text-gray-900 shadow-xl md:sticky md:top-6">
            <h2 className="text-xl font-bold">Nhận báo giá lăn bánh {isPromoActive ? `tháng ${promoMonthLabel}` : "và ưu đãi tháng này"}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Để lại số điện thoại, Phúc gọi lại tư vấn phiên bản, trả góp và hẹn lái thử tận nhà.
            </p>
            <div className="mt-5">
              <Suspense fallback={null}>
                <LandingLeadForm
                  carName={car.name}
                  options={rows.map((row) => ({ car: row.carName, variant: row.name }))}
                  defaultSource={defaultSource}
                />
              </Suspense>
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-600">
              Thông tin chỉ dùng để liên hệ tư vấn. Xem{" "}
              <Link href="/chinh-sach-bao-mat" className="underline">Chính sách bảo mật</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Điểm mạnh */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900">{whyTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 p-5">
              <p className="font-bold text-gray-900">{item.title}</p>
              <p className="mt-1.5 leading-7 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Giá lăn bánh */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-900">Giá lăn bánh tham khảo tại {province.name}</h2>
          <div tabIndex={0} role="region" aria-label="Bảng giá lăn bánh tham khảo" className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="px-3 py-3 sm:px-4">Phiên bản</th>
                  <th className="px-3 py-3 sm:px-4">Giá niêm yết</th>
                  <th className="px-3 py-3 sm:px-4">Lăn bánh*</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-t border-gray-200">
                    <td className="px-3 py-3 sm:px-4 font-semibold text-gray-900">{row.name}</td>
                    <td className="px-3 py-3 sm:px-4 text-gray-700">{row.price.toLocaleString("vi-VN")} đ</td>
                    <td className="px-3 py-3 sm:px-4 font-bold text-red-700">{Math.round(row.onRoadPrice).toLocaleString("vi-VN")} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            * Chưa trừ ưu đãi. Gồm lệ phí trước bạ, biển số, đăng kiểm, phí đường bộ 12 tháng và bảo hiểm TNDS bắt buộc. Đăng ký ở tỉnh khác, Phúc báo giá riêng.
          </p>
        </div>
      </section>

      {/* Ảnh bàn giao + uy tín showroom */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900">Khách hàng nhận xe cùng Phúc</h2>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {deliveryPhotos.map((photo) => (
            <div key={photo} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={`/images/about/${photo}`} alt="Khách hàng nhận xe Mitsubishi" fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-5 leading-7 text-gray-700">
          {siteConfig.sales.carsDelivered} xe đã bàn giao, {siteConfig.sales.yearsOfExperience} năm tư vấn Mitsubishi.
          Showroom {siteConfig.dealer.name} đạt 5,0 sao với 635 đánh giá trên Google. Giao xe toàn quốc.
        </p>
        <a
          href="#dang-ky"
          className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
        >
          Nhận báo giá ngay
        </a>
      </section>

      {/* Footer ngắn: thông tin người bán + chính sách (Google Ads yêu cầu) */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm leading-6 text-gray-600">
          <p className="font-semibold text-gray-900">{siteConfig.sales.name} – {siteConfig.sales.title}</p>
          <p>{siteConfig.dealer.name}: {siteConfig.dealer.address}</p>
          <p>
            Điện thoại, Zalo: {siteConfig.sales.phoneDisplay} · {siteConfig.hours.display}
          </p>
          <p className="mt-2">
            Website cá nhân của người tư vấn, không phải website chính thức của Mitsubishi Motors Việt Nam.{" "}
            <Link href="/chinh-sach-bao-mat" className="underline">Chính sách bảo mật</Link> ·{" "}
            <Link href="/" className="underline">mitsubishiauto.vn</Link>
          </p>
        </div>
      </footer>

      <MobileContactBar zaloUrl={siteConfig.contact.zaloUrl} phoneUrl={siteConfig.contact.phoneUrl} />
    </main>
  );
}
