"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarVariant } from "@/data/cars";
import type { VariantPromotion } from "@/data/promotions";
import OnRoadPriceCalculator from "@/components/OnRoadPriceCalculator";
import Link from "next/link";
import VariantCompare from "./VariantCompare";
import { featuredColors } from "@/lib/carColors";
import VariantLeadForm from "@/components/VariantLeadForm";

type Props = {
  carName: string;
  variants: CarVariant[];
  promotions?: VariantPromotion[];
  // Ảnh xe nhìn ngang theo tên phiên bản (src/data/showroom.ts); có thì hiện hàng ảnh phiên bản kiểu trang MMV
  sideImages?: Record<string, Record<string, string>>;
};

// Trang bị nổi bật của một phiên bản: lấy lần lượt từ các nhóm trang bị (đã đối chiếu MMV)
function keyEquipment(variant: CarVariant, limit = 9) {
  const groups = variant.equipment ?? {};
  const lists = [groups.exterior, groups.interior, groups.convenience, groups.safety, groups.drivingSupport].map((list) => list ?? []);
  const out: string[] = [];
  for (let i = 0; out.length < limit && lists.some((list) => i < list.length); i++) {
    for (const list of lists) if (list[i] && out.length < limit) out.push(list[i]);
  }
  return out;
}
const tritonVariantImages: Record<string, Record<string, string>> = {
  "2WD AT GLX": {
    Trắng: "/images/cars/triton/glx/white.png",
    Đen: "/images/cars/triton/glx/black.png",
    Xám: "/images/cars/triton/glx/gray.png",
    Cam: "/images/cars/triton/glx/orange.png",
  },

  "2WD AT Premium": {
    Trắng: "/images/cars/triton/premium-2wd/white.png",
    Đen: "/images/cars/triton/premium-2wd/black.png",
    Cam: "/images/cars/triton/premium-2wd/orange.png",
  },

  "4WD AT Premium": {
    Trắng: "/images/cars/triton/premium-4wd/white.png",
    Đen: "/images/cars/triton/premium-4wd/black.png",
    Cam: "/images/cars/triton/premium-4wd/orange.png",
  },

  "4WD AT Athlete": {
    Trắng: "/images/cars/triton/athlete/white.png",
    Đen: "/images/cars/triton/athlete/black.png",
    Cam: "/images/cars/triton/athlete/orange.png",
  },
  
};

const xforceVariantImages: Record<string, Record<string, string>> = {
  GLX: {
    Trắng: "/images/cars/xforce/glx/white.png",
    Đen: "/images/cars/xforce/glx/black.png",
    Đỏ: "/images/cars/xforce/glx/red.png",
  },

  Luxury: {
    Trắng: "/images/cars/xforce/luxury/white.png",
    Đen: "/images/cars/xforce/luxury/black.png",
    Đỏ: "/images/cars/xforce/luxury/red.png",
    Xám: "/images/cars/xforce/luxury/gray.png",
  },

  Ultimate: {
    "Trắng Đen": "/images/cars/xforce/ultimate/white-black.png",
    "Đỏ Đen": "/images/cars/xforce/ultimate/red-black.png",
    Đen: "/images/cars/xforce/ultimate/black.png",
  },
};

const xpanderVariantImages: Record<string, Record<string, string>> = {
  MT: {
    Trắng: "/images/cars/xpander/mt/white.png",
  },

  AT: {
    Trắng: "/images/cars/xpander/at/white.png",
    Đen: "/images/cars/xpander/at/black.png",
    Nâu: "/images/cars/xpander/at/brown.png",
    Xám: "/images/cars/xpander/at/gray.png",
  },

  "AT Premium": {
    Trắng: "/images/cars/xpander/at-premium/white.png",
    Đen: "/images/cars/xpander/at-premium/black.png",
    Xám: "/images/cars/xpander/at-premium/gray.png",
    Đỏ: "/images/cars/xpander/at-premium/red.png",
  },
};

const xpanderCrossVariantImages: Record<string, Record<string, string>> = {
  "Xpander Cross": {
    Trắng: "/images/cars/xpander-cross/white.png",
    Đen: "/images/cars/xpander-cross/black.png",
    Nâu: "/images/cars/xpander-cross/brown.png",
  },
};


