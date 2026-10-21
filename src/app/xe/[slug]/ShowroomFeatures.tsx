import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/data/cars";
import type { Showroom, ShowroomFeature } from "@/data/showroom";
import Tabs from "@/components/Tabs";

// Khối tính năng kiểu trang sản phẩm MMV: 1 ảnh lớn có thẻ đen đè lên ("Đặc điểm nổi bật"),
// sau đó các khối ảnh + chữ xen kẽ trái/phải. Gạch đầu dòng lấy từ trang bị của phiên bản giá cao nhất.
export default function ShowroomFeatures({ car, showroom }: { car: Car; showroom: Showroom }) {
  const top = [...car.variants].sort((a, b) => b.price - a.price)[0];
  const quoteHref = `/?car=${encodeURIComponent(car.name)}&nguon=Tinh-nang-trang-xe#bao-gia`;

  const bulletsOf = (feature: ShowroomFeature) => {
    if (!feature.from || !top) return [];
    if (feature.from === "safetyTechnologies") return (top.safetyTechnologies ?? []).map((tech) => `${tech.name} (${tech.code})`);
    return top.equipment?.[feature.from] ?? [];
  };

  return (
    <section id="tinh-nang" className="scroll-mt-32 bg-white">
      {showroom.highlight && (
        <div className="mx-auto max-w-[1600px] md:px-6 md:pt-16">
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/8]">
              <Image
                src={showroom.highlight.image}
                alt={`${showroom.highlight.title} – ${car.name}`}
                fill
                sizes="(min-width: 1600px) 1600px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative -mt-10 mx-5 bg-neutral-950 p-7 text-white md:absolute md:right-10 md:top-0 md:mx-0 md:-mt-8 md:w-[420px] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">{showroom.highlight.kicker}</p>
              <h2 className="mt-6 text-3xl font-black uppercase leading-tight md:text-4xl tracking-tight">{showroom.highlight.title}</h2>
              {showroom.highlight.text && <p className="mt-4 leading-7 text-white/85">{showroom.highlight.text}</p>}
              <Link
                href={quoteHref}
                className="mt-7 block border border-white py-3.5 text-center text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-950"
              >
                Nhận báo giá
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Các tính năng dạng tab (21/10/2026, trước đây xếp dọc ~6.500px trên điện thoại); khối ẩn vẫn trong HTML */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Tính năng</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Điểm nổi bật của {car.name.replace(/^Mitsubishi /, "")}</h2>
        <div className="mt-8">
        <Tabs
          label={`Tính năng ${car.name}`}
          showNext
          tabs={showroom.features.map((feature) => {
          const bullets = bulletsOf(feature).slice(0, 5);
          return { id: feature.image.split("/").pop()?.replace(/\.\w+$/, "") ?? feature.title, label: feature.kicker, content: (
            <article className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={feature.image}
                  alt={`${feature.title} – ${car.name}`}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">{feature.title}</h3>
                {feature.text && <p className="mt-4 text-lg leading-8 text-gray-700">{feature.text}</p>}
                {bullets.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {bullets.map((item) => (
                      <li key={item} className="flex gap-3 leading-6 text-gray-800">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-4 shrink-0 bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href="#trang-bi"
                  className="mt-7 inline-block border-2 border-neutral-950 px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-neutral-950 hover:text-white"
                >
                  Xem trang bị
                </a>
              </div>
            </article>
          ) };
        })}
        />
        </div>
      </div>

      {/* PHỤ KIỆN CHÍNH HÃNG (kiểu khối "discovery" của MMV): ảnh lớn + thẻ đen bên trái */}
      {showroom.accessoriesImage && (
        <div className="mx-auto max-w-[1600px] pb-14 md:px-6 md:pb-24">
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/8]">
              <Image src={showroom.accessoriesImage} alt={`Phụ kiện chính hãng ${car.name}`} fill sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
            </div>
            <div className="relative -mt-10 mx-5 bg-neutral-950 p-7 text-white md:absolute md:bottom-10 md:left-10 md:mx-0 md:mt-0 md:w-[420px] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Phụ kiện chính hãng</p>
              <h2 className="mt-5 text-3xl font-black uppercase leading-tight md:text-4xl tracking-tight">Phụ kiện cho {car.name.replace(/^Mitsubishi /, "")}</h2>
              <p className="mt-4 leading-7 text-white/85">Bảng phụ kiện theo dòng xe: camera hành trình, màn hình, lót sàn, trang trí. Phụ kiện chính hãng MMV có giá niêm yết.</p>
              <Link
                href={`/phu-kien-xe-mitsubishi#${car.id}`}
                className="mt-7 block border border-white py-3.5 text-center text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-950"
              >
                Xem bảng phụ kiện
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
