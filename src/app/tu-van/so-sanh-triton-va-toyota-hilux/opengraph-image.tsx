import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { promotionMonthLabel } from "@/lib/promotionItems";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Triton hay Toyota Hilux: nên mua bán tải nào?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const car = getCarBySlug("mitsubishi-triton");

  return renderOgImage({
    kicker: `So sánh xe · Cập nhật ${promotionMonthLabel}`,
    title: alt,
    subtitle: "Giá lăn bánh, động cơ dầu, hệ dẫn động 4WD và trang bị an toàn",
    images: car ? [car.image] : [],
    versus: competitors.toyotaHilux.name,
  });
}
