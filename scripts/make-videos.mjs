// Nhiều mẫu video dọc 9:16 cho TikTok/Reels (10/11/2026), cùng khung và bộ dựng với price-video / compare-video
// (scripts/lib/video-kit.mjs). Số liệu lấy từ src/data + công thức của website, nên mỗi tháng chỉ cần chạy lại.
//
//   npm run video -- tra-gop <xe>        Trả góp: tiền mặt cần chuẩn bị, góp tháng đầu, trả trước 20/30/50%, lãi suất
//   npm run video -- lan-banh-tinh <xe>  Lăn bánh khác nhau theo tỉnh: trước bạ 10/12%, biển số, 5 nơi tiêu biểu
//   npm run video -- uu-dai-thang        Ưu đãi tháng của tất cả xe, xếp từ thấp đến cao (1 video cho cả hãng)
//   npm run video -- diem-noi-bat <xe>   Điểm nổi bật: ảnh lớn của MMV (showroom.ts) + trang bị bản cao nhất
//   npm run video -- xe-cu <slug|tat-ca> Xe cũ đang bán: ảnh thật, thông tin, nhận xét của Phúc (usedCarReview), trả góp
//   npm run video -- chon-xe             Có X triệu mua Mitsubishi nào? (lăn bánh sau ưu đãi theo khoảng ngân sách)
//   npm run video -- noi-ngoai-that <xe> Ảnh ngoại thất, nội thất (gallery) + trang bị bản cao nhất, kích thước, màu xe
//   npm run video -- gioi-thieu <xe>     Giới thiệu xe: xe gì, kích thước, vận hành, trang bị nổi bật, phiên bản, bảo hành
//   npm run video -- chi-phi <xe>        Mua xe gồm phí nào: bắt buộc (5 khoản) / không bắt buộc; Triton có cảnh "vì sao ít phí"
//   npm run video -- phu-kien <xe>       Phụ kiện nên lắp (accessories.ts) + phụ kiện chính hãng MMV có giá; ảnh ở scripts/video-assets/phu-kien/
//   npm run video -- chon-phien-ban <xe> Tư vấn chọn phiên bản: mỗi bản thêm gì, hợp với ai, gợi ý theo nhu cầu (xe ≥ 2 bản)
//   3 TRỤ CỘT (11/11/2026):
//   npm run video -- kien-thuc <quy-trinh-mua-xe|bao-hanh|bao-duong|lai-suat|tat-ca>   Kiến thức (dữ liệu từ các trang web)
//   npm run video -- xep-hang <gam-cao|tiet-kiem-xang|manh|rong|re|tat-ca>          Xếp hạng trong dòng xe Mitsubishi
//   npm run video -- so-sanh-xe <xe A> <xe B> | tat-ca                               So 2 mẫu Mitsubishi (không so hãng khác)
//   npm run video -- do-vui <doan-gia [xe]|dung-sai|chon-1|tat-ca>                    Đố vui: đoán giá, đúng/sai, chọn 1 trong 2
//   npm run video -- kien-thuc-chung <id tập|tat-ca>   Series "Kiến thức ô tô" (chung, không gắn hãng), nội dung ở scripts/video-content/kien-thuc-chung.mjs; cảnh cuối mời theo dõi kênh
//   (video giá: npm run price-video, so sánh phiên bản: npm run compare-video)
//
// <xe>: destinator, xforce, triton, xpander, xpander-cross, attrage hoặc tat-ca. Thêm --ban "<phiên bản>" để chọn bản,
// --tinh <id> đổi nơi tính lăn bánh, --nhanh xem thử 15 hình/giây.
// Kết quả: ../anh-facebook/video/<mẫu>/<xe>/  video.mp4, loi-doc.txt, caption.txt; giọng AI: giong-doc/1.mp3... rồi chạy lại.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  root, load, cars, currentPromotion, provinces, calculateOnRoadPrice, args, option, province, provinceShort,
  tr, trieu, escapeHtml, month, siteUrl, phone, shortBenefit, variantImage, slugWords, siteConfig,
  box, note, row, heading, oneCar, openBrowser, makeVideo,
} from "./lib/video-kit.mjs";

const { showrooms } = await load("src/data/showroom.ts");
const { usedCars } = await load("src/data/usedCars.ts");
const { usedCarReview } = await load("src/lib/usedCarReview.ts");
const { financing, firstMonthPayment, usedFinancing, usedCarFinanceable, newCarBankPackages, bankPackagesUpdated } = await load("src/data/financing.ts");
const { plateFeeByArea } = await load("src/data/registrationFees.ts");
const { accessoryGroups } = await load("src/data/accessories.ts");
const { categorizeGroup } = await load("src/lib/accessoryCategories.ts");

const positional = args.filter((arg, index) => !arg.startsWith("--") && !(index > 0 && args[index - 1].startsWith("--") && ["--ban", "--tinh", "--giao-dien"].includes(args[index - 1])));
const [template, target] = args.filter((arg, index) => !arg.startsWith("--") && !(index > 0 && args[index - 1].startsWith("--") && ["--ban", "--tinh", "--giao-dien"].includes(args[index - 1])));
const fileUrl = (publicPath) => pathToFileURL(path.join(root, "public", publicPath)).href;
const shortOf = (car) => car.name.replace(/^Mitsubishi /, "");
const num1 = (value) => (value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
// Số nhỏ hơn 1 triệu ghi đủ số đồng ("350.000 đồng" thay vì "0,35 triệu")
const money = (value) => (value < 1_000_000 ? `${Math.round(value).toLocaleString("vi-VN")} đồng` : trieu(value));
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
const percent = (value) => `${(value * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`;
const photo = (src, position = "center") =>
  `<div class="photo" data-at="0" data-fx="zoom" style="background-image:url('${src}');background-position:${position}"></div>`;

// ---------- Số liệu phiên bản ----------
function offerOf(car, variantName) {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);
  const promo = promotion?.variants.find((item) => item.variantName === variantName);
  const benefits = (promo?.benefits ?? [])
    .filter((benefit) => Number.isFinite(benefit.value) && benefit.value > 0)
    .map((benefit) => ({ label: shortBenefit(benefit.label), value: benefit.value }));
  return { benefits, total: benefits.reduce((sum, benefit) => sum + benefit.value, 0) };
}
function variantData(car, variant, where = province) {
  const result = calculateOnRoadPrice({ carName: car.name, price: variant.price, seats: variant.specifications?.seats, province: where });
  const offer = offerOf(car, variant.name);
  return {
    name: variant.name,
    label: variant.name === shortOf(car) ? shortOf(car) : `${shortOf(car)} ${variant.name}`,
    price: variant.price,
    fees: result.totalFees,
    feeList: result.fees,
    onRoad: result.onRoadPrice,
    offer: offer.total,
    benefits: offer.benefits,
    net: result.onRoadPrice - offer.total,
    image: variantImage(car, variant),
    hero: fileUrl(car.image),
  };
}
// Phiên bản dùng cho video 1 xe: --ban nếu có, không thì bản rẻ nhất có ưu đãi
function chooseVariant(car) {
  const wanted = option("ban");
  if (wanted) {
    const found = car.variants.find((variant) => variant.name.toLowerCase() === wanted.toLowerCase());
    if (!found) {
      console.error(`${car.name} không có bản "${wanted}". Các bản: ${car.variants.map((variant) => `"${variant.name}"`).join(", ")}`);
      process.exit(1);
    }
    return found;
  }
  const byPrice = [...car.variants].sort((a, b) => a.price - b.price);
  return byPrice.find((variant) => offerOf(car, variant.name).total > 0) ?? byPrice[0];
}
function pickCars() {
  if (!target || target === "tat-ca") return cars;
  const car = cars.find((item) => item.id === target || item.slug === target);
  if (!car) {
    console.error(`Không có xe "${target}". Xe: ${cars.map((item) => item.id).join(", ")}`);
    process.exit(1);
  }
  return [car];
}
const ctaScene = (lead, comment, image, extraVoice) => ({
  theme: "light",
  tail: 1.2,
  voice: extraVoice,
  html: `<h2 class="serif-title" data-at="0">Lưu video và</h2>
    ${box(comment, 0.15)}
    <p class="lead" data-at="0.35">${escapeHtml(lead)}</p>
    ${image ? `<div class="cars one" data-at="0.05" data-fx="car"><figure><img src="${image}"></figure></div>` : ""}
    <div class="contact" data-at="0.55"><b>Lưu Hoàng Phúc · Mitsubishi</b><span>Zalo ${escapeHtml(phone)}</span></div>
    <p class="fine" data-at="0.6">Giá lăn bánh tạm tính tại ${escapeHtml(provinceShort(province))}. Ưu đãi tháng ${month}, trừ trực tiếp vào giá xe khi ký hợp đồng.<br>Hình ảnh minh họa.</p>`,
});
const footerCaption = (lines) => `${lines.join("\n")}

📞 Zalo ${phone} – Lưu Hoàng Phúc, Mitsubishi Moveo New City
👉 Bảng giá + ưu đãi tháng ${month}: ${siteUrl}/bang-gia-xe-mitsubishi
Giá lăn bánh tạm tính tại ${provinceShort(province)}. Ưu đãi trừ trực tiếp vào giá xe khi ký hợp đồng.
`;

// ---------- Mẫu: trả góp ----------
function traGop(car) {
  const v = variantData(car, chooseVariant(car));
  const plan = financing;
  const pay = (down) => firstMonthPayment(v.price, { ...plan, downPaymentPercent: down });
  const down = (v.price * plan.downPaymentPercent) / 100;
  const loan = v.price - down;
  const principal = loan / (plan.years * 12);
  const interest = (loan * plan.ratePercent) / 100 / 12;
  const cash = down + v.fees;
  const tp = newCarBankPackages.find((item) => item.bank === plan.bank);
  const levels = [20, 30, 50];
  const saving = pay(20) - pay(30);
  const scenes = [
    {
      theme: "dark",
      voice: `Mua ${v.label} trả góp cần bao nhiêu tiền? Trả trước ${plan.downPaymentPercent}% cộng phí đăng ký, chuẩn bị khoảng ${trieu(cash)}. Góp tháng đầu khoảng ${trieu(pay(20))}.`,
      html: `${heading("", `Trả góp ${shortOf(car)}`)}
        <p class="sub serif" data-at="0">cần bao nhiêu tiền?</p>
        ${oneCar(v, 0.02, v.label, "compact")}
        ${row("Chuẩn bị", `~ ${trieu(cash)}`, 0.3)}
        ${row("Góp tháng đầu", `~ ${trieu(pay(20))}`, 0.55)}
        ${box(`Vay ${100 - plan.downPaymentPercent}%, ${plan.years} năm`, 0.75)}`,
    },
    {
      theme: "light",
      voice: `Thứ nhất: tiền mặt cần chuẩn bị. Trả trước ${plan.downPaymentPercent}% giá xe là ${trieu(down)}, cộng ${trieu(v.fees)} phí đăng ký, tổng khoảng ${trieu(cash)}. Ưu đãi tháng ${currentPromotion.month} ${v.offer ? `khoảng ${trieu(v.offer)} được trừ trực tiếp vào giá xe khi ký hợp đồng.` : "hỏi Phúc để cập nhật."}`,
      html: `${heading(1, "Tiền mặt chuẩn bị")}
        ${oneCar(v, 0.02)}
        ${row(`Trả trước ${plan.downPaymentPercent}%`, trieu(down), 0.15)}
        ${row("Phí đăng ký", `+ ${trieu(v.fees)}`, 0.32)}
        ${box(`Chuẩn bị ~ ${trieu(cash)}`, 0.55, "black")}
        ${v.offer ? note(`Chưa trừ ưu đãi tháng ${currentPromotion.month} (~ ${trieu(v.offer)})`, 0.8) : ""}`,
    },
    {
      theme: "light",
      voice: `Thứ hai: góp mỗi tháng. Vay ${trieu(loan)} trong ${plan.years} năm, gốc mỗi tháng ${trieu(principal)}, lãi tháng đầu ${trieu(interest)}. Tháng đầu góp khoảng ${trieu(pay(20))}, các tháng sau giảm dần vì dư nợ giảm.`,
      html: `${heading(2, "Góp mỗi tháng")}
        <p class="sub serif" data-at="0">${escapeHtml(plan.bank)} ${plan.ratePercent.toLocaleString("vi-VN")}%/năm, ${plan.years} năm</p>
        ${row(`Vay ${100 - plan.downPaymentPercent}%`, trieu(loan), 0.12)}
        ${row("Gốc mỗi tháng", trieu(principal), 0.3)}
        ${row("Lãi tháng đầu", `+ ${trieu(interest)}`, 0.45)}
        ${box(`Tháng đầu ~ ${trieu(pay(20))}`, 0.62)}
        ${note("Dư nợ giảm dần, các tháng sau góp ít hơn", 0.82)}`,
    },
    {
      theme: "light",
      voice: `Thứ ba: trả trước nhiều thì góp nhẹ hơn. Trả trước 20% góp ${trieu(pay(20))}, 30% góp ${trieu(pay(30))}, 50% góp ${trieu(pay(50))} mỗi tháng đầu. Mỗi 10% trả trước bớt khoảng ${trieu(saving)} một tháng.`,
      html: `${heading(3, "Trả trước nhiều hơn?")}
        <div class="spec-head" data-at="0.05"><b>Trả trước</b><b>Góp tháng đầu</b></div>
        ${levels
          .map(
            (level, index) => `<div class="pair" data-at="${(0.15 + index * 0.18).toFixed(2)}"><b>${level}% · ${tr((v.price * level) / 100)}</b><i></i><b class="red">${tr(pay(level))}</b></div>`
          )
          .join("")}
        ${box(`Mỗi 10% bớt ~ ${trieu(saving)}/tháng`, 0.7)}`,
    },
    {
      theme: "dark",
      voice: `Thứ tư: hỏi kỹ lãi suất. ${plan.bank} cố định ${plan.ratePercent.toLocaleString("vi-VN")}% năm đầu, sau đó thả nổi bằng lãi tham chiếu cộng biên độ ${tp?.marginPercent ?? ""}%. Hỏi rõ lãi sau ưu đãi trước khi ký.`,
      html: `${heading(4, "Lãi suất")}
        <p class="sub serif" data-at="0">đừng chỉ nhìn năm đầu</p>
        ${row("12 tháng đầu", `${plan.ratePercent.toLocaleString("vi-VN")}%/năm`, 0.15)}
        ${row("Sau đó", `tham chiếu + ${tp?.marginPercent ?? "?"}%`, 0.4, "small")}
        ${box("Hỏi rõ lãi sau ưu đãi", 0.62)}
        ${note(`Gói ${plan.bank} ${plan.updated}, ngân hàng duyệt hồ sơ`, 0.8)}`,
    },
    ctaScene("Phúc tính bảng góp chi tiết", "Bình luận số tiền trả trước", v.hero,
      `Anh chị định trả trước bao nhiêu? Lưu video và bình luận, Phúc tính bảng góp chi tiết từng tháng.`),
  ];
  return {
    key: `${car.id}-${slugWords(v.name).join("-")}`,
    scenes,
    title: `TRẢ GÓP ${v.label.toUpperCase()}`,
    caption: footerCaption([
      `Mua ${v.label} trả góp cần bao nhiêu? 👇`,
      `Chuẩn bị ~${num1(cash)} triệu, góp tháng đầu ~${num1(pay(20))} triệu (trả trước ${plan.downPaymentPercent}%, ${plan.years} năm, ${plan.bank} ${plan.ratePercent.toLocaleString("vi-VN")}%).`,
      "Bình luận số tiền trả trước, Phúc tính bảng góp chi tiết.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #TraGopOto #MuaXeTraGop`,
    ]),
  };
}

