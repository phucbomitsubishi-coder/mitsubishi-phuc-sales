// Bộ dựng video dọc 9:16 dùng chung cho make-price-video.mjs và make-compare-video.mjs (10/11/2026).
// Mỗi cảnh là 1 khối HTML 1080×1920; phần tử có data-at (0..1 = lúc hiện, tính theo thời lượng lời đọc của cảnh)
// và data-fx (up | car | wipe). Trình duyệt (Edge/Chrome, qua CDP) chụp từng hình, ffmpeg nén thành MP4 rồi ghép giọng đọc.
// Giọng đọc: giong-doc/<số cảnh>.mp3 trong thư mục kết quả; có thì cảnh dài đúng bằng giọng, không thì ước theo số chữ.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
// Cho phép import thẳng file trong src/ có dùng alias "@/..." của Next (onRoadPrice.ts, usedCarReview.ts...),
// để video dùng đúng công thức của website thay vì viết lại.
const aliasHooks = `
import fs from "node:fs";
import { pathToFileURL } from "node:url";
let src = "";
export function initialize(data) { src = data.src; }
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = src + specifier.slice(2);
    for (const ext of ["", ".ts", ".tsx", "/index.ts"]) {
      if (fs.existsSync(base + ext) && fs.statSync(base + ext).isFile()) return next(pathToFileURL(base + ext).href, context);
    }
  }
  return next(specifier, context);
}`;
register(`data:text/javascript,${encodeURIComponent(aliasHooks)}`, { parentURL: import.meta.url, data: { src: path.join(root, "src") + path.sep } });
const load = (file) => import(pathToFileURL(path.join(root, file)).href);
const { cars } = await load("src/data/cars.ts");
const { currentPromotion } = await load("src/data/promotions.ts");
const { provinces, defaultProvinceId } = await load("src/data/registrationFees.ts");
const { siteConfig } = await load("src/config/site.ts");

const work = fs.mkdtempSync(path.join(os.tmpdir(), "video-"));
// Xóa thư mục tạm (profile trình duyệt, khung hình) khi script kết thúc
process.on("exit", () => { try { fs.rmSync(work, { recursive: true, force: true, maxRetries: 3 }); } catch {} });

const { calculateOnRoadPrice } = await load("src/lib/onRoadPrice.ts");

// ---------- Tham số ----------
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};
const optionValues = new Set(["tinh", "ban"].map(option).filter(Boolean));
const wanted = args.filter((arg) => !arg.startsWith("--") && !optionValues.has(arg));
const FPS = flag("nhanh") ? 15 : 30;
const province = provinces.find((item) => item.id === (option("tinh") ?? defaultProvinceId));
if (!province) {
  console.error(`Không có tỉnh "${option("tinh")}". Các id: ${provinces.map((item) => item.id).join(", ")}`);
  process.exit(1);
}
const otherProvince = provinces.find((item) => item.id === (province.id === "tp-hcm" ? "ha-noi" : "tp-hcm"));
const provinceShort = (item) => ({ "tp-hcm": "TP.HCM", "ha-noi": "Hà Nội" })[item.id] ?? item.name;


// ---------- Định dạng số ----------
const num = (value) => (value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 2 });
const tr = (value) => `${num(value)} tr`;
const trieu = (value) => `${num(value)} triệu`;
const escapeHtml = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const monthNumber = String(currentPromotion.month).padStart(2, "0");
const month = `${monthNumber}/${currentPromotion.year}`;
const siteUrl = siteConfig.url ?? "https://www.mitsubishiauto.vn";
const phone = siteConfig.sales?.phoneDisplay ?? "";

