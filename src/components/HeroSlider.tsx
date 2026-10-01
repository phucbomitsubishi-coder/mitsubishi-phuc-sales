"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "triton",
    name: "Mitsubishi Triton",
    image: "/images/hero/hero-triton.jpg",
    position: "center center",
  },
  {
    id: "xforce",
    name: "Mitsubishi Xforce",
    image: "/images/hero/hero-xforce.png",
    position: "center center",
  },
  {
    id: "destinator",
    name: "Mitsubishi Destinator",
    image: "/images/hero/hero-destinator.jpg",
    position: "center center",
  },
  {
    id: "xpander",
    name: "Mitsubishi Xpander & Xpander Cross",
    image: "/images/hero/hero-xpander.jpg",
    position: "center center",
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
      </div>
    </section>
  );
}