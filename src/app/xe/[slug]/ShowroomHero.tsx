"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Showroom } from "@/data/showroom";

type Props = {
  showroom: Showroom;
  carName: string;
  carId: string;
  priceLabel: string;
  promotionLabel?: string;
  brochureUrl?: string;
  // 4 số liệu nhanh (getCarFacts), hiện ở đáy banner trên nền tối mờ (kiểu dải số liệu của Ford)
  stats?: { label: string; value: string }[];
};

// Banner trang xe kiểu trang sản phẩm MMV: video/ảnh tràn màn hình, logo chữ tên xe, khẩu hiệu,
// hàng biểu tượng điểm nổi bật, các nút. Video chỉ tải trên máy tính (≥ 768px) sau khi trang tải xong,
// không tải khi khách bật tiết kiệm dữ liệu hoặc giảm chuyển động; điện thoại dùng ảnh tĩnh.
export default function ShowroomHero({ showroom, carName, carId, priceLabel, promotionLabel, brochureUrl, stats = [] }: Props) {
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!showroom.video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !connection?.saveData;
    if (!ok) return;
    const start = () => setPlayVideo(true);
    if (document.readyState === "complete") {
      const timer = setTimeout(start, 300);
      return () => clearTimeout(timer);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [showroom.video]);

  const shortName = carName.replace(/^Mitsubishi /, "");
  const quoteHref = `/?car=${encodeURIComponent(carName)}&nguon=Banner-trang-xe#bao-gia`;

  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-neutral-950 text-white md:min-h-[640px] md:flex-row md:items-center lg:h-[calc(100svh-90px)] lg:max-h-[820px]">
      {/* Nền: ảnh điện thoại / ảnh + video máy tính */}
      {/* Điện thoại: ảnh hiện trọn phía trên, chữ nằm trên nền đen bên dưới (dễ đọc) */}
      <div className="relative aspect-[717/700] w-full md:hidden">
        <Image src={showroom.mobilePoster} alt="" fill preload sizes="100vw" className="object-cover object-top" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>
      <Image
        src={showroom.poster}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover md:block"
      />
      {playVideo && showroom.video && (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover md:block"
          src={showroom.video}
          poster={showroom.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-black/70 via-black/25 to-black/35 md:block" />

      <div className="relative mx-auto -mt-16 w-full max-w-6xl px-5 pb-10 text-center md:mt-0 md:px-6 md:pb-36 md:pt-16">
        <h1>
          <span className="sr-only">{carName} – </span>
          <Image
            src={showroom.logo.src}
            alt={shortName}
            width={showroom.logo.width}
            height={showroom.logo.height}
            sizes="(min-width: 768px) 440px, 70vw"
            className="mx-auto h-auto w-[70%] max-w-[440px]"
          />
        </h1>
        <p className="hero-fade mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-6xl">{showroom.slogan}</p>

        <p className="mt-3 text-sm text-white/80 md:text-base">
          Giá niêm yết từ <span className="font-bold text-white">{priceLabel}</span>
          {promotionLabel && (
            <>
              {" "}· <a href="#lan-banh" className="font-bold text-red-300 underline-offset-4 hover:underline">{promotionLabel}</a>
            </>
          )}
        </p>

        {/* Biểu tượng điểm nổi bật */}
        <ul className="mx-auto mt-7 grid max-w-6xl grid-cols-3 gap-x-3 gap-y-4 md:mt-10 md:flex md:flex-wrap md:justify-center md:gap-x-6 lg:flex-nowrap">
          {showroom.specs.map((spec) => (
            <li key={spec.label} className="flex flex-col items-center gap-2 text-center md:flex-row md:text-left">
              <Image src={spec.icon} alt="" width={40} height={40} className="h-8 w-8 object-contain md:h-10 md:w-10" />
              <span className="max-w-[9rem] text-[11px] lg:max-w-[8.5rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white/90 md:text-xs">
                {spec.label}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] text-white/70 md:text-xs">* Một số trang bị chỉ có trên phiên bản cao cấp, xem chi tiết từng phiên bản bên dưới.</p>

        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 md:mt-10 md:grid-cols-3">
          <Link
            href={quoteHref}
            className="col-span-2 bg-red-600 px-5 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-700 md:col-span-1"
          >
            Nhận báo giá
          </Link>
          <Link
            href={`/dang-ky-lai-thu?xe=${carId}&nguon=Banner-trang-xe`}
            className="border border-white px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-neutral-950"
          >
            Lái thử
          </Link>
          {brochureUrl ? (
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-neutral-950"
            >
              Tải brochure
            </a>
          ) : (
            <a
              href="#phien-ban"
              className="border border-white px-4 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-neutral-950"
            >
              Xem phiên bản
            </a>
          )}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="relative w-full border-t border-white/15 bg-black/40 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-5 py-5 md:grid-cols-4 md:px-6 md:py-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`flex flex-col-reverse text-left ${index % 2 ? "border-l border-white/15 pl-4" : ""} ${index === 2 ? "md:border-l md:border-white/15 md:pl-6" : ""} ${index % 2 ? "md:pl-6" : ""}`}>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/70">{stat.label}</dt>
                <dd className="text-xl font-extrabold tabular-nums md:text-2xl xl:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
