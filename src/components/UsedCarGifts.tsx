import { getActiveUsedCarPromotion } from "@/data/usedCarPromotion";

// Khối "Quà tặng khi mua xe cũ" dùng chung cho /xe-cu và trang chi tiết xe cũ
export default function UsedCarGifts({ className = "" }: { className?: string }) {
  const promotion = getActiveUsedCarPromotion();
  if (!promotion) return null;

  return (
    <div className={`rounded-2xl border border-red-200 bg-red-50 p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900">
        Quà tặng khi mua xe tháng {String(promotion.month).padStart(2, "0")}/{promotion.year}
      </h2>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {promotion.gifts.map((gift) => (
          <li key={gift} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              ✓
            </span>
            <span className="leading-6 text-gray-700">{gift}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
