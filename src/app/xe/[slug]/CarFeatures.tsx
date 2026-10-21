import Image from "next/image";
import type { Car } from "@/data/cars";
import { carGalleries } from "@/data/carGalleries";
import { getCarFacts } from "@/lib/carFacts";

// Khối "Điểm nổi bật" kiểu trang xe của hãng (ảnh lớn + chữ, xen kẽ trái/phải).
// Nội dung lấy từ trang bị của phiên bản cao nhất trong cars.ts (đã đối chiếu MMV), không viết câu quảng cáo riêng.
export default function CarFeatures({ car }: { car: Car }) {
  const top = [...car.variants].sort((a, b) => b.price - a.price)[0];
  const gallery = carGalleries[car.name];
  if (!top || !gallery) return null;

  const facts = getCarFacts(car);
  const equipment = top.equipment ?? {};
  // Tiêu đề khối Tiện nghi: món màn hình (khách hay hỏi nhất), nếu có
  const screen = [...(equipment.convenience ?? []), ...(equipment.interior ?? [])].find((item) => /màn hình/i.test(item));
  const topName = top.name === car.name.replace(/^Mitsubishi /, "") ? car.name : `${car.name} ${top.name}`;

  const blocks = [
    {
      kicker: "Ngoại thất",
      title: `Khoảng sáng gầm ${facts.stats.find((stat) => stat.label === "Khoảng sáng gầm")?.value ?? ""}`,
      summary: facts.dimensions && `Kích thước dài × rộng × cao: ${facts.dimensions}.`,
      items: equipment.exterior,
      image: gallery.exterior[1] ?? gallery.exterior[0],
    },
    {
      kicker: "Nội thất",
      title: `Không gian ${facts.seats ?? ""} chỗ`.replace("  ", " "),
      summary: undefined,
      items: equipment.interior?.filter((item) => item !== screen),
      image: gallery.interior[1] ?? gallery.interior[0],
    },
    {
      kicker: "Tiện nghi & giải trí",
      title: screen ?? "Tiện nghi trên xe",
      summary: undefined,
      items: equipment.convenience?.filter((item) => item !== screen),
      image: gallery.interior[0],
    },
    {
      kicker: "Vận hành",
      title: facts.stats.find((stat) => stat.label === "Động cơ")?.value ?? "Vận hành",
      summary: facts.engine.includes(";") ? `Hộp số và dẫn động: ${facts.transmission}.` : `${facts.engine}. ${facts.transmission}.`,
      items: equipment.drivingSupport,
      image: gallery.exterior[0],
    },
    {
      kicker: "An toàn",
      title: equipment.safety?.[0] ?? "An toàn",
      summary: undefined,
      items: [...(equipment.safety?.slice(1) ?? []), ...(top.safetyTechnologies ?? []).map((tech) => `${tech.name} (${tech.code})`)],
      image: gallery.exterior[3] ?? gallery.exterior[0],
    },
  ].filter((block) => (block.items?.length ?? 0) > 0 || block.summary);

  return (
    <section id="tinh-nang" className="scroll-mt-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Điểm nổi bật</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{car.name.replace(/^Mitsubishi /, "")} có gì?</h2>
        <p className="mt-3 text-sm text-gray-600">Trang bị theo bản {topName}. Các bản khác xem mục Trang bị bên dưới.</p>

        <div className="mt-8 space-y-10 md:mt-12 md:space-y-20">
          {blocks.map((block, index) => (
            <article key={block.kicker} className="reveal grid items-center gap-5 md:grid-cols-2 md:gap-12">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100 ${index % 2 ? "md:order-2" : ""}`}>
                <Image
                  src={block.image}
                  alt={`${block.kicker} ${car.name}`}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">{block.kicker}</p>
                <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight md:text-4xl">{block.title}</h3>
                {block.summary && <p className="mt-3 leading-7 text-gray-600">{block.summary}</p>}
                {block.items && block.items.length > 0 && (
                  <ul className="mt-4 grid gap-2">
                    {block.items.slice(0, 5).map((item) => (
                      <li key={item} className="flex gap-3 leading-6 text-gray-800">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
