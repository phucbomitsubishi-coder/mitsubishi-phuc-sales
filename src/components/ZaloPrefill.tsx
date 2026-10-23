"use client";

import { useEffect, useState } from "react";

export type ZaloCar = { id: string; slug: string; name: string };

type Props = { cars: ZaloCar[] };

// Bấm bất kỳ link zalo.me nào: chép sẵn tin nhắn theo trang đang xem (xe mới, xe cũ, landing)
// rồi để link mở Zalo như bình thường. Zalo không cho điền sẵn tin nhắn qua link nên khách chỉ cần dán và gửi.
// Link nằm trong phần tử có data-zalo-own (vd Báo giá nhanh) đã tự chép tin nhắn riêng nên bỏ qua.
function buildMessage(pathname: string, cars: ZaloCar[]) {
  const [, section, key] = pathname.split("/");
  if (section === "xe" || section === "uu-dai") {
    const car = cars.find((item) => item.slug === key || item.id === key);
    if (car) return `Chào anh Phúc, em quan tâm xe ${car.name}. Anh gửi em báo giá lăn bánh và ưu đãi tháng này nhé.`;
  }
  if (section === "xe-cu" && key) {
    const title = document.querySelector("h1")?.textContent?.trim();
    if (title) return `Chào anh Phúc, em quan tâm xe ${title} trên website. Xe còn không anh?`;
  }
  return "Chào anh Phúc, em muốn được tư vấn mua xe Mitsubishi.";
}

export default function ZaloPrefill({ cars }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href*='zalo.me']");
      if (!link || link.closest("[data-zalo-own]") || !navigator.clipboard) return;
      navigator.clipboard.writeText(buildMessage(window.location.pathname, cars)).then(
        () => {
          setShown(true);
          clearTimeout(timer);
          timer = setTimeout(() => setShown(false), 6000);
        },
        () => {}
      );
    }
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(timer);
    };
  }, [cars]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex justify-center px-4 md:bottom-6">
      {shown && (
        <p className="max-w-sm bg-neutral-900 px-4 py-3 text-center text-sm leading-6 text-white shadow-lg">
          Đã chép sẵn tin nhắn. Mở Zalo, nhấn giữ ô chat và chọn <b>Dán</b> để gửi cho Phúc.
        </p>
      )}
    </div>
  );
}
