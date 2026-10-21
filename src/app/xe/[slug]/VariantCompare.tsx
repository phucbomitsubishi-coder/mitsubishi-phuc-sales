"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { CarVariant } from "@/data/cars";
import { specGroups } from "@/lib/specGroups";
import { featuredColors } from "@/lib/carColors";

type Props = {
  carName: string;
  variants: CarVariant[];
  // Ảnh của một phiên bản theo màu (ảnh nhìn ngang từ showroom.ts, hoặc ảnh màu sẵn có của trang xe)
  imageFor: (variant: CarVariant, color: string) => string | undefined;
};

type Group = { title: string; rows: { label: string; values: (string | undefined)[] }[] };

const colorDot: Record<string, string> = {
  Trắng: "bg-white",
  Đen: "bg-black",
  Xám: "bg-gray-500",
  Cam: "bg-orange-500",
  Đỏ: "bg-red-600",
  Nâu: "bg-amber-800",
  "Trắng Đen": "bg-gradient-to-r from-white from-50% to-black to-50%",
  "Đỏ Đen": "bg-gradient-to-r from-red-600 from-50% to-black to-50%",
  "Xanh Đen": "bg-gradient-to-r from-blue-700 from-50% to-black to-50%",
};

const equipmentGroups: { key: keyof NonNullable<CarVariant["equipment"]>; title: string }[] = [
  { key: "exterior", title: "Ngoại thất" },
  { key: "interior", title: "Nội thất" },
  { key: "convenience", title: "Tiện nghi" },
  { key: "safety", title: "An toàn" },
  { key: "drivingSupport", title: "Vận hành và hỗ trợ lái" },
];

// Dựng các nhóm so sánh: thông số (theo specGroups) + trang bị (Có / –) + hệ thống an toàn
function buildGroups(variants: CarVariant[]): Group[] {
  const groups: Group[] = specGroups.map((group) => ({
    title: group.title,
    rows: group.rows
      .map((row) => ({
        label: row.label,
        values: variants.map((variant) => {
          const raw = variant.specifications?.[row.key];
          if (raw === undefined || raw === "") return undefined;
          return row.format ? row.format(raw) : String(raw);
        }),
      }))
      .filter((row) => row.values.some(Boolean)),
  }));

  // Gom mục trang bị của mọi phiên bản (giữ thứ tự xuất hiện, bản cao nhất trước)
  const richestFirst = [...variants].sort((a, b) => b.price - a.price);
  for (const { key, title } of equipmentGroups) {
    const items: string[] = [];
    for (const variant of richestFirst) for (const item of variant.equipment?.[key] ?? []) if (!items.includes(item)) items.push(item);
    if (key === "safety") {
      for (const variant of richestFirst)
        for (const tech of variant.safetyTechnologies ?? []) {
          const label = `${tech.name} (${tech.code})`;
          if (!items.includes(label)) items.push(label);
        }
    }
    groups.push({
      title,
      rows: items.map((item) => ({
        label: item,
        values: variants.map((variant) =>
          variant.equipment?.[key]?.includes(item) || (variant.safetyTechnologies ?? []).some((tech) => `${tech.name} (${tech.code})` === item) ? "Có" : "–"
        ),
      })),
    });
  }
  return groups.filter((group) => group.rows.length > 0);
}

const INITIAL_GROUPS = 3;

