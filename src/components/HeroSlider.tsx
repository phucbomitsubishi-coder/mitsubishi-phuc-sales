"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    image: "/images/hero/hero-xforce.png",
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-[16/7] w-full">
        <Image
          src={slide.image}
          alt={slide.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: slide.position }}
        />
        <div className="absolute bottom-8 right-8 z-10 flex gap-3 sm:bottom-10 sm:right-12 lg:right-20">
  <a
    href={slide.href}
    className="rounded-lg border-2 border-white bg-black/60 px-5 py-3 text-sm font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black sm:px-7"
  >
    Tìm hiểu thêm →
  </a>

  <a
    href={`/dang-ky-lai-thu?xe=${slide.id}`}
    className="rounded-lg border-2 border-red-600 bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-red-700 hover:bg-red-700 sm:px-7"
  >
    Đăng ký lái thử
  </a>
</div>
      </div>
    </section>
  );
}