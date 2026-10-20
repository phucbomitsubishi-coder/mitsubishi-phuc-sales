"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type UsedCarCard = {
  id: string;
  slug: string;
  name: string;
  variant: string;
  modelYear: number;
  mileage: number;
  color: string;
  price: number;
  image: string;
};

const sorts = {
  new: { label: "Mới đăng", compare: () => 0 },
  "price-asc": { label: "Giá thấp → cao", compare: (a: UsedCarCard, b: UsedCarCard) => a.price - b.price },
  "price-desc": { label: "Giá cao → thấp", compare: (a: UsedCarCard, b: UsedCarCard) => b.price - a.price },
  year: { label: "Đời xe mới nhất", compare: (a: UsedCarCard, b: UsedCarCard) => b.modelYear - a.modelYear },
  km: { label: "Ít km nhất", compare: (a: UsedCarCard, b: UsedCarCard) => a.mileage - b.mileage },
};
type SortKey = keyof typeof sorts;

const modelOf = (car: UsedCarCard) => car.name.replace(/^Mitsubishi /, "");

// Danh sách xe cũ có lọc theo dòng xe và sắp xếp (giống trang kho xe Ucar Moveo).
// HTML ban đầu (SSR) chứa đủ mọi xe nên Google vẫn đọc được toàn bộ danh sách.
export default function UsedCarList({ cars }: { cars: UsedCarCard[] }) {
  const [model, setModel] = useState("");
  const [sort, setSort] = useState<SortKey>("new");

  const models = useMemo(() => {
    const counts = new Map<string, number>();
    for (const car of cars) counts.set(modelOf(car), (counts.get(modelOf(car)) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [cars]);

  const shown = useMemo(
    () => cars.filter((car) => !model || modelOf(car) === model).sort(sorts[sort].compare),
    [cars, model, sort]
  );

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-red-400"
    }`;

  return (
    <div className="mt-8">
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
        <button type="button" aria-pressed={!model} onClick={() => setModel("")} className={chip(!model)}>
          Tất cả ({cars.length})
        </button>
        {models.map(([name, count]) => (
          <button key={name} type="button" aria-pressed={model === name} onClick={() => setModel(name)} className={chip(model === name)}>
            {name} ({count})
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-700" aria-live="polite">
          Có <span className="font-bold text-gray-900">{shown.length}</span> xe
        </p>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <span className="hidden sm:inline">Sắp xếp</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sắp xếp danh sách xe"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-semibold outline-none focus:border-red-600"
          >
            {Object.entries(sorts).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((car, index) => {
          const showVariant = !car.name.toLowerCase().includes(car.variant.toLowerCase());
          return (
            <Link
              key={car.id}
              href={`/xe-cu/${car.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={car.image}
                  alt={`${car.name} ${car.modelYear}`}
                  fill
                  // 4 xe đầu nằm ngay đầu danh sách: tải ngay để ảnh hiện nhanh (LCP)
                  loading={index < 4 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-3 sm:p-4">
                <h2 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-red-700 sm:text-base">
                  {car.name.replace(/^Mitsubishi /, "")} {car.modelYear}
                  {showVariant && <span className="block font-semibold text-gray-600">{car.variant}</span>}
                </h2>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  {car.mileage.toLocaleString("vi-VN")} km · {car.color}
                </p>
                <p className="mt-2 font-bold tabular-nums text-red-700 sm:text-lg">
                  {car.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