// Khối "Trang thiết bị" kiểu trang MMV: cột từng phiên bản (ảnh đổi theo màu, giá), hàng tên phiên bản bám đầu
// khi cuộn, các nhóm thông số/trang bị bấm để mở, nút Xem thêm / Thu gọn.
// Điện thoại: so sánh 2 phiên bản một lúc (chọn bằng ô chọn nếu xe có hơn 2 phiên bản).
export default function VariantCompare({ carName, variants, imageFor }: Props) {
  const [colors, setColors] = useState<string[]>(() => featuredColors(variants, carName));
  const [open, setOpen] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [pair, setPair] = useState<[number, number]>([0, Math.min(1, variants.length - 1)]);
  const groups = buildGroups(variants);
  const n = variants.length;
  const gridStyle = { "--n": n } as CSSProperties;
  const gridClass = `grid gap-3 md:gap-6 ${n > 1 ? "grid-cols-2" : "grid-cols-1"} md:grid-cols-[repeat(var(--n),minmax(0,1fr))]`;
  // Điện thoại chỉ hiện 2 cột đang chọn
  const cellClass = (index: number) => (n > 2 && !pair.includes(index) ? "hidden md:block" : "");
  const ordered = (index: number) => (n > 2 && index === pair[0] && pair[0] > pair[1] ? "order-first md:order-none" : "");
  const toggle = (title: string) => setOpen((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));

  return (
    <section id="trang-bi" className="scroll-mt-32 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-center text-3xl font-black tracking-tight md:text-5xl">Trang thiết bị</h2>
        <p className="mt-3 text-center text-sm text-gray-600">So sánh thông số và trang bị các phiên bản {carName}, theo công bố của Mitsubishi Motors Việt Nam.</p>

        {n > 2 && (
          <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
            {[0, 1].map((slot) => (
              <label key={slot} className="text-xs font-semibold text-gray-700">
                Phiên bản {slot + 1}
                <select
                  value={pair[slot]}
                  onChange={(event) => {
                    const next = [...pair] as [number, number];
                    next[slot] = Number(event.target.value);
                    setPair(next);
                  }}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-bold text-gray-900"
                >
                  {variants.map((variant, index) => (
                    <option key={variant.name} value={index} disabled={index === pair[1 - slot]}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {/* Cột phiên bản: ảnh theo màu, tên, giá, chấm màu */}
        <div className={`${gridClass} mt-8`} style={gridStyle}>
          {variants.map((variant, index) => {
            const image = imageFor(variant, colors[index]);
            return (
              <div key={variant.name} className={`text-center ${cellClass(index)} ${ordered(index)}`}>
                <div className="relative h-24 sm:h-36 md:h-44">
                  {image && (
                    <Image
                      key={image}
                      src={image}
                      alt={`${carName} ${variant.name} màu ${colors[index]}`}
                      fill
                      sizes="(min-width: 768px) 420px, 45vw"
                      className="object-contain"
                    />
                  )}
                </div>
                <p className="mt-3 text-lg font-black md:text-2xl">{variant.name}</p>
                <p className="text-sm text-gray-700">Giá: {variant.price.toLocaleString("vi-VN")} VNĐ</p>
                {variant.colors && variant.colors.length > 0 && (
                  <>
                    <div className="mt-3 flex flex-wrap justify-center gap-2.5">
                      {variant.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          aria-label={`Màu ${color}`}
                          aria-pressed={colors[index] === color}
                          onClick={() => setColors((current) => current.map((item, i) => (i === index ? color : item)))}
                          className={`h-5 w-5 rounded-full border border-gray-300 ring-offset-2 transition ${colorDot[color] ?? "bg-gray-200"} ${
                            colors[index] === color ? "ring-2 ring-gray-900" : "hover:ring-2 hover:ring-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{colors[index]}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Tên + giá phiên bản bám đầu khi cuộn qua bảng (dưới thanh mục lục) */}
        <div
          className={`${gridClass} sticky z-20 mt-8 bg-white pb-3 pt-2`}
          style={{ ...gridStyle, top: "calc(var(--header-offset, 0px) + 53px)" }}
        >
          {variants.map((variant, index) => (
            <div key={variant.name} className={`bg-gray-100 px-3 py-3 text-center md:py-5 ${cellClass(index)} ${ordered(index)}`}>
              <p className="font-black md:text-xl">{variant.name}</p>
              <p className="text-xs text-gray-700 md:text-sm">Giá: {variant.price.toLocaleString("vi-VN")} VNĐ</p>
            </div>
          ))}
        </div>

        {/* Các nhóm thông số / trang bị */}
        <div>
          {groups.map((group, groupIndex) => {
            const isOpen = open.includes(group.title);
            return (
              // Nhóm sau nút "Xem thêm" chỉ ẩn bằng CSS, vẫn có trong HTML
              <div key={group.title} className={`border-b border-gray-300 ${!showAll && groupIndex >= INITIAL_GROUPS ? "hidden" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(group.title)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left text-lg font-bold uppercase tracking-wide md:py-8 md:text-2xl"
                  >
                    {group.title}
                    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-6 w-6 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="m5 9 7 7 7-7" />
                    </svg>
                  </button>
                </h3>
                {/* Nội dung luôn có trong HTML (Google đọc được), chỉ ẩn khi thu gọn */}
                <div className={isOpen ? "pb-8" : "hidden"}>
                  {group.rows.map((row) => (
                    <div key={row.label} className="mt-4">
                      <p className="text-sm font-semibold text-gray-800 md:text-base">{row.label}</p>
                      <div className={`${gridClass} mt-2`} style={gridStyle}>
                        {row.values.map((value, index) => (
                          <p
                            key={index}
                            className={`bg-gray-100 px-3 py-3 text-center text-sm md:text-base ${value === "Có" ? "font-semibold" : ""} ${cellClass(index)} ${ordered(index)}`}
                          >
                            {value ?? "–"}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {groups.length > INITIAL_GROUPS && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="border-b-2 border-gray-900 pb-0.5 text-sm font-black uppercase tracking-[0.25em]"
            >
              {showAll ? "Thu gọn" : `Xem thêm (${groups.length - INITIAL_GROUPS} nhóm)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
