import type { Metadata } from "next";
import AdLandingPage from "@/components/AdLandingPage";

// Landing page quảng cáo Triton: noindex, không có trong sitemap. Khuôn chung ở src/components/AdLandingPage.tsx.
export const metadata: Metadata = {
  title: "Ưu đãi Mitsubishi Triton tháng này | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Triton bán tải máy dầu 2.4L. Nhận báo giá lăn bánh và ưu đãi tháng này từ Lưu Hoàng Phúc, Mitsubishi Moveo New City.",
  robots: { index: false, follow: false },
};

export default function TritonLandingPage() {
  return (
    <AdLandingPage
      carSlug="mitsubishi-triton"
      defaultSource="Landing Triton"
      kicker="Bán tải máy dầu"
      heroImage="/images/cars/triton/gallery/exterior/exterior-01.jpg"
      whyTitle="Vì sao nhiều khách chọn Triton"
      highlights={[
        { title: "Máy dầu 2.4L, 184–204 PS", text: "Mô-men xoắn 430 Nm, bản Athlete Bi-Turbo 470 Nm. Hộp số tự động 6 cấp." },
        { title: "Super Select 4WD-II", text: "Có ở các bản 4WD, kèm khóa vi sai cầu sau." },
        { title: "Khoảng sáng gầm 222 mm", text: "Dài 5.320–5.360 mm, chiều dài cơ sở 3.130 mm, bình dầu 75 L." },
        { title: "Bảo hành 5 năm / 150.000 km", text: "Lệ phí trước bạ bán tải chỉ bằng 60% xe con." },
      ]}
    />
  );
}
