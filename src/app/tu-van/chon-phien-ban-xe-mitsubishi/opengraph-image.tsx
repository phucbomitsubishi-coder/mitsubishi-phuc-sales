import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Nên chọn phiên bản xe Mitsubishi nào?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Tư vấn chọn xe",
    title: alt,
    subtitle: "Khác biệt trang bị giữa các phiên bản và mức giá phù hợp",
    images: cars.slice(0, 3).map((car) => car.image),
  });
}
