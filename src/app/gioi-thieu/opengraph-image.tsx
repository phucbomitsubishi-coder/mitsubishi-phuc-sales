import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { siteConfig } from "@/config/site";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = `${siteConfig.sales.name} – Tư vấn bán hàng Mitsubishi`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Giới thiệu",
    title: siteConfig.sales.name,
    subtitle: `Tư vấn bán hàng tại ${siteConfig.dealer.name}. Báo giá, trả góp, lái thử tận nhà`,
    images: ["/images/about/luu-hoang-phuc.jpg"],
    portrait: true,
  });
}
