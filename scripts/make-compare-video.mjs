// Video dọc 9:16 so sánh ĐẦY ĐỦ thông số kỹ thuật và trang bị giữa 2 phiên bản cùng dòng xe (10/11/2026).
// Cùng khung với video giá (npm run price-video), các cảnh:
//   Mở đầu nền tối: "<A> hay <B>?", giá niêm yết + sau ưu đãi của 2 bản
//   1–3  Thông số theo 3 nhóm của bảng MMV (src/lib/specGroups.ts), mỗi trang tối đa 6 dòng; dòng khác nhau tô đỏ, giống nhau gộp 1 ô
//   4    Trang bị chỉ có trên bản cao (equipment + safetyTechnologies trong cars.ts)
//   5    Trang bị chỉ có trên bản thấp (nếu có)
//   Tóm lại nền tối: thêm X triệu (sau ưu đãi) được thêm N trang bị → Lưu video, bình luận phiên bản
// CHỈ so các phiên bản Mitsubishi với nhau: Luật Quảng cáo cấm so sánh trực tiếp với sản phẩm cùng loại của hãng khác.
//
// Chạy:   npm run compare-video -- destinator               (bản rẻ nhất với bản đắt nhất)
//         npm run compare-video -- triton --ban "2WD AT GLX,4WD AT Athlete"   (chọn 2 bản, tên đúng như trên web)
//         npm run compare-video -- tat-ca                   (mọi xe có từ 2 phiên bản)
//         --tinh <id> đổi nơi tính lăn bánh, --nhanh xem thử 15 hình/giây
// Kết quả: ../anh-facebook/video-so-sanh/<xe>-<A>-<B>/  video.mp4, loi-doc.txt, caption.txt
// Giọng đọc AI: như price-video (giong-doc/1.mp3, 2.mp3... theo số cảnh trong loi-doc.txt, rồi chạy lại).
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  root, cars, currentPromotion, calculateOnRoadPrice, wanted, option, province, provinceShort,
  tr, trieu, escapeHtml, month, siteUrl, phone, slugWords, variantImage,
  pairRed, box, note, heading, twoCars, diffWord, openBrowser, makeVideo,
} from "./lib/video-kit.mjs";

const { specGroups } = await import(pathToFileURL(path.join(root, "src/lib/specGroups.ts")).href);

if (wanted.length === 0) {
  console.log(`Cách dùng: npm run compare-video -- <xe> [--ban "A,B"]   (hoặc tat-ca)\nXe: ${cars.map((car) => car.id).join(", ")}`);
  process.exit(1);
}

// Nhóm trang bị như khối "Trang thiết bị" trên trang xe (VariantCompare.tsx)
const equipmentGroups = [
  ["exterior", "Ngoại thất"],
  ["interior", "Nội thất"],
  ["convenience", "Tiện nghi"],
  ["safety", "An toàn"],
  ["drivingSupport", "Hỗ trợ lái"],
];
function equipmentOf(variant) {
  const items = new Map();
  for (const [key, label] of equipmentGroups) for (const item of variant.equipment?.[key] ?? []) items.set(item, label);
  for (const tech of variant.safetyTechnologies ?? []) if (!items.has(tech.name)) items.set(tech.name, "An toàn");
  return items;
}

function buildVariant(car, variant) {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  const promo = promotion?.variants.find((item) => item.variantName === variant.name);
  const offer = (promo?.benefits ?? []).reduce((sum, benefit) => sum + (Number.isFinite(benefit.value) ? benefit.value : 0), 0);
  const onRoad = calculateOnRoadPrice({ carName: car.name, price: variant.price, seats: variant.specifications?.seats, province }).onRoadPrice;
  return {
    name: variant.name,
    price: variant.price,
    offer,
    net: onRoad - offer,
    specs: variant.specifications ?? {},
    equipment: equipmentOf(variant),
    image: variantImage(car, variant),
  };
}

function pickVariants(car) {
  const picked = option("ban");
  if (picked) {
    const names = picked.split(",").map((name) => name.trim().toLowerCase());
    const found = names.map((name) => car.variants.find((variant) => variant.name.toLowerCase() === name));
    if (names.length !== 2 || found.some((variant) => !variant)) {
      console.error(`--ban cần đúng 2 tên phiên bản của ${car.name}: ${car.variants.map((variant) => `"${variant.name}"`).join(", ")}`);
      process.exit(1);
    }
    return found.sort((a, b) => a.price - b.price);
  }
  const byPrice = [...car.variants].sort((a, b) => a.price - b.price);
  return [byPrice[0], byPrice[byPrice.length - 1]];
}

