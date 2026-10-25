// Gói vay tham khảo để hiện "Trả góp từ X triệu/tháng" (25/10/2026, kiểu BMW/Mercedes).
// Anh Phúc cung cấp: TPBank 9,2%/năm năm đầu, trả trước 20%, vay 8 năm. Ngân hàng đổi lãi suất thì sửa ở đây.
// Cách tính giống công cụ trả góp: dư nợ giảm dần, số hiển thị là THÁNG ĐẦU (cao nhất), tính trên giá niêm yết.
export const financing = {
  bank: "TPBank",
  ratePercent: 9.2,
  downPaymentPercent: 20,
  years: 8,
  updated: "10/2026",
};

export function firstMonthPayment(price: number) {
  const loan = price * (1 - financing.downPaymentPercent / 100);
  return loan / (financing.years * 12) + (loan * financing.ratePercent) / 100 / 12;
}

export function monthlyLabel(price: number) {
  return `${(firstMonthPayment(price) / 1e6).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu/tháng`;
}

export const financingNote = `Tham khảo tháng đầu, trả trước ${financing.downPaymentPercent}%, vay ${financing.years} năm, lãi suất ${financing.ratePercent.toLocaleString("vi-VN")}%/năm đầu (${financing.bank}, ${financing.updated}), dư nợ giảm dần. Lãi suất thực tế theo ngân hàng duyệt.`;
