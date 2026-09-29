import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import BackToPrevious from "@/components/BackToPrevious";
import UsedCarGallery from "@/components/UsedCarGallery";
import { usedCars } from "@/data/usedCars";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return usedCars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const car = usedCars.find((item) => item.slug === slug);

  if (!car) {
    return {
      title: "Không tìm thấy xe | Lưu Hoàng Phúc",
    };
  }

  return {
    title: `${car.name} ${car.modelYear} đã qua sử dụng | Lưu Hoàng Phúc`,
    description: `${car.name} ${car.modelYear}, ${car.mileage.toLocaleString(
      "vi-VN"
    )} km, giá ${car.price.toLocaleString("vi-VN")} đồng.`,
  };
}

export default async function UsedCarDetailPage({ params }: Props) {
  const { slug } = await params;

  const car = usedCars.find((item) => item.slug === slug);

  if (!car) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <BackToPrevious />

          <div className="grid gap-8 lg:grid-cols-2">
            <UsedCarGallery
  images={car.images}
  carName={`${car.name} ${car.modelYear}`}
/>

            <div>
              <p className="font-semibold uppercase tracking-wide text-red-600">
                Xe đã qua sử dụng
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                {car.name} {car.modelYear}
              </h1>

              <p className="mt-4 text-3xl font-bold text-red-600">
                {car.price.toLocaleString("vi-VN")} đ
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Info label="Năm sản xuất" value={String(car.modelYear)} />
                <Info label="Đăng ký lần đầu" value={car.firstRegistration} />
                <Info label="Số đời chủ" value={car.owners} />
                <Info
                  label="Số km đã đi"
                  value={`${car.mileage.toLocaleString("vi-VN")} km`}
                />
                <Info label="Phiên bản" value={car.variant} />
                <Info label="Màu xe" value={car.color} />
                <Info label="Hộp số" value={car.transmission} />
                <Info label="Nhiên liệu" value={car.fuel} />
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
  <h2 className="text-xl font-bold text-gray-900">
    Thông tin xe
  </h2>

  <p className="mt-3 leading-7 text-gray-600">
    {car.description}
  </p>

  <div className="mt-6 border-t border-gray-200 pt-5">
    <p className="font-semibold text-gray-900">
      Lịch sử bảo dưỡng
    </p>

    <p className="mt-2 text-gray-600">
      {car.serviceHistory}
    </p>
  </div>

  <div className="mt-5 border-t border-gray-200 pt-5">
    <p className="font-semibold text-gray-900">
      Trang bị theo xe
    </p>

    <div className="mt-3 flex flex-wrap gap-2">
      {car.equipment.map((item) => (
        <span
          key={item}
          className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
</div>

              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
  <h2 className="text-xl font-bold text-gray-900">
    Cam kết xe
  </h2>

  <div className="mt-4 space-y-3">
    {car.commitments.map((commitment) => (
      <div
        key={commitment}
        className="flex items-start gap-3"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
          ✓
        </span>

        <p className="leading-6 text-gray-700">
          {commitment}
        </p>
      </div>
    ))}
  </div>
</div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:0858678929"
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Gọi tư vấn xe này
                </a>

                <a
                  href="https://zalo.me/0858678929"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Hỏi xe qua Zalo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-bold text-gray-900">{value}</p>
    </div>
  );
}