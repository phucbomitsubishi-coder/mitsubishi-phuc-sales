import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

// Bảo hành mở rộng (21/10/2026). Số liệu đối chiếu trang MMV:
// https://www.mitsubishi-motors.com.vn/tin-tuc/bao-hanh-mo-rong-n152372.html
// MMV đổi giá hoặc gói thì sửa mảng prices + cập nhật dateModified bên dưới.
// Destinator, Xpander Cross không có trong bảng MMV: KHÔNG tự đoán giá.
export const metadata: Metadata = createPageMetadata({
  title: "Bảo hành mở rộng Mitsubishi: gói, giá, điều kiện mua",
  description:
    "Gói bảo hành mở rộng Mitsubishi thêm 1 hoặc 2 năm sau bảo hành tiêu chuẩn: gói Cơ bản (động cơ, hộp số) và gói Cao cấp, bảng giá từng dòng xe, điều kiện mua.",
  path: "/ho-tro/bao-hanh-mo-rong",
});

const sourceUrl = "https://www.mitsubishi-motors.com.vn/tin-tuc/bao-hanh-mo-rong-n152372.html";

// Giá chưa gồm VAT (đồng): [1 năm cơ bản, 1 năm cao cấp, 2 năm cơ bản, 2 năm cao cấp]
const prices: { model: string; values: [number, number, number, number]; note?: string }[] = [
  { model: "Attrage", values: [1_600_000, 3_000_000, 3_100_000, 6_000_000] },
  { model: "Xpander", values: [1_800_000, 3_500_000, 3_600_000, 7_000_000] },
  { model: "Xforce", values: [2_000_000, 3_800_000, 4_000_000, 7_400_000] },
  {
    model: "Triton",
    values: [2_200_000, 4_000_000, 4_300_000, 7_900_000],
    note: "All-New Triton đã có bảo hành tiêu chuẩn 5 năm, nhắn Phúc để kiểm tra gói áp dụng cho xe của bạn.",
  },
  { model: "Pajero Sport", values: [3_000_000, 5_100_000, 5_200_000, 9_200_000] },
  { model: "Outlander", values: [2_700_000, 4_500_000, 4_800_000, 8_300_000] },
];

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

const benefits = [
  { title: "Nối tiếp ngay", text: "Gói có hiệu lực từ lúc bảo hành tiêu chuẩn kết thúc, xe không có khoảng trống không được bảo hành." },
  { title: "Không giới hạn số lần", text: "Hạng mục thuộc gói được bảo hành bao nhiêu lần cũng được trong thời hạn của gói." },
  { title: "Miễn phí công và phụ tùng", text: "Chi tiết thuộc gói được sửa hoặc thay bằng phụ tùng chính hãng, không tính tiền công." },
  { title: "Bảo hành toàn quốc", text: "Đưa xe tới bất kỳ nhà phân phối ủy quyền nào của Mitsubishi trên cả nước." },
  { title: "Chuyển được cho chủ mới", text: "Khi bán xe, gói được chuyển nhượng cho chủ mới, là điểm cộng khi bán lại." },
];

const conditions = [
  "Tại thời điểm mua gói, xe còn ít nhất 6 tháng bảo hành tiêu chuẩn.",
  "Đồng hồ công-tơ-mét (ODO) dưới 100.000 km.",
  "Xe đã bảo dưỡng chính hãng đầy đủ theo Sổ tay hướng dẫn sử dụng. Bỏ lỡ mốc bảo dưỡng có thể bị từ chối bảo hành.",
  "Mua tại nhà phân phối ủy quyền, trước ngày hết bảo hành tiêu chuẩn.",
];

