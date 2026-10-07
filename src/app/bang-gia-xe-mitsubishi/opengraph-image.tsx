import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { cars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

// Ảnh chia sẻ khi gửi link trang này qua Facebook, Zalo (khung chung ở src/lib/ogImage.tsx)
export const alt = `Bảng giá xe Mitsubishi tháng ${promotionMonthLabel}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const maxPromotion = Math.max(
    0,
    ...currentPromotion.cars.flatMap((car) =>
      car.variants.map((variant) =>
        variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0)
      )
    )
  );

  return renderOgImage({
    kicker: `Cập nhật tháng ${promotionMonthLabel}`,
    title: `Bảng giá xe Mitsubishi tháng ${promotionMonthLabel}`,
    subtitle: `Giá lăn bánh từng phiên bản, ưu đãi đến ${formatMillion(maxPromotion)} đồng`,
    images: cars.slice(0, 4).map((car) => car.image),
  });
}
