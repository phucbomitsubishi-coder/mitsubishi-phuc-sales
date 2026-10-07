// Tạo ảnh bảng giá tháng (1080×1350) để đăng Facebook, lấy số liệu từ src/data.
// Chạy: npm run price-image  → ảnh lưu ở thư mục anh-facebook (ngoài repo).
// Cần Microsoft Edge (có sẵn trên Windows) để chụp ảnh.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { cars } = await import(pathToFileURL(path.join(root, "src/data/cars.ts")).href);
const { currentPromotion } = await import(
  pathToFileURL(path.join(root, "src/data/promotions.ts")).href
);
const { siteConfig } = await import(pathToFileURL(path.join(root, "src/config/site.ts")).href);

const million = (value) =>
  `${(value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu`;
const fileUrl = (publicPath) => pathToFileURL(path.join(root, "public", publicPath)).href;

// Mỗi xe: giá thấp nhất và tổng ưu đãi lớn nhất của một phiên bản (giống trang bảng giá)
const rows = cars.map((car) => {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  const maxPromotion = Math.max(
    0,
    ...(promotion?.variants ?? []).map((variant) =>
      variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0)
    )
  );
  return {
    name: car.name.replace("Mitsubishi ", ""),
    image: fileUrl(car.image),
    minPrice: Math.min(...car.variants.map((variant) => variant.price)),
    maxPromotion,
  };
});

const month = `${String(currentPromotion.month).padStart(2, "0")}/${currentPromotion.year}`;
const topPromotion = Math.max(...rows.map((row) => row.maxPromotion));
const phone = siteConfig.sales?.phoneDisplay ?? "";

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1350px; overflow: hidden; }
  body { font-family: Roboto, "Segoe UI", Arial, sans-serif; background: #f3f4f6; color: #111827; }
  header { background: #0a0a0a; color: #fff; padding: 36px 48px 34px; position: relative; }
  header::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #dc2626; }
  .kicker { color: #f87171; font-weight: 700; font-size: 24px; letter-spacing: 3px; text-transform: uppercase; }
  h1 { font-size: 64px; font-weight: 900; line-height: 1.05; margin-top: 8px; }
  h1 span { color: #ef4444; }
  .sub { margin-top: 12px; font-size: 28px; color: #e5e7eb; }
  .sub b { color: #fff; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 22px 48px 0; }
  .card { background: #fff; border-radius: 22px; padding: 6px 24px 20px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
  .photo { height: 122px; transform: scale(1.45); transform-origin: center 60%; background-size: contain; background-position: center; background-repeat: no-repeat; }
  .name { font-size: 34px; font-weight: 900; margin-top: 2px; }
  .price { font-size: 25px; color: #374151; margin-top: 4px; }
  .price b { color: #111827; }
  .badge { display: inline-block; margin-top: 10px; background: #dc2626; color: #fff; font-weight: 700; font-size: 24px; padding: 8px 16px; border-radius: 10px; }
  footer { position: absolute; left: 0; right: 0; bottom: 0; background: #0a0a0a; color: #fff; padding: 26px 48px 30px; }
  .contact { display: flex; justify-content: space-between; align-items: center; }
  .who { font-size: 26px; font-weight: 700; }
  .who small { display: block; font-size: 20px; font-weight: 400; color: #d1d5db; margin-top: 4px; }
  .phone { background: #dc2626; border-radius: 14px; padding: 12px 22px; font-size: 38px; font-weight: 900; }
  .phone small { display: block; font-size: 17px; font-weight: 500; letter-spacing: 1px; }
  .note { margin-top: 14px; font-size: 17px; color: #d1d5db; line-height: 1.4; }
</style></head>
<body>
  <header>
    <div class="kicker">Cập nhật tháng ${month}</div>
    <h1>BẢNG GIÁ XE <span>MITSUBISHI</span></h1>
    <div class="sub">Ưu đãi đến <b>${million(topPromotion)} đồng</b> · Xem giá lăn bánh tại mitsubishiauto.vn</div>
  </header>
  <section class="grid">
    ${rows
      .map(
        (row) => `<div class="card">
      <div class="photo" style="background-image:url('${row.image}')"></div>
      <div class="name">${row.name}</div>
      <div class="price">Giá từ <b>${million(row.minPrice)}</b></div>
      ${row.maxPromotion > 0 ? `<div class="badge">Ưu đãi đến ~${million(row.maxPromotion)}</div>` : ""}
    </div>`
      )
      .join("")}
  </section>
  <footer>
    <div class="contact">
      <div class="who">Lưu Hoàng Phúc · Tư vấn bán hàng<small>Mitsubishi Moveo New City · Báo giá, trả góp, lái thử tận nhà</small></div>
      <div class="phone"><small>HOTLINE / ZALO</small>${phone}</div>
    </div>
    <div class="note">Giá niêm yết đã gồm VAT. Ưu đãi theo chương trình của Mitsubishi Motors Việt Nam tháng ${month}, gồm hỗ trợ tương đương lệ phí trước bạ, phiếu nhiên liệu hoặc quà tặng, tùy phiên bản.</div>
  </footer>
</body></html>`;

const work = fs.mkdtempSync(path.join(os.tmpdir(), "price-image-"));
const htmlFile = path.join(work, "bang-gia.html");
fs.writeFileSync(htmlFile, html);

const outDir = path.resolve(root, "..", "anh-facebook");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(
  outDir,
  `bang-gia-mitsubishi-${String(currentPromotion.month).padStart(2, "0")}-${currentPromotion.year}.png`
);

const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edge = edgeCandidates.find((candidate) => fs.existsSync(candidate));
if (!edge) throw new Error("Không tìm thấy Microsoft Edge để chụp ảnh.");

execFileSync(edge, [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  `--user-data-dir=${path.join(work, "profile")}`,
  "--window-size=1080,1350",
  "--virtual-time-budget=8000",
  `--screenshot=${outFile}`,
  pathToFileURL(htmlFile).href,
]);

console.log(`Đã tạo ảnh: ${outFile}`);
