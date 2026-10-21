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
  // Ảnh nền hiện khi rê chuột (kiểu thanh chọn xe trang chủ MMV)
  hoverBg?: string;
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
// Chạy vòng (21/10/2026): danh sách được vẽ 3 lần (bản giữa là bản thật, 2 bản sao aria-hidden ở hai bên);
// cuộn xong mà xe giữa nằm ở bản sao thì nhảy tức thì về xe tương ứng ở bản thật. Lọc còn < 3 xe thì không vòng.
const SETS = [0, 1, 2];
const LOOP_MIN = 3;
export default function CarLineup({ cars, needs }: { cars: LineupCar[]; needs: { id: string; label: string }[] }) {
  const [need, setNeed] = useState("");
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const visibleCount = cars.filter((car) => !need || car.needs.includes(need)).length;
  const loop = visibleCount >= LOOP_MIN;

  const items = () => [...(trackRef.current?.querySelectorAll<HTMLElement>("[data-car]") ?? [])].filter((el) => el.offsetParent !== null);

  const centerOn = useCallback((element: HTMLElement | undefined, smooth = true) => {
    const track = trackRef.current;
    if (!track || !element) return;
    track.scrollTo({ left: element.offsetLeft - track.clientWidth / 2 + element.clientWidth / 2, behavior: smooth ? "smooth" : "instant" });
  }, []);

  // Xe đang ở giữa khung = xe "đang chọn" (rõ nét), các xe khác mờ đi
  // (cả bản thật và bản sao của xe đó đều tính là "đang chọn", để lúc nhảy về bản thật không bị nháy)
  const centerItem = useCallback(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let best: HTMLElement | undefined;
    let bestDistance = Infinity;
    items().forEach((el) => {
      const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = el;
      }
    });
    return best;
  }, []);

  const updateActive = useCallback(() => {
    const best = centerItem();
    if (best) setActive(Number(best.dataset.index));
  }, [centerItem]);

  // Cuộn xong: xe giữa đang ở bản sao thì nhảy tức thì về xe đó trong bản thật
  const settle = useCallback(() => {
    const best = centerItem();
    if (!best || best.dataset.set === "1") return;
    centerOn(items().find((el) => el.dataset.set === "1" && el.dataset.index === best.dataset.index), false);
  }, [centerItem, centerOn]);

  const onScroll = () => {
    updateActive();
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(settle, 150);
  };

  // Đưa xe đầu tiên (của bản thật) vào giữa; khi vòng, hai bên đều có xe.
  // Cuộn bằng code cũng phát sự kiện scroll, nên onScroll tự cập nhật xe đang chọn.
  const centerFirst = useCallback(() => {
    const list = items();
    centerOn(list.find((el) => el.dataset.set === "1") ?? list[0], false);
  }, [centerOn]);

  useEffect(() => {
    centerFirst();
    return () => clearTimeout(settleRef.current);
  }, [centerFirst]);

  const step = (direction: 1 | -1) => {
    const list = items();
    const current = centerItem();
    const position = current ? list.indexOf(current) : 0;
    centerOn(list[Math.max(0, Math.min(list.length - 1, position + direction))]);
  };

  const chooseNeed = (value: string) => {
    setNeed(value);
    requestAnimationFrame(() => {
      centerFirst();
      updateActive();
    });
  };

  return (
    <>
      {/* Tab lọc theo nhu cầu: chỉ hiện khi truyền needs (trang chủ bỏ từ 21/10/2026, kiểu băng chuyền MMV) */}
      {needs.length > 0 && (
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
      )}

      <div className={`relative -mx-6 md:mx-0 ${needs.length > 0 ? "mt-8" : ""}`}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Không vòng (lọc còn < 3 xe): khoảng đệm đầu/cuối để xe đầu và xe cuối cũng nằm được ở giữa khung */}
          <div aria-hidden="true" className={`${loop ? "hidden" : ""} w-[11%] shrink-0 sm:w-[27%] lg:w-[33.333%]`} />
          {SETS.flatMap((set) => cars.map((car, index) => {
            const clone = set !== 1;
            const visible = (!need || car.needs.includes(need)) && (!clone || loop);
            const isActive = active === index;
            return (
              <Link
                key={`${set}-${car.id}`}
                href={`/xe/${car.slug}`}
                data-car
                data-index={index}
                data-set={set}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                className={`${visible ? "" : "hidden"} group relative w-[78%] shrink-0 snap-center overflow-hidden px-3 pb-6 pt-8 text-center sm:w-[46%] lg:w-[33.333%]`}
              >
                {car.hoverBg && (
                  <span aria-hidden="true" className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <Image src={car.hoverBg} alt="" fill sizes="(min-width: 1024px) 420px, 46vw" className="object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </span>
                )}
                <div className={`relative mx-auto h-36 w-full transition duration-500 sm:h-44 lg:h-52 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-35 group-hover:scale-100 group-hover:opacity-100"}`}>
                  <Image
                    src={car.sideImage ?? car.image}
                    alt={clone ? "" : car.name}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 78vw"
                    className="object-contain"
                  />
                </div>
                <h3 className={`relative mt-4 text-xl font-black uppercase tracking-wide transition md:text-2xl ${car.hoverBg ? "group-hover:text-white" : "group-hover:text-red-700"} ${isActive ? "text-gray-950" : "text-gray-600"}`}>
                  {car.name.replace(/^Mitsubishi /, "")}
                </h3>
                <p className={`relative mt-1 text-sm transition md:text-base ${car.hoverBg ? "group-hover:text-white" : ""} ${isActive ? "text-gray-800" : "text-gray-600"}`}>
                  Giá từ <span className="tabular-nums">{car.priceFull}</span>
                </p>
                {car.promotionLabel && <p className={`relative mt-1 text-xs font-bold text-red-700 transition md:text-sm ${car.hoverBg ? "group-hover:text-red-300" : ""}`}>{car.promotionLabel}</p>}
              </Link>
            );
          }))}
          <div aria-hidden="true" className={`${loop ? "hidden" : ""} w-[11%] shrink-0 sm:w-[27%] lg:w-[33.333%]`} />
        </div>

        {/* Mũi tên kiểu MMV (máy tính) */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Xe trước"
          className={`absolute left-0 top-[62%] 2xl:-left-20 2xl:top-[40%] hidden h-12 w-16 items-center justify-center text-gray-900 transition hover:text-red-600 ${visibleCount > 1 ? "md:flex" : ""}`}
        >
          <svg aria-hidden="true" viewBox="0 0 64 24" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M62 12H3m9-9-9 9 9 9" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Xe sau"
          className={`absolute right-0 top-[62%] 2xl:-right-20 2xl:top-[40%] hidden h-12 w-16 items-center justify-center text-gray-900 transition hover:text-red-600 ${visibleCount > 1 ? "md:flex" : ""}`}
        >
          <svg aria-hidden="true" viewBox="0 0 64 24" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12h59m-9-9 9 9-9 9" />
          </svg>
        </button>
      </div>

      {/* Dải thông số nhanh của xe đang ở giữa (kiểu băng chuyền VinFast, 21/10/2026) */}
      {cars[active] && (
        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-5 border-y border-gray-200 py-5 md:flex-row md:justify-between md:gap-8">
          <dl className="grid w-full grid-cols-3 divide-x divide-gray-200 text-center md:w-auto">
            {cars[active].specs.split(" · ").slice(0, 3).map((value, index) => (
              <div key={index} className="flex flex-col-reverse px-3 md:px-6">
                <dt className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-600">{["Kiểu xe", "Số chỗ", "Động cơ"][index]}</dt>
                <dd className="text-sm font-bold text-gray-950 md:text-base">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex shrink-0 items-center gap-5">
            <Link href={`/xe/${cars[active].slug}`} className="text-sm font-bold text-gray-950 underline-offset-4 hover:text-red-700 hover:underline">
              Xem chi tiết →
            </Link>
            <Link
              href={`/?car=${encodeURIComponent(cars[active].name)}&nguon=Bang-chuyen-trang-chu#bao-gia`}
              className="bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
            >
              Báo giá
            </Link>
          </div>
        </div>
      )}

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
