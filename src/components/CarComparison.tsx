import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Car } from "@/data/cars";
import type { CompetitorCar } from "@/data/competitors";
import { currentPromotion } from "@/data/promotions";
import { provinces, defaultProvinceId } from "@/data/registrationFees";
import { calculateOnRoadPrice } from "@/lib/onRoadPrice";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

// Khung giao diện dùng chung cho các bài so sánh /tu-van/so-sanh-...
// Phần nhận xét viết riêng trong từng trang, phần bảng giá, thông số, nguồn dùng các khối ở đây.

const province =
  provinces.find((item) => item.id === defaultProvinceId) ?? provinces[0];

const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;

type PriceRow = {
  name: string;
  price: number;
  onRoadPrice: number;
  promotionValue?: number;
};

// Giá niêm yết, ưu đãi tháng và giá lăn bánh TP.HCM của từng phiên bản xe Mitsubishi
export function getCarPriceRows(car: Car): PriceRow[] {
  const promotion = currentPromotion.cars.find((item) => item.carId === car.id);

  return car.variants.map((variant) => ({
    name: variant.name,
    price: variant.price,
    promotionValue:
      promotion?.variants
        .find((item) => item.variantName === variant.name)
        ?.benefits.reduce((sum, benefit) => sum + (benefit.value ?? 0), 0) ?? 0,
    onRoadPrice: calculateOnRoadPrice({
      carName: car.name,
      price: variant.price,
      seats: variant.specifications?.seats,
      province,
    }).onRoadPrice,
  }));
}

// Xe đối thủ tính lăn bánh theo cùng công thức để so sánh công bằng (không gồm ưu đãi đại lý)
function getCompetitorPriceRows(competitor: CompetitorCar): PriceRow[] {
  return competitor.variants.map((variant) => ({
    ...variant,
    onRoadPrice: calculateOnRoadPrice({
      carName: competitor.name,
      price: variant.price,
      seats: competitor.seats,
      isPickup: competitor.isPickup,
      province,
    }).onRoadPrice,
  }));
}

export function ComparisonHero({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
          Tư vấn chọn xe · Cập nhật {promotionMonthLabel}
        </p>

        <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
          {children}
        </p>
      </div>
    </section>
  );
}

export function QuickSummary({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-xl font-bold">Tóm tắt nhanh</h2>
      <ul className="mt-4 space-y-2 leading-7 text-gray-700">{children}</ul>
    </section>
  );
}

