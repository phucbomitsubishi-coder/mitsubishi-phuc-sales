"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzw49PlAEA9ajztoKPK5oAs1vb3HOzLXO1sikV0cjROOaLwn3eb2WLNtVBAM--ll-6t/exec";

const carNames: Record<string, string> = {
  triton: "Mitsubishi Triton",
  xforce: "Mitsubishi Xforce",
  destinator: "Mitsubishi Destinator",
  xpander: "Mitsubishi Xpander",
};

function DangKyLaiThuForm() {
  const searchParams = useSearchParams();
  const selectedCar = searchParams.get("xe") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const carId = String(formData.get("car") || "").trim();
    const note = String(formData.get("note") || "").trim();

    if (!name || !phone || !carId) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      customerName: name,
      phone,
      car: carNames[carId] || carId,
      note,
      source: "Hero - Đăng ký lái thử",
      type: "test-drive",
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi đăng ký.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Không thể gửi đăng ký.");
      }

      setSuccessMessage(
        "Đăng ký lái thử thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
      );

      form.reset();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Chưa thể gửi đăng ký. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-gray-50">
      {/* TIÊU ĐỀ */}
      <section className="bg-black py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-500">
            Mitsubishi Motors
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Đăng ký lái thử
          </h1>

          <p className="mt-3 max-w-2xl text-gray-300">
            Trải nghiệm thực tế mẫu xe Mitsubishi bạn quan tâm. Vui lòng để lại
            thông tin, chúng tôi sẽ liên hệ xác nhận lịch lái thử.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-10">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Thông tin đăng ký
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 sm:grid-cols-2"
          >
            {/* HỌ TÊN */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Họ và tên *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* SỐ ĐIỆN THOẠI */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Số điện thoại *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="09xx xxx xxx"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* MẪU XE */}
            <div className="sm:col-span-2">
              <label
                htmlFor="car"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Mẫu xe muốn lái thử *
              </label>

              <select
                id="car"
                name="car"
                required
                defaultValue={selectedCar}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              >
                <option value="" disabled>
                  Chọn mẫu xe
                </option>

                <option value="triton">Mitsubishi Triton</option>
                <option value="xforce">Mitsubishi Xforce</option>
                <option value="destinator">Mitsubishi Destinator</option>
                <option value="xpander">Mitsubishi Xpander</option>
              </select>
            </div>

            {/* GHI CHÚ */}
            <div className="sm:col-span-2">
              <label
                htmlFor="note"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>

              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Thời gian thuận tiện để lái thử hoặc yêu cầu khác..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* THÔNG BÁO */}
            {successMessage && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700 sm:col-span-2">
                ✓ {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:col-span-2">
                {errorMessage}
              </div>
            )}

            {/* BUTTON */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-red-600 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi đăng ký lái thử"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm leading-6 text-gray-500">
            Thông tin của khách hàng được sử dụng để tư vấn và xác nhận nhu cầu
            đăng ký lái thử.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function DangKyLaiThuPage() {
  return (
    <>
      <SiteHeader />

      <Suspense
        fallback={
          <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
            <p className="text-gray-600">
              Đang tải form đăng ký lái thử...
            </p>
          </main>
        }
      >
        <DangKyLaiThuForm />
      </Suspense>
    </>
  );
}