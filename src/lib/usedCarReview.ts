import { cars } from "@/data/cars";
import { defaultProvinceId, provinces } from "@/data/registrationFees";
import type { UsedCar } from "@/data/usedCars";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion } from "@/lib/promotionItems";

// "Nhận xét của Phúc" trên trang chi tiết xe cũ (29/10/2026): tự viết từ số liệu có thật của từng xe
// (đời, số km, giá) + giá xe mới cùng dòng trong cars.ts, để trang có nội dung riêng mà không bịa tình trạng xe.
// Thêm dòng xe mới: thêm câu vào `modelNotes` (khóa = id xe trong cars.ts, hoặc "outlander").

const modelNotes: Record<string, string> = {
  xpander:
    "Xpander là MPV 7 chỗ xếp 2+3+2, gầm cao 225 mm, máy xăng 1.5L. Xe hợp gia đình 5–7 người đi phố và về quê, hoặc người cần xe rộng để chạy dịch vụ.",
  "xpander-cross":
    "Xpander Cross là bản phong cách SUV của Xpander: vẫn 7 chỗ, gầm cao 225 mm. Xe hợp gia đình thích dáng SUV nhưng vẫn cần đủ 3 hàng ghế.",
  xforce:
    "Xforce là SUV cỡ B 5 chỗ, gầm cao 222 mm, máy xăng 1.5L. Xe hợp gia đình 4–5 người đi phố hằng ngày, cần gầm cao để đi đường ngập hoặc đường quê.",
  attrage:
    "Attrage là sedan cỡ nhỏ, máy 1.2L tiết kiệm xăng, chi phí nuôi xe thấp. Xe hợp người mua ô tô lần đầu hoặc chạy dịch vụ.",
  triton:
    "Triton là bán tải, hợp người cần chở hàng, đi công trình hoặc đường xấu, kết hợp đi chơi cuối tuần.",
  outlander:
    "Outlander là SUV cỡ C 7 chỗ (5+2), từng lắp ráp tại Việt Nam. Thế hệ này đã ngừng bán xe mới từ cuối năm 2025 (Mitsubishi thay bằng Destinator), nên mua xe đã qua sử dụng là cách sở hữu Outlander với giá mềm hơn.",
};

const now = new Date();

// Số năm đã sử dụng: ưu tiên ngày đăng ký lần đầu "MM/YYYY", không có thì tính từ giữa năm sản xuất
function yearsInUse(car: UsedCar) {
  const match = car.firstRegistration.trim().match(/^(\d{1,2})\/(\d{4})$/);
  const months = match
    ? (now.getFullYear() - Number(match[2])) * 12 + (now.getMonth() + 1 - Number(match[1]))
    : (now.getFullYear() - car.modelYear) * 12 + now.getMonth() + 1 - 6;
  return Math.max(months / 12, 0.5);
}

function findNewCar(car: UsedCar) {
  return [...cars]
    .sort((a, b) => b.name.length - a.name.length)
    .find((item) => car.name === item.name || car.name.startsWith(`${item.name} `) || car.variant === item.name.replace("Mitsubishi ", ""));
}

export function usedCarReview(car: UsedCar) {
  const paragraphs: string[] = [];
  const newCar = findNewCar(car);
  const modelKey = newCar?.id ?? (car.name.includes("Outlander") ? "outlander" : "");
  if (modelNotes[modelKey]) paragraphs.push(modelNotes[modelKey]);

  // Số km so với thời gian sử dụng
  const years = yearsInUse(car);
  const perYear = Math.round(car.mileage / years / 1000) * 1000;
  const km = car.mileage.toLocaleString("vi-VN");
  const usage =
    perYear < 12000
      ? "đi khá ít so với mức 15.000–20.000 km/năm thường gặp ở xe gia đình"
      : perYear <= 22000
        ? "ở mức sử dụng bình thường của xe gia đình"
        : "đi khá nhiều, nên xem kỹ lịch sử bảo dưỡng trước khi quyết định";
  paragraphs.push(
    `Xe đời ${car.modelYear}, đã đi ${km} km, trung bình khoảng ${perYear.toLocaleString("vi-VN")} km mỗi năm: ${usage}.`
  );

  // So với xe mới cùng dòng (lăn bánh TP.HCM, chưa trừ ưu đãi tháng). Chỉ tính chênh lệch khi trùng tên phiên bản;
  // tên phiên bản đời cũ khác đời mới (vd Xforce Premium 2024) thì chỉ nêu khoảng giá xe mới, không so số.
  if (newCar) {
    const province = provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];
    const onRoad = (price: number, seats?: number) =>
      calculateOnRoadPrice({ carName: newCar.name, price, seats, province }).onRoadPrice;
    const sameVariant = newCar.variants.find((variant) => variant.name === car.variant);
    if (sameVariant) {
      const onRoadPrice = onRoad(sameVariant.price, sameVariant.specifications?.seats);
      const label = newCar.name.endsWith(sameVariant.name) ? `${newCar.name} mới` : `${newCar.name} ${sameVariant.name} mới`;
      const gap = onRoadPrice - car.price;
      paragraphs.push(
        gap > 20_000_000
          ? `${label} hiện lăn bánh tại TP.HCM khoảng ${formatMillion(onRoadPrice)} đồng (chưa trừ ưu đãi tháng). Xe này giá ${formatMillion(car.price)} đồng, thấp hơn khoảng ${formatMillion(gap)} đồng; khi sang tên vẫn có lệ phí trước bạ 2% và phí đăng ký, Phúc báo số chính xác khi bạn hỏi.`
          : `${label} hiện lăn bánh tại TP.HCM khoảng ${formatMillion(onRoadPrice)} đồng (chưa trừ ưu đãi tháng). Giá xe này gần với xe mới, nên so kỹ trang bị, số km và ưu đãi tháng của xe mới trước khi chọn.`
      );
    } else {
      const sorted = [...newCar.variants].sort((a, b) => a.price - b.price);
      const lowest = sorted[0];
      const range =
        sorted.length > 1
          ? `từ ${formatMillion(lowest.price)} đến ${formatMillion(sorted[sorted.length - 1].price)} đồng`
          : `${formatMillion(lowest.price)} đồng`;
      paragraphs.push(
        `${newCar.name} mới hiện niêm yết ${range}, lăn bánh tại TP.HCM từ khoảng ${formatMillion(onRoad(lowest.price, lowest.specifications?.seats))} đồng (chưa trừ ưu đãi tháng). Phiên bản đời cũ có thể khác trang bị so với các bản đang bán, Phúc sẽ so cụ thể giúp bạn.`
      );
    }
  }

  paragraphs.push(
    car.mileage >= 40000
      ? "Khi xem xe, nên hỏi sổ bảo dưỡng và các hạng mục đã thay ở các mốc lớn (dầu hộp số, nước làm mát, lốp, má phanh), rồi lái thử trên cả đường phố và đường nhanh."
      : "Khi xem xe, nên xem sổ bảo dưỡng, độ mòn lốp và má phanh, rồi lái thử trên cả đường phố và đường nhanh."
  );

  return { paragraphs, newCar };
}
