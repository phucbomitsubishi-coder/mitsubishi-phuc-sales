// Video dọc 9:16 "Đọc báo giá đúng" cho TikTok/Reels (10/11/2026), bố cục theo video mẫu anh Phúc gửi:
//   0 Mở đầu nền tối: 2 phiên bản, niêm yết chênh X → sau ưu đãi chênh Y
//   1 Quên phí đăng ký   (niêm yết + phí đăng ký = lăn bánh)
//   2 Quên trừ ưu đãi    (lăn bánh − ưu đãi = còn ...)
//   3 Bản cao ưu đãi cao? (so ưu đãi 2 bản; xe 1 phiên bản: các khoản ưu đãi)
//   4 Phí đăng ký nền tối (phí từng bản khác nhau; xe 1 phiên bản: so 2 tỉnh)
//   5 Cách đọc đúng      (danh sách 4 bước → = Số tiền thực tế)
//   6 Lưu video và bình luận phiên bản
// Số liệu lấy từ cars.ts, promotions.ts và công thức calculateOnRoadPrice (src/lib/onRoadPrice.ts), nên mỗi tháng chỉ cần chạy lại.
//
// Chạy:   npm run price-video -- destinator        (một xe; id xe: destinator, xforce, triton, xpander, xpander-cross, attrage)
//         npm run price-video -- tat-ca            (mọi xe đang có ưu đãi)
//         thêm --tinh ha-noi để tính lăn bánh tỉnh khác (id trong src/data/registrationFees.ts), --nhanh để xem thử (15 hình/giây)
// Kết quả: ../anh-facebook/video-gia/<xe>-MM-YYYY/  video.mp4, loi-doc.txt (lời đọc từng cảnh), caption.txt
//
// GIỌNG ĐỌC AI: lần đầu video chưa có tiếng, thời lượng từng cảnh ước theo độ dài lời đọc.
//   Tạo giọng AI cho từng cảnh trong loi-doc.txt (CapCut "Văn bản thành giọng nói", Vbee, FPT.AI...), lưu thành
//   giong-doc/1.mp3 ... 7.mp3 trong thư mục kết quả (mp3/wav/m4a đều được) rồi chạy lại lệnh:
//   mỗi cảnh tự dài đúng bằng giọng đọc và tiếng được ghép vào video. Có thêm nhac-nen.mp3 thì trộn nhỏ làm nhạc nền.
// Cần: Microsoft Edge hoặc Chrome (chụp từng hình) và ffmpeg (winget install Gyan.FFmpeg).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (file) => import(pathToFileURL(path.join(root, file)).href);
const { cars } = await load("src/data/cars.ts");
const { currentPromotion } = await load("src/data/promotions.ts");
const { provinces, defaultProvinceId } = await load("src/data/registrationFees.ts");
const { siteConfig } = await load("src/config/site.ts");

const work = fs.mkdtempSync(path.join(os.tmpdir(), "price-video-"));
// Xóa thư mục tạm (profile trình duyệt, khung hình) khi script kết thúc
process.on("exit", () => { try { fs.rmSync(work, { recursive: true, force: true, maxRetries: 3 }); } catch {} });

