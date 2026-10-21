"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useHeaderPanel } from "@/components/useHeaderPanel";
import { buyLinks, serviceLinks, type MenuLink } from "@/lib/menuLinks";
import { siteConfig } from "@/config/site";

type MobileMenuProps = {
  cars: { slug: string; shortName: string; image: string; priceFull: string }[];
};

// Một mục chính có danh sách con (bấm để mở/đóng)
function Section({ id, title, expanded, onToggle, children }: { id: string; title: string; expanded: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <li className="border-b border-gray-200">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`mm-${id}`}
        onClick={onToggle}
        className={`flex w-full items-center justify-between py-4 text-left text-2xl transition ${expanded ? "text-red-600" : "text-gray-950"}`}
      >
        {title}
        <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-5 w-5 transition ${expanded ? "rotate-180 text-red-600" : "text-gray-500"}`} fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
      <div id={`mm-${id}`} className={expanded ? "pb-5" : "hidden"}>
        {children}
      </div>
    </li>
  );
}

// Danh sách link con thụt lề, có vạch trái (Mua xe, Dịch vụ, Về Phúc)
function SubLinks({ links, onPick }: { links: MenuLink[]; onPick: () => void }) {
  return (
    <ul className="ml-1 border-l border-gray-300 pl-5">
      {links.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onPick} className="flex items-center gap-1.5 py-2 text-base text-gray-700">
              {item.label}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3h7v7M13 3 4 12" />
              </svg>
              <span className="sr-only">(mở trang Mitsubishi Motors Việt Nam)</span>
            </a>
          ) : (
            <Link href={item.href} onClick={onPick} className="block py-2 text-base text-gray-700">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

// Menu điện thoại kiểu MMV (21/10/2026): bảng trắng phủ toàn màn hình dưới thanh menu, mục chính chữ lớn
// bấm để mở danh sách con, link phụ nhỏ có biểu tượng ở dưới; khóa cuộn trang khi mở (useHeaderPanel).
export default function MobileMenu({ cars }: MobileMenuProps) {
  const { open, toggle, close, buttonRef } = useHeaderPanel("mobile");
  const [section, setSection] = useState<string | null>(null);

  const plainLink = (href: string, title: string) => (
    <li className="border-b border-gray-200">
      <Link href={href} onClick={close} className="block py-4 text-2xl text-gray-950">
        {title}
      </Link>
    </li>
  );

  const small = (href: string, label: string, icon: string, external = false) => {
    const content = (
      <>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
        {label}
      </>
    );
    const className = "flex items-center gap-3 py-2.5 text-gray-700";
    return (
      <li key={href}>
        {external ? (
          <a href={href} onClick={close} className={className}>
            {content}
          </a>
        ) : (
          <Link href={href} onClick={close} className={className}>
            {content}
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggle}
        className="-mr-2 flex h-11 w-11 items-center justify-center text-white"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-6 w-6 ${open ? "text-red-500" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-[linear-gradient(115deg,#ffffff_55%,#f3f3f3_55%)] px-6 pb-28 pt-2 text-gray-950"
        >
          <ul>
            <Section id="san-pham" expanded={section === "san-pham"} onToggle={() => setSection(section === "san-pham" ? null : "san-pham")} title="Sản phẩm">
              {/* Mỗi xe một hàng: ảnh bên trái, tên + giá bên phải (kiểu menu điện thoại MMV) */}
              <ul className="divide-y divide-gray-100">
                <li>
                  <Link href="/xe" onClick={close} className="flex items-center gap-4 py-3">
                    <span className="relative h-16 w-32 shrink-0">
                      <Image src="/images/cars/all-models.png" alt="" fill loading="eager" sizes="128px" className="object-contain" />
                    </span>
                    <span className="text-base font-black uppercase">Tất cả dòng xe</span>
                  </Link>
                </li>
                {cars.map((car) => (
                  <li key={car.slug}>
                    <Link href={`/xe/${car.slug}`} onClick={close} className="flex items-center gap-4 py-3">
                      <span className="relative h-16 w-32 shrink-0">
                        <Image src={car.image} alt="" fill loading="eager" sizes="128px" className="object-contain" />
                      </span>
                      <span>
                        <span className="block text-base font-black uppercase leading-tight">{car.shortName}</span>
                        <span className="mt-0.5 block text-sm text-gray-600">Giá từ {car.priceFull}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-3">
                <Link href="/dang-ky-lai-thu?nguon=Menu-dien-thoai" onClick={close} className="block border-2 border-gray-950 py-3 text-center text-xs font-black uppercase tracking-[0.25em]">
                  Đăng ký lái thử
                </Link>
                <Link href="/bang-gia-xe-mitsubishi" onClick={close} className="block border-2 border-gray-950 py-3 text-center text-xs font-black uppercase tracking-[0.25em]">
                  Bảng giá xe
                </Link>
              </div>
            </Section>
            <Section id="mua-xe" expanded={section === "mua-xe"} onToggle={() => setSection(section === "mua-xe" ? null : "mua-xe")} title="Mua xe">
              <SubLinks links={buyLinks} onPick={close} />
            </Section>
            <Section id="dich-vu" expanded={section === "dich-vu"} onToggle={() => setSection(section === "dich-vu" ? null : "dich-vu")} title="Dịch vụ">
              <SubLinks links={serviceLinks} onPick={close} />
            </Section>
            {plainLink("/tin-tuc", "Tin tức & Tư vấn")}
            <Section id="gioi-thieu" expanded={section === "gioi-thieu"} onToggle={() => setSection(section === "gioi-thieu" ? null : "gioi-thieu")} title="Về Phúc">
              <SubLinks links={[{ href: "/gioi-thieu", label: "Giới thiệu" }, { href: "/lien-he", label: "Liên hệ" }]} onPick={close} />
            </Section>
          </ul>

          <ul className="mt-6">
            {small("/#khuyen-mai", "Khuyến mãi", "M3 9h18v4H3zM5 13h14v8H5zM12 9v12M12 9S10 4 7.5 5.5 9 9 12 9zm0 0s2-5 4.5-3.5S15 9 12 9z")}
            {small("/bang-gia-xe-mitsubishi", "Bảng giá xe", "M5 3h14v18H5zM8 7h8M8 11h8M8 15h5")}
            {small("/dang-ky-lai-thu", "Đăng ký lái thử", "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9.5 4h5.5m8 0h5.5M12 16v5.5")}
            {small("/du-toan/gia-lan-banh", "Tính giá lăn bánh", "M5 3h14v18H5zM8 7h8M8 11h2m3 0h3m-8 4h2m3 0h3")}
            {small(siteConfig.contact.phoneUrl, `Gọi ${siteConfig.sales.phoneDisplay}`, "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2", true)}
          </ul>
        </nav>
      )}
    </div>
  );
}
