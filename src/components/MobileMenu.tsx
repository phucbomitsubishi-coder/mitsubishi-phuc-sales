"use client";

import { useState } from "react";
import Link from "next/link";

type MobileMenuProps = {
  cars: {
    name: string;
    slug: string;
  }[];
};

export default function MobileMenu({ cars }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden">
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
              <Link
                key={car.slug}
                href={`/xe/${car.slug}`}
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-800 px-3 py-3 text-sm font-semibold transition hover:border-red-600 hover:text-red-500"
              >
                {car.name}
              </Link>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-800 pt-4">
              <Link
    href="/gioi-thieu"
    onClick={() => setIsOpen(false)}
    className="block py-3 font-semibold"
  >
    Giới thiệu
  </Link>
  <Link
    href="/#khuyen-mai"
    onClick={() => setIsOpen(false)}
    className="block py-3 font-semibold"
  >
    Khuyến mãi
  </Link>

    <Link
    href="/bang-gia-xe-mitsubishi"
    onClick={() => setIsOpen(false)}
    className="block py-3 font-semibold"
  >
    Bảng giá xe
  </Link>

    <Link
    href="/du-toan/gia-lan-banh"
    onClick={() => setIsOpen(false)}
    className="block py-3 font-semibold"
  >
    Tính giá lăn bánh
  </Link>
  <Link
  href="/du-toan/tra-gop"
  onClick={() => setIsOpen(false)}
  className="block py-3 font-semibold"
>
  Dự tính trả góp
</Link>

  <Link
  href="/tin-tuc"
  onClick={() => setIsOpen(false)}
  className="block py-3 font-semibold"
>
  Tin tức & Tư vấn
</Link>

  <Link
  href="/tu-van"
  onClick={() => setIsOpen(false)}
  className="block py-3 font-semibold"
>
  Tư vấn mua xe
</Link>

<Link
  href="/xe-cu"
  onClick={() => setIsOpen(false)}
  className="block py-3 font-semibold"
>
  Xe đã qua sử dụng
</Link>

<Link
  href="/lien-he"
  onClick={() => setIsOpen(false)}
  className="block py-3 font-semibold"
>
  Liên hệ
</Link>
</div>
</div>
)}
</div>
);
}