// ---------- Mẫu: lăn bánh theo tỉnh ----------
function lanBanhTinh(car) {
  const variant = chooseVariant(car);
  const all = provinces.map((item) => ({ province: item, ...variantData(car, variant, item) })).sort((a, b) => a.onRoad - b.onRoad);
  const low = all[0];
  const high = all[all.length - 1];
  const v = all.find((item) => item.province.id === province.id);
  const isPickup = car.name === "Mitsubishi Triton";
  const rates = [...new Set(provinces.map((item) => item.taxRate))].sort();
  const byRate = rates.map((rate) => provinces.filter((item) => item.taxRate === rate));
  const names = (list) => list.slice(0, 4).map(provinceShort).join(", ") + (list.length > 4 ? `… (${list.length} nơi)` : "");
  const plate = plateFeeByArea[isPickup ? "pickup" : "car"];
  const sample = ["tp-hcm", "ha-noi", "dong-nai", "can-tho", "da-nang"].map((id) => all.find((item) => item.province.id === id)).filter(Boolean);
  const cheapest = [...sample].sort((a, b) => a.onRoad - b.onRoad)[0];
  const scenes = [
    {
      theme: "dark",
      voice: `${v.label} lăn bánh mỗi nơi một giá. Rẻ nhất ở ${provinceShort(low.province)} khoảng ${trieu(low.onRoad)}, cao nhất ở ${provinceShort(high.province)} khoảng ${trieu(high.onRoad)}, chênh ${trieu(high.onRoad - low.onRoad)}.`,
      html: `${heading("", `Lăn bánh ${shortOf(car)}`)}
        <p class="sub serif" data-at="0">mỗi tỉnh một giá</p>
        ${oneCar(v, 0.02, v.label, "compact")}
        ${row(provinceShort(low.province), trieu(low.onRoad), 0.25)}
        ${row(provinceShort(high.province), trieu(high.onRoad), 0.45)}
        ${box(`Chênh ${trieu(high.onRoad - low.onRoad)}`, 0.65)}`,
    },
    {
      theme: "light",
      voice: `Thứ nhất: lệ phí trước bạ. ${byRate.map((list, index) => `${list.length} nơi thu ${percent(rates[index] * (isPickup ? 0.6 : 1))}`).join(", ")}${isPickup ? ", vì bán tải chở hàng chỉ tính 60% mức của ô tô con" : ""}. Với ${v.label}, mỗi 1% là khoảng ${trieu(v.price / 100 * (isPickup ? 0.6 : 1))}.`,
      html: `${heading(1, "Lệ phí trước bạ")}
        ${byRate
          .map(
            (list, index) => `<div class="spec" data-at="${(0.12 + index * 0.2).toFixed(2)}"><i>${escapeHtml(names(list))}</i>
            <div class="vals"><b style="grid-column:1/span 2;color:var(--accent)">${percent(rates[index] * (isPickup ? 0.6 : 1))} · ${trieu(v.price * rates[index] * (isPickup ? 0.6 : 1))}</b></div></div>`
          )
          .join("")}
        ${box(`Mỗi 1% ~ ${trieu((v.price / 100) * (isPickup ? 0.6 : 1))}`, 0.7)}
        ${isPickup ? note("Bán tải chở hàng tính 60% mức ô tô con", 0.85) : ""}`,
    },
    {
      theme: "light",
      voice: `Thứ hai: phí biển số. Hà Nội và TP.HCM ${money(plate.I)}, các tỉnh khác ${money(plate.II)}.`,
      html: `${heading(2, "Phí biển số")}
        ${row("Hà Nội, TP.HCM", money(plate.I), 0.15)}
        ${row("Tỉnh, thành khác", money(plate.II), 0.35)}
        ${box(`Chênh ${money(plate.I - plate.II)}`, 0.6)}
        ${note("Theo Thông tư 155/2025/TT-BTC", 0.8)}`,
    },
    {
      theme: "light",
      minSpeak: 6,
      voice: `Thứ ba: lăn bánh ${v.label} ở ${sample.length} nơi: ${sample.map((item) => `${provinceShort(item.province)} ${trieu(item.onRoad)}`).join(", ")}.`,
      html: `${heading(3, `Lăn bánh ${sample.length} nơi`)}
        <p class="sub serif" data-at="0">${escapeHtml(v.label)}, chưa trừ ưu đãi</p>
        ${sample.map((item, index) => row(provinceShort(item.province), trieu(item.onRoad), 0.1 + index * 0.13, item === cheapest ? "" : "small")).join("")}`,
    },
    ...(v.offer
      ? [{
          theme: "dark",
          voice: `Ưu đãi tháng ${currentPromotion.month} khoảng ${trieu(v.offer)} áp dụng mọi nơi, trừ trực tiếp vào giá xe. Tại ${provinceShort(province)}, ${v.label} còn khoảng ${trieu(v.net)}.`,
          html: `${heading("", "Sau ưu đãi")}
            <p class="sub serif" data-at="0">${escapeHtml(v.label)} tại ${escapeHtml(provinceShort(province))}</p>
            ${row("Lăn bánh", trieu(v.onRoad), 0.15)}
            ${row("Ưu đãi", `– ${trieu(v.offer)}`, 0.35)}
            ${box(`Còn ${trieu(v.net)}`, 0.6)}`,
        }]
      : []),
    ctaScene("Phúc gửi lăn bánh đúng tỉnh", "Bình luận tỉnh của bạn", v.hero,
      `Anh chị ở tỉnh nào? Lưu video và bình luận tên tỉnh, Phúc gửi bảng lăn bánh đúng nơi đăng ký.`),
  ];
  return {
    key: `${car.id}-${slugWords(v.name).join("-")}`,
    scenes,
    title: `LĂN BÁNH ${v.label.toUpperCase()} THEO TỈNH`,
    caption: footerCaption([
      `${v.label} lăn bánh ở tỉnh nào rẻ hơn? 👇`,
      `${provinceShort(low.province)} ~${num1(low.onRoad)} triệu, ${provinceShort(high.province)} ~${num1(high.onRoad)} triệu.`,
      "Bình luận tỉnh của anh chị, Phúc gửi bảng lăn bánh đúng nơi đăng ký.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #LanBanh #GiaXe`,
      `👉 Tự tính lăn bánh 34 tỉnh: ${siteUrl}/du-toan/gia-lan-banh`,
    ]),
  };
}

// ---------- Mẫu: ưu đãi tháng (cả hãng) ----------
function uuDaiThang() {
  const list = cars
    .map((car) => {
      const variants = car.variants.map((variant) => variantData(car, variant)).filter((variant) => variant.offer > 0);
      if (!variants.length) return null;
      return { car, variants, max: Math.max(...variants.map((variant) => variant.offer)) };
    })
    .filter(Boolean)
    .sort((a, b) => a.max - b.max);
  const top = list[list.length - 1];
  const scenes = [
    {
      theme: "dark",
      voice: `Ưu đãi tháng ${currentPromotion.month} của ${list.length} dòng xe Mitsubishi, xếp từ thấp đến cao. Cao nhất lên tới ${trieu(top.max)}. Xem đến cuối để biết là xe nào.`,
      html: `${heading("", `Ưu đãi tháng ${currentPromotion.month}`)}
        <p class="sub serif" data-at="0">${list.length} dòng xe Mitsubishi</p>
        <div class="cars two" data-at="0.05" data-fx="car">${list.slice(-2).map((item) => `<figure><img src="${fileUrl(item.car.image)}"></figure>`).join("")}</div>
        ${box(`Cao nhất ${trieu(top.max)}`, 0.4)}
        ${note("Xếp từ thấp đến cao, xem đến cuối", 0.65)}`,
    },
    ...list.map((item, index) => {
      const shown = item.variants.slice(0, 4);
      return {
        theme: index === list.length - 1 ? "dark" : "light",
        minSpeak: 2.5 + shown.length * 0.8,
        voice: `${index === list.length - 1 ? "Và cao nhất: " : `Số ${index + 1}: `}${shortOf(item.car)}. ${shown.map((variant) => `${variant.name === shortOf(item.car) ? "" : `bản ${variant.name} `}${trieu(variant.offer)}`).join(", ")}.`,
        html: `${heading(index + 1, shortOf(item.car))}
          ${oneCar({ hero: fileUrl(item.car.image) }, 0.02, "", "compact")}
          ${shown.map((variant, row_) => row(variant.name, trieu(variant.offer), 0.15 + row_ * 0.14, shown.length > 2 ? "small" : "")).join("")}
          ${box(`Ưu đãi đến ${trieu(item.max)}`, 0.72)}`,
      };
    }),
    {
      theme: "light",
      minSpeak: 6,
      voice: `Tóm lại ưu đãi tháng ${currentPromotion.month}: ${[...list].reverse().map((item) => `${shortOf(item.car)} đến ${trieu(item.max)}`).join(", ")}. Ưu đãi trừ trực tiếp vào giá xe khi ký hợp đồng.`,
      html: `${heading("", "Tóm lại")}
        <p class="sub serif" data-at="0">ưu đãi cao nhất từng dòng xe</p>
        ${[...list].reverse().map((item, index) => row(shortOf(item.car), trieu(item.max), 0.08 + index * 0.1, "small")).join("")}
        ${note(`Áp dụng trong tháng ${month}`, 0.85)}`,
    },
    ctaScene("Phúc gửi ưu đãi từng phiên bản", "Bình luận xe bạn quan tâm", fileUrl(top.car.image),
      `Anh chị quan tâm xe nào? Lưu video và bình luận, Phúc gửi chi tiết ưu đãi và lăn bánh từng phiên bản.`),
  ];
  return {
    key: `${String(currentPromotion.month).padStart(2, "0")}-${currentPromotion.year}`,
    scenes,
    title: `ƯU ĐÃI THÁNG ${month} TẤT CẢ XE`,
    caption: footerCaption([
      `Ưu đãi Mitsubishi tháng ${month}, xe nào cao nhất? 👇`,
      [...list].reverse().map((item) => `${shortOf(item.car)} đến ${num1(item.max)} triệu`).join(" · "),
      "Bình luận xe anh chị quan tâm, Phúc gửi ưu đãi từng phiên bản.",
      `#Mitsubishi #KhuyenMaiOto #UuDaiThang${currentPromotion.month}`,
    ]),
  };
}

// ---------- Mẫu: điểm nổi bật ----------
function topVariantItems(car, from) {
  const top = [...car.variants].sort((a, b) => b.price - a.price)[0];
  if (from === "safetyTechnologies") return (top.safetyTechnologies ?? []).map((tech) => tech.name);
  return top.equipment?.[from] ?? [];
}
function diemNoiBat(car) {
  const showroom = showrooms[car.id];
  if (!showroom) {
    console.error(`${car.name} chưa có mục trong src/data/showroom.ts.`);
    process.exit(1);
  }
  const variants = car.variants.map((variant) => variantData(car, variant));
  const minPrice = Math.min(...variants.map((variant) => variant.price));
  const maxOffer = Math.max(...variants.map((variant) => variant.offer));
  const firstSentence = (text) => (text ?? "").split(/(?<=\.)\s/)[0];
  const features = showroom.features.slice(0, 6);
  const scenes = [
    {
      theme: "dark",
      backdrop: photo(fileUrl(showroom.mobilePoster)),
      contentTop: 1030,
      voice: `${car.name}: ${showroom.slogan}. Giá từ ${trieu(minPrice)}${maxOffer ? `, ưu đãi tháng ${currentPromotion.month} đến ${trieu(maxOffer)}` : ""}. Cùng xem ${features.length} điểm nổi bật.`,
      html: `<p class="kicker" data-at="0.02">Mitsubishi</p>
        <h2 class="big" data-at="0.04">${escapeHtml(shortOf(car))}</h2>
        <p class="sub serif" data-at="0.12">${escapeHtml(showroom.slogan)}</p>
        <div class="chips" data-at="0.35"><span>Giá từ ${escapeHtml(trieu(minPrice))}</span>${maxOffer ? `<span style="color:var(--accent-2)">Ưu đãi đến ${escapeHtml(trieu(maxOffer))}</span>` : ""}</div>`,
    },
    ...features.map((feature, index) => {
      const items = feature.from ? topVariantItems(car, feature.from).slice(0, 3) : [];
      const text = items.length ? "" : firstSentence(feature.text);
      return {
        theme: "dark",
        backdrop: photo(fileUrl(feature.image)),
        contentTop: feature.title.length > 26 ? 950 : 1000,
        minSpeak: 4,
        voice: `${index + 1}. ${feature.kicker}: ${feature.title}. ${items.length ? `${items.map(lowerFirst).join(", ")}.` : text}`,
        html: `<p class="kicker" data-at="0.02">${index + 1} · ${escapeHtml(feature.kicker)}</p>
          <h2 class="big" data-at="0.06" style="font-size:66px">${escapeHtml(feature.title)}</h2>
          ${items.length
            ? `<ul class="bullets">${items.map((item, row_) => `<li data-at="${(0.25 + row_ * 0.18).toFixed(2)}">${escapeHtml(item)}</li>`).join("")}</ul>`
            : text ? `<p class="para" data-at="0.3">${escapeHtml(text)}</p>` : ""}`,
      };
    }),
    ctaScene(`Phúc gửi báo giá ${shortOf(car)}`, "Bình luận phiên bản", fileUrl(car.image),
      `Anh chị thích điểm nào nhất trên ${shortOf(car)}? Lưu video và bình luận phiên bản, Phúc gửi báo giá lăn bánh chi tiết.`),
  ];
  return {
    key: car.id,
    scenes,
    title: `ĐIỂM NỔI BẬT ${shortOf(car).toUpperCase()}`,
    caption: footerCaption([
      `${features.length} điểm nổi bật của ${car.name} 👇 ${showroom.slogan}`,
      `Giá từ ${num1(minPrice)} triệu${maxOffer ? `, ưu đãi tháng ${month} đến ${num1(maxOffer)} triệu` : ""}.`,
      "Bình luận phiên bản anh chị quan tâm, Phúc gửi báo giá lăn bánh.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #XeGiaDinh`,
      `👉 Xem xe: ${siteUrl}/xe/${car.slug}`,
    ]),
  };
}

