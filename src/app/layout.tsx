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
   metadataBase: new URL("https://www.mitsubishiauto.vn"),
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc: 0858 678 929.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "lQesEnQkjgxVoGmnCBwKvD8J8v8y5wlsF178d9ddSZI",
  },
  openGraph: {
  type: "website",
  locale: "vi_VN",
  url: "https://www.mitsubishiauto.vn",
  siteName: "Mitsubishi Lưu Hoàng Phúc",
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc: 0858 678 929.",
  images: [
    {
      url: "/images/og/og-default.jpg",
      width: 1200,
      height: 630,
      alt: "Mitsubishi Bình Dương - Lưu Hoàng Phúc",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc: 0858 678 929.",
  images: ["/images/og/og-default.jpg"],
},
};
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": "https://www.mitsubishiauto.vn/#autodealer",
  name: "Mitsubishi Moveo New City",
  url: "https://www.mitsubishiauto.vn",
  logo: "https://www.mitsubishiauto.vn/images/logo/logo-black.svg",
  image: "https://www.mitsubishiauto.vn/images/logo/logo-mobile-new.png",
  telephone: "+84858678929",
  email: "phucbo.mitsubishi@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lô C1C, Đường Hùng Vương",
    addressLocality: "Phường Bình Dương",
    addressRegion: "Thành phố Hồ Chí Minh",
    addressCountry: "VN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
  lang="vi"
  className={`${roboto.className} h-full antialiased`}
>
    
      <body className="min-h-full flex flex-col">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(localBusinessSchema),
  }}
/>
  <main className="flex-1">{children}</main>
  <SiteFooter />
</body>
    </html>
  );
}