// onRoadPrice.ts import "@/data/registrationFees" (alias của Next): chép sang thư mục tạm, đổi alias thành đường dẫn file
// để dùng đúng một công thức với website.
const onRoadSource = fs
  .readFileSync(path.join(root, "src/lib/onRoadPrice.ts"), "utf8")
  .replace(/["']@\/data\/registrationFees["']/, JSON.stringify(pathToFileURL(path.join(root, "src/data/registrationFees.ts")).href));
fs.writeFileSync(path.join(work, "onRoadPrice.ts"), onRoadSource);
const { calculateOnRoadPrice } = await import(pathToFileURL(path.join(work, "onRoadPrice.ts")).href);

// ---------- Tham số ----------
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};
const optionValues = new Set(["tinh"].map(option).filter(Boolean));
const wanted = args.filter((arg) => !arg.startsWith("--") && !optionValues.has(arg));
const FPS = flag("nhanh") ? 15 : 30;
const province = provinces.find((item) => item.id === (option("tinh") ?? defaultProvinceId));
if (!province) {
  console.error(`Không có tỉnh "${option("tinh")}". Các id: ${provinces.map((item) => item.id).join(", ")}`);
  process.exit(1);
}
const otherProvince = provinces.find((item) => item.id === (province.id === "tp-hcm" ? "ha-noi" : "tp-hcm"));
const provinceShort = (item) => ({ "tp-hcm": "TP.HCM", "ha-noi": "Hà Nội" })[item.id] ?? item.name;

if (wanted.length === 0) {
  console.log(`Cách dùng: npm run price-video -- <xe>   (hoặc tat-ca)\nXe: ${cars.map((car) => car.id).join(", ")}`);
  process.exit(1);
}

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

// ---------- Số liệu từng xe ----------
function buildItem(car) {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  const shortName = car.name.replace(/^Mitsubishi /, "");
  const variants = car.variants.map((variant) => {
    const promo = promotion?.variants.find((item) => item.variantName === variant.name);
    const benefits = (promo?.benefits ?? [])
      .filter((benefit) => Number.isFinite(benefit.value) && benefit.value > 0)
      .map((benefit) => ({ label: shortBenefit(benefit.label), value: benefit.value }));
    const offer = benefits.reduce((sum, benefit) => sum + benefit.value, 0);
    const onRoad = (item) =>
      calculateOnRoadPrice({ carName: car.name, price: variant.price, seats: variant.specifications?.seats, province: item });
    const here = onRoad(province);
    const other = onRoad(otherProvince);
    return {
      name: variant.name,
      // Xe 1 phiên bản (Xpander Cross): tên phiên bản trùng tên xe
      label: variant.name === shortName ? shortName : `${shortName} ${variant.name}`,
      price: variant.price,
      fees: here.totalFees,
      onRoad: here.onRoadPrice,
      otherFees: other.totalFees,
      offer,
      benefits,
      net: here.onRoadPrice - offer,
      image: variantImage(car, variant),
      // Cảnh một xe dùng ảnh chính của xe (car.image, thường chụp chéo đầu xe như video mẫu)
      hero: pathToFileURL(path.join(root, "public", car.image)).href,
    };
  });
  if (!variants.some((variant) => variant.offer > 0)) return null;
  const byPrice = [...variants].sort((a, b) => a.price - b.price);
  const lo = byPrice[0];
  const hi = byPrice[byPrice.length - 1];
  // Cảnh 1–2 dùng bản rẻ nhất có ưu đãi
  const base = byPrice.find((variant) => variant.offer > 0);
  return { car, shortName, variants, lo, hi, base, single: lo === hi };
}

// ---------- Kịch bản: mỗi cảnh có lời đọc + HTML (phần tử có data-at = lúc hiện, tính theo phần lời đọc 0..1) ----------
const pair = (left, right, middle = "") => `<div class="pair"><b>${left}</b><i>${middle}</i><b>${right}</b></div>`;
const pairRed = (left, right, middle, at, redLeft, redRight) =>
  `<div class="pair" data-at="${at}"><b class="${redLeft ? "red" : ""}">${left}</b><i>${middle}</i><b class="${redRight ? "red" : ""}">${right}</b></div>`;
const box = (text, at, kind = "red") =>
  `<div class="box ${kind}" data-at="${at}" data-fx="wipe"><span data-at="${at + 0.05}">${escapeHtml(text)}</span></div>`;
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

function buildScenes(item) {
  const { shortName, lo, hi, base, single } = item;
  const where = provinceShort(province);
  const scenes = [];

  // 0. Mở đầu
  if (!single) {
    const listDiff = hi.price - lo.price;
    const netDiff = hi.net - lo.net;
    const trend = netDiff > listDiff ? "lên tới" : netDiff < listDiff ? "chỉ còn" : "vẫn là";
    scenes.push({
      theme: "dark",
      voice: `${shortName} ${lo.name} và ${hi.name} niêm yết chênh nhau ${trieu(listDiff)}. Nhưng tính lăn bánh và trừ ưu đãi tháng ${currentPromotion.month}, số chênh thực tế ${trend} ${trieu(Math.abs(netDiff))}. Đọc sai báo giá là lệch cả kế hoạch.`,
      html: `${heading("", `Niêm yết ${diffWord(listDiff)}`)}
        <p class="sub serif" data-at="0">${escapeHtml(shortName)}</p>
        ${twoCars(lo, hi, 0.02)}
        ${pairRed(tr(lo.price), tr(hi.price), "niêm yết", 0.12)}
        ${pairRed(tr(lo.net), tr(hi.net), "sau ưu đãi", 0.42)}
        ${box(`Sau ưu đãi ${diffWord(netDiff)}`, 0.62)}
        ${note("Đọc sai báo giá là lệch cả kế hoạch", 0.82)}`,
    });
  } else {
    scenes.push({
      theme: "dark",
      voice: `${shortName} niêm yết ${trieu(lo.price)}. Nhưng đó chưa phải số tiền anh chị thực trả. Lăn bánh tại ${where} là ${trieu(lo.onRoad)}, trừ ưu đãi tháng ${currentPromotion.month} còn ${trieu(lo.net)}. Đọc sai báo giá là lệch cả kế hoạch.`,
      html: `${heading("", `Niêm yết ${trieu(lo.price)}`)}
        <p class="sub serif" data-at="0">Số tiền thực trả là bao nhiêu?</p>
        ${oneCar(lo, 0.02, shortName, "compact")}
        ${row("Lăn bánh", trieu(lo.onRoad), 0.35)}
        ${row("Sau ưu đãi", trieu(lo.net), 0.55)}
        ${box("Niêm yết chưa phải số thực trả", 0.7)}
        ${note("Đọc sai báo giá là lệch cả kế hoạch", 0.85)}`,
    });
  }

  // 1. Quên phí đăng ký
  scenes.push({
    theme: "light",
    voice: `Thứ nhất: quên phí đăng ký. ${base.label} niêm yết ${trieu(base.price)}, cộng thêm ${trieu(base.fees)} gồm trước bạ, biển số, đăng kiểm, đường bộ và bảo hiểm. Lăn bánh tại ${where} là ${trieu(base.onRoad)}.`,
    html: `${heading(1, "Quên phí đăng ký")}
      ${oneCar(base, 0.03)}
      ${row("Niêm yết", trieu(base.price), 0.2)}
      ${row("Phí đăng ký", `+ ${trieu(base.fees)}`, 0.38)}
      ${box(`Lăn bánh ${trieu(base.onRoad)}`, 0.8, "black")}`,
  });

  // 2. Quên trừ ưu đãi
  const overList = base.net - base.price;
  const overText =
    overList > 0
      ? `chỉ hơn niêm yết ${trieu(overList)}`
      : overList < 0
        ? `thấp hơn cả niêm yết ${trieu(-overList)}`
        : "bằng đúng giá niêm yết";
  scenes.push({
    theme: "light",
    voice: `Thứ hai: quên trừ ưu đãi. Tháng ${currentPromotion.month}, ${base.label} được ưu đãi ${trieu(base.offer)}, trừ trực tiếp vào giá xe khi ký hợp đồng. Số thực trả còn ${trieu(base.net)}, ${overText}.`,
    html: `${heading(2, "Quên trừ ưu đãi")}
      ${oneCar(base, 0.02)}
      ${row("Lăn bánh", trieu(base.onRoad), 0.12)}
      ${row("Ưu đãi", `– ${trieu(base.offer)}`, 0.3)}
      ${box(`Còn ${trieu(base.net)}`, 0.62)}
      ${note(overText.charAt(0).toUpperCase() + overText.slice(1), 0.8)}`,
  });

  // 3. Bản cao ưu đãi cao?
  if (!single) {
    const offerDiff = lo.offer - hi.offer;
    const verdict =
      offerDiff > 0
        ? `Bản thấp ưu đãi hơn ${trieu(offerDiff)}`
        : offerDiff < 0
          ? `Bản cao ưu đãi hơn ${trieu(-offerDiff)}`
          : "Hai bản ưu đãi bằng nhau";
    scenes.push({
      theme: "light",
      voice: `Thứ ba: nghĩ bản cao thì ưu đãi cao. Tháng này ${lo.name} ưu đãi ${trieu(lo.offer)}, ${hi.name} ưu đãi ${trieu(hi.offer)}. ${verdict}. Mua bản nào, hỏi đúng ưu đãi bản đó.`,
      html: `${heading(3, "Bản cao ưu đãi cao?")}
        <p class="sub serif" data-at="0.02">${escapeHtml(shortName)}</p>
        ${oneCar(hi, 0.02, "")}
        <div class="table">
          <div class="pair head" data-at="0.08"><b>${escapeHtml(lo.name)}</b><i></i><b>${escapeHtml(hi.name)}</b></div>
          ${pairRed(tr(lo.price), tr(hi.price), "niêm yết", 0.14)}
          ${pairRed(tr(lo.offer), tr(hi.offer), "ưu đãi", 0.3, offerDiff > 0, offerDiff < 0)}
        </div>
        ${box(verdict, 0.6)}
        ${note("Mua bản nào, hỏi ưu đãi bản đó", 0.82)}`,
    });
  } else {
    const parts = base.benefits;
    scenes.push({
      theme: "light",
      voice: `Thứ ba: không hỏi rõ ưu đãi gồm những gì. Tháng này ${shortName} có ${parts.length} khoản: ${parts.map((part) => `${part.label.toLowerCase()} ${trieu(part.value)}`).join(", ")}. Tổng khoảng ${trieu(base.offer)}.`,
      html: `${heading(3, "Ưu đãi gồm những gì?")}
        ${oneCar(base, 0.02, shortName)}
        ${parts.map((part, index) => row(part.label, trieu(part.value), 0.15 + (index * 0.45) / parts.length, "small")).join("")}
        ${box(`Tổng ~ ${trieu(base.offer)}`, 0.7)}
        ${note("Hỏi rõ từng khoản khi nhận báo giá", 0.85)}`,
    });
  }

  // 4. Phí đăng ký
  if (!single) {
    const feeDiff = hi.fees - lo.fees;
    scenes.push({
      theme: "dark",
      voice: `Thứ tư: phí đăng ký không bản nào giống bản nào. Trước bạ tính theo giá xe, nên ${hi.name} tốn phí hơn ${lo.name} ${trieu(feeDiff)}. Phí còn khác theo nơi đăng ký.`,
      html: `${heading(4, "Phí đăng ký")}
        <p class="sub serif" data-at="0">không bản nào giống bản nào</p>
        ${twoCars(lo, hi, 0.02)}
        ${pairRed(tr(lo.price), tr(hi.price), "niêm yết", 0.12)}
        ${pairRed(tr(lo.fees), tr(hi.fees), "phí đăng ký", 0.3, false, true)}
        ${box(`Phí cao hơn ${trieu(feeDiff)}`, 0.55)}
        ${note("Khác theo giá xe và nơi đăng ký", 0.78)}`,
    });
  } else {
    const feeDiff = base.otherFees - base.fees;
    const [first, second] = feeDiff >= 0 ? [province, otherProvince] : [otherProvince, province];
    const [firstFees, secondFees] = feeDiff >= 0 ? [base.fees, base.otherFees] : [base.otherFees, base.fees];
    const higher = provinceShort(second);
    scenes.push({
      theme: "dark",
      voice: `Thứ tư: phí đăng ký không nơi nào giống nơi nào. Cùng một chiếc ${shortName}, đăng ký ở ${higher} tốn hơn ${provinceShort(first)} ${trieu(Math.abs(feeDiff))}, vì lệ phí trước bạ mỗi nơi một mức.`,
      html: `${heading(4, "Phí đăng ký")}
        <p class="sub serif" data-at="0">không nơi nào giống nơi nào</p>
        ${oneCar(base, 0.02, "")}
        <div class="table">
          <div class="pair head" data-at="0.1"><b>${escapeHtml(provinceShort(first))}</b><i></i><b>${escapeHtml(higher)}</b></div>
          ${pairRed(tr(firstFees), tr(secondFees), "phí đăng ký", 0.2, false, true)}
          ${pairRed(`${first.taxRate * 100}%`, `${second.taxRate * 100}%`, "trước bạ", 0.36)}
        </div>
        ${box(`${higher} cao hơn ${trieu(Math.abs(feeDiff))}`, 0.58)}
        ${note("Báo giá phải ghi rõ nơi đăng ký", 0.8)}`,
    });
  }

  // 5. Cách đọc đúng
  const step = (icon, text, at) => `<li data-at="${at}"><span class="icon">${icon}</span>${escapeHtml(text)}</li>`;
  scenes.push({
    theme: "light",
    voice: "Cách đọc đúng: lấy giá niêm yết, cộng phí đăng ký ra giá lăn bánh, rồi trừ ưu đãi. Đó mới là số tiền thực tế anh chị bỏ ra.",
    html: `<h2 class="serif-title" data-at="0">Cách đọc đúng</h2>
      <ul class="steps">
        ${step("▭", "Giá niêm yết", 0.1)}
        ${step("+", "Phí đăng ký", 0.25)}
        ${step("✓", "Giá lăn bánh", 0.4)}
        ${step("–", "Ưu đãi", 0.55)}
      </ul>
      ${box("= Số tiền thực tế", 0.72)}`,
  });

  // 6. Kêu gọi
  scenes.push({
    theme: "light",
    voice: `Lưu video lại và bình luận phiên bản anh chị quan tâm, Phúc gửi bảng lăn bánh chi tiết đúng tỉnh của mình.`,
    tail: 1.2,
    html: `<h2 class="serif-title" data-at="0">Lưu video và</h2>
      ${box("Bình luận phiên bản", 0.15)}
      <p class="lead" data-at="0.35">Phúc gửi bảng lăn bánh chi tiết</p>
      ${oneCar(hi, 0.05, "")}
      <div class="contact" data-at="0.55"><b>Lưu Hoàng Phúc · Mitsubishi</b><span>Zalo ${escapeHtml(phone)}</span></div>
      <p class="fine" data-at="0.6">Giá lăn bánh tạm tính tại ${escapeHtml(where)}. Ưu đãi tháng ${month}, trừ trực tiếp vào giá xe khi ký hợp đồng.<br>Hình ảnh minh họa.</p>`,
  });
  return scenes;
}

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
function renderHtml(scenes, timings, total) {
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
</style></head>
<body>
${scenes
  .map(
    (scene, index) => `<section class="scene ${scene.theme}" data-start="${timings[index].start}" data-dur="${timings[index].duration}" data-speak="${timings[index].speak}">
  <div class="content">${scene.html}</div>
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
        if (item.fx === "wipe") {
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

async function makeVideo(item, browser) {
  const scenes = buildScenes(item);
  const outDir = path.resolve(root, "..", "anh-facebook", "video-gia", `${item.car.id}-${monthNumber}-${currentPromotion.year}`);
  const voiceDir = path.join(outDir, "giong-doc");
  fs.mkdirSync(voiceDir, { recursive: true });

  // Thời lượng: theo file giọng đọc nếu có, không thì ước theo lời đọc
  let start = 0;
  const timings = scenes.map((scene, index) => {
    const file = voiceFile(voiceDir, index);
    const voiceLength = file ? audioDuration(file) : null;
    const speak = voiceLength ?? estimate(scene.voice);
    const duration = LEAD + speak + GAP + (scene.tail ?? 0);
    const timing = { start: +start.toFixed(3), duration: +duration.toFixed(3), speak: +speak.toFixed(3), file: voiceLength ? file : null };
    start += duration;
    return timing;
  });
  const total = +start.toFixed(3);
  const voices = timings.filter((timing) => timing.file);

  const htmlFile = path.join(work, `${item.car.id}.html`);
  fs.writeFileSync(htmlFile, renderHtml(scenes, timings, total));
  await browser.send("Page.navigate", { url: pathToFileURL(htmlFile).href });
  for (let i = 0; i < 80; i++) {
    await sleep(250);
    if ((await browser.evaluate("document.readyState").catch(() => "")) === "complete") break;
  }
  const broken = await browser.evaluate("window.ready()");
  if (broken?.length) console.warn(`  Ảnh không tải được: ${broken.join(", ")}`);
  const fonts = await browser.evaluate(`document.fonts.check('italic 800 40px "Playfair Display"')`);
  if (!fonts) console.warn("  Không nạp được phông Playfair Display (src/assets/fonts), dùng phông Georgia thay thế.");

  // Chụp từng hình rồi đẩy thẳng vào ffmpeg
  const silent = path.join(work, `${item.car.id}-silent.mp4`);
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
    `LỜI ĐỌC VIDEO ${item.shortName.toUpperCase()} – THÁNG ${month} (lăn bánh tại ${provinceShort(province)})\n` +
      `Tạo giọng AI cho TỪNG cảnh, lưu vào thư mục giong-doc (1.mp3, 2.mp3...) rồi chạy lại: npm run price-video -- ${item.car.id}\n` +
      `Giọng AI đọc số dạng "85,65 triệu" thường đúng; nếu đọc sai thì sửa chữ trong ô giọng đọc (vd "tám mươi lăm phẩy sáu lăm triệu"), không cần sửa file này.\n\n${script}\n`
  );

  const hashtag = item.shortName.replace(/\s+/g, "");
  fs.writeFileSync(
    path.join(outDir, "caption.txt"),
    `Đọc báo giá ${item.shortName} sao cho đúng? 4 lỗi hay gặp 👇
Bình luận phiên bản anh chị quan tâm, Phúc gửi bảng lăn bánh chi tiết đúng tỉnh.

📞 Zalo ${phone} – Lưu Hoàng Phúc, Mitsubishi Moveo New City
👉 Bảng giá + ưu đãi tháng ${month}: ${siteUrl}/bang-gia-xe-mitsubishi
Giá lăn bánh tạm tính tại ${provinceShort(province)}. Ưu đãi trừ trực tiếp vào giá xe khi ký hợp đồng.
#Mitsubishi #${hashtag} #GiaXe${hashtag} #LanBanh #MuaXeTraGop
`
  );
  console.log(`  ${voices.length ? `Có giọng đọc ${voices.length}/${scenes.length} cảnh` : "Chưa có giọng đọc (video chưa có tiếng)"}, dài ${total.toFixed(1)} giây`);
  console.log(`  → ${outFile}`);
}

const targets = wanted.includes("tat-ca") ? cars : wanted.map((id) => cars.find((car) => car.id === id || car.slug === id));
if (targets.some((car) => !car)) {
  console.error(`Không có xe "${wanted.join(" ")}". Xe: ${cars.map((car) => car.id).join(", ")}`);
  process.exit(1);
}
const items = targets.map((car) => {
  const item = buildItem(car);
  if (!item) console.warn(`Bỏ qua ${car.name}: tháng ${month} chưa có ưu đãi trong promotions.ts.`);
  return item;
}).filter(Boolean);

const browser = await openBrowser();
await browser.send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
try {
  for (const item of items) {
    console.log(`${item.car.name}:`);
    await makeVideo(item, browser);
  }
} finally {
  browser.close();
}
process.exit(0);
