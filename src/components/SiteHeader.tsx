import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import Image from "next/image";
import ScrollTopLink from "@/components/ScrollTopLink";
import HeaderAutoHide from "@/components/HeaderAutoHide";
import { featuredImages } from "@/lib/carCards";

export default function SiteHeader() {
  return (
    <header id="site-header" className="site-header sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-6 xl:py-3">
        <ScrollTopLink
          href="/"
          aria-label="Về trang chủ"
          className="inline-flex shrink-0 items-center xl:-ml-4"
        >
          {/* Logo mobile */}
          <Image
            src="/images/logo/logo-mobile-new.webp"
            alt="Mitsubishi Motors - Vững Tiến"
            width={900}
            height={300}
            sizes="240px"
            loading="eager"
            className="h-12 w-auto object-contain md:h-14"
          />

        </ScrollTopLink>

        {/* Menu desktop */}
<nav className="hidden items-center gap-7 font-semibold xl:flex">
  <Link
    href="/gioi-thieu"
    className="whitespace-nowrap transition hover:text-red-600"
  >
    Giới thiệu
  </Link>

  <div className="group relative">
            <Link
              href="/#san-pham"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              Sản phẩm
              <span className="text-xs">▼</span>
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                {cars.map((car) => (
                  <Link
                    key={car.slug}
                    href={`/xe/${car.slug}`}
                    className="group/car rounded-xl p-3 text-center transition hover:bg-gray-50"
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={featuredImages[car.id] ?? car.image}
                        alt={car.name}
                        fill
                        sizes="220px"
                        className="object-contain transition duration-200 group-hover/car:scale-105"
                      />
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-800 transition group-hover/car:text-red-600">
                      {car.name}
                    </p>
                  </Link>
                ))}

                <div className="col-span-3 mt-1 flex flex-wrap justify-center gap-2 border-t border-gray-100 pt-3">
                  <Link
                    href="/phu-kien-xe-mitsubishi"
                    className="rounded-full bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-red-50 hover:text-red-700"
                  >
                    Bảng giá phụ kiện xe
                  </Link>
                  <Link
                    href="/tu-van"
                    className="rounded-full bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-red-50 hover:text-red-700"
                  >
                    So sánh với xe đối thủ
                  </Link>
                  <Link
                    href="/dang-ky-lai-thu"
                    className="rounded-full bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-red-50 hover:text-red-700"
                  >
                    Đăng ký lái thử
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/#khuyen-mai"
            className="transition hover:text-red-600"
          >
            Khuyến mãi
          </Link>
                    <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              Dự toán chi phí
              <span className="text-xs">▼</span>
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                <Link
                  href="/bang-gia-xe-mitsubishi"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
                >
                  Bảng giá xe
                </Link>
                <Link
                  href="/du-toan/gia-lan-banh"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
                >
                  Tính giá lăn bánh
                </Link>
                <Link
  href="/du-toan/tra-gop"
  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
>
  Dự tính trả góp
</Link>
              </div>
            </div>
          </div>
          <Link
  href="/tin-tuc"
  className="transition hover:text-red-600"
>
  Tin tức & Tư vấn
</Link>

<div className="group relative">
  <Link
    href="/xe-cu"
    className="flex items-center gap-1 whitespace-nowrap transition hover:text-red-600"
  >
    Xe cũ
    <span className="text-xs">▼</span>
  </Link>

  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
    <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
      <Link
        href="/xe-cu"
        className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
      >
        Xe đã qua sử dụng
      </Link>
      <Link
        href="/thu-cu-doi-moi"
        className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
      >
        Thu cũ đổi mới
      </Link>
    </div>
  </div>
</div>

<Link
  href="/lien-he"
  className="transition hover:text-red-600"
>
  Liên hệ
</Link>
        </nav>

        {/* Liên hệ desktop */}
        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={siteConfig.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/50 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white/10"
          >
            Zalo
          </a>

          <a
            href={siteConfig.contact.phoneUrl}
            className="whitespace-nowrap bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-700"
          >
            Gọi ngay
          </a>
        </div>

        {/* Menu mobile */}
        <MobileMenu cars={cars} />
      </div>
      <HeaderAutoHide />
    </header>
  );
}