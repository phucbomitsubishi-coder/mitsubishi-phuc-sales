import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { cars } from "@/data/cars";
import { accessoryGroups, accessoriesMonth, type AccessoryGroup, type AccessoryItem } from "@/data/accessories";
import { categorizeGroup } from "@/lib/accessoryCategories";
import { featuredImages } from "@/lib/carCards";
import OpenDetailsFromHash from "@/components/OpenDetailsFromHash";

export const metadata: Metadata = createPageMetadata({
  title: `Bảng giá phụ kiện xe Mitsubishi ${accessoriesMonth}: Xpander, Xforce, Destinator, Triton`,
  description:
    "Phụ kiện cho Xpander, Xpander Cross, Xforce, Destinator, Triton, Attrage: lót sàn, vè che mưa, phim cách nhiệt, phủ gầm, camera hành trình. Giá niêm yết phụ kiện chính hãng MMV, các món khác liên hệ để nhận giá theo gói.",
  path: "/phu-kien-xe-mitsubishi",
});

// Dữ liệu ở src/data/accessories.ts, sinh bởi `npm run sync-accessories` từ app báo giá (chỉ giá niêm yết).
const vnd = (value: number) => `${value.toLocaleString("vi-VN")} đ`;
const zaloUrl = siteConfig.contact.zaloUrl;
// Giá trong app báo giá đã gồm VAT 8%; trang MMV công bố giá chưa VAT (= giá ÷ 1,08)
const VAT_RATE = 0.08;
const withoutVat = (price: number) => Math.round(price / (1 + VAT_RATE) / 1000) * 1000;

