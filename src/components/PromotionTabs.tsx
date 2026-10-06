"use client";

import { useState } from "react";
import Link from "next/link";

export type PromotionTabItem = {
  carId: string;
  carName: string;
  carSlug: string;
  maxValue: number;
  variants: {
    name: string;
    price?: number;
    benefits: { label: string; value?: number }[];
    total: number;
  }[];
};

type Props = {
  items: PromotionTabItem[];
};

function formatMillion(value: number) {
  return `${(value / 1_000_000).toLocaleString("vi-VN", {
    maximumFractionDigits: 1,
  })} triệu`;
}

export default function PromotionTabs({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.carId);

  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      {/* TAB DÒNG XE */}
      <div
        role="tablist"
        aria-label="Chọn dòng xe"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {items.map((item) => {
          const active = item.carId === activeId;

          return (
            <button
              key={item.carId}
              type="button"
              role="tab"
              id={`tab-km-${item.carId}`}
              aria-selected={active}
              aria-controls={`panel-km-${item.carId}`}
              onClick={() => setActiveId(item.carId)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                active
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-red-600 hover:text-red-700"
              }`}
            >
              {item.carName.replace(/^Mitsubishi /, "")}
            </button>
          );
        })}
      </div>

      {/* NỘI DUNG ƯU ĐÃI: render đủ các xe (ẩn bằng hidden) để nội dung vẫn có trong HTML cho SEO */}
      {items.map((item) => (
        <div
          key={item.carId}
          role="tabpanel"
          id={`panel-km-${item.carId}`}
          aria-labelledby={`tab-km-${item.carId}`}
          hidden={item.carId !== activeId}
          className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <h3 className="text-xl font-bold">{item.carName}</h3>

            {item.maxValue > 0 && (
              <p className="text-sm font-semibold text-gray-600">
                Ưu đãi lên đến{" "}
                <span className="text-lg font-bold text-red-700">
                  {formatMillion(item.maxValue)}
                </span>
              </p>
            )}
          </div>

          {item.variants.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {item.variants.map((variant) => (
                <li key={variant.name} className="px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-bold text-gray-900">{variant.name}</p>

                    {variant.price ? (
                      <p className="text-sm text-gray-600">
                        Giá niêm yết{" "}
                        <span className="font-semibold text-gray-900">
                          {variant.price.toLocaleString("vi-VN")} đ
                        </span>
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {variant.benefits.map((benefit) => (
                      <li
                        key={benefit.label}
                        className="flex gap-2 text-sm leading-6 text-gray-700"
                      >
                        <span className="font-bold text-red-700">✓</span>
                        <span>{benefit.label}</span>
                      </li>
                    ))}
                  </ul>

                  {variant.total > 0 && (
                    <p className="mt-3 text-right text-sm text-gray-600">
                      Tổng ưu đãi:{" "}
                      <span className="font-bold text-red-700">
                        {formatMillion(variant.total)}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-6 text-gray-700 sm:px-6">
              Liên hệ để nhận chính sách ưu đãi hiện hành cho {item.carName}.
            </p>
          )}

          <div className="flex flex-wrap gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
            <Link
              href={`/?car=${encodeURIComponent(item.carName)}&nguon=Trang-chu-khuyen-mai#bao-gia`}
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Nhận ưu đãi {item.carName.replace(/^Mitsubishi /, "")}
            </Link>

            <Link
              href={`/xe/${item.carSlug}`}
              className="rounded border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:border-gray-900"
            >
              Xem chi tiết xe
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
