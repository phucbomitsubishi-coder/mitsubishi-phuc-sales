// Tạo ảnh khuyến mãi từng dòng xe (1080×1350) + file caption/bình luận để đăng Facebook.
// Số liệu lấy từ src/data (promotions.ts, cars.ts), nên mỗi tháng chỉ cần chạy lại.
// Chạy: npm run promo-images  → ../anh-facebook/khuyen-mai-MM-YYYY/
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

const millionNumber = (value) =>
  (value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
const million = (value) => `${millionNumber(value)} triệu`;
const fileUrl = (publicPath) => pathToFileURL(path.join(root, "public", publicPath)).href;
const escapeHtml = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)" → "Hỗ trợ 100% trước bạ"
function shortBenefit(label) {
  const percent = label.match(/(\d+)%[^(]*trước bạ/i);
  if (percent) return `Hỗ trợ ${percent[1]}% trước bạ`;
  return label.replace(/\s*\(.*\)\s*$/, "").trim();
}

const siteUrl = siteConfig.url ?? "https://www.mitsubishiauto.vn";
const phone = siteConfig.sales?.phoneDisplay ?? "";
const monthNumber = String(currentPromotion.month).padStart(2, "0");
const month = `${monthNumber}/${currentPromotion.year}`;

const items = cars
  .map((car) => {
    const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
    if (!promotion) return null;
    const shortName = car.name.replace("Mitsubishi ", "");
    const variants = promotion.variants
      .map((variant) => {
        const total = variant.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0);
        const carVariant = car.variants.find((item) => item.name === variant.variantName);
        return {
          name: variant.variantName === shortName ? shortName : `${shortName} ${variant.variantName}`,
          price: carVariant?.price ?? variant.retailPrice ?? 0,
          total,
          benefits: variant.benefits.map((benefit) => ({
            label: shortBenefit(benefit.label),
            value: benefit.value ?? 0,
          })),
        };
      })
      .filter((variant) => variant.total > 0);
    if (variants.length === 0) return null;
    return {
      id: car.id,
      slug: car.slug,
      shortName,
      image: fileUrl(car.image),
      variants,
      max: Math.max(...variants.map((variant) => variant.total)),
    };
  })
  .filter(Boolean);

// Ảnh nền thật cho từng xe (ảnh trong gallery); thiếu thì dùng ảnh xe tách nền.
// position: phần ảnh được giữ lại khi cắt khung dọc.
const heroPhotos = {
  xpander: { file: "images/cars/xpander/gallery/exterior/exterior-01.jpg", position: "35% 60%" },
  "xpander-cross": { file: "images/cars/xpander-cross/gallery/exterior/exterior-01.jpg", position: "40% 60%" },
  destinator: { file: "images/cars/destinator/gallery/exterior/exterior-01.jpg", position: "50% 85%" },
  xforce: { file: "images/cars/xforce/gallery/exterior/exterior-01.jpg", position: "42% 100%" },
  triton: { file: "images/cars/triton/gallery/exterior/exterior-01.jpg", position: "40% 0%", size: "auto 145%" }, // phóng to để che chữ "ALL-NEW TRITON" có sẵn trong ảnh
  attrage: { file: "images/cars/attrage/gallery/exterior/exterior-01.jpg", position: "50% 50%" },
};

