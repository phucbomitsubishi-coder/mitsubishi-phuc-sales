"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EVENT = "header-panel-open";

// Trạng thái bảng thả xuống toàn màn hình trên menu máy tính ("Sản phẩm", "Mua xe"):
// khóa cuộn trang khi mở, đóng bằng Esc, tự đóng khi chuyển trang, mỗi lúc chỉ mở 1 bảng.
export function useHeaderPanel(id: string) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Bảng khác mở thì đóng bảng này
  useEffect(() => {
    const onOther = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) setOpen(false);
    };
    window.addEventListener(EVENT, onOther);
    return () => window.removeEventListener(EVENT, onOther);
  }, [id]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
    setOpen(!open);
  };

  return { open, toggle, close: () => setOpen(false), buttonRef, pathname };
}

// Nút mở bảng trên menu (chữ in hoa, mũi tên, gạch đỏ khi mở hoặc đang ở trang thuộc mục đó)
export const panelButtonClass = (highlight: boolean) =>
  `relative flex h-full items-center whitespace-nowrap uppercase transition hover:text-white ${highlight ? "text-white" : "text-white/80"}`;

export const panelClass =
  "fixed inset-x-0 bottom-0 top-[104px] z-40 overflow-y-auto bg-[linear-gradient(115deg,#ffffff_45%,#f1f1f1_45%)] normal-case tracking-normal text-gray-950";
