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

  // true: bài đã được viết lại bằng lời của mình (chỉ tham khảo `source`),
  // nên được Google lập chỉ mục. Xem isRepublishedArticle trong src/lib/news.ts.
  originalContent?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1790904201775",

    title: "Mitsubishi Attrage sắp có bản nâng cấp tại Việt Nam? Mức tiêu thụ nhiên liệu và ưu đãi tháng 10/2026",

    slug: "mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton",

    category: "Tin Mitsubishi",

    excerpt:
      "Hai phiên bản Attrage GLX và GLS-P vừa xuất hiện trong dữ liệu nhãn năng lượng của Cục Đăng kiểm Việt Nam. Tóm tắt những gì đã biết về bản nâng cấp, so sánh với bản đang bán và ưu đãi hiện có.",

    publishedAt: "2026-10-02",

    image: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton.jpg",

    featured: false,

    content: [
      {
        heading: "Attrage GLX và GLS-P xuất hiện trong hồ sơ đăng kiểm",

        paragraphs: [
          "Dữ liệu nhãn năng lượng do Cục Đăng kiểm Việt Nam công bố gần đây có thêm hai phiên bản Mitsubishi Attrage mang tên GLX và GLS-P, do Công ty TNHH Ô tô Mitsubishi Việt Nam đăng ký. Đây là tên phiên bản mới, khác với hai bản MT và CVT Premium đang bán, nên nhiều khả năng Attrage nâng cấp sắp được giới thiệu tại Việt Nam.",
          "Theo nhãn năng lượng, Attrage GLX tiêu thụ trung bình 5,32 lít/100 km, bản GLS-P là 5,34 lít/100 km (chu trình tổ hợp). Con số này gần như không đổi so với mức khoảng 5,3 lít/100 km của Attrage hiện tại, vì xe vẫn dùng động cơ xăng 1.2L 3 xi-lanh MIVEC (mã 3A92), công suất 77 mã lực, mô-men xoắn 100 Nm.",
          "Mitsubishi Motors Việt Nam hiện chưa công bố thời gian ra mắt, giá bán hay trang bị của hai phiên bản này. Bài viết sẽ được cập nhật khi có thông tin chính thức.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-02.jpg",
            alt: "Nhãn năng lượng Mitsubishi Attrage do Cục Đăng kiểm Việt Nam công bố, mức tiêu thụ 5,34 lít/100 km",
          },
        ],
      },
      {
        heading: "Bản nâng cấp đã ra mắt tại Thái Lan có gì mới",

        paragraphs: [
          "Attrage nâng cấp đã được giới thiệu tại Thái Lan từ tháng 7/2026, nên có thể dùng làm tham khảo cho phiên bản về Việt Nam. Thay đổi tập trung ở đầu xe: mặt trước Dynamic Shield có nhiều chi tiết sơn đen hơn, lưới tản nhiệt hình lục giác mới, cụm đèn pha thiết kế lại và mâm hợp kim kiểu mới. Khung gầm vẫn giữ nguyên.",
          "Tại Thái Lan, xe có hai bản Active và Smart. Bản Active dùng đèn pha halogen, đèn hậu LED, màn hình cảm ứng 7 inch có Apple CarPlay và Android Auto, chìa khóa thông minh và mâm thép 14 inch. Bản Smart có thêm đèn pha LED tự động, điều hòa tự động, kiểm soát hành trình, gương chiếu hậu chống chói tự động, ghế da tổng hợp, khởi động bằng nút bấm, camera lùi và mâm hợp kim 15 inch.",
          "Điểm đáng chú ý nhất là an toàn. Ngoài 2 túi khí, ABS, EBD, cân bằng điện tử, kiểm soát lực kéo và hỗ trợ khởi hành ngang dốc, bản Active có camera cảnh báo va chạm phía trước và cảnh báo chệch làn. Bản Smart có thêm phanh giảm thiểu va chạm ở tốc độ thấp và cảm biến hạn chế tình huống đạp nhầm chân ga trong khoảng 4 m phía trước. Với một mẫu sedan giá dễ tiếp cận, đây là những trang bị rất hữu ích cho người mới lái.",
          "Trang bị bản Việt Nam có thể khác Thái Lan. Tên phiên bản trong hồ sơ đăng kiểm (GLX, GLS-P) cũng khác, nên cần chờ thông tin chính thức từ Mitsubishi Motors Việt Nam.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-03.jpg",
            alt: "Đầu xe Mitsubishi Attrage nâng cấp với lưới tản nhiệt và đèn pha mới",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-04.jpg",
            alt: "Khoang lái Mitsubishi Attrage nâng cấp bản Thái Lan",
          },
          {
            src: "/images/news/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton/image-05.jpg",
            alt: "Đuôi xe Mitsubishi Attrage nâng cấp tại Thái Lan",
          },
        ],
      },
      {
        heading: "Nên mua Attrage bây giờ hay chờ bản mới?",

        paragraphs: [
          "Attrage đang bán tại Việt Nam có 2 phiên bản: MT giá niêm yết 380 triệu đồng và CVT Premium giá 490 triệu đồng. Trong tháng 10/2026, Mitsubishi Motors Việt Nam hỗ trợ bản MT tương đương 100% lệ phí trước bạ (38 triệu đồng), phiếu nhiên liệu khoảng 8 triệu đồng và camera lùi. Bản CVT Premium được hỗ trợ tương đương 50% lệ phí trước bạ (24,5 triệu đồng), phiếu nhiên liệu khoảng 11 triệu đồng và ăng-ten vây cá.",
          "Nếu cần xe ngay để đi lại hằng ngày hoặc chạy dịch vụ, mua bản hiện tại trong lúc ưu đãi đang cao là lựa chọn tiết kiệm, vì động cơ và mức tiêu hao nhiên liệu của bản mới gần như không đổi. Nếu ưu tiên thiết kế mới và các tính năng an toàn chủ động thì có thể chờ thêm, nhưng giá bản mới chưa được công bố và giai đoạn đầu mở bán thường ít ưu đãi.",
          "Bạn có thể xem giá lăn bánh Attrage theo tỉnh, thành nơi đăng ký trong mục Dự tính giá lăn bánh, hoặc liên hệ Lưu Hoàng Phúc để nhận báo giá kèm ưu đãi mới nhất.",
        ],
      },
    ],

    source: {
      name: "xehay.vn",
      url: "https://xehay.vn/mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton.html",
    },

    originalContent: true,
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

    title: "Mitsubishi Pajero 2026 ra mắt Đông Nam Á: 3 phiên bản, máy dầu 2.4L 204 mã lực",

    slug: "mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc",

    category: "Tin Mitsubishi",

    excerpt:
      "Pajero trở lại với vai trò SUV 7 chỗ cao cấp nhất của Mitsubishi tại Đông Nam Á, dùng chung nền tảng với Triton. Tổng hợp thông số, trang bị từng phiên bản và khả năng về Việt Nam.",

    publishedAt: "2026-10-01",

    image: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc.jpg",

    featured: false,

    content: [
      {
        heading: "Pajero trở lại, đứng trên Pajero Sport",

        paragraphs: [
          "Mitsubishi Pajero thế hệ mới dự kiến ra mắt tại Thái Lan ngày 19/10/2026 với 3 phiên bản: GLS 2WD, GSR 2WD và Super Exceed 4WD. Giá dự kiến tại Thái Lan từ 1,6 đến 1,9 triệu baht, quy đổi khoảng 1,23 đến 1,47 tỷ đồng. Đây là giá tại Thái Lan, chưa phải giá bán tại Việt Nam.",
          "Xe dùng khung gầm rời (body-on-frame) phát triển từ nền tảng Triton thế hệ mới, được gia cố cho một mẫu SUV cỡ lớn. Kích thước dài 4.920 mm, rộng 1.925 mm, cao 1.900–1.910 mm, chiều dài cơ sở 2.870 mm, khoảng sáng gầm 230 mm. Góc tiếp cận, góc vượt đỉnh dốc và góc thoát lần lượt là 30,4, 22,6 và 25,8 độ, phù hợp với nhu cầu đi đường xấu.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-01.jpg",
            alt: "Mitsubishi Pajero 2026 màu trắng chạy trên đường",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-02.jpg",
            alt: "Thân xe Mitsubishi Pajero 2026 nhìn ngang",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-07.jpg",
            alt: "Đuôi xe Mitsubishi Pajero 2026 màu nâu",
          },
        ],
      },
      {
        heading: "Động cơ chung gốc với Triton nhưng mạnh hơn",

        paragraphs: [
          "Cả 3 phiên bản dùng động cơ dầu 2.4L 4 xi-lanh (mã 4N16) với tăng áp biến thiên VGT, công suất 204 mã lực tại 3.500 vòng/phút, mô-men xoắn 480 Nm tại 1.750–2.500 vòng/phút, đi kèm hộp số tự động 8 cấp có lẫy chuyển số. GLS và GSR dẫn động cầu sau, Super Exceed dẫn động 4 bánh S-AWC.",
          "So với Triton đang bán tại Việt Nam (204 PS, 470 Nm, hộp số tự động 6 cấp), động cơ của Pajero được chỉnh lại bộ tăng áp và nhiều chi tiết bên trong, mô-men xoắn cao hơn 10 Nm, hộp số tăng lên 8 cấp. Bản Thái Lan đạt tiêu chuẩn khí thải mà không cần dung dịch AdBlue.",
          "Hệ S-AWC trên bản Super Exceed có các chế độ 2H, 4H, 4HLc và 4LLc, cùng 7 chế độ lái: Eco, Normal, Gravel, Snow, Mud, Sand và Rock, dùng cho cả đường thường lẫn bề mặt trơn trượt hoặc địa hình khó.",
        ],
      },
      {
        heading: "Trang bị từng phiên bản",

        paragraphs: [
          "Xe có 3 hàng ghế, 7 chỗ. Hàng ghế thứ hai trượt được 150 mm và gập 60:40, hàng thứ ba gập 50:50 để mở rộng khoang hành lý.",
          "GLS: dù là bản tiêu chuẩn nhưng đã có đồng hồ kỹ thuật số và màn hình giải trí cùng kích thước 12,3 inch, Apple CarPlay và Android Auto không dây, sạc không dây, cổng USB-C, 6 loa, 7 túi khí, camera 360 độ. Gói hỗ trợ lái gồm kiểm soát hành trình thích ứng, cảnh báo điểm mù, hỗ trợ chuyển làn, hỗ trợ giữ làn, cảnh báo lệch làn, giảm thiểu va chạm phía trước và cảnh báo phương tiện cắt ngang phía trước, phía sau.",
          "GSR: thêm mâm 20 inch hai tông màu, đèn LED thích ứng, đèn Dynamic Flow Light trước và sau, điều hòa 2 vùng, lọc không khí Nanoe-X, ghế và vô-lăng nhớ vị trí, hộp làm mát ở bệ tỳ tay và hệ thống âm thanh Yamaha Dynamic Sound Ultimate 12 loa.",
          "Super Exceed: mâm và lưới tản nhiệt riêng, ốp bảo vệ gầm, nội thất đen phối nâu, cửa sổ trời toàn cảnh, ghế da Semi-Aniline có thông gió, gương chiếu hậu kỹ thuật số, kết nối Mitsubishi CONNECT và hệ thống hỗ trợ lái MI-PILOT.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-03.jpg",
            alt: "Khoang lái Mitsubishi Pajero 2026 với màn hình 12,3 inch và cửa sổ trời toàn cảnh",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-04.jpg",
            alt: "Hàng ghế trước bọc da đen phối nâu trên Mitsubishi Pajero 2026",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-05.jpg",
            alt: "Hàng ghế thứ hai Mitsubishi Pajero 2026",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/image-06.jpg",
            alt: "Khoang hành lý Mitsubishi Pajero 2026 khi dựng đủ 3 hàng ghế",
          },
        ],
      },
      {
        heading: "Khi nào Pajero về Việt Nam?",

        paragraphs: [
          "Mitsubishi Motors Việt Nam chưa công bố kế hoạch bán Pajero thế hệ mới. Nếu về Việt Nam, Pajero sẽ đứng trên Destinator (giá niêm yết 780–855 triệu đồng) trong dải SUV 7 chỗ của Mitsubishi, dành cho khách cần xe khung gầm rời, máy dầu và khả năng đi địa hình thật sự.",
          "Nếu bạn quan tâm, hãy để lại số điện thoại ở thẻ Pajero \"Sắp ra mắt\" trên trang chủ. Lưu Hoàng Phúc sẽ báo ngay khi có giá và lịch mở bán chính thức.",
        ],
      },
    ],

    source: {
      name: "xehay.vn",
      url: "https://xehay.vn/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc.html",
    },

    originalContent: true,
  },

  {
    id: "news-1790838921934",

    title: "Mitsubishi Outlander PHEV 2026 tại Đông Nam Á: 302 mã lực, chạy thuần điện khoảng 100 km",

    slug: "anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang",

    category: "Tin Mitsubishi",

    excerpt:
      "Outlander PHEV phiên bản mới đã được bán tại Philippines. Tổng hợp kích thước, trang bị, cách hoạt động của hệ hybrid sạc điện và những điều cần biết nếu xe về Việt Nam.",

    publishedAt: "2026-10-01",

    image: "/images/news/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang.jpg",

    featured: true,

    content: [
      {
        heading: "Kích thước và thiết kế",

        paragraphs: [
          "Outlander PHEV 2026 dài 4.710 mm, rộng 1.862 mm, cao 1.740 mm, chiều dài cơ sở 2.706 mm, khoảng sáng gầm khoảng 210 mm. Xe có 3 hàng ghế dạng 5+2. Hàng thứ ba gập phẳng khi cần chở đồ và phù hợp hơn cho trẻ em hoặc các chuyến đi ngắn.",
          "Đầu xe theo ngôn ngữ Dynamic Shield mới: dải đèn LED ban ngày đặt cao, đèn pha chính đặt thấp, cách bố trí quen thuộc trên Xpander và Xforce đang bán tại Việt Nam.",
        ],
      },
      {
        heading: "Hệ truyền động PHEV hoạt động thế nào",

        paragraphs: [
          "Xe dùng động cơ xăng 2.4L MIVEC, hai mô-tơ điện và pin 22,7 kWh, tổng công suất 302 mã lực, mô-men xoắn 450 Nm. Theo Mitsubishi, xe chạy được khoảng 100 km chỉ bằng điện và gần 1.000 km khi kết hợp xăng và điện.",
          "Với người đi làm hằng ngày, khoảng 100 km chạy điện đủ cho phần lớn nhu cầu nếu sạc pin tại nhà mỗi tối. Khi đi xa, động cơ xăng hoạt động nên không phải lo hết pin như xe điện thuần. Quãng đường thực tế sẽ thấp hơn con số công bố, tùy tốc độ, tải trọng và việc sử dụng điều hòa.",
          "Hệ dẫn động 4 bánh S-AWC phân bổ lực kéo giữa các bánh, kết hợp kiểm soát mô-men quay vòng chủ động (Active Yaw Control) để giữ xe ổn định khi vào cua hoặc trên đường trơn.",
        ],
      },
      {
        heading: "Tiện nghi và an toàn",

        paragraphs: [
          "Màn hình trung tâm 12,3 inch có Apple CarPlay và Android Auto không dây, đồng hồ kỹ thuật số, hiển thị thông tin trên kính lái (HUD), sạc không dây, âm thanh Yamaha, điều hòa tự động 3 vùng và cửa sổ trời toàn cảnh.",
          "Gói Mitsubishi Safety Sensing gồm giảm thiểu va chạm phía trước, cảnh báo điểm mù, hỗ trợ chuyển làn, cảnh báo phương tiện cắt ngang phía sau, cảnh báo chệch làn và cảnh báo người lái mất tập trung, cùng camera 360 độ hỗ trợ đỗ xe ở chỗ hẹp.",
        ],
      },
      {
        heading: "Giá bán và khả năng về Việt Nam",

        paragraphs: [
          "Tại Philippines, Outlander PHEV 2026 có giá niêm yết 2,848 triệu peso, khoảng 1,2 tỷ đồng. Mitsubishi Motors Việt Nam chưa công bố giá và thời gian mở bán. Giá tại Việt Nam còn phụ thuộc thuế và chính sách cho xe hybrid sạc điện, nên chưa thể suy ra từ giá Philippines.",
          "Bạn có thể đăng ký nhận thông tin ở thẻ Outlander \"Sắp ra mắt\" trên trang chủ để được Lưu Hoàng Phúc báo ngay khi có giá chính thức.",
        ],
      },
    ],

    source: {
      name: "XeHay",
      url: "https://xehay.vn/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang.html",
    },

    originalContent: true,
  },

  {
    id: "news-1790836010186",

    title: "Mitsubishi Outlander thế hệ mới có thể ra mắt năm 2028: thiết kế từ Elevance Concept, PHEV 4 mô-tơ",

    slug: "mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028",

    category: "Tin Mitsubishi",

    excerpt:
      "Theo báo chí Nhật Bản, Outlander thế hệ thứ năm có thể ra mắt khoảng năm 2028, lấy cảm hứng từ Elevance Concept và dùng hệ PHEV mới. Đây là thông tin chưa được Mitsubishi xác nhận.",

    publishedAt: "2026-10-01",

    image: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028.jpg",

    featured: false,

    content: [
      {
        heading: "Vì sao Mitsubishi cần Outlander mới",

        paragraphs: [
          "Outlander thế hệ thứ tư ra mắt năm 2021 và vẫn là mẫu xe quan trọng của Mitsubishi, đặc biệt tại Mỹ. Theo số liệu được báo chí dẫn lại, năm 2025 hãng bán được 35.895 chiếc Outlander tại Mỹ, giảm so với 45.253 chiếc của năm trước đó, nhưng vẫn là mẫu bán chạy nhất của Mitsubishi tại thị trường này.",
          "Đến năm 2028, Outlander hiện tại đã bán được khoảng 7 năm. Một thế hệ mới là bước cần thiết để mẫu xe này tiếp tục cạnh tranh với các SUV cỡ C liên tục được làm mới.",
        ],
      },
      {
        heading: "Thiết kế có thể lấy từ Elevance Concept",

        paragraphs: [
          "Theo một báo cáo từ Nhật Bản, Outlander thế hệ thứ năm có thể dựa trên Elevance Concept, mẫu xe ý tưởng Mitsubishi giới thiệu năm 2025. Kích thước tổng thể tương tự Outlander hiện tại nhưng diện mạo hoàn toàn mới.",
          "Những chi tiết có thể được giữ lại gồm cụm đèn pha và đèn LED ban ngày kéo dài xuống mặt trước, lưới tản nhiệt cùng màu thân xe, và ở phía sau là dải đèn LED chạy hết chiều rộng đuôi xe, nối với đèn hậu kéo lên trụ D. Phần cửa sổ bên cỡ lớn của bản concept nhiều khả năng sẽ không xuất hiện trên xe thương mại.",
        ],
      },
      {
        heading: "Hệ PHEV 4 mô-tơ và S-AWC thế hệ mới",

        paragraphs: [
          "Outlander PHEV hiện tại dùng động cơ xăng 2.4L hút khí tự nhiên, hai mô-tơ điện và pin lithium-ion 22,7 kWh. Thế hệ mới được cho là sẽ dùng bốn mô-tơ điện thay vì hai, vừa tăng công suất, vừa giúp hệ S-AWC thế hệ mới phân bổ lực kéo chính xác tới từng bánh xe, cải thiện độ bám và khả năng vào cua.",
          "Lưu ý: công suất và quãng đường chạy điện của Outlander PHEV hiện tại được công bố khác nhau giữa các thị trường (khoảng 297–302 mã lực, chạy điện khoảng 100–106 km) do khác phiên bản và tiêu chuẩn đo. Các con số này chỉ nên dùng để tham khảo.",
        ],
      },
      {
        heading: "Ý nghĩa với khách hàng Việt Nam",

        paragraphs: [
          "Đây mới là thông tin dự đoán, Mitsubishi chưa xác nhận. Tại Việt Nam, Outlander PHEV thế hệ hiện tại cũng chưa được bán chính thức.",
          "Nếu bạn cần một chiếc xe 7 chỗ trong 1–2 năm tới, nên cân nhắc các mẫu đang bán như Destinator hoặc Xpander Cross thay vì chờ thế hệ mới. Liên hệ Lưu Hoàng Phúc để được tư vấn mẫu xe phù hợp và lái thử.",
        ],
      },
    ],

    source: {
      name: "Autodaily - Cộng đồng xe Việt Nam",
      url: "https://forum.autodaily.vn/threads/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028.57647/",
    },

    originalContent: true,
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