// Giá thấp nhất trong các món có giá (chỉ phụ kiện chính hãng MMV có giá)
function minPrice(group: AccessoryGroup) {
  const prices = group.items.map((item) => item.price).filter((price): price is number => price !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}
const seatLabel = (seats: number) => (seats === 5 ? "Xe 5 chỗ" : seats === 7 ? "Xe 7 chỗ" : "");

const carGroups = cars
  .map((car) => ({
    car,
    group: accessoryGroups.find((group) => group.carId === car.id),
  }))
  .filter((item): item is { car: (typeof cars)[number]; group: AccessoryGroup } => Boolean(item.group));
const generalGroups = accessoryGroups.filter((group) => !group.carId);

function AccessoryTable({ items }: { items: AccessoryItem[] }) {
  const hasPrice = items.some((item) => item.price !== null);
  return (
    <div className="mt-2 overflow-x-auto border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-3 py-3 font-semibold sm:px-4">Phụ kiện</th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">{hasPrice ? "Giá (gồm VAT)" : "Giá"}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={`${item.name}-${item.seats}`}>
              <th scope="row" className="px-3 py-2.5 font-normal text-gray-800 sm:px-4">
                {item.name.replace(/ – MMV$/, "")}
                {/ – MMV$/.test(item.name) && (
                  <span className="mt-1 block w-fit whitespace-nowrap rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                    Chính hãng MMV
                  </span>
                )}
                {seatLabel(item.seats) && !item.name.includes("chỗ") && (
                  <span className="ml-2 text-xs text-gray-600">{seatLabel(item.seats)}</span>
                )}
              </th>
              <td className="whitespace-nowrap px-3 py-2.5 text-right font-semibold tabular-nums sm:px-4">
                {item.price !== null ? (
                  <>
                    {vnd(item.price)}
                    <span className="block text-xs font-normal text-gray-600">MMV chưa VAT: {vnd(withoutVat(item.price))}</span>
                  </>
                ) : (
                  <span className="font-normal text-gray-600">Liên hệ</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Mỗi nhóm chia thành các loại nhỏ, bấm từng loại mới xổ bảng giá (nhóm chính hãng MMV mở sẵn)
function CategoryList({ group }: { group: AccessoryGroup }) {
  return (
    <div className="mt-3 space-y-2">
      {categorizeGroup(group).map((category) => (
        <details
          key={category.name}
          open={category.name.includes("MMV")}
          className="group/cat overflow-hidden border border-gray-200 border-l-4 border-l-red-600 bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 font-bold text-gray-900 transition hover:bg-red-50 group-open/cat:bg-red-50 group-open/cat:text-red-700">
            <span>{category.name}</span>
            <span className="shrink-0 text-sm font-semibold text-gray-700">
              <span className="bg-gray-100 px-2 py-0.5">{category.items.length} mục</span>
              <span className="ml-2 inline-block transition group-open/cat:rotate-180">▾</span>
            </span>
          </summary>
          <div className="pb-1 sm:px-2 sm:pb-2">
            <AccessoryTable items={category.items} />
          </div>
        </details>
      ))}
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
      <OpenDetailsFromHash />

      <main className="bg-gray-50 text-gray-900">
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Phụ kiện · Cập nhật {accessoriesMonth}
            </p>
            <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl tracking-tight">
              Bảng giá phụ kiện xe Mitsubishi
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              {total} phụ kiện theo từng dòng xe và các nhóm dùng chung: lót sàn, vè che mưa, phim
              cách nhiệt, phủ gầm, camera, đồ trang trí. Phụ kiện chính hãng MMV có giá niêm yết;
              các món khác giá thay đổi theo gói và khi mua kèm xe, nhắn Phúc để nhận giá tốt.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <section>
            <h2 className="text-2xl font-black tracking-tight">Phụ kiện theo dòng xe</h2>
            <p className="mt-1 text-sm text-gray-600">Bấm vào dòng xe để xem bảng giá phụ kiện.</p>
            <div className="mt-4 space-y-3">
              {carGroups.map(({ car, group }) => (
                <details key={car.id} id={car.id} className="group scroll-mt-24 border-2 border-gray-200 bg-white shadow-sm transition open:border-red-600">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3 hover:bg-gray-50">
                    <div className="relative h-12 w-20 shrink-0">
                      <Image src={featuredImages[car.id] ?? car.image} alt={car.name} fill sizes="80px" className="object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-gray-900 group-open:text-red-700">
                        {car.name}
                        {car.id === "xpander" ? " / Xpander Cross" : ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        {group.items.length} phụ kiện
                        {minPrice(group) !== null && ` · chính hãng MMV từ ${vnd(minPrice(group)!)}`}
                      </p>
                    </div>
                    <span aria-hidden="true" className="inline-block text-gray-600 transition group-open:rotate-180">▾</span>
                  </summary>
                  <div className="px-1.5 pb-3 sm:px-2">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-2 pt-1 text-sm">
                      <a
                        href={zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-blue-600 px-3 py-1.5 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Hỏi giá phụ kiện qua Zalo
                      </a>
                      <Link href={`/xe/${car.slug}`} className="font-semibold text-red-700 underline hover:text-red-800">
                        Xem giá xe {car.name.replace("Mitsubishi ", "")}
                      </Link>
                    </div>
                    <CategoryList group={group} />
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="dung-chung" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-black tracking-tight">Phụ kiện dùng chung cho các dòng xe</h2>
            <p className="mt-1 text-sm text-gray-600">Bấm vào từng nhóm để xem danh sách, nhắn Zalo để nhận giá.</p>
            <div className="mt-4 space-y-3">
              {generalGroups.map((group) => (
                <details key={group.name} className="group border-2 border-gray-200 bg-white shadow-sm transition open:border-red-600">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 group-open:text-red-700">
                    {group.name}
                    <span className="shrink-0 text-sm font-semibold text-gray-700">
                      {group.items.length} mục
                      <span className="ml-2 inline-block transition group-open:rotate-180">▾</span>
                    </span>
                  </summary>
                  <div className="px-1.5 pb-3 sm:px-2">
                    <CategoryList group={group} />
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-10 text-sm leading-6 text-gray-600">
            Giá phụ kiện chính hãng MMV tham khảo tháng {accessoriesMonth}, đã gồm VAT 8% (trang của
            Mitsubishi Motors Việt Nam công bố giá bán lẻ chưa gồm VAT), có thể thay đổi theo thời
            điểm và tình trạng hàng. Phụ kiện ghi “Chính hãng MMV” là phụ kiện của
            Mitsubishi Motors Việt Nam. Các món ghi “Liên hệ” có giá theo gói và chương trình mua
            xe hiện hành.
          </p>

          <div className="mt-8 bg-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-black tracking-tight">Nhận báo giá xe kèm gói phụ kiện</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Gửi Phúc dòng xe và các phụ kiện bạn quan tâm, Phúc báo giá lăn bánh trọn gói đã gồm
              phụ kiện và ưu đãi tháng.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-blue-700"
              >
                Nhắn Zalo
              </a>
              <Link
                href="/?nguon=Phu-kien#bao-gia"
                className="rounded bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
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
