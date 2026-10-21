"use client";

import Image from "next/image";
import Link from "next/link";
import PanelButton, { PanelClose } from "@/components/PanelButton";
import { panelClass, useHeaderPanel } from "@/components/useHeaderPanel";
import type { MenuLink } from "@/lib/menuLinks";

// Mục menu máy tính kiểu trang chủ MMV ("Mua xe", "Dịch vụ"): bấm để mở bảng trắng toàn màn hình,
// bên trái ảnh lớn, bên phải danh sách link chữ lớn; khóa cuộn trang tới khi đóng.
export default function LinkPanelMenu({
  id,
  label,
  image,
  links,
  activePrefixes = [],
}: {
  id: string;
  label: string;
  image: string;
  links: MenuLink[];
  activePrefixes?: string[];
}) {
  const { open, toggle, close, buttonRef, pathname } = useHeaderPanel(id);
  const active =
    links.some((item) => !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`))) ||
    activePrefixes.some((prefix) => pathname.startsWith(prefix));
  const panelId = `${id}-menu`;

  return (
    <div className="flex">
      <PanelButton label={label} open={open} highlight={active} controls={panelId} onClick={toggle} buttonRef={buttonRef} />

      {open && (
        <div id={panelId} className={panelClass}>
          <PanelClose onClick={close} label={`Đóng bảng ${label.toLowerCase()}`} />

          <div className="mx-auto grid min-h-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[900/736] w-full max-w-xl">
              <Image src={image} alt="" fill loading="eager" sizes="600px" className="object-contain" />
            </div>
            <ul className="space-y-1 lg:pl-16">
              {links.map((item) => {
                const current = pathname === item.href;
                const className = `inline-flex items-center gap-2 py-2 text-2xl font-normal transition hover:text-red-700 ${current ? "text-red-700" : "text-gray-700"}`;
                return (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={close} className={className}>
                        {item.label}
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6 3h7v7M13 3 4 12" />
                        </svg>
                        <span className="sr-only">(mở trang Mitsubishi Motors Việt Nam)</span>
                      </a>
                    ) : (
                      <Link href={item.href} onClick={close} aria-current={current ? "page" : undefined} className={className}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
