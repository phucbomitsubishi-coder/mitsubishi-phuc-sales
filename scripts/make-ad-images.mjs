// Tạo ảnh chạy quảng cáo Fanpage (1080×1350 bảng tin + 1080×1920 Story/Reels) theo CHƯƠNG TRÌNH ĐẠI LÝ.
// Số liệu khuyến mãi đọc từ app báo giá (../bao-gia-xe/index.html: PROMO_MONTH, CARS, PROMOS, BHVC),
// nên mỗi tháng anh cập nhật app xong chỉ cần chạy lại: npm run ad-images  → ../anh-facebook/quang-cao-MM-YYYY/
// Ưu đãi trên ảnh = khuyến mãi đại lý (PROMOS) + quyền linh động (QLĐ, phần tử đầu trong ../bao-gia-xe/.bi-mat/ngan-sach.json),
// theo yêu cầu của anh Phúc (09/10/2026). KHÔNG đọc LNG mục tiêu (phần tử thứ hai). Quà tặng không ghi lên ảnh.
// Website (promotions.ts) vẫn chỉ đăng ưu đãi nhà máy; ảnh ở đây dùng cho Fanpage/quảng cáo.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appFile = path.resolve(root, "..", "bao-gia-xe", "index.html");
const { siteConfig } = await import(pathToFileURL(path.join(root, "src/config/site.ts")).href);
const pub = (p) => pathToFileURL(path.join(root, "public", p)).href;

// ---------- Đọc dữ liệu từ app báo giá ----------
const app = fs.readFileSync(appFile, "utf8");
function block(name, open, close) {
  const start = app.indexOf(`const ${name} = ${open}`);
  if (start < 0) throw new Error(`Không tìm thấy ${name} trong app báo giá`);
  const end = app.indexOf(`${close};\n`, start);
  return app.slice(start + `const ${name} = `.length, end + close.length);
}
const promoMonth = app.match(/const PROMO_MONTH = "([^"]+)"/)?.[1];
const TB = (v) => ["cash", "Ưu đãi 100% lệ phí trước bạ", v];
const read = (code) => new Function("TB", `return (${code});`)(TB);
const CARS = read(block("CARS", "[", "]"));
const PROMOS = read(block("PROMOS", "{", "}"));
const BHVC = read(block("BHVC", "[", "]"));
if (!promoMonth) throw new Error("Không đọc được PROMO_MONTH");
// Quyền linh động theo phiên bản; không có file thì coi như 0
const budgetFile = path.resolve(root, "..", "bao-gia-xe", ".bi-mat", "ngan-sach.json");
const QLD = fs.existsSync(budgetFile)
  ? Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(budgetFile, "utf8")).duLieu).map(([k, v]) => [k, v[0]]))
  : {};

const million = (v) => (v / 1e6).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
function carData(id) {
  const car = CARS.find((c) => c.id === id);
  const variants = car.variants.map(([name, price]) => {
    const promos = PROMOS[`${id}|${name}`] ?? [];
    const qld = QLD[`${id}|${name}`] ?? 0;
    return { name, price, promos, total: promos.reduce((s, p) => s + p[2], 0) + qld, bhvc: BHVC.includes(`${id}|${name}`) };
  });
  const best = variants.reduce((a, b) => (b.total > a.total ? b : a));
  return {
    variants, best,
    from: Math.min(...variants.map((v) => v.price)),
    allTB: variants.every((v) => v.promos.some((p) => p[1].includes("trước bạ"))),
    anyBhvc: variants.some((v) => v.bhvc),
    fuel: variants.map((v) => v.promos.find((p) => /đổ (xăng|dầu)/i.test(p[1]))).find(Boolean),
  };
}

// ---------- Nội dung từng xe (câu chữ; con số lấy từ app) ----------
const ads = [
  { id: "destinator", model: "DESTINATOR", type: "SUV 7 chỗ",
    photo: "images/cars/destinator/gallery/exterior/exterior-01.jpg", pos: "30% 55%",
    bullets: ["SUV 7 chỗ rộng rãi", "Bảo hành 5 năm", "Giao xe toàn quốc"] },
  { id: "xforce", model: "XFORCE", type: "SUV 5 chỗ",
    photo: "images/cars/xforce/gallery/exterior/exterior-01.jpg", pos: "40% 100%",
    bullets: ["SUV gầm cao 5 chỗ", "Lái thử tận nhà", "Giao xe toàn quốc"] },
  { id: "xpander", model: "XPANDER", type: "MPV 7 chỗ",
    photo: "images/cars/xpander/gallery/exterior/exterior-01.jpg", pos: "35% 60%",
    bullets: ["7 chỗ cho cả nhà", "Lái thử tận nhà", "Giao xe toàn quốc"] },
  { id: "triton", model: "TRITON", type: "Bán tải",
    photo: "images/cars/triton/gallery/exterior/exterior-01.jpg", pos: "40% 0%", size: "auto 145%",
    bullets: ["Bán tải mạnh mẽ", "Bảo hành 5 năm", "Giao xe toàn quốc"] },
];

