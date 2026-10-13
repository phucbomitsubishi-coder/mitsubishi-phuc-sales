// Google Apps Script nhận cả form báo giá (QuoteForm, URL trong .env.local) và form lái thử / thu cũ đổi mới.
// Cùng một script: type "" → sheet báo giá, "test-drive" / "trade-in" → sheet DangKyLaiThu.
export const TEST_DRIVE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzw49PlAEA9ajztoKPK5oAs1vb3HOzLXO1sikV0cjROOaLwn3eb2WLNtVBAM--ll-6t/exec";

// Script chỉ nhận nguồn dài 1–60 ký tự gồm chữ (có dấu), số, khoảng trắng, "_" và "-" (bản 13/10/2026).
// Nguồn lấy từ ?nguon= trên URL nên phải kiểm tra trước; nguồn lạ đổi về "Website" để khách không bị báo lỗi.
const VALID_SOURCE = /^[\p{L}\p{N} _-]{1,60}$/u;

export function toLeadSource(source: string | null | undefined, fallback = "Website") {
  const value = (source ?? "").trim();
  return VALID_SOURCE.test(value) ? value : fallback;
}
