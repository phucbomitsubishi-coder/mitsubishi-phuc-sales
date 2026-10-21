"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type ShowroomCar = {
  id: string;
  slug: string;
  shortName: string;
  name: string;
  priceLabel: string;
  promotionLabel?: string;
  // Bộ ảnh kiểu trang MMV (src/data/showroom.ts), dùng chung với banner trang xe
  slogan: string;
  logo: { src: string; width: number; height: number };
  poster: string;
  mobilePoster: string;
  video?: string;
};

const AUTO_DELAY = 7000;

// Banner trang chủ kiểu trang chủ MMV, đồng bộ với banner trang xe: ảnh/video thật tràn màn hình,
// logo chữ tên xe, khẩu hiệu, giá + ưu đãi, nút vuông; hàng tên xe ở đáy để chuyển, tự chuyển 7 giây tới khi khách bấm.
// Ảnh xe đầu tải ngay (LCP), xe khác tải sau khi trang tải xong. Video chỉ phát trên máy tính (≥ 768px),
// không phát khi khách bật tiết kiệm dữ liệu hoặc giảm chuyển động; điện thoại dùng ảnh tĩnh.
export default function HeroShowroom({ cars, heading, kicker }: { cars: ShowroomCar[]; heading: ReactNode; kicker?: string }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const car = cars[index];

  useEffect(() => {
    const markLoaded = () => {
      setPageLoaded(true);
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      setCanPlayVideo(
        window.matchMedia("(min-width: 768px)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          !connection?.saveData
      );
    };
    if (document.readyState === "complete") {
      const timer = setTimeout(markLoaded, 300);
      return () => clearTimeout(timer);
    }
    window.addEventListener("load", markLoaded, { once: true });
    return () => window.removeEventListener("load", markLoaded);
  }, []);

  useEffect(() => {
    if (!auto || !pageLoaded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % cars.length), AUTO_DELAY);
    return () => clearInterval(timer);
  }, [auto, pageLoaded, cars.length]);

  // Giữ nút xe đang chọn trong tầm nhìn (hàng nút vuốt ngang trên điện thoại)
  useEffect(() => {
    const list = listRef.current;
    const button = list?.children[index] as HTMLElement | undefined;
    if (list && button) list.scrollTo({ left: button.offsetLeft - list.clientWidth / 2 + button.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const choose = (next: number) => {
    setAuto(false);
    setIndex(next);
  };

  const fade = (i: number) => `transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`;

  return (
    <section
      className="relative isolate flex flex-col overflow-hidden bg-neutral-950 text-white md:min-h-[640px] lg:h-[calc(100svh-90px)] lg:max-h-[820px]"
      aria-roledescription="carousel"
      aria-label="Các dòng xe Mitsubishi"
    >
      {/* Điện thoại: ảnh phía trên, chữ trên nền đen bên dưới */}
      <div className="relative aspect-[800/700] w-full md:hidden">
        {cars.map((item, i) =>
          i === 0 || pageLoaded ? (
            <Image
              key={item.id}
              src={item.mobilePoster}
              alt={item.name}
              aria-hidden={i !== index}
              fill
              preload={i === 0}
              sizes="100vw"
              className={`object-cover ${fade(i)}`}
            />
          ) : null
        )}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Máy tính: ảnh + video tràn màn hình */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        {cars.map((item, i) =>
          i === 0 || pageLoaded ? (
            <Image key={item.id} src={item.poster} alt={item.name} aria-hidden={i !== index} fill sizes="100vw" className={`object-cover ${fade(i)}`} />
          ) : null
        )}
        {canPlayVideo && car.video && (
          <video
            key={car.id}
            className="absolute inset-0 h-full w-full object-cover"
            src={car.video}
            poster={car.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />
      </div>

      {/* Tiêu đề trang (h1 duy nhất) */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-5 md:absolute md:inset-x-0 md:top-0 md:px-6 md:pt-8">
        {kicker && (
          <p className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
            {kicker}
          </p>
        )}
        <h1 className="mt-2 max-w-xl text-base font-semibold leading-snug text-white/90 md:text-lg">{heading}</h1>
      </div>

      {/* Nội dung xe đang chọn */}
      <div key={car.id} className="hero-fade relative mx-auto w-full max-w-5xl px-5 pb-6 pt-5 text-center md:my-auto md:px-6 md:pb-28 md:pt-24" aria-live="polite">
        <Image
          src={car.logo.src}
          alt={car.name}
          width={car.logo.width}
          height={car.logo.height}
          sizes="(min-width: 768px) 420px, 65vw"
          className="mx-auto h-auto w-[65%] max-w-[420px]"
        />
        <p className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight md:text-5xl">{car.slogan}</p>
        <p className="mt-3 text-sm text-white/85 md:text-base">
          Giá từ <span className="font-bold text-white">{car.priceLabel}</span>
          {car.promotionLabel && <span className="font-bold text-red-300"> · {car.promotionLabel}</span>}
        </p>
        <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3 md:mt-8">
          <Link
            href={`/xe/${car.slug}`}
            className="border border-white px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-neutral-950"
          >
            Xem chi tiết
          </Link>
          <Link
            href={`/?car=${encodeURIComponent(car.name)}&nguon=Banner-trang-chu#bao-gia`}
            className="bg-red-600 px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition hover:bg-red-700"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>

      {/* Chọn xe */}
      <div className="relative w-full border-t border-white/15 bg-black/40 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Chọn dòng xe"
          className="mx-auto flex max-w-7xl overflow-x-auto px-2 [scrollbar-width:none] md:justify-center md:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {cars.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => choose(i)}
              className={`relative shrink-0 px-4 py-4 text-xs font-bold uppercase tracking-[0.15em] transition md:px-6 md:text-sm ${
                i === index ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {item.shortName}
              <span aria-hidden="true" className={`absolute inset-x-4 bottom-0 h-0.5 bg-white/20 md:inset-x-6 ${i === index ? "" : "hidden"}`}>
                {auto && pageLoaded && i === index ? (
                  <span className="hero-progress absolute inset-0 origin-left bg-red-600" style={{ animationDuration: `${AUTO_DELAY}ms` }} />
                ) : (
                  <span className="absolute inset-0 bg-red-600" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
