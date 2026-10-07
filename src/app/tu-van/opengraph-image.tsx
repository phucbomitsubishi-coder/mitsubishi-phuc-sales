import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Tư vấn chọn xe Mitsubishi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Tư vấn",
    title: alt,
    subtitle: "Chọn xe, chọn phiên bản, chi phí lăn bánh và so sánh với xe cùng tầm giá",
    images: cars.slice(0, 3).map((car) => car.image),
  });
}
