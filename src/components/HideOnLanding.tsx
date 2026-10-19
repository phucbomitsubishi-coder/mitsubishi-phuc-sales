"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Landing page quảng cáo (/uu-dai/*) không hiện footer chung và nút Báo giá nhanh,
// để khách tập trung vào form (trang tự có footer ngắn riêng).
export default function HideOnLanding({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/uu-dai/")) return null;
  return children;
}
