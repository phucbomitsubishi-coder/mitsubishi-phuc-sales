// Tạo ảnh 1080×1350 + caption để đăng Facebook cho các bài so sánh /tu-van/so-sanh-...
// Chạy: npm run compare-images  → ../anh-facebook/so-sanh/
// Thêm bài so sánh mới: thêm 1 dòng vào mảng `comparisons` bên dưới.
//
// Lưu ý pháp lý: Luật Quảng cáo cấm quảng cáo so sánh trực tiếp giá, chất lượng với sản phẩm hãng khác,
// nên ảnh chỉ đặt câu hỏi trung lập ("... hay ...?"), KHÔNG ghi số liệu hơn thua; chi tiết nằm trong bài viết.
// Ảnh xe đối thủ: CHỈ dùng ảnh có giấy phép tự do (Wikimedia Commons, CC BY / CC BY-SA), lưu ở
// ../anh-facebook/so-sanh/doi-thu/<khóa trong competitors.ts>.jpg kèm credits.json; ảnh luôn ghi tên tác giả + giấy phép.
// Không lấy ảnh từ trang hãng, báo, đại lý (có bản quyền). Thiếu ảnh thì hiện khối tên xe trên nền tối.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { cars } = await import(pathToFileURL(path.join(root, "src/data/cars.ts")).href);
const { competitors } = await import(pathToFileURL(path.join(root, "src/data/competitors.ts")).href);
const { siteConfig } = await import(pathToFileURL(path.join(root, "src/config/site.ts")).href);

const siteUrl = siteConfig.url ?? "https://www.mitsubishiauto.vn";
const phone = siteConfig.sales?.phoneDisplay ?? "";
const escapeHtml = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// slug bài viết, id xe Mitsubishi, khóa xe đối thủ trong competitors.ts, câu gợi mở cho caption
const comparisons = [
  { slug: "so-sanh-xforce-va-yaris-cross", carId: "xforce", rival: "toyotaYarisCross", hook: "Hai mẫu SUV cỡ B 5 chỗ bán chạy, được rất nhiều gia đình đặt lên bàn cân." },
  { slug: "so-sanh-xforce-va-creta", carId: "xforce", rival: "hyundaiCreta", hook: "Cùng tầm giá 600–720 triệu, cùng máy 1.5L, chọn xe nào cho gia đình 5 người?" },
  { slug: "so-sanh-destinator-va-innova-cross", carId: "destinator", rival: "toyotaInnovaCross", hook: "SUV 7 chỗ hay MPV 8 chỗ, máy turbo hay hybrid?" },
  { slug: "so-sanh-xpander-va-veloz-cross", carId: "xpander", rival: "toyotaVelozCross", hook: "Hai mẫu xe 7 chỗ gia đình phổ biến trong tầm giá dưới 700 triệu." },
  { slug: "so-sanh-xpander-cross-va-suzuki-xl7", carId: "xpander-cross", rival: "suzukiXL7", hook: "Xe 7 chỗ dáng SUV: gầm cao rộng rãi hay hybrid tiết kiệm xăng?" },
  { slug: "so-sanh-triton-va-ford-ranger", carId: "triton", rival: "fordRanger", hook: "Bán tải đi làm, đi chơi: chọn xe nào cho đúng nhu cầu?" },
  { slug: "so-sanh-attrage-va-toyota-vios", carId: "attrage", rival: "toyotaVios", hook: "Sedan hạng B cho gia đình và chạy dịch vụ: tiết kiệm hay rộng rãi?" },
];

