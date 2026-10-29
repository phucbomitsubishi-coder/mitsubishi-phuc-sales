import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import UsedCarGifts from "@/components/UsedCarGifts";
import { usedCars } from "@/data/usedCars";
import Link from "next/link";
import Image from "next/image";
import UsedCarList from "./UsedCarList";

export const metadata: Metadata = createPageMetadata({
  title: "Mua xe Mitsubishi cũ tại Bình Dương: Xpander, Xforce, Triton",
  description:
    "Thông tin xe Mitsubishi đã qua sử dụng, xe cũ đang có sẵn và tư vấn lựa chọn xe phù hợp.",
  path: "/xe-cu",
  hasOgImageFile: true,
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

            <h1 className="text-3xl font-black text-gray-900 md:text-4xl tracking-tight">
              Xe Mitsubishi đã qua sử dụng
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              Tham khảo các mẫu xe Mitsubishi đã qua sử dụng đang có sẵn.
              Thông tin từng xe sẽ được cập nhật theo tình trạng thực tế.
            </p>

            <p className="mt-3 max-w-3xl leading-7 text-gray-700">
              Đang có xe muốn bán để lên đời?{" "}
              <Link href="/thu-cu-doi-moi" className="font-semibold text-red-700 underline hover:text-red-800">
                Định giá xe cũ, thu cũ đổi mới
              </Link>
              .
            </p>

            {availableCars.length > 0 && <UsedCarGifts className="mt-8 max-w-4xl" />}

            {availableCars.length === 0 ? (
              <div className="mt-10 border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  Hiện chưa có xe được đăng bán
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
                  Danh sách xe đã qua sử dụng sẽ được cập nhật khi có xe thực tế.
                  Quý khách có thể liên hệ để được tư vấn về nguồn xe phù hợp.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={siteConfig.contact.phoneUrl}
                    className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
                  >
                    Gọi tư vấn
                  </a>

                  <a
                    href={siteConfig.contact.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-blue-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-blue-600 transition hover:bg-blue-50"
                  >
                    Liên hệ Zalo
                  </a>
                </div>
              </div>
            ) : (
              <UsedCarList
                cars={availableCars.map((car) => ({
                  id: car.id,
                  slug: car.slug,
                  name: car.name,
                  variant: car.variant,
                  modelYear: car.modelYear,
                  mileage: car.mileage,
                  color: car.color,
                  price: car.price,
                  image: car.image,
                }))}
              />
            )}
                        {soldCars.length > 0 && (
              <div className="mt-16 border-t border-gray-200 pt-10">
                <div>
                  <p className="mb-2 font-semibold uppercase tracking-wide text-gray-500">
                    Xe tham khảo
                  </p>

                  <h2 className="text-2xl font-black text-gray-900 md:text-3xl tracking-tight">
                    Xe đã bán
                  </h2>

                  <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                    Những xe dưới đây đã được bán và được lưu lại để khách hàng
                    tham khảo thông tin, phiên bản và tình trạng xe.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {soldCars.map((car) => (
                    <article
                      key={car.id}
                      className="overflow-hidden border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={car.image}
                          alt={`${car.name} ${car.modelYear}`}
                          fill
                          sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                          className="object-cover"
                        />

                        <div className="absolute left-2 top-2 bg-gray-900 px-2.5 py-1 text-xs font-bold text-white shadow sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                          ĐÃ BÁN
                        </div>
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                          {car.name}
                        </h3>

                        <div className="mt-2 grid gap-1 text-xs text-gray-600 sm:text-sm">
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
                          className="mt-3 block border border-gray-300 px-3 py-2 text-center text-xs font-black uppercase tracking-[0.18em] text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
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