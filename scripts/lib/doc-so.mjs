// Đổi số và đơn vị sang chữ tiếng Việt cho giọng AI (11/11/2026): FPT đọc số dạng "85,65 triệu", "4.595 mm" hay ngọng, sai.
// Quy ước: dấu chấm ngăn hàng nghìn, dấu phẩy là phần thập phân (riêng dung tích "1.5L" là 1,5 lít).
const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

// 0..999; full = đọc đủ "không trăm", "lẻ" khi nhóm đứng sau nhóm khác (1.050 → một nghìn không trăm năm mươi)
function readHundreds(n, full) {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;
  const words = [];
  if (h > 0 || full) words.push(digits[h], "trăm");
  if (t === 0) {
    if (u > 0 && (h > 0 || full)) words.push("lẻ");
  } else if (t === 1) {
    words.push("mười");
  } else {
    words.push(digits[t], "mươi");
  }
  if (u > 0) {
    if (u === 1 && t > 1) words.push("mốt");
    else if (u === 5 && t > 0) words.push("lăm");
    else if (u === 4 && t > 1) words.push("tư");
    else words.push(digits[u]);
  }
  return words.join(" ");
}

export function readInteger(n) {
  if (n === 0) return "không";
  const units = ["", "nghìn", "triệu", "tỷ"];
  const groups = [];
  for (let value = n; value > 0; value = Math.floor(value / 1000)) groups.push(value % 1000);
  const words = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    words.push(readHundreds(groups[i], i < groups.length - 1));
    // Số lớn hơn tỷ (hiếm): đọc lặp "tỷ"
    if (i > 0) words.push(units[i % 4 || 3] + (i >= 4 ? " tỷ" : ""));
  }
  return words.join(" ").replace(/\s+/g, " ").trim();
}

// "85,65" → "tám mươi lăm phẩy sáu mươi lăm"; "1,05" → "một phẩy không năm"
function readDecimal(whole, fraction) {
  const intPart = readInteger(Number(whole.replace(/\./g, "")));
  if (!fraction) return intPart;
  const frac = /^0/.test(fraction) || fraction.length > 2 ? [...fraction].map((d) => digits[d]).join(" ") : readInteger(Number(fraction));
  return `${intPart} phẩy ${frac}`;
}

const NUMBER = String.raw`(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?`;
const unitWords = [
  [String.raw`L\s*/\s*100\s*km`, "lít một trăm ki lô mét"],
  [String.raw`km\s*/\s*h`, "ki lô mét giờ"],
  ["đ", "đồng"],
  ["%", "phần trăm"],
  ["mm", "mi li mét"],
  ["cm", "xăng ti mét"],
  ["km", "ki lô mét"],
  ["kg", "ki lô gam"],
  ["inch", "inch"],
  ["PS", "mã lực"],
  ["Nm", "niu tơn mét"],
  ["L", "lít"],
  ["m", "mét"],
];

export function readNumbers(text) {
  let out = text;
  // Dung tích động cơ "1.5L", "2.4L" (dấu chấm là thập phân)
  out = out.replace(/\b(\d)\.(\d)\s?L\b/g, (m, a, b) => `${digits[a]} phẩy ${digits[b]} lít`);
  // Dẫn động: 4WD = hai cầu, 2WD = một cầu
  out = out.replace(/\b4WD\b/g, "hai cầu").replace(/\b2WD\b/g, "một cầu");
  out = out.replace(/\b3M\b/g, "ba em");
  // Kích thước "4.595 × 1.795 × 1.750" → nhân
  out = out.replace(/\s?[×x]\s?(?=\d)/g, " nhân ");
  // Khoảng "7–10 ngày", "6-11 chỗ" → "7 đến 10"
  out = out.replace(/(\d)\s?[–-]\s?(\d)/g, "$1 đến $2");
  // Tiền: "85,65 triệu" → "tám mươi lăm triệu sáu trăm năm mươi nghìn", "1.050 tr" → "một tỷ không trăm năm mươi triệu"
  out = out.replace(new RegExp(String.raw`(^|[^\p{L}\d])${NUMBER}\s?(triệu|tr|tỷ)(?![\p{L}\d])`, "gu"), (m, before, whole, fraction, unit) => {
    const amount = Math.round(Number(`${whole.replace(/\./g, "")}.${fraction ?? 0}`) * (unit === "tỷ" ? 1e9 : 1e6));
    return `${before}${readInteger(amount)}`;
  });
  // Số + đơn vị
  for (const [unit, word] of unitWords) {
    const pattern = new RegExp(String.raw`(^|[^\p{L}\d])${NUMBER}\s?${unit}(?![\p{L}\d])`, "gu");
    out = out.replace(pattern, (m, before, whole, fraction) => `${before}${readDecimal(whole, fraction)} ${word}`);
  }
  // Số còn lại (kể cả "1." đầu ý)
  out = out.replace(new RegExp(String.raw`(^|[^\p{L}\d])${NUMBER}(?![\p{L}\d])`, "gu"), (m, before, whole, fraction) => `${before}${readDecimal(whole, fraction)}`);
  return out;
}