// ---------- Mẫu: xe cũ ----------
function xeCu(used) {
  const title = `${used.name.replace(/^Mitsubishi /, "")}${used.name.includes(used.variant) ? "" : ` ${used.variant}`} ${used.modelYear}`;
  const km = `${used.mileage.toLocaleString("vi-VN")} km`;
  const images = used.images.map(fileUrl);
  const { paragraphs } = usedCarReview(used);
  const facts = [
    ["Năm sản xuất", String(used.modelYear)],
    ["Số km đã đi", km],
    ["Màu xe", used.color],
    ["Hộp số", used.transmission],
    ["Nhiên liệu", used.fuel],
    ["Đăng ký lần đầu", used.firstRegistration],
    ["Số chủ", used.owners],
    ["Xem xe tại", used.location],
  ].filter(([, value]) => value && String(value).trim());
  const financeable = usedCarFinanceable(used.modelYear);
  const usedPay = firstMonthPayment(used.price, usedFinancing);
  // Câu số km + câu so với xe mới (đoạn 2 và 3 của nhận xét); bỏ đoạn giới thiệu dòng xe cho video ngắn gọn
  const reviewLines = paragraphs.slice(1, 3).map((text) => text.replace(/\s*\(chưa trừ ưu đãi tháng\)/, "").replace(/; khi sang tên.*$/, "."));
  const photoScenes = images.slice(1, 4).map((src, index) => ({
    theme: "dark",
    backdrop: photo(src),
    contentTop: 1060,
    minSpeak: 3.2,
    voice: used.commitments[index] ?? (index === 0 ? used.description.split(/(?<=\.)\s/)[0] : `Xe đang có sẵn tại ${used.location || "showroom"}, anh chị qua xem trực tiếp.`),
    html: `<p class="kicker" data-at="0.02">${escapeHtml(title)}</p>
      <p class="para" data-at="0.15">${escapeHtml(used.commitments[index] ?? (index === 0 ? used.description.split(/(?<=\.)\s/)[0] : "Xe có sẵn, xem xe trực tiếp"))}</p>`,
  }));
  const scenes = [
    {
      theme: "dark",
      backdrop: photo(images[0]),
      contentTop: 1000,
      voice: `${title}, đã đi ${km}, giá ${trieu(used.price)}. Xe đã qua sử dụng chính hãng, đang có sẵn.`,
      html: `<p class="kicker" data-at="0.02">Xe đã qua sử dụng</p>
        <h2 class="big" data-at="0.05" style="font-size:72px">${escapeHtml(title)}</h2>
        <p class="price" data-at="0.2">${escapeHtml(trieu(used.price))}</p>
        <div class="chips" data-at="0.4"><span>${escapeHtml(km)}</span>${used.color ? `<span>${escapeHtml(used.color)}</span>` : ""}<span>${escapeHtml(used.transmission)}</span></div>`,
    },
    {
      theme: "light",
      minSpeak: 2 + facts.length * 0.6,
      voice: `Thông tin xe: ${facts.map(([label, value]) => `${lowerFirst(label)} ${value}`).join(", ")}.`,
      html: `${heading("", "Thông tin xe")}
        ${facts.map(([label, value], index) => row(label, value, 0.08 + index * (0.7 / facts.length), "small")).join("")}`,
    },
    ...photoScenes,
    {
      theme: "light",
      minSpeak: 7,
      voice: `Nhận xét của Phúc: ${reviewLines.join(" ")}`,
      html: `${heading("", "Nhận xét của Phúc")}
        ${reviewLines.map((text, index) => `<p class="para" data-at="${(0.1 + index * 0.4).toFixed(2)}" style="font-size:38px">${escapeHtml(text)}</p>`).join("")}
        ${note("Không thay cho việc xem và lái thử xe", 0.88)}`,
    },
    ...(financeable
      ? [{
          theme: "dark",
          voice: `Xe này trả góp được. Trả trước ${usedFinancing.downPaymentPercent}% khoảng ${trieu((used.price * usedFinancing.downPaymentPercent) / 100)}, vay ${usedFinancing.years} năm, góp tháng đầu khoảng ${trieu(usedPay)}. Ngân hàng thẩm định giá xe và hồ sơ.`,
          html: `${heading("", "Trả góp được")}
            <p class="sub serif" data-at="0">${escapeHtml(usedFinancing.bank)} ${usedFinancing.ratePercent.toLocaleString("vi-VN")}%/năm, ${usedFinancing.years} năm</p>
            ${row(`Trả trước ${usedFinancing.downPaymentPercent}%`, trieu((used.price * usedFinancing.downPaymentPercent) / 100), 0.15)}
            ${row("Góp tháng đầu", `~ ${trieu(usedPay)}`, 0.38)}
            ${box("Ngân hàng thẩm định xe", 0.62)}`,
        }]
      : []),
    {
      theme: "light",
      tail: 1.2,
      voice: `Xe còn hay không? Nhắn Zalo cho Phúc để giữ lịch xem xe và lái thử.`,
      html: `<h2 class="serif-title" data-at="0">Xe còn không anh?</h2>
        ${box("Nhắn Zalo xem xe", 0.15)}
        <div class="cars one" data-at="0.05" data-fx="car"><figure><img src="${images[0]}" style="object-fit:cover;height:520px;filter:none"></figure></div>
        <div class="contact" data-at="0.4"><b>Lưu Hoàng Phúc · Mitsubishi</b><span>Zalo ${escapeHtml(phone)}</span></div>
        <p class="fine" data-at="0.5">Xe đã qua sử dụng, tình trạng thực tế theo kiểm tra khi xem xe. Trả góp tham khảo, ngân hàng duyệt hồ sơ.</p>`,
    },
  ];
  return {
    key: used.slug.replace(/^mitsubishi-/, ""),
    scenes,
    title: `XE CŨ ${title.toUpperCase()}`,
    caption: `${title} – ${num1(used.price)} triệu, ${km} 👇
${used.description}

📞 Zalo ${phone} – Lưu Hoàng Phúc, Mitsubishi Moveo New City
👉 Xem ảnh và thông tin: ${siteUrl}/xe-cu/${used.slug}
#XeCu #Mitsubishi #${used.name.replace(/^Mitsubishi /, "").replace(/\s+/g, "")}Cu #OtoCuBinhDuong
`,
  };
}

// ---------- Mẫu: chọn xe theo ngân sách ----------
function chonXe() {
  const all = cars.flatMap((car) => car.variants.map((variant) => ({ car, ...variantData(car, variant) }))).sort((a, b) => a.net - b.net);
  const brackets = [
    [0, 500_000_000, "Dưới 500 triệu"],
    [500_000_000, 700_000_000, "500 – 700 triệu"],
    [700_000_000, 850_000_000, "700 – 850 triệu"],
    [850_000_000, Infinity, "Trên 850 triệu"],
  ]
    .map(([min, max, label]) => ({ label, list: all.filter((item) => item.net >= min && item.net < max) }))
    .filter((bracket) => bracket.list.length);
  const scenes = [
    {
      theme: "dark",
      voice: `Có bao nhiêu tiền thì mua được Mitsubishi nào? Tính giá lăn bánh tại ${provinceShort(province)}, đã trừ ưu đãi tháng ${currentPromotion.month}, từ ${trieu(all[0].net)} đến ${trieu(all[all.length - 1].net)}.`,
      html: `${heading("", "Có bao nhiêu tiền")}
        <p class="sub serif" data-at="0">thì mua được Mitsubishi nào?</p>
        <div class="cars two" data-at="0.05" data-fx="car"><figure><img src="${all[0].hero}"></figure><figure><img src="${all[all.length - 1].hero}"></figure></div>
        ${box(`Từ ${trieu(all[0].net)}`, 0.5)}
        ${note(`Lăn bánh ${provinceShort(province)}, đã trừ ưu đãi tháng ${month}`, 0.72)}`,
    },
    // Khoảng có nhiều bản (vd 500–700 triệu có 7 bản): bỏ ảnh xe, tối đa 7 dòng một cảnh, nhiều hơn thì sang cảnh sau
    ...brackets.flatMap((bracket, index) => {
      const pages = [];
      for (let i = 0; i < bracket.list.length; i += 7) pages.push(bracket.list.slice(i, i + 7));
      return pages.map((shown, pageIndex) => ({
        theme: "light",
        minSpeak: 2 + shown.length * 0.8,
        voice: `${pageIndex ? "Tiếp theo" : bracket.label}: ${shown.map((item) => `${item.label} ${trieu(item.net)}`).join(", ")}.`,
        html: `${heading(index + 1, bracket.label)}
          <p class="sub serif" data-at="0">lăn bánh sau ưu đãi${pages.length > 1 ? ` (${pageIndex + 1}/${pages.length})` : ""}</p>
          ${shown.length <= 4 ? oneCar({ hero: shown[0].hero }, 0.02, "", "compact") : ""}
          ${shown.map((item, row_) => row(item.label, tr(item.net), 0.12 + row_ * (0.65 / shown.length), "small")).join("")}`,
      }));
    }),
    ctaScene("Phúc tư vấn bản hợp nhu cầu", "Bình luận ngân sách của bạn", all[all.length - 1].hero,
      `Ngân sách của anh chị khoảng bao nhiêu? Lưu video và bình luận, Phúc tư vấn phiên bản hợp nhu cầu và gửi bảng lăn bánh.`),
  ];
  return {
    key: `${String(currentPromotion.month).padStart(2, "0")}-${currentPromotion.year}`,
    scenes,
    title: `CHỌN XE THEO NGÂN SÁCH THÁNG ${month}`,
    caption: footerCaption([
      "Có bao nhiêu tiền thì mua được Mitsubishi nào? 👇",
      `Lăn bánh sau ưu đãi từ ${num1(all[0].net)} triệu.`,
      "Bình luận ngân sách của anh chị, Phúc tư vấn phiên bản hợp nhu cầu.",
      "#Mitsubishi #ChonXe #XeGiaDinh #MuaXeLanDau",
    ]),
  };
}

// ---------- Dùng chung cho 4 mẫu giới thiệu ----------
const categoryLabel = { SUV: "SUV", MPV: "MPV", Sedan: "Sedan", Pickup: "Bán tải" };
const topVariant = (car) => [...car.variants].sort((a, b) => b.price - a.price)[0];
const galleryImages = (car, kind) => {
  const dir = path.join(root, "public/images/cars", car.id, "gallery", kind);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((file) => /\.(jpe?g|png|webp)$/i.test(file)).sort().map((file) => fileUrl(`images/cars/${car.id}/gallery/${kind}/${file}`)) : [];
};
// Bảo hành tiêu chuẩn theo trang Hỏi đáp (/ho-tro/cau-hoi-thuong-gap)
const warrantyOf = (car) => (["triton", "destinator"].includes(car.id) ? "5 năm hoặc 150.000 km" : "3 năm hoặc 100.000 km");
const specOf = (car, key) => topVariant(car).specifications?.[key];
const chunk = (list, size) => Array.from({ length: Math.ceil(list.length / size) }, (_, index) => list.slice(index * size, (index + 1) * size));

// ---------- Mẫu: nội thất, ngoại thất ----------
function noiNgoaiThat(car) {
  const top = topVariant(car);
  const exterior = galleryImages(car, "exterior");
  const interior = galleryImages(car, "interior");
  if (!exterior.length && !interior.length) {
    console.error(`${car.name} chưa có ảnh trong public/images/cars/${car.id}/gallery/.`);
    process.exit(1);
  }
  const exteriorItems = top.equipment?.exterior ?? [];
  const interiorItems = [...(top.equipment?.interior ?? []), ...(top.equipment?.convenience ?? [])];
  const photoScenes = (images, items, kicker) => {
    const groups = chunk(items, Math.max(2, Math.ceil(items.length / Math.max(images.length, 1))));
    return images.map((src, index) => {
      const list = (groups[index] ?? []).slice(0, 3);
      return {
        theme: "dark",
        backdrop: photo(src),
        contentTop: 1040,
        minSpeak: 3.5,
        voice: list.length ? `${kicker}: ${list.map(lowerFirst).join(", ")}.` : `${kicker} ${shortOf(car)}.`,
        html: `<p class="kicker" data-at="0.02">${escapeHtml(kicker)} · ${index + 1}/${images.length}</p>
          ${list.length ? `<ul class="bullets">${list.map((item, row_) => `<li data-at="${(0.12 + row_ * 0.22).toFixed(2)}">${escapeHtml(item)}</li>`).join("")}</ul>` : ""}`,
      };
    });
  };
  const dims = [["Kích thước D × R × C", specOf(car, "dimensions")], ["Chiều dài cơ sở", specOf(car, "wheelbase")], ["Khoảng sáng gầm", specOf(car, "groundClearance")], ["Mâm xe", specOf(car, "wheels")?.split(" - ").pop()]].filter(([, value]) => value);
  const scenes = [
    {
      theme: "dark",
      backdrop: photo(exterior[0] ?? interior[0]),
      contentTop: 1040,
      voice: `Cùng xem ngoại thất và nội thất ${car.name}${top.name !== shortOf(car) ? `, bản ${top.name}` : ""}.`,
      html: `<p class="kicker" data-at="0.02">Mitsubishi</p>
        <h2 class="big" data-at="0.05">${escapeHtml(shortOf(car))}</h2>
        <p class="sub serif" data-at="0.15">Ngoại thất & nội thất</p>
        <div class="chips" data-at="0.35"><span>${escapeHtml(categoryLabel[car.category] ?? car.category)}</span><span>${specOf(car, "seats") ?? car.specifications.seats} chỗ</span></div>`,
    },
    // Ảnh đầu đã dùng ở cảnh mở đầu: các cảnh ngoại thất bắt đầu từ ảnh thứ hai (nếu còn đủ ảnh)
    ...photoScenes(exterior.length > 2 ? exterior.slice(1) : exterior, exteriorItems, "Ngoại thất"),
    ...(dims.length
      ? [{
          theme: "light",
          voice: `Kích thước: ${dims.map(([label, value]) => `${lowerFirst(label)} ${value}`).join(", ")}.`,
          html: `${heading("", "Kích thước")}
            ${dims.map(([label, value], index) => row(label, value, 0.1 + index * 0.17, "small")).join("")}`,
        }]
      : []),
    ...photoScenes(interior, interiorItems, "Nội thất"),
    ...(car.colors?.length
      ? [{
          theme: "light",
          voice: `${shortOf(car)} có ${car.colors.length} màu: ${car.colors.join(", ")}. Anh chị thích màu nào?`,
          html: `${heading("", `${car.colors.length} màu xe`)}
            ${oneCar({ hero: fileUrl(car.image) }, 0.02, "", "compact")}
            <div class="chips" data-at="0.3">${car.colors.map((color) => `<span>${escapeHtml(color)}</span>`).join("")}</div>`,
        }]
      : []),
    ctaScene(`Phúc gửi ảnh thật ${shortOf(car)} tại showroom`, "Bình luận màu bạn thích", fileUrl(car.image),
      `Anh chị thích màu nào? Lưu video và bình luận, Phúc gửi ảnh thật và báo giá ${shortOf(car)}.`),
  ];
  return {
    key: car.id,
    scenes,
    title: `NỘI THẤT, NGOẠI THẤT ${shortOf(car).toUpperCase()}`,
    caption: footerCaption([
      `Ngoại thất, nội thất ${car.name} 👇`,
      `Bản ${top.name}: ${[...exteriorItems.slice(0, 2), ...interiorItems.slice(0, 2)].join(", ")}.`,
      "Bình luận màu anh chị thích, Phúc gửi ảnh thật tại showroom.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #NoiThat #NgoaiThat`,
      `👉 Xem xe: ${siteUrl}/xe/${car.slug}`,
    ]),
  };
}

