import { plateFeeByArea, type Province } from "@/data/registrationFees";

export type PlateType = "white" | "yellow";

type OnRoadInput = {
  carName: string;
  price: number;
  seats?: number;
  province: Province;
  plateType?: PlateType;
};

// Công thức tính giá lăn bánh dùng chung cho công cụ tính (OnRoadPriceCalculator)
// và trang bảng giá (/bang-gia-xe-mitsubishi), để hai nơi luôn ra cùng một số.
export function calculateOnRoadPrice({
  carName,
  price,
  seats,
  province,
  plateType = "white",
}: OnRoadInput) {
  // Triton được nhận diện theo tên xe: đổi tên xe sẽ làm sai công thức
  const isTriton = carName === "Mitsubishi Triton";

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
  const insuranceFee =
    plateType === "yellow"
      ? seats === 7
        ? 1203000
        : 842000
      : seats === 7
        ? 944000
        : 531000;

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
