"use client";

import { useState } from "react";

type GalleryType = "exterior" | "interior";

const galleries: Record<GalleryType, string[]> = {
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
};

export default function CarGallery() {
  const [galleryType, setGalleryType] =
    useState<GalleryType>("exterior");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = galleries[galleryType];
  const selectedImage = images[selectedIndex];

  function changeGallery(type: GalleryType) {
    setGalleryType(type);
    setSelectedIndex(0);
  }

  return (
    <div className="w-full">
      {/* ẢNH CHÍNH */}
      <div className="flex h-[340px] items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={selectedImage}
          alt={
            galleryType === "exterior"
              ? "Ngoại thất Mitsubishi Xforce"
              : "Nội thất Mitsubishi Xforce"
          }
          className="h-full w-full object-contain"
        />
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
            className={`overflow-hidden rounded border-2 transition ${
              selectedIndex === index
                ? "border-red-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-16 w-full object-cover sm:h-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}