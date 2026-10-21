"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Link trên menu máy tính: gạch đỏ dưới chữ khi đang ở trang đó (hoặc trang con, theo `match`).
export default function HeaderNavLink({
  href,
  match = [],
  children,
}: {
  href: string;
  match?: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = [href, ...match].some((path) => path !== "/" && !path.includes("#") && (pathname === path || pathname.startsWith(`${path}/`)));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex h-full items-center gap-1 whitespace-nowrap transition hover:text-white ${active ? "text-white" : "text-white/80"}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transition ${active ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
}
