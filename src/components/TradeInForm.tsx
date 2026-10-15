"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { cars } from "@/data/cars";
import { TEST_DRIVE_SCRIPT_URL } from "@/lib/leadScripts";
import { trackPixel } from "@/lib/metaPixel";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 16 }, (_, index) => String(currentYear - index));
// Mức tình trạng giống form định giá của Ucar Moveo
const conditions = ["Rất sạch", "Sạch", "Trung bình", "Dưới trung bình"];

// Form "Thu cũ đổi mới": khách nhập xe đang đi để nhận báo giá thu sơ bộ và báo giá xe mới.
// Gửi qua script lái thử (lưu được ghi chú); thông tin xe cũ gom vào `note`.
export default function TradeInForm() {
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

    const name = get("name");
    const phone = get("phone").replace(/[\s.-]/g, "");
    const oldCar = get("oldCar");
    const newCar = get("newCar");

    if (!name || !phone || !oldCar) {
      setErrorMessage("Vui lòng nhập họ tên, số điện thoại và xe đang sử dụng.");
      return;
    }

    if (!/^0\d{9}$/.test(phone)) {
      setErrorMessage("Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0.");
      return;
    }

    const note = [
      "THU CŨ ĐỔI MỚI",
      `Xe đang đi: ${oldCar}`,
      get("year") && `Năm sản xuất: ${get("year")}`,
      get("mileage") && `Số km: ${get("mileage")}`,
      get("transmission") && `Hộp số: ${get("transmission")}`,
      get("color") && `Màu: ${get("color")}`,
      get("exterior") && `Ngoại thất: ${get("exterior")}`,
      get("interior") && `Nội thất: ${get("interior")}`,
      get("accident") && `Va chạm/ngập nước: ${get("accident")}`,
      get("area") && `Khu vực: ${get("area")}`,
      get("note") && `Ghi chú: ${get("note")}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      setIsSubmitting(true);
      const response = await fetch(TEST_DRIVE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          customerName: name,
          phone,
          car: newCar || "Chưa chọn xe mới",
          note,
          source: "Thu cũ đổi mới",
          type: "trade-in",
          website: "",
        }),
      });

      if (!response.ok) throw new Error("Không thể gửi thông tin.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Không thể gửi thông tin.");

      trackPixel("Lead", { content_name: "Thu cu doi moi", content_category: newCar });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Chưa gửi được thông tin. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-2xl font-bold text-green-700">✓ Đã gửi thông tin xe</p>
        <p className="mt-3 text-gray-700">
          Phúc sẽ liên hệ báo giá thu sơ bộ và báo giá xe mới trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="trade-website">Website</label>
        <input id="trade-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="trade-name" className={labelClass}>Họ và tên *</label>
        <input id="trade-name" name="name" type="text" autoComplete="name" required placeholder="Nguyễn Văn A" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trade-phone" className={labelClass}>Số điện thoại *</label>
        <input id="trade-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="09xx xxx xxx" className={inputClass} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="trade-old-car" className={labelClass}>Xe đang sử dụng (hãng, dòng xe, phiên bản) *</label>
        <input id="trade-old-car" name="oldCar" type="text" required placeholder="Ví dụ: Toyota Vios 1.5G, Mitsubishi Xpander AT…" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trade-year" className={labelClass}>Năm sản xuất</label>
        <select id="trade-year" name="year" defaultValue="" className={inputClass}>
          <option value="">Chọn năm</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
          <option value={`Trước ${currentYear - 15}`}>Trước {currentYear - 15}</option>
        </select>
      </div>

      <div>
        <label htmlFor="trade-mileage" className={labelClass}>Số km đã đi</label>
        <input id="trade-mileage" name="mileage" type="text" inputMode="numeric" placeholder="Ví dụ: 45.000" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trade-transmission" className={labelClass}>Hộp số</label>
        <select id="trade-transmission" name="transmission" defaultValue="" className={inputClass}>
          <option value="">Chọn</option>
          <option value="Số tự động">Số tự động</option>
          <option value="Số sàn">Số sàn</option>
        </select>
      </div>

      <div>
        <label htmlFor="trade-color" className={labelClass}>Màu xe</label>
        <input id="trade-color" name="color" type="text" placeholder="Ví dụ: Trắng" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trade-exterior" className={labelClass}>Tình trạng ngoại thất</label>
        <select id="trade-exterior" name="exterior" defaultValue="" className={inputClass}>
          <option value="">Chọn</option>
          {conditions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="trade-interior" className={labelClass}>Tình trạng nội thất</label>
        <select id="trade-interior" name="interior" defaultValue="" className={inputClass}>
          <option value="">Chọn</option>
          {conditions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="trade-accident" className={labelClass}>Xe từng bị va chạm hoặc ngập nước?</label>
        <select id="trade-accident" name="accident" defaultValue="" className={inputClass}>
          <option value="">Chọn</option>
          <option value="Chưa từng">Chưa từng</option>
          <option value="Va chạm nhẹ, đã sửa">Va chạm nhẹ, đã sửa</option>
          <option value="Từng tai nạn hoặc ngập nước">Từng tai nạn hoặc ngập nước</option>
          <option value="Không rõ">Không rõ</option>
        </select>
      </div>

      <div>
        <label htmlFor="trade-area" className={labelClass}>Khu vực xem xe</label>
        <input id="trade-area" name="area" type="text" placeholder="Ví dụ: Thủ Dầu Một, Dĩ An…" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trade-new-car" className={labelClass}>Xe Mitsubishi muốn đổi</label>
        <select id="trade-new-car" name="newCar" defaultValue="" className={inputClass}>
          <option value="">Chưa quyết định</option>
          {cars.map((car) => (
            <option key={car.id} value={car.name}>{car.name}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="trade-note" className={labelClass}>Ghi chú</label>
        <textarea id="trade-note" name="note" rows={3} placeholder="Lịch sử bảo dưỡng, đồ chơi đã lắp, thời gian muốn đổi xe…" className={`${inputClass} resize-none`} />
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:col-span-2">
          {errorMessage}
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-red-600 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi thông tin xe"}
        </button>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          Thông tin chỉ dùng để liên hệ báo giá thu xe và tư vấn mua xe mới. Xem{" "}
          <Link href="/chinh-sach-bao-mat" className="underline hover:text-red-700">Chính sách bảo mật</Link>.
        </p>
      </div>
    </form>
  );
}
