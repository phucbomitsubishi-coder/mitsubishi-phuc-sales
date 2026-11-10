// Nhiều mẫu video dọc 9:16 cho TikTok/Reels (10/11/2026), cùng khung và bộ dựng với price-video / compare-video
// (scripts/lib/video-kit.mjs). Số liệu lấy từ src/data + công thức của website, nên mỗi tháng chỉ cần chạy lại.
//
//   npm run video -- tra-gop <xe>        Trả góp: tiền mặt cần chuẩn bị, góp tháng đầu, trả trước 20/30/50%, lãi suất
//   npm run video -- lan-banh-tinh <xe>  Lăn bánh khác nhau theo tỉnh: trước bạ 10/12%, biển số, 5 nơi tiêu biểu
//   npm run video -- uu-dai-thang        Ưu đãi tháng của tất cả xe, xếp từ thấp đến cao (1 video cho cả hãng)
//   npm run video -- diem-noi-bat <xe>   Điểm nổi bật: ảnh lớn của MMV (showroom.ts) + trang bị bản cao nhất
//   npm run video -- xe-cu <slug|tat-ca> Xe cũ đang bán: ảnh thật, thông tin, nhận xét của Phúc (usedCarReview), trả góp
//   npm run video -- chon-xe             Có X triệu mua Mitsubishi nào? (lăn bánh sau ưu đãi theo khoảng ngân sách)
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
  tr, trieu, escapeHtml, month, siteUrl, phone, shortBenefit, variantImage, slugWords,
  box, note, row, heading, oneCar, openBrowser, makeVideo,
} from "./lib/video-kit.mjs";

const { showrooms } = await load("src/data/showroom.ts");
const { usedCars } = await load("src/data/usedCars.ts");
const { usedCarReview } = await load("src/lib/usedCarReview.ts");
const { financing, firstMonthPayment, usedFinancing, usedCarFinanceable, newCarBankPackages } = await load("src/data/financing.ts");
const { plateFeeByArea } = await load("src/data/registrationFees.ts");

const [template, target] = args.filter((arg, index) => !arg.startsWith("--") && !(index > 0 && args[index - 1].startsWith("--") && ["--ban", "--tinh"].includes(args[index - 1])));
const fileUrl = (publicPath) => pathToFileURL(path.join(root, "public", publicPath)).href;
const shortOf = (car) => car.name.replace(/^Mitsubishi /, "");
const num1 = (value) => (value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
// Số nhỏ hơn 1 triệu ghi theo nghìn ("350 nghìn" thay vì "0,35 triệu")
const money = (value) => (value < 1_000_000 ? `${(value / 1000).toLocaleString("vi-VN")} nghìn` : trieu(value));
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
            <div class="vals"><b style="grid-column:1/span 2;color:#e11d2a">${percent(rates[index] * (isPickup ? 0.6 : 1))} · ${trieu(v.price * rates[index] * (isPickup ? 0.6 : 1))}</b></div></div>`
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
        <div class="chips" data-at="0.35"><span>Giá từ ${escapeHtml(trieu(minPrice))}</span>${maxOffer ? `<span style="color:#ef2b36">Ưu đãi đến ${escapeHtml(trieu(maxOffer))}</span>` : ""}</div>`,
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

// ---------- Chạy ----------
const templates = {
  "tra-gop": { perCar: true, build: traGop },
  "lan-banh-tinh": { perCar: true, build: lanBanhTinh },
  "uu-dai-thang": { build: uuDaiThang },
  "diem-noi-bat": { perCar: true, build: diemNoiBat },
  "xe-cu": { build: null },
  "chon-xe": { build: chonXe },
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
} else if (templates[template].perCar) {
  if (!target) {
    console.error(`Mẫu ${template} cần tên xe: ${cars.map((car) => car.id).join(", ")} hoặc tat-ca`);
    process.exit(1);
  }
  jobs = pickCars()
    .filter((car) => template !== "diem-noi-bat" || showrooms[car.id])
    .map((car) => templates[template].build(car));
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
      rerun: `npm run video -- ${template}${target ? ` ${target === "tat-ca" ? job.key : target}` : ""}${option("ban") ? ` --ban "${option("ban")}"` : ""}`,
    }, browser);
  }
} finally {
  browser.close();
}
process.exit(0);