const attrageVariantImages: Record<string, Record<string, string>> = {
  MT: {
    Trắng: "/images/cars/attrage/mt/white.png",
    Xám: "/images/cars/attrage/mt/gray.png",
  },

  "CVT Premium": {
    Trắng: "/images/cars/attrage/cvt-premium/white.png",
    Xám: "/images/cars/attrage/cvt-premium/gray.png",
    Đỏ: "/images/cars/attrage/cvt-premium/red.png",
  },
};

const destinatorVariantImages: Record<string, Record<string, string>> = {
  Premium: {
    Trắng: "/images/cars/destinator/premium/white.png",
    Xám: "/images/cars/destinator/premium/gray.png",
    Đen: "/images/cars/destinator/premium/black.png",
    Đỏ: "/images/cars/destinator/premium/red.png",
  },

  Ultimate: {
    "Trắng Đen": "/images/cars/destinator/ultimate/white-black.png",
    "Xanh Đen": "/images/cars/destinator/ultimate/blue-black.png",
    "Đỏ Đen": "/images/cars/destinator/ultimate/red-black.png",
    Đen: "/images/cars/destinator/ultimate/black.png",
  },
};
export default function VariantSelector({
  carName,
  variants,
  promotions,
  sideImages,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
const [selectedColor, setSelectedColor] = useState("");
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  // Khung tính lăn bánh thu gọn, khách bấm "Xem giá lăn bánh" mới mở
  const [showCalculator, setShowCalculator] = useState(false);
  const selectedVariant = variants[selectedIndex];
  // Màu mặc định từng phiên bản (màu nổi bật, hạn chế trắng)
  const featured = featuredColors(variants, carName);

  // Dùng chung cho thẻ phiên bản và tiêu đề cột trong bảng thông số
  const selectVariant = (index: number) => {
    setSelectedIndex(index);
    const nextVariant = variants[index];
    if (selectedColor && !nextVariant.colors?.includes(selectedColor)) {
      setSelectedColor(featured[index]);
    }
  };

  if (!selectedVariant) {
    return null;
  }
const selectedPromotion = promotions?.find(
  (promotion) => promotion.variantName === selectedVariant.name
);

const vehicleImages =
  carName === "Mitsubishi Triton"
    ? tritonVariantImages
    : carName === "Mitsubishi Xforce"
      ? xforceVariantImages
      : carName === "Mitsubishi Xpander"
        ? xpanderVariantImages
        : carName === "Mitsubishi Xpander Cross"
          ? xpanderCrossVariantImages
          : carName === "Mitsubishi Attrage"
            ? attrageVariantImages
            : carName === "Mitsubishi Destinator"
              ? destinatorVariantImages
              : undefined;
// Ảnh nhìn ngang theo màu (showroom); không có thì dùng ảnh màu sẵn có của trang xe
const sideImageFor = (variant: CarVariant, color?: string) => {
  const byColor = sideImages?.[variant.name];
  if (!byColor) return undefined;
  // Không chọn màu: dùng màu nổi bật (hạn chế trắng), mỗi phiên bản một màu
  return (color && byColor[color]) || byColor[featured[variants.indexOf(variant)]] || Object.values(byColor)[0];
};
const imageFor = (variant: CarVariant, color: string) =>
  sideImageFor(variant, color) ?? vehicleImages?.[variant.name]?.[color] ?? vehicleImages?.[variant.name]?.[variant.colors?.[0] ?? ""];

const defaultColor =
  selectedColor ||
  featured[selectedIndex];

const selectedImage =
  vehicleImages?.[selectedVariant.name]?.[defaultColor] ??
  vehicleImages?.[selectedVariant.name]?.[
    selectedVariant.colors?.[0] ?? ""
  ] ??
  "";
  
  const variantTitle = selectedVariant.name === carName.replace("Mitsubishi ", "") ? carName : `${carName} ${selectedVariant.name}`;
  const spec = selectedVariant.specifications;
  const summary = [spec?.engine, spec?.transmission, spec?.seats && `${spec.seats} chỗ`, spec?.groundClearance && `gầm ${spec.groundClearance}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
    <section id="phien-ban" className="scroll-mt-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">
          Phiên bản
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
          Phiên bản & Giá xe
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Giá niêm yết tham khảo, chưa trừ ưu đãi. Chọn phiên bản để xem màu, trang bị và giá lăn bánh.
        </p>

        {sideImages ? (
          /* Hàng ảnh phiên bản kiểu trang MMV: ảnh xe nhìn ngang, tên, giá */
          <div className="-mx-6 mt-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:justify-center md:gap-10 md:px-0 [&::-webkit-scrollbar]:hidden">
            {variants.map((variant, index) => (
              <button
                key={variant.name}
                type="button"
                aria-pressed={selectedIndex === index}
                onClick={() => selectVariant(index)}
                className={`group w-[70%] shrink-0 snap-start text-center sm:w-64 ${variants.length > 3 ? "md:w-56 xl:w-64" : "md:w-80"}`}
              >
                <span className="relative block h-28 sm:h-36 md:h-40">
                  {sideImageFor(variant) && (
                    <Image
                      src={sideImageFor(variant) as string}
                      alt={`${carName} ${variant.name}`}
                      fill
                      sizes="(min-width: 768px) 320px, 70vw"
                      className="object-contain transition duration-500 group-hover:-translate-y-1"
                    />
                  )}
                </span>
                <span className={`mt-3 inline-block border-b-2 pb-1 text-lg font-black uppercase tracking-wide ${selectedIndex === index ? "border-red-600" : "border-transparent"}`}>
                  {variant.name}
                </span>
                <span className="block text-sm text-gray-700">Giá: {variant.price.toLocaleString("vi-VN")} VNĐ</span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`-mx-6 mt-5 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden ${
              variants.length === 2
                ? "sm:grid-cols-2"
                : variants.length === 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {variants.map((variant, index) => (
              <button
                key={variant.name}
                type="button"
                aria-pressed={selectedIndex === index}
                onClick={() => selectVariant(index)}
                className={`min-w-[44%] shrink-0 rounded-xl border-2 px-4 py-3 text-left transition sm:min-w-0 ${
                  selectedIndex === index
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
              >
                <span className="block font-bold leading-tight">{variant.name}</span>
                <span className="mt-1 block text-lg font-bold tabular-nums text-red-700">
                  {variant.price ? `${variant.price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Chi tiết phiên bản kiểu trang MMV: tab phiên bản, tên lớn, giá, trang bị bên trái; ảnh xe và màu bên phải */}
        <div className="mt-8 grid overflow-hidden rounded-3xl bg-gray-50 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 p-6 md:p-10 lg:order-1">
            {variants.length > 1 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2" role="tablist" aria-label="Chọn phiên bản">
                {variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    type="button"
                    role="tab"
                    aria-selected={selectedIndex === index}
                    onClick={() => selectVariant(index)}
                    className={`border-b-2 pb-1 text-sm font-bold uppercase tracking-wide transition ${
                      selectedIndex === index ? "border-red-600 text-gray-950" : "border-transparent text-gray-600 hover:text-gray-950"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            )}

            <h3 className="mt-5 text-4xl font-black leading-none tracking-tight md:text-6xl">
              <span className="sr-only">{carName} </span>
              {selectedVariant.name}
            </h3>
            {summary && <p className="mt-4 leading-7 text-gray-700">{summary}</p>}
            <p className="mt-4 text-2xl font-extrabold tabular-nums">
              Giá: {selectedVariant.price.toLocaleString("vi-VN")} VNĐ
            </p>

            {keyEquipment(selectedVariant, 999).length > 0 && (
              <>
                <p className="mt-6 text-lg font-bold">Trang thiết bị</p>
                <ul className="mt-3 space-y-2">
                  {keyEquipment(selectedVariant, 999).map((item, index) => (
                    // Mục sau 9 dòng đầu chỉ ẩn bằng CSS (vẫn có trong HTML)
                    <li key={item} className={`gap-3 leading-6 text-gray-800 ${showAllEquipment || index < 9 ? "flex" : "hidden"}`}>
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      {item}
                    </li>
                  ))}
                </ul>
                {keyEquipment(selectedVariant, 999).length > 9 && (
                  <button
                    type="button"
                    onClick={() => setShowAllEquipment(!showAllEquipment)}
                    className="mt-4 border-b-2 border-gray-900 pb-0.5 text-sm font-black uppercase tracking-[0.25em]"
                  >
                    {showAllEquipment ? "Thu gọn" : "Xem thêm"}
                  </button>
                )}
              </>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/?car=${encodeURIComponent(carName)}&variant=${encodeURIComponent(selectedVariant.name)}&nguon=Chon-phien-ban#bao-gia`}
                className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Báo giá {selectedVariant.name}
              </Link>
              <a
                href="#lan-banh"
                className="border-2 border-gray-900 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                Tính lăn bánh
              </a>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-5 md:p-8 lg:order-2">
            {selectedImage && (
              <div className="relative h-[220px] sm:h-[300px] lg:h-[380px]">
                <Image
                  key={selectedImage}
                  src={selectedImage}
                  alt={`${variantTitle} màu ${defaultColor || "Trắng"}`}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.18)]"
                />
              </div>
            )}
{selectedVariant.colors &&
  selectedVariant.colors.length > 0 && (
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700">
        Màu xe
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        {selectedVariant.colors.map((color) => (
          <button
  key={color}
  type="button"
  onClick={() => setSelectedColor(color)}
  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
    defaultColor === color
      ? "border-red-600 bg-red-50 text-red-700"
      : "border-gray-300 bg-white text-gray-700 hover:border-red-300"
  }`}
>
  <span
    className={`h-4 w-4 rounded-full border border-gray-300 ${
      color === "Trắng"
  ? "bg-white"
  : color === "Đen"
    ? "bg-black"
    : color === "Xám"
      ? "bg-gray-500"
      : color === "Cam"
        ? "bg-orange-500"
        : color === "Đỏ"
  ? "bg-red-600"
  : color === "Nâu"
    ? "bg-amber-800"
  : color === "Trắng Đen"
    ? "bg-gradient-to-r from-white from-50% to-black to-50%"
    : color === "Đỏ Đen"
  ? "bg-gradient-to-r from-red-600 from-50% to-black to-50%"
  : color === "Xanh Đen"
    ? "bg-gradient-to-r from-blue-600 from-50% to-black to-50%"
    : "bg-gray-200"
    }`}
  />
  {color}
</button>
        ))}
      </div>
    </div>
  )}

          </div>
        </div>

        {/* FORM BÁO GIÁ (hiện sẵn, kiểu MMV) + GIÁ LĂN BÁNH (thu gọn, khách bấm "Xem giá lăn bánh" mới mở) */}
        <div id="lan-banh" className="mt-12 grid scroll-mt-32 items-start gap-10 lg:grid-cols-[1fr_480px] lg:gap-16">
          <div className="order-2 lg:order-1 lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Nhận báo giá {variantTitle}</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">1. Thông tin cá nhân</h3>
            <VariantLeadForm
              carName={carName}
              variantNames={variants.map((variant) => variant.name)}
              selectedVariant={selectedVariant.name}
              source="Form trang xe"
            />
          </div>

          <div className="order-1 lg:order-2">
            {showCalculator ? (
              <OnRoadPriceCalculator
                carName={carName}
                variantName={selectedVariant.name}
                price={selectedVariant.price}
                seats={selectedVariant.specifications?.seats}
                promotion={selectedPromotion}
              />
            ) : (
              <div className="border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Chi phí dự kiến</p>
                <p className="mt-1 text-2xl font-bold">Giá lăn bánh {selectedVariant.name}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Giá niêm yết {selectedVariant.price.toLocaleString("vi-VN")} đ, cộng thuế phí đăng ký theo tỉnh, trừ ưu đãi tháng.
                </p>
                {selectedPromotion && selectedPromotion.benefits.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {selectedPromotion.benefits.map((benefit) => (
                      <li key={benefit.label} className="flex gap-3 text-sm leading-6 text-gray-800">
                        <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">✓</span>
                        {benefit.label}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setShowCalculator(true)}
                  className="mt-6 w-full rounded-lg bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700"
                >
                  Xem giá lăn bánh →
                </button>
                <p className="mt-3 text-xs leading-5 text-gray-600">Ưu đãi có thể là quà tặng, nhiên liệu, không phải tiền mặt.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    <VariantCompare carName={carName} variants={variants} imageFor={imageFor} />
    </>
  );
}