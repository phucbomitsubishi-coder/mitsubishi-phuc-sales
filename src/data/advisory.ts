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
  {
    number: "06",
    title: "So sánh Triton và Ford Ranger",
    description:
      "So sánh giá, động cơ, hộp số, hệ dẫn động 4WD, trang bị và bảo hành của hai mẫu bán tải phổ biến tại Việt Nam.",
    href: "/tu-van/so-sanh-triton-va-ford-ranger",
    carIds: ["triton"],
  },
  {
    number: "07",
    title: "So sánh Attrage và Toyota Vios",
    description:
      "So sánh giá, kích thước, khoảng sáng gầm, động cơ, mức tiêu thụ nhiên liệu và trang bị an toàn của hai mẫu sedan hạng B.",
    href: "/tu-van/so-sanh-attrage-va-toyota-vios",
    carIds: ["attrage"],
  },
  {
    number: "08",
    title: "So sánh Destinator và Toyota Innova Cross",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ turbo và hybrid, trang bị an toàn của hai mẫu xe gầm cao 7–8 chỗ.",
    href: "/tu-van/so-sanh-destinator-va-innova-cross",
    carIds: ["destinator"],
  },
  {
    number: "09",
    title: "So sánh Xpander Cross và Suzuki XL7",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ, mức tiêu thụ nhiên liệu và trang bị của hai mẫu 7 chỗ phong cách SUV.",
    href: "/tu-van/so-sanh-xpander-cross-va-suzuki-xl7",
    carIds: ["xpander-cross"],
  },
  {
    number: "10",
    title: "So sánh Xforce và Toyota Yaris Cross",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ xăng và hybrid, mức tiêu thụ nhiên liệu, trang bị an toàn của hai mẫu SUV cỡ B bán chạy.",
    href: "/tu-van/so-sanh-xforce-va-yaris-cross",
    carIds: ["xforce"],
  },
  {
    number: "11",
    title: "So sánh Triton và Toyota Hilux",
    description:
      "So sánh giá, giá lăn bánh, khoảng sáng gầm, động cơ dầu 2.4L và 2.8L, hộp số, hệ dẫn động 4WD và trang bị an toàn của hai mẫu bán tải Nhật.",
    href: "/tu-van/so-sanh-triton-va-toyota-hilux",
    carIds: ["triton"],
  },
  {
    number: "12",
    title: "So sánh Xpander và Toyota Avanza Premio",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, hộp số và trang bị an toàn từng phiên bản của hai mẫu MPV 7 chỗ giá dưới 700 triệu.",
    href: "/tu-van/so-sanh-xpander-va-toyota-avanza-premio",
    carIds: ["xpander"],
  },
  {
    number: "13",
    title: "So sánh Attrage và Hyundai Accent",
    description:
      "So sánh giá, giá lăn bánh, kích thước, động cơ, hộp số và trang bị từng phiên bản của hai mẫu sedan hạng B cho người mua xe lần đầu.",
    href: "/tu-van/so-sanh-attrage-va-hyundai-accent",
    carIds: ["attrage"],
  },
  {
    number: "14",
    title: "So sánh Xforce và Kia Seltos",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ 1.5L và 1.5 Turbo, trang bị an toàn từng phiên bản của hai mẫu SUV cỡ B 5 chỗ.",
    href: "/tu-van/so-sanh-xforce-va-kia-seltos",
    carIds: ["xforce"],
  },
  {
    number: "15",
    title: "So sánh Xpander và Kia Carens",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, hộp số và trang bị an toàn từng phiên bản của hai mẫu xe 7 chỗ gia đình dưới 700 triệu.",
    href: "/tu-van/so-sanh-xpander-va-kia-carens",
    carIds: ["xpander"],
  },
  {
    number: "16",
    title: "So sánh Destinator và Hyundai Santa Fe",
    description:
      "So sánh giá, giá lăn bánh, kích thước, khoảng sáng gầm, động cơ 1.5 turbo và 2.5L, trang bị an toàn của hai mẫu SUV 7 chỗ khác phân khúc.",
    href: "/tu-van/so-sanh-destinator-va-hyundai-santa-fe",
    carIds: ["destinator"],
  },
];