// ---------- Mẫu: giới thiệu xe ----------
function gioiThieu(car) {
  const top = topVariant(car);
  const showroom = showrooms[car.id];
  const variants = [...car.variants].sort((a, b) => a.price - b.price).map((variant) => variantData(car, variant));
  const maxOffer = Math.max(...variants.map((variant) => variant.offer));
  const spec = (key) => specOf(car, key);
  const kind = `${categoryLabel[car.category] ?? car.category} ${spec("seats") ?? car.specifications.seats} chỗ`;
  const basics = [["Kiểu xe", kind], ["Động cơ", spec("engine")], ["Hộp số", spec("transmission")], ["Dẫn động", spec("drivetrain")], ["Nhiên liệu", spec("fuel")]].filter(([, value]) => value);
  const sizes = [["Dài × rộng × cao", spec("dimensions")], ["Chiều dài cơ sở", spec("wheelbase")], ["Khoảng sáng gầm", spec("groundClearance")], ["Bán kính quay vòng", spec("turningRadius")], ["Bình nhiên liệu", spec("fuelTank")]].filter(([, value]) => value);
  const power = [["Công suất", spec("power")], ["Mô-men xoắn", spec("torque")], ["Tiêu hao kết hợp", spec("fuelConsumptionCombined")]].filter(([, value]) => value);
  const notable = [
    ...(top.safetyTechnologies ?? []).map((tech) => tech.name).filter((name) => /thích ứng|va chạm|điểm mù|lệch làn|360/i.test(name)),
    ...(top.equipment?.safety ?? []).filter((name) => /túi khí|360/i.test(name)),
    ...(top.equipment?.convenience ?? []).slice(0, 2),
  ].filter((item, index, list) => list.indexOf(item) === index).slice(0, 4);
  const spoken = (value) => String(value).split(" / ")[0];
  const scenes = [
    {
      theme: "dark",
      backdrop: photo(fileUrl(showroom?.mobilePoster ?? car.image)),
      contentTop: 1030,
      voice: `Giới thiệu ${car.name}${showroom ? `: ${showroom.slogan}` : ""}. ${car.shortDescription}`,
      html: `<p class="kicker" data-at="0.02">Giới thiệu xe</p>
        <h2 class="big" data-at="0.05">${escapeHtml(car.name)}</h2>
        ${showroom ? `<p class="sub serif" data-at="0.12">${escapeHtml(showroom.slogan)}</p>` : ""}
        <p class="para" data-at="0.3" style="font-size:36px">${escapeHtml(car.shortDescription)}</p>`,
    },
    {
      theme: "light",
      voice: `${shortOf(car)} là ${lowerFirst(kind)}, ${basics.slice(1).map(([label, value]) => `${lowerFirst(label)} ${spoken(value)}`).join(", ")}.`,
      html: `${heading(1, "Xe gì?")}
        ${oneCar({ hero: fileUrl(car.image) }, 0.02, "", "compact")}
        ${basics.map(([label, value], index) => row(label, value, 0.1 + index * (0.7 / basics.length), "small")).join("")}`,
    },
    ...(sizes.length
      ? [{
          theme: "light",
          voice: `Kích thước: ${sizes.filter(([label]) => !label.startsWith("Dài")).map(([label, value]) => `${lowerFirst(label)} ${value}`).join(", ")}.`,
          html: `${heading(2, "Kích thước")}
            ${sizes.map(([label, value], index) => row(label, value, 0.08 + index * (0.7 / sizes.length), "small")).join("")}`,
        }]
      : []),
    ...(power.length
      ? [{
          theme: "dark",
          voice: `Vận hành: ${power.map(([label, value]) => `${lowerFirst(label)} ${spoken(value)}`).join(", ")}.`,
          html: `${heading(3, "Vận hành")}
            <p class="sub serif" data-at="0">${escapeHtml(spec("engine") ?? "")}</p>
            ${power.map(([label, value], index) => row(label, value, 0.12 + index * 0.2, "small")).join("")}`,
        }]
      : []),
    ...(notable.length
      ? [{
          theme: "dark",
          backdrop: showroom?.highlight?.image ? photo(fileUrl(showroom.highlight.image)) : showroom?.features?.[0] ? photo(fileUrl(showroom.features[0].image)) : "",
          contentTop: 1000,
          voice: `Trang bị nổi bật trên bản ${top.name}: ${notable.map(lowerFirst).join(", ")}.`,
          html: `<p class="kicker" data-at="0.02">4 · Trang bị nổi bật</p>
            <p class="sub serif" data-at="0.05">bản ${escapeHtml(top.name)}</p>
            <ul class="bullets">${notable.map((item, index) => `<li data-at="${(0.15 + index * 0.18).toFixed(2)}">${escapeHtml(item)}</li>`).join("")}</ul>`,
        }]
      : []),
    {
      theme: "light",
      minSpeak: 2 + variants.length * 0.8,
      voice: `${variants.length > 1 ? `${variants.length} phiên bản` : "Giá niêm yết"}: ${variants.map((variant) => `${variant.name === shortOf(car) ? "" : `${variant.name} `}${trieu(variant.price)}`).join(", ")}.${maxOffer ? ` Ưu đãi tháng ${currentPromotion.month} đến ${trieu(maxOffer)}.` : ""}`,
      html: `${heading(5, variants.length > 1 ? `${variants.length} phiên bản` : "Giá xe")}
        <p class="sub serif" data-at="0">giá niêm yết</p>
        ${variants.map((variant, index) => row(variant.name, trieu(variant.price), 0.1 + index * (0.55 / variants.length), variants.length > 2 ? "small" : "")).join("")}
        ${maxOffer ? box(`Ưu đãi đến ${trieu(maxOffer)}`, 0.72) : ""}`,
    },
    {
      theme: "light",
      voice: `Bảo hành chính hãng ${warrantyOf(car)}, tùy điều kiện nào đến trước.`,
      html: `${heading(6, "Bảo hành")}
        ${box(warrantyOf(car), 0.15, "black")}
        ${note("Chính hãng, điều kiện nào đến trước", 0.45)}`,
    },
    ctaScene(`Phúc gửi báo giá ${shortOf(car)}`, "Bình luận phiên bản", fileUrl(car.image),
      `Anh chị muốn tìm hiểu thêm về ${shortOf(car)}? Lưu video và bình luận phiên bản, Phúc gửi báo giá và mời lái thử.`),
  ];
  return {
    key: car.id,
    scenes,
    title: `GIỚI THIỆU ${car.name.toUpperCase()}`,
    caption: footerCaption([
      `Giới thiệu ${car.name}${showroom ? `: ${showroom.slogan}` : ""} 👇`,
      `${kind}, giá từ ${num1(variants[0].price)} triệu, bảo hành ${warrantyOf(car)}.`,
      "Bình luận phiên bản anh chị quan tâm, Phúc gửi báo giá và mời lái thử.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #XeMoi`,
      `👉 Xem xe: ${siteUrl}/xe/${car.slug}`,
    ]),
  };
}

// ---------- Mẫu: chi phí khi mua xe (bắt buộc / không bắt buộc) ----------
function chiPhi(car) {
  const v = variantData(car, chooseVariant(car));
  const isPickup = car.name === "Mitsubishi Triton";
  const fees = v.feeList;
  const shortFee = (label) => label.replace("Lệ phí trước bạ theo giá niêm yết", "Trước bạ").replace("Lệ phí đăng ký & biển số", "Đăng ký, biển số").replace("Phí đường bộ (12 tháng)", "Đường bộ 12 tháng").replace("Bảo hiểm TNDS bắt buộc", "Bảo hiểm TNDS");
  const [firstHalf, secondHalf] = [fees.slice(0, 3), fees.slice(3)];
  const optional = [
    ["Bảo hiểm vật chất", "Nên có. Vay ngân hàng thường phải mua"],
    ["Phụ kiện", isPickup ? "Nắp thùng, phim cách nhiệt, camera hành trình…" : "Phim cách nhiệt, camera hành trình, lót sàn…"],
    ["Phủ gầm, phủ ceramic", "Tùy nhu cầu, chống gỉ và giữ sơn"],
    ["Bảo hành mở rộng", ["triton", "destinator"].includes(car.id) ? `Chưa cần, đã có ${warrantyOf(car)}` : `Mua thêm khi hết ${warrantyOf(car)}`],
  ];
  const scenes = [
    {
      theme: "dark",
      voice: `Mua ${v.label} hết bao nhiêu tiền? Ngoài giá xe ${trieu(v.price)}, có ${fees.length} khoản bắt buộc khoảng ${trieu(v.fees)}, và vài khoản không bắt buộc. Cùng xem khoản nào bắt buộc, khoản nào không.`,
      html: `${heading("", `Mua ${shortOf(car)} hết bao nhiêu?`)}
        <p class="sub serif" data-at="0">khoản nào bắt buộc, khoản nào không</p>
        ${oneCar(v, 0.02, v.label, "compact")}
        ${row("Giá xe", trieu(v.price), 0.3)}
        ${row(`${fees.length} khoản bắt buộc`, `+ ${trieu(v.fees)}`, 0.48)}
        ${box(`Lăn bánh ${trieu(v.onRoad)}`, 0.68, "black")}`,
    },
    {
      theme: "light",
      voice: `Bắt buộc, phần một: ${firstHalf.map((fee) => `${lowerFirst(shortFee(fee.label)).replace(/\s*\((.*)\)/, " $1")} ${money(fee.value)}`).join(", ")}.`,
      html: `${heading(1, "Bắt buộc (1/2)")}
        <p class="sub serif" data-at="0">nộp khi đăng ký xe tại ${escapeHtml(provinceShort(province))}</p>
        ${firstHalf.map((fee, index) => row(shortFee(fee.label), money(fee.value), 0.12 + index * 0.2, "small")).join("")}
        ${note(isPickup ? "Bán tải chở hàng: trước bạ 60% mức ô tô con" : "Trước bạ tính trên giá niêm yết", 0.8)}`,
    },
    {
      theme: "light",
      voice: `Bắt buộc, phần hai: ${secondHalf.map((fee) => `${lowerFirst(shortFee(fee.label))} ${money(fee.value)}`).join(", ")}. Tổng ${fees.length} khoản bắt buộc khoảng ${trieu(v.fees)}.`,
      html: `${heading(1, "Bắt buộc (2/2)")}
        ${secondHalf.map((fee, index) => row(shortFee(fee.label), money(fee.value), 0.12 + index * 0.2, "small")).join("")}
        ${box(`Tổng bắt buộc ~ ${trieu(v.fees)}`, 0.62)}
        ${note("Không có phí dịch vụ đăng ký", 0.85)}`,
    },
    ...(isPickup
      ? [{
          theme: "dark",
          voice: `Vì sao Triton ít phí hơn xe con? Bán tải chở hàng chỉ tính trước bạ 60%, biển số tại TP.HCM ${money(plateFeeByArea.pickup.I)} thay vì ${money(plateFeeByArea.car.I)}. Đổi lại phí đường bộ tính theo xe tải.`,
          html: `${heading(2, "Vì sao Triton ít phí?")}
            <p class="sub serif" data-at="0">bán tải chở hàng</p>
            ${row("Trước bạ", "60% mức xe con", 0.15, "small")}
            ${row("Biển số HN, TP.HCM", `${money(plateFeeByArea.pickup.I)}`, 0.32, "small")}
            ${row("Xe con cùng nơi", money(plateFeeByArea.car.I), 0.45, "small")}
            ${box("Đường bộ tính theo xe tải", 0.65)}`,
        }]
      : []),
    {
      theme: "light",
      minSpeak: 7,
      voice: `Các khoản không bắt buộc. ${optional.map(([name, why]) => `${name}: ${lowerFirst(why).replace(/…$/, "")}.`).join(" ").replace(/\.\./g, ".")}`,
      html: `${heading(isPickup ? 3 : 2, "Không bắt buộc")}
        <div class="table" style="width:940px">${optional
          .map(
            ([name, why], index) => `<div class="spec" data-at="${(0.1 + index * 0.18).toFixed(2)}" style="width:940px;text-align:left"><div class="vals" style="grid-template-columns:1fr"><b style="font-size:48px">${escapeHtml(name)}</b></div><i style="text-align:left;font-size:34px">${escapeHtml(why)}</i></div>`
          )
          .join("")}</div>`,
    },
    ...(v.offer
      ? [{
          theme: "dark",
          voice: `Cuối cùng, ưu đãi tháng ${currentPromotion.month} khoảng ${trieu(v.offer)} được trừ trực tiếp vào giá xe khi ký hợp đồng. ${v.label} lăn bánh còn khoảng ${trieu(v.net)}, chưa gồm các khoản không bắt buộc.`,
          html: `${heading("", "Sau ưu đãi")}
            ${row("Lăn bánh", trieu(v.onRoad), 0.12)}
            ${row("Ưu đãi", `– ${trieu(v.offer)}`, 0.3)}
            ${box(`Còn ${trieu(v.net)}`, 0.55)}
            ${note("Chưa gồm khoản không bắt buộc", 0.78)}`,
        }]
      : []),
    ctaScene("Phúc gửi bảng chi phí đầy đủ", "Bình luận tỉnh của bạn", v.hero,
      `Lưu video và bình luận tỉnh đăng ký, Phúc gửi bảng chi phí đầy đủ cả khoản bắt buộc và không bắt buộc.`),
  ];
  return {
    key: `${car.id}-${slugWords(v.name).join("-")}`,
    scenes,
    title: `CHI PHÍ KHI MUA ${v.label.toUpperCase()}`,
    caption: footerCaption([
      `Mua ${v.label} gồm những phí nào? Khoản nào bắt buộc, khoản nào không 👇`,
      `${fees.length} khoản bắt buộc ~${num1(v.fees)} triệu tại ${provinceShort(province)}.`,
      "Bình luận tỉnh đăng ký, Phúc gửi bảng chi phí đầy đủ.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #LanBanh #ChiPhiMuaXe`,
    ]),
  };
}

