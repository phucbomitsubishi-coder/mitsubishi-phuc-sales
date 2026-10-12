import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { cars } from "@/data/cars";
import { accessoryGroups, accessoriesMonth, type AccessoryGroup } from "@/data/accessories";

export const metadata: Metadata = createPageMetadata({
  title: `Bảng giá phụ kiện xe Mitsubishi ${accessoriesMonth}: Xpander, Xforce, Destinator, Triton`,
  description:
    "Giá niêm yết phụ kiện cho Xpander, Xpander Cross, Xforce, Destinator, Triton, Attrage: lót sàn, vè che mưa, phim cách nhiệt, phủ gầm, camera hành trình và phụ kiện chính hãng MMV.",
  path: "/phu-kien-xe-mitsubishi",
});

// Dữ liệu ở src/data/accessories.ts, sinh bởi `npm run sync-accessories` từ app báo giá (chỉ giá niêm yết).
const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;
const seatLabel = (seats: number) => (seats === 5 ? "Xe 5 chỗ" : seats === 7 ? "Xe 7 chỗ" : "");

const carGroups = cars
  .map((car) => ({
    car,
    group: accessoryGroups.find((group) => group.carId === car.id),
  }))
  .filter((item): item is { car: (typeof cars)[number]; group: AccessoryGroup } => Boolean(item.group));
const generalGroups = accessoryGroups.filter((group) => !group.carId);

function AccessoryTable({ group }: { group: AccessoryGroup }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Phụ kiện</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Giá niêm yết</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {group.items.map((item) => (
            <tr key={`${item.name}-${item.seats}`}>
              <th scope="row" className="px-4 py-2.5 font-normal text-gray-800">
                {item.name.replace(/ – MMV$/, "")}
                {/ – MMV$/.test(item.name) && (
                  <span className="ml-2 rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                    Chính hãng MMV
                  </span>
                )}
                {seatLabel(item.seats) && !item.name.includes("chỗ") && (
                  <span className="ml-2 text-xs text-gray-600">{seatLabel(item.seats)}</span>
                )}
              </th>
              <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold tabular-nums">{vnd(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AccessoriesPage() {
  const total = accessoryGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/phu-kien-xe-mitsubishi"
        name="Phụ kiện xe Mitsubishi"
        type="WebPage"
        datePublished="2026-10-12"
        dateModified="2026-10-12"
      />
      <SiteHeader />

      <main className="bg-gray-50 text-gray-900">
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-500">
              Phụ kiện · Cập nhật {accessoriesMonth}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Bảng giá phụ kiện xe Mitsubishi
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Giá niêm yết {total} phụ kiện theo từng dòng xe và các nhóm dùng chung: lót sàn, vè
              che mưa, phim cách nhiệt, phủ gầm, camera, đồ trang trí. Mua kèm xe mới thường có
              chương trình tặng hoặc giảm giá phụ kiện, hãy hỏi Phúc khi nhận báo giá.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <section>
            <h2 className="text-2xl font-bold">Phụ kiện theo dòng xe</h2>
            <p className="mt-1 text-sm text-gray-600">Bấm vào dòng xe để xem bảng giá phụ kiện.</p>
            <div className="mt-4 space-y-3">
              {carGroups.map(({ car, group }) => (
                <details key={car.id} id={car.id} className="group scroll-mt-24 rounded-xl border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3 hover:bg-gray-50">
                    <div className="relative h-12 w-20 shrink-0">
                      <Image src={car.image} alt={car.name} fill sizes="80px" className="object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">
                        {car.name}
                        {car.id === "xpander" ? " / Xpander Cross" : ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        {group.items.length} phụ kiện · từ {vnd(Math.min(...group.items.map((item) => item.price)))}
                      </p>
                    </div>
                    <span aria-hidden="true" className="inline-block text-gray-600 transition group-open:rotate-180">▾</span>
                  </summary>
                  <div className="px-2 pb-3">
                    <p className="px-2 pt-1 text-sm">
                      <Link href={`/xe/${car.slug}`} className="font-semibold text-red-700 underline hover:text-red-800">
                        Xem giá xe {car.name.replace("Mitsubishi ", "")}
                      </Link>
                    </p>
                    <AccessoryTable group={group} />
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="dung-chung" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold">Phụ kiện dùng chung cho các dòng xe</h2>
            <p className="mt-1 text-sm text-gray-600">Bấm vào từng nhóm để xem giá.</p>
            <div className="mt-4 space-y-3">
              {generalGroups.map((group) => (
                <details key={group.name} className="group rounded-xl border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold hover:bg-gray-50">
                    {group.name}
                    <span className="text-sm font-normal text-gray-600">
                      {group.items.length} mục
                      <span className="ml-2 inline-block transition group-open:rotate-180">▾</span>
                    </span>
                  </summary>
                  <div className="px-2 pb-3">
                    <AccessoryTable group={group} />
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-10 text-sm leading-6 text-gray-600">
            Giá niêm yết tham khảo tháng {accessoriesMonth}, có thể thay đổi theo thời điểm và tình
            trạng hàng. Phụ kiện ghi “Chính hãng MMV” là phụ kiện của Mitsubishi Motors Việt Nam.
            Liên hệ để biết phụ kiện được tặng kèm theo chương trình mua xe hiện hành.
          </p>

          <div className="mt-8 rounded-2xl bg-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Nhận báo giá xe kèm gói phụ kiện</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Gửi Phúc dòng xe và các phụ kiện bạn quan tâm, Phúc báo giá lăn bánh trọn gói đã gồm
              phụ kiện và ưu đãi tháng.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Nhắn Zalo
              </a>
              <Link
                href="/?nguon=Phu-kien#bao-gia"
                className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Gửi yêu cầu báo giá
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
