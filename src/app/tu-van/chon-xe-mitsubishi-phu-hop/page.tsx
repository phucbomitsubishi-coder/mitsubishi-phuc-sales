import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { getCarBySlug } from "@/data/cars";
import { getCarPriceRows } from "@/components/CarComparison";
import { formatMillion, promotionMonthLabel } from "@/lib/promotionItems";

export const metadata: Metadata = createPageMetadata({
  title: "Nên mua xe Mitsubishi nào? Chọn xe theo nhu cầu và ngân sách | Lưu Hoàng Phúc",
  description:
    "Gợi ý chọn xe Mitsubishi theo nhu cầu: đi phố, gia đình 7 chỗ, chạy dịch vụ hay chở hàng. Bảng giá niêm yết, giá lăn bánh TP.HCM và khác biệt trang bị giữa các phiên bản.",
  path: "/tu-van/chon-xe-mitsubishi-phu-hop",
  hasOgImageFile: true,
});

// Thông số và trang bị đã đối chiếu với mitsubishi-motors.com.vn (10/2026).
// Giá niêm yết và lăn bánh lấy tự động từ cars.ts nên tự cập nhật khi đổi giá.
const needs = [
  {
    slug: "mitsubishi-attrage",
    need: "Đi lại hằng ngày, chạy dịch vụ, ngân sách dưới 500 triệu",
    compare: { href: "/tu-van/so-sanh-attrage-va-toyota-vios", label: "So sánh Attrage và Toyota Vios" },
    heading: "Ngân sách thấp, đi lại hằng ngày hoặc chạy dịch vụ: Attrage",
    facts: [
      "Sedan 5 chỗ, động cơ 1.2L 3 xi-lanh (78 PS), tiêu hao nhiên liệu kết hợp 5,30 lít/100 km (MT) và 5,59 lít/100 km (CVT Premium) theo công bố của hãng.",
      "Cả hai phiên bản đều có 2 túi khí và camera lùi.",
      "Bản CVT Premium có thêm đèn Bi-LED, chìa khóa thông minh, kiểm soát hành trình (Cruise Control), cân bằng điện tử và hỗ trợ khởi hành ngang dốc.",
    ],
    tip: "Chạy dịch vụ, đi đường trường nhiều: bản MT có chi phí mua thấp. Đi phố nhiều, kẹt xe thường xuyên: bản CVT Premium đỡ mỏi chân hơn.",
  },
  {
    slug: "mitsubishi-xpander",
    need: "Gia đình 7 chỗ, ngân sách khoảng 570–700 triệu",
    compare: { href: "/tu-van/so-sanh-xpander-va-veloz-cross", label: "So sánh Xpander và Toyota Veloz Cross" },
    heading: "Gia đình cần 7 chỗ, ưu tiên chi phí hợp lý: Xpander",
    facts: [
      "MPV 7 chỗ dài 4.595 mm, khoảng sáng gầm 225 mm, động cơ xăng 1.5L (105 PS), có bản số sàn và tự động 4 cấp.",
      "Bản AT Premium có 6 túi khí, kiểm soát vào cua chủ động (AYC), kiểm soát hành trình, phanh tay điện tử và màn hình 10 inch.",
      "Bản MT và AT có 2 túi khí; bản MT không có camera lùi.",
    ],
    tip: "Chạy dịch vụ: bản MT. Xe gia đình thường chở trẻ nhỏ, người lớn tuổi: nên chọn AT Premium vì có 6 túi khí.",
  },
  {
    slug: "mitsubishi-xpander-cross",
    need: "7 chỗ, thích kiểu dáng gầm cao như SUV",
    compare: { href: "/tu-van/so-sanh-xpander-va-veloz-cross", label: "So sánh Xpander và Toyota Veloz Cross" },
    heading: "7 chỗ nhưng thích dáng SUV: Xpander Cross",
    facts: [
      "Dùng chung động cơ 1.5L và hộp số tự động 4 cấp với Xpander, nhưng thân xe rộng hơn (1.790 mm) và ngoại thất kiểu SUV.",
      "Một phiên bản duy nhất, có 6 túi khí, AYC, kiểm soát hành trình, màn hình 10 inch, ghế da và mâm 17 inch.",
    ],
    tip: "Phù hợp khi muốn đủ trang bị như Xpander AT Premium nhưng thích kiểu dáng mạnh mẽ hơn.",
  },
  {
    slug: "mitsubishi-xforce",
    need: "SUV 5 chỗ đi phố, gia đình trẻ",
    compare: { href: "/tu-van/so-sanh-xforce-va-creta", label: "So sánh Xforce và Hyundai Creta" },
    heading: "SUV 5 chỗ đi phố, gia đình trẻ: Xforce",
    facts: [
      "Khoảng sáng gầm 219–222 mm, động cơ 1.5L (105 PS), hộp số CVT. Cả 3 phiên bản đều có kiểm soát vào cua chủ động AYC.",
      "GLX có 4 túi khí. Luxury và Ultimate có 6 túi khí; Luxury có thêm Cruise Control, cảnh báo điểm mù và cảnh báo phương tiện cắt ngang khi lùi.",
      "Ultimate có gói Diamond Sense (kiểm soát hành trình thích ứng, cảnh báo va chạm phía trước...), camera 360 độ và âm thanh Yamaha 8 loa.",
    ],
    tip: "Bản Luxury là điểm cân bằng giữa giá và trang bị an toàn. Hay đi cao tốc thì đáng cân nhắc lên Ultimate.",
  },
  {
    slug: "mitsubishi-destinator",
    need: "SUV 7 chỗ, cần động cơ mạnh và nhiều công nghệ an toàn",
    heading: "SUV 7 chỗ, động cơ mạnh hơn: Destinator",
    facts: [
      "Động cơ xăng 1.5L tăng áp (163 PS, 250 Nm), hộp số CVT, khoảng sáng gầm 214 mm, 7 chỗ.",
      "Cả 2 phiên bản đều có 6 túi khí, cảnh báo điểm mù và cảnh báo phương tiện cắt ngang khi lùi.",
      "Ultimate có thêm kiểm soát hành trình thích ứng, cảnh báo va chạm phía trước, cảnh báo lệch làn, camera 360 độ và âm thanh Yamaha 8 loa.",
    ],
    tip: "Hợp với gia đình thường đi xa, chở đủ người và hành lý, cần xe vượt tốt trên cao tốc.",
  },
  {
    slug: "mitsubishi-triton",
    need: "Chở hàng, đi công trình, đường xấu",
    compare: { href: "/tu-van/so-sanh-triton-va-ford-ranger", label: "So sánh Triton và Ford Ranger" },
    heading: "Chở hàng, đi công trình, đường xấu: Triton",
    facts: [
      "Máy dầu 2.4L (184 PS, 430 Nm), hộp số tự động 6 cấp. Bản Athlete dùng máy Bi-Turbo 204 PS, 470 Nm.",
      "Bản GLX một cầu có 3 túi khí; các bản Premium và Athlete có 7 túi khí. Bản 4WD có Super Select 4WD-II và khóa vi sai cầu sau.",
      "Là xe bán tải nên lệ phí trước bạ chỉ bằng 60% xe con, giá lăn bánh thấp hơn đáng kể so với SUV cùng giá niêm yết.",
    ],
    tip: "Chủ yếu chạy đường nhựa, chở hàng: bản 2WD là đủ. Thường đi đường đất, đồi dốc, vùng ngập: chọn bản 4WD.",
  },
];

