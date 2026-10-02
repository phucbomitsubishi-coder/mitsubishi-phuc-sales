"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarVariant } from "@/data/cars";
import type { VariantPromotion } from "@/data/promotions";
import OnRoadPriceCalculator from "@/components/OnRoadPriceCalculator";

type Props = {
  carName: string;
  variants: CarVariant[];
  promotions?: VariantPromotion[];
};
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
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
const [selectedColor, setSelectedColor] = useState("");
const [isSpecsOpen, setIsSpecsOpen] = useState(false);
const [isSafetyInfoOpen, setIsSafetyInfoOpen] = useState(false);
const [isBasicSafetyOpen, setIsBasicSafetyOpen] = useState(false);
  const selectedVariant = variants[selectedIndex];

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
const defaultColor =
  selectedColor ||
  selectedVariant.colors?.[0] ||
  "";

const selectedImage =
  vehicleImages?.[selectedVariant.name]?.[defaultColor] ??
  vehicleImages?.[selectedVariant.name]?.[
    selectedVariant.colors?.[0] ?? ""
  ] ??
  "";
  
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
        <p className="font-semibold uppercase tracking-wider text-red-600">
          Phiên bản
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Phiên bản & Giá xe
        </h2>

        <div
  className={`mt-8 grid gap-5 sm:grid-cols-2 ${
    variants.length === 2
      ? "lg:grid-cols-2"
      : variants.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4"
  }`}
>
          {variants.map((variant, index) => (
            <button
              key={variant.name}
              type="button"
              onClick={() => {
  setSelectedIndex(index);

  const nextVariant = variants[index];

  if (
    selectedColor &&
    !nextVariant.colors?.includes(selectedColor)
  ) {
    setSelectedColor(nextVariant.colors?.[0] ?? "");
  }
}}
              className={`rounded-xl border p-4 text-left transition ${
                selectedIndex === index
                  ? "border-red-600 bg-red-50 shadow-md"
                  : "border-gray-200 bg-white shadow-sm hover:border-red-300"
              }`}
            >
              <p className="text-sm font-semibold uppercase text-gray-500">
                {carName}
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {variant.name}
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Giá tham khảo
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {variant.price
                  ? `${variant.price.toLocaleString("vi-VN")} đ`
                  : "Liên hệ"}
              </p>
            </button>
          ))}
        </div>

        {(selectedVariant.specifications || selectedImage) && (
          <div className="mt-6 rounded-2xl bg-gray-50 p-4 md:p-6">
            <p className="text-sm font-semibold uppercase text-red-600">
              Phiên bản đang chọn
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {carName} {selectedVariant.name}
            </h3>
{selectedImage && (
  <div className="mt-4 flex h-[280px] items-center justify-center rounded-2xl bg-white p-2 md:h-[320px]">
    <Image
      key={selectedImage}
      src={selectedImage}
      alt={`${carName} ${selectedColor || "Trắng"}`}
      width={900}
      height={600}
      className="h-full w-full object-contain"
    />
  </div>
)}
{selectedVariant.colors &&
  selectedVariant.colors.length > 0 && (
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-500">
        Màu xe
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        {selectedVariant.colors.map((color) => (
          <button
  key={color}
  type="button"
  onClick={() => setSelectedColor(color)}
  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
    selectedColor === color
      ? "border-red-600 bg-red-50 text-red-600"
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

<button
  type="button"
  onClick={() => setIsSpecsOpen(!isSpecsOpen)}
  className="mt-5 flex w-full items-center justify-between border-y border-gray-300 py-4 text-left"
>
  <span className="text-lg font-bold uppercase">
    Thông số kỹ thuật
  </span>

  <span
    className={`text-xl transition-transform duration-300 ${
      isSpecsOpen ? "rotate-180" : ""
    }`}
  >
    ▼
  </span>
</button>
{isSpecsOpen && (
  <>
           {/* ĐỘNG CƠ & VẬN HÀNH */}
<div className="col-span-full">
  <div className="border-b border-gray-300 pb-3">
    <p className="text-lg font-bold uppercase text-gray-900">
      Động cơ & Vận hành
    </p>
  </div>

  <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
    {selectedVariant.specifications?.engine && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Động cơ
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.engine}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.displacement && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Dung tích động cơ
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.displacement}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.power && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Công suất
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.power}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.torque && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Mô-men xoắn
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.torque}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.fuel && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Nhiên liệu
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.fuel}
        </div>
      </div>
    )}
  </div>
</div>
              {/* TRUYỀN ĐỘNG & KHẢ NĂNG CHỞ */}
<div className="col-span-full mt-5">
  <div className="border-b border-gray-300 pb-3">
    <p className="text-lg font-bold uppercase text-gray-900">
      Truyền động & Khả năng chở
    </p>
  </div>

  <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
    {selectedVariant.specifications?.transmission && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Hộp số
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.transmission}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.drivetrain && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Dẫn động
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.drivetrain}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.seats && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Số chỗ
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.seats} chỗ
        </div>
      </div>
    )}
  </div>
