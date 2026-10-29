"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { trackPixel } from "@/lib/metaPixel";
import { siteConfig } from "@/config/site";
import { TEST_DRIVE_SCRIPT_URL } from "@/lib/leadScripts";
import { purchaseTimelines } from "@/components/PurchaseTimeline";
import TestDriveSlot, { slotNote } from "@/components/TestDriveSlot";

type Props = {
  carName: string;
  variantNames: string[];
  selectedVariant: string;
  source?: string;
};

const field =
  "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base text-gray-900 outline-none transition placeholder:text-sm placeholder:uppercase placeholder:tracking-wide placeholder:text-gray-600 focus:border-gray-950";

// Nơi lái thử: 3 showroom Phúc tiếp khách + tại nhà (siteConfig.dealer.showrooms)
const places = [...siteConfig.dealer.showrooms.map((item) => item.short), "Tại nhà"];

// Form đăng ký lái thử trong hộp thoại trang xe (cùng kiểu form báo giá VariantLeadForm).
// Gửi vào script lái thử như trang /dang-ky-lai-thu (type "test-drive"); phiên bản, nơi lái thử,
// thời gian/địa chỉ và dự định mua gộp vào note vì sheet không có cột riêng.
export default function TestDriveLeadForm({ carName, variantNames, selectedVariant, source = "Lái thử trang xe" }: Props) {
  const uid = useId();
  const [variant, setVariant] = useState(selectedVariant);
  const [place, setPlace] = useState(places[0]);
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

    const note = [
      variant && `Phiên bản: ${variant}`,
      place === "Tại nhà" ? "Lái thử tại nhà" : `Lái thử tại showroom ${place}`,
      slotNote(get("tdDay"), get("tdSlot")),
      get("note"),
      get("timeline") && `Dự định mua: ${get("timeline")}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      setIsSubmitting(true);
      const response = await fetch(TEST_DRIVE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ customerName, phone, car: carName, note, source, type: "test-drive", website: "" }),
      });
      if (!response.ok) throw new Error("Không thể gửi đăng ký.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Không thể gửi đăng ký.");

      trackPixel("Lead", { content_name: "Lai thu", content_category: carName });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Chưa gửi được đăng ký. Vui lòng thử lại hoặc gọi, nhắn Zalo trực tiếp.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="mt-6 border-l-4 border-green-600 bg-green-50 p-6">
        <p className="text-xl font-bold text-green-800">✓ Đã nhận đăng ký lái thử</p>
        <p className="mt-2 leading-7 text-gray-700">
          Phúc sẽ gọi lại để xác nhận lịch lái thử {carName} {variant} trong thời gian sớm nhất.
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
      <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Số điện thoại*" className={`${field} mt-4`} />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-variant`} className="sr-only">Phiên bản</label>
          <select id={`${uid}-variant`} value={variant} onChange={(event) => setVariant(event.target.value)} className={`${field} border-gray-950 font-bold`}>
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

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold uppercase tracking-wide text-gray-700">Lái thử ở đâu</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {places.map((item) => (
            <label
              key={item}
              className={`cursor-pointer border-2 px-4 py-3 text-center text-sm font-bold transition ${
                place === item ? "border-gray-950 bg-gray-950 text-white" : "border-gray-300 text-gray-800 hover:border-gray-500"
              }`}
            >
              <input type="radio" name="place" value={item} checked={place === item} onChange={() => setPlace(item)} className="sr-only" />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TestDriveSlot ids={{ day: `${uid}-day`, slot: `${uid}-slot` }} look="line" fieldClass={field} />
      </div>

      <label htmlFor={`${uid}-note`} className="sr-only">Địa chỉ, ghi chú lái thử</label>
      <input
        id={`${uid}-note`}
        name="note"
        type="text"
        placeholder={place === "Tại nhà" ? "Địa chỉ lái thử tại nhà" : "Ghi chú (tùy chọn)"}
        className={`${field} mt-4`}
      />

      {errorMessage && <p className="mt-4 border-l-4 border-red-600 bg-red-50 p-3 text-sm font-medium text-red-700">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto sm:px-12"
      >
        {isSubmitting ? "Đang gửi..." : "Đăng ký lái thử"}
      </button>
      <p className="mt-4 text-xs leading-5 text-gray-600">
        Thông tin chỉ dùng để Phúc liên hệ xác nhận lịch lái thử. Xem{" "}
        <Link href="/chinh-sach-bao-mat" className="underline hover:text-gray-900">
          Chính sách bảo mật
        </Link>
        .
      </p>
    </form>
  );
}
