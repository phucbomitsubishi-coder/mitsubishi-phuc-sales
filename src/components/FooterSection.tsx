"use client";

import { useId, useState, type ReactNode } from "react";

// Một nhóm link ở footer: trên điện thoại thu gọn, bấm tiêu đề để mở (giống Toyota, Hyundai);
// từ md trở lên luôn mở. Link vẫn nằm trong HTML khi thu gọn nên Google vẫn đọc được.
export default function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-gray-800 md:border-0">
      <h3 className="font-bold uppercase tracking-wide">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-4 text-left uppercase tracking-wide md:pointer-events-none md:py-0"
        >
          {title}
          <span aria-hidden="true" className={`text-lg leading-none text-gray-400 transition md:hidden ${open ? "rotate-45" : ""}`}>
            +
          </span>
        </button>
      </h3>

      <div id={id} className={`${open ? "flex" : "hidden"} flex-col gap-3 pb-5 text-sm text-gray-300 md:mt-4 md:flex md:pb-0`}>
        {children}
      </div>
    </div>
  );
}
