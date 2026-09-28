import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc: 0858 678 929.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
