"use client";

import { useEffect, useRef, useState } from "react";
import VariantLeadForm from "@/components/VariantLeadForm";
import TestDriveLeadForm from "@/components/TestDriveLeadForm";
import { toLeadSource } from "@/lib/leadScripts";
import { siteConfig } from "@/config/site";

type Props = {
  carName: string;
  carId: string;
  variantNames: string[];
};

type Mode = "quote" | "test-drive";

// Form báo giá / lái thử ẩn trên trang xe, chỉ mở khi khách bấm nút (khách chủ động nên không phải popup
// làm phiền). Bắt mọi link trên trang (giai đoạn capture, chạy trước <Link> của Next.js):
// - /?car=<xe này>&variant=...&nguon=...#bao-gia  → hộp thoại "Nhận báo giá"
// - /dang-ky-lai-thu?xe=<id xe này>&nguon=...      → hộp thoại "Đăng ký lái thử"
// Điền sẵn phiên bản (nếu link có) và nguồn. Không có JavaScript hoặc Ctrl/Cmd + bấm thì link vẫn mở trang như cũ.
export default function QuoteDialog({ carName, carId, variantNames }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<{ mode: Mode; variant: string; source: string; key: number }>({
    mode: "quote",
    variant: variantNames[0] ?? "",
    source: "Form trang xe",
    key: 0,
  });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      const url = new URL(href || "/", window.location.origin);
      const params = url.searchParams;

      let mode: Mode | undefined;
      if (url.pathname === "/" && url.hash === "#bao-gia" && params.get("car") === carName) mode = "quote";
      if (url.pathname === "/dang-ky-lai-thu" && params.get("xe") === carId) mode = "test-drive";
      if (!mode) return;

      // Chặn cả xử lý của <Link> để không chuyển trang
      event.preventDefault();
      event.stopPropagation();
      const variant = params.get("variant");
      setState((current) => ({
        mode: mode as Mode,
        variant: variant && variantNames.includes(variant) ? variant : current.variant,
        source: toLeadSource(params.get("nguon"), mode === "quote" ? "Form trang xe" : "Lái thử trang xe"),
        key: current.key + 1,
      }));
      dialogRef.current?.showModal();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [carName, carId, variantNames]);

  const isTestDrive = state.mode === "test-drive";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quote-dialog-title"
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
        <h2 id="quote-dialog-title" className="mt-3 pr-8 text-2xl font-black tracking-tight md:text-3xl">
          {carName}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {isTestDrive
            ? `Lái thử tại showroom ${siteConfig.dealer.name} hoặc Phúc mang xe đến tận nhà. Để lại thông tin, Phúc gọi lại xác nhận lịch.`
            : "Để lại họ tên và số điện thoại, Phúc gửi báo giá lăn bánh, ưu đãi tháng và phương án trả góp."}
        </p>
        {isTestDrive ? (
          <TestDriveLeadForm key={state.key} carName={carName} variantNames={variantNames} selectedVariant={state.variant} source={state.source} />
        ) : (
          <VariantLeadForm key={state.key} carName={carName} variantNames={variantNames} selectedVariant={state.variant} source={state.source} />
        )}
      </div>
    </dialog>
  );
}
