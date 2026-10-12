import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { promotionMonthLabel } from "@/lib/promotionItems";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Xpander Cross hay Suzuki XL7 Hybrid: nên mua xe nào?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const car = getCarBySlug("mitsubishi-xpander-cross");

  return renderOgImage({
    kicker: `So sánh xe · Cập nhật ${promotionMonthLabel}`,
    title: alt,
    subtitle: "Giá lăn bánh, gầm xe, mức tiêu thụ nhiên liệu và trang bị",
    images: car ? [car.image] : [],
    versus: competitors.suzukiXL7.name,
  });
}
