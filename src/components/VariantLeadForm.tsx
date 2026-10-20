"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { trackPixel } from "@/lib/metaPixel";
import { purchaseTimelines, withTimeline } from "@/components/PurchaseTimeline";

type Props = {
  carName: string;
  variantNames: string[];
  // Phiên bản khách đang xem trên trang (ô chọn tự đổi theo)
  selectedVariant: string;
  // Nguồn ghi vào sheet (theo nút khách bấm, ví dụ "Banner-trang-xe")
  source?: string;
};

const field =
  "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base text-gray-900 outline-none transition placeholder:text-sm placeholder:uppercase placeholder:tracking-wide placeholder:text-gray-600 focus:border-gray-950";

// Form đăng ký ngắn đặt cạnh công cụ tính lăn bánh trên trang xe, kiểu form "Thông tin cá nhân" của trang MMV:
// ô nhập gạch chân, chọn phiên bản (điền sẵn bản đang xem), dự định mua. Gửi vào sheet báo giá như QuoteForm.
export default function VariantLeadForm({ carName, variantNames, selectedVariant, source = "Form trang xe" }: Props) {
  // Trang xe có 2 form (cạnh lăn bánh và trong hộp thoại) nên id phải khác nhau
  const uid = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState(selectedVariant);
  const [lastSelected, setLastSelected] = useState(selectedVariant);

  // Khách đổi phiên bản ở khối phía trên → ô chọn đổi theo
  if (selectedVariant !== lastSelected) {
    setLastSelected(selectedVariant);
    setVariant(selectedVariant);
  }

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

    try {
      setIsSubmitting(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          customerName,
          phone,
          car: carName,
          variant: withTimeline(variant, get("timeline")),
          source,
          website: "",
        }),
      });
      if (!response.ok) throw new Error("Không thể gửi yêu cầu.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Không thể gửi yêu cầu.");

      trackPixel("Lead", { content_name: source, content_category: carName });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Chưa gửi được thông tin. Vui lòng thử lại hoặc gọi, nhắn Zalo trực tiếp.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="mt-6 border-l-4 border-green-600 bg-green-50 p-6">
        <p className="text-xl font-bold text-green-800">✓ Đã nhận thông tin</p>
        <p className="mt-2 leading-7 text-gray-700">
          Phúc sẽ liên hệ báo giá lăn bánh và ưu đãi {carName} {variant} trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor={`${uid}-name`} className="sr-only">Họ và tên</label>
      <input id={`${uid}-name`} name="customerName" type="text" autoComplete="name" required placeholder="Họ & tên*" className={`${field} mt-2`} />

      <label htmlFor={`${uid}-phone`} className="sr-only">Số điện thoại</label>
      <input
        id={`${uid}-phone`}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        placeholder="Số điện thoại*"
        className={`${field} mt-4`}
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-variant`} className="sr-only">Phiên bản</label>
          <select
            id={`${uid}-variant`}
            value={variant}
            onChange={(event) => setVariant(event.target.value)}
            className={`${field} border-gray-950 font-bold`}
          >
            {variantNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-timeline`} className="sr-only">Dự định mua xe</label>
          <select id={`${uid}-timeline`} name="timeline" defaultValue="" className={field}>
            <option value="">Dự định mua (tùy chọn)</option>
            {purchaseTimelines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && <p className="mt-4 border-l-4 border-red-600 bg-red-50 p-3 text-sm font-medium text-red-700">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto sm:px-12"
      >
        {isSubmitting ? "Đang gửi..." : "Nhận báo giá"}
      </button>
      <p className="mt-4 text-xs leading-5 text-gray-600">
        Thông tin chỉ dùng để Phúc liên hệ tư vấn. Xem{" "}
        <Link href="/chinh-sach-bao-mat" className="underline hover:text-gray-900">
          Chính sách bảo mật
        </Link>
        .
      </p>
    </form>
  );
}