// Chia đều: 9 dòng → 5 + 4 thay vì 6 + 3
function paginate(list, max) {
  const pages = Math.ceil(list.length / max);
  const size = Math.ceil(list.length / pages);
  return Array.from({ length: pages }, (_, index) => list.slice(index * size, (index + 1) * size));
}

// Giá trị để giọng AI đọc cho tự nhiên: "163 PS / 5.000 rpm" → "163 PS", "225/55R18 - Mâm hợp kim 18 inch" → "Mâm hợp kim 18 inch"
const spoken = (value) => {
  const text = String(value);
  if (text.includes(" - ") && /mâm/i.test(text)) return text.split(" - ").pop();
  return text.split(" / ")[0];
};
const readable = ["groundClearance", "seats", "power", "torque", "engine", "transmission", "drivetrain", "fuelConsumptionCombined", "wheels", "fuelTank", "wheelbase", "frontBrakes", "rearBrakes"];
// Hai trang bị cùng loại (bản cao thay món của bản thấp bằng món tốt hơn):
//   trùng 3 chữ đầu ("Kiểm soát hành trình (Cruise Control)" / "Kiểm soát hành trình thích ứng"),
//   trùng 2 chữ đầu nếu chữ đầu không phải từ chung chung ("Ghế lái chỉnh điện 6 hướng" / "Ghế lái và ghế hành khách..."),
//   hoặc cùng là camera / mâm ("Camera lùi" / "Camera toàn cảnh 360 độ"). "Cảnh báo điểm mù" và "Cảnh báo lệch làn" KHÔNG phải một cặp.
const genericFirst = new Set(["cảnh", "hỗ", "kiểm", "hệ", "đèn", "cửa", "chế", "kết", "cảm"]);
function sameKind(first, second) {
  // Bỏ số đầu dòng để "3 túi khí" và "7 túi khí" thành một cặp
  const words = (text) => text.toLowerCase().split(/\s+/).filter((word, index) => index > 0 || !/^\d+$/.test(word));
  const x = words(first);
  const y = words(second);
  let common = 0;
  while (common < x.length && common < y.length && x[common] === y[common]) common += 1;
  if (common >= 3) return true;
  if (common >= 2 && !genericFirst.has(x[0])) return true;
  return common >= 1 && ["camera", "mâm"].includes(x[0]);
}
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);

