import { plateFeeByArea, type Province } from "@/data/registrationFees";

export type PlateType = "white" | "yellow";

type OnRoadInput = {
  carName: string;
  price: number;
  seats?: number;
  // Bán tải chở hàng của hãng khác (Ford Ranger...) trong các bài so sánh
  isPickup?: boolean;
  province: Province;
  plateType?: PlateType;
};

// Công thức tính giá lăn bánh dùng chung cho công cụ tính (OnRoadPriceCalculator)
// và trang bảng giá (/bang-gia-xe-mitsubishi), để hai nơi luôn ra cùng một số.
export function calculateOnRoadPrice({
  carName,
  price,
  seats,
  isPickup = false,
  province,
  plateType = "white",
}: OnRoadInput) {
  // Triton được nhận diện theo tên xe: đổi tên xe sẽ làm sai công thức
  const isTriton = isPickup || carName === "Mitsubishi Triton";

  // Bán tải chở hàng (Triton) chịu 60% mức trước bạ của ô tô con tại địa phương
  const registrationTaxRate = isTriton
    ? province.taxRate * 0.6
    : province.taxRate;

  const registrationTax = price * registrationTaxRate;
  const licensePlateFee =
    plateFeeByArea[isTriton ? "pickup" : "car"][province.plateArea];
  const inspectionFee = 90000;
  const roadUseFee = isTriton
    ? 2160000
    : plateType === "yellow"
      ? 2160000
      : 1560000;
  // Bảo hiểm TNDS bắt buộc 1 năm theo Phụ lục I Nghị định 67/2023/NĐ-CP, đã gồm VAT 10%.
  // Không kinh doanh: dưới 6 chỗ và bán tải 437.000, 6–11 chỗ 794.000 (chưa VAT).
  // Kinh doanh: dưới 6 chỗ 756.000, 7 chỗ 1.080.000, bán tải 933.000 (chưa VAT).
  const insuranceFee =
    plateType === "yellow"
      ? isTriton
        ? 1026300
        : seats === 7
          ? 1188000
          : 831600
      : seats === 7 && !isTriton
        ? 873400
        : 480700;

  const fees = [
    {
      label: `Lệ phí trước bạ theo giá niêm yết (${(registrationTaxRate * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%)`,
      value: registrationTax,
    },
    { label: "Lệ phí đăng ký & biển số", value: licensePlateFee },
    { label: "Phí đăng kiểm", value: inspectionFee },
    { label: "Phí đường bộ (12 tháng)", value: roadUseFee },
    { label: "Bảo hiểm TNDS bắt buộc", value: insuranceFee },
  ];

  const totalFees = fees.reduce((sum, fee) => sum + fee.value, 0);

  return { fees, totalFees, onRoadPrice: price + totalFees };
}
