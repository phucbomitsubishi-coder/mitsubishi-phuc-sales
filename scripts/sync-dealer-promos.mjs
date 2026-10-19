// Đồng bộ CHƯƠNG TRÌNH ĐẠI LÝ (PROMO_MONTH, PROMOS) từ app báo giá ../bao-gia-xe/index.html
// → src/data/dealerPromotions.ts (tự sinh, không sửa tay). Chỉ dùng cho landing page quảng cáo /uu-dai/*.
// KHÔNG đọc thư mục .bi-mat (quyền linh động, LNG): repo này công khai trên GitHub.
// Chạy: npm run sync-dealer-promos   (mỗi tháng, sau khi anh cập nhật app báo giá)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appFile = path.resolve(root, "..", "bao-gia-xe", "index.html");
const outFile = path.join(root, "src", "data", "dealerPromotions.ts");

const app = fs.readFileSync(appFile, "utf8");
function block(name, open, close) {
  const start = app.indexOf(`const ${name} = ${open}`);
  if (start < 0) throw new Error(`Không tìm thấy ${name} trong app báo giá`);
  const end = app.indexOf(`${close};\n`, start);
  return app.slice(start + `const ${name} = `.length, end + close.length);
}
const promoMonth = app.match(/const PROMO_MONTH = "(\d{1,2})\/(\d{4})"/);
if (!promoMonth) throw new Error("Không đọc được PROMO_MONTH");
const TB = (v) => ["cash", "Ưu đãi 100% lệ phí trước bạ", v];
const PROMOS = new Function("TB", `return (${block("PROMOS", "{", "}")});`)(TB);

const cars = {};
for (const [key, items] of Object.entries(PROMOS)) {
  const [carId, variant] = key.split("|");
  (cars[carId] ??= []).push({
    variant,
    benefits: items.map(([, label, value]) => ({ label, value })),
  });
}

const content = `// TỰ SINH bởi scripts/sync-dealer-promos.mjs từ app báo giá. KHÔNG sửa tay.
// Chương trình ĐẠI LÝ, chỉ dùng cho landing page quảng cáo /uu-dai/* (noindex). Web chính vẫn chỉ ghi ưu đãi nhà máy (promotions.ts).

export type DealerPromotionVariant = {
  variant: string;
  benefits: { label: string; value: number }[];
};

export const dealerPromotion = {
  month: ${Number(promoMonth[1])},
  year: ${Number(promoMonth[2])},
  cars: ${JSON.stringify(cars, null, 2).replace(/\n/g, "\n  ")} as Record<string, DealerPromotionVariant[]>,
};
`;
fs.writeFileSync(outFile, content);
console.log(`Đã ghi ${path.relative(root, outFile)}: tháng ${promoMonth[1]}/${promoMonth[2]}, ${Object.keys(cars).length} dòng xe`);
