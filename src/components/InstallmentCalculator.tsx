"use client";

import { useState } from "react";
import { cars } from "@/data/cars";

export default function InstallmentCalculator() {
      const [downPaymentPercent, setDownPaymentPercent] = useState(15);
      const [loanYears, setLoanYears] = useState(8);
      const [interestRate, setInterestRate] = useState(8);
  const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id ?? "");

  const selectedCar =
    cars.find((car) => car.id === selectedCarId) ?? cars[0];

  const [selectedVariantName, setSelectedVariantName] = useState(
    selectedCar?.variants[0]?.name ?? ""
  );

  const selectedVariant =
    selectedCar?.variants.find(
      (variant) => variant.name === selectedVariantName
    ) ?? selectedCar?.variants[0];

  function handleCarChange(carId: string) {
    const newCar = cars.find((car) => car.id === carId);

    setSelectedCarId(carId);
    setSelectedVariantName(newCar?.variants[0]?.name ?? "");
  }

  if (!selectedCar || !selectedVariant) {
    return null;
  }
  const downPaymentAmount =
  selectedVariant.price * (downPaymentPercent / 100);

const loanAmount =
  selectedVariant.price - downPaymentAmount;
  const loanMonths = loanYears * 12;

const monthlyPrincipal = loanAmount / loanMonths;

const monthlyInterestRate = interestRate / 100 / 12;

const firstMonthInterest = loanAmount * monthlyInterestRate;

const firstMonthPayment =
  monthlyPrincipal + firstMonthInterest;
  const month12RemainingBalance =
  loanAmount - monthlyPrincipal * 11;

const month12Interest =
  month12RemainingBalance * monthlyInterestRate;

