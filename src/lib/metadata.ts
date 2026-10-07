import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const defaultOgImage = {
  url: "/images/og/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Mitsubishi Bình Dương - Lưu Hoàng Phúc",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  // true khi thư mục trang có file opengraph-image.tsx: bỏ ảnh mặc định để Next dùng ảnh riêng của trang
  hasOgImageFile?: boolean;
};

// Metadata cho trang tĩnh: tiêu đề luôn có tên thương hiệu, và có Open Graph riêng
// để khi chia sẻ link qua Zalo/Facebook hiện đúng tiêu đề, mô tả và URL của trang.
export function createPageMetadata({
  title,
  description,
  path,
  hasOgImageFile = false,
}: PageMetadataInput): Metadata {
  const brand = siteConfig.sales.name;
  const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: path,
      siteName: siteConfig.seo.siteName,
      title: fullTitle,
      description,
      ...(hasOgImageFile ? {} : { images: [defaultOgImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(hasOgImageFile ? {} : { images: [defaultOgImage.url] }),
    },
  };
}