// Tiêu đề lớn: ưu tiên quà "đổ xăng/dầu miễn phí", rồi "100% trước bạ" (nếu mọi phiên bản đều có), cuối cùng "ưu đãi đến".
function headline(ad, d) {
  const extras = [];
  if (d.fuel) {
    const label = d.fuel[1].replace(/^Tặng\s+0?/i, "").replace(/miễn phí/i, "").trim().toUpperCase();
    const fuelVariant = d.variants.find((v) => v.promos.includes(d.fuel));
    return { hook: ["TẶNG", `${label} MIỄN PHÍ`], badge: ["ƯU ĐÃI ĐẾN", million(d.best.total), "TRIỆU"],
      note: `${ad.model.charAt(0) + ad.model.slice(1).toLowerCase()} ${fuelVariant.name}: ${d.fuel[1].toLowerCase()}, tương đương ~${million(d.fuel[2])} triệu`, extras };
  }
  if (d.allTB) {
    return { hook: ["HỖ TRỢ", "100% TRƯỚC BẠ"], badge: ["ƯU ĐÃI ĐẾN", million(d.best.total), "TRIỆU"],
      note: `Áp dụng cả ${d.variants.length} phiên bản ${d.variants.map((v) => v.name).join(" · ")}`, extras };
  }
  return { hook: ["ƯU ĐÃI ĐẾN", `${million(d.best.total)} TRIỆU`], badge: ["100%", "TRƯỚC BẠ", "+ QUÀ TẶNG"],
    note: "Hỗ trợ 100% trước bạ hoặc quà tặng tùy phiên bản", extras };
}

