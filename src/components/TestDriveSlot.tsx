"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// Chọn ngày + khung giờ lái thử (kiểu đặt lịch của Volvo, 25/10/2026). Không bắt buộc.
// Ngày tính trên máy khách sau khi trang tải (trang được dựng sẵn khi build nên không tính lúc build).
// Showroom mở 8:00–17:00 Thứ 2 – Thứ 7 (siteConfig.hours) nên bỏ Chủ nhật; sau 15h thì bắt đầu từ ngày mai.
// Sheet không có cột riêng: dùng slotNote() để gộp vào note.
export const testDriveSlots = ["Sáng (8h–11h30)", "Chiều (13h30–17h)"];

const weekdays = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

function upcomingDays(count = 6) {
  const days: string[] = [];
  const date = new Date();
  if (date.getHours() >= 15) date.setDate(date.getDate() + 1);
  while (days.length < count) {
    if (date.getDay() !== 0) {
      days.push(`${weekdays[date.getDay()]} ${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`);
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function slotNote(day: string, slot: string) {
  if (!day && !slot) return "";
  return `Lịch mong muốn: ${[day, slot].filter(Boolean).join(", ")}`;
}

type Props = {
  ids: { day: string; slot: string };
  // Cách hiển thị theo form chứa nó: "line" = ô gạch chân (hộp thoại), "box" = ô có khung (trang lái thử)
  look: "line" | "box";
  fieldClass: string;
  // Chữ trong nhãn ngày: "lái thử" (mặc định) hoặc "mang xe tới" (đặt lịch bảo dưỡng)
  noun?: string;
};

export default function TestDriveSlot({ ids, look, fieldClass, noun = "lái thử" }: Props) {
  // Chuỗi ghép để giá trị ổn định giữa các lần render; lúc dựng sẵn (server) chưa có ngày
  const dayList = useSyncExternalStore(noSubscribe, () => upcomingDays().join("|"), () => "");
  const days = dayList ? dayList.split("|") : [];

  const label = look === "box" ? "mb-2 block text-sm font-semibold text-gray-700" : "sr-only";
  return (
    <>
      <div>
        <label htmlFor={ids.day} className={label}>Ngày {noun}</label>
        <select id={ids.day} name="tdDay" defaultValue="" className={fieldClass}>
          <option value="">{look === "box" ? "Chọn ngày (tùy chọn)" : `Ngày ${noun} (tùy chọn)`}</option>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={ids.slot} className={label}>Khung giờ</label>
        <select id={ids.slot} name="tdSlot" defaultValue="" className={fieldClass}>
          <option value="">{look === "box" ? "Chọn khung giờ (tùy chọn)" : "Khung giờ (tùy chọn)"}</option>
          {testDriveSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
    </>
  );
}
