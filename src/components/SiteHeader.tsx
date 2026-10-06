import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import Image from "next/image";
import ScrollTopLink from "@/components/ScrollTopLink";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black text-white xl:border-gray-200 xl:bg-white xl:text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6 md:py-5">
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
            className="h-20 w-auto object-contain xl:hidden"
          />

          {/* Logo desktop */}
          <Image
            src="/images/logo/logo-black.svg"
            alt="Mitsubishi Motors"
            width={934}
            height={272}
            loading="eager"
            className="hidden h-12 w-auto xl:block"
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
                        src={car.image}
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

<Link
  href="/xe-cu"
  className="whitespace-nowrap transition hover:text-red-600"
>
  Xe đã qua sử dụng
</Link>

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
            className="rounded border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Zalo
          </a>

          <a
            href={siteConfig.contact.phoneUrl}
            className="whitespace-nowrap rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Gọi ngay
          </a>
        </div>

        {/* Menu mobile */}
        <MobileMenu cars={cars} />
      </div>
    </header>
  );
}