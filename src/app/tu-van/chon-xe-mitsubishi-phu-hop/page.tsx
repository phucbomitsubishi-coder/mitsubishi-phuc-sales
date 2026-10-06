import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chọn xe Mitsubishi phù hợp với nhu cầu | Lưu Hoàng Phúc",
  description:
    "Tư vấn lựa chọn xe Mitsubishi phù hợp với nhu cầu gia đình, đi phố, đi xa, công việc và ngân sách.",
  alternates: {
    canonical: "/tu-van/chon-xe-mitsubishi-phu-hop",
  },
};

export default function MitsubishiBuyingGuidePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <Link
          href="/#tin-tuc"
          className="font-semibold text-red-600 transition hover:text-red-700"
        >
          ← Tin tức & Tư vấn
        </Link>

        <p className="mt-8 font-semibold uppercase tracking-wider text-red-600">
          Tư vấn chọn xe
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Chọn Mitsubishi nào phù hợp với nhu cầu của bạn?
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Mỗi dòng xe Mitsubishi phù hợp với một nhóm nhu cầu khác nhau.
          Việc xác định số người thường xuyên sử dụng, điều kiện di chuyển,
          mục đích công việc và ngân sách sẽ giúp bạn lựa chọn mẫu xe phù hợp
          hơn.
        </p>
        <section className="mt-12">
  <h2 className="text-2xl font-bold md:text-3xl">
    1. Đi đô thị, gia đình nhỏ: Mitsubishi Xforce
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Mitsubishi Xforce là lựa chọn đáng tham khảo khi nhu cầu chính là một
    mẫu SUV 5 chỗ phục vụ gia đình và di chuyển hằng ngày. Xe có khoảng
    sáng gầm cao, sử dụng hộp số CVT và bố trí 5 chỗ ngồi.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Khi lựa chọn giữa các phiên bản Xforce, bạn nên cân nhắc ngân sách,
    trang bị mong muốn và nhu cầu sử dụng thực tế trước khi quyết định.
  </p>

  <Link
    href="/xe/mitsubishi-xforce"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem Mitsubishi Xforce →
  </Link>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    2. Gia đình cần 7 chỗ: Mitsubishi Xpander và Xpander Cross
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Nếu gia đình thường xuyên cần nhiều chỗ ngồi, Mitsubishi Xpander và
    Xpander Cross là hai dòng xe 7 chỗ đáng tham khảo. Cả hai phù hợp với
    nhu cầu chở gia đình, đi làm hằng ngày và những chuyến đi có nhiều
    hành lý.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Xpander có nhiều phiên bản để lựa chọn theo ngân sách và nhu cầu sử
    dụng. Xpander Cross hướng tới khách hàng muốn một lựa chọn 7 chỗ với
    phong cách khác biệt hơn. Trước khi quyết định, bạn nên so sánh trang
    bị, phiên bản và mức chi phí phù hợp với gia đình.
  </p>

  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
    <Link
      href="/xe/mitsubishi-xpander"
      className="font-semibold text-red-600 transition hover:text-red-700"
    >
      Xem Mitsubishi Xpander →
    </Link>

    <Link
      href="/xe/mitsubishi-xpander-cross"
      className="font-semibold text-red-600 transition hover:text-red-700"
    >
      Xem Mitsubishi Xpander Cross →
    </Link>
  </div>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    3. Phục vụ công việc và cần xe bán tải: Mitsubishi Triton
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Mitsubishi Triton phù hợp để tham khảo khi nhu cầu sử dụng kết hợp giữa
    di chuyển hằng ngày và phục vụ công việc. Xe có 5 chỗ ngồi, sử dụng
    động cơ Diesel 2.4L và có nhiều phiên bản để lựa chọn theo nhu cầu.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Các phiên bản Triton có sự khác nhau về hệ dẫn động và trang bị. Nếu
    chủ yếu di chuyển đường thông thường, bạn có thể cân nhắc nhóm phiên
    bản dẫn động cầu sau. Với nhu cầu sử dụng cần hệ dẫn động 4 bánh, có
    thể tham khảo các phiên bản 4WD và so sánh kỹ trước khi lựa chọn.
  </p>

  <Link
    href="/xe/mitsubishi-triton"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem Mitsubishi Triton →
  </Link>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    4. Cần sedan 5 chỗ cho nhu cầu đi lại hằng ngày: Mitsubishi Attrage
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Mitsubishi Attrage là mẫu sedan 5 chỗ phù hợp để tham khảo khi nhu cầu
    chính là đi làm, di chuyển hằng ngày và sử dụng xe gia đình. Xe sử dụng
    động cơ xăng 1.2L MIVEC và hệ dẫn động cầu trước.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Attrage hiện có các lựa chọn hộp số khác nhau. Phiên bản MT phù hợp với
    khách hàng muốn cân nhắc mức chi phí ban đầu, trong khi phiên bản CVT
    Premium là lựa chọn để tham khảo nếu ưu tiên hộp số tự động và trang bị
    cao hơn.
  </p>

  <Link
    href="/xe/mitsubishi-attrage"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem Mitsubishi Attrage →
  </Link>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    5. Cần SUV 7 chỗ cho gia đình: Mitsubishi Destinator
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Mitsubishi Destinator là lựa chọn để tham khảo khi gia đình cần một
    mẫu SUV 7 chỗ, phục vụ nhu cầu di chuyển hằng ngày và những chuyến đi
    có nhiều thành viên. Xe sử dụng động cơ xăng Turbo 1.5L MIVEC, hộp số
    CVT và hệ dẫn động cầu trước.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Destinator có các phiên bản Premium và Ultimate. Khi lựa chọn, bạn nên
    cân nhắc ngân sách, trang bị mong muốn và nhu cầu sử dụng thực tế để
    chọn phiên bản phù hợp.
  </p>

  <Link
    href="/xe/mitsubishi-destinator"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem Mitsubishi Destinator →
  </Link>
</section>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Bạn đang quan tâm mẫu xe nào?
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Liên hệ Lưu Hoàng Phúc để được tư vấn phiên bản, báo giá,
            chương trình ưu đãi và chi phí lăn bánh phù hợp với nhu cầu.
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
              className="rounded border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Tư vấn Zalo
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}