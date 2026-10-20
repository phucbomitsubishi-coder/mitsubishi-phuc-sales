"use client";

import { useEffect } from "react";

// Mở <details> có id trùng với #hash của URL (ví dụ /phu-kien-xe-mitsubishi#destinator từ trang xe),
// rồi cuộn tới đó. Chạy cả khi hash đổi trên cùng trang.
export default function OpenDetailsFromHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const element = id ? document.getElementById(id) : null;
      if (element instanceof HTMLDetailsElement) {
        element.open = true;
        element.scrollIntoView({ block: "start" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