// ---------- Mẫu: phụ kiện nên lắp ----------
// Ảnh phụ kiện: scripts/video-assets/phu-kien/<id xe>/<id gợi ý>.jpg (hoặc .../chung/<id gợi ý>.jpg dùng cho mọi xe).
// Gợi ý chưa có ảnh thì cảnh dùng khung chữ; tool in ra tên file ảnh còn thiếu.
const accessoryPhotoDir = path.join(root, "scripts/video-assets/phu-kien");
function accessoryPhoto(carId, id) {
  for (const folder of [carId, "chung"]) {
    for (const ext of ["jpg", "jpeg", "png", "webp"]) {
      const file = path.join(accessoryPhotoDir, folder, `${id}.${ext}`);
      if (fs.existsSync(file)) return pathToFileURL(file).href;
    }
  }
  return null;
}
const accessoryIdeas = {
  triton: [
    { id: "nap-thung", title: "Nắp thùng", why: "Che mưa nắng cho hàng hóa, khóa được, xe gọn dáng", test: /^Nắp/ },
    { id: "thanh-the-thao", title: "Thanh thể thao", why: "Dáng xe thể thao, chắn cho kính sau khi chở hàng", test: /Thanh thể thao|stylingbar|Khung (thể thao|ống)/ },
    { id: "ty-bung-thung", title: "Ty nâng hạ bửng thùng", why: "Đóng mở bửng thùng nhẹ tay, không đập mạnh", test: /Ty hỗ trợ/ },
  ],
};
// Nhóm phụ kiện trên web gộp nhiều loại (vd "Camera hành trình, giám sát hành trình"), nên mỗi gợi ý có
// `only` (tên phải khớp) và `exclude` (tên bị loại) để không lẫn: giám sát hành trình (hộp đen) không phải camera,
// bơm lốp không phải cảm biến áp suất lốp, thảm taplo không phải lót sàn, phim PPF không phải phim cách nhiệt.
const commonIdeas = [
  { id: "phim-cach-nhiet", title: "Phim cách nhiệt", why: "Giảm nóng cabin, chống tia UV, bảo vệ nội thất", group: "Phim cách nhiệt", brands: true, exclude: /PPF/i },
  { id: "camera-hanh-trinh", title: "Camera hành trình", why: "Lưu hình ảnh đường đi, có bằng chứng khi va chạm", category: "Camera hành trình, giám sát hành trình", only: /^(Cam|Camera) hành trình/i, exclude: /giám sát hành trình|hộp đen/i },
  { id: "lot-san", title: "Lót sàn", why: "Dễ vệ sinh, giữ sàn xe sạch khi đi mưa", category: "Lót sàn, thảm", ownGroup: true, exclude: /taplo/i },
  { id: "phu-gam", title: "Phủ gầm", why: "Chống gỉ sét, giảm ồn từ gầm, hợp đường ngập", category: "Phủ gầm" },
  { id: "cam-bien-ap-suat-lop", title: "Cảm biến áp suất lốp", why: "Báo non hơi, thủng lốp sớm", category: "Cảm biến áp suất lốp, bơm lốp", skipIfStandard: /áp suất lốp/i, only: /áp suất lốp/i, exclude: /bơm/i },
];
function phuKien(car) {
  const seats = specOf(car, "seats") ?? car.specifications.seats;
  const fits = (item) => !item.seats || item.seats === seats || (seats > 5 && item.seats === 7) || (seats <= 5 && item.seats === 5);
  const groupKey = car.id === "xpander-cross" ? "xpander" : car.id;
  const ownGroup = accessoryGroups.find((group) => group.carId === groupKey);
  const general = accessoryGroups.filter((group) => !group.carId);
  const allVariantsHave = (pattern) => car.variants.every((variant) => [...(variant.equipment?.safety ?? []), ...(variant.equipment?.convenience ?? [])].some((item) => pattern.test(item)));
  const clean = (name) => name.replace(/\s+–\s+Vy Khang$/, "").replace(new RegExp(`\\s*${shortOf(car).split(" ")[0]}\\s*$`), "").trim();
  const ideas = [...(accessoryIdeas[car.id] ?? []), ...commonIdeas]
    .map((idea) => {
      if (idea.skipIfStandard && allVariantsHave(idea.skipIfStandard)) return null;
      let items = [];
      if (idea.test && ownGroup) items = ownGroup.items.filter((item) => idea.test.test(item.name));
      else if (idea.ownGroup && ownGroup) items = categorizeGroup(ownGroup).find((cat) => cat.name === idea.category)?.items ?? [];
      else if (idea.brands) items = categorizeGroup(general.find((group) => group.name === idea.group)).map((cat) => ({ name: cat.name, price: null }));
      else for (const group of general) items.push(...(categorizeGroup(group).find((cat) => cat.name === idea.category)?.items ?? []));
      items = items
        .filter((item) => !("seats" in item) || fits(item))
        .filter((item) => (!idea.only || idea.only.test(item.name)) && (!idea.exclude || !idea.exclude.test(item.name)));
      if (!items.length) return null;
      return { ...idea, items, image: accessoryPhoto(car.id, idea.id) };
    })
    .filter(Boolean)
    .slice(0, 6);
  const mmv = (ownGroup?.items ?? []).filter((item) => / – MMV$/.test(item.name) && item.price);
  const missing = ideas.filter((idea) => !idea.image).map((idea) => `${idea.id}.jpg`);
  if (missing.length) console.log(`  Chưa có ảnh (thêm vào scripts/video-assets/phu-kien/${car.id}/): ${missing.join(", ")}`);
  const ideaScene = (idea, index) => {
    // Ví dụ: bỏ tiền tố trùng tên gợi ý ("Cam hành trình Vietmap TS-C1L" → "Vietmap TS-C1L"), mỗi hãng một mẫu cho đa dạng,
    // "– MMV" đọc thành "chính hãng MMV"
    // Chỉ camera và cảm biến áp suất lốp có tên bắt đầu bằng loại + hãng, nên mới bỏ tiền tố và chọn mỗi hãng một mẫu
    const brandLed = ["camera-hanh-trinh", "cam-bien-ap-suat-lop"].includes(idea.id);
    const prefix = /^(Cam hành trình|Camera hành trình|Cảm biến áp suất lốp)\s+/i;
    const named = idea.items.map((item) => clean(item.name).replace(/\s+–\s+MMV$/, " chính hãng MMV").replace(brandLed ? prefix : /^$/, "").trim());
    const seen = new Set();
    const diverse = brandLed ? named.filter((name) => { const brand = name.split(/[\s-]/)[0].toLowerCase(); if (seen.has(brand)) return false; seen.add(brand); return true; }) : [];
    const examples = [...diverse, ...named]
      .filter((name, i, list) => list.indexOf(name) === i)
      .slice(0, 4);
    // Tên hãng (Ntech, 3M, Vietmap...) giữ chữ hoa; tên chung ("lót sàn 5D") viết thường khi đọc giữa câu
    const speakName = (name) => (/^[A-Z0-9]/.test(name) && !/^(Lót|Nắp|Thanh|Ty|Khung|Phủ|Ốp|Thảm)/.test(name) ? name : lowerFirst(name));
    const voice = `${index + 1}. ${idea.title}: ${lowerFirst(idea.why)}. Có các loại như ${examples.slice(0, 3).map(speakName).join(", ")}.`;
    if (idea.image) {
      return {
        theme: "dark", backdrop: photo(idea.image), contentTop: 1000, minSpeak: 4, voice,
        html: `<p class="kicker" data-at="0.02">${index + 1} · Nên lắp</p>
          <h2 class="big" data-at="0.05" style="font-size:72px">${escapeHtml(idea.title)}</h2>
          <p class="para" data-at="0.2">${escapeHtml(idea.why)}</p>
          <div class="chips" data-at="0.45">${examples.map((name) => `<span style="font-size:28px">${escapeHtml(name)}</span>`).join("")}</div>`,
      };
    }
    // Chưa có ảnh phụ kiện: cảnh chữ lớn, số thứ tự to, danh sách các loại
    return {
      theme: index % 2 ? "dark" : "light", contentTop: 380, minSpeak: 4.5, voice,
      html: `<p class="kicker" data-at="0.02">Nên lắp</p>
        <p class="price" data-at="0.04" style="font-size:200px">${index + 1}</p>
        <h2 class="big" data-at="0.08" style="font-size:88px">${escapeHtml(idea.title)}</h2>
        <p class="para" data-at="0.22" style="font-size:44px">${escapeHtml(idea.why)}</p>
        <ul class="bullets" style="margin-top:40px">${examples.map((name, row_) => `<li data-at="${(0.4 + row_ * 0.12).toFixed(2)}" style="font-size:38px">${escapeHtml(name)}</li>`).join("")}</ul>`,
    };
  };
  const scenes = [
    {
      theme: "dark",
      backdrop: showrooms[car.id]?.accessoriesImage ? photo(fileUrl(showrooms[car.id].accessoriesImage)) : photo(fileUrl(car.image)),
      contentTop: 1040,
      voice: `Mua ${shortOf(car)} nên lắp thêm phụ kiện gì? Phúc gợi ý ${ideas.length} món đáng tiền${mmv.length ? `, và ${mmv.length} phụ kiện chính hãng MMV` : ""}.`,
      html: `<p class="kicker" data-at="0.02">Phụ kiện</p>
        <h2 class="big" data-at="0.05" style="font-size:70px">Mua ${escapeHtml(shortOf(car))} nên lắp gì?</h2>
        <p class="sub serif" data-at="0.2">${ideas.length} món đáng tiền</p>`,
    },
    ...ideas.map(ideaScene),
    ...(mmv.length
      ? chunk(mmv, 5).map((page, pageIndex, pages) => ({
          theme: "light",
          minSpeak: 2 + page.length * 0.8,
          voice: `${pageIndex ? "Tiếp theo" : `Phụ kiện chính hãng MMV cho ${shortOf(car)}`}: ${page.map((item) => `${lowerFirst(item.name.replace(/\s+–\s+MMV$/, ""))} ${trieu(item.price)}`).join(", ")}.`,
          html: `${heading("", "Chính hãng MMV")}
            <p class="sub serif" data-at="0">giá niêm yết đã gồm VAT${pages.length > 1 ? ` (${pageIndex + 1}/${pages.length})` : ""}</p>
            ${page.map((item, index) => row(item.name.replace(/\s+–\s+MMV$/, ""), trieu(item.price), 0.1 + index * (0.65 / page.length), "small")).join("")}`,
        }))
      : []),
    ctaScene("Phúc gửi bảng giá phụ kiện", "Bình luận món bạn cần", fileUrl(car.image),
      `Anh chị muốn lắp món nào? Lưu video và bình luận, Phúc gửi bảng giá phụ kiện cho ${shortOf(car)}.`),
  ];
  return {
    key: car.id,
    scenes,
    title: `PHỤ KIỆN NÊN LẮP CHO ${shortOf(car).toUpperCase()}`,
    caption: footerCaption([
      `Mua ${shortOf(car)} nên lắp thêm phụ kiện gì? 👇`,
      ideas.map((idea) => idea.title).join(" · "),
      "Bình luận món anh chị cần, Phúc gửi bảng giá phụ kiện.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #PhuKienOto`,
      `👉 Bảng phụ kiện: ${siteUrl}/phu-kien-xe-mitsubishi#${car.id}`,
    ]),
  };
}

// ---------- Mẫu: tư vấn chọn phiên bản ----------
// Mỗi bản: giá + sau ưu đãi, lên từ bản thấp hơn thì thêm gì (trang bị, hộp số, dẫn động, mâm), hợp với ai.
// "Hợp với ai" suy ra từ số liệu (số sàn, 2 cầu, an toàn chủ động, rẻ nhất...), là gợi ý tư vấn, không khẳng định "nhất".
const allItemsOf = (variant) => {
  const items = [];
  for (const key of ["safety", "drivingSupport", "convenience", "interior", "exterior"]) items.push(...(variant.equipment?.[key] ?? []));
  for (const tech of variant.safetyTechnologies ?? []) items.push(tech.name);
  return [...new Set(items)];
};
const isManual = (variant) => /số sàn|MT\b/i.test(`${variant.specifications?.transmission ?? ""} ${variant.name}`);
const isFourWheel = (variant) => /4WD|2 cầu|hai cầu|Super Select/i.test(`${variant.specifications?.drivetrain ?? ""} ${variant.name}`);
const hasActiveSafety = (variant) => (variant.safetyTechnologies ?? []).some((tech) => /thích ứng|va chạm/i.test(tech.name));
function personaOf(variant, index, list) {
  const top = index === list.length - 1;
  if (isManual(variant)) return "Chạy dịch vụ, quen số sàn, cần giá thấp";
  if (isFourWheel(variant)) return top && hasActiveSafety(variant) ? "Cần 2 cầu và đủ an toàn chủ động" : "Đi công trình, đường đồi núi, cần 2 cầu";
  if (top && hasActiveSafety(variant)) return "Đi đường dài, cần an toàn chủ động";
  if (list.slice(0, index).every(isManual)) return variant.__pickup ? "Chở hàng, đi phố, tối ưu ngân sách" : "Gia đình đi phố, tối ưu ngân sách";
  return top ? "Muốn đủ tiện nghi của dòng xe" : "Cân bằng giá và trang bị";
}
function chonPhienBan(car) {
  const list = [...car.variants].sort((a, b) => a.price - b.price).map((variant) => ({ ...variant, __pickup: car.category === "Pickup" }));
  if (list.length < 2) return null;
  const data = list.map((variant) => variantData(car, variant));
  const specKeys = [["transmission", "Hộp số"], ["drivetrain", "Dẫn động"], ["wheels", "Mâm"], ["power", "Công suất"]];
  const steps = list.map((variant, index) => {
    if (index === 0) return { added: [], specs: [] };
    const before = new Set(allItemsOf(list[index - 1]));
    const added = allItemsOf(variant).filter((item) => !before.has(item));
    const specs = specKeys
      .map(([key, label]) => [label, list[index - 1].specifications?.[key], variant.specifications?.[key]])
      .filter(([, a, b]) => b && a !== b)
      .map(([label, , b]) => {
        const value = String(b).split(" - ").pop().split(" / ")[0];
        return label === "Mâm" ? value : `${label} ${value}`;
      })
      // Bỏ thông số đã có trong tên trang bị ("Dẫn động Super Select 4WD-II" trùng "Hệ dẫn động Super Select 4WD-II")
      .filter((text) => !added.some((item) => item.toLowerCase().includes(text.split(" ").slice(-2).join(" ").toLowerCase())));
    return { added, specs };
  });
  const personas = list.map((variant, index) => personaOf(variant, index, list));
  const scenes = [
    {
      theme: "dark",
      voice: `${shortOf(car)} có ${list.length} phiên bản, chênh nhau ${trieu(list[list.length - 1].price - list[0].price)}. Chọn bản nào cho đúng nhu cầu? Cùng phân tích từng bản.`,
      html: `${heading("", `${shortOf(car)}: chọn bản nào?`)}
        <p class="sub serif" data-at="0">${list.length} phiên bản, giá niêm yết</p>
        ${oneCar({ hero: fileUrl(car.image) }, 0.02, "", "compact")}
        ${data.map((variant, index) => row(variant.name, trieu(variant.price), 0.25 + index * (0.5 / data.length), "small")).join("")}`,
    },
    ...data.map((variant, index) => {
      const step = steps[index];
      const highlights = [...step.specs, ...step.added].slice(0, 3);
      const more = step.specs.length + step.added.length - highlights.length;
      const previous = index ? data[index - 1] : null;
      return {
        theme: index % 2 ? "dark" : "light",
        contentTop: 240,
        minSpeak: 3 + highlights.length * 0.8,
        voice: index === 0
          ? `Bản ${variant.name}: niêm yết ${trieu(variant.price)}${variant.offer ? `, sau ưu đãi lăn bánh khoảng ${trieu(variant.net)}` : ""}. Đây là bản dễ tiếp cận, hợp với: ${lowerFirst(personas[index])}.`
          : `Bản ${variant.name}: ${variant.price === previous.price ? `cùng giá với bản ${previous.name}` : `thêm ${trieu(variant.price - previous.price)} so với bản ${previous.name}`}${highlights.length ? `, có thêm ${highlights.map(lowerFirst).join(", ")}${more > 0 ? ` và ${more} món khác` : ""}` : ""}. Hợp với: ${lowerFirst(personas[index])}.`,
        html: `${heading(index + 1, variant.name)}
          ${oneCar(variant, 0.02, "", "compact")}
          ${row("Niêm yết", trieu(variant.price), 0.12, "small")}
          ${variant.offer ? row("Lăn bánh sau ưu đãi", trieu(variant.net), 0.22, "small") : ""}
          ${index === 0
            ? note("Bản dễ tiếp cận của dòng xe", 0.35)
            : `<p class="sub serif" data-at="0.3">${variant.price === previous.price ? `cùng giá với ${escapeHtml(previous.name)}` : `thêm ${escapeHtml(trieu(variant.price - previous.price))} so với ${escapeHtml(previous.name)}`}</p>
               <ul class="bullets" style="margin-top:8px">${highlights.map((item, row_) => `<li data-at="${(0.35 + row_ * 0.1).toFixed(2)}" style="font-size:34px;padding:5px 0">${escapeHtml(item)}</li>`).join("")}${more > 0 ? `<li data-at="0.68" style="font-size:34px;padding:5px 0">và ${more} món khác</li>` : ""}</ul>`}
          <div class="box black" data-at="0.8" data-fx="wipe" style="margin-top:30px;font-size:42px;max-width:960px"><span data-at="0.85">Hợp với: ${escapeHtml(personas[index])}</span></div>`,
      };
    }),
    {
      theme: "light",
      minSpeak: 2 + list.length * 1,
      voice: `Phúc gợi ý theo nhu cầu: ${data.map((variant, index) => `${lowerFirst(personas[index])}, chọn ${variant.name}`).join("; ")}.`,
      html: `${heading("", "Phúc gợi ý")}
        <p class="sub serif" data-at="0">chọn theo nhu cầu</p>
        ${data.map((variant, index) => `<div class="spec" data-at="${(0.1 + index * (0.6 / data.length)).toFixed(2)}" style="text-align:left"><i style="text-align:left">${escapeHtml(personas[index])}</i><div class="vals" style="grid-template-columns:1fr"><b style="color:var(--accent);text-align:left">→ ${escapeHtml(variant.name)}</b></div></div>`).join("")}
        ${note("Gợi ý tham khảo, Phúc tư vấn theo nhu cầu thực tế", 0.85)}`,
    },
    ctaScene("Phúc tư vấn bản hợp với bạn", "Bình luận nhu cầu của bạn", fileUrl(car.image),
      `Anh chị dùng xe để làm gì, đi phố, đi tỉnh hay chở hàng? Lưu video và bình luận, Phúc tư vấn phiên bản hợp nhu cầu.`),
  ];
  return {
    key: car.id,
    scenes,
    title: `CHỌN PHIÊN BẢN ${shortOf(car).toUpperCase()}`,
    caption: footerCaption([
      `${shortOf(car)} có ${list.length} bản, chọn bản nào? 👇`,
      data.map((variant, index) => `${variant.name}: ${personas[index].toLowerCase()}`).join("\n"),
      "Bình luận nhu cầu của anh chị, Phúc tư vấn bản phù hợp.",
      `#Mitsubishi #${shortOf(car).replace(/\s+/g, "")} #ChonXe #TuVanMuaXe`,
      `👉 So sánh trang bị từng bản: ${siteUrl}/xe/${car.slug}#trang-bi`,
    ]),
  };
}

