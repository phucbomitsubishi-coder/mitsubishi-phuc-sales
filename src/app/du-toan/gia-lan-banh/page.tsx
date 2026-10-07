import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import OnRoadPricePage from "@/components/OnRoadPricePage";

export const metadata: Metadata = createPageMetadata({
  title: "Tính giá lăn bánh Mitsubishi | Lưu Hoàng Phúc",
  description:
    "Dự tính chi phí lăn bánh xe Mitsubishi theo mẫu xe, phiên bản và khu vực đăng ký.",
  path: "/du-toan/gia-lan-banh",
  hasOgImageFile: true,
});

export default function GiaLanBanhPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 font-semibold uppercase tracking-wide text-red-600">
              Dự toán chi phí
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Tính giá lăn bánh Mitsubishi
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              Chọn mẫu xe và phiên bản bạn đang quan tâm để tham khảo giá xe
              cùng các khoản chi phí lăn bánh dự kiến theo khu vực đăng ký.
            </p>

            <div className="mt-8">
  <OnRoadPricePage />
</div>
          </div>
        </section>
      </main>
    </>
  );
}