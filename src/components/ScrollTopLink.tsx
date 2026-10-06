"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Link về trang chủ. <Link> không cuộn khi đã ở đúng trang,
// nên khi đang ở trang chủ thì tự cuộn lên đầu trang (giống tải lại trang).
export default function ScrollTopLink({
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    />
  );
}
