"use client";

import type { ReactNode, RefObject } from "react";
import { panelButtonClass } from "@/components/useHeaderPanel";

// Nút trên menu máy tính mở bảng toàn màn hình ("Sản phẩm", "Mua xe")
export default function PanelButton({
  label,
  open,
  highlight,
  controls,
  onClick,
  buttonRef,
}: {
  label: ReactNode;
  open: boolean;
  highlight: boolean;
  controls: string;
  onClick: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button ref={buttonRef} type="button" aria-expanded={open} aria-controls={controls} onClick={onClick} className={panelButtonClass(open || highlight)}>
      {label}
      <svg aria-hidden="true" viewBox="0 0 16 16" className={`ml-1.5 h-4 w-4 transition ${open ? "rotate-180 text-red-500" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="m3 6 5 5 5-5" />
      </svg>
      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transition ${open || highlight ? "opacity-100" : "opacity-0"}`} />
    </button>
  );
}

// Nút ✕ đóng bảng
export function PanelClose({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] top-5 z-10 flex h-11 w-11 items-center justify-center text-gray-600 transition hover:text-gray-950"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  );
}
