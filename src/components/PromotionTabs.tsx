"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type PromotionTabItem = {
  carId: string;
  carName: string;
  carSlug: string;
  carImage: string;
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

// "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)"
// -> tên: "Ưu đãi tương đương 100% phí trước bạ", số tiền: "~78 triệu"
function splitBenefit(label: string, value?: number) {
  const match = label.match(/\s*\((~?)\s*[\d.,]+\s*triệu\s*VNĐ\)\s*$/i);
  const name = match ? label.slice(0, match.index).trim() : label;
  const amount = value ? `${match?.[1] ? "~" : ""}${formatMillion(value)}` : "";

  return { name, amount };
}

const shortName = (name: string) => name.replace(/^Mitsubishi /, "");

export default function PromotionTabs({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.carId);

  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      {/* TAB DÒNG XE */}
      <div
        role="tablist"
        aria-label="Chọn dòng xe"
        className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-3 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0"
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
              className={`group w-36 shrink-0 snap-start rounded-2xl border p-3 text-left transition duration-300 lg:w-auto ${
                active
                  ? "border-white bg-white text-neutral-950 shadow-lg shadow-black/40"
                  : "border-neutral-800 bg-neutral-900/70 text-white hover:border-neutral-600 hover:bg-neutral-900"
              }`}
            >
              <div className="relative h-16 w-full">
                <Image
                  src={item.carImage}
                  alt=""
                  fill
                  sizes="180px"
                  className="scale-125 object-contain transition duration-300 group-hover:scale-[1.35]"
                />
              </div>

              <p className="mt-2 truncate text-sm font-bold">
                {shortName(item.carName)}
              </p>

              <p
                className={`mt-0.5 text-xs font-semibold ${
                  active ? "text-red-700" : "text-neutral-400"
                }`}
              >
                {item.maxValue > 0
                  ? `Đến ${formatMillion(item.maxValue)}`
                  : "Liên hệ"}
              </p>
            </button>
          );
        })}
      </div>

      {/* NỘI DUNG ƯU ĐÃI: render đủ các xe (ẩn bằng hidden) để nội dung vẫn có trong HTML cho SEO */}
      {items.map((item) => {
        const bestTotal = Math.max(0, ...item.variants.map((v) => v.total));

        return (
          <div
            key={item.carId}
            role="tabpanel"
            id={`panel-km-${item.carId}`}
            aria-labelledby={`tab-km-${item.carId}`}
            hidden={item.carId !== activeId}
            className="promo-fade mt-5 overflow-clip rounded-3xl bg-white text-neutral-950 shadow-2xl shadow-black/40 lg:grid lg:grid-cols-[5fr_7fr]"
          >
            {/* CỘT TRÁI: xe + ưu đãi cao nhất + nút */}
            <div className="relative bg-gradient-to-br from-neutral-100 via-white to-red-50 p-6 sm:p-8">
              {/* Dính theo khi cuộn danh sách phiên bản dài trên máy tính */}
              <div className="lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                Mitsubishi
              </p>
              <h3 className="mt-1 text-3xl font-extrabold tracking-tight">
                {shortName(item.carName)}
              </h3>

              {item.maxValue > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-neutral-600">
                    Ưu đãi lên đến
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tabular-nums text-red-700 sm:text-5xl">
                    {formatMillion(item.maxValue)}
                  </p>
                </div>
              )}

              <div className="relative my-6 h-40 w-full sm:h-52 lg:my-8 lg:h-56">
                <Image
                  src={item.carImage}
                  alt={`Ưu đãi ${item.carName}`}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-contain drop-shadow-xl"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/?car=${encodeURIComponent(item.carName)}&nguon=Trang-chu-khuyen-mai#bao-gia`}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700"
                >
                  Nhận ưu đãi {shortName(item.carName)}
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href={`/xe/${item.carSlug}`}
                  className="inline-flex items-center rounded-xl border border-neutral-300 bg-white/70 px-5 py-3 font-semibold text-neutral-900 transition hover:border-neutral-900"
                >
                  Xem chi tiết xe
                </Link>
              </div>
              </div>
            </div>

            {/* CỘT PHẢI: chi tiết từng phiên bản */}
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                Ưu đãi theo phiên bản
              </p>

              {item.variants.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {item.variants.map((variant) => {
                    const isBest =
                      item.variants.length > 1 &&
                      variant.total > 0 &&
                      variant.total === bestTotal;

                    return (
                      <li
                        key={variant.name}
                        className={`rounded-2xl border p-5 transition ${
                          isBest
                            ? "border-red-200 bg-red-50/40"
                            : "border-neutral-200"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-lg font-bold">{variant.name}</p>
                              {isBest && (
                                <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                                  Ưu đãi cao nhất
                                </span>
                              )}
                            </div>
                            {variant.price ? (
                              <p className="mt-0.5 text-sm text-neutral-600">
                                Giá niêm yết{" "}
                                <span className="font-semibold tabular-nums text-neutral-900">
                                  {variant.price.toLocaleString("vi-VN")} đ
                                </span>
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <ul className="mt-4 space-y-2.5">
                          {variant.benefits.map((benefit) => {
                            const { name, amount } = splitBenefit(
                              benefit.label,
                              benefit.value
                            );

                            return (
                              <li
                                key={benefit.label}
                                className="flex items-start gap-3 text-sm leading-6"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white"
                                >
                                  ✓
                                </span>
                                <span className="flex-1 text-neutral-700">
                                  {name}
                                </span>
                                {amount && (
                                  <span className="shrink-0 font-semibold tabular-nums text-neutral-900">
                                    {amount}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>

                        {variant.total > 0 && (
                          <div className="mt-4 flex items-center justify-between border-t border-dashed border-neutral-300 pt-3">
                            <span className="text-sm font-semibold text-neutral-600">
                              Tổng ưu đãi
                            </span>
                            <span className="text-lg font-extrabold tabular-nums text-red-700">
                              {formatMillion(variant.total)}
                            </span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-4 rounded-2xl border border-neutral-200 p-5 text-neutral-700">
                  Liên hệ để nhận chính sách ưu đãi hiện hành cho {item.carName}.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
