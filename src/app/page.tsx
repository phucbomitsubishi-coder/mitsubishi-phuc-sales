import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site";
import QuoteForm from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO */}
      <section
  className="relative bg-cover bg-bottom bg-no-repeat text-white"
  style={{
    backgroundImage:
      "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.05) 100%), url('/images/hero/hero-main.jpg')",
  }}
>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
            Mitsubishi Motors
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Mitsubishi Bình Dương
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white drop-shadow-md sm:mt-6 sm:text-lg">
            Tư vấn các dòng xe Mitsubishi, báo giá và chương trình
            khuyến mãi mới.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={siteConfig.contact.phoneUrl}
              className="rounded bg-red-600 px-6 py-3 font-semibold text-white"
            >
              Gọi ngay
            </a>

            <a
              href={siteConfig.contact.zaloUrl}
              className="rounded border border-white px-6 py-3 font-semibold"
            >
              Tư vấn Zalo
            </a>
          </div>
        </div>
      </section>

      {/* DANH SÁCH XE */}
      <section id="san-pham" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-wider text-red-600">
            Sản phẩm
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Các dòng xe Mitsubishi
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <article
              key={car.slug}
              className="rounded-xl border border-gray-200 p-6 shadow-sm"
            >
<img
  src={car.image}
  alt={car.name}
  className="mb-6 h-52 w-full object-contain"
/>
<h3 className="text-2xl font-bold">{car.name}</h3>

              <p className="mt-3 text-gray-600">
                {car.shortDescription}
              </p>

              <div className="mt-6">
                <span className="text-sm text-gray-500">
                  Giá tham khảo
                </span>

                <p className="text-xl font-bold text-red-600">
                  {car.variants[0]?.price
                    ? `${car.variants[0].price.toLocaleString("vi-VN")} ₫`
                    : "Liên hệ"}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
  <a
    href={`/xe/${car.slug}`}
    className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
  >
    Xem chi tiết
  </a>

  <a
    href={siteConfig.contact.zaloUrl}
    className="rounded border border-gray-300 px-4 py-2 font-semibold transition hover:border-red-600 hover:text-red-600"
  >
    Nhận báo giá
  </a>
</div>
            </article>
          ))}
        </div>
      </section>
      {/* KHUYẾN MÃI */}
<section id="khuyen-mai" className="bg-gray-100">
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="font-semibold uppercase tracking-wider text-red-600">
      Khuyến mãi
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Ưu đãi Mitsubishi mới nhất
    </h2>

    <p className="mt-4 max-w-2xl text-gray-600">
      Tham khảo chương trình ưu đãi theo từng dòng xe. Liên hệ trực tiếp
      để nhận báo giá và chính sách hiện hành.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <div
          key={car.id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase text-red-600">
            Ưu đãi
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {car.name}
          </h3>

          <p className="mt-4 text-gray-600">
            {car.promotion.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`/xe/${car.slug}`}
              className="rounded bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Xem chi tiết
            </a>

            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-blue-600 bg-white px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Nhận ưu đãi
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* NHẬN BÁO GIÁ */}
<QuoteForm />

{/* LIÊN HỆ */}
<section id="lien-he" className="bg-neutral-950 text-white">
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="font-semibold uppercase tracking-wider text-red-500">
      Liên hệ
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Lưu Hoàng Phúc
    </h2>

    <p className="mt-2 text-lg font-semibold text-gray-200">
      Tư vấn bán hàng Mitsubishi
    </p>

    <p className="mt-4 max-w-2xl leading-7 text-gray-300">
      Tư vấn mua xe Mitsubishi, báo giá, chương trình ưu đãi, hỗ trợ trả góp
      và đăng ký lái thử tại khu vực Bình Dương.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {/* HOTLINE */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Hotline tư vấn
        </p>

        <a
          href={siteConfig.contact.phoneUrl}
          className="mt-2 block text-xl font-bold text-white transition hover:text-red-500"
        >
          0858 678 929
        </a>

        <a
          href={siteConfig.contact.phoneUrl}
          className="mt-5 block rounded bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700"
        >
          Gọi ngay
        </a>
      </div>

      {/* ZALO */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Zalo tư vấn
        </p>

        <p className="mt-2 text-xl font-bold">
          0858 678 929
        </p>

        <a
          href={siteConfig.contact.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded border border-blue-500 px-4 py-3 text-center font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          Mở Zalo
        </a>
      </div>

      {/* EMAIL */}
      <div className="rounded-xl border border-gray-700 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Email
        </p>

        <a
          href={siteConfig.contact.emailUrl}
          className="mt-2 block break-all font-semibold text-white transition hover:text-red-500"
        >
          phucbo.mitsubishi@gmail.com
        </a>

        <a
          href={siteConfig.contact.emailUrl}
          className="mt-5 block rounded border border-gray-600 px-4 py-3 text-center font-semibold transition hover:border-white"
        >
          Gửi email
        </a>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
      Mitsubishi Motors Bình Dương • Tư vấn bán hàng: Lưu Hoàng Phúc
    </div>
  </div>
</section>
    </main>
  );
}