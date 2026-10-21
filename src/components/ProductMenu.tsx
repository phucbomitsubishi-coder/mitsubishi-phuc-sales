"use client";

import Image from "next/image";
import Link from "next/link";
import PanelButton, { PanelClose } from "@/components/PanelButton";
import { panelClass, useHeaderPanel } from "@/components/useHeaderPanel";

type MenuCar = { id: string; slug: string; shortName: string; image: string; priceFull: string };

// Mục "Sản phẩm" trên menu máy tính, kiểu trang chủ MMV: bấm để mở bảng chọn xe trắng phủ toàn màn hình
// (dưới thanh menu), khóa cuộn trang tới khi khách chọn xe hoặc đóng (bấm lại, phím Esc, nút ✕).
export default function ProductMenu({ cars }: { cars: MenuCar[] }) {
  const { open, toggle, close, buttonRef, pathname } = useHeaderPanel("san-pham");
  const active = pathname === "/xe" || pathname.startsWith("/xe/");

  return (
    <div className="flex">
      <PanelButton label="Sản phẩm" open={open} highlight={active} controls="product-menu" onClick={toggle} buttonRef={buttonRef} />

      {open && (
        <div id="product-menu" className={panelClass}>
          <PanelClose onClick={close} label="Đóng bảng sản phẩm" />

          <div className="mx-auto max-w-7xl px-6 py-10">
            <ul className="flex flex-wrap justify-center gap-y-10">
              <li className="w-1/4">
                <Link href="/xe" onClick={close} className="group block px-4 text-center">
                  <span className="relative block h-36">
                    <Image src="/images/cars/all-models.png" alt="" fill loading="eager" sizes="300px" className="object-contain transition duration-300 group-hover:scale-105" />
                  </span>
                  <span className="mt-4 block text-lg font-black uppercase group-hover:text-red-700">Tất cả dòng xe</span>
                </Link>
              </li>
              {cars.map((car) => (
                <li key={car.id} className="w-1/4">
                  <Link href={`/xe/${car.slug}`} onClick={close} className="group block px-4 text-center">
                    <span className="relative block h-36">
                      <Image src={car.image} alt="" fill loading="eager" sizes="300px" className="object-contain transition duration-300 group-hover:scale-105" />
                    </span>
                    <span className="mt-4 block text-lg font-black uppercase group-hover:text-red-700">{car.shortName}</span>
                    <span className="mt-0.5 block text-sm text-gray-700">Giá từ {car.priceFull}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-center gap-6">
              <Link
                href="/dang-ky-lai-thu?nguon=Menu-san-pham"
                onClick={close}
                className="w-80 border-2 border-gray-950 py-4 text-center text-sm font-black uppercase tracking-[0.25em] transition hover:bg-gray-950 hover:text-white"
              >
                Đăng ký lái thử
              </Link>
              <Link
                href="/bang-gia-xe-mitsubishi"
                onClick={close}
                className="w-80 border-2 border-gray-950 py-4 text-center text-sm font-black uppercase tracking-[0.25em] transition hover:bg-gray-950 hover:text-white"
              >
                Bảng giá xe
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
