"use client";

import { FormEvent, useEffect, useState } from "react";
import { cars } from "@/data/cars";

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [leadSource, setLeadSource] = useState("Website Mitsubishi");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const carFromUrl = params.get("car");
    const variantFromUrl = params.get("variant");
    const formFromUrl = params.get("form");
    if (formFromUrl === "tra-gop") {
      setLeadSource("Công cụ tính trả góp");
    }

    if (carFromUrl) {
      const matchedCar = cars.find(
        (car) => car.id === carFromUrl || car.name === carFromUrl
      );

      if (matchedCar) {
        setSelectedCar(matchedCar.name);

        if (variantFromUrl) {
          setSelectedVariant(variantFromUrl);
        }
      }
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const customerName = String(formData.get("customerName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const car = String(formData.get("car") || "").trim();
    const variant = String(formData.get("variant") || "").trim();

    const website = String(formData.get("website") || "").trim();

    if (website) {
      form.reset();
      return;
    }

    if (!customerName || !phone || !car) {
      setMessage("Vui lòng nhập đầy đủ họ tên, số điện thoại và mẫu xe.");
      return;
    }
    const normalizedPhone = phone.replace(/[\s.-]/g, "");

    if (!/^0\d{9}$/.test(normalizedPhone)) {
      setMessage("Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_QUOTE_API_URL;

    if (!apiUrl) {
      setMessage("Hệ thống nhận báo giá chưa được cấu hình.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          customerName,
          phone: normalizedPhone,
          car,
          variant,
          source: leadSource,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi yêu cầu báo giá.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Không thể gửi yêu cầu báo giá.");
      }

      setMessage(
        "Đã gửi yêu cầu báo giá. Lưu Hoàng Phúc sẽ liên hệ tư vấn sớm."
      );
      setIsSuccess(true);

      form.reset();
      setSelectedCar("");
      setSelectedVariant("");
    } catch (error) {
      console.error(error);

      setMessage(
        "Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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

          {!isSuccess ? (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8"
            >
              <div
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
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
                    autoComplete="name"
                    required
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block font-semibold">
                    Số điện thoại
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="car" className="mb-2 block font-semibold">
                    Mẫu xe quan tâm
                  </label>

                  <select
                    id="car"
                    name="car"
                    value={selectedCar}
                    onChange={(event) => {
                      setSelectedCar(event.target.value);
                      setSelectedVariant("");
                    }}
                    required
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
                {selectedVariant && (
                  <div>
                    <label
                      htmlFor="variant"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Phiên bản quan tâm
                    </label>

                    <input
                      id="variant"
                      name="variant"
                      type="text"
                      value={selectedVariant}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-lg bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSubmitting ? "Đang gửi..." : "Nhận báo giá ngay"}
              </button>

              {message && (
                <p className="mt-4 text-center font-semibold text-gray-700">
                  {message}
                </p>
              )}

              <p className="mt-4 text-center text-sm text-gray-500">
                Thông tin được sử dụng để liên hệ tư vấn theo yêu cầu của khách hàng.
              </p>
            </form>
          ) : (
            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-8 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-700">
                ✓ Yêu cầu báo giá đã được gửi
              </div>
              <p className="mt-3 text-gray-700">
                Cảm ơn bạn đã để lại thông tin. Lưu Hoàng Phúc sẽ liên hệ tư vấn giá xe và ưu đãi trong thời gian sớm nhất.
              </p>
              <a
                href="/"
                className="mx-auto mt-6 hidden w-fit rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 md:block"
              >
                ← Quay về trang chủ
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}