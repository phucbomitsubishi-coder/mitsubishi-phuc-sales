import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/config/site";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const { sales, dealer } = siteConfig;
const siteDescription = `Mitsubishi Bình Dương - Tư vấn mua xe Mitsubishi, báo giá, khuyến mãi, hỗ trợ trả góp và đăng ký lái thử. Liên hệ ${sales.name}: ${sales.phoneDisplay}.`;

export const metadata: Metadata = {
   metadataBase: new URL("https://www.mitsubishiauto.vn"),
  title: "Mitsubishi Bình Dương | Lưu Hoàng Phúc",
  description: siteDescription,
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
  description: siteDescription,
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
  description: siteDescription,
  images: ["/images/og/og-default.jpg"],
},
};
// Website cá nhân của tư vấn bán hàng: chủ thể chính là Person (SĐT, email riêng),
// đại lý chỉ là nơi làm việc. Không gắn SĐT/email/logo cá nhân cho đại lý,
// tránh khai báo sai danh tính theo hướng dẫn dữ liệu có cấu trúc của Google.
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.mitsubishiauto.vn/#website",
      name: siteConfig.seo.siteName,
      url: "https://www.mitsubishiauto.vn",
      inLanguage: "vi-VN",
      publisher: { "@id": "https://www.mitsubishiauto.vn/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://www.mitsubishiauto.vn/#person",
      name: sales.name,
      jobTitle: sales.title,
      url: "https://www.mitsubishiauto.vn/gioi-thieu",
      telephone: `+84${sales.phone.slice(1)}`,
      email: sales.email,
      sameAs: [siteConfig.social.facebook, siteConfig.social.tiktok],
      worksFor: { "@id": "https://www.mitsubishiauto.vn/#autodealer" },
    },
    {
      "@type": "AutoDealer",
      "@id": "https://www.mitsubishiauto.vn/#autodealer",
      name: dealer.name,
      brand: { "@type": "Brand", name: dealer.brand },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lô C1C, Đường Hùng Vương",
        addressLocality: "Phường Bình Dương",
        addressRegion: "Thành phố Hồ Chí Minh",
        addressCountry: "VN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.hours.days,
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    },
  ],
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
    __html: JSON.stringify(siteSchema),
  }}
/>
  <main className="flex-1">{children}</main>
  <SiteFooter />
  <Analytics />
</body>
    </html>
  );
}
