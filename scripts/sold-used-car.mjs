import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import fs from "node:fs";

const rl = readline.createInterface({ input, output });

rl.on("SIGINT", () => {
  console.log("");
  console.log("Đã thoát công cụ.");
  rl.close();
  process.exit(0);
});

const usedCarsPath = "src/data/usedCars.ts";

const usedCarsFile = fs.readFileSync(
  usedCarsPath,
  "utf8"
);

console.log("");
console.log("======================================");
console.log("       CHUYỂN XE SANG ĐÃ BÁN");
console.log("======================================");
console.log("");

const availableCarMatches = [
  ...usedCarsFile.matchAll(
    /(?:id|"id")\s*:\s*"([^"]+)"[\s\S]*?(?:name|"name")\s*:\s*"([^"]+)"[\s\S]*?(?:slug|"slug")\s*:\s*"([^"]+)"[\s\S]*?(?:status|"status")\s*:\s*"available"/g
  ),
];

if (availableCarMatches.length === 0) {
  console.log("Hiện không có xe nào đang bán.");
  rl.close();
  process.exit(0);
}

console.log("DANH SÁCH XE ĐANG BÁN:");
console.log("");

availableCarMatches.forEach((match, index) => {
  const name = match[2];
  const slug = match[3];

  console.log(`${index + 1}. ${name}`);
  console.log(`   ${slug}`);
});

console.log("");

const choice = await rl.question(
  "Nhập số thứ tự xe muốn chuyển sang ĐÃ BÁN: "
);

const choiceNumber = Number(choice);

if (
  !Number.isInteger(choiceNumber) ||
  choiceNumber < 1 ||
  choiceNumber > availableCarMatches.length
) {
  console.log("");
  console.log("Lựa chọn không hợp lệ. Không có dữ liệu nào bị thay đổi.");
  rl.close();
  process.exit(0);
}

const selectedMatch = availableCarMatches[choiceNumber - 1];

const selectedCar = {
  id: selectedMatch[1],
  name: selectedMatch[2],
  slug: selectedMatch[3],
};

console.log("");
console.log("XE BẠN ĐÃ CHỌN:");
console.log(`Tên xe: ${selectedCar.name}`);
console.log(`Slug: ${selectedCar.slug}`);
console.log("");

const confirm = await rl.question(
  "Bạn chắc chắn muốn chuyển xe này sang ĐÃ BÁN? (y/n): "
);

if (confirm.toLowerCase() !== "y") {
  console.log("");
  console.log("Đã hủy. Không có dữ liệu nào bị thay đổi.");
  rl.close();
  process.exit(0);
}

const selectedBlock = selectedMatch[0];

const soldBlock = selectedBlock.replace(
  /(?:status|"status")\s*:\s*"available"/,
  '"status": "sold"'
);

if (soldBlock === selectedBlock) {
  console.log("");
  console.log("Không tìm thấy trạng thái available của xe. Đã dừng.");
  rl.close();
  process.exit(1);
}

const updatedFile = usedCarsFile.replace(
  selectedBlock,
  soldBlock
);

fs.writeFileSync(
  usedCarsPath,
  updatedFile,
  "utf8"
);

console.log("");
console.log(`Đã chuyển ${selectedCar.name} sang ĐÃ BÁN.`);
console.log(`Slug: ${selectedCar.slug}`);
console.log("");
console.log("Dữ liệu xe và hình ảnh vẫn được giữ nguyên.");

rl.close();