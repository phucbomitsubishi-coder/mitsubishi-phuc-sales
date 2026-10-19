import type { Metadata } from "next";
import AdLandingPage from "@/components/AdLandingPage";

// Landing page quảng cáo Xforce: noindex, không có trong sitemap. Khuôn chung ở src/components/AdLandingPage.tsx.
export const metadata: Metadata = {
  title: "Ưu đãi Mitsubishi Xforce tháng này | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Xforce SUV 5 chỗ gầm cao 222 mm. Nhận báo giá lăn bánh và ưu đãi tháng này từ Lưu Hoàng Phúc, Mitsubishi Moveo New City.",
  robots: { index: false, follow: false },
};

export default function XforceLandingPage() {
  return (
    <AdLandingPage
      carSlug="mitsubishi-xforce"
      defaultSource="Landing Xforce"
      kicker="SUV 5 chỗ gầm cao"
      heroImage="/images/cars/xforce/gallery/exterior/exterior-01.jpg"
      whyTitle="Vì sao nhiều gia đình chọn Xforce"
      highlights={[
        { title: "SUV 5 chỗ gầm cao đến 222 mm", text: "Kích thước 4.390 × 1.810 × 1.660 mm, mâm 17–18 inch tùy phiên bản." },
        { title: "Máy 1.5L MIVEC, hộp số CVT", text: "105 PS, 141 Nm. Tiêu hao nhiên liệu hỗn hợp 6,3 L/100 km theo công bố của hãng." },
        { title: "Đến 6 túi khí, camera 360 độ", text: "Bản Luxury và Ultimate có 6 túi khí; bản Ultimate có camera toàn cảnh 360 độ." },
        { title: "Bảo hành 3 năm / 100.000 km", text: "Bảo dưỡng chính hãng tại hệ thống Mitsubishi toàn quốc." },
      ]}
    />
  );
}
