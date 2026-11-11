// Video dọc 9:16 "Đọc báo giá đúng" cho TikTok/Reels (10/11/2026), bố cục theo video mẫu anh Phúc gửi:
//   0 Mở đầu nền tối: 2 phiên bản, niêm yết chênh X → sau ưu đãi chênh Y
//   1 Quên phí đăng ký   (niêm yết + phí đăng ký = lăn bánh)
//   2 Quên trừ ưu đãi    (lăn bánh − ưu đãi = còn ...)
//   3 Ưu đãi mỗi bản mỗi khác (so ưu đãi 2 bản; xe 1 phiên bản: các khoản ưu đãi)
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
import path from "node:path";
import {
  root, cars, currentPromotion, calculateOnRoadPrice, wanted, province, otherProvince, provinceShort,
  tr, trieu, escapeHtml, monthNumber, month, siteUrl, phone, shortBenefit, variantImage,
  pairRed, box, note, row, heading, twoCars, oneCar, diffWord, openBrowser, makeVideo,
} from "./lib/video-kit.mjs";
import { pathToFileURL } from "node:url";

if (wanted.length === 0) {
  console.log(`Cách dùng: npm run price-video -- <xe>   (hoặc tat-ca)\nXe: ${cars.map((car) => car.id).join(", ")}`);
  process.exit(1);
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

function buildScenes(item) {
  const { shortName, lo, hi, base, single } = item;
  const where = provinceShort(province);
  const scenes = [];

  // 0. Mở đầu. Chênh lệch sau ưu đãi gần như bằng chênh niêm yết (vd Xforce 115 → 114,5 triệu) thì mở đầu kiểu
  // "niêm yết chênh X, thực tế chỉ còn gần X" nghe vô nghĩa (anh Phúc hỏi "làm nhầm nội dung à", 11/11/2026):
  // khi đó dùng mở đầu "niêm yết bao nhiêu, thực trả bao nhiêu" của bản rẻ nhất.
  const gapShift = single ? 0 : Math.abs(hi.net - lo.net - (hi.price - lo.price));
  const weakGap = !single && gapShift < Math.max(5_000_000, 0.1 * (hi.price - lo.price));
  if (!single && !weakGap) {
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
      voice: `${single ? shortName : `${shortName} ${lo.name}`} niêm yết ${trieu(lo.price)}. Nhưng đó chưa phải số tiền anh chị thực trả. Lăn bánh tại ${where} là ${trieu(lo.onRoad)}, trừ ưu đãi tháng ${currentPromotion.month} còn ${trieu(lo.net)}. Đọc sai báo giá là lệch cả kế hoạch.`,
      html: `${heading("", `Niêm yết ${trieu(lo.price)}`)}
        <p class="sub serif" data-at="0">Số tiền thực trả là bao nhiêu?</p>
        ${oneCar(lo, 0.02, single ? shortName : `${shortName} ${lo.name}`, "compact")}
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
      // Không mở bằng "nghĩ bản cao thì ưu đãi cao" vì nhiều tháng bản cao ưu đãi cao thật, nghe như tự mâu thuẫn
      voice: `Thứ ba: ưu đãi mỗi phiên bản mỗi khác. Tháng này ${lo.name} ưu đãi ${trieu(lo.offer)}, ${hi.name} ưu đãi ${trieu(hi.offer)}. ${verdict}. Mua bản nào, hỏi đúng ưu đãi bản đó.`,
      html: `${heading(3, "Ưu đãi mỗi bản mỗi khác")}
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

function captionText(item) {
  const hashtag = item.shortName.replace(/\s+/g, "");
  return `Đọc báo giá ${item.shortName} sao cho đúng? 4 lỗi hay gặp 👇
Bình luận phiên bản anh chị quan tâm, Phúc gửi bảng lăn bánh chi tiết đúng tỉnh.

📞 Zalo ${phone} – Lưu Hoàng Phúc, Mitsubishi Moveo New City
👉 Bảng giá + ưu đãi tháng ${month}: ${siteUrl}/bang-gia-xe-mitsubishi
Giá lăn bánh tạm tính tại ${provinceShort(province)}. Ưu đãi trừ trực tiếp vào giá xe khi ký hợp đồng.
#Mitsubishi #${hashtag} #GiaXe${hashtag} #LanBanh #MuaXeTraGop
`;
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
    await makeVideo({
      key: item.car.id,
      outDir: path.resolve(root, "..", "anh-facebook", "video-gia", `${item.car.id}-${monthNumber}-${currentPromotion.year}`),
      scenes: buildScenes(item),
      title: `LỜI ĐỌC VIDEO ${item.shortName.toUpperCase()} – THÁNG ${month} (lăn bánh tại ${provinceShort(province)})`,
      rerun: `npm run price-video -- ${item.car.id}`,
      caption: captionText(item),
    }, browser);
  }
} finally {
  browser.close();
}
process.exit(0);
