import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Giá lăn bánh Mitsubishi gồm những khoản nào? | Lưu Hoàng Phúc",
  description:
    "Tìm hiểu các khoản chi phí dự kiến khi tính giá lăn bánh xe Mitsubishi và cách tham khảo chi phí theo mẫu xe, phiên bản và khu vực đăng ký.",
  path: "/tu-van/chi-phi-lan-banh-mitsubishi",
});

export default function MitsubishiOnRoadCostGuidePage() {
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
          Chi phí mua xe
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          Giá lăn bánh Mitsubishi gồm những khoản nào?
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Giá niêm yết của xe chưa phải là toàn bộ số tiền dự kiến cần chuẩn
          bị để xe có thể đăng ký và lưu hành. Chi phí lăn bánh còn phụ thuộc
          vào mẫu xe, phiên bản, khu vực đăng ký và một số khoản phí liên quan.
        </p>
        <section className="mt-12">
  <h2 className="text-2xl font-bold md:text-3xl">
    1. Giá lăn bánh ô tô là gì?
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Giá lăn bánh là tổng chi phí dự kiến để một chiếc xe hoàn tất các thủ
    tục cần thiết trước khi đưa vào sử dụng. Vì vậy, giá lăn bánh thường
    cao hơn giá xe và có thể khác nhau tùy theo khu vực đăng ký, loại xe
    và phương án đăng ký thực tế.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Khi dự tính ngân sách mua xe Mitsubishi, ngoài giá của phiên bản đang
    lựa chọn, khách hàng nên tính thêm các khoản như lệ phí trước bạ, lệ
    phí cấp biển số, bảo hiểm trách nhiệm dân sự bắt buộc, phí kiểm định
    và phí sử dụng đường bộ.
  </p>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    2. Lệ phí trước bạ
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Lệ phí trước bạ là một trong những khoản chi phí đáng kể khi dự tính
    giá lăn bánh. Số tiền dự kiến phụ thuộc vào giá tính lệ phí trước bạ,
    loại xe và khu vực đăng ký.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Vì mức áp dụng có thể khác nhau theo từng trường hợp, công cụ tính giá
    lăn bánh trên website cho phép lựa chọn khu vực đăng ký để đưa ra mức
    dự tính phù hợp hơn thay vì sử dụng một con số cố định cho tất cả
    khách hàng.
  </p>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    3. Lệ phí cấp biển số
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Lệ phí cấp biển số là khoản chi phí cần tính khi đăng ký xe mới. Mức
    phí có thể khác nhau tùy theo khu vực đăng ký và loại phương tiện.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Khi sử dụng công cụ dự tính giá lăn bánh trên website, khu vực đăng ký
    được lựa chọn sẽ được dùng để tính khoản lệ phí biển số dự kiến cùng
    với các chi phí liên quan khác.
  </p>
</section>
<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    4. Bảo hiểm trách nhiệm dân sự bắt buộc
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Bảo hiểm trách nhiệm dân sự bắt buộc của chủ xe cơ giới là một khoản
    cần được tính vào chi phí dự kiến khi đưa xe vào sử dụng. Mức phí có
    thể khác nhau tùy theo loại xe và mục đích sử dụng.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Khi dự tính giá lăn bánh, khoản bảo hiểm này được tính riêng với các
    loại bảo hiểm tự nguyện. Vì vậy, khách hàng nên phân biệt bảo hiểm bắt
    buộc với các gói bảo hiểm bổ sung có thể lựa chọn khi mua xe.
  </p>
</section>

<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    5. Phí kiểm định và phí sử dụng đường bộ
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Khi dự tính chi phí lăn bánh, khách hàng cũng cần tính đến phí kiểm
    định và phí sử dụng đường bộ. Đây là các khoản chi phí liên quan đến
    quá trình hoàn tất thủ tục và đưa xe vào sử dụng.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Mức chi phí dự kiến có thể phụ thuộc vào loại phương tiện và mục đích
    sử dụng. Công cụ tính giá lăn bánh trên website sẽ tổng hợp các khoản
    này cùng với lệ phí trước bạ, biển số và bảo hiểm bắt buộc để giúp
    khách hàng dễ hình dung ngân sách cần chuẩn bị.
  </p>
</section>

<section className="mt-12 border-t border-gray-200 pt-10">
  <h2 className="text-2xl font-bold md:text-3xl">
    6. Cách dự tính giá lăn bánh Mitsubishi trên website
  </h2>

  <p className="mt-4 leading-8 text-gray-700">
    Để tham khảo chi phí cụ thể hơn, bạn có thể chọn dòng xe Mitsubishi
    đang quan tâm, sau đó chọn phiên bản phù hợp. Tại trang chi tiết xe,
    công cụ dự tính giá lăn bánh sẽ sử dụng giá của phiên bản đã chọn để
    thực hiện phép tính.
  </p>

  <p className="mt-4 leading-8 text-gray-700">
    Tiếp theo, lựa chọn khu vực đăng ký và các thông tin cần thiết để xem
    tổng chi phí dự kiến. Kết quả mang tính tham khảo và có thể thay đổi
    theo thời điểm đăng ký, địa phương, hồ sơ xe và chính sách hiện hành.
  </p>

  <Link
    href="/#san-pham"
    className="mt-5 inline-block font-semibold text-red-600 transition hover:text-red-700"
  >
    Chọn xe để dự tính giá lăn bánh →
  </Link>
</section>
        <div className="mt-10 rounded-2xl bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            Muốn dự tính chi phí cho mẫu xe bạn đang quan tâm?
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Chọn mẫu xe và phiên bản trên website để tham khảo giá xe, chi phí
            lăn bánh dự kiến hoặc liên hệ Lưu Hoàng Phúc để được hỗ trợ theo
            nhu cầu đăng ký thực tế.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#san-pham"
              className="rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Chọn mẫu xe
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