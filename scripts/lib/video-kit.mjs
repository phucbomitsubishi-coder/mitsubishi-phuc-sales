// Bộ dựng video dọc 9:16 dùng chung cho make-price-video.mjs và make-compare-video.mjs (10/11/2026).
// Mỗi cảnh là 1 khối HTML 1080×1920; phần tử có data-at (0..1 = lúc hiện, tính theo thời lượng lời đọc của cảnh)
// và data-fx (up | left | pop | fade | car | wipe | zoom | punch). Trình duyệt (Edge/Chrome, qua CDP) chụp từng hình, ffmpeg nén thành MP4 rồi ghép giọng đọc.
// Giọng đọc: giong-doc/<số cảnh>.mp3 trong thư mục kết quả; có thì cảnh dài đúng bằng giọng, không thì ước theo số chữ.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readNumbers } from "./doc-so.mjs";

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
const optionValues = new Set(["tinh", "ban", "giao-dien", "giong", "toc-do"].map(option).filter(Boolean));
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
  `<div class="row ${extra}" data-at="${at}"><i>${escapeHtml(label)}</i><b${String(value).length > 26 ? ' class="longer"' : String(value).length > 16 ? ' class="long"' : ""}>${escapeHtml(value)}</b></div>`;
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

// ---------- Giọng AI FPT (11/11/2026) ----------
// --tao-giong: cảnh nào chưa có giong-doc/N.* thì gọi FPT.TTS-pro tạo N.mp3 (khóa API trong biến môi trường FPT_API_KEY).
// Bên cạnh mỗi file tự tạo có N.txt ghi giọng + lời đọc; lời đọc đổi thì tự tạo lại. File anh tự đặt (không có N.txt) không bị ghi đè.
// --giong <id>: fci_vietkhoa (mặc định, nam miền Bắc), fci_xuantoan, fci_phuongan, std_banmai, std_quanganh. --toc-do: mặc định 0.9 (1 = tốc độ gốc FPT).
const TTS_URL = "https://token-api.fpt.ai/v1/audio/speech";
const ttsVoice = option("giong") ?? process.env.FPT_TTS_VOICE ?? "fci_vietkhoa";
const ttsSpeed = Number(option("toc-do") ?? 0.9) || 0.9; // anh Phúc nghe 1x thấy hơi nhanh (11/11/2026)
// Cách đọc cho giọng AI: chữ trên hình giữ nguyên, chỉ lời gửi FPT được viết lại theo âm (anh Phúc nghe thử 11/11/2026: "taplo", "ABS" đọc chưa ổn).
// Thêm từ đọc sai vào đây: [biểu thức, cách đọc].
const pronunciations = [
  [/\btaplo\b/gi, "táp lô"],
  [/\bABS\b/g, "a bê ét"],
  [/\bCVT\b/g, "xê vê tê"],
  [/\bAT\b/g, "a tê"],
  [/\bVAT\b/g, "vát"],
  [/\bTNDS\b/g, "trách nhiệm dân sự"],
  [/\bTP\.? ?HCM\b/g, "thành phố Hồ Chí Minh"],
  [/▲/g, "tam giác"],
  [/số tự động: L, 1, 2/g, "số tự động: e lờ, một, hai"],
];
// Số và đơn vị đọc thành chữ (doc-so.mjs) vì FPT đọc số ngọng, sai (anh Phúc nghe 11/11/2026)
const spokenText = (text) => readNumbers(pronunciations.reduce((result, [pattern, sound]) => result.replace(pattern, sound), text));
const PAUSE = 0.3; // nghỉ lấy hơi giữa các câu (giây)
async function ttsPiece(text, file) {
  const response = await fetch(TTS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.FPT_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "FPT.TTS-pro", input: text, voice: ttsVoice, speed: ttsSpeed }),
  });
  const body = Buffer.from(await response.arrayBuffer());
  if (!response.ok) throw new Error(`FPT ${response.status}: ${body.toString().slice(0, 300)}`);
  fs.writeFileSync(file, body);
}
async function speakFpt(text, file) {
  // Đọc TỪNG CÂU rồi ghép, nghỉ PAUSE giây giữa các câu: đọc cả đoạn một hơi nghe hụt hơi
  // Câu quá ngắn (dưới 4 tiếng, vd "Một.") ghép vào câu sau: đọc riêng bị ngắn, dễ mất tiếng
  const sentences = [];
  for (const part of text.split(/(?<=[.?!…])\s+/).map((item) => item.trim()).filter(Boolean)) {
    const last = sentences.at(-1);
    if (last && last.split(/\s+/).length < 4) sentences[sentences.length - 1] = `${last.replace(/[.…]$/, ",")} ${part}`;
    else sentences.push(part);
  }
  const pieces = [];
  for (const [i, sentence] of sentences.entries()) {
    const piece = `${file}.${i}.wav`;
    await ttsPiece(sentence, piece);
    pieces.push(piece);
  }
  // Cắt khoảng lặng đầu/cuối mỗi câu, thêm nghỉ đều, ghép, chuẩn âm lượng -16 LUFS (mức video mạng xã hội), đổi sang MP3
  const trim = "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,areverse";
  const filters = pieces.map((_, i) => `[${i}:a]aresample=44100,${trim}${i < pieces.length - 1 ? `,apad=pad_dur=${PAUSE}` : ""}[p${i}]`);
  const graph = `${filters.join(";")};${pieces.map((_, i) => `[p${i}]`).join("")}concat=n=${pieces.length}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]`;
  const result = spawnSync(ffmpeg, ["-y", "-v", "error", ...pieces.flatMap((piece) => ["-i", piece]), "-filter_complex", graph, "-map", "[out]", "-ar", "44100", "-codec:a", "libmp3lame", "-q:a", "3", file]);
  for (const piece of pieces) fs.rmSync(piece, { force: true });
  if (result.status !== 0) throw new Error(`ffmpeg không ghép được giọng: ${result.stderr}`);
}
async function makeVoices(scenes, voiceDir) {
  if (!process.env.FPT_API_KEY) {
    console.warn("  --tao-giong: chưa có FPT_API_KEY. Đặt khóa: setx FPT_API_KEY \"<khóa>\" (rồi mở lại cửa sổ dòng lệnh). Bỏ qua tạo giọng.");
    return;
  }
  for (const [index, scene] of scenes.entries()) {
    const text = spokenText((scene.speak ?? scene.voice).trim());
    const stampFile = path.join(voiceDir, `${index + 1}.txt`);
    const stamp = `v3|${ttsVoice}|${ttsSpeed}|${text}`; // v3: đọc từng câu (câu ngắn ghép câu sau) + số thành chữ
    const existing = voiceFile(voiceDir, index);
    if (existing && (!fs.existsSync(stampFile) || fs.readFileSync(stampFile, "utf8") === stamp)) continue;
    if (existing) fs.rmSync(existing);
    process.stdout.write(`  Tạo giọng cảnh ${index + 1}/${scenes.length}... `);
    await speakFpt(text, path.join(voiceDir, `${index + 1}.mp3`));
    fs.writeFileSync(stampFile, stamp);
    console.log("xong");
  }
}

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


