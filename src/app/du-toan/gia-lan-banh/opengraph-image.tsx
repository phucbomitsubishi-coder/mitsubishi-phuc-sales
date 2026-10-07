import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Tính giá lăn bánh xe Mitsubishi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Công cụ dự toán",
    title: alt,
    subtitle: "Đủ 34 tỉnh, thành, đã trừ ưu đãi tháng của từng phiên bản",
    images: [cars[0].image],
  });
}
