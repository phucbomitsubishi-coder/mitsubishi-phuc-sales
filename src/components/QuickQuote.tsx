"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";

export type QuickQuoteCar = {
  id: string;
  name: string;
  seats?: number;
  variants: { name: string; price: number; promotion: number }[];
};

type Props = {
  cars: QuickQuoteCar[];
  zaloUrl: string;
  phoneUrl: string;
};

const million = (value: number) =>
  `${(value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu`;

// Không hiện nút nổi ở trang đã có công cụ tính giá riêng và các trang có form (tránh che ô nhập)
const hiddenPaths = ["/du-toan/gia-lan-banh", "/thu-cu-doi-moi", "/dang-ky-lai-thu", "/lien-he"];

// Nút "Báo giá nhanh" nổi trên mọi trang (CHỈ máy tính từ 21/10/2026; điện thoại dùng thanh đáy MobileActionBar): chọn xe, phiên bản, nơi đăng ký → giá lăn bánh đã trừ ưu đãi,
// rồi chép sẵn tin nhắn và mở Zalo (Zalo không cho điền sẵn tin nhắn qua link).
// Dữ liệu xe được dựng gọn ở layout.tsx để không đưa cả cars.ts vào bundle client.
export default function QuickQuote({ cars, zaloUrl, phoneUrl }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [carId, setCarId] = useState(cars[0]?.id ?? "");
  const [variantName, setVariantName] = useState(cars[0]?.variants[0]?.name ?? "");
  const [provinceId, setProvinceId] = useState(defaultProvinceId);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Chỉ hiện nút sau khi cuộn qua phần đầu trang (tránh đè nút "Đăng ký lái thử" trên banner trang chủ)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (hiddenPaths.includes(pathname) || cars.length === 0) return null;
  if (!scrolled && !open) return null;

  const car = cars.find((item) => item.id === carId) ?? cars[0];
  const variant = car.variants.find((item) => item.name === variantName) ?? car.variants[0];
  const province = provinces.find((item) => item.id === provinceId) ?? provinces[0];
  const { onRoadPrice } = calculateOnRoadPrice({
    carName: car.name,
    price: variant.price,
    seats: car.seats,
    province,
  });
  const afterPromotion = Math.max(0, onRoadPrice - variant.promotion);
  const label = car.name.endsWith(variant.name) ? car.name : `${car.name} ${variant.name}`;

  const message = `Chào Phúc, em muốn nhận báo giá ${label}, đăng ký xe tại ${province.name}. Giá lăn bánh dự kiến trên website khoảng ${million(afterPromotion)}.`;

  function copyMessage() {
    try {
      navigator.clipboard?.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-semibold text-gray-900 outline-none focus:border-red-600";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="quick-quote-panel"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-base font-bold text-white shadow-xl transition hover:bg-red-700 md:flex"
      >
        <span aria-hidden="true">💬</span>
        {open ? "Đóng" : (<>Báo giá<span className="hidden md:inline"> nhanh</span></>)}
      </button>

      {open && (
        <div
          id="quick-quote-panel"
          role="dialog"
          aria-label="Báo giá nhanh"
          className="fixed inset-x-3 bottom-40 z-40 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl md:inset-x-auto md:bottom-24 md:right-6 md:w-96"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Báo giá nhanh</p>
          <p className="mt-1 text-sm text-gray-600">Chọn xe và nơi đăng ký để xem giá lăn bánh dự kiến.</p>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="qq-car" className="mb-1 block text-sm font-semibold text-gray-700">Mẫu xe</label>
              <select
                id="qq-car"
                value={car.id}
                onChange={(event) => {
                  const next = cars.find((item) => item.id === event.target.value);
                  setCarId(event.target.value);
                  setVariantName(next?.variants[0]?.name ?? "");
                  setCopied(false);
                }}
                className={selectClass}
              >
                {cars.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {car.variants.length > 1 && (
              <div>
                <label htmlFor="qq-variant" className="mb-1 block text-sm font-semibold text-gray-700">Phiên bản</label>
                <select
                  id="qq-variant"
                  value={variant.name}
                  onChange={(event) => {
                    setVariantName(event.target.value);
                    setCopied(false);
                  }}
                  className={selectClass}
                >
                  {car.variants.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="qq-province" className="mb-1 block text-sm font-semibold text-gray-700">Nơi đăng ký xe</label>
              <select
                id="qq-province"
                value={province.id}
                onChange={(event) => {
                  setProvinceId(event.target.value);
                  setCopied(false);
                }}
                className={selectClass}
              >
                {provinces.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Giá niêm yết</span>
              <span className="font-semibold">{million(variant.price)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-gray-700">
              <span>Lăn bánh (chưa trừ ưu đãi)</span>
              <span className="font-semibold">{million(onRoadPrice)}</span>
            </div>
            {variant.promotion > 0 && (
              <div className="mt-1 flex justify-between text-sm text-gray-700">
                <span>Ưu đãi tháng này</span>
                <span className="font-semibold text-red-700">− {million(variant.promotion)}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
              <span className="font-bold">Lăn bánh dự kiến</span>
              <span className="text-lg font-bold text-red-700">{million(afterPromotion)}</span>
            </div>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-600">
            Số liệu tham khảo. Ưu đãi được trừ trực tiếp vào giá xe khi ký hợp đồng.
          </p>

          <div className="mt-4 grid gap-2" data-zalo-own>
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyMessage}
              className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Nhận báo giá chi tiết qua Zalo
            </a>
            {copied && (
              <p className="text-center text-xs text-gray-600">
                Đã chép sẵn tin nhắn, bạn chỉ cần dán vào Zalo và gửi.
              </p>
            )}
            <a
              href={phoneUrl}
              className="rounded-lg border border-red-600 px-4 py-3 text-center font-semibold text-red-700 transition hover:bg-red-50"
            >
              Gọi ngay
            </a>
          </div>
        </div>
      )}
    </>
  );
}
