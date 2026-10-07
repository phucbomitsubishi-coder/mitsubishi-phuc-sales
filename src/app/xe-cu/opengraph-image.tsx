import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { usedCars } from "@/data/usedCars";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = "Xe Mitsubishi đã qua sử dụng";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const car = usedCars.find((item) => item.status === "available") ?? usedCars[0];

  return renderOgImage({
    kicker: "Xe đã qua sử dụng",
    title: alt,
    subtitle: "Xe rõ lịch sử, hỗ trợ trả góp và sang tên tại Bình Dương – TP.HCM",
    images: car ? [car.image] : [],
  });
}
