import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";
import InstallmentCalculator from "@/components/InstallmentCalculator";

export const metadata: Metadata = createPageMetadata({
  title: "Dự tính trả góp xe Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Công cụ dự tính khoản vay và số tiền trả góp hàng tháng khi mua xe Mitsubishi theo mẫu xe, phiên bản, số tiền trả trước và thời hạn vay.",
  path: "/du-toan/tra-gop",
  hasOgImageFile: true,
});

export default function TraGopPage() {
  return (
    <>
      <PageSchema
        metadata={metadata}
        path="/du-toan/tra-gop"
        type="WebPage"
        name="Tính trả góp"
        hasOgImage
      />
      <SiteHeader />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 font-semibold uppercase tracking-wide text-red-600">
              Dự toán chi phí
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Dự tính trả góp xe Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              Chọn mẫu xe và phương án tài chính dự kiến để tham khảo số tiền
              cần trả trước, khoản vay và chi phí trả góp hàng tháng.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">
    Công cụ dự tính trả góp
  </h2>

  <div className="mt-6">
    <InstallmentCalculator />
  </div>
</div>

            <p className="mt-6 text-sm leading-6 text-gray-500">
              Kết quả tính toán chỉ mang tính tham khảo. Lãi suất, điều kiện vay,
              số tiền trả trước và khoản thanh toán thực tế có thể thay đổi theo
              ngân hàng, hồ sơ khách hàng và chính sách tại từng thời điểm.
            </p>
            
          </div>
        </section>
      </main>
    </>
  );
}