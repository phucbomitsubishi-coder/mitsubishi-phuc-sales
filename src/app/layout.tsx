import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MetaPixel from "@/components/MetaPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import QuickQuote, { type QuickQuoteCar } from "@/components/QuickQuote";
import QuoteDialog, { type DialogCar } from "@/components/QuoteDialog";
import MobileActionBar from "@/components/MobileActionBar";
import OnRoadDialog, { type OnRoadCar } from "@/components/OnRoadDialog";
import ZaloPrefill from "@/components/ZaloPrefill";
import { cars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import HideOnLanding from "@/components/HideOnLanding";
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
    // Xác minh tên miền trong Meta Business (Domains), dùng cho quảng cáo Fanpage
    other: { "facebook-domain-verification": "bktqtfx8bz1ex7i8mya5viaxysdwgg" },
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
      sameAs: [siteConfig.social.fanpage, siteConfig.social.facebook, siteConfig.social.tiktok],
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

// Dữ liệu gọn cho nút "Báo giá nhanh" (không đưa cả cars.ts vào bundle client)
const quickQuoteCars: QuickQuoteCar[] = cars.map((car) => {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  return {
    id: car.id,
    name: car.name,
    seats: car.variants[0]?.specifications?.seats,
    variants: car.variants.map((variant) => ({
      name: variant.name,
      price: variant.price,
      promotion:
        promotion?.variants
          .find((item) => item.variantName === variant.name)
          ?.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0) ?? 0,
    })),
  };
});

// Hộp thoại báo giá / lái thử và thanh đáy điện thoại dùng chung toàn site (21/10/2026)
const dialogCars: DialogCar[] = cars.map((car) => ({
  id: car.id,
  slug: car.slug,
  name: car.name,
  variantNames: car.variants.map((variant) => variant.name),
}));

// Công cụ tính lăn bánh mở tại chỗ (OnRoadDialog): giá, số chỗ, ưu đãi tháng từng phiên bản
const onRoadCars: OnRoadCar[] = cars.map((car) => {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    variants: car.variants.map((variant) => ({
      name: variant.name,
      price: variant.price,
      seats: variant.specifications?.seats,
      promotion: promotion?.variants.find((item) => item.variantName === variant.name),
    })),
  };
});

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
  <div className="flex-1">{children}</div>
  <HideOnLanding><SiteFooter /></HideOnLanding>
  <Analytics />
  <MetaPixel />
  <GoogleAnalytics />
  <HideOnLanding><QuickQuote cars={quickQuoteCars} zaloUrl={siteConfig.contact.zaloUrl} phoneUrl={siteConfig.contact.phoneUrl} /></HideOnLanding>
  <HideOnLanding><QuoteDialog cars={dialogCars} /></HideOnLanding>
  <HideOnLanding><MobileActionBar cars={dialogCars} /></HideOnLanding>
  <HideOnLanding><OnRoadDialog cars={onRoadCars} /></HideOnLanding>
  <ZaloPrefill cars={dialogCars} />
</body>
    </html>
  );
}
