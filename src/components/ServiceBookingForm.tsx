"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { trackPixel } from "@/lib/metaPixel";
import { TEST_DRIVE_SCRIPT_URL } from "@/lib/leadScripts";
import TestDriveSlot, { slotNote } from "@/components/TestDriveSlot";

// Form đặt lịch bảo dưỡng (25/10/2026). Gửi vào script form web với type "service" → tab "LichBaoDuong" + email riêng.
// Anh Phúc nhận lịch rồi chuyển xưởng Moveo New City; hoa hồng chỉ tính khách CHƯA từng bảo dưỡng tại Moveo New City
// nên hỏi rõ ý đó. Năm xe, biển số, số km, lịch mong muốn, nội dung gộp vào note (sheet không có cột riêng).
type Props = { carNames: string[]; source?: string };

const box = "w-full border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
const historyOptions = ["Chưa từng bảo dưỡng tại Moveo New City", "Đã từng bảo dưỡng tại Moveo New City", "Không nhớ"];

export default function ServiceBookingForm({ carNames, source = "Đặt lịch bảo dưỡng" }: Props) {
  const uid = useId();
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
    const car = get("car");
    if (!customerName || !phone || !car) {
      setErrorMessage("Vui lòng nhập họ tên, số điện thoại và dòng xe.");
      return;
    }
    if (!/^0\d{9}$/.test(phone)) {
      setErrorMessage("Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0.");
      return;
    }

    const note = [
      get("history"),
      get("year") && `Năm xe: ${get("year")}`,
      get("plate") && `Biển số: ${get("plate")}`,
      get("km") && `Số km: ${get("km")}`,
      slotNote(get("tdDay"), get("tdSlot")),
      get("note") && `Nội dung: ${get("note")}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      setIsSubmitting(true);
      const response = await fetch(TEST_DRIVE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ customerName, phone, car, note, source, type: "service", website: "" }),
      });
      if (!response.ok) throw new Error("Không thể gửi đặt lịch.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Không thể gửi đặt lịch.");
      trackPixel("Lead", { content_name: "Dat lich bao duong", content_category: car });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Chưa gửi được đặt lịch. Vui lòng thử lại hoặc gọi hotline.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="border-l-4 border-green-600 bg-green-50 p-6">
        <p className="text-xl font-bold text-green-800">✓ Đã nhận đặt lịch bảo dưỡng</p>
        <p className="mt-2 leading-7 text-gray-700">Phúc sẽ gọi lại xác nhận giờ hẹn với xưởng dịch vụ trong thời gian sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>Họ và tên *</label>
        <input id={`${uid}-name`} name="customerName" type="text" autoComplete="name" required className={box} />
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className={labelClass}>Số điện thoại *</label>
        <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="09xx xxx xxx" className={box} />
      </div>
      <div>
        <label htmlFor={`${uid}-car`} className={labelClass}>Dòng xe *</label>
        <select id={`${uid}-car`} name="car" required defaultValue="" className={box}>
          <option value="" disabled>Chọn dòng xe</option>
          {carNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-year`} className={labelClass}>Năm xe</label>
        <input id={`${uid}-year`} name="year" type="text" inputMode="numeric" placeholder="Ví dụ 2022" className={box} />
      </div>
      <div>
        <label htmlFor={`${uid}-plate`} className={labelClass}>Biển số</label>
        <input id={`${uid}-plate`} name="plate" type="text" placeholder="Ví dụ 61A-123.45" className={box} />
      </div>
      <div>
        <label htmlFor={`${uid}-km`} className={labelClass}>Số km hiện tại</label>
        <input id={`${uid}-km`} name="km" type="text" inputMode="numeric" placeholder="Ví dụ 40.000" className={box} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>Xe đã từng bảo dưỡng tại Moveo New City chưa?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {historyOptions.map((option, index) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 border border-gray-300 px-4 py-3 text-sm has-[:checked]:border-gray-950 has-[:checked]:bg-gray-950 has-[:checked]:text-white">
              <input type="radio" name="history" value={option} defaultChecked={index === 0} className="sr-only" />
              {option.replace(" tại Moveo New City", "")}
            </label>
          ))}
        </div>
      </fieldset>
      <TestDriveSlot ids={{ day: `${uid}-day`, slot: `${uid}-slot` }} look="box" fieldClass={box} noun="mang xe tới" />
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-note`} className={labelClass}>Nội dung cần làm</label>
        <textarea id={`${uid}-note`} name="note" rows={3} placeholder="Bảo dưỡng định kỳ, kiểm tra tiếng kêu, thay lốp..." className={`${box} resize-none`} />
      </div>

      {errorMessage && <p className="border-l-4 border-red-600 bg-red-50 p-3 text-sm font-medium text-red-700 sm:col-span-2">{errorMessage}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 px-10 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
        >
          {isSubmitting ? "Đang gửi..." : "Đặt lịch bảo dưỡng"}
        </button>
        <p className="mt-4 text-xs leading-5 text-gray-600">
          Thông tin chỉ dùng để Phúc liên hệ xác nhận lịch với xưởng dịch vụ. Xem{" "}
          <Link href="/chinh-sach-bao-mat" className="underline hover:text-gray-900">Chính sách bảo mật</Link>.
        </p>
      </div>
    </form>
  );
}
