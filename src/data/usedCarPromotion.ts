// Quà tặng khi mua xe cũ tại Ucar Moveo (chỉ lấy cột "Khuyến mãi" trong bảng giá Ucar anh Phúc gửi).
// KHÔNG đưa giá bán min, hoa hồng, quyền giảm của TVBH lên web.
// Đổi tháng: sửa month/year/gifts. Hết tháng mà chưa cập nhật thì khối tự ẩn ở lần build sau.

export const usedCarPromotion = {
  month: 10,
  year: 2026,
  gifts: [
    "Miễn phí công chứng",
    "Miễn phí rút hồ sơ",
    "Miễn phí kiểm tra tổng quát (PDI) trước khi giao",
    "Vệ sinh xe, tặng xăng và hoa khi nhận xe",
    "Tặng áo thun Ucar",
  ],
};

export function getActiveUsedCarPromotion() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const { month, year } = usedCarPromotion;
  return now.getFullYear() === year && now.getMonth() + 1 === month ? usedCarPromotion : null;
}
