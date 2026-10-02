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
    images?: {
      src: string;
      alt?: string;
      caption?: string;
    }[];
  }[];

  source?: {
    name: string;
    url: string;
  };
};

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1790904201775",

    title: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",

    slug: "mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton",

    category: "Tin Mitsubishi",

    excerpt:
      "Thông tin mới từ Cục Đăng kiểm Việt Nam đang làm dấy lên đồn đoán Mitsubishi Attrage sắp có bản nâng cấp mới tại thị trường trong nước.",

    publishedAt: "2026-10-02",

    image: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton.jpg",

    featured: false,

    content: [
      {
        heading: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",

        paragraphs: [
          "Thông tin mới từ Cục Đăng kiểm Việt Nam đang làm dấy lên đồn đoán Mitsubishi Attrage sắp có bản nâng cấp mới tại thị trường trong nước.",
          "Cục Đăng kiểm Việt Nam mới công bố dữ liệu nhãn năng lượng dành cho hai phiên bản Mitsubishi Attrage mang tên GLX và GLS-P. Hồ sơ này do Công ty TNHH Ô tô Mitsubishi Việt Nam cung cấp.",
          "Theo dữ liệu được công bố, Mitsubishi Attrage GLX ghi nhận mức tiêu thụ nhiên liệu trung bình ở mức 5,32 lít/100km, trong khi bản GLS-P có chỉ số tương ứng là 5,34 lít/100km. Mức tiêu thụ này gần như tương đồng với con số 5,3 lít/100km trên dải sản phẩm hiện hành. Cả hai phiên bản mới tiếp tục được trang bị khối động cơ xăng 1.2L 3 xi-lanh (mã 3A92), sản sinh công suất tối đa 77 mã lực cùng mô-men xoắn cực đại 100 Nm.",
          "Mặc dù Mitsubishi Việt Nam chưa đưa ra thông báo chính thức về thời điểm ra mắt phiên bản mới, động thái cập nhật hồ sơ đăng kiểm kết hợp cùng hoạt động kích cầu tại các đại lý cho thấy ngày mở bán Attrage mới không còn xa.",
          "Hiện tại, giá niêm yết của Attrage đang dao động từ 380 triệu đồng cho bản số sàn đến 490 triệu đồng cho bản AT Premium. Tuy nhiên, nhiều đại lý đang áp dụng mức ưu đãi sâu cho các lô xe sản xuất năm 2025 (VIN 2025), đưa giá bán thực tế xuống mốc khoảng 300 triệu đồng. Khoảng giá này đưa mẫu sedan hạng B của Mitsubishi tiệm cận trực tiếp với nhóm xe đô thị cỡ A như Kia Morning, Toyota Wigo hay Hyundai Grand i10.",
          "Trước đó, vào đầu tháng 7 năm nay, phiên bản nâng cấp của Mitsubishi Attrage đã chính thức ra mắt thị trường Thái Lan. Bước sang đời mới, thiết kế tổng thể của xe nhận được một số cải tiến thị giác dù khung gầm cơ sở đã trải qua chặng đường phát triển gần 15 năm.",
          "Điểm thay đổi dễ nhận thấy nhất nằm ở phần đầu xe. Attrage 2026 sở hữu thiết kế Dynamic Shield được tinh chỉnh với nhiều chi tiết sơn đen hơn trước, kết hợp lưới tản nhiệt hình lục giác mới. Cụm đèn pha cũng được thiết kế lại để đồng bộ với diện mạo phía trước, trong khi bộ mâm hợp kim sở hữu kiểu dáng mới.",
          "Tại Thái Lan, Mitsubishi Attrage được phân phối với hai phiên bản gồm Active và Smart.",
          "Phiên bản Active được trang bị đèn pha halogen dạng chóa phản xạ, đèn hậu LED, gương chiếu hậu chỉnh điện, các chi tiết ốp nội thất màu đen bóng kết hợp họa tiết vân carbon, cụm đồng hồ analog tích hợp màn hình hiển thị đa thông tin và điều hòa chỉnh tay.",
          "Xe còn được trang bị vô-lăng đa chức năng, màn hình cảm ứng 7 inch hỗ trợ Apple CarPlay và Android Auto, ghế bọc vải, chìa khóa thông minh cùng bộ mâm thép kích thước 14 inch.",
          "Trong khi đó, phiên bản Smart được bổ sung nhiều tiện nghi hơn với cụm đèn pha LED tự động tích hợp đèn định vị ban ngày, đèn báo rẽ trên gương chiếu hậu, vô-lăng và cần số bọc da, điều hòa tự động, hệ thống kiểm soát hành trình, gương chiếu hậu chống chói tự động, ghế bọc da tổng hợp, khởi động bằng nút bấm, camera lùi và bộ mâm hợp kim hai tông màu kích thước 15 inch.",
          "Trang bị an toàn tiêu chuẩn trên cả hai phiên bản của Mitsubishi Attrage 2026 gồm hai túi khí, hệ thống chống bó cứng phanh ABS, phân bổ lực phanh điện tử EBD, cân bằng điện tử, kiểm soát lực kéo và hỗ trợ khởi hành ngang dốc.",
          "Ngoài các tính năng cơ bản, Attrage còn được bổ sung một số hệ thống hỗ trợ người lái. Phiên bản Active được trang bị camera ADAS với chức năng cảnh báo va chạm phía trước và cảnh báo chệch làn đường.",
          "Trong khi đó, phiên bản Smart được trang bị hệ thống giảm thiểu va chạm phía trước hoạt động ở dải tốc độ thấp, đồng thời bổ sung cảm biến radar hỗ trợ giảm thiểu tình huống đạp nhầm chân ga trong phạm vi khoảng 4 m phía trước xe.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-01.jpg",
            alt: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-02.jpg",
            alt: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-03.jpg",
            alt: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-04.jpg",
            alt: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-05.jpg",
            alt: "Mitsubishi Attrage mới lộ thông số tiêu thụ nhiên liệu tại Việt Nam, đại lý mạnh tay ưu đãi xả hàng tồn",
          },
        ],
      },
    ],

    source: {
      name: "xehay.vn",
      url: "https://xehay.vn/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton.html",
    },
  },

  {
    id: "news-1790872088537",

    title: "CHƯƠNG TRÌNH KHUYẾN MÃI MUA XE THÁNG 10/2026 - Mitsubishi Motors Việt Nam",

    slug: "chuong-trinh-khuyen-mai-mua-xe-thang-10-2026-mitsubishi-motors-viet-nam",

    category: "Khuyến mãi",

    excerpt:
      "Trong tháng 10/2026, Mitsubishi Motors Việt Nam phối hợp cùng hệ thống NPP ủy quyền toàn quốc triển khai chương trình ưu đãi cùng nhiều quà tặng giá trị…",

    publishedAt: "2026-10-01",

    image: "/images/news/chuong-trinh-khuyen-mai-mua-xe-thang-10-2026-mitsubishi-motors-viet-nam.jpg",

    featured: true,

    content: [
      {
        heading: "CHƯƠNG TRÌNH KHUYẾN MÃI MUA XE THÁNG 10/2026 - Mitsubishi Motors Việt Nam",

        paragraphs: [
          "Trong tháng 10/2026, Mitsubishi Motors Việt Nam phối hợp cùng hệ thống NPP ủy quyền toàn quốc triển khai chương trình ưu đãi cùng nhiều quà tặng giá trị dành cho khách hàng mua xe Destinator, Xpander, Xpander Cross, Xforce, Attrage và All New Triton.",
          "DESTINATOR",
          "[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\nPremium | 2026 | 780.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)\nUltimate | 2026 | 855.000.000 | – Ưu đãi tương đương 50% phí trước bạ (~ 43 triệu VNĐ) – Phiếu nhiên liệu (~ 25 triệu VNĐ)\n[/TABLE]",
          "XPANDER",
          "[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\nMT | 2026 | 568.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 57 triệu VNĐ) – Phiếu nhiên liệu (~ 10 triệu VNĐ)\nAT | 2026 | 598.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 59 triệu VNĐ) – Phiếu nhiên liệu (~ 36 triệu VNĐ)\nAT Premium | 2026 | 659.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ) – Phiếu nhiên liệu (~ 24 triệu VNĐ)\n[/TABLE]",
          "XPANDER CROSS",
          "[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\nXpander Cross | 2026 | 699.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 70 triệu VNĐ) – Phiếu nhiên liệu (~ 20 triệu VNĐ)\n[/TABLE]",
          "XFORCE",
          "[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\nGLX | 2026 | 605.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 60 triệu VNĐ)\nLuxury | 2026 | 665.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ)\nUltimate | 2026 | 720.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 72 triệu VNĐ)\n[/TABLE]",
          "ATTRAGE",
          "[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\nMT | 2026 | 380.000.000 | – Ưu đãi tương đương 100% phí trước bạ (38 triệu VNĐ) – Phiếu nhiên liệu (~ 8 triệu VNĐ) – Camera lùi (2,5 triệu VNĐ)\nCVT Premium | 2026 | 490.000.000 | – Ưu đãi tương đương 50% phí trước bạ (24,5 triệu VNĐ) – Phiếu nhiên liệu (~ 11 triệu VNĐ) – Ăngten vây cá (1,5 triệu VNĐ)\n[/TABLE]",
          "ALL NEW TRITON\n[TABLE]\nPhiên bản | Năm sản xuất | Giá bán lẻ (VNĐ) | Ưu đãi\n2WD AT GLX | 2026 | 655.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 39 triệu VNĐ) – Phiếu nhiên liệu (~ 10 triệu VNĐ)\n2WD AT Premium | 2026 | 782.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ)\n4WD AT Premium | 2026 | 782.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ) – Gói quà tặng phụ kiện (~ 12 triệu VNĐ)\n4WD AT Athlete | 2026 | 924.000.000 | – Ưu đãi tương đương 100% phí trước bạ (~ 56 triệu VNĐ)\n[/TABLE]",
          "(*) Phí trước bạ được ước tính tối đa 10% và có thể thay đổi theo từng dòng xe và địa phương.",
          "(**) Chương trình ưu đãi từ NPP, để biết thêm chi tiết về điều kiện, điều khoản áp dụng, quý khách hàng vui lòng liên hệ Nhà Phân phối ủy quyền gần nhất.",
          "Công ty TNHH Ô tô Mitsubishi Việt Nam được thành lập năm 1994, là nhà phân phối chính thức của Mitsubishi Motors Nhật Bản tại Việt Nam và là một trong những công ty liên doanh sản xuất và phân phối ô tô đầu tiên tại Việt Nam.",
          "Trải qua hơn 30 năm “Vững tiến mỗi hành trình” cùng người Việt, Mitsubishi Motors Việt Nam luôn đổi mới, mang đến các mẫu xe tối ưu cho địa hình và thời tiết Việt Nam, đảm bảo An toàn, An tâm và Thoải mái. Chúng tôi không ngừng cải tiến sản phẩm lẫn dịch vụ nhằm tạo ra trải nghiệm hài lòng nhất cho khách hàng. Mitsubishi Motors Việt Nam cam kết là người bạn đồng hành tin cậy, khơi dậy tinh thần phiêu lưu và chinh phục mọi thử thách.",
        ],
      },
    ],

    source: {
      name: "Mitsubishi Motors Việt Nam",
      url: "https://www.mitsubishi-motors.com.vn/tin-tuc/chuong-trinh-khuyen-mai-mua-xe-thang-102026-n154227.html",
    },
  },

  

  

  {
    id: "news-1790842128387",

    title: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",

    slug: "mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc",

    category: "Tin Mitsubishi",

    excerpt:
      "Sau thời gian dài vắng bóng, Mitsubishi Pajero thế hệ mới sẽ tái xuất với vị trí là mẫu SUV đầu bảng của Mitsubishi tại Đông Nam Á, nằm trên Pajero Sport trong danh mục sản phẩm.",

    publishedAt: "2026-10-01",

    image: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc.jpg",

    featured: false,

    content: [
      {
        heading: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",

        paragraphs: [
          "Sau thời gian dài vắng bóng, Mitsubishi Pajero thế hệ mới sẽ tái xuất với vị trí là mẫu SUV đầu bảng của Mitsubishi tại Đông Nam Á, nằm trên Pajero Sport trong danh mục sản phẩm.",
          "Theo kế hoạch, xe sẽ chính thức ra mắt vào ngày 19/10 với ba phiên bản gồm GLS 2WD, GSR 2WD và Super Exceed 4WD. Xe có giá dự kiến nằm trong khoảng 1,6 - 1,9 triệu baht (khoảng 1,23 - 1,47 tỷ VNĐ).",
          "Mitsubishi Pajero thế hệ mới tiếp tục được phát triển trên hệ thống khung gầm rời (body-on-frame), dựa trên nền tảng Triton nhưng được gia cố và tinh chỉnh lại nhằm đáp ứng yêu cầu của một mẫu SUV cỡ lớn.",
          "Chiều dài tổng thể của xe đạt 4.920 mm, chiều rộng 1.925 mm, chiều cao dao động từ 1.900 đến 1.910 mm cùng chiều dài cơ sở 2.870 mm. Xe sở hữu khoảng sáng gầm 230 mm, kèm các góc tiếp cận, góc vượt đỉnh dốc và góc thoát lần lượt là 30,4 độ, 22,6 độ và 25,8 độ.",
          "Không gian nội thất của Pajero được thiết kế theo cấu hình ba hàng ghế với tổng cộng 7 chỗ ngồi. Đáng chú ý, phiên bản GLS tiêu chuẩn đã có bảng đồng hồ kỹ thuật số và màn hình giải trí trung tâm cùng kích thước 12,3 inch.",
          "Hệ thống giải trí hỗ trợ Apple CarPlay và Android Auto không dây. Các trang bị tiện dụng khác gồm sạc điện thoại không dây, cổng USB Type-C và dàn âm thanh 6 loa.",
          "Hàng ghế thứ hai có khả năng trượt 150 mm, đồng thời có thể gập theo tỷ lệ 60:40. Hàng ghế cuối chia theo tỷ lệ 50:50, cho phép mở rộng khoang hành lý khi không sử dụng đủ 7 vị trí ngồi.",
          "Về an toàn, Pajero GLS sở hữu một loạt công nghệ hỗ trợ người lái ngay từ phiên bản đầu tiên. Danh sách này gồm kiểm soát hành trình thích ứng, cảnh báo điểm mù, hỗ trợ chuyển làn, hỗ trợ giữ làn và cảnh báo lệch làn.",
          "Hệ thống cũng có khả năng cảnh báo và giảm thiểu nguy cơ va chạm phía trước, nhận diện phương tiện cắt ngang ở phía trước và phía sau. Camera quan sát 360 độ cùng 7 túi khí được trang bị tiêu chuẩn.",
          "Nếu GLS tập trung vào những trang bị thiết yếu, GSR được Mitsubishi bổ sung thêm một số tiện nghi và tính năng cao cấp hơn. Phiên bản này sử dụng mâm 20 inch phối hai tông màu, đèn LED thích ứng và hệ thống đèn Dynamic Flow Light ở cả phía trước và phía sau.",
          "Khoang cabin GSR có điều hòa hai vùng độc lập, hệ thống lọc không khí Nanoe-X, ghế và vô-lăng tích hợp nhớ vị trí. Tựa lưng ghế chỉnh điện và một hộp làm mát được bố trí bên trong bệ tỳ tay trung tâm.",
          "Hệ thống âm thanh trên GSR cũng được nâng cấp lên Yamaha Dynamic Sound Ultimate với 12 loa.",
          "Đối với bản Super Exceed 4WD cao cấp nhất, xe sẽ được nhận diện bằng bộ mâm riêng, lưới tản nhiệt dạng tổ ong và các chi tiết bảo vệ phần gầm. Nội thất sử dụng tông màu đen kết hợp nâu.",
          "Bản này có thêm cửa sổ trời toàn cảnh, ghế da Semi-Aniline tích hợp thông gió, gương chiếu hậu kỹ thuật số, kết nối Mitsubishi CONNECT và hệ thống hỗ trợ lái MI-PILOT.",
          "Điểm khác biệt lớn nhất của Super Exceed nằm ở hệ thống S-AWC. Người lái có thể lựa chọn các cấu hình 2H, 4H, 4HLC và 4LLC tùy điều kiện vận hành.",
          "Hệ thống này đi kèm 7 chế độ lái gồm Eco, Normal, Gravel, Snow, Mud, Sand và Rock. Các thiết lập được Mitsubishi thiết kế để hỗ trợ xe khi di chuyển trên đường thông thường cũng như các bề mặt có độ bám thấp hoặc địa hình phức tạp.",
          "Cả 3 phiên bản của Pajero mới đều mang trong mình khối động cơ diesel 4 cylinder 2.4L mã hiệu 4N16, tích hợp bộ tăng áp VGT Wide-Range. Cấu hình này sản sinh công suất cực đại 204 mã lực tại 3.500 vòng/phút và mô-men xoắn tối đa 480 Nm tại dải vòng tua 1.750 - 2.500 vòng/phút. Sức mạnh động cơ truyền tới bánh xe thông qua hộp số tự động 8 cấp có chế độ thể thao cùng lẫy chuyển số tích hợp sau vô-lăng. Biến thể GLS và GSR sử dụng hệ dẫn động cầu sau, trong khi bản Super Exceed sở hữu hệ dẫn động 4 bánh S-AWC.",
          "Dù phát triển trên nền tảng máy dầu 2.4L tương tự dòng bán tải Triton, động cơ của Pajero đã được tái thiết kế nhiều linh kiện bên trong, cải tiến bộ tăng áp và tinh chỉnh lại các thông số. Nhờ đó, lực kéo của xe tăng thêm 10 Nm so với Triton, đồng thời hộp số cũng được nâng cấp từ 6 cấp lên 8 cấp. Đáng chú ý, phiên bản phân phối tại Thái Lan không cần sử dụng dung dịch AdBlue mà vẫn đáp ứng đầy đủ các tiêu chí về khí thải tại thị trường này.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-01.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-02.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-03.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-04.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-05.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-06.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-07.jpg",
            alt: "Mitsubishi Pajero 2026 sẽ ra mắt Đông Nam Á vào tháng 10: Có 3 phiên bản, máy diesel 204 mã lực",
          },
        ],
      },
    ],

    source: {
      name: "xehay.vn",
      url: "https://xehay.vn/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc.html",
    },
  },

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
