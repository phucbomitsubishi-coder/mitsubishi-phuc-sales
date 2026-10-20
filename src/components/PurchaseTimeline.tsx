// Ô chọn "Dự định mua xe" (không bắt buộc), giống câu hỏi "mua xe trong vòng bao lâu" của form MMV:
// giúp biết khách nào cần gọi trước. Dùng trong QuoteForm và form lái thử.
export const purchaseTimelines = ["Trong 1 tháng", "1–3 tháng", "3–6 tháng", "Đang tham khảo"];

// Ghép vào một trường sẵn có của Apps Script (form báo giá: variant, lái thử: note),
// vì script không có cột riêng cho thông tin này
export function withTimeline(text: string, timeline: string) {
  if (!timeline) return text;
  return [text, `Dự định mua: ${timeline}`].filter(Boolean).join(" | ");
}

export default function PurchaseTimeline({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <label htmlFor="timeline" className="mb-2 block font-semibold">
        Dự định mua xe <span className="font-normal text-gray-600">(không bắt buộc)</span>
      </label>
      <select
        id="timeline"
        name="timeline"
        defaultValue=""
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
      >
        <option value="">Chọn thời gian</option>
        {purchaseTimelines.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
