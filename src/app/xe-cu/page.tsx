import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import { usedCars } from "@/data/usedCars";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "Xe Mitsubishi đã qua sử dụng | Lưu Hoàng Phúc",
  description:
    "Thông tin xe Mitsubishi đã qua sử dụng, xe cũ đang có sẵn và tư vấn lựa chọn xe phù hợp.",
  path: "/xe-cu",
});

export default function UsedCarsPage() {
  const availableCars = usedCars.filter(
    (car) => car.status === "available"
  );
  const soldCars = usedCars.filter(
  (car) => car.status === "sold"
);

  return (
    <>
      <SiteHeader />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <div>
            <p className="mb-2 font-semibold uppercase tracking-wide text-red-600">
              Xe đã qua sử dụng
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Xe Mitsubishi đã qua sử dụng
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              Tham khảo các mẫu xe Mitsubishi đã qua sử dụng đang có sẵn.
              Thông tin từng xe sẽ được cập nhật theo tình trạng thực tế.
            </p>

            {availableCars.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
                <h2 className="text-xl font-bold text-gray-900">
                  Hiện chưa có xe được đăng bán
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                  Danh sách xe đã qua sử dụng sẽ được cập nhật khi có xe thực tế.
                  Quý khách có thể liên hệ để được tư vấn về nguồn xe phù hợp.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={siteConfig.contact.phoneUrl}
                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    Gọi tư vấn
                  </a>

                  <a
                    href={siteConfig.contact.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Liên hệ Zalo
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableCars.map((car, index) => (
  <article
    key={car.id}
    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <Image
        src={car.image}
        alt={`${car.name} ${car.modelYear}`}
        fill
        // 3 xe đầu nằm ngay đầu trang: tải ngay thay vì lazy để ảnh hiện nhanh hơn (LCP)
        loading={index < 3 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>

    <div className="p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        Xe đã qua sử dụng
      </p>

      <h2 className="mt-2 text-xl font-bold text-gray-900">
        {car.name}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-gray-900">Năm:</span>{" "}
          {car.modelYear}
        </p>

        <p>
          <span className="font-semibold text-gray-900">ODO:</span>{" "}
          {car.mileage.toLocaleString("vi-VN")} km
        </p>

        <p>
          <span className="font-semibold text-gray-900">Phiên bản:</span>{" "}
          {car.variant}
        </p>

        <p>
          <span className="font-semibold text-gray-900">Màu:</span>{" "}
          {car.color}
        </p>
      </div>

      <p className="mt-5 text-2xl font-bold text-red-600">
        {car.price.toLocaleString("vi-VN")} đ
      </p>

      <Link
        href={`/xe-cu/${car.slug}`}
        className="mt-5 block rounded-xl bg-gray-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-600"
      >
        Xem chi tiết
      </Link>
    </div>
  </article>
))}
              </div>
            )}
                        {soldCars.length > 0 && (
              <div className="mt-16 border-t border-gray-200 pt-10">
                <div>
                  <p className="mb-2 font-semibold uppercase tracking-wide text-gray-500">
                    Xe tham khảo
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Xe đã bán
                  </h2>

                  <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                    Những xe dưới đây đã được bán và được lưu lại để khách hàng
                    tham khảo thông tin, phiên bản và tình trạng xe.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {soldCars.map((car) => (
                    <article
                      key={car.id}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={car.image}
                          alt={`${car.name} ${car.modelYear}`}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />

                        <div className="absolute left-4 top-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white shadow">
                          ĐÃ BÁN
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {car.name}
                        </h3>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                          <p>
                            <span className="font-semibold text-gray-900">
                              Năm:
                            </span>{" "}
                            {car.modelYear}
                          </p>

                          <p>
                            <span className="font-semibold text-gray-900">
                              ODO:
                            </span>{" "}
                            {car.mileage.toLocaleString("vi-VN")} km
                          </p>

                          <p>
                            <span className="font-semibold text-gray-900">
                              Phiên bản:
                            </span>{" "}
                            {car.variant}
                          </p>

                          <p>
                            <span className="font-semibold text-gray-900">
                              Màu:
                            </span>{" "}
                            {car.color}
                          </p>
                        </div>

                        <Link
                          href={`/xe-cu/${car.slug}`}
                          className="mt-5 block rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                        >
                          Xem xe đã bán
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}