// Ảnh xe Mitsubishi thật (gallery). crop (tỉ lệ 0–1): cắt sát vào xe, bỏ chữ quảng cáo/khoảng trống có sẵn trong ảnh gốc
const photos = {
  xforce: { file: "images/cars/xforce/gallery/exterior/exterior-01.jpg", crop: { left: 0.1, top: 0.36, width: 0.74, height: 0.62 } },
  destinator: { file: "images/cars/destinator/gallery/exterior/exterior-01.jpg", position: "45% 85%" },
  xpander: { file: "images/cars/xpander/gallery/exterior/exterior-01.jpg", position: "32% 60%" },
  "xpander-cross": { file: "images/cars/xpander-cross/gallery/exterior/exterior-01.jpg", position: "38% 60%" },
  triton: { file: "images/cars/triton/gallery/exterior/exterior-01.jpg", crop: { left: 0.12, top: 0.14, width: 0.62, height: 0.52 } },
  attrage: { file: "images/cars/attrage/gallery/exterior/exterior-01.jpg", position: "50% 50%" },
};

const rivalDir = path.resolve(root, "..", "anh-facebook", "so-sanh", "doi-thu");
const creditsFile = path.join(rivalDir, "credits.json");
const credits = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, "utf8")) : {};


// Ảnh anh Phúc tự chụp xe đối thủ: ../anh-facebook/so-sanh/anh-tu-chup/<tên xe>.jpg|.jpeg|.png
// Tên file chỉ cần chứa tên mẫu xe, không phân biệt hoa thường, ví dụ "Yaris Cross.jpg", "ranger 2.png".
const ownDir = path.resolve(root, "..", "anh-facebook", "so-sanh", "anh-tu-chup");
const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
function findOwnPhoto(rivalName) {
  if (!fs.existsSync(ownDir)) return null;
  const model = normalize(rivalName.split(" ").slice(1).join(" ").replace(/\s*Hybrid$/i, ""));
  const file = fs
    .readdirSync(ownDir)
    .filter((name) => /\.(jpe?g|png)$/i.test(name))
    .sort()
    .find((name) => normalize(name).includes(model));
  return file ? path.join(ownDir, file) : null;
}

const topics = ["Giá lăn bánh", "Kích thước, gầm xe", "Động cơ, mức tiêu thụ", "Trang bị an toàn"];

