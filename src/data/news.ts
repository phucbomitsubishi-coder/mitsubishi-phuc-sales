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
    id: "news-1790838921934",

    title: "Ảnh thực tế Mitsubishi Outlander PHEV 2026 tại ĐNÁ: SUV cỡ C mạnh 302 mã lực, chạy 100 km không tốn xăng",

    slug: "anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang",

    category: "Tin Mitsubishi",

    excerpt:
      "Thương hiệu xe Nhật Bản vừa chính thức trình làng mẫu SUV Mitsubishi Outlander PHEV phiên bản mới tại thị trường Đông Nam Á.",

    publishedAt: "2026-10-01",

    image: "/images/news/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang.jpg",

    featured: true,

    content: [
      {
        heading: "Ảnh thực tế Mitsubishi Outlander PHEV 2026 tại ĐNÁ: SUV cỡ C mạnh 302 mã lực, chạy 100 km không tốn xăng",
        paragraphs: [
          "Ở thế hệ mới, Mitsubishi Outlander PHEV sở hữu kích thước tổng thể với chiều dài 4.710 mm, rộng 1.862 mm, cao 1.740 mm và chiều dài cơ sở đạt 2.706 mm, đi cùng khoảng sáng gầm xe khoảng 210 mm. Các thông số này đều gia tăng đáng kể so với thế hệ trước đó. Xe tiếp tục duy trì kết cấu 3 hàng ghế dạng 5+2, trong đó hàng ghế thứ ba có khả năng gập phẳng để mở rộng không gian chứa đồ.",
          "Ngoại thất của xe ghi nhận sự thay đổi toàn diện theo ngôn ngữ thiết kế Dynamic Shield hiện đại, mang nhiều nét tương đồng với mẫu MPV Xpander. Phần đầu xe nổi bật với dải đèn LED định vị ban ngày đặt cao, cụm đèn chiếu sáng chính LED được di chuyển xuống vị trí thấp hơn.",
          "Bên trong khoang cabin, mẫu SUV cỡ C này được tích hợp nhiều trang bị hiện đại như: màn hình cảm ứng trung tâm 12,3 inch kết nối Apple CarPlay/Android Auto không dây, bảng đồng hồ kỹ thuật số, màn hình hiển thị thông tin trên kính lái (HUD), đế sạc không dây, hệ thống âm thanh Yamaha, điều hòa tự động 3 vùng độc lập và cửa sổ trời toàn cảnh.",
          "Điểm đáng chú ý của Outlander PHEV 2026 là hệ thống plug-in hybrid gồm động cơ xăng MIVEC 2.4L, hai mô-tơ điện và bộ pin dung lượng 22,7 kWh.",
          "Cấu hình này tạo ra tổng công suất 302 mã lực cùng mô-men xoắn cực đại 450 Nm. Theo Mitsubishi, xe có thể di chuyển khoảng 100 km chỉ bằng năng lượng điện, trong khi phạm vi vận hành kết hợp giữa động cơ xăng và mô-tơ điện đạt gần 1.000 km.",
          "Hệ truyền động được kết hợp với hệ thống Super All-Wheel Control (S-AWC), công nghệ dẫn động 4 bánh đặc trưng của Mitsubishi. Hệ thống có khả năng điều phối lực kéo giữa các bánh xe, đồng thời phối hợp với Active Yaw Control và những công nghệ kiểm soát ổn định khác để duy trì độ bám đường trong các điều kiện vận hành khác nhau.",
          "Về an toàn, Outlander PHEV được trang bị gói Mitsubishi Safety Sensing với nhiều chức năng hỗ trợ người lái.",
          "Hệ thống bao gồm công nghệ giảm thiểu va chạm phía trước, cảnh báo điểm mù, hỗ trợ chuyển làn, cảnh báo phương tiện cắt ngang phía sau và cảnh báo chệch làn. Xe cũng có tính năng theo dõi sự chú ý của người lái nhằm phát hiện dấu hiệu mất tập trung trong quá trình vận hành.",
          "Ngoài ra, Mitsubishi trang bị hệ thống túi khí cho hành khách và camera quan sát 360 độ, hỗ trợ người lái khi di chuyển hoặc đỗ xe trong không gian hẹp.",
          "Tại Philippines, Mitsubishi Outlander PHEV 2026 có giá niêm yết 2,848 triệu peso (1,2 tỷ VNĐ).",
        ],
      },
    ],

    source: {
      name: "XeHay",
      url: "https://xehay.vn/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang.html",
    },
  },

  {
    id: "news-1790836010186",

    title: "Mitsubishi Outlander thế hệ mới có thể ra mắt vào năm 2028",

    slug: "mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028",

    category: "Tin Mitsubishi",

    excerpt:
      "Mitsubishi Outlander thế hệ thứ tư được giới thiệu từ năm 2021 và vẫn duy trì doanh số khá tốt. Tuy nhiên, thế hệ hoàn toàn mới có thể xuất hiện trong khoảng hai năm tới, với thiết kế được làm mới mạnh mẽ cùng hệ truyền động hybrid cắm sạc (PHEV) cải tiến. Những thay đổi này được kỳ vọng sẽ giúp...",

    publishedAt: "2026-10-01",

    image: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028.jpg",

    featured: false,

    content: [
      {
        heading: "Mitsubishi Outlander thế hệ mới có thể ra mắt vào năm 2028",
        paragraphs: [
          "Mitsubishi Outlander thế hệ thứ tư được giới thiệu từ năm 2021 và vẫn duy trì doanh số khá tốt. Tuy nhiên, thế hệ hoàn toàn mới có thể xuất hiện trong khoảng hai năm tới, với thiết kế được làm mới mạnh mẽ cùng hệ truyền động hybrid cắm sạc (PHEV) cải tiến. Những thay đổi này được kỳ vọng sẽ giúp Outlander tăng sức hút và cạnh tranh tốt hơn trong phân khúc.",
          "Outlander hiện vẫn là một trong những mẫu xe quan trọng của Mitsubishi, đặc biệt tại thị trường Mỹ. Trong năm ngoái, hãng bán được 35.895 chiếc Outlander, giảm so với mức 45.253 xe của năm trước đó nhưng vẫn đủ để mẫu SUV này giữ vị trí xe bán chạy nhất của Mitsubishi tại thị trường này.",
          "Theo một báo cáo từ Nhật Bản, Outlander thế hệ thứ năm có thể lấy cảm hứng thiết kế từ Elevance Concept, mẫu xe ý tưởng Mitsubishi giới thiệu vào năm ngoái. Dù có kích thước và kiểu dáng tổng thể tương đồng với Outlander hiện tại, Elevance Concept sở hữu diện mạo hoàn toàn mới, có thể trở thành nền tảng thiết kế cho thế hệ tiếp theo.",
          "Một số chi tiết từ Elevance Concept được cho là có khả năng xuất hiện trên phiên bản thương mại, trong đó đáng chú ý là cụm đèn pha và đèn LED ban ngày được thiết kế mới, tạo hiệu ứng kéo dài xuống khu vực mặt trước. Xe cũng có thể được trang bị lưới tản nhiệt đồng màu thân xe.",
          "Elevance Concept từng gây chú ý với phần cửa sổ bên có kích thước lớn. Tuy nhiên, chi tiết này nhiều khả năng sẽ không được giữ lại trên Outlander thương mại.",
          "Ở phía sau, nếu tiếp tục phát triển theo phong cách của mẫu concept, Outlander thế hệ mới có thể sở hữu dải đèn LED kéo dài toàn chiều rộng đuôi xe, kết hợp cụm đèn hậu mới kéo dài lên trụ D và hai bên thân xe.",
          "Đáng chú ý hơn thiết kế ngoại thất sẽ là hệ truyền động trên Outlander 2028. Phiên bản PHEV hiện tại sử dụng động cơ xăng 4 xi-lanh hút khí tự nhiên 2.4L, kết hợp hai mô-tơ điện và bộ pin lithium-ion dung lượng 22,7 kWh.",
          "Hệ thống này cho công suất tổng cộng 297 mã lực và mô-men xoắn 450 Nm, đồng thời cho phép xe di chuyển hoàn toàn bằng điện tối đa khoảng 106 km theo thông số được đề cập.",
          "Với thế hệ thứ năm, Mitsubishi được cho là có thể bổ sung thêm hai mô-tơ điện, nâng tổng số lên bốn mô-tơ. Không chỉ gia tăng công suất, cấu hình này còn có thể đóng vai trò quan trọng trong hệ thống Super All-Wheel Control (S-AWC) thế hệ mới.",
          "Công nghệ này từng được Mitsubishi giới thiệu trên Elevance Concept, với khả năng phân bổ lực kéo chính xác tới từng bánh xe, qua đó hỗ trợ cải thiện khả năng kiểm soát và vận hành của Outlander thế hệ mới",
        ],
      },
    ],

    source: {
      name: "Autodaily - Cộng đồng xe Việt Nam",
      url: "https://forum.autodaily.vn/threads/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028.57647/",
    },
  },

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
