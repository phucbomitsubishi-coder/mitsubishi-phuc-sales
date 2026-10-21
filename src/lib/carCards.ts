import { cars } from "@/data/cars";
import { showrooms } from "@/data/showroom";
import { buildPromotionItem, formatMillion } from "@/lib/promotionItems";

// Dữ liệu thẻ xe dùng chung cho banner trang chủ (HeroShowroom) và khối "Các dòng xe" (CarLineup)
// trên trang chủ và trang Giới thiệu.

// [phiên bản, màu] lấy ảnh nhìn ngang cho thẻ xe
const cardColors: Record<string, [string, string]> = {
  destinator: ["Ultimate", "Xanh Đen"],
  triton: ["4WD AT Athlete", "Cam"],
  xforce: ["Luxury", "Trắng"],
  "xpander-cross": ["Xpander Cross", "Nâu"],
  xpander: ["AT Premium", "Trắng"],
  attrage: ["CVT Premium", "Xám"],
};

const categoryLabel: Record<string, string> = { Pickup: "Bán tải" };
const maxPromotionByCar = Object.fromEntries(cars.map(buildPromotionItem).map((item) => [item.carId, item.maxValue]));

// Banner và lưới xe: câu mô tả ngắn từng xe, nhóm nhu cầu để lọc
const taglines: Record<string, string> = {
  destinator: "SUV 7 chỗ gia đình",
  triton: "Bán tải diesel 2.4L",
  xforce: "SUV 5 chỗ đô thị",
  "xpander-cross": "MPV 7 chỗ phong cách SUV",
  xpander: "MPV 7 chỗ gia đình",
  attrage: "Sedan tiết kiệm xăng",
};
export const lineupNeeds = [
  { id: "family", label: "Gia đình 7 chỗ" },
  { id: "suv5", label: "SUV 5 chỗ" },
  { id: "pickup", label: "Bán tải" },
  { id: "sedan", label: "Sedan" },
];
export const carCards = cars.map((car) => {
  const minPrice = Math.min(...car.variants.map((variant) => variant.price));
  const maxPromotion = maxPromotionByCar[car.id] ?? 0;
  // Ảnh xe nhìn ngang (bộ ảnh showroom) của phiên bản rẻ nhất, màu đầu tiên; xe chưa có thì dùng ảnh PNG cũ
  // Mỗi xe một màu đặc trưng cho thẻ xe (khác nhau để dễ phân biệt); không có thì lấy ảnh đầu tiên
  const pick = cardColors[car.id];
  const sides = showrooms[car.id]?.sideImages;
  const sideImage = sides ? (pick && sides[pick[0]]?.[pick[1]]) || Object.values(Object.values(sides)[0] ?? {})[0] : undefined;
  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    shortName: car.name.replace(/^Mitsubishi /, ""),
    image: car.image,
    sideImage,
    // Ảnh nền hiện khi rê chuột (băng chuyền trang chủ) và ảnh thẻ trang /xe, lấy từ trang MMV (showroom.ts)
    hoverBg: showrooms[car.id]?.hoverBg,
    listImage: showrooms[car.id]?.listImage,
    fuel: car.specifications.fuel,
    seats: car.specifications.seats,
    description: car.shortDescription,
    tagline: taglines[car.id] ?? categoryLabel[car.category] ?? car.category,
    priceLabel: formatMillion(minPrice),
    priceFull: `${minPrice.toLocaleString("vi-VN")} VNĐ`,
    promotionLabel: maxPromotion > 0 ? `Ưu đãi đến ${formatMillion(maxPromotion)}` : undefined,
    specs: [
      categoryLabel[car.category] ?? car.category,
      `${car.specifications.seats} chỗ`,
      car.specifications.engine,
      // Bỏ nhiên liệu nếu tên động cơ đã có (vd "Xăng Turbo 1.5L", "Diesel")
      /xăng|diesel|dầu|điện/i.test(car.specifications.engine) ? null : car.specifications.fuel,
    ]
      .filter(Boolean)
      .join(" · "),
    needs: [
      car.specifications.seats >= 7 && "family",
      car.category === "SUV" && car.specifications.seats <= 5 && "suv5",
      car.category === "Pickup" && "pickup",
      car.category === "Sedan" && "sedan",
    ].filter((item): item is string => !!item),
  };
});

// Ảnh xe màu nổi bật (nhìn ngang) theo id xe, dùng cho menu, bảng giá, phụ kiện, "Có thể bạn quan tâm"
export const featuredImages: Record<string, string> = Object.fromEntries(carCards.map((card) => [card.id, card.sideImage ?? card.image]));
