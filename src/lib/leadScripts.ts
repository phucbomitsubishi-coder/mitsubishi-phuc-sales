// Google Apps Script nhận form đăng ký lái thử. Script này lưu cả trường `note`,
// nên form Thu cũ đổi mới dùng chung (thông tin xe cũ ghi trong `note`).
// ⚠️ Script chỉ chấp nhận source "Website" hoặc "Hero" và type "test-drive" (giá trị khác bị từ chối:
// "Nguồn khách không hợp lệ" / "Loại yêu cầu không hợp lệ"). Nguồn thật của khách ghi vào đầu `note`.
export const TEST_DRIVE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzw49PlAEA9ajztoKPK5oAs1vb3HOzLXO1sikV0cjROOaLwn3eb2WLNtVBAM--ll-6t/exec";

export const LEAD_SOURCE = "Website";
