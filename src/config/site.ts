export const siteConfig = {
  sales: {
    name: "Lưu Hoàng Phúc",
    title: "Tư vấn Kinh doanh Mitsubishi",
    phone: "0858678929",
    phoneDisplay: "0858 678 929",
    email: "phucbo.mitsubishi@gmail.com",
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
    tiktok:
      "https://www.tiktok.com/@phucbobinhduong",
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