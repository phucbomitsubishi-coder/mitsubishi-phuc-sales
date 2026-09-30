import type { Metadata } from "next";
import { Be_Vietnam_Pro, Roboto } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc: 0858 678 929.",
  verification: {
    google: "lQesEnQkjgxVoGmnCBwKvD8J8v8y5wlsF178d9ddSZI",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
  lang="vi"
  className={`${roboto.className} h-full antialiased`}
>
    
      <body className="min-h-full flex flex-col">
  <main className="flex-1">{children}</main>
  <SiteFooter />
</body>
    </html>
  );
}
