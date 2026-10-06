"use client";

import { useState } from "react";
import Image from "next/image";

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
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm">
        <Image
          src={selectedImage}
          alt={carName}
          fill
          loading="eager"
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-white transition ${
              selectedImage === image
                ? "border-red-600"
                : "border-transparent hover:border-gray-300"
            }`}
            aria-label={`Xem ảnh ${index + 1} của ${carName}`}
          >
            <Image
              src={image}
              alt={`${carName} - ảnh ${index + 1}`}
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