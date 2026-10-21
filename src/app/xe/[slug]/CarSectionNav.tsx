"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

// Thanh mục lục bám đầu trang xe (giống thanh "Ford Ranger | Đặt cọc & Lái thử" của Ford, mục lục của Hyundai):
// tên xe bên trái (máy tính), các mục ở giữa, nút báo giá luôn hiện bên phải. Tự đánh dấu phần đang xem.
// Nằm ngay dưới header (biến --header-offset do HeaderAutoHide đặt).
export default function CarSectionNav({ items, carName, quoteHref }: { items: Item[]; carName: string; quoteHref: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => !!element);
    if (sections.length === 0) return;

    const onScroll = () => {
      // Phần đang xem = phần cuối cùng có mép trên đã qua 1/3 màn hình
      const line = window.innerHeight / 3;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  // Giữ nút đang chọn trong tầm nhìn khi thanh phải vuốt ngang (điện thoại)
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && link) {
      list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Mục lục trang xe"
      className="sticky z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur transition-[top] duration-200"
      style={{ top: "var(--header-offset, 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 md:px-6">
        <p className="hidden shrink-0 text-lg font-black tracking-tight lg:block">{carName}</p>
        <div
          ref={listRef}
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto py-2 [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative shrink-0 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition ${
                active === item.id ? "text-gray-950" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 -bottom-2 h-0.5 bg-red-600 transition ${active === item.id ? "opacity-100" : "opacity-0"}`}
              />
            </a>
          ))}
        </div>
        <Link
          href={quoteHref}
          className="shrink-0 bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
        >
          Báo giá
        </Link>
      </div>
    </nav>
  );
}
