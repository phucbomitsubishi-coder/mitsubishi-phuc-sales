"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type LineupCar = {
  id: string;
  slug: string;
  name: string;
  image: string;
  // Ảnh xe nhìn ngang (bộ ảnh showroom, mỗi xe một màu đặc trưng)
  sideImage?: string;
  tagline: string;
  specs: string;
  priceLabel: string;
  priceFull: string;
  promotionLabel?: string;
  needs: string[];
};

// "Chọn xe" kiểu băng chuyền trang chủ MMV: xe ở giữa rõ, xe hai bên mờ và bị cắt ở mép, mũi tên ← →
// (máy tính), vuốt ngang (điện thoại). Thêm tab lọc theo nhu cầu phía trên.
// Mọi xe vẫn có trong HTML (link tới trang xe), xe không hợp nhu cầu chỉ ẩn bằng CSS.
export default function CarLineup({ cars, needs }: { cars: LineupCar[]; needs: { id: string; label: string }[] }) {
  const [need, setNeed] = useState("");
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = () => [...(trackRef.current?.querySelectorAll<HTMLElement>("[data-car]") ?? [])].filter((el) => el.offsetParent !== null);

  const centerOn = useCallback((element: HTMLElement | undefined, smooth = true) => {
    const track = trackRef.current;
    if (!track || !element) return;
    track.scrollTo({ left: element.offsetLeft - track.clientWidth / 2 + element.clientWidth / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Xe đang ở giữa khung = xe "đang chọn" (rõ nét), các xe khác mờ đi
  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    items().forEach((el) => {
      const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = Number(el.dataset.index);
      }
    });
    setActive(best);
  }, []);

  // Mở trang: đặt xe thứ 2 vào giữa để hai bên đều có xe (giống MMV)
  useEffect(() => {
    const list = items();
    centerOn(list[Math.min(1, list.length - 1)], false);
    updateActive();
  }, [centerOn, updateActive]);

  const step = (direction: 1 | -1) => {
    const list = items();
    const position = list.findIndex((el) => Number(el.dataset.index) === active);
    centerOn(list[Math.max(0, Math.min(list.length - 1, position + direction))]);
  };

  const chooseNeed = (value: string) => {
    setNeed(value);
    requestAnimationFrame(() => {
      const list = items();
      centerOn(list[list.length > 2 ? 1 : 0], false);
      updateActive();
    });
  };

  return (
    <>
      <div className="-mx-6 mt-6 flex gap-6 overflow-x-auto border-b border-gray-200 px-6 [scrollbar-width:none] md:mx-0 md:gap-8 md:px-0 [&::-webkit-scrollbar]:hidden">
        {[{ id: "", label: "Tất cả" }, ...needs].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={need === item.id}
            onClick={() => chooseNeed(item.id)}
            className={`-mb-px shrink-0 border-b-2 pb-3 text-sm font-bold uppercase tracking-[0.15em] transition ${
              need === item.id ? "border-red-600 text-gray-950" : "border-transparent text-gray-600 hover:text-gray-950"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative -mx-6 mt-8 md:mx-0">
        <div
          ref={trackRef}
          onScroll={updateActive}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Khoảng đệm đầu/cuối để xe đầu và xe cuối cũng nằm được ở giữa khung */}
          <div aria-hidden="true" className="w-[11%] shrink-0 sm:w-[27%] lg:w-[33.333%]" />
          {cars.map((car, index) => {
            const visible = !need || car.needs.includes(need);
            const isActive = active === index;
            return (
              <Link
                key={car.id}
                href={`/xe/${car.slug}`}
                data-car
                data-index={index}
                className={`${visible ? "" : "hidden"} group w-[78%] shrink-0 snap-center px-3 text-center sm:w-[46%] lg:w-[33.333%]`}
              >
                <div className={`relative mx-auto h-36 w-full transition duration-500 sm:h-44 lg:h-52 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-35 group-hover:opacity-70"}`}>
                  <Image
                    src={car.sideImage ?? car.image}
                    alt={car.name}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 78vw"
                    className="object-contain"
                  />
                </div>
                <h3 className={`mt-4 text-xl font-black uppercase tracking-wide transition group-hover:text-red-700 md:text-2xl ${isActive ? "text-gray-950" : "text-gray-600"}`}>
                  {car.name.replace(/^Mitsubishi /, "")}
                </h3>
                <p className={`mt-1 text-sm md:text-base ${isActive ? "text-gray-800" : "text-gray-600"}`}>
                  Giá từ <span className="tabular-nums">{car.priceFull}</span>
                </p>
                {car.promotionLabel && <p className="mt-1 text-xs font-bold text-red-700 md:text-sm">{car.promotionLabel}</p>}
              </Link>
            );
          })}
          <div aria-hidden="true" className="w-[11%] shrink-0 sm:w-[27%] lg:w-[33.333%]" />
        </div>

        {/* Mũi tên kiểu MMV (máy tính) */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Xe trước"
          className="absolute left-0 top-[62%] xl:-left-20 xl:top-[40%] hidden h-12 w-16 items-center justify-center text-gray-900 transition hover:text-red-600 md:flex"
        >
          <svg aria-hidden="true" viewBox="0 0 64 24" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M62 12H3m9-9-9 9 9 9" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Xe sau"
          className="absolute right-0 top-[62%] xl:-right-20 xl:top-[40%] hidden h-12 w-16 items-center justify-center text-gray-900 transition hover:text-red-600 md:flex"
        >
          <svg aria-hidden="true" viewBox="0 0 64 24" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12h59m-9-9 9 9-9 9" />
          </svg>
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/bang-gia-xe-mitsubishi"
          className="inline-block border-2 border-gray-900 px-10 py-3.5 text-sm font-black uppercase tracking-[0.2em] transition hover:bg-gray-900 hover:text-white"
        >
          Xem bảng giá tất cả xe
        </Link>
      </div>
    </>
  );
}
