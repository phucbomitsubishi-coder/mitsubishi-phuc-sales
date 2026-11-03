// Gói vay tham khảo để hiện "Trả góp từ X triệu/tháng" (25/10/2026, kiểu BMW/Mercedes).
// Từ 11/2026 theo công văn MMV Auto Finance (MAF) tháng 11/2026 (CV 17/BDO/MMV, áp dụng đến 31/03/2027 hoặc khi có thông báo mới).
// Ngân hàng đổi lãi suất thì sửa ở đây. KHÔNG đưa hoa hồng tư vấn (thông tin nội bộ) lên web.
// Cách tính giống công cụ trả góp: dư nợ giảm dần, số hiển thị là THÁNG ĐẦU (cao nhất), tính trên giá niêm yết.
export const financing = {
  bank: "TPBank",
  ratePercent: 9.2,
  downPaymentPercent: 20,
  years: 8,
  updated: "11/2026",
};

export function firstMonthPayment(price: number, plan: { ratePercent: number; downPaymentPercent: number; years: number } = financing) {
  const loan = price * (1 - plan.downPaymentPercent / 100);
  return loan / (plan.years * 12) + (loan * plan.ratePercent) / 100 / 12;
}

export function monthlyLabel(price: number, plan?: { ratePercent: number; downPaymentPercent: number; years: number }) {
  return `${(firstMonthPayment(price, plan) / 1e6).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu/tháng`;
}

export const financingNote = `Tham khảo tháng đầu, trả trước ${financing.downPaymentPercent}%, vay ${financing.years} năm, lãi suất ${financing.ratePercent.toLocaleString("vi-VN")}%/năm cố định 12 tháng đầu (${financing.bank}, ${financing.updated}), dư nợ giảm dần. Lãi suất thực tế theo ngân hàng duyệt.`;

// Xe đã qua sử dụng (MAF 11/2026): TPBank cho vay tối đa 75%, tối đa 72 tháng, xe chưa quá 7 năm kể từ năm sản xuất.
// Web tính với trả trước 30%, vay 6 năm, lãi suất cố định 12 tháng của TPBank.
export const usedFinancing = {
  bank: "TPBank",
  ratePercent: 9.2,
  downPaymentPercent: 30,
  years: 6,
  maxCarAgeYears: 7,
  updated: "11/2026",
};

export const usedFinancingNote = `Tham khảo tháng đầu, trả trước ${usedFinancing.downPaymentPercent}%, vay ${usedFinancing.years} năm, lãi suất ${usedFinancing.ratePercent.toLocaleString("vi-VN")}%/năm cố định 12 tháng đầu (${usedFinancing.bank}, ${usedFinancing.updated}), dư nợ giảm dần. Áp dụng xe chưa quá ${usedFinancing.maxCarAgeYears} năm kể từ năm sản xuất; ngân hàng thẩm định giá xe và hồ sơ.`;

export function usedCarFinanceable(modelYear: number, now = new Date()) {
  return now.getFullYear() - modelYear <= usedFinancing.maxCarAgeYears;
}

// Bảng gói vay ngân hàng đối tác (MAF 11/2026) cho trang /du-toan/tra-gop.
// fixed: các gói lãi suất cố định; "sau ưu đãi" = lãi suất tham chiếu của ngân hàng + biên độ.
export type BankPackage = {
  bank: string;
  fixed: { months: number; ratePercent: number }[];
  marginPercent: string;
  maxLoanPercent: string;
  maxTermMonths: number;
  note?: string;
};

export const bankPackagesUpdated = "11/2026";

export const newCarBankPackages: BankPackage[] = [
  {
    bank: "VPBank",
    fixed: [
      { months: 6, ratePercent: 7.9 },
      { months: 12, ratePercent: 9.7 },
      { months: 24, ratePercent: 11.4 },
    ],
    marginPercent: "3,3–3,6",
    maxLoanPercent: "85% (Triton 75%)",
    maxTermMonths: 96,
    note: "Destinator: gói cố định 24 tháng 10,8%/năm. Cá nhân được ân hạn gốc tối đa 6 tháng.",
  },
  {
    bank: "TPBank",
    fixed: [
      { months: 6, ratePercent: 8.2 },
      { months: 12, ratePercent: 9.2 },
      { months: 24, ratePercent: 11.2 },
    ],
    marginPercent: "3,6",
    maxLoanPercent: "80%",
    maxTermMonths: 96,
    note: "Cá nhân được ân hạn gốc tối đa 6 tháng.",
  },
  {
    bank: "Shinhan Bank",
    fixed: [{ months: 12, ratePercent: 10.5 }],
    marginPercent: "2,0",
    maxLoanPercent: "85%",
    maxTermMonths: 120,
    note: "Có thêm gói lãi suất thả nổi thấp hơn lãi suất tham chiếu 0,1–0,7% suốt thời gian vay.",
  },
];

export const usedCarBankPackages: BankPackage[] = [
  {
    bank: "VPBank",
    fixed: [
      { months: 6, ratePercent: 7.9 },
      { months: 12, ratePercent: 9.7 },
      { months: 24, ratePercent: 11.4 },
    ],
    marginPercent: "3,3–3,6",
    maxLoanPercent: "70%",
    maxTermMonths: 96,
    note: "Xe chưa quá 7 năm kể từ năm sản xuất.",
  },
  {
    bank: "TPBank",
    fixed: [
      { months: 6, ratePercent: 8.2 },
      { months: 12, ratePercent: 9.2 },
      { months: 24, ratePercent: 11.2 },
    ],
    marginPercent: "3,6",
    maxLoanPercent: "75%",
    maxTermMonths: 72,
    note: "Xe chưa quá 7 năm kể từ năm sản xuất.",
  },
  {
    bank: "Shinhan Bank",
    fixed: [{ months: 12, ratePercent: 11.8 }],
    marginPercent: "2,0",
    maxLoanPercent: "70%",
    maxTermMonths: 60,
    note: "Xe chưa quá 4 năm kể từ năm sản xuất.",
  },
];
