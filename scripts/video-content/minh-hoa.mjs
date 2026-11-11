// Hình minh họa tự vẽ (SVG) cho series "Kiến thức ô tô" (11/11/2026). Không dùng ảnh của bên khác.
// Mỗi hàm trả về 1 thẻ <svg> 600×420, nét vẽ dùng currentColor (tự đổi trắng/đen theo nền cảnh) và 4 màu báo hiệu.
// Dùng trong scripts/video-content/kien-thuc-chung.mjs qua trường `art` của từng ý (tên hàm bên dưới).
const R = "#e11d2a", Y = "#f5a524", G = "#22c55e", B = "#3b82f6", GR = "#9ca3af";
const svg = (body) =>
  `<svg viewBox="0 0 600 420" width="600" height="420" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, s, size = 44, color = "currentColor", weight = 900) =>
  `<text x="${x}" y="${y}" fill="${color}" stroke="none" font-family="RobotoLocal, Roboto, Arial, sans-serif" font-weight="${weight}" font-size="${size}" text-anchor="middle">${s}</text>`;
// Biểu tượng đèn báo (vẽ trong ô 140×140, gốc tại x,y)
const iconOil = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M20 80 h70 l30 -24 h14 M20 80 v26 h82 l32 -40"/><path d="M50 80 v-14 h22 v14"/><path d="M128 92 q6 12 0 18"/></g>`;
const iconTemp = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M70 20 v64"/><circle cx="70" cy="96" r="16"/><path d="M70 40 h22 M70 58 h22"/><path d="M24 120 q12 -10 23 0 t23 0 t23 0 t23 0"/></g>`;
const iconBrake = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><circle cx="70" cy="70" r="40"/><path d="M22 38 q-14 32 0 64 M118 38 q14 32 0 64"/><path d="M70 50 v26"/><circle cx="70" cy="90" r="2" stroke-width="14"/></g>`;
const iconEngine = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M22 60 h16 v-16 h50 l14 14 h18 v-12 h12 v62 h-12 v-12 h-14 l-18 22 h-50 l-16 -20 h-0 z"/><path d="M50 44 v-14 h30 M65 30 v14"/></g>`;
const iconAbs = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><circle cx="70" cy="70" r="40"/><path d="M22 38 q-14 32 0 64 M118 38 q14 32 0 64"/>${text(70, 84, "ABS", 34, c)}</g>`;
const iconTpms = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M30 110 q-14 -40 6 -76 h68 q20 36 6 76"/><path d="M28 118 h84"/><path d="M70 50 v28"/><circle cx="70" cy="94" r="2" stroke-width="14"/></g>`;
const iconLight = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M60 34 q46 0 46 36 t-46 36 z"/><path d="M42 44 h-26 M42 62 h-26 M42 80 h-26 M42 98 h-26"/></g>`;
const iconCruise = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><path d="M24 96 a46 46 0 1 1 92 0"/><path d="M70 96 l26 -30"/><path d="M40 112 h60"/></g>`;
const iconBattery = (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}"><rect x="18" y="42" width="104" height="66" rx="6"/><path d="M38 42 v-12 h14 v12 M88 42 v-12 h14 v12"/><path d="M36 75 h22 M47 64 v22 M84 75 h20"/></g>`;
const dash = (icons) => `<rect x="20" y="70" width="560" height="280" rx="140" stroke="${GR}" stroke-width="8"/>${icons}`;
const wheel = (cx, cy, r, extra = "") => `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.62}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.14}"/>${[0, 72, 144, 216, 288].map((a) => { const rad = (a * Math.PI) / 180; return `<path d="M${cx + Math.cos(rad) * r * 0.16} ${cy + Math.sin(rad) * r * 0.16} L${cx + Math.cos(rad) * r * 0.6} ${cy + Math.sin(rad) * r * 0.6}"/>`; }).join("")}${extra}`;
const car = (x, y, s = 1, extra = "") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M10 120 v-34 q0 -12 14 -16 l60 -14 l52 -40 h120 l60 44 l48 10 q16 4 16 18 v32 z"/><path d="M150 32 v40 M96 72 h270"/>${wheel(90, 122, 34)}${wheel(310, 122, 34)}${extra}</g>`;
const crossOut = (cx, cy, r = 70) => `<g stroke="${R}" stroke-width="16"><circle cx="${cx}" cy="${cy}" r="${r}"/><path d="M${cx - r * 0.7} ${cy + r * 0.7} L${cx + r * 0.7} ${cy - r * 0.7}"/></g>`;
const check = (cx, cy, c = G) => `<path d="M${cx - 40} ${cy} l28 28 l56 -60" stroke="${c}" stroke-width="18"/>`;