// "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)" → "Hỗ trợ 100% trước bạ"
function shortBenefit(label) {
  const percent = label.match(/(\d+)%[^(]*trước bạ/i);
  if (percent) return `Hỗ trợ ${percent[1]}% trước bạ`;
  return label.replace(/\s*\(.*\)\s*$/, "").trim();
}

// Ảnh phiên bản: public/images/cars/<id>/<thư mục phiên bản>/<màu>.png (thư mục khớp nhiều chữ nhất trong tên phiên bản),
// không có thì ảnh màu ở thư mục xe, cuối cùng là car.image.
const slugWords = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").split(/[^a-z0-9]+/).filter(Boolean);
const colorFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((file) => /\.(png|webp)$/i.test(file));
  // Ưu tiên màu trắng (giống video mẫu), rồi xám
  const rank = (file) => (/^white/.test(file) ? 0 : /^(gray|silver)/.test(file) ? 1 : 2);
  return files.sort((a, b) => rank(a) - rank(b)).map((file) => path.join(dir, file));
};
function variantImage(car, variant) {
  const carDir = path.join(root, "public/images/cars", car.id);
  const words = new Set(slugWords(variant.name));
  let best = null;
  if (fs.existsSync(carDir)) {
    for (const entry of fs.readdirSync(carDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || ["gallery", "showroom"].includes(entry.name)) continue;
      const dirWords = entry.name.split("-");
      if (!dirWords.every((word) => words.has(word))) continue;
      if (!best || dirWords.length > best.score) best = { score: dirWords.length, dir: path.join(carDir, entry.name) };
    }
  }
  const file = (best && colorFiles(best.dir)[0]) || colorFiles(carDir)[0] || path.join(root, "public", car.image);
  return pathToFileURL(file).href;
}

// ---------- Kịch bản: mỗi cảnh có lời đọc + HTML (phần tử có data-at = lúc hiện, tính theo phần lời đọc 0..1) ----------
const pair = (left, right, middle = "") => `<div class="pair"><b>${left}</b><i>${middle}</i><b>${right}</b></div>`;
const pairRed = (left, right, middle, at, redLeft, redRight) =>
  `<div class="pair" data-at="${at}"><b class="${redLeft ? "red" : ""}">${left}</b><i>${middle}</i><b class="${redRight ? "red" : ""}">${right}</b></div>`;
const box = (text, at, kind = "red") =>
  `<div class="box ${kind}${text.length > 34 ? " longer" : text.length > 30 ? " long" : ""}" data-at="${at}" data-fx="wipe"><span data-at="${at + 0.05}">${escapeHtml(text)}</span></div>`;
const note = (text, at) => `<p class="note" data-at="${at}">${escapeHtml(text)}</p>`;
const row = (label, value, at, extra = "") =>
  `<div class="row ${extra}" data-at="${at}"><i>${escapeHtml(label)}</i><b>${escapeHtml(value)}</b></div>`;
const heading = (index, text, at = 0) =>
  `<h2 data-at="${at}">${index ? `<em>${index}</em>` : ""}${escapeHtml(text)}</h2>`;
const twoCars = (left, right, at) => `<div class="cars two" data-at="${at}" data-fx="car">
    <figure><img src="${left.image}"><figcaption>${escapeHtml(left.name)}</figcaption></figure>
    <figure><img src="${right.image}"><figcaption>${escapeHtml(right.name)}</figcaption></figure>
  </div>`;
const oneCar = (variant, at, caption = variant.label, extra = "") => `<div class="cars one ${extra}" data-at="${at}" data-fx="car">
    <figure><img src="${variant.hero}"><figcaption class="serif">${escapeHtml(caption)}</figcaption></figure>
  </div>`;
const diffWord = (value) => (value === 0 ? "bằng nhau" : `chênh ${trieu(Math.abs(value))}`);

