"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackPixel } from "@/lib/metaPixel";
import { toLeadSource } from "@/lib/leadScripts";

type LandingLeadFormProps = {
  carName: string;
  // Phiên bản cho khách chọn; car khác carName khi trang gộp nhiều dòng xe (vd Xpander + Xpander Cross)
  options: { car: string; variant: string }[];
  // Nguồn mặc định khi URL quảng cáo không có ?nguon=
  defaultSource: string;
};

// Form ngắn cho landing page quảng cáo: tên + SĐT + phiên bản, gửi vào sheet báo giá như QuoteForm.
// Nguồn lấy từ ?nguon= (đặt khác nhau cho từng quảng cáo Facebook/Google để biết khách từ đâu).
export default function LandingLeadForm({ carName, options, defaultSource }: LandingLeadFormProps) {
  const params = useSearchParams();
  const leadSource = toLeadSource(params.get("nguon"), defaultSource);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const get = (key: string) => String(formData.get(key) || "").trim();

    if (get("website")) {
      form.reset();
      return;
    }

    const customerName = get("customerName");
    const phone = get("phone").replace(/[\s.-]/g, "");

    if (!customerName || !phone) {
      setErrorMessage("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }

    if (!/^0\d{9}$/.test(phone)) {
      setErrorMessage("Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_QUOTE_API_URL;
    if (!apiUrl) {
      setErrorMessage("Hệ thống nhận báo giá chưa được cấu hình.");
      return;
    }

    // Giá trị ô chọn là chỉ số trong options ("" = chưa chọn) để biết đúng dòng xe
    const optionIndex = get("option");
    const selected = optionIndex === "" ? undefined : options[Number(optionIndex)];

    try {
      setIsSubmitting(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          customerName,
          phone,
          car: selected?.car ?? carName,
          variant: selected?.variant ?? "",
          source: leadSource,
          website: "",
        }),
      });

      if (!response.ok) throw new Error("Không thể gửi yêu cầu.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Không thể gửi yêu cầu.");

      trackPixel("Lead", { content_name: leadSource, content_category: selected?.car ?? carName });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Chưa gửi được thông tin. Vui lòng thử lại hoặc gọi, nhắn Zalo trực tiếp.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-2xl font-bold text-green-700">✓ Đã nhận thông tin</p>
        <p className="mt-3 leading-7 text-gray-700">
          Phúc sẽ gọi lại báo giá lăn bánh và ưu đãi {carName} trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="landing-website">Website</label>
        <input id="landing-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="landing-name" className="mb-1.5 block text-sm font-semibold text-gray-700">Họ và tên</label>
        <input
          id="landing-name"
          name="customerName"
          type="text"
          autoComplete="name"
          required
          placeholder="Nguyễn Văn A"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label htmlFor="landing-phone" className="mb-1.5 block text-sm font-semibold text-gray-700">Số điện thoại</label>
        <input
          id="landing-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="09xx xxx xxx"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
        />
      </div>

      {options.length > 1 && (
        <div>
          <label htmlFor="landing-variant" className="mb-1.5 block text-sm font-semibold text-gray-700">Phiên bản quan tâm</label>
          <select
            id="landing-variant"
            name="option"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
          >
            <option value="">Chưa chọn</option>
            {options.map((option, index) => (
              <option key={option.car + option.variant} value={index}>
                {option.car === carName ? option.variant : option.car.replace(/^Mitsubishi /, "")}
              </option>
            ))}
          </select>
        </div>
      )}

      {errorMessage && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? "Đang gửi..." : "Nhận báo giá lăn bánh"}
      </button>
    </form>
  );
}