function PriceTable({
  caption,
  rows,
  highlight,
}: {
  caption: string;
  rows: PriceRow[];
  highlight?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[320px] text-left text-sm">
        <caption
          className={`${highlight ? "bg-red-50" : "bg-gray-100"} px-4 py-3 text-left font-bold text-gray-900`}
        >
          {caption}
        </caption>
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-2 font-semibold">Phiên bản</th>
            <th scope="col" className="px-4 py-2 text-right font-semibold">Niêm yết</th>
            <th scope="col" className="px-4 py-2 text-right font-semibold">Lăn bánh</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" className="px-4 py-2.5 font-semibold">
                {row.name}
                {(row.promotionValue ?? 0) > 0 && (
                  <span className="block text-xs font-normal text-red-700">
                    Ưu đãi {formatMillion(row.promotionValue ?? 0)}
                  </span>
                )}
              </th>
              <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.price)}</td>
              <td className="px-4 py-2.5 text-right tabular-nums">{vnd(row.onRoadPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PriceComparison({
  heading,
  car,
  competitor,
}: {
  heading: string;
  car: Car;
  competitor: CompetitorCar;
}) {
  const shortName = car.name.replace("Mitsubishi ", "");
  const competitorShortName = competitor.name.split(" ").slice(1).join(" ");

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-3 leading-7 text-gray-700">
        Giá lăn bánh tạm tính cho xe đăng ký tại TP. Hồ Chí Minh (gồm cả Bình Dương cũ),
        dùng cùng một cách tính cho cả hai xe
        {competitor.isPickup ? " (bán tải tính 60% lệ phí trước bạ)" : ""}.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <PriceTable caption={car.name} rows={getCarPriceRows(car)} highlight />
        <PriceTable caption={competitor.name} rows={getCompetitorPriceRows(competitor)} />
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        Giá {shortName} và ưu đãi theo chương trình của Mitsubishi Motors Việt Nam tháng{" "}
        {promotionMonthLabel}. Giá {competitorShortName} là giá niêm yết tham khảo tháng{" "}
        {competitor.updated}
        {competitor.priceNote ? ` (${competitor.priceNote})` : ""}, chưa gồm ưu đãi của
        đại lý. Ưu đãi có thể là hỗ trợ lệ phí trước bạ hoặc quà tặng, không phải tiền mặt.
        Xem giá các mẫu Mitsubishi khác tại{" "}
        <Link href="/bang-gia-xe-mitsubishi" className="font-semibold text-red-700 underline">
          bảng giá xe Mitsubishi
        </Link>
        .
      </p>
    </section>
  );
}

export type SpecRow = { label: string; car: ReactNode; competitor: ReactNode };

export function SpecTable({
  carName,
  competitorName,
  rows,
}: {
  carName: string;
  competitorName: string;
  rows: SpecRow[];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Thông số</th>
            <th scope="col" className="px-4 py-3 font-semibold">{carName}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{competitorName}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows
            .filter((row) => row.car && row.competitor)
            .map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-4 py-3 font-semibold text-gray-700">
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.car}</td>
                <td className="px-4 py-3">{row.competitor}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

// Hai khung danh sách đặt cạnh nhau: trang bị từng xe, hoặc "Chọn xe A / xe B nếu bạn"
export function TwoColumnLists({
  left,
  right,
  emphasizeLeft = false,
}: {
  left: { title: string; items: ReactNode[] };
  right: { title: string; items: ReactNode[] };
  emphasizeLeft?: boolean;
}) {
  const listClass = emphasizeLeft
    ? "mt-3 list-disc space-y-1.5 pl-5 leading-7 text-gray-700"
    : "mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-700";

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {[left, right].map((column, index) => {
        const isEmphasized = emphasizeLeft && index === 0;
        return (
          <div
            key={column.title}
            className={`rounded-xl p-5 ${
              isEmphasized
                ? "border-2 border-red-600"
                : emphasizeLeft
                  ? "border border-gray-300"
                  : "border border-gray-200"
            }`}
          >
            <h3 className={`font-bold ${isEmphasized ? "text-red-700" : ""}`}>
              {column.title}
            </h3>
            <ul className={listClass}>
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ComparisonCta({ car, source }: { car: Car; source: string }) {
  const shortName = car.name.replace("Mitsubishi ", "");

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href={`/dang-ky-lai-thu?xe=${car.id}&nguon=${source}`}
        className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
      >
        Đăng ký lái thử {shortName}
      </Link>
      <Link
        href={`/?car=${encodeURIComponent(car.name)}&nguon=${source}#bao-gia`}
        className="rounded-lg border border-gray-300 px-6 py-3 font-bold text-gray-900 transition hover:border-red-600 hover:text-red-700"
      >
        Nhận báo giá {shortName}
      </Link>
    </div>
  );
}

export function CarLinkCard({ car }: { car: Car }) {
  return (
    <section className="mt-12 grid items-center gap-6 rounded-2xl bg-gray-50 p-6 md:grid-cols-[240px_1fr]">
      <div className="relative h-36">
        <Image src={car.image} alt={car.name} fill sizes="240px" className="object-contain" />
      </div>
      <div>
        <h2 className="text-xl font-bold">Xem chi tiết {car.name}</h2>
        <p className="mt-2 leading-7 text-gray-700">
          Thông số đầy đủ, màu xe, hình ảnh và công cụ tính giá lăn bánh theo 34 tỉnh,
          thành.
        </p>
        <Link
          href={`/xe/${car.slug}`}
          className="mt-3 inline-block font-semibold text-red-700 underline"
        >
          Đến trang {car.name} →
        </Link>
      </div>
    </section>
  );
}

export function ComparisonSources({ car, competitor }: { car: Car; competitor: CompetitorCar }) {
  return (
    <section className="mt-12 border-t border-gray-200 pt-6">
      <h2 className="text-base font-bold">Nguồn số liệu {competitor.name}</h2>
      <ul className="mt-2 space-y-1 text-sm text-gray-600">
        {competitor.sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline hover:text-red-700"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-gray-600">
        Thông số {car.name} theo công bố của Mitsubishi Motors Việt Nam. Thông số và giá có
        thể thay đổi, vui lòng liên hệ để được xác nhận.
      </p>
    </section>
  );
}