function buildScenes(car, a, b) {
  const shortName = car.name.replace(/^Mitsubishi /, "");
  const listDiff = b.price - a.price;
  const netDiff = b.net - a.net;
  const scenes = [];

  scenes.push({
    theme: "dark",
    voice: `${shortName} ${a.name} hay ${b.name}? Niêm yết chênh ${trieu(listDiff)}, sau ưu đãi tháng ${currentPromotion.month} ${diffWord(netDiff)}. Cùng so đầy đủ thông số kỹ thuật và trang bị, xem số tiền đó mua được gì.`,
    html: `${heading("", `${a.name} hay ${b.name}?`)}
      <p class="sub serif" data-at="0">${escapeHtml(shortName)}</p>
      ${twoCars(a, b, 0.03)}
      ${pairRed(tr(a.price), tr(b.price), "niêm yết", 0.15)}
      ${pairRed(tr(a.net), tr(b.net), "sau ưu đãi", 0.38)}
      ${box(`Chênh ${trieu(netDiff)}: khác nhau gì?`, 0.6)}
      ${note("So đầy đủ thông số và trang bị", 0.8)}`,
  });

  // Thông số kỹ thuật
  specGroups.forEach((group, groupIndex) => {
    const rows = group.rows
      .map((specRow) => {
        const format = (value) => (value === undefined || value === "" ? "–" : specRow.format ? specRow.format(value) : String(value));
        const va = a.specs[specRow.key];
        const vb = b.specs[specRow.key];
        if ((va === undefined || va === "") && (vb === undefined || vb === "")) return null;
        return { key: specRow.key, label: specRow.label, va: format(va), vb: format(vb), same: format(va) === format(vb) };
      })
      .filter(Boolean);
    if (rows.length === 0) return;
    const pages = paginate(rows, 6);
    pages.forEach((page, pageIndex) => {
      const part = pages.length > 1;
      const diffs = page.filter((item) => !item.same);
      const spokenTitle = group.title.replace(/ & /g, " và ");
      let voice;
      if (diffs.length === 0) {
        const highlights = page.filter((item) => readable.includes(item.key)).slice(0, 3);
        voice = `${spokenTitle}${pageIndex ? ", tiếp theo" : ""}: hai bản giống nhau.` +
          (highlights.length ? ` ${highlights.map((item) => `${lowerFirst(item.label)} ${spoken(item.va)}`).join(", ")}.` : "");
      } else {
        const told = diffs.slice(0, 3).map((item) => `${lowerFirst(item.label)}: ${a.name} ${spoken(item.va)}, ${b.name} ${spoken(item.vb)}`);
        const more = diffs.length > 3 ? `, và ${diffs.length - 3} mục khác` : "";
        voice = `${spokenTitle}${pageIndex ? ", tiếp theo" : ""}: khác nhau ở ${told.join("; ")}${more}.` +
          (diffs.length < page.length ? " Còn lại giống nhau." : "");
      }
      const step = 0.7 / page.length;
      scenes.push({
        theme: "light",
        minSpeak: 2.2 + page.length * 0.75,
        voice,
        html: `<div class="small-title">${heading(groupIndex + 1, group.title)}</div>
          ${part ? `<p class="sub serif" data-at="0">Trang ${pageIndex + 1}/${pages.length}</p>` : ""}
          <div class="spec-head" data-at="0.03"><b>${escapeHtml(a.name)}</b><b>${escapeHtml(b.name)}</b></div>
          ${page
            .map(
              (item, index) => `<div class="spec ${item.same ? "same" : "diff"}" data-at="${(0.08 + index * step).toFixed(3)}">
            <i>${escapeHtml(item.label)}</i>
            <div class="vals">${item.same ? `<b>${escapeHtml(item.va)}</b>` : `<b>${escapeHtml(item.va)}</b><b>${escapeHtml(item.vb)}</b>`}</div>
          </div>`
            )
            .join("")}
          ${diffs.length === 0 ? note("Hai bản giống nhau", 0.85) : ""}`,
      });
    });
  });

  // Trang bị chỉ có trên 1 bản
  let onlyB = [...b.equipment].filter(([item]) => !a.equipment.has(item));
  let onlyA = [...a.equipment].filter(([item]) => !b.equipment.has(item));
  // Cặp nâng cấp: món của bản thấp được thay bằng món tốt hơn ở bản cao ("Camera lùi" → "Camera toàn cảnh 360 độ"),
  // không tính là "bản cao không có"
  const upgrades = [];
  for (const entry of [...onlyA]) {
    const match = onlyB.find((other) => sameKind(entry[0], other[0]));
    if (!match) continue;
    // Bản cao chỉ ghi gọn hơn ("Cổng sạc USB-A và USB-C" so với "... cho cả hai hàng ghế"): coi như giống nhau, không phải nâng cấp
    if (!entry[0].toLowerCase().startsWith(match[0].toLowerCase())) upgrades.push({ from: entry[0], to: match[0], group: match[1] });
    onlyA = onlyA.filter((item) => item !== entry);
    onlyB = onlyB.filter((item) => item !== match);
  }
  const same = [...a.equipment.keys()].filter((item) => b.equipment.has(item)).length;
  let number = specGroups.length + 1;
  const equipmentScenes = (list, owner, other, intro) => {
    const pages = paginate(list, 7);
    pages.forEach((page, pageIndex) => {
      const part = pages.length > 1 ? ` (${pageIndex + 1}/${pages.length})` : "";
      const step = 0.75 / page.length;
      scenes.push({
        theme: "light",
        minSpeak: 2 + page.length * 0.7,
        voice: `${pageIndex === 0 ? intro : "Tiếp theo"}: ${page.map(([item]) => lowerFirst(item)).join(", ")}.`,
        html: `${heading(number, `Chỉ có trên ${owner.name}${part}`)}
          <p class="sub serif" data-at="0">${escapeHtml(other.name)} không có</p>
          <ul class="equip">${page
            .map(
              ([item, group], index) =>
                `<li data-at="${(0.06 + index * step).toFixed(3)}"><span class="icon">✓</span><span>${escapeHtml(item)}<small>${escapeHtml(group)}</small></span></li>`
            )
            .join("")}</ul>`,
      });
    });
    number += 1;
  };
  if (upgrades.length) {
    const pages = paginate(upgrades, 5);
    pages.forEach((page, pageIndex) => {
      const step = 0.7 / page.length;
      scenes.push({
        theme: "light",
        minSpeak: 2 + page.length * 0.9,
        voice: `${pageIndex === 0 ? `Có ${upgrades.length} trang bị ${b.name} nâng cấp so với ${a.name}` : "Tiếp theo"}: ${page.map((item) => `${lowerFirst(item.from)} lên ${lowerFirst(item.to)}`).join("; ")}.`,
        html: `<div class="small-title">${heading(number, `Nâng cấp trên ${b.name}`)}</div>
          ${pages.length > 1 ? `<p class="sub serif" data-at="0">Trang ${pageIndex + 1}/${pages.length}</p>` : ""}
          <div class="spec-head" data-at="0.03"><b>${escapeHtml(a.name)}</b><b>${escapeHtml(b.name)}</b></div>
          ${page
            .map(
              (item, index) => `<div class="spec diff upgrade" data-at="${(0.08 + index * step).toFixed(3)}">
            <i>${escapeHtml(item.group)}</i>
            <div class="vals"><b>${escapeHtml(item.from)}</b><b>${escapeHtml(item.to)}</b></div>
          </div>`
            )
            .join("")}`,
      });
    });
    number += 1;
  }
  if (onlyB.length) equipmentScenes(onlyB, b, a, `Trang bị chỉ có trên ${b.name}, có ${onlyB.length} món`);
  if (onlyA.length) equipmentScenes(onlyA, a, b, `Ngược lại, ${a.name} có ${onlyA.length} trang bị mà ${b.name} không có`);
  if (!onlyA.length && !onlyB.length && !upgrades.length) {
    scenes.push({
      theme: "light",
      voice: `Trang bị hai bản giống nhau hoàn toàn, ${same} món.`,
      html: `${heading(number, "Trang bị")}${box("Hai bản giống nhau", 0.2)}`,
    });
  }

  // Tóm lại
  const verdict =
    netDiff > 0
      ? onlyB.length + upgrades.length
        ? `Thêm ${trieu(netDiff)}: ${[onlyB.length && `${onlyB.length} món mới`, upgrades.length && `${upgrades.length} nâng cấp`].filter(Boolean).join(", ")}`
        : `${b.name} đắt hơn ${trieu(netDiff)}`
      : `${b.name} không đắt hơn sau ưu đãi`;
  scenes.push({
    theme: "dark",
    voice: `Tóm lại: sau ưu đãi, ${b.name} ${netDiff > 0 ? `đắt hơn ${trieu(netDiff)}` : `không đắt hơn ${a.name}`}${onlyB.length ? `, đổi lại có thêm ${onlyB.length} trang bị` : ""}${upgrades.length ? `${onlyB.length ? " và" : ", đổi lại có"} ${upgrades.length} món được nâng cấp` : ""}${onlyA.length ? `, nhưng không có ${onlyA.length} món riêng của ${a.name}` : ""}. Hai bản giống nhau ${same} trang bị.`,
    html: `${heading("", "Tóm lại")}
      <p class="sub serif" data-at="0">${escapeHtml(shortName)}</p>
      ${twoCars(a, b, 0.03)}
      ${pairRed(tr(a.net), tr(b.net), "sau ưu đãi", 0.12)}
      ${pairRed(String(a.equipment.size), String(b.equipment.size), "trang bị", 0.3, false, b.equipment.size > a.equipment.size)}
      ${box(verdict, 0.55)}
      ${note(`Lăn bánh tạm tính tại ${provinceShort(province)}, đã trừ ưu đãi tháng ${month}`, 0.78)}`,
  });

  const hero = { ...b, hero: pathToFileURL(path.join(root, "public", car.image)).href };
  scenes.push({
    theme: "light",
    tail: 1.2,
    voice: `Anh chị chọn ${a.name} hay ${b.name}? Lưu video lại và bình luận phiên bản, Phúc gửi bảng thông số và lăn bánh chi tiết.`,
    html: `<h2 class="serif-title" data-at="0">Lưu video và</h2>
      ${box("Bình luận phiên bản", 0.15)}
      <p class="lead" data-at="0.35">Phúc gửi bảng thông số + lăn bánh chi tiết</p>
      <div class="cars one" data-at="0.05" data-fx="car"><figure><img src="${hero.hero}"></figure></div>
      <div class="contact" data-at="0.55"><b>Lưu Hoàng Phúc · Mitsubishi</b><span>Zalo ${escapeHtml(phone)}</span></div>
      <p class="fine" data-at="0.6">Thông số theo Mitsubishi Motors Việt Nam. Giá lăn bánh tạm tính tại ${escapeHtml(provinceShort(province))}.<br>Ưu đãi tháng ${month}, trừ trực tiếp vào giá xe khi ký hợp đồng. Hình ảnh minh họa.</p>`,
  });
  return { scenes, onlyA, onlyB, upgrades, same };
}

