"use client";

import { useState } from "react";
import type { CarVariant } from "@/data/cars";

type Spec = NonNullable<CarVariant["specifications"]>;
type Row = { key: keyof Spec; label: string; format?: (value: string | number) => string };

// Nhóm và thứ tự dòng theo bảng thông số trên trang MMV
const groups: { title: string; rows: Row[] }[] = [
  {
    title: "Kích thước & trọng lượng",
    rows: [
      { key: "dimensions", label: "Kích thước D × R × C" },
      { key: "wheelbase", label: "Chiều dài cơ sở" },
      { key: "frontTrack", label: "Khoảng cách hai bánh trước" },
      { key: "rearTrack", label: "Khoảng cách hai bánh sau" },
      { key: "groundClearance", label: "Khoảng sáng gầm" },
      { key: "turningRadius", label: "Bán kính quay vòng tối thiểu" },
      { key: "curbWeight", label: "Trọng lượng không tải" },
      { key: "seats", label: "Số chỗ ngồi", format: (value) => `${value} chỗ` },
      { key: "fuelTank", label: "Dung tích bình nhiên liệu" },
    ],
  },
  {
    title: "Động cơ & nhiên liệu",
    rows: [
      { key: "engine", label: "Động cơ" },
      { key: "displacement", label: "Dung tích xi lanh" },
      { key: "power", label: "Công suất cực đại" },
      { key: "torque", label: "Mô-men xoắn cực đại" },
      { key: "fuel", label: "Nhiên liệu" },
      { key: "fuelConsumptionCombined", label: "Tiêu hao nhiên liệu kết hợp" },
      { key: "fuelConsumptionUrban", label: "Tiêu hao trong đô thị" },
      { key: "fuelConsumptionExtraUrban", label: "Tiêu hao ngoài đô thị" },
    ],
  },
  {
    title: "Truyền động, khung gầm & phanh",
    rows: [
      { key: "transmission", label: "Hộp số" },
      { key: "drivetrain", label: "Dẫn động" },
      { key: "rearDiffLock", label: "Khóa vi sai cầu sau" },
      { key: "steering", label: "Trợ lực lái" },
      { key: "frontSuspension", label: "Treo trước" },
      { key: "rearSuspension", label: "Treo sau" },
      { key: "wheels", label: "Lốp và mâm xe" },
      { key: "frontBrakes", label: "Phanh trước" },
      { key: "rearBrakes", label: "Phanh sau" },
    ],
  },
];

// "105 PS / 6.000 rpm" → ["105 PS", "tại 6.000 vòng/phút"]
function splitRpm(value?: string) {
  if (!value) return undefined;
  const [main, rpm] = value.split(" / ");
  return { main, note: rpm ? `tại ${rpm.replace("rpm", "vòng/phút")}` : undefined };
}

