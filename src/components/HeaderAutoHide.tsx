"use client";

import { useEffect } from "react";

// Điện thoại/tablet (< 1280px): ẩn thanh trên cùng khi khách cuộn xuống, hiện lại khi cuộn lên
// (giống web Mitsubishi Việt Nam), để nội dung không bị che. Không ẩn khi menu đang mở.
// Đặt biến CSS --header-offset (chiều cao header đang hiện, hoặc 0) cho các thanh bám đầu trang khác.
export default function HeaderAutoHide() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const root = document.documentElement;
    let lastY = window.scrollY;
    let hidden = false;
    let ticking = false;

    const apply = (hide: boolean) => {
      hidden = hide;
      header.dataset.hidden = hide ? "true" : "false";
      root.style.setProperty("--header-offset", hide ? "0px" : `${header.offsetHeight}px`);
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const desktop = window.innerWidth >= 1280;
      const menuOpen = !!header.querySelector('[aria-expanded="true"]');
      if (desktop || menuOpen || y < 120) {
        if (hidden) apply(false);
        lastY = y;
        return;
      }
      // Chỉ đổi trạng thái khi đã cuộn quá 8px theo một hướng (tránh nhấp nháy khi cuộn chậm)
      if (Math.abs(y - lastY) < 8) return;
      if (y > lastY && !hidden) apply(true);
      else if (y < lastY && hidden) apply(false);
      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    apply(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