export default function MitsubishiBuyingGuidePage() {
  const rows = needs.flatMap((item) => {
    const car = getCarBySlug(item.slug);
    if (!car) return [];
    const prices = getCarPriceRows(car);
    const cheapest = prices.reduce((min, row) => (row.price < min.price ? row : min), prices[0]);
    return [{ ...item, car, cheapest }];
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <PageSchema
        metadata={metadata}
        path="/tu-van/chon-xe-mitsubishi-phu-hop"
        parents={[{ name: "Tư vấn", path: "/tu-van" }]}
        name="Chọn xe Mitsubishi phù hợp"
        datePublished="2026-09-29"
        dateModified="2026-10-07"
        hasOgImage
      />
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <Link
          href="/tu-van"
          className="font-semibold text-red-700 transition hover:text-red-800"
        >
          ← Tư vấn chọn xe
        </Link>

        <p className="mt-8 font-semibold uppercase tracking-wider text-red-700">
          Tư vấn chọn xe · Cập nhật {promotionMonthLabel}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Nên mua xe Mitsubishi nào? Chọn xe theo nhu cầu và ngân sách
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          Mitsubishi đang bán 6 dòng xe, từ sedan giá dưới 400 triệu đến bán tải
          gần 1 tỷ đồng. Để chọn nhanh, bạn chỉ cần trả lời 3 câu hỏi: thường chở
          bao nhiêu người, hay đi loại đường nào, và tổng số tiền lăn bánh có thể
          chuẩn bị là bao nhiêu.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold md:text-3xl">Chọn nhanh theo nhu cầu</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Giá lăn bánh tạm tính cho xe đăng ký tại TP. Hồ Chí Minh (gồm cả Bình
            Dương cũ), chưa trừ ưu đãi tháng {promotionMonthLabel}.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Nhu cầu</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Xe gợi ý</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Lăn bánh từ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.slug}>
                    <td className="px-4 py-3 text-gray-700">{row.need}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/xe/${row.car.slug}`}
                        className="font-semibold text-red-700 underline hover:text-red-800"
                      >
                        {row.car.name.replace("Mitsubishi ", "")}
                      </Link>
                      <span className="mt-1 block text-xs text-gray-600">
                        Giá từ {formatMillion(row.cheapest.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatMillion(row.cheapest.onRoadPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {rows.map((row, index) => (
          <section key={row.slug} className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {index + 1}. {row.heading}
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 leading-8 text-gray-700">
              {row.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>

            <p className="mt-4 rounded-xl bg-gray-50 p-4 leading-7 text-gray-700">
              <span className="font-semibold text-gray-900">Nên chọn bản nào: </span>
              {row.tip}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={`/xe/${row.car.slug}`}
                className="font-semibold text-red-700 transition hover:text-red-800"
              >
                Giá và thông số {row.car.name} →
              </Link>
              {row.compare && (
                <Link
                  href={row.compare.href}
                  className="font-semibold text-red-700 transition hover:text-red-800"
                >
                  {row.compare.label} →
                </Link>
              )}
            </div>
          </section>
        ))}

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">Kinh nghiệm trước khi quyết định</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-gray-700">
            <Tip title="Tính theo giá lăn bánh, không theo giá niêm yết.">
              Lăn bánh còn gồm lệ phí trước bạ, biển số, đăng kiểm, phí đường bộ và bảo
              hiểm. Bạn có thể tự tính tại{" "}
              <InlineLink href="/du-toan/gia-lan-banh">công cụ tính giá lăn bánh</InlineLink>{" "}
              và xem ưu đãi tháng này ở{" "}
              <InlineLink href="/bang-gia-xe-mitsubishi">bảng giá xe Mitsubishi</InlineLink>.
            </Tip>
            <Tip title="Đếm số người thật sự đi thường xuyên.">
              Nếu chỉ thỉnh thoảng chở 6–7 người, một chiếc SUV 5 chỗ có thể đã đủ và
              gọn hơn khi đi phố. Nếu tuần nào cũng chở đủ gia đình, nên chọn xe 7 chỗ.
            </Tip>
            <Tip title="Hay đi đường ngập, đường quê thì ưu tiên gầm cao.">
              Xpander, Xpander Cross (225 mm) và Xforce (219–222 mm) có khoảng sáng gầm
              cao trong nhóm xe đô thị; Attrage là sedan nên gầm thấp hơn (170 mm).
            </Tip>
            <Tip title="Mua trả góp thì tính cả khoản trả hằng tháng.">
              Thử các mức trả trước khác nhau tại{" "}
              <InlineLink href="/du-toan/tra-gop">công cụ tính trả góp</InlineLink>.
            </Tip>
            <Tip title="Lái thử trước khi chốt.">
              Nên lái thử khi chở đủ người và đi cả đoạn đường bạn hay đi. Phúc có thể
              mang xe đến tận nhà để bạn{" "}
              <InlineLink href="/dang-ky-lai-thu?nguon=Chon-xe-phu-hop">đăng ký lái thử</InlineLink>.
            </Tip>
          </ul>
        </section>

        <p className="mt-10 text-sm leading-6 text-gray-600">
          Thông số và trang bị theo công bố của Mitsubishi Motors Việt Nam, đối chiếu
          tháng 10/2026. Giá và trang bị có thể thay đổi, vui lòng liên hệ để được xác nhận.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Bạn đang phân vân giữa hai mẫu xe?
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            Gửi cho Phúc nhu cầu và ngân sách của bạn, Phúc sẽ gợi ý phiên bản phù hợp
            kèm báo giá lăn bánh và ưu đãi đang áp dụng.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/?nguon=Chon-xe-phu-hop#bao-gia"
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Nhận báo giá
            </Link>

            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Tư vấn Zalo
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function Tip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <span className="font-semibold text-gray-900">{title}</span> {children}
    </li>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-red-700 underline hover:text-red-800">
      {children}
    </Link>
  );
}
