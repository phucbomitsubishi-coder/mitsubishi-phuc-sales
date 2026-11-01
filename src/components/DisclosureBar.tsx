import { siteConfig } from "@/config/site";

// Dải thông báo đầu MỌI trang (01/11/2026): nói rõ đây là website cá nhân của người tư vấn, không phải website chính thức
// của hãng. Thêm sau khi Google Ads tạm ngưng tài khoản vì nghi giả danh thương hiệu (tên miền có chữ "mitsubishi").
// Dùng ở SiteHeader (trên thanh menu, không dính khi cuộn) và AdLandingPage.
export default function DisclosureBar() {
  const { sales, dealer } = siteConfig;
  return (
    // aside (vùng có nhãn) để nội dung nằm trong landmark, không bị axe báo lỗi "region"
    <aside aria-label="Thông báo website cá nhân" className="bg-gray-100 px-4 py-1.5 text-center text-[11px] leading-4 text-gray-700 sm:text-xs">
      Website tư vấn cá nhân của {sales.name}, nhân viên kinh doanh {dealer.name}. Không phải website chính thức của
      Mitsubishi Motors Việt Nam.
    </aside>
  );
}
