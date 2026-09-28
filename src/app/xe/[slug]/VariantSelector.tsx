"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarVariant } from "@/data/cars";

type Props = {
  carName: string;
  variants: CarVariant[];
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
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
const [selectedColor, setSelectedColor] = useState("");
const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const selectedVariant = variants[selectedIndex];

  if (!selectedVariant) {
    return null;
  }
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
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-semibold uppercase tracking-wider text-red-600">
          Phiên bản
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Phiên bản & Giá xe
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              className={`rounded-xl border p-6 text-left transition ${
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

              <p className="mt-5 text-sm text-gray-500">
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
          <div className="mt-10 rounded-2xl bg-gray-50 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase text-red-600">
              Phiên bản đang chọn
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {carName} {selectedVariant.name}
            </h3>
{selectedImage && (
  <div className="mt-8 flex justify-center rounded-2xl bg-white p-4">
    <Image
  key={selectedImage}
  src={selectedImage}
  alt={`${carName} ${selectedColor || "Trắng"}`}
  width={900}
  height={600}
  className="h-auto w-full max-w-3xl object-contain"
/>
  </div>
)}
{selectedVariant.colors &&
  selectedVariant.colors.length > 0 && (
    <div className="mt-6">
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
  className="mt-8 flex w-full items-center justify-between border-y border-gray-300 py-4 text-left"
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
            <p className="mt-6 mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
  Động cơ & Vận hành
</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedVariant.specifications?.engine && (
                <div>
                  <p className="text-sm text-gray-500">Động cơ</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.engine}
                  </p>
                </div>
              )}{selectedVariant.specifications?.displacement && (
  <div>
    <p className="text-sm text-gray-500">Dung tích động cơ</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.displacement}
    </p>
  </div>
)}

            {selectedVariant.specifications?.power && (
                <div>
                  <p className="text-sm text-gray-500">Công suất</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.power}
                  </p>
                </div>
              )} 
              {selectedVariant.specifications?.torque && (
                <div>
                  <p className="text-sm text-gray-500">Mô-men xoắn</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.torque}
                  </p>
                </div>
              )}
              {selectedVariant.specifications?.fuel && (
                <div>
                  <p className="text-sm text-gray-500">Nhiên liệu</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.fuel}
                  </p>
                </div>
                )}
              <p className="col-span-full mt-4 border-t border-gray-200 pt-5 text-sm font-bold uppercase tracking-wide text-gray-900">
  Truyền động & Khả năng chở
</p>
              {selectedVariant.specifications?.transmission && (
                <div>
                  <p className="text-sm text-gray-500">Hộp số</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.transmission}
                  </p>
                </div>
              )}

              {selectedVariant.specifications?.drivetrain && (
                <div>
                  <p className="text-sm text-gray-500">Dẫn động</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.drivetrain}
                  </p>
                </div>
              )}

              

              

              {selectedVariant.specifications?.seats && (
                <div>
                  <p className="text-sm text-gray-500">Số chỗ</p>
                  <p className="mt-1 font-semibold">
                    {selectedVariant.specifications?.seats} chỗ
                  </p>
                </div>
              )}

              
                <p className="col-span-full mt-4 border-t border-gray-200 pt-5 text-sm font-bold uppercase tracking-wide text-gray-900">
  Kích thước & Khung xe
</p>
              {selectedVariant.specifications?.dimensions && (
  <div>
    <p className="text-sm text-gray-500">Kích thước D × R × C</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.dimensions}
    </p>
  </div>
)}{selectedVariant.specifications?.wheelbase && (
  <div>
    <p className="text-sm text-gray-500">Chiều dài cơ sở</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.wheelbase}
    </p>
  </div>
)}{selectedVariant.specifications?.groundClearance && (
  <div>
    <p className="text-sm text-gray-500">Khoảng sáng gầm</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.groundClearance}
    </p>
  </div>
)}{selectedVariant.specifications?.fuelTank && (
  <div>
    <p className="text-sm text-gray-500">Dung tích bình nhiên liệu</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.fuelTank}
    </p>
  </div>
)}{selectedVariant.specifications?.wheels && (
  <div>
    <p className="text-sm text-gray-500">Mâm / Lốp</p>
    <p className="mt-1 font-semibold">
      {selectedVariant.specifications?.wheels}
    </p>
  </div>
)}
            </div>
            </>
            )}

            {selectedVariant.features &&
              selectedVariant.features.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-bold">
                    Trang bị nổi bật
                  </h4>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {selectedVariant.features.map((feature) => (
                      <p key={feature} className="text-gray-600">
                        ✓ {feature}
                      </p>
                    ))}
                  </div>
                </div>
              )}

            <a
              href="https://zalo.me/0858678929"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Nhận báo giá phiên bản này
            </a>
          </div>
        )}
      </div>
    </section>
  );
}