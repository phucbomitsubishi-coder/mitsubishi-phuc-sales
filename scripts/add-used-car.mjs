import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import fs from "node:fs";

const rl = readline.createInterface({
  input,
  output,
});

console.log("");
console.log("======================================");
console.log("   THÊM XE ĐÃ QUA SỬ DỤNG");
console.log("======================================");
console.log("");

const carName = await rl.question("Tên xe: ");
const modelYear = await rl.question("Năm sản xuất: ");
const firstRegistration = await rl.question(
  "Đăng ký lần đầu (VD: 09/2025): "
);
const mileage = await rl.question("ODO (chỉ nhập số km): ");
const price = await rl.question("Giá bán (chỉ nhập số đồng): ");
const color = await rl.question("Màu xe: ");
const variant = await rl.question("Phiên bản: ");
const owners = await rl.question("Số đời chủ: ");
const transmission = await rl.question("Hộp số: ");
const fuel = await rl.question("Nhiên liệu: ");
const serviceHistory = await rl.question("Lịch sử bảo dưỡng: ");

let imageCount = "";

while (!imageCount || Number(imageCount) <= 0) {
  imageCount = await rl.question(
    "Số lượng ảnh của xe (bắt buộc nhập): "
  );

  if (!imageCount || Number(imageCount) <= 0) {
    console.log("Vui lòng nhập số lượng ảnh, ví dụ: 16");
  }
}

const equipmentInput = await rl.question(
  "Trang bị (ngăn cách bằng dấu phẩy): "
);

const equipment = equipmentInput
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

  const commitments = [
  "Động cơ, hộp số nguyên bản; xe không tai nạn.",
  "Bảo vệ giá bán lại lên đến 90% khi sử dụng xe dưới 12 tháng.",
  "Xe đã được kiểm định chính hãng 160 chi tiết.",
  "Không thủy kích, hỗ trợ kiểm tra xe tại hãng.",
];

const usedCarsFile = fs.readFileSync(
  "src/data/usedCars.ts",
  "utf8"
);

const existingNumbers = [
  ...usedCarsFile.matchAll(/-(\d{3})"/g),
].map((match) => Number(match[1]));

const nextNumber =
  existingNumbers.length > 0
    ? Math.max(...existingNumbers) + 1
    : 1;

const numberText = String(nextNumber).padStart(3, "0");

const slugBase = carName
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/đ/g, "d")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const slug = `${slugBase}-${modelYear}-${numberText}`;
const id = slug;

const imageFolder = `/images/used-cars/${slug}`;

const images = Array.from(
  { length: Number(imageCount) },
  (_, index) =>
    `${imageFolder}/${String(index + 1).padStart(2, "0")}.jpg`
);

const image = images[0] ?? "";

if (images.length !== Number(imageCount) || !image) {
  throw new Error(
    `Lỗi tạo ảnh: yêu cầu ${imageCount} ảnh nhưng chỉ tạo được ${images.length} đường dẫn.`
  );
}

const description =
  `${carName} sản xuất năm ${modelYear}, đăng ký lần đầu ${firstRegistration}, ` +
  `xe ${owners}. Xe đang có sẵn, phù hợp với nhu cầu sử dụng gia đình và đi lại hằng ngày.`;
  const newCar = {
  id,
  name: carName,
  slug,
  modelYear: Number(modelYear),
  firstRegistration,
  owners,
  variant,
  mileage: Number(mileage),
  price: Number(price),
  color,
  transmission,
  fuel,
  location: "Bình Dương",
  status: "available",
  image,
  images,
  description,
  serviceHistory,
  equipment,
  commitments,
};

console.log("");
console.log("======================================");
console.log("   THÔNG TIN VỪA NHẬP");
console.log("======================================");

console.log(`Tên xe: ${carName}`);
console.log(`Mã xe: ${id}`);
console.log(`Slug: ${slug}`);
console.log(`Năm sản xuất: ${modelYear}`);
console.log(`Đăng ký lần đầu: ${firstRegistration}`);
console.log(
  `ODO: ${Number(mileage).toLocaleString("vi-VN")} km`
);
console.log(
  `Giá bán: ${Number(price).toLocaleString("vi-VN")} đ`
);
console.log(`Màu xe: ${color}`);

console.log(`Phiên bản: ${variant}`);
console.log(`Số đời chủ: ${owners}`);
console.log(`Hộp số: ${transmission}`);
console.log(`Nhiên liệu: ${fuel}`);
console.log(`Lịch sử bảo dưỡng: ${serviceHistory}`);

console.log("Trang bị:");

equipment.forEach((item) => {
  console.log(`- ${item}`);
});

console.log("");
console.log("Cam kết:");

commitments.forEach((item) => {
  console.log(`- ${item}`);
});

console.log("======================================");
console.log("");
const carCode = JSON.stringify(newCar, null, 2);

console.log("DỮ LIỆU XE SẼ ĐƯỢC THÊM:");
console.log(JSON.stringify(newCar, null, 2));
console.log("");

const confirm = await rl.question(
  "Bạn có muốn thêm xe này vào website? (y/n): "
);

if (confirm.toLowerCase() === "y") {
  const insertPosition = usedCarsFile.lastIndexOf("];");

if (insertPosition === -1) {
  throw new Error("Không tìm thấy vị trí cuối danh sách usedCars.");
}

const before = usedCarsFile.slice(0, insertPosition).trimEnd();
const after = usedCarsFile.slice(insertPosition);

const separator = before.endsWith(",") ? "\n" : ",\n";

const updatedFile =
  before +
  separator +
  carCode +
  ",\n" +
  after;

fs.writeFileSync(
  "src/data/usedCars.ts",
  updatedFile,
  "utf8"
);

console.log(`Đã thêm xe ${carName} vào usedCars.ts.`);
} else {
  console.log("Đã hủy. Không có dữ liệu nào bị thay đổi.");
}

rl.close();