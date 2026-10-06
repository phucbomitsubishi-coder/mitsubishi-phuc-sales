import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Nên chọn phiên bản xe Mitsubishi như thế nào? | Lưu Hoàng Phúc",
  description:
    "Tư vấn cách lựa chọn phiên bản xe Mitsubishi phù hợp với nhu cầu sử dụng, trang bị và ngân sách dự kiến.",
  path: "/tu-van/chon-phien-ban-xe-mitsubishi",
});

export default function MitsubishiVariantGuidePage() {
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
          Phiên bản & ưu đãi
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Nên chọn phiên bản xe Mitsubishi như thế nào?
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Cùng một dòng xe Mitsubishi có thể có nhiều phiên bản với mức giá,
          trang bị và khả năng vận hành khác nhau. Lựa chọn phiên bản phù hợp
          không nhất thiết là chọn phiên bản cao nhất, mà nên dựa trên nhu cầu
          sử dụng thực tế và ngân sách dự kiến.
        </p>
        <section className="mt-12">
  <h2 className="text-2xl font-bold md:text-3xl">
    1. Chọn phiên bản theo nhu cầu sử dụng
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Khi một dòng xe có nhiều phiên bản, mức giá cao hơn thường đi kèm với
    sự khác biệt về trang bị, tiện nghi hoặc khả năng vận hành. Tuy nhiên,
    phiên bản phù hợp nhất không nhất thiết phải là phiên bản có giá cao nhất.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Trước khi lựa chọn, bạn nên xác định xe chủ yếu được sử dụng để đi lại
    hằng ngày, phục vụ gia đình, đi đường dài hay phục vụ công việc. Sau đó
    mới cân đối ngân sách và những trang bị thực sự cần thiết.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Cách lựa chọn này giúp hạn chế việc chi thêm cho những trang bị ít sử
    dụng, đồng thời tránh chọn phiên bản quá cơ bản so với nhu cầu thực tế.
  </p>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    2. So sánh phần chênh lệch giữa các phiên bản
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Khi phân vân giữa hai phiên bản, bạn không nên chỉ nhìn vào số tiền
    chênh lệch. Điều quan trọng hơn là xác định số tiền đó đổi lại những
    trang bị hoặc khả năng vận hành nào và chúng có thực sự cần thiết với
    nhu cầu sử dụng hay không.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Có thể ưu tiên so sánh các nhóm chính như động cơ và hệ truyền động,
    trang bị an toàn, tiện nghi, kích thước bánh xe và những tính năng hỗ
    trợ sử dụng hằng ngày. Với xe phục vụ công việc, khả năng vận hành có
    thể được ưu tiên hơn; với xe gia đình, sự tiện nghi và an toàn thường
    cần được cân nhắc kỹ hơn.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Sau khi xác định những trang bị thực sự cần, hãy đối chiếu phần chênh
    lệch giá để quyết định nâng lên phiên bản cao hơn hay dành ngân sách
    cho các chi phí khác khi mua xe.
  </p>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    3. Gợi ý lựa chọn phiên bản theo từng dòng xe
  </h2>

  <h3 className="mt-7 text-xl font-bold">
    Mitsubishi Xforce
  </h3>

  <p className="mt-3 leading-8 text-gray-700">
    Xforce hiện có các phiên bản GLX, Luxury và Ultimate trên website.
    Khi lựa chọn, khách hàng có thể bắt đầu từ mức ngân sách dự kiến,
    sau đó so sánh những trang bị bổ sung giữa từng phiên bản để xác định
    đâu là lựa chọn phù hợp với nhu cầu sử dụng hằng ngày.
  </p>

  <Link
    href="/xe/mitsubishi-xforce"
    className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem các phiên bản Mitsubishi Xforce →
  </Link>

  <h3 className="mt-8 text-xl font-bold">
    Mitsubishi Xpander
  </h3>

  <p className="mt-3 leading-8 text-gray-700">
    Xpander có các phiên bản MT, AT và AT Premium. Người mua có thể cân
    nhắc giữa nhu cầu sử dụng hộp số sàn hoặc số tự động, sau đó tiếp tục
    so sánh trang bị giữa AT và AT Premium để lựa chọn theo ngân sách và
    nhu cầu sử dụng của gia đình.
  </p>

  <Link
    href="/xe/mitsubishi-xpander"
    className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Xem các phiên bản Mitsubishi Xpander →
  </Link>
  <h3 className="mt-8 text-xl font-bold">
  Mitsubishi Triton
</h3>

<p className="mt-3 leading-8 text-gray-700">
  Triton có nhiều lựa chọn từ 2WD AT GLX, 2WD AT Premium đến 4WD AT
  Premium và 4WD AT Athlete. Nếu nhu cầu chủ yếu là di chuyển hằng ngày
  và phục vụ công việc, khách hàng có thể bắt đầu từ nhóm 2WD. Khi thường
  xuyên cần khả năng vận hành trên nhiều điều kiện đường sá khác nhau,
  nhóm phiên bản 4WD là lựa chọn cần được cân nhắc thêm.
</p>

<p className="mt-3 leading-8 text-gray-700">
  Riêng phiên bản Athlete sử dụng động cơ Bi-Turbo với công suất và mô-men
  xoắn cao hơn các phiên bản còn lại, vì vậy nên so sánh thêm nhu cầu vận
  hành thực tế trước khi quyết định.
</p>

<Link
  href="/xe/mitsubishi-triton"
  className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Xem các phiên bản Mitsubishi Triton →
</Link>

<h3 className="mt-8 text-xl font-bold">
  Mitsubishi Attrage
</h3>

<p className="mt-3 leading-8 text-gray-700">
  Attrage hiện có phiên bản MT và CVT Premium trên website. Điểm cần xác
  định trước tiên là nhu cầu sử dụng hộp số sàn hay hộp số tự động. Từ đó,
  khách hàng có thể tiếp tục cân đối mức giá và trang bị để lựa chọn phiên
  bản phù hợp với nhu cầu đi lại hằng ngày.
</p>

<Link
  href="/xe/mitsubishi-attrage"
  className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Xem các phiên bản Mitsubishi Attrage →
</Link>
<h3 className="mt-8 text-xl font-bold">
  Mitsubishi Destinator
</h3>

<p className="mt-3 leading-8 text-gray-700">
  Destinator hiện có hai phiên bản Premium và Ultimate trên website.
  Cả hai đều hướng đến nhu cầu sử dụng SUV 7 chỗ, vì vậy khi lựa chọn,
  khách hàng nên tập trung so sánh phần chênh lệch về trang bị giữa hai
  phiên bản và cân đối với ngân sách dự kiến.
</p>

<p className="mt-3 leading-8 text-gray-700">
  Nếu những trang bị bổ sung của phiên bản Ultimate phù hợp với nhu cầu
  sử dụng thường xuyên, khách hàng có thể cân nhắc nâng cấp. Ngược lại,
  phiên bản Premium giúp giữ ngân sách mua xe ở mức thấp hơn trong khi
  vẫn đáp ứng nhu cầu sử dụng cơ bản của dòng xe.
</p>

<Link
  href="/xe/mitsubishi-destinator"
  className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Xem các phiên bản Mitsubishi Destinator →
</Link>

<h3 className="mt-8 text-xl font-bold">
  Mitsubishi Xpander Cross
</h3>

<p className="mt-3 leading-8 text-gray-700">
  Xpander Cross hiện được giới thiệu với một phiên bản trên website.
  Vì không phải lựa chọn giữa nhiều cấp phiên bản, khách hàng có thể tập
  trung so sánh Xpander Cross với các phiên bản Xpander về mức giá, thiết
  kế, trang bị và nhu cầu sử dụng thực tế.
</p>

<Link
  href="/xe/mitsubishi-xpander-cross"
  className="mt-3 inline-block font-semibold text-red-600 transition hover:text-red-700"
>
  Xem Mitsubishi Xpander Cross →
</Link>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    4. Đừng quên cân đối tổng ngân sách lăn bánh
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Khi lựa chọn phiên bản, ngân sách không nên chỉ dừng ở giá xe. Bạn
    cũng nên dự tính thêm các khoản chi phí để xe có thể hoàn tất thủ tục
    đăng ký và đưa vào sử dụng.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Trong một số trường hợp, lựa chọn phiên bản phù hợp hơn với ngân sách
    có thể giúp bạn chủ động phần chi phí lăn bánh và các nhu cầu sử dụng
    khác sau khi nhận xe.
  </p>

  <Link
    href="/tu-van/chi-phi-lan-banh-mitsubishi"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Tìm hiểu các khoản chi phí lăn bánh Mitsubishi →
  </Link>
</section>


        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Bạn đang phân vân giữa các phiên bản?
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Chọn mẫu xe đang quan tâm để xem giá, thông số và các phiên bản
            hiện có, hoặc liên hệ Lưu Hoàng Phúc để được tư vấn theo nhu cầu
            sử dụng thực tế.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#san-pham"
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Xem các mẫu xe
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