function html(ad, d, h, w, H) {
  const tall = H > 1500;
  const hookSize = h.hook[1].length > 16 ? 76 : h.hook[1].length > 10 ? 104 : 128;
  const numeric = /^[0-9,]+$/.test(h.badge[1]);
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,900&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${w}px; height: ${H}px; overflow: hidden; }
body { font-family: Roboto, Arial, sans-serif; color: #fff; background: #0a0a0a; position: relative; }
.photo { position: absolute; left: 0; right: 0; top: ${tall ? 520 : 330}px; height: ${tall ? 900 : 640}px;
  background: url('${pub(ad.photo)}') ${ad.pos} / ${ad.size ?? "cover"} no-repeat; }
.photo::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0) 22%, rgba(10,10,10,0) 70%, #0a0a0a 100%); }
.top { position: absolute; left: 56px; right: 56px; top: ${tall ? 120 : 52}px; }
.chip { display: inline-flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 700; letter-spacing: 1px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.25); padding: 8px 18px 8px 10px; border-radius: 999px; }
.chip i { width: 14px; height: 14px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 0 5px rgba(239,68,68,.25); }
.model { margin-top: 18px; font-size: 30px; font-weight: 700; letter-spacing: 8px; color: #d1d5db; }
.model b { color: #fff; }
.hook1 { margin-top: 6px; font-size: 64px; font-weight: 900; line-height: 1; }
.hook2 { font-size: ${hookSize}px; font-weight: 900; font-style: italic; line-height: 1.02; letter-spacing: -2px; color: #fde047; text-shadow: 0 8px 30px rgba(0,0,0,.6); }
.badge { position: absolute; right: 48px; top: ${tall ? 900 : 640}px; width: 250px; height: 250px; border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f87171, #b91c1c 70%); transform: rotate(-8deg);
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  box-shadow: 0 20px 50px rgba(220,38,38,.55), 0 0 0 8px rgba(255,255,255,.15); }
.badge small { font-size: ${/^[0-9]/.test(h.badge[0]) ? 46 : 22}px; line-height: 1; font-weight: 900; letter-spacing: 2px; color: #fde047; }
.badge b { font-size: ${numeric ? (h.badge[1].length > 3 ? 64 : 92) : 40}px; margin: 4px 0; font-weight: 900; font-style: italic; line-height: 1; }
.badge span { font-size: 24px; font-weight: 900; letter-spacing: 3px; }
.bottom { position: absolute; left: 48px; right: 48px; bottom: ${tall ? 150 : 40}px; }
.price { font-size: 30px; color: #e5e7eb; }
.price b { font-size: 44px; color: #fff; }
.note { margin-top: 6px; font-size: 24px; color: #d1d5db; }
.extras { margin-top: 4px; font-size: 22px; color: #fde047; font-weight: 700; }
.bullets { margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap; }
.bullets span { font-size: 23px; font-weight: 700; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); padding: 9px 16px; border-radius: 10px; }
.bullets span::before { content: "✓ "; color: #4ade80; }
.cta { margin-top: 22px; display: flex; align-items: center; gap: 18px; background: #fff; color: #111827; border-radius: 22px; padding: 14px 18px; }
.cta .avatar { width: 92px; height: 92px; border-radius: 50%; flex: none; border: 4px solid #dc2626;
  background: url('${pub("images/about/luu-hoang-phuc.jpg")}') 50% 18% / cover; }
.cta .who { flex: 1; }
.cta .who b { display: block; font-size: 28px; font-weight: 900; }
.cta .who small { font-size: 21px; color: #4b5563; }
.cta .btn { background: #dc2626; color: #fff; border-radius: 14px; padding: 14px 20px; font-size: 26px; font-weight: 900; text-align: center; line-height: 1.15; }
.cta .btn small { display: block; font-size: 18px; font-weight: 700; opacity: .9; }
.legal { margin-top: 12px; font-size: 16px; color: #9ca3af; }
</style></head><body>
<div class="photo"></div>
<div class="top">
  <div class="chip"><i></i>${siteConfig.social.fanpageName} · Ưu đãi tháng ${promoMonth.split("/")[0]}</div>
  <div class="model">MITSUBISHI <b>${ad.model}</b></div>
  <div class="hook1">${h.hook[0]}</div>
  <div class="hook2">${h.hook[1]}</div>
</div>
<div class="badge"><small>${h.badge[0]}</small><b>${h.badge[1]}</b><span>${h.badge[2]}</span></div>
<div class="bottom">
  <div class="price">${ad.type} · Giá chỉ từ <b>${million(d.from)} triệu</b></div>
  <div class="note">${h.note}</div>
  ${h.extras.length ? `<div class="extras">🎁 ${h.extras.join(" · ")}</div>` : ""}
  <div class="bullets">${ad.bullets.map((b) => `<span>${b}</span>`).join("")}</div>
  <div class="cta">
    <div class="avatar"></div>
    <div class="who"><b>${siteConfig.sales.name}</b><small>Tư vấn Mitsubishi · ${siteConfig.sales.phoneDisplay}</small></div>
    <div class="btn">NHẮN TIN NGAY<small>Nhận báo giá lăn bánh</small></div>
  </div>
  <div class="legal">Ưu đãi theo chương trình của đại lý tháng ${promoMonth}, không phải tiền mặt, áp dụng tùy phiên bản. Giá niêm yết đã gồm VAT.</div>
</div>
</body></html>`;
}

const edge = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find((p) => fs.existsSync(p));
if (!edge) throw new Error("Không tìm thấy Microsoft Edge để chụp ảnh.");
const [mm, yyyy] = promoMonth.split("/");
const outDir = path.resolve(root, "..", "anh-facebook", `quang-cao-${mm}-${yyyy}`);
fs.mkdirSync(outDir, { recursive: true });
const work = fs.mkdtempSync(path.join(os.tmpdir(), "ad-img-"));
const only = process.argv[2];

for (const ad of ads.filter((a) => !only || a.id === only)) {
  const d = carData(ad.id);
  const h = headline(ad, d);
  for (const [w, H, suffix] of [[1080, 1350, "feed"], [1080, 1920, "story"]]) {
    const file = path.join(work, `${ad.id}-${suffix}.html`);
    fs.writeFileSync(file, html(ad, d, h, w, H));
    const out = path.join(outDir, `${ad.id}-${suffix}.png`);
    execFileSync(edge, ["--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
      `--user-data-dir=${path.join(work, `p-${ad.id}-${suffix}`)}`, `--window-size=${w},${H}`, "--virtual-time-budget=8000",
      `--screenshot=${out}`, pathToFileURL(file).href], { stdio: "ignore" });
    console.log(`Đã tạo ảnh: ${out}`);
  }
}
