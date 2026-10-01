import { cars } from "@/data/cars";
import { getMaxPromotionValue } from "@/data/promotions";
import { siteConfig } from "@/config/site";
import QuoteForm from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO SLIDER */}
<HeroSlider />

      {/* DANH SÁCH XE */}
      <section
  id="san-pham"
  className="mx-auto max-w-7xl px-6 py-8 sm:py-10"
>
        <div className="mb-6">
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
<div className="mb-3 h-40 overflow-hidden">
  <img
    src={car.image}
    alt={car.name}
    className="h-52 w-full -translate-y-6 object-contain"
  />
</div>
<h3 className="text-2xl font-bold">{car.name}</h3>

              

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
<section
  id="khuyen-mai"
  className="scroll-mt-28 bg-gray-100 md:scroll-mt-24"
>
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
          <div className="mb-5 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
  <img
    src={car.image}
    alt={`Ưu đãi ${car.name}`}
    className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105"
  />
</div>
          <p className="text-sm font-semibold uppercase text-red-600">
            Ưu đãi
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {car.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
  <span className="text-sm text-gray-500">Giá từ</span>
  <span className="text-xl font-bold text-red-600">
    {Math.min(...car.variants.map((variant) => variant.price)).toLocaleString(
      "vi-VN"
    )}{" "}
    đ
  </span>
</div>

          {getMaxPromotionValue(car.id) > 0 && (
  <div className="mt-4 rounded-lg bg-red-50 px-4 py-3">
    <p className="text-sm font-medium text-gray-600">
      Ưu đãi lên đến
    </p>

    <p className="mt-1 text-2xl font-bold text-red-600">
      {getMaxPromotionValue(car.id).toLocaleString("vi-VN")} đ
    </p>
  </div>
)}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`/xe/${car.slug}`}
              className="rounded bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Xem chi tiết
            </a>

            <a
  href={`/?car=${encodeURIComponent(car.name)}#bao-gia`}
  className="rounded border border-red-600 bg-white px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
>
  Nhận ưu đãi
</a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* TIN TỨC & TƯ VẤN */}
<section
  id="tin-tuc"
  className="scroll-mt-28 bg-white md:scroll-mt-24"
>
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="font-semibold uppercase tracking-wider text-red-600">
      Tin tức & Tư vấn
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Kinh nghiệm chọn mua xe Mitsubishi
    </h2>

    <p className="mt-4 max-w-2xl leading-7 text-gray-600">
      Thông tin tham khảo giúp khách hàng lựa chọn mẫu xe, phiên bản và
      phương án mua xe phù hợp với nhu cầu sử dụng.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="text-sm font-semibold uppercase text-red-600">
          Tư vấn chọn xe
        </p>

        <h3 className="mt-3 text-xl font-bold">
          Chọn Mitsubishi nào phù hợp với nhu cầu của bạn?
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Gợi ý lựa chọn dòng xe phù hợp cho gia đình, công việc và nhu cầu
          di chuyển hằng ngày.
        </p>
        <a
  href="/tu-van/chon-xe-mitsubishi-phu-hop"
  className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Đọc bài tư vấn →
</a>
      </article>

      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
  <p className="text-sm font-semibold uppercase text-red-600">
    Chi phí mua xe
  </p>

  <h3 className="mt-3 text-xl font-bold">
    Giá lăn bánh Mitsubishi gồm những khoản nào?
  </h3>

  <p className="mt-3 leading-7 text-gray-600">
    Tìm hiểu các khoản chi phí dự kiến khi đăng ký xe để chủ động
    chuẩn bị ngân sách.
  </p>

  <a
    href="/tu-van/chi-phi-lan-banh-mitsubishi"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Đọc bài tư vấn →
  </a>
</article>

      <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
  <p className="text-sm font-semibold uppercase text-red-600">
    Phiên bản & ưu đãi
  </p>

  <h3 className="mt-3 text-xl font-bold">
    Nên chọn phiên bản xe Mitsubishi như thế nào?
  </h3>

  <p className="mt-3 leading-7 text-gray-600">
    So sánh nhu cầu sử dụng, trang bị và ngân sách trước khi lựa chọn
    phiên bản phù hợp.
  </p>

  <a
    href="/tu-van/chon-phien-ban-xe-mitsubishi"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Đọc bài tư vấn →
  </a>
</article>
        </div>

    <div className="mt-10 flex justify-center">
      <a
        href="/tin-tuc"
        className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Xem tất cả Tin tức & Tư vấn →
      </a>
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
      Tư vấn Kinh doanh Mitsubishi
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
      Mitsubishi Motors Bình Dương • Tư vấn Kinh doanh: Lưu Hoàng Phúc
    </div>
  </div>
</section>
    </main>
  );
}