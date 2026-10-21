"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

type BarCar = { id: string; slug: string; name: string };

const icons = {
  quote: "M5 3h14v18H5zM8 7h8M8 11h8M8 15h5",
  testDrive: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9.5 4h5.5m8 0h5.5M12 16v5.5",
  zalo: "M4 5h16v11H9l-5 4z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
};

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

// Thanh hành động cố định đáy màn hình điện thoại, MỌI TRANG (21/10/2026, kiểu thanh đáy Toyota VN / Mitsubishi Úc):
// Báo giá | Lái thử (mở hộp thoại QuoteDialog, đang ở trang xe thì điền sẵn xe đó) | Zalo | Gọi.
// Thay cho MobileContactBar từng trang và nút nổi "Báo giá" trên điện thoại. Class mobile-contact-bar để footer chừa chỗ (globals.css).
export default function MobileActionBar({ cars }: { cars: BarCar[] }) {
  const pathname = usePathname();
  const car = pathname.startsWith("/xe/") ? cars.find((item) => pathname === `/xe/${item.slug}`) : undefined;
  const source = car ? "Thanh-day-trang-xe" : "Thanh-day";
  const quoteHref = car ? `/?car=${encodeURIComponent(car.name)}&nguon=${source}#bao-gia` : `/?nguon=${source}#bao-gia`;
  const testDriveHref = car ? `/dang-ky-lai-thu?xe=${car.id}&nguon=${source}` : `/dang-ky-lai-thu?nguon=${source}`;
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-bold uppercase tracking-wide";

  return (
    <nav aria-label="Liên hệ nhanh" className="mobile-contact-bar fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
      <div className="flex">
        <Link href={quoteHref} className={`${item} bg-red-600 text-white`}>
          <Icon d={icons.quote} />
          Báo giá
        </Link>
        <Link href={testDriveHref} className={`${item} text-gray-900`}>
          <Icon d={icons.testDrive} />
          Lái thử
        </Link>
        <a href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-blue-700`}>
          <Icon d={icons.zalo} />
          Zalo
        </a>
        <a href={siteConfig.contact.phoneUrl} className={`${item} text-gray-900`}>
          <Icon d={icons.phone} />
          Gọi
        </a>
      </div>
    </nav>
  );
}
