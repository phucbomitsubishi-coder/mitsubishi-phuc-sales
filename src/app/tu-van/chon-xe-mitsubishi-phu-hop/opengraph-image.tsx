import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Chọn xe Mitsubishi phù hợp với nhu cầu";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Tư vấn chọn xe",
    title: alt,
    subtitle: "Gia đình, chạy dịch vụ hay chở hàng: gợi ý mẫu xe theo nhu cầu",
    images: cars.slice(0, 3).map((car) => car.image),
  });
}