// ---------- Giao diện ----------
// Cùng nội dung, khác màu / phông / khung / cách chữ hiện (fx) / cách chuyển cảnh (out), để video không nhàm.
// Mặc định mỗi video tự nhận 1 giao diện theo tên (chạy lại vẫn giữ giao diện đó); --giao-dien <id> chọn riêng,
// --giao-dien tat-ca xuất mỗi giao diện một file (video-<id>.mp4) để đăng lại cùng nội dung với vẻ khác.
// fx: up (trượt lên, mờ dần) | left (trượt từ trái) | pop (bật to) | fade (hiện dần)
// out: blur (nhòe) | slide (đẩy lên) | zoom (phóng to) | wipe (quét ngang) | fade (mờ dần)
const skins = [
  { id: "co-dien", name: "Cổ điển đen trắng đỏ (như video mẫu)", fx: "up", out: "blur", css: "" },
  {
    id: "bao-chi", name: "Báo chí: nền giấy, chữ có chân, khung đổ bóng", fx: "left", out: "slide",
    css: `
  .skin-bao-chi { --accent: #b42318; --accent-2: #f87171; --glow: rgba(255,255,255,.16); --tint: rgba(180,35,24,.08);
    --light-bg: repeating-linear-gradient(0deg, rgba(0,0,0,.025) 0 2px, transparent 2px 7px), #f3eee3; --light-fade: #f3eee3;
    --dark-bg: radial-gradient(ellipse 80% 55% at 50% 35%, #213659 0%, #13213b 60%, #0c1628 100%); --dark-fade: #0c1628;
    --box-bg: #b42318; --box-shadow: 12px 12px 0 #111; --black-box: #13213b; }
  .skin-bao-chi .dark { --box-shadow: 12px 12px 0 rgba(0,0,0,.55); }
  .skin-bao-chi h2 { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 74px; letter-spacing: 0; }
  .skin-bao-chi .content::before { content: ""; width: 150px; height: 9px; background: var(--accent); margin: -44px 0 35px; }
  .skin-bao-chi .dark .content::before { background: #f3eee3; }
  .skin-bao-chi .content { top: 255px; }
  .skin-bao-chi .row { border-bottom-style: dashed; }
  .skin-bao-chi .box { transform: rotate(-1.2deg); }
  .skin-bao-chi .timeline::before, .skin-bao-chi .timeline .fill { height: 8px; }`,
  },
  {
    id: "cong-nghe", name: "Công nghệ: nền tối có lưới, chữ phát sáng xanh", fx: "pop", out: "zoom",
    css: `
  .skin-cong-nghe { --accent: #22d3ee; --accent-2: #22d3ee; --glow: rgba(34,211,238,.45); --tint: rgba(34,211,238,.10);
    --light-bg: linear-gradient(rgba(34,211,238,.07) 2px, transparent 2px) 0 0 / 100% 90px, linear-gradient(90deg, rgba(34,211,238,.07) 2px, transparent 2px) 0 0 / 90px 100%, radial-gradient(ellipse 80% 55% at 50% 32%, #172347 0%, #0b1020 70%);
    --light-ink: #f1f5f9; --light-fade: #0b1020;
    --dark-bg: radial-gradient(ellipse 75% 50% at 50% 34%, #24205a 0%, #0b0a1f 70%); --dark-fade: #0b0a1f;
    --box-bg: linear-gradient(90deg, #22d3ee, #818cf8); --box-ink: #04111a; --box-shadow: 0 0 46px rgba(34,211,238,.45);
    --black-box: #f1f5f9; --black-box-ink: #0b1020; }
  .skin-cong-nghe .row i, .skin-cong-nghe .sub, .skin-cong-nghe .pair i, .skin-cong-nghe .spec i, .skin-cong-nghe .fine, .skin-cong-nghe .equip small, .skin-cong-nghe .brand { color: #94a3b8 !important; }
  .skin-cong-nghe .note, .skin-cong-nghe .lead, .skin-cong-nghe .para, .skin-cong-nghe .spec.same .vals b, .skin-cong-nghe .spec.upgrade .vals b:first-child { color: #e2e8f0 !important; }
  .skin-cong-nghe .row, .skin-cong-nghe .spec, .skin-cong-nghe .equip li, .skin-cong-nghe .pair { border-color: rgba(148,163,184,.25) !important; }
  .skin-cong-nghe .spec-head { border-color: #22d3ee; }
  .skin-cong-nghe h2, .skin-cong-nghe .serif-title { font-family: RobotoLocal, Roboto, sans-serif; font-style: normal; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; font-size: 54px; }
  .skin-cong-nghe .row b, .skin-cong-nghe .pair b.red, .skin-cong-nghe .price, .skin-cong-nghe h2 em { text-shadow: 0 0 26px rgba(34,211,238,.6); }
  .skin-cong-nghe .cars img { filter: drop-shadow(0 0 40px rgba(34,211,238,.35)) !important; }
  .skin-cong-nghe .equip .icon { color: #04111a; }`,
  },
  {
    id: "do-vang", name: "Đỏ vàng nổi bật: tiêu đề khối đen, khung vàng", fx: "left", out: "wipe",
    css: `
  .skin-do-vang { --accent: #c8102e; --accent-2: #facc15; --glow: rgba(255,255,255,.35); --tint: rgba(200,16,46,.07);
    --light-bg: #ffffff; --light-fade: #ffffff;
    --dark-bg: repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 28px, transparent 28px 56px), #c8102e; --dark-fade: #c8102e;
    --box-bg: #facc15; --box-ink: #111; --black-box: #c8102e; --black-box-ink: #fff; }
  .skin-do-vang h2 { text-transform: uppercase; font-size: 56px; letter-spacing: 0; }
  .skin-do-vang .light h2 { background: #111; color: #fff; padding: 12px 28px 16px; }
  .skin-do-vang .dark .row b, .skin-do-vang .dark .pair b.red, .skin-do-vang .dark .price, .skin-do-vang .dark .kicker, .skin-do-vang .dark h2 em, .skin-do-vang .dark .contact span, .skin-do-vang .dark .brand small { color: #facc15; }
  .skin-do-vang .dark .sub, .skin-do-vang .dark .pair i, .skin-do-vang .dark .row i, .skin-do-vang .dark .note { color: #fee2e2 !important; }
  .skin-do-vang .light .row { border-bottom: 4px solid #111; }
  .skin-do-vang .dark .row { border-color: rgba(255,255,255,.35); }
  .skin-do-vang .timeline .fill { background: #facc15; height: 6px; }`,
  },
  {
    id: "toi-gian", name: "Tối giản xanh: số thứ tự trong hình tròn, chữ nhẹ", fx: "fade", out: "fade",
    css: `
  .skin-toi-gian { --accent: #0f766e; --accent-2: #5eead4; --glow: rgba(94,234,212,.3); --tint: rgba(15,118,110,.08);
    --light-bg: radial-gradient(ellipse 80% 55% at 50% 30%, #f7faf9 0%, #e7efec 70%); --light-fade: #e7efec;
    --dark-bg: radial-gradient(ellipse 80% 55% at 50% 35%, #1d4d45 0%, #10302b 65%, #0a201c 100%); --dark-fade: #0a201c;
    --box-bg: #0f766e; --black-box: #10302b; }
  .skin-toi-gian .dark { --box-bg: #5eead4; --box-ink: #0a201c; }
  .skin-toi-gian h2 { font-weight: 700; font-size: 60px; align-items: center; }
  .skin-toi-gian h2 em { font-family: RobotoLocal, Roboto, sans-serif; font-style: normal; font-weight: 900; font-size: 58px; line-height: 96px; width: 96px; height: 96px; display: inline-block; text-align: center; border-radius: 50%; background: var(--accent); color: #fff; }
  .skin-toi-gian .row { border-bottom: 2px solid rgba(15,118,110,.25); }
  .skin-toi-gian .box { padding: 16px 42px 20px; }`,
  },
];
function skinsFor(key) {
  const wanted = option("giao-dien");
  if (wanted === "tat-ca") return skins;
  if (wanted) {
    const found = skins.find((skin) => skin.id === wanted);
    if (!found) {
      console.error(`Không có giao diện "${wanted}". Các giao diện: ${skins.map((skin) => `${skin.id} (${skin.name})`).join("; ")}, tat-ca`);
      process.exit(1);
    }
    return [found];
  }
  const hash = [...key].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 100003, 7);
  return [skins[hash % skins.length]];
}

