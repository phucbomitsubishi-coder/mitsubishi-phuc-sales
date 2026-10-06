// Danh sách bài tư vấn (/tu-van/...). Dùng chung cho trang /tu-van, khối "Tư vấn chọn xe"
// trên /tin-tuc và trang xe (bài có `carIds` chứa id xe sẽ hiện trên trang xe đó).
// Thêm bài tư vấn mới: thêm vào đây và vào src/app/sitemap.ts.

export type AdvisoryArticle = {
  number: string;
  title: string;
  description: string;
  href: string;
  carIds?: string[];
};

export const advisoryArticles: AdvisoryArticle[] = [
  {
    number: "01",
    title: "Chọn xe Mitsubishi phù hợp",
    description:
      "Gợi ý lựa chọn mẫu xe theo nhu cầu gia đình, công việc, số chỗ ngồi và mục đích sử dụng.",
    href: "/tu-van/chon-xe-mitsubishi-phu-hop",
  },
  {
    number: "02",
    title: "Chọn phiên bản xe Mitsubishi",
    description:
      "So sánh và tham khảo các phiên bản để lựa chọn trang bị và mức giá phù hợp với nhu cầu.",
    href: "/tu-van/chon-phien-ban-xe-mitsubishi",
  },
  {
    number: "03",
    title: "Chi phí lăn bánh Mitsubishi",
    description:
      "Tìm hiểu các khoản chi phí cần chuẩn bị khi mua xe và tham khảo tổng chi phí lăn bánh.",
    href: "/tu-van/chi-phi-lan-banh-mitsubishi",
  },
  {
    number: "04",
    title: "So sánh Xforce và Hyundai Creta",
    description:
      "So sánh giá, kích thước, khoảng sáng gầm, động cơ và trang bị để chọn đúng mẫu SUV cỡ B cho nhu cầu.",
    href: "/tu-van/so-sanh-xforce-va-creta",
    carIds: ["xforce"],
  },
  {
    number: "05",
    title: "So sánh Xpander và Toyota Veloz Cross",
    description:
      "So sánh giá, không gian, khoảng sáng gầm, hộp số và trang bị an toàn của hai mẫu MPV 7 chỗ phổ biến.",
    href: "/tu-van/so-sanh-xpander-va-veloz-cross",
    carIds: ["xpander", "xpander-cross"],
  },
];
