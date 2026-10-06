import type { NewsArticle } from "@/data/news";

// Nguồn được phép đăng lại và cho Google lập chỉ mục: trang chính thức của hãng
// (thông cáo, chương trình khuyến mãi gửi cho hệ thống đại lý).
const officialSourceHosts = ["mitsubishi-motors.com.vn"];

// Bài lấy nguyên văn từ báo hoặc diễn đàn khác (xehay.vn, autodaily.vn...).
// Google xếp loại này vào "nội dung sao chép" (scraped content), nên các bài này được
// đặt noindex và bỏ khỏi sitemap. Khi đã viết lại bằng lời của mình, đặt
// `originalContent: true` (giữ `source` làm nguồn tham khảo) để bài được lập chỉ mục.
export function isRepublishedArticle(article: NewsArticle) {
  if (!article.source || article.originalContent) return false;

  try {
    const host = new URL(article.source.url).hostname.replace(/^www\./, "");
    return !officialSourceHosts.some(
      (official) => host === official || host.endsWith(`.${official}`)
    );
  } catch {
    return true;
  }
}
