// XE CÓ SẴN / ĐANG VỀ tại Mitsubishi Moveo New City (25/10/2026, kiểu "stock locator" của BMW/Mercedes).
// Anh Phúc gửi ảnh bảng "TỒN KHO MOVEO NEW CITY": ô cam = có sẵn tại đại lý, ô trắng có số = đang trên đường về.
// KHÔNG ghi số chiếc (anh Phúc chọn: tồn kho đại lý là thông tin nội bộ), chỉ trạng thái theo phiên bản + màu.
// Tên phiên bản trong bảng tồn kho → tên trên web (anh Phúc xác nhận 25/10/2026):
//   Xforce Premium = Luxury; Ultimate (2tone) = Ultimate · Destinator H = Premium, P2 (2tone) = Ultimate
//   Attrage MT.L = MT, CVT.P = CVT Premium · Xpander AT PRE = AT Premium, AT KD = AT, MT.KD = MT
//   Triton GLS+ 4x4 = 4WD AT Premium, GLS 4x2 = 2WD AT Premium, GLX 4x2 = 2WD AT GLX
// Màu 2 tông ghi như cars.ts ("Trắng Đen", không có dấu /). Sai tên phiên bản/màu thì mục đó bị bỏ qua khi hiển thị (src/lib/stock.ts).
// Cập nhật: sửa `updated` (ngày của bảng tồn kho) và danh sách. Quá STOCK_MAX_AGE_DAYS ngày chưa cập nhật thì web tự ẩn để không báo sai.

export type StockStatus = "available" | "incoming";

export type StockItem = {
  carId: string;
  variant: string;
  color: string;
  status: StockStatus;
  year: number;
};

export const stockUpdated = "2026-10-20";

export const stockItems: StockItem[] = [
  { carId: "xforce", variant: "GLX", color: "Đỏ", status: "available", year: 2026 },
  { carId: "xforce", variant: "GLX", color: "Trắng", status: "available", year: 2026 },
  { carId: "xforce", variant: "GLX", color: "Đen", status: "available", year: 2026 },
  { carId: "xforce", variant: "Luxury", color: "Xám", status: "available", year: 2026 },
  { carId: "xforce", variant: "Luxury", color: "Đỏ", status: "incoming", year: 2026 },
  { carId: "xforce", variant: "Ultimate", color: "Trắng Đen", status: "available", year: 2026 },
  { carId: "xforce", variant: "Ultimate", color: "Đỏ Đen", status: "available", year: 2026 },

  { carId: "attrage", variant: "MT", color: "Trắng", status: "available", year: 2026 },
  { carId: "attrage", variant: "CVT Premium", color: "Trắng", status: "available", year: 2026 },

  { carId: "destinator", variant: "Premium", color: "Xám", status: "available", year: 2026 },
  { carId: "destinator", variant: "Premium", color: "Trắng", status: "available", year: 2026 },
  { carId: "destinator", variant: "Premium", color: "Đỏ", status: "incoming", year: 2026 },
  { carId: "destinator", variant: "Ultimate", color: "Đỏ Đen", status: "available", year: 2026 },
  { carId: "destinator", variant: "Ultimate", color: "Xanh Đen", status: "available", year: 2026 },
  { carId: "destinator", variant: "Ultimate", color: "Trắng Đen", status: "incoming", year: 2026 },

  { carId: "xpander", variant: "AT Premium", color: "Trắng", status: "incoming", year: 2026 },
  { carId: "xpander", variant: "AT Premium", color: "Đen", status: "incoming", year: 2026 },
  { carId: "xpander", variant: "AT", color: "Trắng", status: "incoming", year: 2026 },
  { carId: "xpander-cross", variant: "Xpander Cross", color: "Trắng", status: "available", year: 2026 },
  { carId: "xpander-cross", variant: "Xpander Cross", color: "Nâu", status: "incoming", year: 2026 },

  { carId: "triton", variant: "4WD AT Premium", color: "Đen", status: "available", year: 2026 },
  { carId: "triton", variant: "4WD AT Premium", color: "Trắng", status: "available", year: 2026 },
  { carId: "triton", variant: "2WD AT GLX", color: "Đen", status: "available", year: 2026 },
  { carId: "triton", variant: "2WD AT GLX", color: "Trắng", status: "incoming", year: 2026 },
];