// ================= 3 TRỤ CỘT: KIẾN THỨC · SO SÁNH · GIẢI TRÍ (11/11/2026) =================
const pillarCss = `
  .count { position: relative; width: 980px; height: 300px; margin-top: 40px; }
  .count span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 260px; font-weight: 900; color: var(--accent); line-height: 1; }
  .dark .count span { color: var(--accent-2); }
  .q { font-size: 64px; font-weight: 900; text-align: center; line-height: 1.15; max-width: 960px; letter-spacing: -1px; margin-top: 30px; }
  .verdict { font-size: 120px; font-weight: 900; letter-spacing: 4px; margin-top: 30px; }
  .verdict.yes { color: #16a34a; } .verdict.no { color: var(--accent); } .dark .verdict.no { color: var(--accent-2); }
  .dark .verdict.yes { color: #4ade80; }
  .why { font-size: 40px; font-weight: 700; text-align: center; max-width: 920px; line-height: 1.3; margin-top: 18px; }
  .rank { font-size: 180px; font-weight: 900; line-height: .9; color: var(--accent); }
  .dark .rank { color: var(--accent-2); }
  .bigval { font-size: 110px; font-weight: 900; letter-spacing: -3px; margin-top: 10px; }
  .vs { display: grid; grid-template-columns: 1fr 120px 1fr; align-items: center; width: 1000px; margin-top: 20px; }
  .vs figure img { width: 100%; height: 230px; object-fit: contain; }
  .vs figcaption { font-family: RobotoLocal, Roboto, sans-serif; font-style: normal; font-weight: 900; font-size: 42px; }
  .vs .mid { font-size: 80px; font-weight: 900; color: var(--accent); text-align: center; font-style: italic; }
  .dark .vs .mid { color: var(--accent-2); }
  .steps2 { list-style: none; width: 920px; margin-top: 20px; }
  .steps2 li { display: grid; grid-template-columns: 90px 1fr; gap: 20px; align-items: start; padding: 16px 0; border-bottom: 2px solid var(--rule, #d3d3d0); }
  .steps2 b { font-size: 70px; font-weight: 900; color: var(--accent); line-height: .9; }
  .dark .steps2 b { color: var(--accent-2); }
  .steps2 span { font-size: 40px; font-weight: 800; line-height: 1.2; }
  .grid9 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 30px; width: 940px; margin-top: 26px; }
  .grid9 div { font-size: 36px; font-weight: 800; padding: 14px 0 14px 22px; border-left: 8px solid var(--accent); }
  .dark .grid9 div { border-color: var(--accent-2); }
`;
const firstSentence = (text) => String(text).split(/(?<=[.!?])\s/)[0];
const numOf = (text) => parseFloat(String(text ?? "").replace(/\./g, "").replace(",", ".").match(/[\d.]+/)?.[0] ?? "NaN");
const qaScene = ({ theme = "dark", kicker, question, answer, why, voiceQ, voiceA, image }) => ({
  theme,
  minSpeak: 6.5,
  voice: `${voiceQ} ... Ba, hai, một. ${voiceA}`,
  html: `<p class="kicker" data-at="0.02">${escapeHtml(kicker)}</p>
    <p class="q" data-at="0.04">${escapeHtml(question)}</p>
    ${image ? `<div class="cars one compact" data-at="0.05" data-fx="car"><figure><img src="${image}"></figure></div>` : ""}
    <div class="count">
      <span data-at="0.30" data-until="0.42" data-fx="pop">3</span>
      <span data-at="0.42" data-until="0.54" data-fx="pop">2</span>
      <span data-at="0.54" data-until="0.66" data-fx="pop">1</span>
      <span data-at="0.66" data-fx="pop" style="font-size:90px;color:inherit;text-align:center;line-height:1.1">${escapeHtml(answer)}</span>
    </div>
    ${why ? `<p class="why" data-at="0.78">${escapeHtml(why)}</p>` : ""}`,
});

// ---------- Kiến thức ----------
function readPurchasePage() {
  const src = fs.readFileSync(path.join(root, "src/app/mua-xe-mitsubishi-toan-quoc/page.tsx"), "utf8");
  const block = src.slice(src.indexOf("const steps = ["), src.indexOf("];", src.indexOf("const steps = [")));
  const steps = [...block.matchAll(/title:\s*"([^"]+)",\s*text:\s*(?:"([^"]+)"|`([^`]+)`)/g)].map((m) => ({
    title: m[1],
    text: (m[2] ?? m[3]).replace(/\$\{siteConfig\.dealer\.name\}/g, siteConfig.dealer?.name ?? "showroom"),
  }));
  const days = src.match(/deliveryDays\s*=\s*\{\s*hcm:\s*"([^"]+)",\s*province:\s*"([^"]+)"/);
  return { steps, hcm: days?.[1], province: days?.[2] };
}
function kienThuc(topic) {
  const hero = fileUrl(cars[0].image);
  if (topic === "quy-trinh-mua-xe") {
    const { steps, hcm, province: prov } = readPurchasePage();
    return {
      key: topic, css: pillarCss, title: "KIẾN THỨC: QUY TRÌNH MUA XE",
      scenes: [
        { theme: "dark", voice: `Mua xe ô tô gồm mấy bước? Chỉ ${steps.length} bước, ở tỉnh nào cũng mua được, không cần lên showroom nhiều lần.`,
          html: `<p class="kicker" data-at="0">Kiến thức mua xe</p><p class="q" data-at="0.03">Mua xe ô tô gồm mấy bước?</p>${oneCar({ hero }, 0.05, "", "compact")}${box(`${steps.length} bước, ở đâu cũng mua được`, 0.5)}` },
        { theme: "light", minSpeak: 3 + steps.length * 1.2, voice: steps.map((step, i) => `Bước ${i + 1}: ${lowerFirst(step.title)}.`).join(" "),
          html: `${heading("", `${steps.length} bước mua xe`)}<ul class="steps2">${steps.map((step, i) => `<li data-at="${(0.06 + i * 0.16).toFixed(2)}"><b>${i + 1}</b><span>${escapeHtml(step.title)}</span></li>`).join("")}</ul>` },
        ...steps.map((step, i) => ({ theme: i % 2 ? "dark" : "light", voice: `Bước ${i + 1}, ${lowerFirst(step.title)}: ${lowerFirst(firstSentence(step.text))}`,
          html: `<p class="rank" data-at="0.02">${i + 1}</p><h2 data-at="0.05" style="font-size:60px;text-align:center;max-width:960px">${escapeHtml(step.title)}</h2><p class="why" data-at="0.25">${escapeHtml(firstSentence(step.text))}</p>` })),
        ...(hcm ? [{ theme: "dark", voice: `Bao lâu nhận xe? Tại TP.HCM khoảng ${hcm}, các tỉnh khoảng ${prov}.`,
          html: `${heading("", "Bao lâu nhận xe?")}${row("TP.HCM", hcm, 0.15)}${row("Tỉnh khác", prov, 0.35)}${note("Tùy xe có sẵn hay phải đặt", 0.7)}` }] : []),
        ctaScene("Phúc gửi báo giá đúng tỉnh của bạn", "Lưu lại khi đi mua xe", hero, "Lưu video lại để khi mua xe làm đúng từng bước. Bình luận tỉnh của anh chị, Phúc báo giá lăn bánh đúng nơi đăng ký."),
      ],
      caption: footerCaption([`Mua xe ô tô gồm mấy bước? 👇 ${steps.map((s, i) => `${i + 1}. ${s.title}`).join(" · ")}`, "Lưu lại khi đi mua xe. Bình luận tỉnh của anh chị, Phúc báo giá lăn bánh.", "#MuaXeOto #KinhNghiemMuaXe #Mitsubishi"]),
    };
  }
  if (topic === "bao-hanh") {
    const five = cars.filter((car) => ["triton", "destinator"].includes(car.id));
    const three = cars.filter((car) => !["triton", "destinator"].includes(car.id));
    return {
      key: topic, css: pillarCss, title: "KIẾN THỨC: BẢO HÀNH XE MITSUBISHI",
      scenes: [
        qaScene({ kicker: "Đố vui kiến thức", question: "Xe Mitsubishi được bảo hành bao lâu?", answer: "3 hoặc 5 năm", voiceQ: "Xe Mitsubishi được bảo hành bao lâu?", voiceA: "Đáp án: 3 hoặc 5 năm, tùy dòng xe.", why: "Tùy dòng xe, điều kiện nào đến trước", image: hero }),
        { theme: "light", minSpeak: 6, voice: `${five.map(shortOf).join(" và ")} bảo hành 5 năm hoặc 150.000 km. ${three.map(shortOf).join(", ")} bảo hành 3 năm hoặc 100.000 km. Tùy điều kiện nào đến trước.`,
          html: `${heading("", "Bảo hành tiêu chuẩn")}${row(five.map(shortOf).join(", "), "5 năm / 150.000 km", 0.12, "small")}${row(three.map(shortOf).join(", "), "3 năm / 100.000 km", 0.35, "small")}${note("Tính từ ngày nhận xe, điều kiện nào đến trước", 0.65)}` },
        { theme: "dark", voice: "Ắc quy nguyên bản được bảo hành 12 tháng hoặc 20.000 km.",
          html: `${heading("", "Ắc-quy nguyên bản")}${box("12 tháng / 20.000 km", 0.2)}` },
        { theme: "light", voice: `Hết bảo hành 3 năm, có thể mua thêm 1 hoặc 2 năm bảo hành mở rộng chính hãng, tổng thời gian được bảo vệ lên tới 5 năm hoặc 150.000 km. Có gói Cơ bản và gói Cao cấp.`,
          html: `${heading("", "Hết bảo hành thì sao?")}${row("Mua thêm", "1 hoặc 2 năm", 0.12)}${row("Tổng tối đa", "5 năm / 150.000 km", 0.3, "small")}${row("Gói", "Cơ bản · Cao cấp", 0.48, "small")}${note("Áp dụng các dòng bảo hành 3 năm", 0.75)}` },
        ctaScene("Phúc gửi chi tiết bảo hành từng xe", "Bình luận xe bạn đang đi", fileUrl(five[0]?.image ?? cars[0].image), "Anh chị đang đi xe gì? Lưu video và bình luận, Phúc gửi chi tiết bảo hành và gói mở rộng."),
      ],
      caption: footerCaption(["Xe Mitsubishi bảo hành bao lâu? 👇", `${five.map(shortOf).join(", ")}: 5 năm/150.000 km · ${three.map(shortOf).join(", ")}: 3 năm/100.000 km`, "#Mitsubishi #BaoHanhOto #KinhNghiemMuaXe", `👉 Bảo hành mở rộng: ${siteUrl}/ho-tro/bao-hanh-mo-rong`]),
    };
  }
  if (topic === "bao-duong") {
    const items = ["Dầu động cơ và lọc dầu", "Hệ thống phanh", "Lốp xe và áp suất lốp", "Nước làm mát", "Ắc-quy", "Hệ thống đèn và điện", "Lọc gió động cơ", "Lọc gió điều hòa", "Các loại dầu và chất lỏng"];
    return {
      key: topic, css: pillarCss, title: "KIẾN THỨC: BẢO DƯỠNG ĐỊNH KỲ",
      scenes: [
        qaScene({ kicker: "Đố vui kiến thức", question: "Xe Mitsubishi bao lâu bảo dưỡng một lần?", answer: "5.000 km", voiceQ: "Xe Mitsubishi bao lâu phải bảo dưỡng một lần?", voiceA: "Đáp án: đa số các dòng là 5.000 km hoặc 3 tháng.", why: "hoặc 3 tháng, tùy điều kiện nào đến trước", image: fileUrl(cars[0].image) }),
        { theme: "light", voice: "Đa số mẫu xe Mitsubishi bảo dưỡng mỗi 5.000 km hoặc 3 tháng. Riêng All-New Triton động cơ 4N16 là 10.000 km hoặc 6 tháng.",
          html: `${heading("", "Mốc bảo dưỡng")}${row("Đa số mẫu xe", "5.000 km / 3 tháng", 0.12, "small")}${row("All-New Triton 4N16", "10.000 km / 6 tháng", 0.38, "small")}${note("Tùy điều kiện nào đến trước", 0.7)}` },
        { theme: "dark", minSpeak: 8, voice: `Mỗi lần bảo dưỡng thường kiểm tra ${items.length} hạng mục: ${items.map(lowerFirst).join(", ")}.`,
          html: `${heading("", `${items.length} hạng mục kiểm tra`)}<div class="grid9">${items.map((item, i) => `<div data-at="${(0.05 + i * 0.08).toFixed(2)}">${escapeHtml(item)}</div>`).join("")}</div>` },
        { theme: "light", voice: "Lịch cụ thể có thể khác theo mẫu xe và điều kiện vận hành, nên xem sổ hướng dẫn đi kèm xe.",
          html: `${heading("", "Lưu ý")}<p class="why" data-at="0.1">Lịch cụ thể khác nhau theo mẫu xe, phiên bản, điều kiện vận hành.</p>${box("Xem sổ hướng dẫn đi kèm xe", 0.5, "black")}` },
        ctaScene("Phúc giúp đặt lịch bảo dưỡng", "Bình luận số km xe bạn", fileUrl(cars[0].image), "Xe anh chị đang chạy bao nhiêu km rồi? Lưu video và bình luận, Phúc nhắc lịch bảo dưỡng."),
      ],
      caption: footerCaption(["Xe Mitsubishi bao lâu bảo dưỡng một lần? 👇", "Đa số 5.000 km/3 tháng · All-New Triton 4N16: 10.000 km/6 tháng", "#BaoDuongOto #Mitsubishi #KinhNghiemLaiXe", `👉 Đặt lịch bảo dưỡng: ${siteUrl}/dat-lich-bao-duong`]),
    };
  }
  if (topic === "lai-suat") {
    const banks = newCarBankPackages;
    const months = [...new Set(banks.flatMap((bank) => bank.fixed.map((item) => item.months)))].sort((a, b) => a - b);
    return {
      key: topic, css: pillarCss, title: "KIẾN THỨC: LÃI SUẤT VAY MUA XE",
      scenes: [
        { theme: "dark", voice: `Vay mua xe, ${banks.length} ngân hàng ${banks.map((b) => b.bank).join(", ")} đang cho lãi bao nhiêu? Cùng xem bảng tháng ${month}.`,
          html: `<p class="kicker" data-at="0">Kiến thức trả góp</p><p class="q" data-at="0.03">Vay mua xe, ngân hàng nào lãi bao nhiêu?</p>${box(`${banks.length} ngân hàng · tháng ${month}`, 0.5)}` },
        ...months.map((m, mi) => ({
          theme: mi % 2 ? "dark" : "light",
          voice: `Lãi cố định ${m} tháng đầu: ${banks.filter((b) => b.fixed.some((f) => f.months === m)).map((b) => `${b.bank} ${b.fixed.find((f) => f.months === m).ratePercent.toLocaleString("vi-VN")}%`).join(", ")} một năm.`,
          html: `${heading(mi + 1, `Cố định ${m} tháng`)}${banks.filter((b) => b.fixed.some((f) => f.months === m)).map((b, i) => row(b.bank, `${b.fixed.find((f) => f.months === m).ratePercent.toLocaleString("vi-VN")}%/năm`, 0.12 + i * 0.2)).join("")}`,
        })),
        { theme: "light", minSpeak: 6, voice: `Hết thời gian cố định, lãi thả nổi bằng lãi tham chiếu cộng biên độ: ${banks.map((b) => `${b.bank} ${b.marginPercent}%`).join(", ")}. Vay tối đa: ${banks.map((b) => `${b.bank} ${b.maxLoanPercent}`).join(", ")}.`,
          html: `${heading("", "Sau thời gian cố định")}${banks.map((b, i) => row(b.bank, `+ ${b.marginPercent}%`, 0.1 + i * 0.15, "small")).join("")}${note("Biên độ cộng vào lãi tham chiếu", 0.6)}${banks.map((b, i) => row(`${b.bank} vay tối đa`, b.maxLoanPercent, 0.68 + i * 0.08, "small")).join("")}` },
        ctaScene("Phúc tính góp theo từng ngân hàng", "Bình luận ngân hàng bạn quen", fileUrl(cars[0].image), "Anh chị quen ngân hàng nào? Lưu video và bình luận, Phúc tính bảng góp theo đúng ngân hàng đó."),
      ],
      caption: footerCaption([`Lãi suất vay mua xe tháng ${month} 👇`, banks.map((b) => `${b.bank}: ${b.fixed.map((f) => `${f.months}T ${f.ratePercent.toLocaleString("vi-VN")}%`).join(", ")}`).join("\n"), `Theo công văn MMV Auto Finance ${bankPackagesUpdated}. Lãi thực tế theo ngân hàng duyệt.`, "#TraGopOto #LaiSuatVayMuaXe #Mitsubishi", `👉 Bảng lãi suất: ${siteUrl}/du-toan/tra-gop`]),
    };
  }
  console.error("Chủ đề kiến thức: quy-trinh-mua-xe, bao-hanh, bao-duong, lai-suat");
  process.exit(1);
}

// ---------- So sánh: xếp hạng trong dòng xe ----------
const rankCriteria = {
  "gam-cao": { title: "gầm cao", key: "groundClearance", desc: true, unit: "mm" },
  "tiet-kiem-xang": { title: "tiết kiệm xăng", key: "fuelConsumptionCombined", desc: false, unit: "L/100 km" },
  "manh": { title: "mạnh (công suất)", key: "power", desc: true, unit: "PS" },
  "rong": { title: "rộng (chiều dài cơ sở)", key: "wheelbase", desc: true, unit: "mm" },
  "re": { title: "dễ mua (lăn bánh sau ưu đãi)", key: "net", desc: false, unit: "" },
};
function xepHang(criterion) {
  const crit = rankCriteria[criterion];
  if (!crit) { console.error(`Tiêu chí: ${Object.keys(rankCriteria).join(", ")}`); process.exit(1); }
  const rows = cars.map((car) => {
    const top = topVariant(car);
    if (crit.key === "net") {
      const cheapest = [...car.variants].sort((a, b) => a.price - b.price)[0];
      const v = variantData(car, cheapest);
      return { car, value: v.net, label: trieu(v.net), note: cheapest.name === shortOf(car) ? "" : `bản ${cheapest.name}` };
    }
    // Lấy giá trị tốt của dòng xe theo tiêu chí (tiết kiệm xăng: bản tiêu hao thấp nhất; còn lại: bản cao nhất)
    const values = car.variants.map((variant) => ({ variant, raw: variant.specifications?.[crit.key] })).filter((item) => item.raw && Number.isFinite(numOf(item.raw)));
    if (!values.length) return null;
    const pick = values.sort((a, b) => (crit.desc ? numOf(b.raw) - numOf(a.raw) : numOf(a.raw) - numOf(b.raw)))[0];
    return { car, value: numOf(pick.raw), label: String(pick.raw).split(" / ")[0], note: "" };
  }).filter(Boolean).sort((a, b) => (crit.desc ? b.value - a.value : a.value - b.value));
  // Đồng hạng: bằng giá trị thì cùng hạng (vd Xpander và Xpander Cross cùng gầm 225 mm)
  rows.forEach((item) => { item.rank = 1 + rows.filter((other) => (crit.desc ? other.value > item.value : other.value < item.value)).length; });
  rows.forEach((item) => { item.tied = rows.filter((other) => other.rank === item.rank).length > 1; });
  const countdown = [...rows].reverse();
  const skipped = cars.filter((car) => !rows.some((item) => item.car === car)).map(shortOf);
  return {
    key: criterion, css: pillarCss, title: `XẾP HẠNG XE MITSUBISHI ${crit.title.toUpperCase()}`,
    scenes: [
      { theme: "dark", voice: `Trong ${rows.length} dòng xe Mitsubishi, xe nào ${crit.title.replace(/\s*\(.*\)/, "")} nhất? Đếm ngược từ hạng ${rows.length}.`,
        html: `<p class="kicker" data-at="0">Xếp hạng trong dòng xe Mitsubishi</p><p class="q" data-at="0.03">Xe Mitsubishi nào ${escapeHtml(crit.title.replace(/\s*\(.*\)/, ""))} nhất?</p><div class="cars two" data-at="0.08" data-fx="car">${rows.slice(0, 2).map((item) => `<figure><img src="${fileUrl(item.car.image)}"></figure>`).join("")}</div>${box(`Đếm ngược ${rows.length} → 1`, 0.55)}${note(crit.title.match(/\((.*)\)/)?.[1] ? `Tiêu chí: ${crit.title.match(/\((.*)\)/)[1]}` : "", 0.75)}` },
      ...countdown.map((item, i) => {
        const rank = item.rank;
        return { theme: rank === 1 ? "dark" : "light",
          voice: `${item.tied ? "Đồng hạng" : "Hạng"} ${rank === 1 ? "nhất" : rank}: ${shortOf(item.car)}, ${item.label}${item.note ? `, ${item.note}` : ""}.`,
          html: `<p class="rank" data-at="0.02">#${rank}</p>${item.tied ? `<p class="kicker" data-at="0.04">Đồng hạng</p>` : ""}${oneCar({ hero: fileUrl(item.car.image) }, 0.05, shortOf(item.car), "compact")}<p class="bigval" data-at="0.3">${escapeHtml(item.label)}</p>${item.note ? note(item.note, 0.45) : ""}` };
      }),
      { theme: "light", minSpeak: 2 + rows.length * 0.7, voice: `Tóm lại: ${rows.map((item) => `hạng ${item.rank} ${shortOf(item.car)}`).join(", ")}.`,
        html: `${heading("", "Bảng xếp hạng")}${rows.map((item, i) => row(`#${item.rank} ${shortOf(item.car)}`, item.label, 0.08 + i * 0.1, "small")).join("")}${skipped.length ? note(`Chưa có số liệu: ${skipped.join(", ")}`, 0.8) : note("Số liệu theo Mitsubishi Motors Việt Nam", 0.8)}` },
      ctaScene("Phúc tư vấn xe hợp nhu cầu", "Bình luận xe bạn chọn", fileUrl(rows[0].car.image), "Anh chị chọn xe nào? Lưu video và bình luận, Phúc gửi thông số và báo giá chi tiết."),
    ],
    caption: footerCaption([`Xe Mitsubishi nào ${crit.title.replace(/\s*\(.*\)/, "")} nhất? 👇`, rows.map((item) => `#${item.rank} ${shortOf(item.car)}: ${item.label}`).join(" · "), "Bình luận xe anh chị chọn.", "#Mitsubishi #XepHangXe #ChonXe"]),
  };
}

