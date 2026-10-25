import { cars } from "@/data/cars";
import { stockItems, stockUpdated, type StockItem } from "@/data/stock";

// Bảng tồn kho cũ hơn số ngày này thì ẩn mọi hiển thị "có sẵn/đang về" (tránh báo xe sẵn khi đã bán).
// Tính lúc build: web build lại mỗi lần push, nên nếu lâu không push thì vẫn hiện bảng cũ; khi cập nhật tồn kho nhớ push.
export const STOCK_MAX_AGE_DAYS = 21;

export const stockDateLabel = stockUpdated.split("-").reverse().join("/");

const isFresh = (Date.now() - new Date(`${stockUpdated}T00:00:00+07:00`).getTime()) / 86_400_000 <= STOCK_MAX_AGE_DAYS;

// Chỉ giữ mục khớp đúng xe đang bán + phiên bản + màu trong cars.ts (gõ sai thì bỏ, không hiện sai)
export const validStock: StockItem[] = isFresh
  ? stockItems.filter((item) => {
      const variant = cars.find((car) => car.id === item.carId)?.variants.find((v) => v.name === item.variant);
      return !!variant?.colors?.includes(item.color);
    })
  : [];

// Theo phiên bản: { "Luxury": { available: ["Xám"], incoming: ["Đỏ"] } }
export function stockByVariant(carId: string) {
  const result: Record<string, { available: string[]; incoming: string[] }> = {};
  for (const item of validStock.filter((stock) => stock.carId === carId)) {
    result[item.variant] ??= { available: [], incoming: [] };
    result[item.variant][item.status].push(item.color);
  }
  return result;
}
