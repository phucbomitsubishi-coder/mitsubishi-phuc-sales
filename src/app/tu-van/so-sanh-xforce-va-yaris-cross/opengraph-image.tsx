import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { promotionMonthLabel } from "@/lib/promotionItems";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Xforce hay Toyota Yaris Cross: nên mua xe nào?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const car = getCarBySlug("mitsubishi-xforce");

  return renderOgImage({
    kicker: `So sánh xe · Cập nhật ${promotionMonthLabel}`,
    title: alt,
    subtitle: "Giá lăn bánh, kích thước, xăng và hybrid, trang bị an toàn",
    images: car ? [car.image] : [],
    versus: competitors.toyotaYarisCross.name,
  });
}
