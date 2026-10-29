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

// Tiêu đề trên Google KHÔNG có đuôi " | Lưu Hoàng Phúc" (anh Phúc chọn 29/10/2026, giống các web tư vấn khác):
// dành chỗ cho từ khóa; tên miền đã hiện phía trên tiêu đề, tên Phúc nằm trong mô tả.
// Ảnh chia sẻ (Open Graph) vẫn giữ tiêu đề đầy đủ có tên Phúc.
export function fitTitle(title: string) {
  const brand = siteConfig.sales.name;
  for (const suffix of [` | Mitsubishi ${brand}`, ` | ${brand}`]) {
    if (title.endsWith(suffix)) return title.slice(0, -suffix.length);
  }
  return title;
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
