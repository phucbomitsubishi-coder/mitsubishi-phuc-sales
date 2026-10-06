import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Đăng ký lái thử xe Mitsubishi",
  description:
    "Đăng ký lái thử xe Mitsubishi Xforce, Xpander, Triton, Destinator và nhận tư vấn tại Mitsubishi Moveo New City.",
  path: "/dang-ky-lai-thu",
});

export default function DangKyLaiThuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}