export const art = {
  // ---- Tập 1: đèn báo taplo ----
  denDo: () => svg(dash(`${iconOil(70, 140, R)}${iconTemp(230, 140, R)}${iconBrake(390, 140, R)}`)),
  denVang: () => svg(dash(`${iconEngine(70, 140, Y)}${iconAbs(230, 140, Y)}${iconTpms(390, 140, Y)}`)),
  denXanh: () => svg(dash(`${iconLight(120, 140, G)}${iconCruise(340, 140, G)}`)),
  denNhapNhay: () => svg(`${iconEngine(230, 120, Y)}<g stroke="${Y}" stroke-width="10"><path d="M200 120 l-40 -30 M190 190 h-50 M200 260 l-40 30 M400 120 l40 -30 M410 190 h50 M400 260 l40 30"/></g>${text(300, 380, "NHẤP NHÁY", 40, Y)}`),
  // ---- Tập 2: AT và CVT ----
  atCapSo: () => svg(`<path d="M60 360 v-60 h80 v-60 h80 v-60 h80 v-60 h80 v-60 h80" stroke="${B}"/>${[1, 2, 3, 4, 5].map((n, i) => text(100 + i * 80, 350 - i * 60, n, 36)).join("")}${text(300, 410, "Từng cấp số", 34, GR, 700)}`),
  cvtDai: () => svg(`<path d="M120 120 l60 60 l-60 60 M120 120 v120" /><path d="M480 150 l-30 30 l30 30 M480 150 v60"/><path d="M150 110 L470 145 M150 250 L470 215" stroke="${B}"/>${text(300, 360, "Dây đai + puly", 36, GR, 700)}`),
  vongTuaOn: () => svg(`<path d="M120 300 a180 180 0 0 1 360 0"/><path d="M300 300 l-60 -110" stroke="${G}" stroke-width="16"/><circle cx="300" cy="300" r="14"/><path d="M60 380 q60 -30 120 0 t120 0 t120 0 t120 0" stroke="${G}"/>${text(300, 90, "Vòng tua ổn định", 34, GR, 700)}`),
  baoDuong: () => svg(`<path d="M200 90 q60 90 60 140 a60 60 0 0 1 -120 0 q0 -50 60 -140z" stroke="${Y}"/><rect x="330" y="110" width="200" height="190" rx="12"/><path d="M330 160 h200 M380 90 v40 M480 90 v40"/>${check(430, 225)}${text(300, 380, "Đúng loại, đúng hạn", 34, GR, 700)}`),
  // ---- Tập 3: áp suất lốp ----
  temCua: () => svg(`<path d="M120 380 v-300 q0 -30 30 -30 h250 l60 80 v250 z"/><rect x="170" y="200" width="180" height="120" rx="8" stroke="${Y}"/><path d="M195 235 h130 M195 265 h90 M195 295 h110" stroke="${Y}" stroke-width="8"/>${text(450, 250, "Tem", 34, GR, 700)}`),
  lopNguoi: () => svg(`${wheel(220, 220, 140)}<path d="M450 90 v170" /><circle cx="450" cy="290" r="34"/><path d="M450 270 v-60" stroke="${B}" stroke-width="16"/>${text(450, 400, "NGUỘI", 36, B)}`),
  moiThang: () => svg(`<rect x="150" y="80" width="300" height="270" rx="16"/><path d="M150 150 h300 M220 50 v60 M380 50 v60"/>${text(300, 270, "1 lần/tháng", 50)}`),
  dongHoAp: () => svg(`<circle cx="230" cy="220" r="130"/><path d="M230 220 l70 -60" stroke="${G}" stroke-width="16"/><circle cx="230" cy="220" r="12"/>${[200, 240, 280, 320].map((a) => { const r = (a * Math.PI) / 180; return `<path d="M${230 + Math.cos(r) * 100} ${220 + Math.sin(r) * 100} L${230 + Math.cos(r) * 120} ${220 + Math.sin(r) * 120}"/>`; }).join("")}${iconTpms(410, 150, Y)}`),
  // ---- Tập 4: vạch mòn lốp ----
  dauTamGiac: () => svg(`<path d="M40 330 q260 -160 520 0" /><path d="M40 380 q260 -160 520 0"/><path d="M300 190 l-34 56 h68 z" stroke="${Y}" stroke-width="10" fill="${Y}"/>${text(300, 130, "Dấu ▲ trên hông lốp", 36, GR, 700)}`),
  gaiMon: () => svg(`<path d="M40 300 h520"/>${[0, 1, 2, 3].map((i) => `<path d="M${70 + i * 130} 300 v-150 h70 v150"/>`).join("")}<rect x="210" y="262" width="60" height="38" fill="${R}" stroke="${R}"/><path d="M500 150 v150" stroke="${R}" stroke-width="6"/><path d="M490 262 h20" stroke="${R}" stroke-width="6"/>${text(300, 380, "Gờ báo mòn ≈ 1,6 mm", 38, R)}`),
  troiMua: () => svg(`<path d="M120 60 l-20 40 M220 40 l-20 40 M320 60 l-20 40 M420 40 l-20 40 M500 70 l-20 40" stroke="${B}"/>${wheel(300, 260, 120)}<path d="M120 390 q40 -20 80 0 t80 0 t80 0 t80 0 t80 0" stroke="${B}"/>`),
  lopNut: () => svg(`${wheel(260, 220, 150)}<path d="M150 150 l20 18 l-12 16 l22 16 M330 120 l-14 22 l18 12" stroke="${R}" stroke-width="8"/><path d="M380 290 q40 20 20 60" stroke="${R}" stroke-width="16"/>${text(480, 120, "Nứt", 36, R)}${text(480, 390, "Phồng", 36, R)}`),
  // ---- Tập 5: ắc-quy ----
  deNang: () => svg(`<circle cx="200" cy="210" r="110"/><path d="M200 210 v-60"/><path d="M380 120 q60 90 0 180" stroke="${Y}"/><path d="M430 100 q80 110 0 220" stroke="${Y}" stroke-dasharray="20 22"/>${text(300, 395, "Đề lâu mới nổ", 34, GR, 700)}`),
  denMo: () => svg(`<path d="M140 120 q100 0 100 90 t-100 90 z"/><path d="M260 150 h170 M260 210 h120 M260 270 h170" stroke="${GR}" stroke-width="10" stroke-dasharray="6 26"/>${text(300, 390, "Đèn mờ khi đề", 34, GR, 700)}`),
  denAcQuy: () => svg(dash(`${iconBattery(230, 140, R)}`)),
  cocTrang: () => svg(`<rect x="110" y="170" width="380" height="200" rx="14"/><path d="M170 170 v-50 h70 v50 M360 170 v-50 h70 v50"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${180 + (i % 3) * 25}" cy="${110 - Math.floor(i / 3) * 18}" r="9" fill="#e5e7eb" stroke="#e5e7eb"/>`).join("")}${[0, 1, 2, 3].map((i) => `<circle cx="${375 + (i % 2) * 30}" cy="${108 - Math.floor(i / 2) * 18}" r="9" fill="#bfe3d0" stroke="#bfe3d0"/>`).join("")}`),
  // ---- Tập 6: tốn xăng ----
  phanhGap: () => svg(`<path d="M40 330 L120 120 L180 330 L250 110 L310 330 L380 100 L440 330 L510 120 L560 330" stroke="${R}"/>${text(300, 400, "Ga – phanh – ga – phanh", 34, GR, 700)}`),
  noMayCho: () => svg(`${car(80, 160, 1)}<path d="M40 300 q-20 -20 -6 -40 M20 320 q-26 -30 -10 -60" stroke="${GR}" stroke-width="8"/><circle cx="470" cy="100" r="60"/><path d="M470 100 v-36 M470 100 l26 16"/>`),
  lopNon: () => svg(`<path d="M190 340 q-110 -40 -110 -140 a170 160 0 0 1 340 0 q0 100 -110 140 z"/><path d="M130 352 h220" stroke="${Y}" stroke-width="18"/><circle cx="250" cy="190" r="60"/>${text(480, 200, "Thiếu", 40, Y)}${text(480, 250, "hơi", 40, Y)}`),
  choDoThua: () => svg(`${car(80, 160, 1)}<rect x="360" y="70" width="110" height="110" stroke="${Y}"/><rect x="240" y="100" width="90" height="80" stroke="${Y}"/>${text(415, 140, "kg", 36, Y)}`),
  chayNhanh: () => svg(`<path d="M120 300 a180 180 0 0 1 360 0"/><path d="M300 300 l120 -70" stroke="${R}" stroke-width="16"/><circle cx="300" cy="300" r="14"/><path d="M60 120 h120 M40 170 h110 M70 220 h80" stroke="${GR}" stroke-width="8"/>`),
  // ---- Tập 7: đường ngập ----
  nuaBanh: () => svg(`${wheel(300, 210, 150)}<path d="M100 210 h400" stroke="${R}" stroke-width="10" stroke-dasharray="24 16"/><path d="M40 260 q40 -20 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" stroke="${B}"/>${text(300, 400, "Quá nửa bánh: đừng đi", 34, R)}`),
  diCham: () => svg(`${car(90, 130, 1)}<path d="M40 300 q30 -16 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="${B}"/>${text(300, 400, "Chậm, đều ga", 38, G)}`),
  songXeLon: () => svg(`<rect x="320" y="70" width="230" height="200" rx="10"/>${wheel(380, 270, 40)}${wheel(500, 270, 40)}${car(20, 170, 0.6)}<path d="M40 330 q50 -60 100 0 t100 0 q50 -80 100 -10 t100 0" stroke="${B}"/>`),
  khongDe: () => svg(`<rect x="120" y="120" width="200" height="200" rx="20"/><circle cx="220" cy="220" r="40"/>${text(220, 360, "START", 30, GR)}${crossOut(440, 220, 80)}<path d="M40 380 q40 -20 80 0 t80 0 t80 0 t80 0 t80 0 t80 0" stroke="${B}"/>`),
  // ---- Tập 8: đổ đèo ----
  soThap: () => svg(`<path d="M40 120 L560 360" stroke="${GR}"/><rect x="380" y="60" width="160" height="200" rx="12"/>${text(460, 120, "P R N", 32, GR)}${text(460, 175, "D", 32, GR)}${text(460, 235, "L", 56, G)}`),
  phanhNong: () => svg(`<circle cx="260" cy="220" r="150" stroke="${R}"/><circle cx="260" cy="220" r="60"/><path d="M380 110 q40 -30 0 -60 M430 140 q40 -30 0 -60 M480 170 q40 -30 0 -60" stroke="${R}" stroke-width="8"/>${text(300, 410, "Rà phanh liên tục = phanh nóng", 30, R)}`),
  phanhDutKhoat: () => svg(`<rect x="200" y="80" width="120" height="70" rx="10"/><path d="M260 150 v120"/><path d="M380 120 v120 l30 -30 M380 240 l-30 -30" stroke="${G}"/><path d="M470 240 v-120 l30 30 M470 120 l-30 30" stroke="${B}"/>${text(395, 300, "Đạp", 28, G)}${text(470, 300, "Nhả", 28, B)}`),
  khongN: () => svg(`<rect x="210" y="70" width="180" height="280" rx="16"/>${text(300, 140, "P", 44, GR)}${text(300, 200, "R", 44, GR)}${text(300, 262, "N", 60)}${text(300, 325, "D", 44, GR)}${crossOut(300, 245, 60)}`),
  // ---- Tập 9: xe cũ ngập nước ----
  muiAm: () => svg(`<rect x="90" y="140" width="220" height="100" rx="14"/><path d="M110 170 h180 M110 200 h180" stroke="${GR}" stroke-width="8"/><path d="M360 170 q30 -20 0 -40 q-30 -20 0 -40 M420 200 q30 -20 0 -40 q-30 -20 0 -40 M480 170 q30 -20 0 -40 q-30 -20 0 -40" stroke="${G}" stroke-width="8"/>${text(300, 360, "Mùi ẩm từ cửa gió", 36, GR, 700)}`),
  thamBun: () => svg(`<path d="M80 330 h440"/><path d="M120 330 L200 160 h300 l-60 170" /><circle cx="220" cy="300" r="18" fill="#8b5a2b" stroke="#8b5a2b"/><circle cx="300" cy="312" r="12" fill="#8b5a2b" stroke="#8b5a2b"/><circle cx="380" cy="296" r="22" fill="#8b5a2b" stroke="#8b5a2b"/>${text(300, 400, "Bùn dưới thảm", 34, GR, 700)}`),
  goiSet: () => svg(`<path d="M60 120 l120 60 l-120 60 z" stroke="${Y}"/><path d="M180 180 L330 180" stroke="${Y}" stroke-width="6" stroke-dasharray="4 14"/><circle cx="400" cy="200" r="60"/><path d="M370 200 h60 M400 170 v60"/><circle cx="380" cy="170" r="10" fill="#b45309" stroke="#b45309"/><circle cx="425" cy="225" r="12" fill="#b45309" stroke="#b45309"/>${text(400, 330, "Gỉ sét", 36, "#b45309")}`),
  denHoiNuoc: () => svg(`<path d="M120 110 q200 -20 200 110 t-200 110 z"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${170 + (i % 3) * 40}" cy="${170 + Math.floor(i / 3) * 60}" r="10" stroke="${B}" fill="${B}"/>`).join("")}<rect x="400" y="160" width="120" height="90" rx="10"/><path d="M420 160 v-30 M460 160 v-30 M500 160 v-30" /><circle cx="440" cy="210" r="10" fill="#4d7c0f" stroke="#4d7c0f"/>`),
  // ---- Tập 10: bảo hiểm ----
  baoHiemNguoiKhac: () => svg(`<path d="M300 60 l160 50 v100 q0 110 -160 170 q-160 -60 -160 -170 v-100 z" stroke="${B}"/><circle cx="300" cy="180" r="40"/><path d="M230 300 q70 -90 140 0"/>${text(300, 412, "Đền cho NGƯỜI KHÁC", 32, B)}`),
  phiNghiDinh: () => svg(`<rect x="150" y="50" width="300" height="330" rx="12"/><path d="M190 110 h220 M190 160 h220 M190 210 h150" stroke="${GR}" stroke-width="8"/>${text(300, 290, "NĐ 67/2023", 40, Y)}${text(300, 345, "đã gồm VAT", 28, GR, 700)}`),
  baoHiemXeMinh: () => svg(`${car(100, 190, 1)}<path d="M300 40 l120 36 v70 q0 70 -120 110 q-120 -40 -120 -110 v-70 z" stroke="${G}"/>${check(300, 140)}`),
  dieuKhoan: () => svg(`<rect x="120" y="50" width="280" height="330" rx="12"/><path d="M160 110 h200 M160 160 h200 M160 210 h200 M160 260 h120" stroke="${GR}" stroke-width="8"/><circle cx="400" cy="260" r="80" stroke="${Y}"/><path d="M458 318 l70 70" stroke="${Y}" stroke-width="20"/>`),
};
