"use client";

import { useState } from "react";

type Props = {
  images: string[];
  carName: string;
};

export default function UsedCarGallery({
  images,
  carName,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] ?? ""
  );

  if (images.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <img
          src={selectedImage}
          alt={carName}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border-2 bg-white transition ${
              selectedImage === image
                ? "border-red-600"
                : "border-transparent hover:border-gray-300"
            }`}
            aria-label={`Xem ảnh ${index + 1} của ${carName}`}
          >
            <img
              src={image}
              alt={`${carName} - ảnh ${index + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}