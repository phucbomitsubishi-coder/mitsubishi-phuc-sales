"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

// Google Analytics 4 (28/10/2026): đo khách đến từ đâu, trang nào được xem, và chuyển đổi
// (generate_lead khi gửi form, contact khi bấm Gọi/Zalo: gửi qua trackPixel trong src/lib/metaPixel.ts).
// Lượt xem trang khi chuyển trang trong website do "Đo lường nâng cao" của GA4 tự bắt (lịch sử trình duyệt).
// Không gửi họ tên, số điện thoại cho Google. Đã ghi trong /chinh-sach-bao-mat.
// Tốc độ: hàng đợi gtag có ngay khi mở trang (sự kiện sớm không bị mất), còn gtag.js chỉ tải khi khách
// bắt đầu thao tác hoặc sau 4 giây, giống Meta Pixel; landing /uu-dai/* tải ngay.
const measurementId = siteConfig.tracking.gaMeasurementId;
const FALLBACK_DELAY = 4000;

function loadScript() {
  if (document.getElementById("ga4")) return;
  const script = document.createElement("script");
  script.id = "ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (!w.gtag) {
      w.dataLayer = w.dataLayer || [];
      // gtag.js đọc hàng đợi theo dạng đối tượng arguments, nên phải đẩy `arguments`, không đẩy mảng
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", measurementId);
    }
    if (window.location.pathname.startsWith("/uu-dai/")) {
      loadScript();
      return;
    }
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((name) => window.removeEventListener(name, start));
      clearTimeout(timer);
      loadScript();
    };
    const timer = setTimeout(start, FALLBACK_DELAY);
    events.forEach((name) => window.addEventListener(name, start, { once: true, passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((name) => window.removeEventListener(name, start));
    };
  }, []);

  return null;
}