export default function ExtendedWarrantyPage() {
  const { contact, sales } = siteConfig;

  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/ho-tro/bao-hanh-mo-rong"
        parents={[{ name: "Hỗ trợ khách hàng", path: "/ho-tro" }]}
        name="Bảo hành mở rộng"
        datePublished="2026-10-21"
      />
      <SiteHeader />

      <main className="bg-white text-gray-900">
        {/* Banner */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Dịch vụ</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Bảo hành mở rộng Mitsubishi</h1>
              <p className="mt-5 max-w-xl leading-8 text-gray-300">
                Hết 3 năm hoặc 100.000 km bảo hành tiêu chuẩn, bạn có thể mua thêm 1 hoặc 2 năm bảo hành chính hãng.
                Tổng thời gian được bảo vệ lên tới <strong className="text-white">5 năm hoặc 150.000 km</strong> (tùy điều kiện nào đến trước).
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-700"
                >
                  Hỏi gói cho xe của bạn
                </a>
                <a
                  href="#bang-gia"
                  className="border border-white/60 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-gray-950"
                >
                  Xem bảng giá
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-4 border-red-600">
              <Image
                src="/images/about/xuong-dich-vu.jpg"
                alt="Kỹ thuật viên kiểm tra khoang máy tại xưởng dịch vụ Mitsubishi Moveo"
                fill
                preload
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Quyền lợi */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Quyền lợi</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Vì sao nên cân nhắc</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, index) => (
              <li key={item.title} className="border-t-2 border-gray-950 pt-5">
                <p className="text-sm font-bold tabular-nums text-red-700">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                <p className="mt-2 leading-7 text-gray-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Hai gói */}
        <section className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Lựa chọn</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Hai gói, hai thời hạn</h2>
            <p className="mt-4 max-w-3xl leading-8 text-gray-700">
              Mỗi gói có hai lựa chọn: thêm <strong>1 năm (25.000 km)</strong> hoặc <strong>2 năm (50.000 km)</strong>, tùy điều kiện nào đến trước,
              tính từ ngày hết bảo hành tiêu chuẩn.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="bg-white p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Bảo vệ thiết yếu</p>
                <h3 className="mt-2 text-2xl font-black">Gói Cơ bản</h3>
                <p className="mt-3 leading-7 text-gray-700">Tập trung vào hai cụm có chi phí sửa chữa cao: động cơ và hộp số.</p>
                <ul className="mt-5 space-y-3 leading-7 text-gray-800">
                  <li className="border-l-2 border-red-600 pl-4">
                    <strong>Động cơ:</strong> các bộ phận cơ khí bên trong động cơ và hộp điều khiển động cơ (ECU).
                  </li>
                  <li className="border-l-2 border-red-600 pl-4">
                    <strong>Hộp số:</strong> các bộ phận cơ khí bên trong hộp số (không gồm ly hợp và biến mô) và hộp điều khiển hộp số AT/CVT.
                  </li>
                </ul>
              </div>
              <div className="bg-gray-950 p-7 text-white md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Bảo vệ toàn diện</p>
                <h3 className="mt-2 text-2xl font-black">Gói Cao cấp</h3>
                <p className="mt-3 leading-7 text-gray-300">
                  Gồm các chi tiết phụ tùng nằm trong phạm vi bảo hành tiêu chuẩn 3 năm của nhà sản xuất.
                </p>
                <p className="mt-5 leading-7 text-gray-300">
                  Hợp với người đi nhiều, xe gia đình dùng lâu dài, hoặc muốn bán lại xe với gói bảo hành còn hạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bảng giá */}
        <section id="bang-gia" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Bảng giá</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Giá gói theo dòng xe</h2>
          <p className="mt-4 max-w-3xl leading-8 text-gray-700">
            Giá do Mitsubishi Motors Việt Nam công bố, <strong>chưa gồm VAT</strong>. Hội viên hạng Bạch kim trên ứng dụng Mitsubishi Connect+ có giá ưu đãi riêng.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prices.map((row) => (
              <div key={row.model} className="border border-gray-200 p-6">
                <h3 className="text-xl font-black uppercase tracking-wide">{row.model}</h3>
                <table className="mt-4 w-full text-sm">
                  <caption className="sr-only">Giá bảo hành mở rộng {row.model}, chưa gồm VAT</caption>
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-gray-600">
                      <th scope="col" className="py-2 font-semibold">Thời hạn</th>
                      <th scope="col" className="py-2 text-right font-semibold">Cơ bản</th>
                      <th scope="col" className="py-2 text-right font-semibold">Cao cấp</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    <tr className="border-b border-gray-100">
                      <th scope="row" className="py-2.5 text-left font-normal text-gray-700">1 năm / 25.000 km</th>
                      <td className="py-2.5 text-right">{formatPrice(row.values[0])}</td>
                      <td className="py-2.5 text-right font-bold">{formatPrice(row.values[1])}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-2.5 text-left font-normal text-gray-700">2 năm / 50.000 km</th>
                      <td className="py-2.5 text-right">{formatPrice(row.values[2])}</td>
                      <td className="py-2.5 text-right font-bold">{formatPrice(row.values[3])}</td>
                    </tr>
                  </tbody>
                </table>
                {row.note && <p className="mt-3 text-sm leading-6 text-gray-600">{row.note}</p>}
              </div>
            ))}
            <div className="flex flex-col justify-center bg-gray-100 p-6">
              <h3 className="text-xl font-black uppercase tracking-wide">Destinator, Xpander Cross</h3>
              <p className="mt-3 leading-7 text-gray-700">
                Bảng giá của Mitsubishi chưa liệt kê hai dòng xe này. Nhắn Phúc để hỏi giá gói cho xe của bạn.
              </p>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit text-sm font-bold uppercase tracking-[0.15em] text-red-700 hover:text-red-800"
              >
                Nhắn Zalo →
              </a>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-gray-600">
            Mitsubishi Motors Việt Nam có thể thay đổi hoặc dừng các gói và mức giá mà không báo trước. Nguồn:{" "}
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
              trang Bảo hành mở rộng của Mitsubishi Motors Việt Nam
            </a>
            .
          </p>
        </section>

        {/* Điều kiện */}
        <section className="bg-gray-100">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Điều kiện</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Xe nào mua được?</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Gói phải mua <strong>trước khi hết bảo hành tiêu chuẩn</strong>. Nếu xe bạn sắp tròn 3 năm hoặc gần 100.000 km, nên hỏi sớm.
              </p>
            </div>
            <ol className="space-y-4">
              {conditions.map((item, index) => (
                <li key={item} className="flex gap-4 bg-white p-5">
                  <span className="text-2xl font-black tabular-nums text-red-700">{index + 1}</span>
                  <span className="leading-7 text-gray-800">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Liên quan + chốt */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/ho-tro/chinh-sach-bao-hanh" className="group border border-gray-200 p-6 transition hover:border-gray-950">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Xem thêm</p>
              <p className="mt-2 text-xl font-black group-hover:text-red-700">Chính sách bảo hành tiêu chuẩn →</p>
              <p className="mt-2 leading-7 text-gray-700">Thời hạn bảo hành xe mới từng dòng xe và các trường hợp không được bảo hành.</p>
            </Link>
            <Link href="/ho-tro/bao-duong-dinh-ky" className="group border border-gray-200 p-6 transition hover:border-gray-950">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">Xem thêm</p>
              <p className="mt-2 text-xl font-black group-hover:text-red-700">Bảo dưỡng định kỳ →</p>
              <p className="mt-2 leading-7 text-gray-700">Bảo dưỡng đúng mốc là điều kiện để giữ quyền bảo hành và mua gói mở rộng.</p>
            </Link>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Cần tư vấn gói bảo hành mở rộng?</h2>
              <p className="mt-2 leading-7 text-gray-400">Gửi Phúc dòng xe, năm mua và số km hiện tại, Phúc kiểm tra giúp bạn còn mua được gói nào.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={contact.phoneUrl} className="bg-red-600 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-red-700">
                Gọi {sales.phoneDisplay}
              </a>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/60 px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-gray-950"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
