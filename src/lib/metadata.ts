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

// Google chỉ hiện khoảng 60–65 ký tự tiêu đề. Đuôi " | Lưu Hoàng Phúc" chỉ thêm khi còn chỗ,
// để phần bị cắt không phải nội dung chính (25/10/2026). Ảnh chia sẻ (Open Graph) vẫn giữ tiêu đề đầy đủ.
const TITLE_LIMIT = 65;
export function fitTitle(title: string) {
  const brand = siteConfig.sales.name;
  const suffix = ` | ${brand}`;
  const base = title.endsWith(suffix) ? title.slice(0, -suffix.length) : title.endsWith(` | Mitsubishi ${brand}`) ? title.slice(0, -` | Mitsubishi ${brand}`.length) : title;
  const withBrand = `${base} | ${brand}`;
  return [...withBrand].length <= TITLE_LIMIT ? withBrand : base;
}

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
    title: fitTitle(fullTitle),
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
