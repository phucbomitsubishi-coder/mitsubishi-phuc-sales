// Google Apps Script nhận form đăng ký lái thử. Script này lưu cả trường `note`,
// nên form Thu cũ đổi mới dùng chung (thông tin xe cũ ghi trong `note`).
// ⚠️ Script chỉ chấp nhận source "Website" hoặc "Hero" và type "test-drive" (giá trị khác bị từ chối:
// "Nguồn khách không hợp lệ" / "Loại yêu cầu không hợp lệ"). Nguồn thật của khách ghi vào đầu `note`.
export const TEST_DRIVE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzw49PlAEA9ajztoKPK5oAs1vb3HOzLXO1sikV0cjROOaLwn3eb2WLNtVBAM--ll-6t/exec";

export const LEAD_SOURCE = "Website";

// ⚠️ Script báo giá (NEXT_PUBLIC_QUOTE_API_URL) cũng chỉ nhận một danh sách nguồn cố định
// (kiểm tra 12/10/2026). Nguồn ngoài danh sách bị từ chối, khách không gửi được báo giá.
// Thêm nguồn mới vào đây CHỈ SAU KHI đã thêm vào danh sách cho phép trong Apps Script.
const QUOTE_ALLOWED_SOURCES = new Set([
  "Website Mitsubishi",
  "Website",
  "Hero",
  "Gia-lan-banh",
  "Gioi-thieu",
  "Lien-he",
  "Chon-phien-ban",
  "Trang-chu-san-pham",
  "Chi-tiet-xe",
  "Ho-tro",
  "Tu-van",
  "Chon-xe-phu-hop",
]);

// Đổi nguồn sang giá trị script báo giá chấp nhận: bài so sánh → "Tu-van", còn lại → "Website Mitsubishi".
export function toQuoteSource(source: string) {
  if (QUOTE_ALLOWED_SOURCES.has(source)) return source;
  if (source.startsWith("So-sanh-")) return "Tu-van";
  return "Website Mitsubishi";
}
