"use client";

import { useState } from "react";
import type { VariantPromotion } from "@/data/promotions";

type RegistrationArea = "hcm" | "hanoi" | "province";
type PlateType = "white" | "yellow";

type Props = {
  carName: string;
  variantName: string;
  price: number;
  seats?: number;
  promotion?: VariantPromotion;
};

export default function OnRoadPriceCalculator({
  carName,
  variantName,
  price,
  seats,
  promotion,
}: Props) {
  const [registrationArea, setRegistrationArea] =
    useState<RegistrationArea>("hcm");

  const [plateType, setPlateType] = useState<PlateType>("white");
  const totalPromotionValue =
  promotion?.benefits.reduce(
    (total, benefit) => total + (benefit.value ?? 0),
    0
  ) ?? 0;
  const isTriton = carName === "Mitsubishi Triton";

const registrationTaxRate = isTriton
  ? registrationArea === "hanoi"
    ? 0.07
    : 0.06
  : registrationArea === "hanoi"
    ? 0.12
    : 0.1;

const registrationTax = price * registrationTaxRate;
const licensePlateFee = isTriton
  ? registrationArea === "province"
    ? 100000
    : 350000
  : registrationArea === "province"
    ? 140000
    : 14000000;
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
      const registrationServiceFee =
  plateType === "yellow"
    ? registrationArea === "hcm"
      ? 4000000
      : null
    : registrationArea === "hcm"
      ? 3000000
      : 5000000;
      const onRoadPrice =
  price +
  registrationTax +
  licensePlateFee +
  inspectionFee +
  roadUseFee +
  insuranceFee +
  (registrationServiceFee ?? 0);
  const onRoadPriceAfterPromotion = Math.max(
  0,
  onRoadPrice - totalPromotionValue
);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        Chi phí dự kiến
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        Dự tính giá lăn bánh
      </h3>

      <p className="mt-2 text-gray-600">
        {variantName === carName.replace("Mitsubishi ", "")
  ? carName
  : `${carName} ${variantName}`}
      </p>

      <p className="mt-1 text-xl font-bold text-red-600">
        {price.toLocaleString("vi-VN")} đ
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="registration-area"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Nơi đăng ký
          </label>

          <select
            id="registration-area"
            value={registrationArea}
            onChange={(event) =>
              setRegistrationArea(event.target.value as RegistrationArea)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-red-600"
          >
            <option value="hcm">TP. Hồ Chí Minh</option>
            <option value="hanoi">Hà Nội</option>
            <option value="province">Tỉnh/Thành khác</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="plate-type"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Loại đăng ký
          </label>

          <select
            id="plate-type"
            value={plateType}
            onChange={(event) =>
              setPlateType(event.target.value as PlateType)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-red-600"
          >
            <option value="white">Biển trắng</option>
            <option value="yellow">Biển vàng</option>
          </select>
        </div>
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3"></div>
  <div className="flex items-center justify-between gap-4">
    <span className="text-gray-600">
      Lệ phí trước bạ ({Math.round(registrationTaxRate * 100)}%)
    </span>

    <span className="font-bold">
      {registrationTax.toLocaleString("vi-VN")} đ
    </span>
  </div>
  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
  <span className="text-gray-600">
    Lệ phí cấp đăng ký & biển số
  </span>

  <span className="font-bold">
    {licensePlateFee.toLocaleString("vi-VN")} đ
  </span>
</div>
<div className="mt-2 flex items-center justify-between gap-4 text-sm">
  <span className="text-gray-600">
    Phí đăng kiểm
  </span>

  <span className="whitespace-nowrap font-bold">
    {inspectionFee.toLocaleString("vi-VN")} đ
  </span>
</div>
<div className="mt-2 flex items-center justify-between gap-4 text-sm">
  <span className="text-gray-600">
    Phí sử dụng đường bộ (12 tháng)
  </span>

  <span className="font-bold">
    {roadUseFee.toLocaleString("vi-VN")} đ
  </span>
</div>
<div className="mt-2 flex items-center justify-between gap-4 text-sm">
  <span className="text-gray-600">
    Bảo hiểm BHDS bắt buộc
  </span>

  <span className="font-bold">
    {insuranceFee.toLocaleString("vi-VN")} đ
  </span>
</div>
<div className="mt-2 flex items-center justify-between gap-4 text-sm">
  <span className="text-gray-600">
    Dịch vụ đăng ký
  </span>

  <span className="font-bold">
    {registrationServiceFee !== null
      ? `${registrationServiceFee.toLocaleString("vi-VN")} đ`
      : "Liên hệ"}
  </span>
</div>
<div className="mt-6 border-t-2 border-red-600 pt-5">
  <div className="flex items-end justify-between gap-4">
    <span className="font-bold uppercase text-gray-900">
      Lăn bánh dự kiến
    </span>

    <span className="whitespace-nowrap text-xl font-bold text-red-600 sm:text-2xl">
  {onRoadPrice.toLocaleString("vi-VN")} đ
</span>
  </div>

  {registrationServiceFee === null && (
    <p className="mt-3 text-sm text-amber-700">
      * Giá lăn bánh trên chưa bao gồm phí dịch vụ đăng ký biển vàng.
      Vui lòng liên hệ để được xác nhận theo Tỉnh/Thành đăng ký.
    </p>
  )}

  {promotion && promotion.benefits.length > 0 && (
  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
    <p className="text-sm font-bold uppercase text-red-600">
      Ưu đãi hiện hành
    </p>

    {totalPromotionValue > 0 && (
  <div className="mt-3 space-y-2">
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-gray-700">
        Tổng giá trị quyền lợi
      </span>
      <span className="font-bold text-red-600">
        -{totalPromotionValue.toLocaleString("vi-VN")} đ
      </span>
    </div>

    <div className="flex items-end justify-between gap-4 border-t border-red-200 pt-3">
      <span className="font-bold uppercase text-gray-900">
        Dự kiến sau ưu đãi
      </span>
      <span className="whitespace-nowrap text-xl font-bold text-red-600">
        {onRoadPriceAfterPromotion.toLocaleString("vi-VN")} đ
      </span>
    </div>
  </div>
)}

    <ul className="mt-3 space-y-2 text-sm text-gray-700">
      {promotion.benefits.map((benefit, index) => (
        <li key={index} className="flex gap-2">
          <span className="font-bold text-red-600">•</span>
          <span>{benefit.label}</span>
        </li>
      ))}
    </ul>

    <p className="mt-3 text-xs leading-5 text-gray-500">
      Giá sau ưu đãi được quy đổi tham khảo từ tổng giá trị quyền lợi
của chương trình. Một số quyền lợi có thể là nhiên liệu, phụ kiện
hoặc hỗ trợ khác, không phải tiền mặt. Vui lòng nhận báo giá để
xác nhận ưu đãi thực tế.
    </p>
  </div>
)}

<a
  href="/#bao-gia"
  className="mt-4 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
>
  Nhận báo giá
</a>

  <p className="mt-3 text-xs leading-5 text-gray-500">
    Chi phí lăn bánh mang tính dự tính và tham khảo. Chi phí thực tế có
    thể thay đổi theo thời điểm đăng ký, địa phương, hồ sơ xe và chính
    sách hiện hành.
  </p>
</div>
</div>
  );
}