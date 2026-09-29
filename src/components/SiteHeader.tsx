import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site";
import MobileMenu from "@/components/MobileMenu";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black text-white md:border-gray-200 md:bg-white md:text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6 md:py-5">
        <a
          href="/"
          aria-label="Về trang chủ"
          className="inline-flex shrink-0 items-center"
        >
          {/* Logo mobile */}
          <img
            src="/images/logo/logo-mobile-new.png"
            alt="Mitsubishi Motors - Vững Tiến"
            className="h-20 w-auto object-contain md:hidden"
          />

          {/* Logo desktop */}
          <img
            src="/images/logo/logo-black.svg"
            alt="Mitsubishi Motors"
            className="hidden h-12 w-auto md:block"
          />
        </a>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-7 font-semibold md:flex">
          <div className="group relative">
            <a
              href="/#san-pham"
              className="flex items-center gap-1 transition hover:text-red-600"
            >
              Sản phẩm
              <span className="text-xs">▼</span>
            </a>

            <div className="invisible absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                {cars.map((car) => (
                  <a
                    key={car.slug}
                    href={`/xe/${car.slug}`}
                    className="group/car rounded-xl p-3 text-center transition hover:bg-gray-50"
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="mx-auto h-24 w-full object-contain transition duration-200 group-hover/car:scale-105"
                    />

                    <p className="mt-2 text-sm font-semibold text-gray-800 transition group-hover/car:text-red-600">
                      {car.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/#khuyen-mai"
            className="transition hover:text-red-600"
          >
            Khuyến mãi
          </a>
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
                <a
                  href="/du-toan/gia-lan-banh"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-red-600"
                >
                  Tính giá lăn bánh
                </a>
              </div>
            </div>
          </div>
          <a
  href="/#tin-tuc"
  className="transition hover:text-red-600"
>
  Tin tức & Tư vấn
</a>

          <a
            href="/#lien-he"
            className="transition hover:text-red-600"
          >
            Liên hệ
          </a>
        </nav>

        {/* Liên hệ desktop */}
        <div className="hidden items-center gap-3 md:flex">
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