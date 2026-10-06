// Lệ phí đăng ký xe ô tô con (≤ 9 chỗ) theo 34 tỉnh, thành phố (sau sắp xếp đơn vị hành chính 2025).
// Cập nhật: 10/2026.
//
// - Lệ phí trước bạ lần đầu: mức chung 10%; HĐND tỉnh được tăng tối đa 50% (tức tối đa 15%).
//   Xe bán tải chở hàng (Triton): 60% mức thu của ô tô con tại địa phương.
// - Lệ phí cấp đăng ký & biển số (Thông tư 155/2025/TT-BTC, từ 01/01/2026):
//   Khu vực I (Hà Nội, TP.HCM): 14.000.000đ; Khu vực II (các tỉnh, thành khác): 140.000đ.
//
// Khi địa phương ban hành mức mới, chỉ cần sửa `taxRate` của tỉnh đó.

export type Province = {
  id: string;
  name: string;
  type: "city" | "province";
  // Tỷ lệ lệ phí trước bạ lần đầu cho ô tô con (0.1 = 10%)
  taxRate: number;
  // Khu vực tính lệ phí biển số theo Thông tư 155/2025/TT-BTC
  plateArea: "I" | "II";
};

export const provinces: Province[] = [
  // 6 thành phố trực thuộc Trung ương
  { id: "ha-noi", name: "Hà Nội", type: "city", taxRate: 0.12, plateArea: "I" },
  { id: "tp-hcm", name: "TP. Hồ Chí Minh", type: "city", taxRate: 0.1, plateArea: "I" },
  { id: "hai-phong", name: "Hải Phòng", type: "city", taxRate: 0.12, plateArea: "II" },
  { id: "da-nang", name: "Đà Nẵng", type: "city", taxRate: 0.1, plateArea: "II" },
  { id: "can-tho", name: "Cần Thơ", type: "city", taxRate: 0.12, plateArea: "II" },
  { id: "hue", name: "Huế", type: "city", taxRate: 0.1, plateArea: "II" },

  // 28 tỉnh
  { id: "an-giang", name: "An Giang", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "bac-ninh", name: "Bắc Ninh", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "ca-mau", name: "Cà Mau", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "cao-bang", name: "Cao Bằng", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "dak-lak", name: "Đắk Lắk", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "dien-bien", name: "Điện Biên", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "dong-nai", name: "Đồng Nai", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "dong-thap", name: "Đồng Tháp", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "gia-lai", name: "Gia Lai", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "ha-tinh", name: "Hà Tĩnh", type: "province", taxRate: 0.11, plateArea: "II" },
  { id: "hung-yen", name: "Hưng Yên", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "khanh-hoa", name: "Khánh Hòa", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "lai-chau", name: "Lai Châu", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "lam-dong", name: "Lâm Đồng", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "lang-son", name: "Lạng Sơn", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "lao-cai", name: "Lào Cai", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "nghe-an", name: "Nghệ An", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "ninh-binh", name: "Ninh Bình", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "phu-tho", name: "Phú Thọ", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "quang-ngai", name: "Quảng Ngãi", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "quang-ninh", name: "Quảng Ninh", type: "province", taxRate: 0.12, plateArea: "II" },
  { id: "quang-tri", name: "Quảng Trị", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "son-la", name: "Sơn La", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "tay-ninh", name: "Tây Ninh", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "thai-nguyen", name: "Thái Nguyên", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "thanh-hoa", name: "Thanh Hóa", type: "province", taxRate: 0.1, plateArea: "II" },
  { id: "tuyen-quang", name: "Tuyên Quang", type: "province", taxRate: 0.11, plateArea: "II" },
  { id: "vinh-long", name: "Vĩnh Long", type: "province", taxRate: 0.1, plateArea: "II" },
];

export const defaultProvinceId = "tp-hcm";

export const plateFeeByArea = {
  car: { I: 14_000_000, II: 140_000 },
  // Xe bán tải chở hàng (Triton): giữ mức website đang dùng
  pickup: { I: 350_000, II: 100_000 },
} as const;
