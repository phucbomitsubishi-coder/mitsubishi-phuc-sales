"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { carGalleries } from "@/data/carGalleries";

type GalleryType = "exterior" | "interior";

type Props = {
  carName: string;
  galleries?: Record<GalleryType, string[]>;
  // Ảnh dùng tạm khi xe chưa có bộ ảnh trong carGalleries
  fallbackImage?: string;
};

// Thư viện ảnh kiểu Toyota: tab Ngoại thất / Nội thất, hàng ảnh lớn vuốt ngang (máy tính có nút mũi tên).
export default function CarGallery({ carName, galleries: customGalleries, fallbackImage }: Props) {
  const [galleryType, setGalleryType] = useState<GalleryType>("exterior");
  const trackRef = useRef<HTMLDivElement>(null);

  const gallery = customGalleries ?? carGalleries[carName];
  const images = gallery?.[galleryType] ?? (galleryType === "exterior" && fallbackImage ? [fallbackImage] : []);
  const label = galleryType === "exterior" ? "Ngoại thất" : "Nội thất";

  function changeGallery(type: GalleryType) {
    setGalleryType(type);
    trackRef.current?.scrollTo({ left: 0 });
  }

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-6" role="tablist" aria-label="Loại ảnh">
          {(["exterior", "interior"] as GalleryType[]).map((type) => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={galleryType === type}
              onClick={() => changeGallery(type)}
              className={`border-b-2 pb-1 text-sm font-bold uppercase tracking-[0.15em] transition ${
                galleryType === type ? "border-red-600 text-gray-950" : "border-transparent text-gray-600 hover:text-gray-950"
              }`}
            >
              {type === "exterior" ? "Ngoại thất" : "Nội thất"}
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => scrollBy(direction)}
                aria-label={direction < 0 ? "Ảnh trước" : "Ảnh sau"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-lg transition hover:border-gray-900"
              >
                {direction < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        // Vuốt bằng bàn phím (mũi tên trái/phải) khi khung ảnh được chọn
        tabIndex={0}
        role="region"
        aria-label={`Ảnh ${label.toLowerCase()} ${carName}`}
        className="-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className="relative aspect-[16/10] w-[85%] shrink-0 snap-start overflow-hidden bg-neutral-900 md:w-[62%]"
          >
            <Image
              src={image}
              alt={`${label} ${carName} – ảnh ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 800px, 85vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
