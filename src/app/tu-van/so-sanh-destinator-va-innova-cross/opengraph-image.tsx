import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { promotionMonthLabel } from "@/lib/promotionItems";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Destinator hay Toyota Innova Cross: nên mua xe nào?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const car = getCarBySlug("mitsubishi-destinator");

  return renderOgImage({
    kicker: `So sánh xe · Cập nhật ${promotionMonthLabel}`,
    title: alt,
    subtitle: "Giá lăn bánh, gầm xe, động cơ turbo và hybrid, trang bị an toàn",
    images: car ? [car.image] : [],
    versus: competitors.toyotaInnovaCross.name,
  });
}
