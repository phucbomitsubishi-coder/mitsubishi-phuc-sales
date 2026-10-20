"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { trackPixel } from "@/lib/metaPixel";

// Meta Pixel cho quảng cáo Facebook (Fanpage Phúc Mitsubishi Auto).
// - PageView: mỗi lần mở trang, kể cả khi chuyển trang trong website (App Router không tải lại trang).
// - Contact: khi bấm link gọi điện (tel:) hoặc Zalo.
// - Lead: gửi từ QuoteForm và trang đăng ký lái thử khi gửi form thành công.
// Đã ghi trong /chinh-sach-bao-mat; đổi cách theo dõi thì cập nhật trang đó.
// Tốc độ (19/10/2026): fbevents.js nặng ~200 KB, chặn luồng chính ~350 ms. Pixel chỉ được tải khi khách
// bắt đầu thao tác (cuộn, chạm, gõ phím) hoặc sau 4 giây; landing page quảng cáo /uu-dai/* vẫn tải ngay.
// Lead/Contact luôn được đếm vì khách phải thao tác trước khi gửi form hoặc bấm gọi.
const pixelId = siteConfig.tracking.metaPixelId;
const FALLBACK_DELAY = 4000;

function loadPixel() {
  const w = window as unknown as { fbq?: unknown };
  if (w.fbq) return;
  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`;
  document.head.appendChild(script);
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // Tải Pixel: ngay với landing quảng cáo, còn lại chờ khách thao tác hoặc hết 4 giây
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (window.location.pathname.startsWith("/uu-dai/")) {
      loadPixel();
      return;
    }
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((name) => window.removeEventListener(name, start));
      clearTimeout(timer);
      loadPixel();
    };
    const timer = setTimeout(start, FALLBACK_DELAY);
    events.forEach((name) => window.addEventListener(name, start, { once: true, passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((name) => window.removeEventListener(name, start));
    };
  }, []);

  // Đoạn mã gốc đã gửi PageView cho trang đầu tiên, nên chỉ gửi thêm khi chuyển trang
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    trackPixel("PageView");
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackPixel("Contact", { content_name: "Goi dien", content_category: window.location.pathname });
      } else if (href.includes("zalo.me")) {
        trackPixel("Contact", { content_name: "Zalo", content_category: window.location.pathname });
      }
    }
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
