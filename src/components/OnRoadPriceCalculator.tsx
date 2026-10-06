"use client";

import { useState } from "react";
import type { VariantPromotion } from "@/data/promotions";
import Link from "next/link";
import { defaultProvinceId, provinces } from "@/data/registrationFees";
import { calculateOnRoadPrice, type PlateType } from "@/lib/onRoadPrice";

type Props = {
  carName: string;
  variantName: string;
  price: number;
  seats?: number;
  promotion?: VariantPromotion;
};

const plateOptions: { value: PlateType; label: string }[] = [
  { value: "white", label: "Biển trắng" },
  { value: "yellow", label: "Biển vàng" },
];

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

// "Ưu đãi tương đương 100% phí trước bạ (~ 59 triệu VNĐ)" -> "100% phí trước bạ"
function shortBenefit(label: string) {
  return label
    .replace(/\s*\(.*?\)\s*$/, "")
    .replace(/^Ưu đãi tương đương\s*/i, "")
    .trim();
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">{label}</p>
      <div role="group" aria-label={label} className="flex gap-2">
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`flex-1 rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                active
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-red-600"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OnRoadPriceCalculator({
  carName,
  variantName,
  price,
  seats,
  promotion,
}: Props) {
  const [provinceId, setProvinceId] = useState(defaultProvinceId);
  const province =
    provinces.find((item) => item.id === provinceId) ?? provinces[0];
  const [plateType, setPlateType] = useState<PlateType>("white");

  const totalPromotionValue =
    promotion?.benefits.reduce(
      (total, benefit) => total + (benefit.value ?? 0),
      0
    ) ?? 0;
  // Công thức tính phí: src/lib/onRoadPrice.ts (dùng chung với trang bảng giá)
  const { fees, totalFees, onRoadPrice } = calculateOnRoadPrice({
    carName,
    price,
    seats,
    province,
    plateType,
  });
  const onRoadPriceAfterPromotion = Math.max(
    0,
    onRoadPrice - totalPromotionValue
  );

  const displayName =
    variantName === carName.replace("Mitsubishi ", "")
      ? carName
      : `${carName} ${variantName}`;

  const benefitSummary = (promotion?.benefits ?? [])
    .map((benefit) => shortBenefit(benefit.label))
    .filter(Boolean)
    .map((text, index) =>
      index === 0 ? text : text.charAt(0).toLowerCase() + text.slice(1)
    )
    .join(", ");

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Chi phí dự kiến
      </p>

      <h3 className="mt-1 text-2xl font-bold">Dự tính giá lăn bánh</h3>
      <p className="mt-1 text-sm text-gray-600">{displayName}</p>

      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor="registration-province"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Nơi đăng ký
          </label>
          <select
            id="registration-province"
            value={provinceId}
            onChange={(event) => setProvinceId(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-semibold text-gray-900 outline-none focus:border-red-600"
          >
            <optgroup label="Thành phố trực thuộc Trung ương">
              {provinces
                .filter((item) => item.type === "city")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Tỉnh">
              {provinces
                .filter((item) => item.type === "province")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
        <OptionGroup
          label="Loại biển"
          options={plateOptions}
          value={plateType}
          onChange={setPlateType}
        />
      </div>

      {/* TÓM TẮT */}
      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-gray-600">Giá xe</dt>
          <dd className="font-semibold tabular-nums">{vnd(price)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-gray-600">Thuế, phí & đăng ký</dt>
          <dd className="font-semibold tabular-nums">+ {vnd(totalFees)}</dd>
        </div>
      </dl>

      <details className="group mt-2 text-sm">
        <summary className="flex cursor-pointer list-none items-center gap-1 font-semibold text-red-700 [&::-webkit-details-marker]:hidden">
          <span className="transition group-open:rotate-90" aria-hidden="true">
            ▸
          </span>
          <span className="group-open:hidden">Xem chi tiết {fees.length} khoản phí</span>
          <span className="hidden group-open:inline">Thu gọn chi tiết</span>
        </summary>

        <dl className="mt-2 space-y-1.5 rounded-lg bg-gray-50 p-3">
          {fees.map((fee) => (
            <div key={fee.label} className="flex items-center justify-between gap-4">
              <dt className="text-gray-600">{fee.label}</dt>
              <dd className="shrink-0 tabular-nums text-gray-900">
                {vnd(fee.value)}
              </dd>
            </div>
          ))}
        </dl>
      </details>

      {/* ƯU ĐÃI: trừ trước khi ra tổng, để chỉ có 1 con số lăn bánh cuối cùng */}
      {totalPromotionValue > 0 && (
        <div className="mt-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold text-red-700">Ưu đãi hiện hành</span>
            <span className="shrink-0 font-bold tabular-nums text-red-700">
              − {vnd(totalPromotionValue)}
            </span>
          </div>
          {benefitSummary && (
            <p className="mt-0.5 text-xs leading-5 text-gray-600">
              Gồm: {benefitSummary}.
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex items-end justify-between gap-4 border-t-2 border-gray-900 pt-3">
        <span className="text-sm font-bold uppercase leading-tight text-gray-900 sm:text-base">
          Lăn bánh dự kiến
          {totalPromotionValue > 0 && (
            <span className="block text-xs font-semibold normal-case text-gray-600">
              (đã trừ ưu đãi)
            </span>
          )}
        </span>
        <span className="whitespace-nowrap text-xl font-bold tabular-nums text-red-700 sm:text-2xl">
          {vnd(onRoadPriceAfterPromotion)}
        </span>
      </div>

      <Link
        href={`/?car=${encodeURIComponent(carName)}&variant=${encodeURIComponent(variantName)}&nguon=Gia-lan-banh#bao-gia`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
      >
        Nhận báo giá {displayName.replace(/^Mitsubishi /, "")}
        <span aria-hidden="true">→</span>
      </Link>

      <p className="mt-3 text-xs leading-5 text-gray-600">
        * Số liệu tham khảo, có thể thay đổi theo địa phương và thời điểm. Ưu
        đãi có thể là quà tặng, nhiên liệu, không phải tiền mặt.
      </p>
    </div>
  );
}
