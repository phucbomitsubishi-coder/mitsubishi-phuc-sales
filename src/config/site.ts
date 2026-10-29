export const siteConfig = {
  sales: {
    name: "Lưu Hoàng Phúc",
    title: "Tư vấn Kinh doanh Mitsubishi",
    phone: "0858678929",
    phoneDisplay: "0858 678 929",
    // Số phụ của anh Phúc, hiện ở trang Liên hệ; cũng là hotline nhận lịch bảo dưỡng (/dat-lich-bao-duong, 25/10/2026)
    phone2: "0967354821",
    phone2Display: "0967 354 821",
    email: "phucbo.mitsubishi@gmail.com",
    yearsOfExperience: 3,
    carsDelivered: "Gần 200",
  },

  hours: {
    display: "8:00 – 17:00, Thứ 2 – Thứ 7",
    afterHours: "Ngoài giờ hỗ trợ 24/7 qua điện thoại & Zalo",
    // Dùng cho dữ liệu cấu trúc (schema.org openingHoursSpecification)
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "17:00",
  },

  dealer: {
    brand: "Mitsubishi Motors",
    name: "Mitsubishi Moveo New City",
    address:
      "Lô C1C, Đường Hùng Vương, Phường Bình Dương, Thành phố Hồ Chí Minh",
    salesArea: "Bình Dương cũ (TP. Hồ Chí Minh mới)",
    // Điểm Google Maps của SHOWROOM (không phải đánh giá cá nhân), chỉ hiển thị dạng chữ, không đưa vào schema
    googleRating: { score: "5,0", count: 635 },
    // 3 showroom Phúc tiếp khách (anh Phúc xác nhận 29/10/2026; địa chỉ 2 điểm sau theo moveobinhduong.com.vn/lien-he).
    // Chỉ dùng cho lựa chọn nơi gặp trong form + trang Liên hệ; schema và footer vẫn chỉ ghi New City (nơi làm việc chính).
    // Không ghi hotline của showroom khác: khách liên hệ qua Phúc.
    showrooms: [
      { short: "Moveo New City", name: "Mitsubishi Moveo New City", address: "Lô C1C, Đường Hùng Vương, Phường Bình Dương, TP. Hồ Chí Minh" },
      { short: "Moveo Bình Dương", name: "Mitsubishi Moveo Bình Dương", address: "561A Đại lộ Bình Dương, Khu phố 1, Phường Thủ Dầu Một, TP. Hồ Chí Minh" },
      { short: "Moveo Thuận An", name: "Mitsubishi Moveo Thuận An", address: "Số 20 Đại lộ Bình Dương, Khu phố Tây, Phường Lái Thiêu, TP. Hồ Chí Minh" },
    ],
  },

  social: {
    zalo: "https://zalo.me/0858678929",
    facebook: "https://www.facebook.com/phuc.bo.413077",
    // Fanpage "Phúc Mitsubishi Auto" (dùng chạy quảng cáo)
    fanpage: "https://www.facebook.com/mitsubishimotorbinhduong",
    fanpageName: "Phúc Mitsubishi Auto",
    tiktok:
      "https://www.tiktok.com/@phucbobinhduong",
  },

  tracking: {
    // Meta Pixel (tập dữ liệu "mitsubishiauto.vn" trong Trình quản lý sự kiện của Fanpage)
    metaPixelId: "2239821823251751",
    // Google Analytics 4 (tài sản "mitsubishiauto.vn", luồng "Website"), tạo 28/10/2026; liên kết Google Ads khi bật quảng cáo
    gaMeasurementId: "G-8EWHTV0W7J",
  },

  contact: {
    phoneUrl: "tel:0858678929",
    zaloUrl: "https://zalo.me/0858678929",
    emailUrl: "mailto:phucbo.mitsubishi@gmail.com",
  },

  seo: {
    siteName: "Mitsubishi Lưu Hoàng Phúc",
    title:
      "Mitsubishi Bình Dương | Lưu Hoàng Phúc - Báo giá & Khuyến mãi",
    description:
      "Tư vấn xe Mitsubishi tại khu vực Bình Dương. Cập nhật giá xe, khuyến mãi, dự toán lăn bánh, hỗ trợ trả góp và đăng ký lái thử. Liên hệ Lưu Hoàng Phúc - 0858 678 929.",
  },
} as const;

export type SiteConfig = typeof siteConfig;