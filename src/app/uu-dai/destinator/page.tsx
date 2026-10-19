import type { Metadata } from "next";
import AdLandingPage from "@/components/AdLandingPage";

// Landing page quảng cáo Destinator: noindex, không có trong sitemap. Khuôn chung ở src/components/AdLandingPage.tsx.
export const metadata: Metadata = {
  title: "Ưu đãi Mitsubishi Destinator tháng này | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Destinator SUV 7 chỗ máy 1.5 turbo. Nhận báo giá lăn bánh và ưu đãi tháng này từ Lưu Hoàng Phúc, Mitsubishi Moveo New City.",
  robots: { index: false, follow: false },
};

export default function DestinatorLandingPage() {
  return (
    <AdLandingPage
      carSlug="mitsubishi-destinator"
      defaultSource="Landing Destinator"
      kicker="SUV 7 chỗ máy turbo"
      heroImage="/images/cars/destinator/gallery/exterior/exterior-01.jpg"
      whyTitle="Vì sao nhiều gia đình chọn Destinator"
      highlights={[
        { title: "SUV 7 chỗ, 3 hàng ghế", text: "Khoảng sáng gầm 214 mm, mâm 18 inch, đi phố và đi tỉnh đều thoải mái." },
        { title: "Máy 1.5L turbo 163 PS", text: "Mô-men xoắn 250 Nm từ 2.000 vòng/phút, hộp số CVT." },
        { title: "6 túi khí, cảnh báo điểm mù", text: "Có cảnh báo phương tiện cắt ngang khi lùi ở cả hai phiên bản." },
        { title: "Bảo hành 5 năm / 150.000 km", text: "Bảo dưỡng chính hãng tại hệ thống Mitsubishi toàn quốc." },
      ]}
    />
  );
}
