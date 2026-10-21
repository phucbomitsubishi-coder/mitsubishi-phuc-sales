"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import OnRoadPriceCalculator from "@/components/OnRoadPriceCalculator";
import type { VariantPromotion } from "@/data/promotions";

export type OnRoadCar = {
  id: string;
  slug: string;
  name: string;
  variants: { name: string; price: number; seats?: number; promotion?: VariantPromotion }[];
};

const select =
  "mt-1 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base font-semibold text-gray-900 outline-none focus:border-gray-950";

// Công cụ tính giá lăn bánh mở TẠI CHỖ (21/10/2026, đặt trong layout.tsx): bắt link /du-toan/gia-lan-banh
// (có thể kèm ?xe=<id>) trong nội dung trang → hộp thoại chọn xe, phiên bản + OnRoadPriceCalculator.
// Link trong menu đầu trang (header) và footer vẫn mở trang /du-toan/gia-lan-banh như cũ (trang SEO).
// Đang ở trang xe thì chọn sẵn xe đó. Bấm "Nhận báo giá" trong hộp thoại → QuoteDialog đóng hộp thoại này rồi mở form.
export default function OnRoadDialog({ cars }: { cars: OnRoadCar[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const uid = useId();
  const [carId, setCarId] = useState(cars[0]?.id ?? "");
  const [variantName, setVariantName] = useState(cars[0]?.variants[0]?.name ?? "");

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.closest("header, footer")) return;
      const href = link.getAttribute("href") ?? "";
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/du-toan/gia-lan-banh") return;
      const here = window.location.pathname;
      if (here === "/du-toan/gia-lan-banh") return;

      event.preventDefault();
      event.stopPropagation();
      const wanted = url.searchParams.get("xe");
      const car =
        cars.find((item) => item.id === wanted) ??
        cars.find((item) => here === `/xe/${item.slug}`);
      if (car) {
        setCarId(car.id);
        setVariantName(car.variants[0]?.name ?? "");
      }
      dialogRef.current?.showModal();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cars]);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  if (cars.length === 0) return null;
  const car = cars.find((item) => item.id === carId) ?? cars[0];
  const variant = car.variants.find((item) => item.name === variantName) ?? car.variants[0];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Tính giá lăn bánh"
      onClick={(event) => {
        // Bấm ra ngoài khung thì đóng (link "Nhận báo giá" bên trong: QuoteDialog tự đóng hộp thoại này)
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 md:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Đóng"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-2xl text-gray-600 transition hover:text-gray-950"
        >
          ✕
        </button>
        <p className="pr-10 text-xs font-bold uppercase tracking-[0.25em] text-red-700">Tính giá lăn bánh</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-car`} className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600">
              Dòng xe
            </label>
            <select
              id={`${uid}-car`}
              value={car.id}
              onChange={(event) => {
                const next = cars.find((item) => item.id === event.target.value) ?? cars[0];
                setCarId(next.id);
                setVariantName(next.variants[0]?.name ?? "");
              }}
              className={select}
            >
              {cars.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-variant`} className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600">
              Phiên bản
            </label>
            <select id={`${uid}-variant`} value={variant.name} onChange={(event) => setVariantName(event.target.value)} className={select}>
              {car.variants.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} · {item.price.toLocaleString("vi-VN")} đ
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <OnRoadPriceCalculator
            carName={car.name}
            variantName={variant.name}
            price={variant.price}
            seats={variant.seats}
            promotion={variant.promotion}
          />
        </div>
      </div>
    </dialog>
  );
}
