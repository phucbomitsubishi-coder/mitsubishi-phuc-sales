"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryType = "exterior" | "interior";

const carGalleries: Record<
  string,
  Record<GalleryType, string[]>
> = {
  "Mitsubishi Xforce": {
    exterior: [
      "/images/cars/xforce/gallery/exterior/exterior-01.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-02.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-03.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xforce/gallery/interior/interior-01.jpg",
      "/images/cars/xforce/gallery/interior/interior-02.jpg",
      "/images/cars/xforce/gallery/interior/interior-03.jpg",
      "/images/cars/xforce/gallery/interior/interior-04.jpg",
    ],
    },

  "Mitsubishi Xpander": {
    exterior: [
      "/images/cars/xpander/gallery/exterior/exterior-01.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-02.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-03.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xpander/gallery/interior/interior-01.jpg",
      "/images/cars/xpander/gallery/interior/interior-02.jpg",
      "/images/cars/xpander/gallery/interior/interior-03.jpg",
      "/images/cars/xpander/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Xpander Cross": {
    exterior: [
      "/images/cars/xpander-cross/gallery/exterior/exterior-01.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-02.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-03.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xpander-cross/gallery/interior/interior-01.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-02.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-03.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Attrage": {
    exterior: [
      "/images/cars/attrage/gallery/exterior/exterior-01.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-02.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-03.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/attrage/gallery/interior/interior-01.jpg",
      "/images/cars/attrage/gallery/interior/interior-02.jpg",
      "/images/cars/attrage/gallery/interior/interior-03.jpg",
      "/images/cars/attrage/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Triton": {
    exterior: [
      "/images/cars/triton/gallery/exterior/exterior-01.jpg",
      "/images/cars/triton/gallery/exterior/exterior-02.jpg",
      "/images/cars/triton/gallery/exterior/exterior-03.jpg",
      "/images/cars/triton/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/triton/gallery/interior/interior-01.jpg",
      "/images/cars/triton/gallery/interior/interior-02.jpg",
      "/images/cars/triton/gallery/interior/interior-03.jpg",
      "/images/cars/triton/gallery/interior/interior-04.jpg",
    ],
  },
  "Mitsubishi Destinator": {
  exterior: [
    "/images/cars/destinator/gallery/exterior/exterior-01.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-02.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-03.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-04.jpg",
  ],
  interior: [
    "/images/cars/destinator/gallery/interior/interior-01.jpg",
    "/images/cars/destinator/gallery/interior/interior-02.jpg",
    "/images/cars/destinator/gallery/interior/interior-03.jpg",
    "/images/cars/destinator/gallery/interior/interior-04.jpg",
  ],
},
};


type Props = {
  carName: string;
  galleries?: Record<GalleryType, string[]>;
};

export default function CarGallery({
  carName,
  galleries: customGalleries,
}: Props) {
  const [galleryType, setGalleryType] =
    useState<GalleryType>("exterior");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const images =
  (customGalleries ?? carGalleries[carName])?.[galleryType] ?? [];
  const selectedImage = images[selectedIndex];

  function changeGallery(type: GalleryType) {
    setGalleryType(type);
    setSelectedIndex(0);
  }

  return (
    <div className="w-full">
      {/* ẢNH CHÍNH */}
      <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        {selectedImage && (
        <Image
          src={selectedImage}
          alt={
  galleryType === "exterior"
    ? `Ngoại thất ${carName}`
    : `Nội thất ${carName}`
}
          fill
          loading="eager"
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
        )}
      </div>

      {/* TAB NGOẠI THẤT / NỘI THẤT */}
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => changeGallery("exterior")}
          className={`rounded px-4 py-2 text-sm font-semibold transition ${
            galleryType === "exterior"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Ngoại thất
        </button>

        <button
          type="button"
          onClick={() => changeGallery("interior")}
          className={`rounded px-4 py-2 text-sm font-semibold transition ${
            galleryType === "interior"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Nội thất
        </button>
      </div>

      {/* ẢNH THU NHỎ */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Xem ảnh ${galleryType === "exterior" ? "ngoại thất" : "nội thất"} ${index + 1} của ${carName}`}
            aria-pressed={selectedIndex === index}
            className={`relative h-16 overflow-hidden rounded border-2 transition sm:h-20 ${
              selectedIndex === index
                ? "border-red-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}