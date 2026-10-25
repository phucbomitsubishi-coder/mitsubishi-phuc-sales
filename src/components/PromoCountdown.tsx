"use client";

import { useSyncExternalStore } from "react";

type Props = { month: number; year: number; className?: string };

// "Ưu đãi tháng 10 còn 6 ngày" (25/10/2026, kiểu các hãng châu Âu). Tính trên máy khách vì trang dựng sẵn khi build.
// Chỉ hiện khi hôm nay đúng tháng của chương trình: sang tháng mới mà chưa cập nhật khuyến mãi thì tự ẩn, không hiện sai.
const noSubscribe = () => () => {};

function countdownText(month: number, year: number) {
  const now = new Date();
  if (now.getFullYear() !== year || now.getMonth() + 1 !== month) return "";
  const left = new Date(year, month, 0).getDate() - now.getDate();
  return left === 0 ? `Ưu đãi tháng ${month} kết thúc hôm nay` : `Ưu đãi tháng ${month} còn ${left + 1} ngày`;
}

export default function PromoCountdown({ month, year, className = "" }: Props) {
  // Lúc dựng sẵn (server) trả "" → không hiện; trên máy khách tính theo ngày hiện tại
  const text = useSyncExternalStore(noSubscribe, () => countdownText(month, year), () => "");

  if (!text) return null;
  return (
    <p className={className}>
      <span aria-hidden="true">⏳ </span>
      {text}
    </p>
  );
}
