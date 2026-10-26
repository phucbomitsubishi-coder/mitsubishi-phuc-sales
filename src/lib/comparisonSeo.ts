import { getCarBySlug } from "@/data/cars";
import { competitors } from "@/data/competitors";
import { formatMillion } from "@/lib/promotionItems";

// Tiêu đề/mô tả Google cho bài so sánh (26/10/2026, theo Search Console: 6 bài đã lên top 10 nhưng gần như 0 lượt nhấp).
// Số chênh lệch tính từ cars.ts + competitors.ts nên hãng đổi giá thì tiêu đề tự đúng; không ghi cứng số tiền.
type CompetitorKey = keyof typeof competitors;

function mitsuPrice(slug: string, variant?: string) {
  const car = getCarBySlug(slug);
  if (!car) return 0;
  const found = variant ? car.variants.find((item) => item.name === variant) : undefined;
  return found?.price ?? Math.min(...car.variants.map((item) => item.price));
}

function rivalPrice(key: CompetitorKey, variant?: string) {
  const car = competitors[key];
  const found = variant ? car.variants.find((item) => item.name === variant) : undefined;
  return found?.price ?? Math.min(...car.variants.map((item) => item.price));
}

const million = formatMillion;

type Input = {
  slug: string;
  short: string;
  rival: CompetitorKey;
  rivalShort: string;
  // So theo phiên bản cụ thể (vd cùng số tự động); thiếu thì so giá thấp nhất
  variant?: string;
  rivalVariant?: string;
  // Chữ thêm trước "rẻ hơn"/"cùng giá" khi so theo phiên bản, vd "số tự động"
  scope?: string;
};

export function comparisonSeo({ slug, short, rival, rivalShort, variant, rivalVariant, scope }: Input) {
  const a = mitsuPrice(slug, variant);
  const b = rivalPrice(rival, rivalVariant);
  const diff = a - b;
  const subject = scope ? `${short} ${scope}` : short;
  const gap =
    Math.abs(diff) < 1_000_000
      ? `${scope ? `bản ${scope}` : ""} cùng giá`.trim()
      : diff < 0
        ? `${subject} rẻ hơn ${million(-diff)}`
        : `giá chênh ${million(diff)}`;
  const title = `So sánh ${short} và ${rivalShort} 2026: ${gap}`;
  const prices = scope
    ? `${short} ${scope} từ ${million(a)}, ${rivalShort} ${scope} từ ${million(b)}`
    : `${short} từ ${million(mitsuPrice(slug))}, ${rivalShort} từ ${million(rivalPrice(rival))}`;
  const description = `${prices}. So sánh giá lăn bánh TP.HCM, kích thước, gầm xe, động cơ, trang bị an toàn và gợi ý nên chọn xe nào theo nhu cầu.`;
  return { title, description };
}