const css = `
  .small-title h2 { font-size: 50px; gap: 20px; }
  .small-title h2 em { font-size: 96px; }
  .equip { list-style: none; width: 940px; margin-top: 30px; }
  .equip li { display: flex; align-items: flex-start; gap: 24px; padding: 18px 0; border-bottom: 2px solid #d3d3d0; font-size: 42px; font-weight: 900; line-height: 1.2; }
  .equip .icon { width: 56px; height: 56px; flex: none; display: grid; place-items: center; background: #e11d2a; color: #fff; font-size: 36px; margin-top: 2px; }
  .equip small { display: block; font-family: "Playfair Display", Georgia, serif; font-style: italic; font-weight: 600; font-size: 28px; color: #6b7280; margin-top: 4px; }
`;

const targets = wanted.includes("tat-ca") ? cars.filter((car) => car.variants.length > 1) : wanted.map((id) => cars.find((car) => car.id === id || car.slug === id));
if (targets.some((car) => !car)) {
  console.error(`Không có xe "${wanted.join(" ")}". Xe: ${cars.map((car) => car.id).join(", ")}`);
  process.exit(1);
}
const single = targets.find((car) => car.variants.length < 2);
if (single) {
  console.error(`${single.name} chỉ có 1 phiên bản, không có gì để so.`);
  process.exit(1);
}