type Props = {
  variants: CarVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function SpecSheet({ variants, selectedIndex, onSelect }: Props) {
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const selected = variants[selectedIndex]?.specifications;
  if (!selected) return null;

  const multi = variants.length > 1;
  const valueOf = (variant: CarVariant, row: Row) => {
    const raw = variant.specifications?.[row.key];
    if (raw === undefined || raw === "") return undefined;
    return row.format ? row.format(raw) : String(raw);
  };

  const power = splitRpm(selected.power);
  const torque = splitRpm(selected.torque);
  const highlights = [
    power && { label: "Công suất", value: power.main, note: power.note },
    torque && { label: "Mô-men xoắn", value: torque.main, note: torque.note },
    selected.fuelConsumptionCombined
      ? { label: "Tiêu hao kết hợp", value: selected.fuelConsumptionCombined.replace(" L/100 km", ""), note: "lít/100 km" }
      : selected.transmission && { label: "Hộp số", value: selected.transmission },
    selected.groundClearance && { label: "Khoảng sáng gầm", value: selected.groundClearance },
    selected.seats && { label: "Số chỗ ngồi", value: `${selected.seats} chỗ` },
    selected.drivetrain && { label: "Dẫn động", value: selected.drivetrain },
  ].filter(Boolean) as { label: string; value: string; note?: string }[];

  const tableGroups = groups
    .map((group) => ({
      ...group,
      rows: group.rows
        .map((row) => {
          const values = variants.map((variant) => valueOf(variant, row));
          const same = values.every((value) => value === values[0]);
          return { ...row, values, same };
        })
        .filter((row) => row.values.some(Boolean))
        .filter((row) => !onlyDifferences || !row.same),
    }))
    .filter((group) => group.rows.length > 0);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-gray-900 pb-3">
        <h3 className="text-xl font-bold uppercase tracking-wide md:text-2xl">Thông số kỹ thuật</h3>
        <p className="text-sm text-gray-600">Theo công bố của Mitsubishi Motors Việt Nam</p>
      </div>

      {/* Thông số nổi bật của phiên bản đang chọn */}
      <dl className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-600">{item.label}</dt>
            <dd className="mt-2 text-lg font-bold leading-tight text-gray-900 md:text-xl">{item.value}</dd>
            {item.note && <dd className="mt-1 text-xs text-gray-600">{item.note}</dd>}
          </div>
        ))}
      </dl>

      <details className="group mt-5 rounded-xl border-2 border-gray-200 bg-white open:border-red-600">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 md:px-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block font-bold text-gray-900">
              {multi ? "Bảng thông số đầy đủ, so sánh các phiên bản" : "Bảng thông số đầy đủ"}
            </span>
            <span className="mt-0.5 block text-sm text-gray-600">
              Kích thước, động cơ, mức tiêu hao nhiên liệu, khung gầm và phanh
            </span>
          </span>
          <span className="shrink-0 text-xl text-red-600 transition-transform group-open:rotate-180">▼</span>
        </summary>

        <div className="border-t border-gray-200 px-3 pb-5 pt-4 md:px-5">
          {multi && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-800">
                <input
                  type="checkbox"
                  checked={onlyDifferences}
                  onChange={(event) => setOnlyDifferences(event.target.checked)}
                  className="h-4 w-4 accent-red-600"
                />
                Chỉ xem điểm khác nhau giữa các phiên bản
              </label>
              {variants.length > 2 && (
                <p className="text-xs text-gray-600 md:hidden">Vuốt ngang để xem đủ các phiên bản →</p>
              )}
            </div>
          )}

          {tableGroups.length === 0 ? (
            <p className="py-6 text-center text-gray-600">Các phiên bản giống nhau ở mọi thông số trong bảng.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                {multi && (
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-28 min-w-28 bg-white p-2 text-left align-bottom text-xs font-semibold uppercase text-gray-600 sm:w-40 sm:min-w-40 md:w-56">
                        Phiên bản
                      </th>
                      {variants.map((variant, index) => (
                        <th key={variant.name} className="min-w-32 p-1 align-bottom md:min-w-0">
                          <button
                            type="button"
                            onClick={() => onSelect(index)}
                            aria-pressed={index === selectedIndex}
                            className={`w-full rounded-lg px-2 py-2 text-sm font-bold transition ${
                              index === selectedIndex
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {variant.name}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}

                {tableGroups.map((group) => (
                  <tbody key={group.title}>
                    <tr>
                      <th
                        colSpan={variants.length + 1}
                        scope="colgroup"
                        className="border-l-4 border-red-600 bg-gray-100 px-3 py-2 text-left text-sm font-bold uppercase tracking-wide text-gray-900"
                      >
                        <span className="sticky left-3">{group.title}</span>
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.key} className="border-b border-gray-200">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 w-28 min-w-28 bg-white py-3 pl-2 pr-2 text-left align-top text-xs font-medium text-gray-600 sm:w-40 sm:min-w-40 sm:px-3 sm:text-sm md:w-56"
                        >
                          {row.label}
                        </th>
                        {row.same ? (
                          <td colSpan={variants.length} className={`px-3 py-3 text-left align-top font-semibold text-gray-900 ${multi ? "md:text-center" : ""}`}>
                            {/* Ô gộp rộng hơn màn hình điện thoại: giữ chữ bám mép trái khi vuốt ngang */}
                            <span className="sticky left-31 inline-block max-w-[calc(100vw-235px)] sm:left-43 sm:max-w-[calc(100vw-300px)] md:static md:max-w-none">{row.values[0] ?? "–"}</span>
                          </td>
                        ) : (
                          row.values.map((value, index) => (
                            <td
                              key={variants[index].name}
                              className={`min-w-32 px-3 py-3 text-left align-top font-semibold md:min-w-0 md:text-center ${
                                index === selectedIndex ? "bg-red-50 text-gray-900" : "text-gray-800"
                              }`}
                            >
                              {value ?? "–"}
                            </td>
                          ))
                        )}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}

          <p className="mt-4 text-xs leading-5 text-gray-600">
            {multi && "Ô gộp chung là thông số giống nhau ở mọi phiên bản. "}
            Mức tiêu hao nhiên liệu đo theo điều kiện thử nghiệm của nhà sản xuất, thực tế phụ thuộc cách lái
            và điều kiện đường. Thông số có thể thay đổi theo lô xe, vui lòng liên hệ để xác nhận trước khi mua.
          </p>
        </div>
      </details>
    </div>
  );
}
