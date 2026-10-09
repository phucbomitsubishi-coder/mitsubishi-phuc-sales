import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Mua xe Mitsubishi giao toàn quốc";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Mua xe từ tỉnh khác",
    title: alt,
    subtitle: "Đặt cọc online, hỗ trợ đăng ký, giá lăn bánh 34 tỉnh, thành",
    images: [cars[0].image],
  });
}
