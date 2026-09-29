"use client";

import { useState } from "react";

type MobileMenuProps = {
  cars: {
    name: string;
    slug: string;
  }[];
};

export default function MobileMenu({ cars }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 items-center justify-center text-3xl text-white"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-800 bg-black px-5 py-5 text-white shadow-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            Sản phẩm
          </p>

          <div className="grid grid-cols-2 gap-2">
            {cars.map((car) => (
              <a
                key={car.slug}
                href={`/xe/${car.slug}`}
                className="rounded-lg border border-gray-800 px-3 py-3 text-sm font-semibold transition hover:border-red-600 hover:text-red-500"
              >
                {car.name}
              </a>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-800 pt-4">
            <a
              href="/#khuyen-mai"
              onClick={() => setIsOpen(false)}
              className="block py-3 font-semibold"
            >
              Khuyến mãi
            </a>

            <a
              href="/#lien-he"
              onClick={() => setIsOpen(false)}
              className="block py-3 font-semibold"
            >
              Liên hệ
            </a>
          </div>
        </div>
      )}
    </div>
  );
}