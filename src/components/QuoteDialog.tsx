"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import VariantLeadForm from "@/components/VariantLeadForm";
import TestDriveLeadForm from "@/components/TestDriveLeadForm";
import { toLeadSource } from "@/lib/leadScripts";
import { siteConfig } from "@/config/site";

export type DialogCar = { id: string; slug: string; name: string; variantNames: string[] };

type Mode = "quote" | "test-drive";

// Hộp thoại báo giá / lái thử DÙNG CHUNG TOÀN SITE (21/10/2026, đặt trong layout.tsx; trước đó chỉ có trên trang xe).
// Bắt mọi link (giai đoạn capture, chạy trước <Link> của Next.js) để khách điền form ngay tại trang đang xem:
// - /?car=<tên xe>&variant=...&nguon=...#bao-gia  → "Nhận báo giá"
// - /dang-ky-lai-thu?xe=<id xe>&nguon=...          → "Đăng ký lái thử" (trừ khi đang ở chính trang /dang-ky-lai-thu)
// Link không ghi xe → hộp thoại có ô chọn dòng xe (đang ở trang xe thì chọn sẵn xe đó).
// Link ghi xe không có trong danh sách (vd xe sắp ra mắt) → để link chạy như cũ (về form trang chủ).
// Không có JavaScript hoặc Ctrl/Cmd + bấm thì link vẫn mở trang như cũ.
export default function QuoteDialog({ cars }: { cars: DialogCar[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const uid = useId();
  const [state, setState] = useState<{ mode: Mode; carId: string; chooseCar: boolean; variant: string; source: string; key: number }>({
    mode: "quote",
    carId: cars[0]?.id ?? "",
    chooseCar: false,
    variant: cars[0]?.variantNames[0] ?? "",
    source: "Hộp thoại báo giá",
    key: 0,
  });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank") return;
      const href = link.getAttribute("href") ?? "";
      if (!href || href.startsWith("tel:") || href.startsWith("mailto:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const params = url.searchParams;
      const here = window.location.pathname;

      let mode: Mode | undefined;
      let car: DialogCar | undefined;
      if (url.pathname === "/" && url.hash === "#bao-gia") {
        const name = params.get("car");
        car = name ? cars.find((item) => item.name === name) : undefined;
        if (name && !car) return;
        mode = "quote";
      } else if (url.pathname === "/dang-ky-lai-thu" && here !== "/dang-ky-lai-thu") {
        const id = params.get("xe");
        car = id ? cars.find((item) => item.id === id) : undefined;
        if (id && !car) return;
        mode = "test-drive";
      }
      if (!mode) return;

      // Chặn cả xử lý của <Link> để không chuyển trang
      event.preventDefault();
      event.stopPropagation();

      const onCarPage = here.startsWith("/xe/");
      const pageCar = onCarPage ? cars.find((item) => here === `/xe/${item.slug}`) : undefined;
      const picked = car ?? pageCar;
      const variant = params.get("variant");
      const fallback = mode === "quote" ? (onCarPage ? "Form trang xe" : "Hộp thoại báo giá") : onCarPage ? "Lái thử trang xe" : "Hộp thoại lái thử";

      setState((current) => {
        const carId = picked?.id ?? current.carId;
        const variantNames = cars.find((item) => item.id === carId)?.variantNames ?? [];
        return {
          mode: mode as Mode,
          carId,
          chooseCar: !car,
          variant: variant && variantNames.includes(variant) ? variant : variantNames[0] ?? "",
          source: toLeadSource(params.get("nguon"), fallback),
          key: current.key + 1,
        };
      });
      // Đóng hộp thoại khác đang mở (vd đang ở hộp thoại tính lăn bánh bấm "Nhận báo giá")
      document.querySelectorAll("dialog[open]").forEach((dialog) => {
        if (dialog !== dialogRef.current) (dialog as HTMLDialogElement).close();
      });
      dialogRef.current?.showModal();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cars]);

  // Chuyển trang (vd bấm link trong form) thì đóng hộp thoại
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  if (cars.length === 0) return null;
  const car = cars.find((item) => item.id === state.carId) ?? cars[0];
  const isTestDrive = state.mode === "test-drive";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      onClick={(event) => {
        // Bấm ra ngoài khung form thì đóng
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 md:p-10">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Đóng"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-2xl text-gray-600 transition hover:text-gray-950"
        >
          ✕
        </button>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">{isTestDrive ? "Đăng ký lái thử" : "Nhận báo giá"}</p>
        <h2 id={`${uid}-title`} className="mt-3 pr-8 text-2xl font-black tracking-tight md:text-3xl">
          {state.chooseCar ? (isTestDrive ? "Chọn xe bạn muốn lái thử" : "Chọn xe bạn quan tâm") : car.name}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {isTestDrive
            ? `Lái thử tại showroom ${siteConfig.dealer.name} hoặc Phúc mang xe đến tận nhà. Để lại thông tin, Phúc gọi lại xác nhận lịch.`
            : "Để lại họ tên và số điện thoại, Phúc gửi báo giá lăn bánh, ưu đãi tháng và phương án trả góp."}
        </p>

        {state.chooseCar && (
          <div className="mt-5">
            <label htmlFor={`${uid}-car`} className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600">
              Dòng xe
            </label>
            <select
              id={`${uid}-car`}
              value={car.id}
              onChange={(event) => {
                const next = cars.find((item) => item.id === event.target.value) ?? cars[0];
                setState((current) => ({ ...current, carId: next.id, variant: next.variantNames[0] ?? "" }));
              }}
              className="mt-1 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base font-semibold text-gray-900 outline-none focus:border-gray-950"
            >
              {cars.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {isTestDrive ? (
          <TestDriveLeadForm key={`${state.key}-${car.id}`} carName={car.name} variantNames={car.variantNames} selectedVariant={state.variant} source={state.source} />
        ) : (
          <VariantLeadForm key={`${state.key}-${car.id}`} carName={car.name} variantNames={car.variantNames} selectedVariant={state.variant} source={state.source} />
        )}
      </div>
    </dialog>
  );
}