// ---------- HTML ----------
const fontUrl = (file) => pathToFileURL(path.join(root, "src/assets/fonts", file)).href;
function renderHtml(scenes, timings, total, extraCss = "", skin = skins[0], brandHtml = null) {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<style>
  @font-face { font-family: "RobotoLocal"; src: url("${fontUrl("Roboto-Black.ttf")}"); font-weight: 900; }
  @font-face { font-family: "RobotoLocal"; src: url("${fontUrl("Roboto-Medium.ttf")}"); font-weight: 500 700; }
  @font-face { font-family: "Playfair Display"; font-style: italic; src: url("${fontUrl("PlayfairDisplay-BoldItalic.ttf")}"); font-weight: 400 800; }
  @font-face { font-family: "Playfair Display"; font-style: italic; src: url("${fontUrl("PlayfairDisplay-BlackItalic.ttf")}"); font-weight: 900; }
  :root {
    --accent: #e11d2a; --accent-2: #ef2b36; --glow: rgba(225,29,42,.55); --tint: rgba(225,29,42,.07);
    --light-bg: radial-gradient(ellipse 80% 55% at 50% 32%, #fbfaf8 0%, #efeeeb 55%, #e3e2df 100%); --light-ink: #111; --light-fade: #efeeeb;
    --dark-bg: radial-gradient(ellipse 75% 50% at 50% 34%, #3b3b3b 0%, #262626 55%, #161616 100%); --dark-ink: #fff; --dark-fade: #161616;
    --box-bg: var(--accent); --box-ink: #fff; --box-shadow: none; --black-box: #0b0b0b; --black-box-ink: #fff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1920px; overflow: hidden; background: #000; }
  body { font-family: RobotoLocal, Roboto, "Segoe UI", Arial, sans-serif; color: #111; }
  .serif, .row i, .pair i, .note, .serif-title, figcaption { font-family: "Playfair Display", Georgia, "Times New Roman", serif; font-style: italic; }
  .scene { position: absolute; inset: 0; display: none; }
  .scene.light { background: var(--light-bg); color: var(--light-ink); }
  .scene.dark { background: var(--dark-bg); color: var(--dark-ink); }
  .content { position: absolute; left: 0; right: 0; top: 300px; display: flex; flex-direction: column; align-items: center; }
  h2 { font-weight: 900; font-size: 64px; letter-spacing: -1px; display: flex; align-items: baseline; gap: 26px; }
  h2 em { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-weight: 900; color: var(--accent); font-size: 112px; line-height: .6; }
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
  .spec.diff { background: linear-gradient(90deg, transparent, var(--tint) 50%, transparent); }
  .spec.diff .vals b { color: var(--accent); }
  .spec.upgrade .vals b { font-size: 40px; }
  .spec.upgrade .vals b:first-child { color: #6b7280; }
  .backdrop { position: absolute; left: 0; right: 0; top: 0; height: 1180px; overflow: hidden; }
  .backdrop .photo { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .backdrop::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, var(--fade, var(--dark-fade)) 100%); }
  .light .backdrop { --fade: var(--light-fade); }
  .kicker { font-size: 30px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase; color: var(--accent-2); }
  .big { font-size: 84px; font-weight: 900; letter-spacing: -2px; line-height: 1.02; text-align: center; max-width: 980px; margin-top: 10px; }
  .bullets { list-style: none; width: 920px; margin-top: 26px; }
  .bullets li { display: flex; gap: 20px; align-items: flex-start; font-size: 36px; font-weight: 700; line-height: 1.22; padding: 8px 0; }
  .bullets li::before { content: ""; flex: none; width: 14px; height: 14px; background: var(--accent); margin-top: 15px; }
  .para { font-size: 40px; font-weight: 700; line-height: 1.35; text-align: center; max-width: 940px; margin-top: 24px; }
  .dark .para, .dark .bullets li { color: #f3f4f6; }
  .chips { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 24px; max-width: 980px; }
  .chips span { border: 3px solid currentColor; padding: 8px 20px; font-size: 34px; font-weight: 900; }
  .price { font-size: 110px; font-weight: 900; color: var(--accent-2); letter-spacing: -3px; line-height: 1; margin-top: 16px; }
  .cars.one img { width: 820px; height: 420px; object-fit: contain; filter: drop-shadow(0 30px 24px rgba(0,0,0,.22)); }
  .cars.one.compact img { height: 320px; }
  .cars.two { gap: 30px; }
  .cars.two figure { width: 440px; position: relative; }
  .cars.two img { width: 440px; height: 230px; object-fit: contain; position: relative; }
  .dark .cars figure::before { content: ""; position: absolute; left: 10%; right: 10%; top: 6%; height: 70%; border-radius: 50%;
    background: radial-gradient(ellipse at center, var(--glow), transparent 70%); filter: blur(18px); }
  figure { text-align: center; }
  figcaption { font-size: 46px; font-weight: 800; margin-top: 14px; }
  .cars.two figcaption { font-family: RobotoLocal, Roboto, sans-serif; font-style: normal; font-weight: 900; font-size: 38px; margin-top: 6px; position: relative; }
  .row { width: 880px; display: flex; justify-content: space-between; align-items: baseline; padding: 18px 6px 16px; border-bottom: 3px solid #cfcfcc; margin-top: 8px; }
  .row i { font-size: 42px; color: #4b5563; font-weight: 600; }
  .row b { font-size: 66px; font-weight: 900; color: var(--accent); letter-spacing: -1px; }
  .row.small b { font-size: 54px; }
  .row.small i { font-size: 36px; }
  .row b.long { font-size: 46px !important; text-align: right; }
  .row b.longer { font-size: 36px !important; text-align: right; max-width: 600px; line-height: 1.15; }
  .row i { flex: none; max-width: 420px; padding-right: 20px; }
  .dark .row { border-color: #4b4b4b; }
  .dark .row i { color: #d4d4d4; }
  /* Trên nền tối dùng màu nhấn sáng (--accent-2): màu nhấn đậm của Tối giản (xanh) và Báo chí (đỏ) chìm vào nền tối */
  .dark .row b, .dark .price, .dark .kicker, .dark h2 em, .dark .contact span, .dark .brand small, .dark .spec.diff .vals b { color: var(--accent-2); }
  .dark .bullets li::before { background: var(--accent-2); }
  .dark .box.black { background: rgba(255,255,255,.14); color: #fff; }
  .dark .spec.same .vals b { color: inherit; }
  .dark .spec, .dark .spec-head { border-color: rgba(255,255,255,.22); }
  .dark .spec i { color: #cbd5e1; }
  .table { margin-top: 10px; }
  .pair { width: 900px; display: grid; grid-template-columns: 1fr 230px 1fr; align-items: baseline; text-align: center; margin-top: 18px; }
  .pair b { font-size: 50px; font-weight: 900; letter-spacing: -0.5px; }
  .pair b.red { color: var(--accent-2); }
  .light .pair b.red, .light .price, .light .kicker { color: var(--accent); }
  .pair i { font-size: 30px; color: #9ca3af; font-weight: 600; }
  .light .pair i { color: #6b7280; }
  .pair.head b { font-size: 46px; }
  .light .pair:not(.head) { border-bottom: 3px solid #d6d6d3; padding-bottom: 12px; }
  .box { margin-top: 56px; padding: 12px 34px 16px; font-weight: 900; font-size: 62px; letter-spacing: -0.5px; color: #fff; line-height: 1.12; text-align: center; max-width: 980px; }
  .box.red { background: var(--box-bg); color: var(--box-ink); box-shadow: var(--box-shadow); }
  .box.long { font-size: 52px; }
  .box.longer { font-size: 45px; padding: 14px 26px 18px; }
  .box.black { background: var(--black-box); color: var(--black-box-ink); }
  .box span { display: inline-block; }
  .note { margin-top: 26px; font-size: 42px; font-weight: 600; color: #374151; text-align: center; max-width: 940px; }
  .dark .note { color: #e5e5e5; }
  .steps { list-style: none; width: 720px; margin-top: 10px; }
  .steps li { display: flex; align-items: center; gap: 30px; font-size: 54px; font-weight: 900; padding: 20px 0; }
  .steps .icon { width: 66px; height: 66px; flex: none; display: grid; place-items: center; border: 5px solid var(--accent); color: var(--accent); font-size: 44px; line-height: 1; }
  .lead { font-size: 46px; font-weight: 900; margin-top: 26px; }
  .contact { margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .contact b { font-size: 44px; font-weight: 900; }
  .contact span { font-size: 40px; font-weight: 900; color: var(--accent); }
  .fine { margin-top: 26px; font-size: 26px; line-height: 1.5; color: #6b7280; text-align: center; max-width: 880px; }
  /* Thanh thời gian có vạch như video mẫu, phần đã chạy tô đỏ */
  .timeline { position: absolute; left: 60px; right: 60px; top: 1440px; height: 40px; }
  .timeline::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: rgba(140,140,140,.45); }
  .timeline .fill { position: absolute; left: 0; top: 0; height: 3px; background: var(--accent); }
  .timeline .ticks { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, rgba(140,140,140,.55) 0 3px, transparent 3px 107px); clip-path: inset(0 0 0 0); height: 30px; top: 0; }
  .brand { position: absolute; right: 60px; top: 1462px; text-align: right; font-weight: 900; font-size: 30px; line-height: 1.2; opacity: .85; }
  .brand small { display: block; font-size: 26px; font-weight: 700; color: var(--accent); }
  .dark .brand { color: #fff; }
${extraCss}
${skin.css}
</style></head>
<body class="skin-${skin.id}">
${scenes
  .map(
    (scene, index) => `<section class="scene ${scene.theme}" data-start="${timings[index].start}" data-dur="${timings[index].duration}" data-speak="${timings[index].speak}">
  ${scene.backdrop ? `<div class="backdrop">${scene.backdrop}</div>` : ""}
  <div class="content"${scene.contentTop ? ` style="top:${scene.contentTop}px"` : ""}>${scene.html}</div>
  ${index < scenes.length - 1 ? `<div class="brand">${brandHtml ?? `Lưu Hoàng Phúc<small>Zalo ${escapeHtml(phone)}</small>`}</div>` : ""}
  <div class="timeline"><div class="ticks"></div><div class="fill"></div></div>
</section>`
  )
  .join("\n")}
<script>
  const TOTAL = ${total};
  const SKIN = ${JSON.stringify({ fx: skin.fx, out: skin.out })};
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const scenes = [...document.querySelectorAll(".scene")].map((el) => ({
    el,
    content: el.querySelector(".content"),
    fill: el.querySelector(".timeline .fill"),
    start: +el.dataset.start, dur: +el.dataset.dur, speak: +el.dataset.speak,
    items: [...el.querySelectorAll("[data-at]")].map((node) => ({ node, at: +node.dataset.at, until: node.dataset.until ? +node.dataset.until : null, fx: node.dataset.fx || SKIN.fx })),
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
      const c = s.content.style;
      c.opacity = String(1 - out);
      c.filter = "none";
      c.transform = "none";
      c.clipPath = "none";
      if (out > 0) {
        if (SKIN.out === "slide") c.transform = "translateY(" + (-90 * out).toFixed(1) + "px)";
        else if (SKIN.out === "zoom") { c.transform = "scale(" + (1 + 0.22 * out).toFixed(3) + ")"; c.filter = "blur(" + (out * 6).toFixed(1) + "px)"; }
        else if (SKIN.out === "wipe") { c.opacity = "1"; c.clipPath = "inset(0 0 0 " + (out * 100).toFixed(1) + "%)"; }
        else if (SKIN.out === "fade") c.transform = "scale(" + (1 - 0.02 * out).toFixed(3) + ")";
        else { c.filter = "blur(" + (out * 18).toFixed(1) + "px)"; c.transform = "scale(" + (1 + out * 0.04) + ")"; }
      }
      s.fill.style.width = (clamp(t / TOTAL) * 100).toFixed(2) + "%";
      for (const item of s.items) {
        const begin = item.at * s.speak;
        // data-until: phần tử chỉ hiện tới mốc này rồi tắt nhanh (đếm ngược 3-2-1, câu hỏi trước khi hé lộ đáp án)
        const gone = item.until != null ? clamp((lt - item.until * s.speak) / 0.15) : 0;
        item.node.style.visibility = gone >= 1 ? "hidden" : "visible";
        const raw = clamp((lt - begin) / (item.fx === "wipe" ? 0.32 : 0.42));
        const p = easeOut(raw);
        const n = item.node.style;
        if (item.fx === "zoom") {
          // Ảnh lớn: hiện dần và phóng chậm suốt cảnh (hiệu ứng Ken Burns)
          n.opacity = String(p);
          n.transform = "scale(" + (1.14 - 0.14 * easeOut(clamp(lt / s.dur))).toFixed(4) + ")";
        } else if (item.fx === "punch") {
          // Hook đầu video: lao vào từ cỡ lớn, nhòe → rõ trong 0,3 giây, rồi tiến chậm suốt cảnh
          const q = easeOut(clamp((lt - begin) / 0.3));
          n.opacity = String(q);
          n.transform = "scale(" + (1.6 - 0.6 * q + 0.06 * clamp(lt / s.dur)).toFixed(4) + ")";
          n.filter = q < 1 ? "blur(" + ((1 - q) * 18).toFixed(1) + "px)" : "none";
        } else if (item.fx === "wipe") {
          n.clipPath = "inset(0 " + ((1 - p) * 100).toFixed(1) + "% 0 0)";
        } else if (item.fx === "car") {
          n.opacity = String(p);
          n.transform = "translateX(" + ((1 - p) * -70).toFixed(1) + "px) scale(" + (0.94 + 0.06 * p).toFixed(3) + ")";
          n.filter = p < 1 ? "blur(" + ((1 - p) * 14).toFixed(1) + "px)" : "none";
        } else if (item.fx === "left") {
          n.opacity = String(p);
          n.transform = "translateX(" + ((1 - p) * -90).toFixed(1) + "px)";
        } else if (item.fx === "pop") {
          // easeOutBack: bật quá một chút rồi về đúng cỡ
          const k = 1.7;
          const b = 1 + (k + 1) * Math.pow(raw - 1, 3) + k * Math.pow(raw - 1, 2);
          n.opacity = String(p);
          n.transform = "scale(" + (0.72 + 0.28 * b).toFixed(3) + ")";
        } else if (item.fx === "fade") {
          n.opacity = String(p);
          n.transform = "scale(" + (0.97 + 0.03 * p).toFixed(3) + ")";
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
    // Ảnh nền (.photo dùng background-image) không nằm trong document.images: tải và giải mã trước khi chụp
    const backgrounds = [...document.querySelectorAll(".photo")].map((el) => (el.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/) || [])[1]).filter(Boolean);
    const failed = [];
    await Promise.all(backgrounds.map((src) => new Promise((r) => { const img = new Image(); img.onload = () => img.decode().then(r, r); img.onerror = () => { failed.push(src); r(); }; img.src = src; })));
    return [...[...document.images].filter((img) => !img.naturalWidth).map((img) => img.src), ...failed];
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
  if (flag("tao-giong")) await makeVoices(scenes, voiceDir);

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

  const chosenSkins = skinsFor(key);
  const many = chosenSkins.length > 1;
  const outputs = [];
  for (const skin of chosenSkins) {
    const htmlFile = path.join(work, `${key}-${skin.id}.html`);
    fs.writeFileSync(htmlFile, renderHtml(scenes, timings, total, job.css, skin, job.brand));
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
      const previewDir = path.join(outDir, many ? `xem-truoc-${skin.id}` : "xem-truoc");
      fs.rmSync(previewDir, { recursive: true, force: true });
      fs.mkdirSync(previewDir, { recursive: true });
      for (const [index, timing] of timings.entries()) {
        await browser.evaluate(`renderAt(${(timing.start + timing.duration - 0.45 - (scenes[index].tail ?? 0)).toFixed(3)})`);
        const { data } = await browser.send("Page.captureScreenshot", { format: "png" });
        fs.writeFileSync(path.join(previewDir, `${String(index + 1).padStart(2, "0")}.png`), Buffer.from(data, "base64"));
      }
      console.log(`  Xem trước ${scenes.length} cảnh (${skin.id}) → ${previewDir}`);
      continue;
    }

    // Chụp từng hình rồi đẩy thẳng vào ffmpeg
    const silent = path.join(work, `${key}-${skin.id}-silent.mp4`);
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
    const outFile = path.join(outDir, many ? `video-${skin.id}.mp4` : "video.mp4");
    outputs.push(`${outFile} (giao diện ${skin.id})`);
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
  }
  // Xem trước vẫn ghi loi-doc.txt và caption.txt để duyệt lời đọc cùng lúc

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
  for (const output of outputs) console.log(`  → ${output}`);
}

export {
  root, load, cars, currentPromotion, provinces, siteConfig, calculateOnRoadPrice, work,
  args, flag, option, wanted, FPS, province, otherProvince, provinceShort,
  num, tr, trieu, escapeHtml, monthNumber, month, siteUrl, phone, shortBenefit, slugWords, variantImage,
  pair, pairRed, box, note, row, heading, twoCars, oneCar, diffWord,
  openBrowser, makeVideo, skins,
};
