import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { cars } from "@/data/cars";
import { carCards } from "@/lib/carCards";
import { stockByVariant, stockDateLabel, validStock } from "@/lib/stock";
import { financingNote, monthlyLabel } from "@/data/financing";
import { siteConfig } from "@/config/site";

// "Xe có sẵn – giao ngay" (25/10/2026, kiểu stock locator BMW/Mercedes). Dữ liệu: src/data/stock.ts (không ghi số chiếc).
// Tồn kho quá hạn (src/lib/stock.ts) thì trang chỉ còn lời mời liên hệ, không hiện danh sách cũ.
export const metadata: Metadata = createPageMetadata({
  title: "Xe Mitsubishi có sẵn giao ngay tại Moveo New City",
  description:
    "Danh sách xe Mitsubishi mới có sẵn và đang về đại lý Moveo New City (Bình Dương cũ): phiên bản, màu, giá niêm yết, trả góp tham khảo. Nhận báo giá và giữ xe nhanh.",
  path: "/xe-co-san",
});

export default function StockPage() {
  const groups = cars
    .map((car) => ({ car, card: carCards.find((item) => item.id === car.id), byVariant: stockByVariant(car.id) }))
    .filter(({ byVariant }) => Object.keys(byVariant).length > 0);

  return (
    <>
      <PageSchema metadata={metadata} path="/xe-co-san" type="CollectionPage" name="Xe Mitsubishi có sẵn" datePublished="2026-10-25" />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Giao ngay</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Xe Mitsubishi có sẵn</h1>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
              Xe mới đang có tại showroom {siteConfig.dealer.name} và xe đang trên đường về đại lý. Chọn đúng phiên bản, màu bạn thích
              rồi bấm nhận báo giá, Phúc kiểm tra và giữ xe cho bạn.
            </p>
            {validStock.length > 0 && <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-400">Cập nhật {stockDateLabel}</p>}
          </div>
        </section>

        {groups.length === 0 ? (
          <section className="mx-auto max-w-3xl px-6 py-16 text-center">
            <p className="leading-7 text-gray-700">Danh sách xe có sẵn đang được cập nhật. Gọi hoặc nhắn Zalo để Phúc kiểm tra xe, màu bạn cần ngay.</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href={siteConfig.contact.phoneUrl} className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-red-700">
                Gọi {siteConfig.sales.phoneDisplay}
              </a>
              <a href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-gray-950 px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] hover:bg-gray-950 hover:text-white">
                Nhắn Zalo
              </a>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-7xl space-y-14 px-6 py-12 md:py-16">
            {groups.map(({ car, card, byVariant }) => (
              <div key={car.id} id={car.id} className="scroll-mt-28 border-t border-gray-200 pt-10">
                <div className="grid items-center gap-6 md:grid-cols-[360px_1fr]">
                  <Link href={`/xe/${car.slug}`} className="relative block aspect-[16/7]">
                    <Image src={card?.sideImage ?? car.image} alt={car.name} fill sizes="(min-width: 768px) 360px, 90vw" className="object-contain" />
                  </Link>
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">
                      <Link href={`/xe/${car.slug}`} className="hover:text-red-700">{card?.shortName ?? car.name}</Link>
                    </h2>
                    <p className="mt-1 text-gray-700">{card?.specs}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {car.variants
                    .filter((variant) => byVariant[variant.name])
                    .map((variant) => {
                      const stock = byVariant[variant.name];
                      const year = validStock.find((item) => item.carId === car.id && item.variant === variant.name)?.year;
                      return (
                        <article key={variant.name} className="flex flex-col border border-gray-300 p-5">
                          <h3 className="text-xl font-black tracking-tight">{variant.name}</h3>
                          <p className="mt-1 text-sm text-gray-600">{year ? `Sản xuất ${year}` : null}</p>
                          <p className="mt-3 text-lg font-extrabold tabular-nums">{variant.price.toLocaleString("vi-VN")} đ</p>
                          <p className="text-sm text-gray-700">Trả góp từ {monthlyLabel(variant.price)}*</p>
                          <div className="mt-4 space-y-1 text-sm leading-6">
                            {stock.available.length > 0 && (
                              <p><span className="font-bold text-green-800">● Có sẵn:</span> {stock.available.join(", ")}</p>
                            )}
                            {stock.incoming.length > 0 && (
                              <p><span className="font-bold text-gray-800">○ Đang về:</span> {stock.incoming.join(", ")}</p>
                            )}
                          </div>
                          <Link
                            href={`/?car=${encodeURIComponent(car.name)}&variant=${encodeURIComponent(variant.name)}&nguon=Xe-co-san#bao-gia`}
                            className="mt-5 bg-red-600 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700"
                          >
                            Nhận báo giá, giữ xe
                          </Link>
                        </article>
                      );
                    })}
                </div>
              </div>
            ))}

            <div className="space-y-2 border-t border-gray-200 pt-6 text-xs leading-5 text-gray-600">
              <p>Tình trạng xe theo bảng tồn kho của đại lý ngày {stockDateLabel}, có thể thay đổi do xe đã được khách khác đặt. Phúc xác nhận lại khi báo giá.</p>
              <p>* {financingNote}</p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
