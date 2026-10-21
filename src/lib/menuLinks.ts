// Danh sách link của các mục menu "Mua xe" và "Dịch vụ" (dùng chung menu máy tính và điện thoại)
export type MenuLink = { href: string; label: string; external?: boolean };

export const buyLinks: MenuLink[] = [
  { href: "/bang-gia-xe-mitsubishi", label: "Bảng giá" },
  { href: "/du-toan/gia-lan-banh", label: "Tính giá lăn bánh" },
  { href: "/du-toan/tra-gop", label: "Dự tính trả góp" },
  { href: "/dang-ky-lai-thu", label: "Đăng ký lái thử" },
  { href: "/thu-cu-doi-moi", label: "Chương trình thu cũ đổi mới" },
  { href: "/xe-cu", label: "Xe đã qua sử dụng" },
  { href: "/mua-xe-mitsubishi-toan-quoc", label: "Mua xe từ tỉnh khác" },
  { href: "/phu-kien-xe-mitsubishi", label: "Phụ kiện" },
  { href: "/tu-van", label: "So sánh xe" },
];

// "Dịch vụ" (21/10/2026, theo menu MMV): các trang /ho-tro giữ nguyên đường dẫn; tra cứu triệu hồi dẫn sang trang MMV
export const serviceLinks: MenuLink[] = [
  { href: "/ho-tro/chinh-sach-bao-hanh", label: "Chính sách bảo hành" },
  { href: "/ho-tro/bao-hanh-mo-rong", label: "Bảo hành mở rộng" },
  { href: "/ho-tro/bao-duong-dinh-ky", label: "Bảo dưỡng định kỳ" },
  { href: "/ho-tro/huong-dan-su-dung", label: "Hướng dẫn sử dụng" },
  { href: "/ho-tro/cau-hoi-thuong-gap", label: "Câu hỏi thường gặp" },
  { href: "https://www.mitsubishi-motors.com.vn/dich-vu/kiem-tra-trieu-hoi", label: "Tra cứu triệu hồi", external: true },
];
