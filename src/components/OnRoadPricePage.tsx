"use client";

import { useState } from "react";
import { cars } from "@/data/cars";
import { currentPromotion } from "@/data/promotions";
import OnRoadPriceCalculator from "@/components/OnRoadPriceCalculator";

export default function OnRoadPricePage() {
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

const selectedPromotion = currentPromotion.cars
  .find((car) => car.carId === selectedCar.id)
  ?.variants.find(
    (variant) => variant.variantName === selectedVariant.name
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <label
            htmlFor="car"
            className="mb-2 block font-semibold text-gray-900"
          >
            Mẫu xe
          </label>

          <select
            id="car"
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
            htmlFor="variant"
            className="mb-2 block font-semibold text-gray-900"
          >
            Phiên bản
          </label>

          <select
            id="variant"
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
          Giá xe đang dùng để dự tính
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

      <OnRoadPriceCalculator
        carName={selectedCar.name}
        variantName={selectedVariant.name}
        price={selectedVariant.price}
        seats={selectedVariant.specifications?.seats}
        promotion={selectedPromotion}
      />
    </div>
  );
}