// ---------- Giọng đọc ----------
function findFfmpeg() {
  const candidates = [process.env.FFMPEG, "ffmpeg", "C:/ffmpeg/bin/ffmpeg.exe"].filter(Boolean);
  if (process.platform === "win32") {
    // winget cài vào thư mục Packages, có khi chưa nằm trong PATH của cửa sổ đang mở
    const wingetDir = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Packages");
    if (fs.existsSync(wingetDir)) {
      for (const pkg of fs.readdirSync(wingetDir).filter((name) => /ffmpeg/i.test(name))) {
        for (const sub of fs.readdirSync(path.join(wingetDir, pkg))) {
          candidates.push(path.join(wingetDir, pkg, sub, "bin/ffmpeg.exe"));
        }
      }
    }
  }
  return candidates.find((file) => spawnSync(file, ["-version"], { stdio: "ignore" }).status === 0);
}
const ffmpeg = findFfmpeg();
if (!ffmpeg) {
  console.error("Không tìm thấy ffmpeg. Cài bằng lệnh: winget install Gyan.FFmpeg  (rồi mở lại cửa sổ dòng lệnh)");
  process.exit(1);
}
const ffprobe = ffmpeg.replace(/ffmpeg(\.exe)?$/i, (match, ext) => `ffprobe${ext ?? ""}`);
function audioDuration(file) {
  const result = spawnSync(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" });
  const value = parseFloat(result.stdout);
  return Number.isFinite(value) ? value : null;
}
const voiceFile = (dir, index) =>
  ["mp3", "wav", "m4a", "aac", "ogg"].map((ext) => path.join(dir, `${index + 1}.${ext}`)).find((file) => fs.existsSync(file));
// Không có giọng đọc: ước thời lượng theo số tiếng (giọng AI tiếng Việt đọc khoảng 4 tiếng/giây)
const estimate = (text) => Math.max(3.5, text.split(/\s+/).length / 4 + 0.6);
const LEAD = 0.25; // giọng bắt đầu sau khi cảnh hiện 0,25 giây
const GAP = 0.45; // nghỉ sau mỗi câu trước khi chuyển cảnh (giống khoảng lặng ~0,5 giây trong video mẫu)

// ---------- Trình duyệt (CDP) ----------
function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  const pw = "/opt/pw-browsers";
  if (fs.existsSync(pw)) {
    for (const dir of fs.readdirSync(pw).filter((name) => /^chromium-\d+$/.test(name))) {
      candidates.push(path.join(pw, dir, "chrome-linux64/chrome"), path.join(pw, dir, "chrome-linux/chrome"));
    }
  }
  return candidates.filter(Boolean).find((file) => fs.existsSync(file));
}
const browserPath = findBrowser();
if (!browserPath) {
  console.error("Không tìm thấy Edge hoặc Chrome.");
  process.exit(1);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openBrowser() {
  const port = 9700 + Math.floor(Math.random() * 200);
  const profile = path.join(work, `profile-${port}`);
  const proc = spawn(browserPath, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox", "--allow-file-access-from-files",
    "--force-color-profile=srgb", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
  ], { stdio: "ignore" });
  let tabs;
  for (let i = 0; i < 120 && !tabs?.length; i++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(250); }
  }
  if (!tabs?.length) throw new Error("Không mở được trình duyệt.");
  const ws = new WebSocket(tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0;
  const pending = {};
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending[msg.id]) {
      pending[msg.id](msg);
      delete pending[msg.id];
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => reject(new Error(`Trình duyệt không phản hồi ${method}`)), 60000);
    pending[id] = (msg) => {
      clearTimeout(timer);
      if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
      else resolve(msg.result);
    };
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    return result.result?.value;
  };
  const close = () => {
    try { ws.close(); } catch {}
    if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(proc.pid), "/T", "/F"], { stdio: "ignore" });
    else proc.kill("SIGKILL");
  };
  process.on("exit", close);
  return { send, evaluate, close };
}

