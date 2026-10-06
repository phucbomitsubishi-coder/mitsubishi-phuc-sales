import type { Car } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import type { PromotionTabItem } from "@/components/PromotionTabs";

// Dựng dữ liệu ưu đãi theo dòng xe từ promotions.ts.
// Không đặt hàm này trong promotions.ts vì add-news.mjs ghi đè file đó mỗi tháng.
export function buildPromotionItem(car: Car): PromotionTabItem {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);

  const variants = (promotion?.variants ?? []).map((variant) => ({
    name: [variant.variantName, variant.modelYear].filter(Boolean).join(" "),
    price: variant.retailPrice,
    benefits: variant.benefits.map(({ label, value }) => ({ label, value })),
    total: variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0),
  }));

  return {
    carId: car.id,
    carName: car.name,
    carSlug: car.slug,
    carImage: car.image,
    maxValue: Math.max(0, ...variants.map((variant) => variant.total)),
    variants,
  };
}

export function formatMillion(value: number) {
  return `${(value / 1_000_000).toLocaleString("vi-VN", {
    maximumFractionDigits: 1,
  })} triệu`;
}

export const promotionMonthLabel = `${String(currentPromotion.month).padStart(2, "0")}/${currentPromotion.year}`;

// Tên ngắn các quyền lợi (không trùng) của một xe: "100% phí trước bạ, phiếu nhiên liệu"
export function benefitSummary(item: PromotionTabItem) {
  const names = new Set<string>();

  for (const variant of item.variants) {
    for (const benefit of variant.benefits) {
      const name = benefit.label
        .replace(/\s*\(.*?\)\s*$/, "")
        .replace(/^Ưu đãi tương đương\s*/i, "")
        .trim();
      if (name) names.add(name.charAt(0).toLowerCase() + name.slice(1));
    }
  }

  return [...names].join(", ");
}