// ---------- So sánh: 2 mẫu xe Mitsubishi ----------
const pairPresets = [["xforce", "xpander-cross"], ["xpander", "xpander-cross"], ["destinator", "xpander-cross"], ["attrage", "xforce"]];
function soSanhXe(idA, idB) {
  const carA = cars.find((car) => car.id === idA);
  const carB = cars.find((car) => car.id === idB);
  if (!carA || !carB) { console.error(`Cần 2 id xe Mitsubishi: ${cars.map((car) => car.id).join(", ")}`); process.exit(1); }
  const info = (car) => {
    const variants = car.variants.map((variant) => variantData(car, variant)).sort((a, b) => a.price - b.price);
    const top = topVariant(car).specifications ?? {};
    const fuelLow = car.variants.map((v) => v.specifications?.fuelConsumptionCombined).filter(Boolean).sort((a, b) => numOf(a) - numOf(b))[0];
    return { car, name: shortOf(car), min: variants[0].price, max: variants[variants.length - 1].price, net: variants[0].net, seats: top.seats ?? car.specifications.seats, kind: `${categoryLabel[car.category] ?? car.category}`, gc: top.groundClearance, wb: top.wheelbase, power: top.power ? String(top.power).split(" / ")[0] : "", fuel: fuelLow, engine: top.engine, image: fileUrl(car.image) };
  };
  const a = info(carA); const b = info(carB);
  const rowsAB = [
    ["Kiểu xe", `${a.kind} ${a.seats} chỗ`, `${b.kind} ${b.seats} chỗ`],
    ["Giá niêm yết", a.min === a.max ? tr(a.min) : `${tr(a.min)} – ${tr(a.max)}`, b.min === b.max ? tr(b.min) : `${tr(b.min)} – ${tr(b.max)}`],
    ["Lăn bánh từ (sau ưu đãi)", tr(a.net), tr(b.net)],
    ["Khoảng sáng gầm", a.gc, b.gc],
    ["Chiều dài cơ sở", a.wb, b.wb],
    ["Công suất", a.power, b.power],
    ["Tiêu hao kết hợp", a.fuel, b.fuel],
  ].filter(([, x, y]) => x && y);
  const pages = chunk(rowsAB, 4);
  const pickA = []; const pickB = [];
  if (a.seats !== b.seats) (a.seats > b.seats ? pickA : pickB).push(`cần ${Math.max(a.seats, b.seats)} chỗ cho gia đình đông người`), (a.seats > b.seats ? pickB : pickA).push(`gia đình ${Math.min(a.seats, b.seats)} người, xe gọn đi phố`);
  if (a.net !== b.net) (a.net < b.net ? pickA : pickB).push(`ưu tiên chi phí thấp hơn`);
  if (numOf(a.gc) !== numOf(b.gc)) (numOf(a.gc) > numOf(b.gc) ? pickA : pickB).push(`hay đi đường ngập, đường xấu (gầm cao hơn)`);
  if (a.fuel && b.fuel && numOf(a.fuel) !== numOf(b.fuel)) (numOf(a.fuel) < numOf(b.fuel) ? pickA : pickB).push("đi nhiều, muốn tiết kiệm xăng");
  return {
    key: `${a.car.id}-va-${b.car.id}`, css: pillarCss, title: `SO SÁNH ${a.name.toUpperCase()} VÀ ${b.name.toUpperCase()}`,
    scenes: [
      { theme: "dark", voice: `${a.name} hay ${b.name}? Hai mẫu Mitsubishi tầm giá gần nhau, chọn xe nào? Cùng so từng tiêu chí.`,
        html: `<p class="kicker" data-at="0">So sánh 2 mẫu Mitsubishi</p><p class="q" data-at="0.03">${escapeHtml(a.name)} hay ${escapeHtml(b.name)}?</p><div class="vs" data-at="0.08" data-fx="car"><figure><img src="${a.image}"><figcaption>${escapeHtml(a.name)}</figcaption></figure><div class="mid">VS</div><figure><img src="${b.image}"><figcaption>${escapeHtml(b.name)}</figcaption></figure></div>${box("Chọn xe nào?", 0.6)}` },
      ...pages.map((page, pi) => ({ theme: pi % 2 ? "dark" : "light", minSpeak: 2 + page.length * 1.1,
        voice: page.map(([label, x, y]) => `${label}: ${a.name} ${String(x).split(" – ")[0]}, ${b.name} ${String(y).split(" – ")[0]}`).join(". ") + ".",
        html: `${heading(pi + 1, pi ? "So tiếp" : "So nhanh")}<div class="spec-head" data-at="0.03"><b>${escapeHtml(a.name)}</b><b>${escapeHtml(b.name)}</b></div>${page.map(([label, x, y], i) => `<div class="spec ${x === y ? "same" : "diff"}" data-at="${(0.1 + i * 0.18).toFixed(2)}"><i>${escapeHtml(label)}</i><div class="vals">${x === y ? `<b>${escapeHtml(x)}</b>` : `<b>${escapeHtml(x)}</b><b>${escapeHtml(y)}</b>`}</div></div>`).join("")}` })),
      { theme: "light", minSpeak: 7, voice: `Chọn ${a.name} nếu ${pickA.join(", ") || "thích phong cách xe này"}. Chọn ${b.name} nếu ${pickB.join(", ") || "thích phong cách xe này"}.`,
        html: `${heading("", "Chọn xe nào?")}<div class="spec" data-at="0.1" style="text-align:left"><i style="text-align:left">Chọn ${escapeHtml(a.name)} nếu</i><ul class="bullets" style="margin-top:6px">${(pickA.length ? pickA : ["thích phong cách xe này"]).map((t) => `<li style="font-size:36px;color:inherit">${escapeHtml(t)}</li>`).join("")}</ul></div><div class="spec" data-at="0.5" style="text-align:left"><i style="text-align:left">Chọn ${escapeHtml(b.name)} nếu</i><ul class="bullets" style="margin-top:6px">${(pickB.length ? pickB : ["thích phong cách xe này"]).map((t) => `<li style="font-size:36px;color:inherit">${escapeHtml(t)}</li>`).join("")}</ul></div>` },
      ctaScene("Phúc gửi báo giá cả 2 xe", "Bình luận xe bạn chọn", b.image, `Anh chị chọn ${a.name} hay ${b.name}? Lưu video và bình luận, Phúc gửi báo giá lăn bánh cả hai xe.`),
    ],
    caption: footerCaption([`${a.name} hay ${b.name}? 👇`, rowsAB.slice(0, 4).map(([l, x, y]) => `${l}: ${x} | ${y}`).join("\n"), "Bình luận xe anh chị chọn, Phúc gửi báo giá cả 2 xe.", `#Mitsubishi #${a.name.replace(/\s+/g, "")} #${b.name.replace(/\s+/g, "")} #SoSanhXe`]),
  };
}

