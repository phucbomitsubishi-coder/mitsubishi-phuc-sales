import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import MobileMenu from "@/components/MobileMenu";
import ScrollTopLink from "@/components/ScrollTopLink";
import HeaderAutoHide from "@/components/HeaderAutoHide";
import HeaderNavLink from "@/components/HeaderNavLink";
import ProductMenu from "@/components/ProductMenu";
import BuyMenu from "@/components/BuyMenu";
import ServiceMenu from "@/components/ServiceMenu";
import { carCards } from "@/lib/carCards";

// Thanh menu 2 tầng kiểu trang chủ MMV (21/10/2026): máy tính cao ~104px, logo lớn; tầng trên link phụ chữ nhỏ
// (Khuyến mãi, Bảng giá, Lái thử, Liên hệ, số điện thoại); tầng dưới menu chính chữ in hoa đậm giãn chữ
// (Sản phẩm ▾ = ProductMenu, Mua xe ▾ = BuyMenu, Dịch vụ ▾ = ServiceMenu: bấm mở bảng trắng toàn màn hình, khóa cuộn) + nút Nhắn Zalo.
// Điện thoại: 1 tầng 64px, dùng MobileMenu.

const topLinks = [
  { href: "/#khuyen-mai", label: "Khuyến mãi" },
  { href: "/bang-gia-xe-mitsubishi", label: "Bảng giá" },
  { href: "/dang-ky-lai-thu", label: "Đăng ký lái thử" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  return (
    <header id="site-header" className="site-header sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 md:px-6 xl:h-[104px]">
        <ScrollTopLink href="/" aria-label="Về trang chủ" className="inline-flex shrink-0 items-center">
          <Image
            src="/images/logo/logo-mobile-new.webp"
            alt="Mitsubishi Motors - Vững Tiến"
            width={900}
            height={300}
            sizes="(min-width: 1280px) 260px, 160px"
            loading="eager"
            className="h-12 w-auto object-contain md:h-[52px] xl:h-[84px]"
          />
        </ScrollTopLink>

        {/* Menu máy tính: 2 tầng */}
        <div className="hidden h-full flex-1 flex-col xl:flex">
          <div className="flex items-center justify-end gap-6 pt-3 text-sm font-semibold text-white/85">
            {topLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.contact.phoneUrl} className="flex items-center gap-1.5 text-white transition hover:text-red-400">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
              <span className="tabular-nums">{siteConfig.sales.phoneDisplay}</span>
            </a>
          </div>
          <div className="flex flex-1 items-stretch justify-between">
        <nav aria-label="Menu chính" className="flex h-full items-stretch gap-9 text-sm font-bold uppercase tracking-[0.18em] 2xl:gap-12 2xl:text-[15px]">
          <ProductMenu cars={carCards.map(({ id, slug, shortName, sideImage, image, priceFull }) => ({ id, slug, shortName, image: sideImage ?? image, priceFull }))} />

          <BuyMenu />
          <ServiceMenu />
          <HeaderNavLink href="/tin-tuc" match={["/tu-van"]}>Tin tức & Tư vấn</HeaderNavLink>
          <HeaderNavLink href="/gioi-thieu" match={["/lien-he"]}>Giới thiệu</HeaderNavLink>
        </nav>

            <div className="flex items-center">
              <a
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Menu điện thoại */}
        <MobileMenu cars={carCards.map(({ slug, shortName, sideImage, image, priceFull }) => ({ slug, shortName, image: sideImage ?? image, priceFull }))} />
      </div>
      <HeaderAutoHide />
    </header>
  );
}
