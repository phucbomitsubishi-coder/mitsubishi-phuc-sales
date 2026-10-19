import type { Metadata } from "next";
import AdLandingPage from "@/components/AdLandingPage";

// Landing page quảng cáo Xpander, gộp cả Xpander Cross (anh Phúc chọn 19/10/2026: cùng nhóm khách 7 chỗ gia đình).
// noindex, không có trong sitemap. Khuôn chung ở src/components/AdLandingPage.tsx.
export const metadata: Metadata = {
  title: "Ưu đãi Mitsubishi Xpander và Xpander Cross tháng này | Lưu Hoàng Phúc",
  description:
    "Mitsubishi Xpander và Xpander Cross 7 chỗ gia đình. Nhận báo giá lăn bánh và ưu đãi tháng này từ Lưu Hoàng Phúc, Mitsubishi Moveo New City.",
  robots: { index: false, follow: false },
};

export default function XpanderLandingPage() {
  return (
    <AdLandingPage
      carSlug="mitsubishi-xpander"
      extraCarSlugs={["mitsubishi-xpander-cross"]}
      heading="Mitsubishi Xpander và Xpander Cross"
      defaultSource="Landing Xpander"
      kicker="7 chỗ gia đình"
      heroImage="/images/cars/xpander/gallery/exterior/exterior-01.jpg"
      whyTitle="Vì sao nhiều gia đình chọn Xpander"
      highlights={[
        { title: "7 chỗ, khoảng sáng gầm 225 mm", text: "Chiều dài cơ sở 2.775 mm, đủ chỗ cho cả nhà đi xa. Xpander Cross có thêm dáng SUV, mâm 17 inch." },
        { title: "Máy 1.5L MIVEC, tương thích E10", text: "105 PS, 141 Nm. Xpander có số sàn 5 cấp hoặc tự động 4 cấp; Xpander Cross số tự động." },
        { title: "Tiêu hao nhiên liệu từ 6,8 L/100 km", text: "Mức hỗn hợp theo công bố của hãng: Xpander số sàn 6,8; Xpander Cross 7,23 L/100 km." },
        { title: "Bảo hành 3 năm / 100.000 km", text: "Bảo dưỡng chính hãng tại hệ thống Mitsubishi toàn quốc." },
      ]}
    />
  );
}