// ---------- Giải trí: đố vui ----------
function doVui(kind, carArg) {
  const pool = carArg && carArg !== "tat-ca" ? cars.filter((car) => car.id === carArg) : cars;
  if (kind === "doan-gia") {
    const picks = pool.map((car) => { const cheapest = [...car.variants].sort((a, b) => a.price - b.price)[0]; return { car, v: variantData(car, cheapest) }; }).slice(0, 4);
    return {
      key: `doan-gia-${carArg ?? "tat-ca"}`, css: pillarCss, title: "ĐỐ VUI: ĐOÁN GIÁ LĂN BÁNH",
      scenes: [
        { theme: "dark", voice: `Đoán giá lăn bánh xe Mitsubishi! Niêm yết thì ai cũng biết, nhưng lăn bánh sau ưu đãi tháng ${currentPromotion.month} là bao nhiêu? Đoán trước khi đáp án hiện ra.`,
          html: `<p class="kicker" data-at="0">Đố vui</p><p class="q" data-at="0.03">Đoán giá lăn bánh!</p><div class="cars two" data-at="0.08" data-fx="car">${picks.slice(0, 2).map((p) => `<figure><img src="${p.v.hero}"></figure>`).join("")}</div>${box(`${picks.length} câu · có đáp án`, 0.55)}` },
        ...picks.map((p, i) => qaScene({ theme: i % 2 ? "light" : "dark", kicker: `Câu ${i + 1} · niêm yết ${trieu(p.v.price)}`, question: `${p.v.label} lăn bánh ${provinceShort(province)} sau ưu đãi?`, answer: trieu(p.v.net), why: p.v.offer ? `Đã trừ ưu đãi ~${trieu(p.v.offer)}` : "Chưa có ưu đãi tháng này", image: p.v.hero,
          voiceQ: `Câu ${i + 1}: ${p.v.label} niêm yết ${trieu(p.v.price)}, lăn bánh ${provinceShort(province)} sau ưu đãi là bao nhiêu?`, voiceA: `Đáp án: ${trieu(p.v.net)}.` })),
        ctaScene("Phúc gửi bảng lăn bánh đầy đủ", "Bình luận bạn đoán đúng mấy câu", picks[0].v.hero, "Anh chị đoán đúng mấy câu? Bình luận nhé, Phúc gửi bảng lăn bánh đầy đủ."),
      ],
      caption: footerCaption(["Đoán giá lăn bánh xe Mitsubishi, anh chị đúng mấy câu? 🤔👇", "Bình luận số câu đúng!", "#DoVui #Mitsubishi #GiaXe #LanBanh"]),
    };
  }
  if (kind === "dung-sai") {
    const byId = Object.fromEntries(cars.map((car) => [car.id, car]));
    const gc = (id) => numOf(topVariant(byId[id]).specifications?.groundClearance);
    const facts = [
      byId.triton && { q: "Triton tính lệ phí trước bạ thấp hơn xe con", a: true, why: "Bán tải chở hàng tính 60% mức của xe con" },
      byId.xpander && byId.xforce && { q: "Xpander gầm cao hơn Xforce", a: gc("xpander") > gc("xforce"), why: `Xpander ${gc("xpander")} mm, Xforce ${gc("xforce")} mm` },
      byId.attrage && byId.xforce && { q: "Attrage gầm cao hơn Xforce", a: gc("attrage") > gc("xforce"), why: `Attrage ${gc("attrage")} mm, Xforce ${gc("xforce")} mm` },
      byId.destinator && { q: "Destinator được bảo hành 3 năm", a: false, why: "Destinator bảo hành 5 năm hoặc 150.000 km" },
      { q: "Biển số xe con ở TP.HCM 14 triệu", a: plateFeeByArea.car.I === 14_000_000, why: `Hà Nội, TP.HCM ${trieu(plateFeeByArea.car.I)}; tỉnh khác ${(plateFeeByArea.car.II / 1000).toLocaleString("vi-VN")} nghìn` },
      byId.destinator && { q: "Destinator là xe 7 chỗ", a: topVariant(byId.destinator).specifications?.seats === 7, why: `Destinator ${topVariant(byId.destinator).specifications?.seats} chỗ` },
    ].filter(Boolean);
    return {
      key: "dung-sai", css: pillarCss, title: "ĐỐ VUI: ĐÚNG HAY SAI",
      scenes: [
        { theme: "dark", voice: `Đúng hay sai? ${facts.length} câu về xe Mitsubishi, anh chị trả lời được mấy câu?`,
          html: `<p class="kicker" data-at="0">Đố vui</p><p class="q" data-at="0.03" style="font-size:96px">ĐÚNG hay SAI?</p>${oneCar({ hero: fileUrl(cars[0].image) }, 0.08, "", "compact")}${box(`${facts.length} câu về xe Mitsubishi`, 0.55)}` },
        ...facts.map((f, i) => ({ theme: i % 2 ? "light" : "dark", minSpeak: 6,
          voice: `Câu ${i + 1}: ${f.q}. Đúng hay sai? ... Ba, hai, một. ${f.a ? "Đúng" : "Sai"}! ${f.why}.`,
          html: `<p class="kicker" data-at="0.02">Câu ${i + 1}/${facts.length}</p><p class="q" data-at="0.04">${escapeHtml(f.q)}</p><div class="count"><span data-at="0.32" data-until="0.44" data-fx="pop">3</span><span data-at="0.44" data-until="0.56" data-fx="pop">2</span><span data-at="0.56" data-until="0.68" data-fx="pop">1</span></div><p class="verdict ${f.a ? "yes" : "no"}" data-at="0.68" data-fx="pop" style="margin-top:-300px">${f.a ? "ĐÚNG" : "SAI"}</p><p class="why" data-at="0.78" style="margin-top:200px">${escapeHtml(f.why)}</p>` })),
        ctaScene("Phúc giải đáp mọi câu hỏi về xe", "Bình luận bạn đúng mấy câu", fileUrl(cars[0].image), "Anh chị đúng mấy câu? Bình luận nhé, câu nào chưa rõ Phúc giải thích thêm."),
      ],
      caption: footerCaption(["Đúng hay sai? Kiểm tra hiểu biết về xe Mitsubishi 🤔👇", "Bình luận số câu đúng!", "#DoVui #Mitsubishi #KienThucOto"]),
    };
  }
  if (kind === "chon-1") {
    const pairs = pairPresets.map(([x, y]) => [cars.find((c) => c.id === x), cars.find((c) => c.id === y)]).filter(([x, y]) => x && y);
    return {
      key: "chon-1", css: pillarCss, title: "GIẢI TRÍ: CHỌN 1 TRONG 2",
      scenes: [
        { theme: "dark", voice: `Chọn 1 trong 2! ${pairs.length} cặp xe Mitsubishi, anh chị chọn xe nào? Ghi lại lựa chọn, bình luận cuối video.`,
          html: `<p class="kicker" data-at="0">Giải trí</p><p class="q" data-at="0.03" style="font-size:90px">Chọn 1 trong 2</p>${box(`${pairs.length} cặp xe Mitsubishi`, 0.4)}${note("Ghi lại lựa chọn của bạn", 0.65)}` },
        ...pairs.map(([x, y], i) => { const vx = variantData(x, [...x.variants].sort((p, q) => p.price - q.price)[0]); const vy = variantData(y, [...y.variants].sort((p, q) => p.price - q.price)[0]);
          return { theme: i % 2 ? "light" : "dark", minSpeak: 5,
            voice: `Cặp ${i + 1}: ${shortOf(x)}, lăn bánh từ ${trieu(vx.net)}, hay ${shortOf(y)}, từ ${trieu(vy.net)}?`,
            html: `<p class="kicker" data-at="0.02">Cặp ${i + 1}/${pairs.length}</p><div class="vs" data-at="0.05" data-fx="car"><figure><img src="${vx.hero}"><figcaption>${escapeHtml(shortOf(x))}</figcaption></figure><div class="mid">A/B</div><figure><img src="${vy.hero}"><figcaption>${escapeHtml(shortOf(y))}</figcaption></figure></div><div class="pair" data-at="0.3"><b>${tr(vx.net)}</b><i>lăn bánh từ</i><b>${tr(vy.net)}</b></div><div class="pair" data-at="0.45"><b>${x.variants[0].specifications?.seats ?? ""} chỗ</b><i>số chỗ</i><b>${y.variants[0].specifications?.seats ?? ""} chỗ</b></div>${box("A hay B?", 0.65)}` }; }),
        ctaScene("Phúc tư vấn theo lựa chọn của bạn", "Bình luận: A A B B…", fileUrl(cars[0].image), "Bình luận lựa chọn của anh chị theo thứ tự, ví dụ A, B, A, B. Phúc tư vấn xe hợp nhất với lựa chọn đó."),
      ],
      caption: footerCaption(["Chọn 1 trong 2: anh chị chọn xe nào? 👇", "Bình luận theo thứ tự, ví dụ: A B A B", "#Mitsubishi #Chon1Trong2 #DoVui"]),
    };
  }
  console.error("Kiểu đố vui: doan-gia [xe], dung-sai, chon-1");
  process.exit(1);
}

// ---------- Series "Kiến thức ô tô" (kiến thức chung, không gắn hãng; cảnh cuối mời THEO DÕI KÊNH) ----------
// Nội dung ở scripts/video-content/kien-thuc-chung.mjs (anh Phúc duyệt trước khi dựng).
const { episodes: knowledgeEpisodes, seriesName } = await import(pathToFileURL(path.join(root, "scripts/video-content/kien-thuc-chung.mjs")).href);
const followCss = pillarCss + `
  .follow { display: inline-flex; align-items: center; gap: 22px; margin-top: 40px; padding: 26px 56px; background: var(--box-bg); color: var(--box-ink); font-size: 72px; font-weight: 900; letter-spacing: 2px; box-shadow: var(--box-shadow); }
  .follow b { font-size: 90px; line-height: .8; }
  .next { margin-top: 46px; text-align: center; }
  .next small { display: block; font-size: 30px; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); }
  .dark .next small { color: var(--accent-2); }
  .next span { display: block; font-size: 52px; font-weight: 900; margin-top: 10px; max-width: 940px; }
  .pt { font-size: 62px; font-weight: 900; text-align: center; line-height: 1.12; max-width: 960px; letter-spacing: -1px; margin-top: 18px; }
`;
function kienThucChung(id) {
  const index = knowledgeEpisodes.findIndex((ep) => ep.id === id);
  if (index < 0) {
    console.error(`Không có tập "${id}". Các tập: ${knowledgeEpisodes.map((ep) => ep.id).join(", ")}`);
    process.exit(1);
  }
  const ep = knowledgeEpisodes[index];
  const n = index + 1;
  const next = knowledgeEpisodes[index + 1];
  const scenes = [
    {
      theme: "dark",
      backdrop: photo(fileUrl(ep.image)),
      contentTop: 1000,
      voice: ep.hook,
      html: `<p class="kicker" data-at="0">${escapeHtml(seriesName)} · Tập ${n}</p>
        <p class="q" data-at="0.03" style="margin-top:16px">${escapeHtml(ep.hook)}</p>`,
    },
    ...ep.points.map((point, i) => ({
      theme: i % 2 ? "dark" : "light",
      minSpeak: 4,
      voice: `${i + 1}. ${point.t}. ${point.d}`,
      html: `<p class="rank" data-at="0.02">${i + 1}</p>
        <p class="pt" data-at="0.06">${escapeHtml(point.t)}</p>
        <p class="why" data-at="0.3">${escapeHtml(point.d)}</p>`,
    })),
    {
      theme: "dark",
      minSpeak: 2.5 + ep.points.length * 0.6,
      voice: `Nhớ nhanh: ${ep.recap}`,
      html: `${heading("", "Nhớ nhanh")}
        <ul class="steps2">${ep.points.map((point, i) => `<li data-at="${(0.05 + i * 0.12).toFixed(2)}"><b>${i + 1}</b><span>${escapeHtml(point.t)}</span></li>`).join("")}</ul>
        <p class="why" data-at="0.7">${escapeHtml(ep.recap)}</p>`,
    },
    {
      theme: "light",
      tail: 1.5,
      voice: next ? `Bấm theo dõi để không bỏ lỡ tập sau: ${next.title}` : `Bấm theo dõi để xem thêm các tập kiến thức ô tô.`,
      html: `<p class="kicker" data-at="0">${escapeHtml(seriesName)}</p>
        <h2 data-at="0.03" style="font-size:76px;text-align:center">Thấy hữu ích?</h2>
        <div class="follow" data-at="0.15" data-fx="pop"><b>+</b>THEO DÕI</div>
        ${next ? `<div class="next" data-at="0.4"><small>Tập ${n + 1}</small><span>${escapeHtml(next.title)}</span></div>` : `<div class="next" data-at="0.4"><small>Còn nhiều tập nữa</small><span>Kiến thức ô tô dễ hiểu mỗi tuần</span></div>`}
        <p class="fine" data-at="0.6">Thông tin tham khảo. Thông số và cách dùng cụ thể xem sổ hướng dẫn của xe bạn.</p>`,
    },
  ];
  return {
    key: `${String(n).padStart(2, "0")}-${ep.id}`,
    css: followCss,
    brand: `${escapeHtml(seriesName)}<small>Tập ${n}</small>`,
    scenes,
    title: `${seriesName.toUpperCase()} · TẬP ${n}: ${ep.title.toUpperCase()}`,
    caption: `${ep.title} 👇
${ep.hook}

${ep.points.map((point) => `✅ ${point.t}`).join("\n")}

📌 ${ep.recap}
${next ? `👉 Theo dõi kênh để xem tập ${n + 1}: ${next.title}` : "👉 Theo dõi kênh để xem thêm kiến thức ô tô"}

Nguồn tham khảo: ${ep.sources.join("; ")}.
#KienThucOto #MeoLaiXe #LaiXeAnToan #OtoChoNguoiMoi #ChamSocXe
`,
  };
}

// ---------- Chạy ----------
const templates = {
  "tra-gop": { perCar: true, build: traGop },
  "lan-banh-tinh": { perCar: true, build: lanBanhTinh },
  "uu-dai-thang": { build: uuDaiThang },
  "diem-noi-bat": { perCar: true, build: diemNoiBat },
  "xe-cu": { build: null },
  "chon-xe": { build: chonXe },
  "noi-ngoai-that": { perCar: true, build: noiNgoaiThat },
  "gioi-thieu": { perCar: true, build: gioiThieu },
  "chi-phi": { perCar: true, build: chiPhi },
  "phu-kien": { perCar: true, build: phuKien },
  "chon-phien-ban": { perCar: true, build: chonPhienBan },
  // 3 trụ cột (tham số thứ 2 là chủ đề/tiêu chí/kiểu, không phải xe)
  "kien-thuc": { arg: true, build: kienThuc, all: ["quy-trinh-mua-xe", "bao-hanh", "bao-duong", "lai-suat"] },
  "xep-hang": { arg: true, build: xepHang, all: Object.keys(rankCriteria) },
  "so-sanh-xe": { pair: true },
  "kien-thuc-chung": { arg: true, build: kienThucChung, all: knowledgeEpisodes.map((ep) => ep.id) },
  "do-vui": { arg: true, build: (kind) => doVui(kind, positional[2]), all: ["doan-gia", "dung-sai", "chon-1"] },
};
if (!templates[template]) {
  console.log(`Cách dùng: npm run video -- <mẫu> [xe]\nMẫu: ${Object.keys(templates).join(", ")}\nXe: ${cars.map((car) => car.id).join(", ")}, tat-ca`);
  process.exit(1);
}

let jobs;
if (template === "xe-cu") {
  const available = usedCars.filter((item) => item.status === "available");
  const chosen = !target || target === "tat-ca" ? available : available.filter((item) => item.slug === target || item.slug.endsWith(target) || item.id === target);
  if (!chosen.length) {
    console.error(`Không có xe cũ đang bán khớp "${target}". Xe đang bán:\n${available.map((item) => `  ${item.slug}`).join("\n")}`);
    process.exit(1);
  }
  jobs = chosen.map(xeCu);
} else if (templates[template].arg) {
  const list = !target || target === "tat-ca" ? templates[template].all : [target];
  jobs = list.map((item) => templates[template].build(item));
} else if (templates[template].pair) {
  const pairs = !target || target === "tat-ca" ? pairPresets : [[target, positional[2]]];
  jobs = pairs.map(([x, y]) => soSanhXe(x, y));
} else if (templates[template].perCar) {
  if (!target) {
    console.error(`Mẫu ${template} cần tên xe: ${cars.map((car) => car.id).join(", ")} hoặc tat-ca`);
    process.exit(1);
  }
  jobs = pickCars()
    .filter((car) => template !== "diem-noi-bat" || showrooms[car.id])
    .map((car) => templates[template].build(car))
    .filter(Boolean);
} else {
  jobs = [templates[template].build()];
}

const browser = await openBrowser();
await browser.send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
try {
  for (const job of jobs) {
    console.log(`${template}: ${job.key} (${job.scenes.length} cảnh)`);
    const outDir = path.resolve(root, "..", "anh-facebook", "video", template, job.key);
    fs.mkdirSync(outDir, { recursive: true });
    await makeVideo({
      ...job,
      key: `${template}-${job.key}`,
      outDir,
      title: `LỜI ĐỌC VIDEO ${job.title} (giá tháng ${month}, lăn bánh tại ${provinceShort(province)})`,
      rerun: `npm run video -- ${template}${target ? ` ${target === "tat-ca" ? job.key.replace(/-va-/, " ") : positional.slice(1).join(" ")}` : ""}${option("ban") ? ` --ban "${option("ban")}"` : ""}`,
    }, browser);
  }
} finally {
  browser.close();
}
process.exit(0);
