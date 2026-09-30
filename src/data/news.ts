export type NewsCategory =
  | "Tin Mitsubishi"
  | "Khuyến mãi"
  | "Tư vấn mua xe"
  | "Kinh nghiệm sử dụng"
  | "Thị trường ô tô";

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  excerpt: string;
  publishedAt: string;
  image: string;
  featured?: boolean;

  content: {
    heading?: string;
    paragraphs: string[];
  }[];

  source?: {
    name: string;
    url: string;
  };
};

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1790758742014",

    title: "Khuyến mãi Mitsubishi tháng 09/2026: Ưu đãi phí trước bạ và nhiều quà tặng",

    slug: "khuyen-mai-mitsubishi-thang-09-2026-uu-dai-phi-truoc-ba-va-nhieu-qua-tang",

    category: "Khuyến mãi",

    excerpt:
      "Cập nhật chương trình ưu đãi Mitsubishi tháng 09/2026 dành cho Destinator, Xpander, Xpander Cross, Xforce, Attrage và All-New Triton, với hỗ trợ phí trước bạ, phiếu nhiên liệu và quà tặng tùy phiên bản.",

    publishedAt: "2026-09-30",

    image: "/images/hero/hero-main.jpg",

    featured: true,

    content: [
      {
        heading: "Ưu đãi Mitsubishi tháng 09/2026 có gì đáng chú ý?",
        paragraphs: [
          "Trong tháng 09/2026, Mitsubishi Motors Việt Nam phối hợp cùng hệ thống Nhà Phân phối ủy quyền triển khai chương trình ưu đãi dành cho nhiều mẫu xe gồm Destinator, Xpander, Xpander Cross, Xforce, Attrage và All-New Triton. Tùy từng mẫu xe và phiên bản, khách hàng có thể nhận hỗ trợ tương đương một phần hoặc toàn bộ phí trước bạ, phiếu nhiên liệu và một số quà tặng khác.",
        ],
      },
      {
        heading: "Một số mức ưu đãi nổi bật",
        paragraphs: [
          "Theo chương trình công bố tháng 09/2026, Destinator Premium MY2026 được ưu đãi tương đương 100% phí trước bạ, khoảng 78 triệu đồng; Xpander AT Premium MY2026 được hỗ trợ tương đương 100% phí trước bạ, khoảng 66 triệu đồng, kèm phiếu nhiên liệu khoảng 24 triệu đồng; Xpander Cross MY2026 được hỗ trợ tương đương 100% phí trước bạ, khoảng 70 triệu đồng, kèm phiếu nhiên liệu khoảng 20 triệu đồng. Với Xforce MY2026, các phiên bản GLX, Luxury và Ultimate đều có chương trình hỗ trợ tương đương 100% phí trước bạ, với giá trị ước tính khác nhau theo từng phiên bản.",
        ],
      },
      {
        heading: "Ưu đãi Attrage và All-New Triton",
        paragraphs: [
          "Attrage MT MY2026 được hỗ trợ tương đương 100% phí trước bạ trị giá 38 triệu đồng, kèm phiếu nhiên liệu khoảng 8 triệu đồng và camera lùi trị giá 2,5 triệu đồng. Attrage CVT Premium MY2026 được hỗ trợ tương đương 50% phí trước bạ trị giá 24,5 triệu đồng, kèm phiếu nhiên liệu khoảng 11 triệu đồng và ăngten vây cá. Với All-New Triton MY2026, các phiên bản trong chương trình được hỗ trợ tương đương 100% phí trước bạ; tùy phiên bản còn có phiếu nhiên liệu hoặc gói quà tặng phụ kiện.",
        ],
      },
      {
        heading: "Lưu ý khi tham khảo chương trình ưu đãi",
        paragraphs: [
          "Các mức hỗ trợ phí trước bạ và quà tặng trong bài được tổng hợp theo chương trình Mitsubishi tháng 09/2026 và có thể khác nhau tùy mẫu xe, phiên bản, địa phương cũng như điều kiện áp dụng thực tế. Phí trước bạ trong chương trình được ước tính tối đa 10%. Khách hàng nên liên hệ trực tiếp Lưu Hoàng Phúc để kiểm tra xe còn sẵn, ưu đãi áp dụng tại thời điểm mua xe, giá lăn bánh dự kiến và phương án trả góp phù hợp trước khi đặt cọc.",
        ],
      }
    ],
    source: {
      name: "Mitsubishi Motors Việt Nam",
      url: "https://www.mitsubishi-motors.com.vn/tin-tuc/chuong-trinh-khuyen-mai-mua-xe-thang-092026-n154227.html",
    },
  },

  {
    id: "news-001",

    title: "Kinh nghiệm chọn xe Mitsubishi phù hợp với nhu cầu sử dụng",

    slug: "kinh-nghiem-chon-xe-mitsubishi-phu-hop",

    category: "Tư vấn mua xe",

    excerpt:
      "Một số tiêu chí quan trọng giúp khách hàng xác định mẫu xe Mitsubishi phù hợp với nhu cầu gia đình, công việc và ngân sách.",

    publishedAt: "2026-09-30",

    image: "/images/hero/hero-main.jpg",

    featured: false,

    content: [
      {
        heading: "Xác định nhu cầu sử dụng",
        paragraphs: [
          "Trước khi lựa chọn xe, người mua nên xác định rõ nhu cầu sử dụng chính như đi lại hằng ngày, phục vụ gia đình, đi đường dài hay kết hợp công việc.",
          "Số lượng người thường xuyên sử dụng xe, điều kiện đường sá và nhu cầu chở hành lý cũng là những yếu tố cần cân nhắc.",
        ],
      },
      {
        heading: "Xác định ngân sách",
        paragraphs: [
          "Ngoài giá mua xe, khách hàng nên tính thêm chi phí lăn bánh và các khoản chi phí sử dụng sau khi nhận xe.",
          "Nếu có nhu cầu vay ngân hàng, việc xác định trước số tiền trả trước và khả năng thanh toán hằng tháng sẽ giúp lựa chọn phương án phù hợp hơn.",
        ],
      },
      {
        heading: "So sánh mẫu xe và phiên bản",
        paragraphs: [
          "Các mẫu xe và phiên bản khác nhau có thể khác biệt về trang bị, tính năng và mức giá. Người mua nên ưu tiên những trang bị thực sự phù hợp với nhu cầu sử dụng thay vì chỉ dựa vào giá bán.",
        ],
      },
      {
        heading: "Nên xem xe và lái thử trước khi quyết định",
        paragraphs: [
          "Việc xem xe thực tế và trải nghiệm lái thử giúp khách hàng đánh giá rõ hơn về không gian, vị trí lái, khả năng quan sát và cảm giác vận hành trước khi đưa ra quyết định.",
        ],
      },
    ],
  },
];

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
