import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Chi phí lăn bánh xe Mitsubishi gồm những gì?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Tư vấn chọn xe",
    title: alt,
    subtitle: "Trước bạ, biển số, đăng kiểm, phí đường bộ và bảo hiểm",
    images: [cars[0].image],
  });
}