</div>

{/* KÍCH THƯỚC & KHUNG XE */}
<div className="col-span-full mt-5">
  <div className="border-b border-gray-300 pb-3">
    <p className="text-lg font-bold uppercase text-gray-900">
      Kích thước & Khung xe
    </p>
  </div>

  <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
    {selectedVariant.specifications?.dimensions && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Kích thước D × R × C
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.dimensions}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.wheelbase && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Chiều dài cơ sở
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.wheelbase}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.groundClearance && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Khoảng sáng gầm
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.groundClearance}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.fuelTank && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Dung tích bình nhiên liệu
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.fuelTank}
        </div>
      </div>
    )}

    {selectedVariant.specifications?.wheels && (
      <div>
        <p className="mb-2 text-sm text-gray-700">
          Mâm / Lốp
        </p>
        <div className="flex min-h-[44px] items-center justify-center bg-gray-100 px-4 py-3 text-center font-semibold">
          {selectedVariant.specifications.wheels}
        </div>
      </div>
    )}
  </div>
</div>
            </>
            )}

            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_480px]">
  <div>
    {selectedVariant.equipment && (
  <div>
    <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
      Trang bị phiên bản
    </p>

    <h4 className="mt-2 text-2xl font-bold">
      {carName} {selectedVariant.name}
    </h4>

    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {selectedVariant.equipment.exterior &&
        selectedVariant.equipment.exterior.length > 0 && (
          <div>
            <p className="font-bold text-gray-900">
              Ngoại thất
            </p>

            <div className="mt-2 space-y-2">
              {selectedVariant.equipment.exterior.map((item) => (
                <p key={item} className="text-sm leading-6 text-gray-600">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>
        )}

      {selectedVariant.equipment.interior &&
        selectedVariant.equipment.interior.length > 0 && (
          <div>
            <p className="font-bold text-gray-900">
              Nội thất
            </p>

            <div className="mt-2 space-y-2">
              {selectedVariant.equipment.interior.map((item) => (
                <p key={item} className="text-sm leading-6 text-gray-600">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>
        )}

      {selectedVariant.equipment.convenience &&
        selectedVariant.equipment.convenience.length > 0 && (
          <div>
            <p className="font-bold text-gray-900">
              Tiện nghi
            </p>

            <div className="mt-2 space-y-2">
              {selectedVariant.equipment.convenience.map((item) => (
                <p key={item} className="text-sm leading-6 text-gray-600">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>
        )}

      {selectedVariant.equipment.safety &&
        selectedVariant.equipment.safety.length > 0 && (
          <div>
            <p className="font-bold text-gray-900">
              An toàn
            </p>

            <div className="mt-2 space-y-2">
              {selectedVariant.equipment.safety.map((item) => (
                <p key={item} className="text-sm leading-6 text-gray-600">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>
        )}
    </div>
  </div>
)}

{selectedVariant.safetyTechnologies &&
  selectedVariant.safetyTechnologies.length > 0 && (
    <div className="mt-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        An toàn & hỗ trợ lái
      </p>

      <div className="mt-3 grid gap-x-4 gap-y-2 lg:grid-cols-2">
        {selectedVariant.safetyTechnologies
  .filter((technology) => technology.group !== "Diamond Sense")
  .map((technology) => (
          <div
            key={technology.code}
            className="flex items-start gap-2 text-sm"
          >
            <span className="min-w-12 font-bold text-gray-900">
              {technology.code}
            </span>

           <span className="leading-5 text-gray-600">
  {technology.name}
</span>
          </div>
                ))}
      </div>

      <button
        type="button"
        onClick={() => setIsBasicSafetyOpen(!isBasicSafetyOpen)}
        className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
      >
        {isBasicSafetyOpen
          ? "Thu gọn hệ thống an toàn ↑"
          : "Giải thích các hệ thống an toàn ↓"}
      </button>

      {isBasicSafetyOpen && (
  <div className="mt-4 space-y-3 rounded-xl border border-gray-200 bg-white p-4">
    {selectedVariant.safetyTechnologies
      .filter(
        (technology) => technology.group !== "Diamond Sense"
      )
      .map((technology) => (
        <div key={technology.code}>
          <p className="text-sm font-bold text-gray-900">
            <span className="mr-2 text-red-600">
              {technology.code}
            </span>
            {technology.name}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            {technology.description}
          </p>
        </div>
      ))}
  </div>
)}

    </div>
  )}

  {selectedVariant.safetyTechnologies?.some(
  (technology) => technology.group === "Diamond Sense"
) && (
  <div className="mt-6">
    <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
      Diamond Sense
    </p>

    <p className="mt-1 text-sm text-gray-500">
      Hệ thống an toàn chủ động thông minh
    </p>

    <div className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
      {selectedVariant.safetyTechnologies
        .filter(
          (technology) => technology.group === "Diamond Sense"
        )
        .map((technology) => (
          <div
            key={technology.code}
            className="flex items-start gap-2 text-sm"
          >
            <span className="min-w-12 font-bold text-red-600">
              {technology.code}
            </span>

            <span className="leading-5 text-gray-600">
              {technology.name}
            </span>
          </div>
        ))}
    </div>
    <button
  type="button"
  onClick={() => setIsSafetyInfoOpen(!isSafetyInfoOpen)}
  className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
>
  {isSafetyInfoOpen
    ? "Thu gọn Diamond Sense ↑"
: "Tìm hiểu Diamond Sense ↓"}
</button>
{isSafetyInfoOpen && (
  <div className="mt-4 space-y-3 rounded-xl border border-gray-200 bg-white p-4">
    {selectedVariant.safetyTechnologies
      ?.filter(
        (technology) => technology.group === "Diamond Sense"
      )
      .map((technology) => (
        <div key={technology.code}>
          <p className="text-sm font-bold text-gray-900">
            <span className="mr-2 text-red-600">
              {technology.code}
            </span>
            {technology.name}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            {technology.description}
          </p>
        </div>
      ))}
  </div>
)}
  </div>
)}

    <a
      href={`/?car=${encodeURIComponent(
        carName
      )}&variant=${encodeURIComponent(
        selectedVariant.name
      )}#bao-gia`}
      className="mt-8 inline-block rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
    >
      Nhận báo giá phiên bản này
    </a>
  </div>

  <OnRoadPriceCalculator
  carName={carName}
  variantName={selectedVariant.name}
  price={selectedVariant.price}
  seats={selectedVariant.specifications?.seats}
  promotion={selectedPromotion}
/>
</div>
          </div>
        )}
      </div>
    </section>
  );
}