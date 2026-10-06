"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: "triton",
    name: "Mitsubishi Triton",
    image: "/images/hero/hero-triton.jpg",
    position: "center center",
    href: "/xe/mitsubishi-triton",
  },
  {
    id: "xforce",
    name: "Mitsubishi Xforce",
    image: "/images/hero/hero-xforce.jpg",
    position: "center center",
    href: "/xe/mitsubishi-xforce",
  },
  {
    id: "destinator",
    name: "Mitsubishi Destinator",
    image: "/images/hero/hero-destinator.jpg",
    position: "center center",
    href: "/xe/mitsubishi-destinator",
  },
  {
    id: "xpander",
    name: "Mitsubishi Xpander & Xpander Cross",
    image: "/images/hero/hero-xpander.jpg",
    position: "center center",
    href: "/xe/mitsubishi-xpander",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Trang đã tải xong: lúc này mới tải các slide sau và bắt đầu tự chuyển slide,
  // để ảnh slide đầu (phần tử lớn nhất đầu trang - LCP) không bị tranh băng thông.
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => setPageLoaded(true);

    if (document.readyState === "complete") {
      const timer = setTimeout(markLoaded, 0);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", markLoaded, { once: true });
    return () => window.removeEventListener("load", markLoaded);
  }, []);

  useEffect(() => {
    if (!pageLoaded) return;

    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [pageLoaded]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-[16/7] w-full">
        {slides.map((item, index) =>
          index === 0 || pageLoaded ? (
            <Image
              key={item.id}
              src={item.image}
              alt={item.name}
              fill
              preload={index === 0}
              sizes="100vw"
              aria-hidden={index !== currentSlide}
              className={`object-cover transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: item.position }}
            />
          ) : null
        )}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 whitespace-nowrap sm:bottom-10 sm:left-auto sm:right-12 sm:translate-x-0 sm:gap-3 lg:right-20">
  <Link
    href={slide.href}
    className="rounded-lg border-2 border-white bg-black/60 px-3 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black sm:px-7 sm:py-3 sm:text-sm"
  >
    Tìm hiểu thêm →
  </Link>

  <Link
    href={`/dang-ky-lai-thu?xe=${slide.id}&nguon=Hero`}
    className="rounded-lg border-2 border-red-600 bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-red-700 hover:bg-red-700 sm:px-7 sm:py-3 sm:text-sm"
  >
    Đăng ký lái thử
  </Link>
</div>
      </div>
    </section>
  );
}