// ---------- HTML ----------
const fontUrl = (file) => pathToFileURL(path.join(root, "src/assets/fonts", file)).href;
function renderHtml(scenes, timings, total, extraCss = "") {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<style>
  @font-face { font-family: "RobotoLocal"; src: url("${fontUrl("Roboto-Black.ttf")}"); font-weight: 900; }
  @font-face { font-family: "RobotoLocal"; src: url("${fontUrl("Roboto-Medium.ttf")}"); font-weight: 500 700; }
  @font-face { font-family: "Playfair Display"; font-style: italic; src: url("${fontUrl("PlayfairDisplay-BoldItalic.ttf")}"); font-weight: 400 800; }
  @font-face { font-family: "Playfair Display"; font-style: italic; src: url("${fontUrl("PlayfairDisplay-BlackItalic.ttf")}"); font-weight: 900; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1920px; overflow: hidden; background: #000; }
  body { font-family: RobotoLocal, Roboto, "Segoe UI", Arial, sans-serif; color: #111; }
  .serif, .row i, .pair i, .note, .serif-title, figcaption { font-family: "Playfair Display", Georgia, "Times New Roman", serif; font-style: italic; }
  .scene { position: absolute; inset: 0; display: none; }
  .scene.light { background: radial-gradient(ellipse 80% 55% at 50% 32%, #fbfaf8 0%, #efeeeb 55%, #e3e2df 100%); }
  .scene.dark { background: radial-gradient(ellipse 75% 50% at 50% 34%, #3b3b3b 0%, #262626 55%, #161616 100%); color: #fff; }
  .content { position: absolute; left: 0; right: 0; top: 300px; display: flex; flex-direction: column; align-items: center; }
  h2 { font-weight: 900; font-size: 64px; letter-spacing: -1px; display: flex; align-items: baseline; gap: 26px; }
  h2 em { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-weight: 900; color: #e11d2a; font-size: 112px; line-height: .6; }
  .serif-title { font-size: 62px; font-weight: 800; letter-spacing: 0; margin-bottom: 20px; }
  .sub { font-size: 38px; color: #6b7280; margin-top: 18px; }
  .dark .sub { color: #a3a3a3; }
  .cars { display: flex; justify-content: center; margin-top: 34px; }
  .cars.one figure { width: 820px; }
  .spec-head { width: 960px; display: grid; grid-template-columns: 1fr 1fr; text-align: center; margin-top: 34px; padding-bottom: 12px; border-bottom: 5px solid #111; }
  .spec-head b { font-size: 44px; font-weight: 900; }
  .spec { width: 960px; padding: 14px 0 14px; border-bottom: 2px solid #d3d3d0; text-align: center; }
  .spec i { display: block; font-size: 34px; font-weight: 600; color: #6b7280; }
  .spec .vals { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 4px; }
  .spec .vals b { font-size: 46px; font-weight: 900; line-height: 1.18; letter-spacing: -0.3px; }
  .spec.same .vals b { grid-column: 1 / span 2; color: #1f2937; }
  .spec.diff { background: linear-gradient(90deg, rgba(225,29,42,0), rgba(225,29,42,.07) 50%, rgba(225,29,42,0)); }
  .spec.diff .vals b { color: #e11d2a; }
  .spec.upgrade .vals b { font-size: 40px; }
  .spec.upgrade .vals b:first-child { color: #6b7280; }
  .backdrop { position: absolute; left: 0; right: 0; top: 0; height: 1180px; overflow: hidden; }
  .backdrop .photo { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .backdrop::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, var(--fade, #161616) 100%); }
  .light .backdrop { --fade: #efeeeb; }
  .kicker { font-size: 30px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase; color: #ef2b36; }
  .big { font-size: 84px; font-weight: 900; letter-spacing: -2px; line-height: 1.02; text-align: center; max-width: 980px; margin-top: 10px; }
  .bullets { list-style: none; width: 920px; margin-top: 26px; }
  .bullets li { display: flex; gap: 20px; align-items: flex-start; font-size: 36px; font-weight: 700; line-height: 1.22; padding: 8px 0; }
  .bullets li::before { content: ""; flex: none; width: 14px; height: 14px; background: #e11d2a; margin-top: 15px; }
  .para { font-size: 40px; font-weight: 700; line-height: 1.35; text-align: center; max-width: 940px; margin-top: 24px; }
  .dark .para, .dark .bullets li { color: #f3f4f6; }
  .chips { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 24px; max-width: 980px; }
  .chips span { border: 3px solid currentColor; padding: 8px 20px; font-size: 34px; font-weight: 900; }
  .price { font-size: 110px; font-weight: 900; color: #ef2b36; letter-spacing: -3px; line-height: 1; margin-top: 16px; }
  .cars.one img { width: 820px; height: 420px; object-fit: contain; filter: drop-shadow(0 30px 24px rgba(0,0,0,.22)); }
  .cars.one.compact img { height: 320px; }
  .cars.two { gap: 30px; }
  .cars.two figure { width: 440px; position: relative; }
  .cars.two img { width: 440px; height: 230px; object-fit: contain; position: relative; }
  .dark .cars figure::before { content: ""; position: absolute; left: 10%; right: 10%; top: 6%; height: 70%; border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(225,29,42,.55), rgba(225,29,42,0) 70%); filter: blur(18px); }
  figure { text-align: center; }
  figcaption { font-size: 46px; font-weight: 800; margin-top: 14px; }
  .cars.two figcaption { font-family: RobotoLocal, Roboto, sans-serif; font-style: normal; font-weight: 900; font-size: 38px; margin-top: 6px; position: relative; }
  .row { width: 880px; display: flex; justify-content: space-between; align-items: baseline; padding: 18px 6px 16px; border-bottom: 3px solid #cfcfcc; margin-top: 8px; }
  .row i { font-size: 42px; color: #4b5563; font-weight: 600; }
  .row b { font-size: 66px; font-weight: 900; color: #e11d2a; letter-spacing: -1px; }
  .row.small b { font-size: 54px; }
  .row.small i { font-size: 36px; }
  .dark .row { border-color: #4b4b4b; }
  .dark .row i { color: #d4d4d4; }
  .table { margin-top: 10px; }
  .pair { width: 900px; display: grid; grid-template-columns: 1fr 230px 1fr; align-items: baseline; text-align: center; margin-top: 18px; }
  .pair b { font-size: 50px; font-weight: 900; letter-spacing: -0.5px; }
  .pair b.red { color: #ef2b36; }
  .pair i { font-size: 30px; color: #9ca3af; font-weight: 600; }
  .light .pair i { color: #6b7280; }
  .pair.head b { font-size: 46px; }
  .light .pair:not(.head) { border-bottom: 3px solid #d6d6d3; padding-bottom: 12px; }
  .box { margin-top: 56px; padding: 12px 34px 16px; font-weight: 900; font-size: 62px; letter-spacing: -0.5px; color: #fff; line-height: 1.12; text-align: center; max-width: 980px; }
  .box.red { background: #e11d2a; }
  .box.long { font-size: 52px; }
  .box.longer { font-size: 45px; padding: 14px 26px 18px; }
  .box.black { background: #0b0b0b; }
  .box span { display: inline-block; }
  .note { margin-top: 26px; font-size: 42px; font-weight: 600; color: #374151; text-align: center; max-width: 940px; }
  .dark .note { color: #e5e5e5; }
  .steps { list-style: none; width: 720px; margin-top: 10px; }
  .steps li { display: flex; align-items: center; gap: 30px; font-size: 54px; font-weight: 900; padding: 20px 0; }
  .steps .icon { width: 66px; height: 66px; flex: none; display: grid; place-items: center; border: 5px solid #e11d2a; color: #e11d2a; font-size: 44px; line-height: 1; }
  .lead { font-size: 46px; font-weight: 900; margin-top: 26px; }
  .contact { margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .contact b { font-size: 44px; font-weight: 900; }
  .contact span { font-size: 40px; font-weight: 900; color: #e11d2a; }
  .fine { margin-top: 26px; font-size: 26px; line-height: 1.5; color: #6b7280; text-align: center; max-width: 880px; }
  /* Thanh thời gian có vạch như video mẫu, phần đã chạy tô đỏ */
  .timeline { position: absolute; left: 60px; right: 60px; top: 1440px; height: 40px; }
  .timeline::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: rgba(140,140,140,.45); }
  .timeline .fill { position: absolute; left: 0; top: 0; height: 3px; background: #e11d2a; }
  .timeline .ticks { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, rgba(140,140,140,.55) 0 3px, transparent 3px 107px); clip-path: inset(0 0 0 0); height: 30px; top: 0; }
  .brand { position: absolute; right: 60px; top: 1462px; text-align: right; font-weight: 900; font-size: 30px; line-height: 1.2; opacity: .85; }
  .brand small { display: block; font-size: 26px; font-weight: 700; color: #e11d2a; }
  .dark .brand { color: #fff; }
${extraCss}
</style></head>
<body>
${scenes
  .map(
    (scene, index) => `<section class="scene ${scene.theme}" data-start="${timings[index].start}" data-dur="${timings[index].duration}" data-speak="${timings[index].speak}">
  ${scene.backdrop ? `<div class="backdrop">${scene.backdrop}</div>` : ""}
  <div class="content"${scene.contentTop ? ` style="top:${scene.contentTop}px"` : ""}>${scene.html}</div>
  ${index < scenes.length - 1 ? `<div class="brand">Lưu Hoàng Phúc<small>Zalo ${escapeHtml(phone)}</small></div>` : ""}
  <div class="timeline"><div class="ticks"></div><div class="fill"></div></div>
</section>`
  )
  .join("\n")}
<script>
  const TOTAL = ${total};
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const scenes = [...document.querySelectorAll(".scene")].map((el) => ({
    el,
    content: el.querySelector(".content"),
    fill: el.querySelector(".timeline .fill"),
    start: +el.dataset.start, dur: +el.dataset.dur, speak: +el.dataset.speak,
    items: [...el.querySelectorAll("[data-at]")].map((node) => ({ node, at: +node.dataset.at, fx: node.dataset.fx || "up" })),
  }));
  window.renderAt = (t) => {
    for (const s of scenes) {
      const lt = t - s.start;
      const active = lt >= 0 && (lt < s.dur || (s === scenes[scenes.length - 1] && lt <= s.dur + 1));
      s.el.style.display = active ? "block" : "none";
      if (!active) continue;
      // Vào cảnh: nội dung hiện từ mờ; ra cảnh (trừ cảnh cuối): nhòe dần rồi cắt sang cảnh sau
      const isLast = s === scenes[scenes.length - 1];
      const out = isLast ? 0 : clamp((lt - (s.dur - 0.28)) / 0.28);
      s.content.style.opacity = String(1 - out);
      s.content.style.filter = out > 0 ? "blur(" + (out * 18).toFixed(1) + "px)" : "none";
      s.content.style.transform = "scale(" + (1 + out * 0.04) + ")";
      s.fill.style.width = (clamp(t / TOTAL) * 100).toFixed(2) + "%";
      for (const item of s.items) {
        const begin = item.at * s.speak;
        const raw = clamp((lt - begin) / (item.fx === "wipe" ? 0.32 : 0.42));
        const p = easeOut(raw);
        const n = item.node.style;
        if (item.fx === "zoom") {
          // Ảnh lớn: hiện dần và phóng chậm suốt cảnh (hiệu ứng Ken Burns)
          n.opacity = String(p);
          n.transform = "scale(" + (1.14 - 0.14 * easeOut(clamp(lt / s.dur))).toFixed(4) + ")";
        } else if (item.fx === "wipe") {
          n.clipPath = "inset(0 " + ((1 - p) * 100).toFixed(1) + "% 0 0)";
        } else if (item.fx === "car") {
          n.opacity = String(p);
          n.transform = "translateX(" + ((1 - p) * -70).toFixed(1) + "px) scale(" + (0.94 + 0.06 * p).toFixed(3) + ")";
          n.filter = p < 1 ? "blur(" + ((1 - p) * 14).toFixed(1) + "px)" : "none";
        } else {
          n.opacity = String(p);
          n.transform = "translateY(" + ((1 - p) * 36).toFixed(1) + "px)";
          n.filter = p < 1 ? "blur(" + ((1 - p) * 10).toFixed(1) + "px)" : "none";
        }
      }
    }
  };
  window.ready = async () => {
    await Promise.all(['italic 700 40px "Playfair Display"', 'italic 900 40px "Playfair Display"', '900 40px RobotoLocal', '500 40px RobotoLocal'].map((font) => document.fonts.load(font)));
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
    return [...document.images].filter((img) => !img.naturalWidth).map((img) => img.src);
  };
</script>
</body></html>`;
}

// ---------- Dựng video ----------
function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { stdio: ["ignore", "ignore", "pipe"], encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${path.basename(command)} lỗi:\n${(result.stderr ?? "").slice(-1500)}`);
}

// job: { key, outDir, scenes: [{ theme, voice, html, tail? }], title (dòng đầu loi-doc.txt), rerun (lệnh chạy lại), caption, css? }
async function makeVideo(job, browser) {
  const { key, outDir, scenes } = job;
  const voiceDir = path.join(outDir, "giong-doc");
  fs.mkdirSync(voiceDir, { recursive: true });

  // Thời lượng: theo file giọng đọc nếu có, không thì ước theo lời đọc
  let start = 0;
  const timings = scenes.map((scene, index) => {
    const file = voiceFile(voiceDir, index);
    const voiceLength = file ? audioDuration(file) : null;
    // minSpeak: cảnh nhiều chữ (bảng thông số) cần đủ thời gian đọc dù lời đọc ngắn
    const speak = voiceLength ?? Math.max(scene.minSpeak ?? 0, estimate(scene.voice));
    const duration = LEAD + speak + GAP + (scene.tail ?? 0);
    const timing = { start: +start.toFixed(3), duration: +duration.toFixed(3), speak: +speak.toFixed(3), file: voiceLength ? file : null };
    start += duration;
    return timing;
  });
  const total = +start.toFixed(3);
  const voices = timings.filter((timing) => timing.file);

  const htmlFile = path.join(work, `${key}.html`);
  fs.writeFileSync(htmlFile, renderHtml(scenes, timings, total, job.css));
  await browser.send("Page.navigate", { url: pathToFileURL(htmlFile).href });
  for (let i = 0; i < 80; i++) {
    await sleep(250);
    if ((await browser.evaluate("document.readyState").catch(() => "")) === "complete") break;
  }
  const broken = await browser.evaluate("window.ready()");
  if (broken?.length) console.warn(`  Ảnh không tải được: ${broken.join(", ")}`);
  const fonts = await browser.evaluate(`document.fonts.check('italic 800 40px "Playfair Display"')`);
  if (!fonts) console.warn("  Không nạp được phông Playfair Display (src/assets/fonts), dùng phông Georgia thay thế.");

  // --xem-truoc: chỉ chụp hình cuối mỗi cảnh (PNG) để duyệt nhanh, không dựng video
  if (flag("xem-truoc")) {
    const previewDir = path.join(outDir, "xem-truoc");
    fs.rmSync(previewDir, { recursive: true, force: true });
    fs.mkdirSync(previewDir, { recursive: true });
    for (const [index, timing] of timings.entries()) {
      await browser.evaluate(`renderAt(${(timing.start + timing.duration - 0.45 - (scenes[index].tail ?? 0)).toFixed(3)})`);
      const { data } = await browser.send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(path.join(previewDir, `${String(index + 1).padStart(2, "0")}.png`), Buffer.from(data, "base64"));
    }
    console.log(`  Xem trước ${scenes.length} cảnh → ${previewDir}`);
    return;
  }

  // Chụp từng hình rồi đẩy thẳng vào ffmpeg
  const silent = path.join(work, `${key}-silent.mp4`);
  const encoder = spawn(ffmpeg, [
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-r", String(FPS), silent,
  ], { stdio: ["pipe", "ignore", "pipe"] });
  let encoderError = "";
  encoder.stderr.on("data", (chunk) => (encoderError += chunk));
  const encoded = new Promise((resolve) => encoder.on("close", resolve));
  const frames = Math.ceil(total * FPS);
  const began = Date.now();
  for (let frame = 0; frame < frames; frame++) {
    await browser.evaluate(`renderAt(${(frame / FPS).toFixed(4)})`);
    const { data } = await browser.send("Page.captureScreenshot", { format: "jpeg", quality: 92 });
    if (!encoder.stdin.write(Buffer.from(data, "base64"))) await new Promise((resolve) => encoder.stdin.once("drain", resolve));
    if (frame % (FPS * 5) === 0) process.stdout.write(`\r  Đang dựng ${Math.round((frame / frames) * 100)}%`);
  }
  encoder.stdin.end();
  if ((await encoded) !== 0) throw new Error(`ffmpeg lỗi: ${encoderError.slice(-1500)}`);
  process.stdout.write(`\r  Đã dựng ${frames} hình trong ${Math.round((Date.now() - began) / 1000)} giây\n`);

  // Ghép giọng đọc (đặt đúng đầu từng cảnh) + nhạc nền nếu có
  const outFile = path.join(outDir, "video.mp4");
  const music = ["mp3", "m4a", "wav"].map((ext) => path.join(outDir, `nhac-nen.${ext}`)).find((file) => fs.existsSync(file));
  if (voices.length === 0 && !music) {
    fs.copyFileSync(silent, outFile);
  } else {
    const inputs = ["-i", silent];
    const filters = [];
    const labels = [];
    voices.forEach((timing, index) => {
      inputs.push("-i", timing.file);
      const delay = Math.round((timing.start + LEAD) * 1000);
      filters.push(`[${index + 1}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${delay}|${delay}[v${index}]`);
      labels.push(`[v${index}]`);
    });
    if (music) {
      inputs.push("-stream_loop", "-1", "-i", music);
      const index = voices.length + 1;
      // Nhạc nền nhỏ (15%) khi có giọng, tắt dần 1,5 giây cuối
      filters.push(`[${index}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${voices.length ? 0.15 : 0.6},atrim=0:${total},afade=t=out:st=${Math.max(0, total - 1.5)}:d=1.5[m]`);
      labels.push("[m]");
    }
    filters.push(`${labels.join("")}amix=inputs=${labels.length}:normalize=0:duration=longest,apad,atrim=0:${total}[a]`);
    run(ffmpeg, ["-y", "-loglevel", "error", ...inputs, "-filter_complex", filters.join(";"), "-map", "0:v", "-map", "[a]",
      "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-t", String(total), "-movflags", "+faststart", outFile]);
  }

  // Lời đọc từng cảnh, kèm mốc thời gian để canh trong CapCut nếu không dùng file giong-doc
  const stamp = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;
  const script = scenes
    .map((scene, index) => {
      const timing = timings[index];
      return `[Cảnh ${index + 1}] ${stamp(timing.start + LEAD)} → giong-doc/${index + 1}.mp3${timing.file ? " (đã có)" : ""}\n${scene.voice}`;
    })
    .join("\n\n");
  fs.writeFileSync(
    path.join(outDir, "loi-doc.txt"),
    `${job.title}\n` +
      `Tạo giọng AI cho TỪNG cảnh, lưu vào thư mục giong-doc (1.mp3, 2.mp3...) rồi chạy lại: ${job.rerun}\n` +
      `Giọng AI đọc số dạng "85,65 triệu" thường đúng; nếu đọc sai thì sửa chữ trong ô giọng đọc (vd "tám mươi lăm phẩy sáu lăm triệu"), không cần sửa file này.\n\n${script}\n`
  );
  if (job.caption) fs.writeFileSync(path.join(outDir, "caption.txt"), job.caption);
  console.log(`  ${voices.length ? `Có giọng đọc ${voices.length}/${scenes.length} cảnh` : "Chưa có giọng đọc (video chưa có tiếng)"}, dài ${total.toFixed(1)} giây`);
  console.log(`  → ${outFile}`);
}

export {
  root, load, cars, currentPromotion, provinces, siteConfig, calculateOnRoadPrice, work,
  args, flag, option, wanted, FPS, province, otherProvince, provinceShort,
  num, tr, trieu, escapeHtml, monthNumber, month, siteUrl, phone, shortBenefit, slugWords, variantImage,
  pair, pairRed, box, note, row, heading, twoCars, oneCar, diffWord,
  openBrowser, makeVideo,
};
