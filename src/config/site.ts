export const siteConfig = {
  sales: {
    name: "Lưu Hoàng Phúc",
    title: "Tư vấn Kinh doanh Mitsubishi",
    phone: "0858678929",
    phoneDisplay: "0858 678 929",
    // Số phụ của anh Phúc, hiện ở trang Liên hệ
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