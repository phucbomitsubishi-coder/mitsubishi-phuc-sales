"use client";

import { useId, useState, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

// Tab gạch chân kiểu trang MMV/Hyundai (21/10/2026): hàng tab vuốt ngang trên điện thoại,
// chỉ hiện 1 khối mỗi lần. Khối ẩn vẫn nằm trong HTML (thuộc tính hidden) nên Google vẫn đọc đủ nội dung.
// showNext: thêm nút "Tiếp: <tab sau> →" dưới khối đang mở để khách xem lần lượt.
export default function Tabs({ tabs, label, showNext = false, dark = false }: { tabs: TabItem[]; label: string; showNext?: boolean; dark?: boolean }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;
  const next = tabs[(active + 1) % tabs.length];

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className={`-mx-6 flex gap-6 overflow-x-auto border-b px-6 [scrollbar-width:none] md:mx-0 md:gap-9 md:px-0 [&::-webkit-scrollbar]:hidden ${dark ? "border-white/15" : "border-gray-200"}`}
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              id={`${uid}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                const to = (active + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
                setActive(to);
                document.getElementById(`${uid}-tab-${tabs[to].id}`)?.focus();
              }}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-2 pb-3 text-sm font-bold uppercase tracking-[0.15em] transition ${
                selected
                  ? `border-red-600 ${dark ? "text-white" : "text-gray-950"}`
                  : `border-transparent ${dark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-950"}`
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${uid}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab.id}`}
          hidden={index !== active}
          className="pt-8 md:pt-10"
        >
          {tab.content}
        </div>
      ))}

      {showNext && tabs.length > 1 && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setActive((active + 1) % tabs.length)}
            className={`text-sm font-bold uppercase tracking-[0.15em] transition hover:text-red-600 ${dark ? "text-white" : "text-gray-950"}`}
          >
            Tiếp: {next.label} →
          </button>
        </div>
      )}
    </div>
  );
}