function renderHtml(item) {
  const photo = heroPhotos[item.id];
  const heroStyle = photo
    ? `background-image:url('${fileUrl(photo.file)}');background-position:${photo.position};background-size:${photo.size ?? "cover"}`
    : `background-image:url('${item.image}');background-size:contain;background-color:#e5e7eb`;
  const rows = item.variants
    .map(
      (variant) => `<div class="row">
        <div class="left">
          <div class="vname">${escapeHtml(variant.name)}</div>
          <div class="vprice">Giá niêm yết <b>${million(variant.price)}</b></div>
          <div class="vbenefits">${variant.benefits
            .map((benefit) => `${escapeHtml(benefit.label)} ~${million(benefit.value)}`)
            .join(" + ")}</div>
        </div>
        <div class="total"><small>Ưu đãi</small><b>${millionNumber(variant.total)}</b><span>triệu</span></div>
      </div>`
    )
    .join("");

  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1350px; overflow: hidden; }
  body { font-family: Roboto, "Segoe UI", Arial, sans-serif; background: #0a0a0a; color: #fff; display: flex; flex-direction: column; }
  .hero { position: relative; flex: 1; min-height: 520px; background-size: cover; background-repeat: no-repeat; }
  .hero::before { content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.35) 30%, rgba(0,0,0,0) 50%, rgba(10,10,10,.55) 78%, #0a0a0a 100%); }
  .top { position: absolute; left: 48px; right: 48px; top: 40px; }
  .tag { display: inline-block; background: #dc2626; font-weight: 900; font-size: 26px; letter-spacing: 3px; padding: 8px 18px; border-radius: 6px; transform: skewX(-10deg); }
  .brand { margin-top: 18px; font-size: 34px; font-weight: 700; letter-spacing: 12px; color: #e5e7eb; }
  .model { font-size: 118px; font-weight: 900; font-style: italic; line-height: .95; letter-spacing: -1px; text-shadow: 0 6px 30px rgba(0,0,0,.5); }
  .stamp { position: absolute; right: 40px; bottom: 34px; background: linear-gradient(135deg, #ef4444, #b91c1c); border-radius: 22px; padding: 18px 34px 20px; transform: rotate(-4deg); box-shadow: 0 18px 40px rgba(220,38,38,.45), 0 0 0 6px rgba(255,255,255,.12); text-align: center; }
  .stamp small { display: block; font-size: 30px; font-weight: 900; letter-spacing: 4px; color: #fde047; }
  .stamp b { display: block; font-size: 150px; font-weight: 900; font-style: italic; line-height: .9; letter-spacing: -3px; }
  .stamp span { display: block; font-size: 44px; font-weight: 900; letter-spacing: 6px; margin-top: 2px; }
  .list { padding: 18px 40px 22px; display: flex; flex-direction: column; gap: 12px; }
  .row { background: linear-gradient(90deg, #1c1c1e, #141414); border: 1px solid #2a2a2a; border-left: 8px solid #dc2626; border-radius: 16px; padding: 14px 20px 14px 22px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
  .vname { font-size: 32px; font-weight: 900; }
  .vprice { font-size: 22px; color: #d1d5db; margin-top: 2px; }
  .vprice b { color: #fff; }
  .vbenefits { font-size: 19px; color: #9ca3af; margin-top: 4px; }
  .total { flex: none; text-align: right; line-height: 1; min-width: 170px; }
  .total small { display: block; font-size: 18px; font-weight: 700; letter-spacing: 2px; color: #9ca3af; text-transform: uppercase; margin-bottom: 2px; }
  .total b { font-size: 64px; font-weight: 900; font-style: italic; color: #fde047; }
  .total span { font-size: 22px; font-weight: 700; margin-left: 6px; color: #fde047; }
  footer { background: #dc2626; padding: 20px 40px 22px; }
  .contact { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .who { font-size: 28px; font-weight: 900; }
  .who small { display: block; font-size: 20px; font-weight: 500; color: #fff; opacity: .92; margin-top: 4px; }
  .phone { background: #fff; color: #b91c1c; border-radius: 14px; padding: 8px 22px 10px; font-size: 44px; font-weight: 900; line-height: 1.05; }
  .phone small { display: block; font-size: 16px; font-weight: 700; letter-spacing: 2px; color: #111827; }
  .note { margin-top: 12px; font-size: 16px; color: #fff; opacity: .9; line-height: 1.4; }
</style></head>
<body>
  <div class="hero" style="${heroStyle}">
    <div class="top">
      <div class="tag">ƯU ĐÃI THÁNG ${month}</div>
      <div class="brand">MITSUBISHI</div>
      <div class="model">${escapeHtml(item.shortName.toUpperCase())}</div>
    </div>
    <div class="stamp"><small>ƯU ĐÃI ĐẾN</small><b>${millionNumber(item.max)}</b><span>TRIỆU</span></div>
  </div>
  <section class="list">${rows}</section>
  <footer>
    <div class="contact">
      <div class="who">Lưu Hoàng Phúc · Tư vấn bán hàng<small>Mitsubishi Moveo New City · Trả góp, lái thử tận nhà</small></div>
      <div class="phone"><small>HOTLINE / ZALO</small>${phone}</div>
    </div>
    <div class="note">Giá niêm yết đã gồm VAT. Ưu đãi theo chương trình của Mitsubishi Motors Việt Nam tháng ${month}, gồm hỗ trợ tương đương lệ phí trước bạ, phiếu nhiên liệu hoặc quà tặng, không phải tiền mặt.</div>
  </footer>
</body></html>`;
}

function renderText(item) {
  const hashtag = item.shortName.replace(/\s+/g, "");
  const caption = `${millionNumber(item.max).toUpperCase()} TRIỆU 😱
Đó là số tiền ưu đãi khi mua ${item.shortName} tháng này.
Chi tiết từng phiên bản em để dưới bình luận 👇`;
  const comment = `🎁 ƯU ĐÃI ${item.shortName.toUpperCase()} THÁNG ${month}

${item.variants
  .map(
    (variant) =>
      `🚗 ${variant.name} – ${million(variant.price)} → ưu đãi ~${million(variant.total)}\n   (${variant.benefits
        .map((benefit) => `${benefit.label} ~${million(benefit.value)}`)
        .join(" + ")})`
  )
  .join("\n")}

👉 Xem xe ${item.shortName}: ${siteUrl}/xe/${item.slug}
👉 Bảng giá + ưu đãi tất cả dòng xe: ${siteUrl}/bang-gia-xe-mitsubishi
👉 Tự tính giá lăn bánh: ${siteUrl}/du-toan/gia-lan-banh

📞 Phúc Mitsubishi: ${phone} (Zalo)
#Mitsubishi #${hashtag} #KhuyenMai${hashtag}`;
  return `===== ${item.shortName.toUpperCase()} =====\nẢnh: ${item.id}.png\n\n--- CAPTION ---\n${caption}\n\n--- BÌNH LUẬN ĐẦU TIÊN ---\n${comment}\n`;
}

const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edge = edgeCandidates.find((candidate) => fs.existsSync(candidate));
if (!edge) throw new Error("Không tìm thấy Microsoft Edge để chụp ảnh.");

const outDir = path.resolve(root, "..", "anh-facebook", `khuyen-mai-${monthNumber}-${currentPromotion.year}`);
fs.mkdirSync(outDir, { recursive: true });
const work = fs.mkdtempSync(path.join(os.tmpdir(), "promo-images-"));

for (const item of items) {
  const htmlFile = path.join(work, `${item.id}.html`);
  fs.writeFileSync(htmlFile, renderHtml(item));
  const outFile = path.join(outDir, `${item.id}.png`);
  execFileSync(edge, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    `--user-data-dir=${path.join(work, `profile-${item.id}`)}`,
    "--window-size=1080,1350",
    "--virtual-time-budget=8000",
    `--screenshot=${outFile}`,
    pathToFileURL(htmlFile).href,
  ]);
  console.log(`Đã tạo ảnh: ${outFile}`);
}

const textFile = path.join(outDir, "caption-va-binh-luan.txt");
fs.writeFileSync(textFile, items.map(renderText).join("\n"));
console.log(`Đã tạo caption: ${textFile}`);