function renderHtml(item) {
  const leftSrc = item.leftSrc;
  const [rivalBrand, ...rivalRest] = item.rival.name.split(" ");
  const rivalModel = rivalRest.join(" ").replace(/\s*Hybrid$/, "");
  // Ưu tiên ảnh anh Phúc tự chụp (không cần ghi tác giả), sau đó mới tới ảnh Wikimedia
  const ownPhoto = findOwnPhoto(item.rival.name);
  const rivalPhoto = path.join(rivalDir, `${item.rivalKey}.jpg`);
  const credit = ownPhoto ? null : credits[item.rivalKey];
  const hasRivalPhoto = !ownPhoto && fs.existsSync(rivalPhoto) && Boolean(credit);
  const rightSrc = ownPhoto
    ? pathToFileURL(ownPhoto).href
    : hasRivalPhoto
      ? pathToFileURL(rivalPhoto).href
      : "";
  // Ảnh xe hiện trọn (contain); phần trống lấp bằng chính ảnh đó làm mờ, tối
  const layers = (src, cls) =>
    `<div class="blur" style="background-image:url('${src}')"></div><img class="car ${cls}" src="${src}">`;
  const creditLine = hasRivalPhoto
    ? `Ảnh ${rivalModel}: ${credit.author} / Wikimedia Commons, ${credit.license}`
    : "";

  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1350px; overflow: hidden; }
  body { font-family: Roboto, "Segoe UI", Arial, sans-serif; background: #0a0a0a; color: #fff; display: flex; flex-direction: column; }
  header { padding: 46px 48px 30px; }
  .tag { display: inline-block; background: #dc2626; font-weight: 900; font-size: 26px; letter-spacing: 3px; padding: 8px 18px; border-radius: 6px; transform: skewX(-10deg); }
  h1 { margin-top: 22px; font-size: 92px; font-weight: 900; font-style: italic; line-height: .98; letter-spacing: -1px; }
  h1 .hay { color: #f87171; font-size: 64px; font-style: normal; font-weight: 700; margin: 0 6px; }
  .sub { margin-top: 16px; font-size: 36px; font-weight: 500; color: #d1d5db; }
  .duel { position: relative; flex: 1; min-height: 560px; display: flex; }
  .side { flex: 1; position: relative; overflow: hidden; }
  .left { background: #111; clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%); flex: 1.25; z-index: 2; }
  .blur { position: absolute; inset: -40px; background-size: cover; background-position: center; filter: blur(28px) brightness(.45); }
  .car { position: absolute; top: 46%; transform: translateY(-50%); height: auto; z-index: 1;
    -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%);
            mask-image: linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%); }
  .car.l { left: -20px; width: calc(100% - 20px); }
  .car.r { left: 70px; width: calc(100% - 50px); }
  .left::after, .right::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.8)); pointer-events: none; }
  .right > span { position: relative; z-index: 2; }
  .right { margin-left: -90px; background: radial-gradient(circle at 70% 30%, #3f3f46 0%, #18181b 55%, #0a0a0a 100%); display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; padding: 0 48px 34px 120px; text-align: right; }
  .label { position: absolute; bottom: 26px; left: 40px; z-index: 3; }
  .label small, .rbrand { display: block; font-size: 26px; font-weight: 700; letter-spacing: 8px; color: #e5e7eb; }
  .label b { display: block; font-size: 64px; font-weight: 900; font-style: italic; line-height: 1; }
  .rbrand { color: #a1a1aa; }
  .rmodel { font-size: 66px; font-weight: 900; font-style: italic; line-height: 1; color: #f4f4f5; margin-top: 8px; }
  .rnote { margin-top: 18px; font-size: 22px; color: #a1a1aa; }
  .vs { position: absolute; left: 51%; top: 36%; transform: translate(-50%, -50%) rotate(-6deg); z-index: 3; width: 170px; height: 170px; border-radius: 50%; background: linear-gradient(135deg, #ef4444, #991b1b); box-shadow: 0 0 0 10px #0a0a0a, 0 20px 50px rgba(220,38,38,.55); display: flex; align-items: center; justify-content: center; font-size: 76px; font-weight: 900; font-style: italic; }
  .credit { position: absolute; right: 14px; bottom: 6px; z-index: 4; font-size: 15px; color: rgba(255,255,255,.75); }
  .rmodel, .rbrand, .rnote { text-shadow: 0 2px 12px rgba(0,0,0,.85); }
  .rnote { color: #e5e7eb; }
  .topics { padding: 30px 48px 30px; }
  .topics p { font-size: 28px; font-weight: 700; color: #e5e7eb; }
  .chips { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 12px; }
  .chip { border: 2px solid #3f3f46; background: #18181b; border-radius: 999px; padding: 10px 22px; font-size: 26px; font-weight: 500; }
  .chip::before { content: "✓ "; color: #f87171; font-weight: 900; }
  .read { margin-top: 22px; font-size: 26px; color: #a1a1aa; }
  .read b { color: #fde047; }
  footer { background: #dc2626; padding: 22px 48px 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .who { font-size: 30px; font-weight: 900; }
  .who small { display: block; font-size: 21px; font-weight: 500; margin-top: 4px; opacity: .95; }
  .phone { background: #fff; color: #b91c1c; border-radius: 14px; padding: 8px 22px 10px; font-size: 46px; font-weight: 900; line-height: 1.05; }
  .phone small { display: block; font-size: 16px; font-weight: 700; letter-spacing: 2px; color: #111827; }
</style></head>
<body>
  <header>
    <div class="tag">SO SÁNH XE</div>
    <h1>${escapeHtml(item.shortName.toUpperCase())}<span class="hay">hay</span>${escapeHtml(rivalModel.toUpperCase())}?</h1>
    <div class="sub">Nên chọn xe nào cho nhu cầu của bạn?</div>
  </header>
  <section class="duel">
    <div class="side left">${layers(leftSrc, "l")}<div class="label"><small>MITSUBISHI</small><b>${escapeHtml(item.shortName)}</b></div></div>
    <div class="vs">VS</div>
    <div class="side right">${rightSrc ? layers(rightSrc, "r") : ""}
      <span class="rbrand">${escapeHtml(rivalBrand.toUpperCase())}</span>
      <span class="rmodel">${escapeHtml(rivalModel)}</span>
      <span class="rnote">${escapeHtml((item.rival.specs?.type ?? "").split(" (")[0].replace(/, 8 chỗ.*$/, ", 7–8 chỗ"))}</span>
    </div>
    ${creditLine ? `<div class="credit">${escapeHtml(creditLine)}</div>` : ""}
  </section>
  <section class="topics">
    <p>Bài so sánh chi tiết:</p>
    <div class="chips">${topics.map((topic) => `<span class="chip">${topic}</span>`).join("")}</div>
    <div class="read">Đọc tại <b>mitsubishiauto.vn</b> · mục Tư vấn</div>
  </section>
  <footer>
    <div class="who">Lưu Hoàng Phúc · Tư vấn bán hàng<small>Mitsubishi Moveo New City · Lái thử tận nhà</small></div>
    <div class="phone"><small>HOTLINE / ZALO</small>${phone}</div>
  </footer>
</body></html>`;
}

function renderText(item) {
  const link = `${siteUrl}/tu-van/${item.slug}`;
  const hashtag = item.shortName.replace(/\s+/g, "");
  const rivalTag = item.rival.name.replace(/\s+/g, "");
  const caption = `${item.shortName} hay ${item.rival.name}? 🤔
${item.hook}
Em đã so sánh chi tiết giá lăn bánh, kích thước, động cơ và trang bị, link bài ở bình luận 👇`;
  const comment = `📖 Bài so sánh chi tiết ${item.shortName} và ${item.rival.name}:
${link}

👉 Lái thử ${item.shortName} tại showroom hoặc tận nhà: ${siteUrl}/dang-ky-lai-thu
📞 Phúc Mitsubishi: ${phone} (Zalo)
#Mitsubishi #${hashtag} #${rivalTag} #SoSanhXe`;
  return `===== ${item.shortName.toUpperCase()} – ${item.rival.name.toUpperCase()} =====\nẢnh: ${item.slug}.png\n\n--- CAPTION ---\n${caption}\n\n--- BÌNH LUẬN ĐẦU TIÊN ---\n${comment}\n`;
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), "compare-images-"));

// Cắt sẵn ảnh xe Mitsubishi theo `crop` (nếu có)
async function preparePhoto(carId) {
  const photo = photos[carId];
  const src = path.join(root, "public", photo.file);
  if (!photo.crop) return pathToFileURL(src).href;
  const meta = await sharp(src).metadata();
  const out = path.join(work, `${carId}-crop.jpg`);
  await sharp(src)
    .extract({
      left: Math.round(meta.width * photo.crop.left),
      top: Math.round(meta.height * photo.crop.top),
      width: Math.round(meta.width * photo.crop.width),
      height: Math.round(meta.height * photo.crop.height),
    })
    .jpeg({ quality: 92 })
    .toFile(out);
  return pathToFileURL(out).href;
}

const items = comparisons.map((item) => {
  const car = cars.find((c) => c.id === item.carId);
  const rival = competitors[item.rival];
  if (!car || !rival) throw new Error(`Thiếu dữ liệu cho ${item.slug}`);
  return { ...item, rivalKey: item.rival, car, rival, shortName: car.name.replace("Mitsubishi ", "") };
});

const edge = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((candidate) => fs.existsSync(candidate));
if (!edge) throw new Error("Không tìm thấy Microsoft Edge để chụp ảnh.");

const outDir = path.resolve(root, "..", "anh-facebook", "so-sanh");
fs.mkdirSync(outDir, { recursive: true });
for (const item of items) {
  item.leftSrc = await preparePhoto(item.car.id);
  const htmlFile = path.join(work, `${item.slug}.html`);
  fs.writeFileSync(htmlFile, renderHtml(item));
  const outFile = path.join(outDir, `${item.slug}.png`);
  execFileSync(edge, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    `--user-data-dir=${path.join(work, `profile-${item.slug}`)}`,
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
