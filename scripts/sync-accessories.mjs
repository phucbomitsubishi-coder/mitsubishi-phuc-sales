// Đồng bộ bảng phụ kiện từ app báo giá (../bao-gia-xe/phu-kien.js) sang src/data/accessories.ts.
// Chỉ lấy tên, số chỗ áp dụng và GIÁ NIÊM YẾT. Cột "giá tặng" là số nội bộ, không bao giờ đưa lên website.
// Chạy: npm run sync-accessories   (mỗi tháng sau khi cập nhật phu-kien.js trong app)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(root, "..", "bao-gia-xe", "phu-kien.js");
const target = path.join(root, "src", "data", "accessories.ts");

const code = fs.readFileSync(source, "utf8");
const { PK_THANG, PHU_KIEN } = new Function(`${code}; return { PK_THANG, PHU_KIEN };`)();
if (!PK_THANG || !Array.isArray(PHU_KIEN)) throw new Error("Không đọc được PK_THANG / PHU_KIEN trong phu-kien.js");

const groups = PHU_KIEN.map((group) => ({
  name: group.nhom,
  ...(group.xe ? { carId: group.xe } : {}),
  items: group.ds
    .filter((row) => Array.isArray(row) && typeof row[3] === "number" && row[3] > 0)
    .map(([name, seats, , price]) => ({ name, seats, price })),
}));

const total = groups.reduce((sum, group) => sum + group.items.length, 0);
const output = `// TỰ SINH bởi scripts/sync-accessories.mjs từ app báo giá. Không sửa tay, chạy lại script khi đổi giá.
// Chỉ gồm giá niêm yết (không có giá nội bộ).

export type AccessoryItem = {
  name: string;
  // 5 / 7: chỉ áp dụng xe 5 chỗ / 7 chỗ; 0: mọi xe
  seats: number;
  price: number;
};

export type AccessoryGroup = {
  name: string;
  // Có carId: phụ kiện riêng của dòng xe đó (Xpander Cross dùng chung với Xpander)
  carId?: string;
  items: AccessoryItem[];
};

export const accessoriesMonth = ${JSON.stringify(PK_THANG)};

export const accessoryGroups: AccessoryGroup[] = ${JSON.stringify(groups, null, 2)};
`;

fs.writeFileSync(target, output);
console.log(`Đã ghi ${target}: ${groups.length} nhóm, ${total} phụ kiện, tháng ${PK_THANG}`);