const browser = await openBrowser();
await browser.send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
try {
  for (const car of targets) {
    const [variantA, variantB] = pickVariants(car);
    const a = buildVariant(car, variantA);
    const b = buildVariant(car, variantB);
    const shortName = car.name.replace(/^Mitsubishi /, "");
    const { scenes, onlyA, onlyB, upgrades, same } = buildScenes(car, a, b);
    const folder = [car.id, slugWords(a.name).join("-"), slugWords(b.name).join("-")].join("-");
    const hashtag = shortName.replace(/\s+/g, "");
    console.log(`${car.name}: ${a.name} và ${b.name} (${scenes.length} cảnh)`);
    await makeVideo({
      key: folder,
      outDir: path.resolve(root, "..", "anh-facebook", "video-so-sanh", folder),
      scenes,
      css,
      title: `LỜI ĐỌC VIDEO SO SÁNH ${shortName.toUpperCase()} ${a.name.toUpperCase()} – ${b.name.toUpperCase()} (giá tháng ${month}, lăn bánh tại ${provinceShort(province)})`,
      rerun: `npm run compare-video -- ${car.id}${option("ban") ? ` --ban "${option("ban")}"` : ""}`,
      caption: `${shortName} ${a.name} hay ${b.name}? So đầy đủ thông số và trang bị 👇
${onlyB.length ? `${b.name} có thêm ${onlyB.length} trang bị` : "Trang bị"}${upgrades.length ? `, ${upgrades.length} món nâng cấp` : ""}${onlyA.length ? `, ${a.name} có ${onlyA.length} món riêng` : ""}, ${same} trang bị giống nhau.
Bình luận phiên bản anh chị chọn, Phúc gửi bảng thông số + lăn bánh chi tiết.

📞 Zalo ${phone} – Lưu Hoàng Phúc, Mitsubishi Moveo New City
👉 Thông số, trang bị từng phiên bản: ${siteUrl}/xe/${car.slug}#trang-bi
Giá lăn bánh tạm tính tại ${provinceShort(province)}. Ưu đãi tháng ${month} trừ trực tiếp vào giá xe khi ký hợp đồng.
#Mitsubishi #${hashtag} #${hashtag}${slugWords(a.name).join("")} #${hashtag}${slugWords(b.name).join("")} #SoSanhXe
`,
    }, browser);
  }
} finally {
  browser.close();
}
process.exit(0);