const month12Payment =
  monthlyPrincipal + month12Interest;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="installment-car"
            className="mb-2 block font-semibold text-gray-900"
          >
            Mẫu xe
          </label>

          <select
            id="installment-car"
            value={selectedCar.id}
            onChange={(event) => handleCarChange(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-600"
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="installment-variant"
            className="mb-2 block font-semibold text-gray-900"
          >
            Phiên bản
          </label>

          <select
            id="installment-variant"
            value={selectedVariant.name}
            onChange={(event) => setSelectedVariantName(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-600"
          >
            {selectedCar.variants.map((variant) => (
              <option key={variant.name} value={variant.name}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
        <p className="text-sm font-medium text-gray-600">
          Giá xe dùng để dự tính
        </p>

        <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
          <p className="font-semibold text-gray-900">
            {selectedCar.name} · {selectedVariant.name}
          </p>

          <p className="text-2xl font-bold text-red-600">
            {selectedVariant.price.toLocaleString("vi-VN")} đ
          </p>
        </div>
      </div>
            <div>
        <label
          htmlFor="down-payment"
          className="mb-2 block font-semibold text-gray-900"
        >
          Tỷ lệ trả trước
        </label>

        <select
          id="down-payment"
          value={downPaymentPercent}
          onChange={(event) =>
            setDownPaymentPercent(Number(event.target.value))
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-600"
        >
          <option value={15}>15%</option>
          <option value={20}>20%</option>
          <option value={30}>30%</option>
          <option value={40}>40%</option>
          <option value={50}>50%</option>
          <option value={60}>60%</option>
          <option value={70}>70%</option>
        </select>
      </div>
     
<div>
  <label
    htmlFor="loan-years"
    className="mb-2 block font-semibold text-gray-900"
  >
    Thời hạn vay
  </label>

  <select
    id="loan-years"
    value={loanYears}
    onChange={(event) => setLoanYears(Number(event.target.value))}
    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-600"
  >
    <option value={1}>1 năm</option>
    <option value={2}>2 năm</option>
    <option value={3}>3 năm</option>
    <option value={4}>4 năm</option>
    <option value={5}>5 năm</option>
    <option value={6}>6 năm</option>
    <option value={7}>7 năm</option>
    <option value={8}>8 năm</option>
  </select>
</div>
<div>
  <label
    htmlFor="interest-rate"
    className="mb-2 block font-semibold text-gray-900"
  >
    Lãi suất dự kiến năm đầu (%/năm)
  </label>

  <input
    id="interest-rate"
    type="number"
    min="0"
    max="30"
    step="0.1"
    value={interestRate}
    onChange={(event) => {
  const value = Number(event.target.value);

  if (value >= 0 && value <= 30) {
    setInterestRate(value);
  }
}}
onBlur={(event) => {
  event.currentTarget.value = String(interestRate);
}}
    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-600"
  />

  <p className="mt-2 text-sm text-gray-500">
    Mức lãi suất dùng để dự tính cho năm đầu. Lãi suất các năm tiếp theo có thể
    thay đổi theo chính sách của ngân hàng và hợp đồng tín dụng.
  </p>
</div>
 <div className="grid gap-4 md:grid-cols-2">
  <div className="rounded-xl bg-gray-100 p-5">
    <p className="text-sm text-gray-600">
      Số tiền trả trước ({downPaymentPercent}%)
    </p>

    <p className="mt-2 text-xl font-bold text-gray-900">
      {downPaymentAmount.toLocaleString("vi-VN")} đ
    </p>
  </div>

  <div className="rounded-xl bg-gray-900 p-5 text-white">
    <p className="text-sm text-gray-300">
      Khoản vay dự kiến
    </p>

    <p className="mt-2 text-xl font-bold">
      {loanAmount.toLocaleString("vi-VN")} đ
    </p>
  </div>
</div>
<div className="rounded-2xl border border-gray-200 bg-white p-5">
  <h3 className="text-lg font-bold text-gray-900">
    Dự tính thanh toán trong năm đầu
  </h3>
  <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
  <p className="text-sm font-medium text-gray-600">
    Khoảng thanh toán dự kiến trong năm đầu
  </p>

  <p className="mt-1 text-2xl font-bold text-red-600">
    {firstMonthPayment.toLocaleString("vi-VN", {
      maximumFractionDigits: 0,
    })}{" "}
    đ →{" "}
    {month12Payment.toLocaleString("vi-VN", {
      maximumFractionDigits: 0,
    })}{" "}
    đ/tháng
  </p>

  <p className="mt-1 text-sm text-gray-500">
    Khoản thanh toán giảm dần do tiền lãi được tính trên dư nợ còn lại.
  </p>
</div>

  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-sm text-gray-600">
        Gốc trả mỗi tháng (dự kiến)
      </p>

      <p className="mt-1 text-lg font-bold text-gray-900">
        {monthlyPrincipal.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        })}{" "}
        đ
      </p>
    </div>

    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-sm text-gray-600">
        Lãi tháng đầu
      </p>

      <p className="mt-1 text-lg font-bold text-gray-900">
        {firstMonthInterest.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        })}{" "}
        đ
      </p>
    </div>

    <div className="rounded-xl bg-red-600 p-4 text-white">
      <p className="text-sm text-red-100">
        Thanh toán tháng đầu
      </p>

      <p className="mt-1 text-lg font-bold">
        {firstMonthPayment.toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        })}{" "}
        đ
      </p>
    </div>
    <div className="rounded-xl bg-gray-900 p-4 text-white">
  <p className="text-sm text-gray-300">
    Thanh toán tháng 12
  </p>

  <p className="mt-1 text-lg font-bold">
    {month12Payment.toLocaleString("vi-VN", {
      maximumFractionDigits: 0,
    })}{" "}
    đ
  </p>

  <p className="mt-1 text-xs text-gray-400">
    Lãi tháng 12:{" "}
    {month12Interest.toLocaleString("vi-VN", {
      maximumFractionDigits: 0,
    })}{" "}
    đ
  </p>
</div>
  </div>
</div>
<a
  href={`/?form=tra-gop&car=${encodeURIComponent(
    selectedCar.id
  )}&variant=${encodeURIComponent(selectedVariant.name)}#bao-gia`}
  className="flex w-full items-center justify-center rounded-lg bg-red-600 px-6 py-4 text-base font-bold text-white transition hover:bg-red-700"
>
  Nhận tư vấn trả góp
</a>
    </div>
  );
}