"use client";

import { cars } from "@/data/cars";

export default function QuoteForm() {
  return (
    <section id="bao-gia" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Nhận báo giá
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Nhận báo giá Mitsubishi
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Để lại thông tin và mẫu xe quan tâm. Lưu Hoàng Phúc sẽ liên hệ
              tư vấn giá xe, chương trình ưu đãi và phương án trả góp phù hợp.
            </p>
          </div>

          <form className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block font-semibold"
                >
                  Họ và tên
                </label>

                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-semibold"
                >
                  Số điện thoại
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Nhập số điện thoại"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="car"
                  className="mb-2 block font-semibold"
                >
                  Mẫu xe quan tâm
                </label>

                <select
                  id="car"
                  name="car"
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
                >
                  <option value="" disabled>
                    Chọn mẫu xe
                  </option>

                  {cars.map((car) => (
                    <option key={car.slug} value={car.name}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700"
            >
              Nhận báo giá ngay
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Thông tin được sử dụng để liên hệ tư vấn theo yêu cầu của khách hàng.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}