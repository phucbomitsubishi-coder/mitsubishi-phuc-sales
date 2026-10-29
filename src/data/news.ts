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

  // Tiêu đề ngắn (~60 ký tự) cho Google; không có thì dùng `title`
  seoTitle?: string;

  // Ngày sửa nội dung quan trọng (YYYY-MM-DD): hiện "Cập nhật", dateModified trong schema, lastModified trong sitemap
  updatedAt?: string;

  // true: bài đã được viết lại bằng lời của mình (chỉ tham khảo `source`),
  // nên được Google lập chỉ mục. Xem isRepublishedArticle trong src/lib/news.ts.
  originalContent?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1793250000000",

    title: "Mitsubishi Xpander có mấy chỗ? Cách xếp ghế cho gia đình 4 đến 7 người",

    seoTitle: "Xpander có mấy chỗ? Xếp ghế cho gia đình 4–7 người",

    slug: "mitsubishi-xpander-co-may-cho-cach-xep-ghe-cho-gia-dinh",

    category: "Tư vấn mua xe",

    excerpt:
      "Xpander có 7 chỗ ở mọi phiên bản, xếp 2+3+2. Ai nên ngồi hàng ghế 3, gập ghế thế nào khi đi 4–5 người hay đủ 7 người, cốp chứa được gì. Tổng hợp từ Mitsubishi Motors Việt Nam và kinh nghiệm tư vấn cho gia đình.",

    publishedAt: "2026-10-29",

    image: "/images/cars/xpander/showroom/feature-highlight.jpg",

    featured: false,

    content: [
      {
        heading: "Câu trả lời ngắn: 7 chỗ, xếp 2+3+2",
        paragraphs: [
          "Mitsubishi Xpander có 7 chỗ ngồi trên cả 4 phiên bản đang bán: MT, AT, AT Premium và Xpander Cross. Ghế xếp thành 3 hàng: 2 ghế trước, 3 ghế hàng giữa và 2 ghế hàng cuối.",
          "Cả 4 bản có chung chiều dài cơ sở 2.775 mm và khoảng sáng gầm 225 mm, nên không gian ngồi như nhau. Khác nhau chủ yếu ở trang bị: bản AT Premium và Xpander Cross có 6 túi khí, bản MT và AT có 2 túi khí.",
        ],
        images: [
          {
            src: "/images/cars/xpander/showroom/feature-interior.jpg",
            alt: "Ba hàng ghế bên trong Mitsubishi Xpander",
          },
        ],
      },
      {
        heading: "Hàng ghế 2: chỗ ngồi tốt nhất cho người lớn và trẻ nhỏ",
        paragraphs: [
          "Hàng ghế giữa ngồi được 3 người lớn. Theo Mitsubishi Motors Việt Nam (MMV), ghế trượt tới lui để chia chỗ để chân với hàng cuối, ngả lưng được và gập theo tỷ lệ 60:40. Hàng này có cửa gió điều hòa riêng, cổng USB và bệ tỳ tay có chỗ để ly.",
          "Đây là hàng dễ ra vào nhất, nên dành cho ông bà hoặc người lớn tuổi. Ghế trẻ em cũng nên đặt ở hàng 2 vì có điểm neo ISOFIX.",
        ],
      },
      {
        heading: "Hàng ghế 3: hợp với ai?",
        paragraphs: [
          "Theo MMV, hàng cuối phù hợp người lớn cao dưới khoảng 1,75 m khi đi trong phố hoặc quãng đường dưới 100 km. Hàng này có cửa gió, cổng sạc và hộc để đồ hai bên.",
          "Nếu người cao trên 1,75 m phải ngồi hàng cuối khi đi xa, chân sẽ dễ mỏi. Khi đó nên đẩy hàng 2 lên một chút và dừng nghỉ khoảng 15–20 phút sau mỗi 2 giờ lái.",
        ],
      },
      {
        heading: "Xếp ghế theo số người đi",
        paragraphs: [
          "Đi 4–5 người: gập hàng ghế 3 (gập riêng từng bên theo tỷ lệ 50:50) để có cốp rộng. Theo MMV, lúc này cốp chở được 4–5 vali lớn, xe đẩy em bé, bộ gậy golf hoặc lều cắm trại.",
          "Đi 6–7 người: dựng đủ 3 hàng, đẩy hàng 2 lên vừa phải để hàng 3 có chỗ để chân, ưu tiên trẻ em hoặc người dưới khoảng 1,70 m ngồi hàng cuối. Cốp còn chứa khoảng 2–3 vali cỡ vừa hoặc ba lô đặt đứng, nên mang túi gọn hoặc gắn thêm thùng đồ trên nóc nếu đi xa.",
          "Đi 6 người kèm đồ: dựng một bên hàng 3, gập bên còn lại để vừa có chỗ ngồi vừa có chỗ để vali. Khi cần chở đồ dài, gập phẳng cả hàng 2 và hàng 3 để có sàn phẳng.",
        ],
      },
      {
        heading: "Gợi ý theo gia đình",
        paragraphs: [
          "Gia đình trẻ 3–4 người: hằng ngày gập hết hàng 3, cốp rộng cho xe đẩy và đồ đi chợ; về quê có ông bà thì dựng hàng 3 lên.",
          "Gia đình 5–6 người: trượt hàng 2 lên một chút, dựng 1 hoặc 2 ghế hàng 3 tùy số người.",
          "Gia đình 7 người: dựng đủ 3 hàng, người lớn tuổi ngồi hàng 2, trẻ em ngồi hàng 3.",
        ],
      },
      {
        heading: "Thông số và giá tham khảo",
        paragraphs: [
          "Xpander MT, AT dài 4.595 mm, rộng 1.750 mm, cao 1.730 mm; bản AT Premium cao 1.750 mm; Xpander Cross rộng 1.790 mm, cao 1.750 mm. Động cơ xăng 1.5L MIVEC 105 PS, 141 Nm. Mức tiêu hao kết hợp theo MMV: 6,80 lít/100 km (MT), 7,10 (AT), 6,99 (AT Premium), 7,23 (Xpander Cross).",
          "Giá niêm yết: Xpander từ 568 triệu đồng, Xpander Cross 699 triệu đồng. Giá lăn bánh và ưu đãi tháng từng phiên bản xem ở trang xe Xpander hoặc bảng giá xe Mitsubishi.",
        ],
      },
      {
        heading: "Ngồi thử cả nhà trước khi mua",
        paragraphs: [
          "Cách chắc chắn nhất là cả nhà cùng ngồi thử đủ 3 hàng ghế. Phúc có thể mang Xpander tới tận nhà, hoặc hẹn bạn tại showroom Mitsubishi Moveo New City, Moveo Bình Dương hay Moveo Thuận An. Đăng ký lái thử hoặc nhận báo giá lăn bánh ngay trên website.",
        ],
      },
    ],

    source: {
      name: "Mitsubishi Motors Việt Nam",
      url: "https://www.mitsubishi-motors.com.vn/tin-tuc/mitsubishi-xpander-co-may-cho-danh-gia-khong-gian-thuc-te-cho-gia-dinh-47-nguoi-n154584.html",
    },

    originalContent: true,
  },
  {
    id: "news-1792980000000",

    title: "Hàng ghế thứ 3 Mitsubishi Destinator có thoải mái cho người lớn không?",

    seoTitle: "Hàng ghế 3 Destinator có thoải mái cho người lớn?",

    slug: "hang-ghe-thu-3-mitsubishi-destinator-co-thoai-mai-cho-nguoi-lon",

    category: "Tư vấn mua xe",

    excerpt:
      "Người cao bao nhiêu thì ngồi hàng ghế thứ 3 Destinator thoải mái, khoang hành lý chứa được gì khi đủ 7 người, ghế gập ra sao. Tổng hợp từ Mitsubishi Motors Việt Nam và kinh nghiệm tư vấn cho gia đình.",

    publishedAt: "2026-10-26",

    image: "/images/cars/destinator/showroom/feature-highlight.jpg",

    featured: false,

    content: [
      {
        heading: "Câu trả lời ngắn",
        paragraphs: [
          "Hàng ghế thứ 3 của Destinator ngồi được người lớn trong các chuyến đi hằng ngày và đi gần. Theo Mitsubishi Motors Việt Nam (MMV), người cao dưới khoảng 1,70 m có thể ngồi thoải mái cả khi đi xa; người cao 1,75–1,80 m vẫn ngồi được cho quãng đường ngắn nếu hàng ghế thứ 2 trượt lên phía trước một chút.",
          "Mức thoải mái thực tế còn tùy vóc dáng, tư thế ngồi và thời gian di chuyển. Cách chắc chắn nhất là cả nhà ngồi thử trước khi mua.",
        ],
        images: [
          {
            src: "/images/cars/destinator/showroom/feature-interior.jpg",
            alt: "Ba hàng ghế bên trong Mitsubishi Destinator",
          },
        ],
      },
      {
        heading: "Vào và ra hàng ghế cuối",
        paragraphs: [
          "Muốn vào hàng ghế thứ 3, bạn gập hàng ghế thứ 2 rồi bước qua bệ cửa sau, người sẽ phải hơi cúi. Trẻ em và người trẻ ra vào khá dễ; với ông bà hoặc người lớn tuổi, nên để ngồi hàng ghế thứ 2 cho thuận tiện.",
          "Theo MMV, hàng ghế thứ 2 gập theo tỷ lệ 40:20:40 và hàng ghế thứ 3 gập 50:50, nên có thể gập một phần để vừa chở người vừa chở đồ.",
        ],
      },
      {
        heading: "Tiện nghi cho người ngồi sau",
        paragraphs: [
          "Cả hai phiên bản Premium và Ultimate đều có điều hòa tự động hai vùng độc lập và cửa gió điều hòa cho hàng ghế sau, giúp người ngồi hàng 2, hàng 3 không bị nóng khi đi trưa. MMV cho biết hàng ghế 2 và 3 có cổng sạc USB Type A và Type C.",
          "Màn hình cảm ứng 12,3 inch hỗ trợ Apple CarPlay và Android Auto có ở cả hai bản. Hệ thống âm thanh Yamaha 8 loa chỉ có trên bản Ultimate; bản Premium dùng hệ thống 6 loa.",
        ],
        images: [
          {
            src: "/images/cars/destinator/showroom/feature-audio.jpg",
            alt: "Loa Yamaha trên Mitsubishi Destinator Ultimate",
            caption: "Âm thanh Yamaha 8 loa chỉ có trên bản Ultimate",
          },
        ],
      },
      {
        heading: "Khoang hành lý khi đủ 7 người",
        paragraphs: [
          "Khi dùng đủ 7 chỗ, theo MMV, cốp sau vẫn để được một vali xách tay cỡ 20 inch, một xe đẩy em bé loại gập gọn hoặc vài túi xách, ba lô. Đi chơi xa cả nhà 7 người với nhiều vali lớn thì nên gắn thêm giá nóc hoặc gập một nửa hàng ghế thứ 3.",
          "Gập hàng ghế thứ 3 (chở 5 người): khoảng 494–844 lít. Gập cả hàng 2 và hàng 3 (chở 2 người): khoảng 819–1.668 lít. Đây là số ước tính MMV công bố, khoảng dao động tùy vị trí trượt và ngả của ghế.",
        ],
      },
      {
        heading: "Kích thước tham khảo",
        paragraphs: [
          "Destinator dài 4.680 mm, rộng 1.840 mm, cao 1.780 mm, chiều dài cơ sở 2.815 mm, khoảng sáng gầm 214 mm. Xe dùng máy xăng 1.5L turbo 163 PS, 250 Nm, hộp số CVT. Giá niêm yết 780 triệu (Premium) và 855 triệu (Ultimate).",
        ],
      },
      {
        heading: "Ngồi thử trước khi quyết định",
        paragraphs: [
          "Nếu gia đình bạn có người cao trên 1,75 m thường xuyên ngồi hàng cuối, hãy ngồi thử cả 3 hàng ghế trước khi mua. Phúc có thể mang xe tới tận nhà để cả nhà ngồi thử, hoặc bạn ghé showroom Mitsubishi Moveo New City. Đăng ký lái thử hoặc nhận báo giá lăn bánh Destinator ngay trên website.",
        ],
      },
    ],

    source: {
      name: "Mitsubishi Motors Việt Nam",
      url: "https://www.mitsubishi-motors.com.vn/tin-tuc/hang-ghe-thu-3-mitsubishi-destinator-co-thoai-mai-cho-nguoi-lon-khong-n154598.html",
    },

    originalContent: true,
  },
  {
    id: "news-1792392000000",

    title: "Mitsubishi Outlander thế hệ mới xuất hiện tại Việt Nam, hãng xác nhận mở bán trong năm 2026 với bản hybrid nhẹ",

    seoTitle: "Outlander thế hệ mới về Việt Nam năm 2026, bản hybrid nhẹ",

    slug: "mitsubishi-outlander-the-he-moi-xuat-hien-tai-viet-nam-mo-ban-2026",

    category: "Tin Mitsubishi",

    excerpt:
      "Một chiếc Outlander thế hệ mới được bắt gặp trên xe vận chuyển tại Việt Nam. Mitsubishi Motors Việt Nam đã xác nhận đưa mẫu xe này về nước trong năm 2026 với hệ truyền động hybrid nhẹ. Những gì đã chính thức và những gì còn chờ công bố.",

    publishedAt: "2026-10-19",

    updatedAt: "2026-10-28",

    image: "/images/news/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang-official.jpg",

    featured: false,

    content: [
      {
        heading: "Outlander mới xuất hiện trên đường vận chuyển",
        paragraphs: [
          "Ngày 19/10/2026, Tuổi Trẻ và CafeF (dẫn lại Đời sống & Pháp luật) đăng hình ảnh một chiếc Mitsubishi Outlander thế hệ mới màu đen nằm trên xe chở ô tô, được người chia sẻ cho biết chụp trên cao tốc Bắc – Nam đoạn qua Nghệ An.",
          "Đây là thế hệ Outlander đang bán ở nhiều nước, khác với Outlander từng được phân phối chính hãng tại Việt Nam (bản nâng cấp năm 2020 của thế hệ trước). Mitsubishi chưa công bố lý do chiếc xe có mặt, nên chưa thể biết đây là xe chạy thử hay xe chuẩn bị cho lễ ra mắt.",
        ],
      },
      {
        heading: "Cập nhật 28/10: Outlander mới lộ diện ở Hà Nội, có logo S-AWC",
        paragraphs: [
          "Ngày 22–23/10/2026, Đời sống & Pháp luật (Soha dẫn lại) và Tuổi Trẻ đăng ảnh một chiếc Outlander màu đen bóng tại trung tâm kiểm định khí thải ở Hà Nội. Logo trên thân xe được che kín. Các báo nhận định nhiều khả năng đây là xe nhập khẩu chính hãng đang làm thủ tục trước khi mở bán.",
          "Đây là bản nâng cấp giữa vòng đời mới nhất của Outlander. Bên ngoài, xe có lưới tản nhiệt phía trên dạng kín màu đen bóng với sọc bạc nằm ngang, mâm đa chấu 20 inch và đèn hậu LED thiết kế mới. Gần kính sau có logo S-AWC, hệ dẫn động 4 bánh của Mitsubishi, nên khả năng cao bản về Việt Nam có dẫn động 4 bánh.",
          "Bên trong, ghế và tấm ốp cửa bọc da màu nâu, chỉ khâu hình kim cương, giữa taplo là màn hình cảm ứng 12,3 inch. Những trang bị khác như màn hình sau vô lăng, hiển thị trên kính lái, âm thanh Yamaha, cửa sổ trời toàn cảnh hay điều hòa 3 vùng hiện mới là trang bị của bản nước ngoài; hãng chưa xác nhận cho Việt Nam.",
          "Mitsubishi Motors Việt Nam vẫn chưa công bố ngày ra mắt và giá bán. Phúc sẽ cập nhật bài khi có thông tin chính thức.",
        ],
      },
      {
        heading: "Điều đã chính thức: về Việt Nam trong năm 2026, bản hybrid nhẹ",
        paragraphs: [
          "Theo Tuổi Trẻ (03/09/2026), ông Tomoki Yanagawa, Tổng Giám đốc Mitsubishi Motors Việt Nam, xác nhận tại sự kiện ra mắt Pajero thế hệ mới ở Nhật Bản rằng Outlander thế hệ mới sẽ được đưa về Việt Nam trong năm 2026. Bản phân phối trong nước dùng hệ truyền động hybrid nhẹ (mild hybrid). Dân trí cũng đưa tin Outlander mới có thể về Việt Nam vào cuối năm.",
          "Đến nay, hãng chưa công bố ngày ra mắt, giá bán, số phiên bản và danh sách trang bị cho thị trường Việt Nam.",
        ],
      },
      {
        heading: "Thông số tham khảo từ bản nước ngoài",
        paragraphs: [
          "Các số liệu dưới đây là của Outlander bán tại nước ngoài, được Tuổi Trẻ và CafeF dẫn lại. Bản Việt Nam có thể khác khi hãng công bố chính thức.",
          "Kích thước: dài 4.710 mm, rộng 1.862 mm, cao 1.740 mm, chiều dài cơ sở 2.706 mm, khoảng sáng gầm khoảng 210 mm. Xe có cấu hình 7 chỗ (5+2).",
          "Động cơ bản hybrid nhẹ tại Bắc Mỹ: xăng 1.5L tăng áp 4 xi-lanh kết hợp hệ điện 48V, công suất 174 mã lực, mô-men xoắn 279 Nm, hộp số CVT, dẫn động 4 bánh S-AWC. Chiếc xe bắt gặp ở Hà Nội có logo S-AWC, nhưng hãng chưa công bố cấu hình chính thức cho Việt Nam.",
        ],
      },
      {
        heading: "Outlander mới và Destinator: khác nhau thế nào?",
        paragraphs: [
          "Destinator đang bán là SUV 7 chỗ dài 4.680 mm, chiều dài cơ sở 2.815 mm, khoảng sáng gầm 214 mm, máy 1.5L turbo 163 PS, 250 Nm, giá niêm yết 780 và 855 triệu đồng. Theo số liệu bản nước ngoài, Outlander mới dài hơn 30 mm, rộng hơn, nhưng chiều dài cơ sở ngắn hơn Destinator; Outlander có thêm hệ hybrid nhẹ và dẫn động 4 bánh ở thị trường Bắc Mỹ.",
          "Hãng chưa công bố giá Outlander tại Việt Nam. Nếu bạn cần xe 7 chỗ trong vài tháng tới, Destinator là lựa chọn có giá và ưu đãi rõ ràng ngay bây giờ. Nếu muốn chờ Outlander, Phúc sẽ báo bạn ngay khi có giá và lịch nhận đặt cọc chính thức.",
        ],
      },
      {
        heading: "Nhận thông tin sớm",
        paragraphs: [
          "Bài viết sẽ được cập nhật khi Mitsubishi Motors Việt Nam công bố giá và phiên bản. Bạn có thể để lại số điện thoại ở form báo giá hoặc nhắn Zalo cho Phúc, ghi \"Outlander\", để được báo ngay khi xe mở bán tại Mitsubishi Moveo New City.",
        ],
      },
    ],

    source: {
      name: "Tuổi Trẻ (tham khảo thêm CafeF, Dân trí, Đời sống & Pháp luật)",
      url: "https://tuoitre.vn/mitsubishi-outlander-2026-xuat-hien-o-viet-nam-du-kien-som-ra-mat-dau-honda-cr-v-mazda-cx-5-100261019084038131.htm",
    },

    originalContent: true,
  },

  {
    id: "news-1792046400000",

    title: "Xe Mitsubishi cũ chính hãng MMV UCAR: kiểm tra 160 điểm, bảo hành CPO 12 tháng hoặc 20.000 km",

    seoTitle: "Xe Mitsubishi cũ chính hãng MMV UCAR, bảo hành CPO",

    slug: "xe-mitsubishi-cu-chinh-hang-mmv-ucar-bao-hanh-cpo",

    category: "Tư vấn mua xe",

    excerpt:
      "MMV UCAR là chương trình xe Mitsubishi qua sử dụng chính hãng. Xe đạt chuẩn được kiểm tra 160 điểm, cấp chứng nhận CPO và bảo hành động cơ, hộp số 12 tháng hoặc 20.000 km. Điều kiện xe, quyền lợi và những trường hợp không được bảo hành.",

    publishedAt: "2026-10-15",

    image: "/images/used-cars/xpander-cross-2025-002/01.jpg",

    featured: false,

    content: [
      {
        heading: "MMV UCAR là gì?",
        paragraphs: [
          "MMV UCAR là chương trình xe Mitsubishi qua sử dụng chính hãng do Mitsubishi Motors Việt Nam (MMV) triển khai từ đầu năm 2022, thực hiện qua các nhà phân phối ủy quyền. Chương trình gồm thu mua xe cũ, bán xe cũ đã kiểm định và thu cũ đổi mới.",
          "Mitsubishi Moveo New City, nơi Phúc đang làm tư vấn, là nhà phân phối có tham gia chương trình. Vì vậy bạn có thể bán, mua hoặc đổi xe Mitsubishi cũ ngay tại showroom.",
        ],
      },
      {
        heading: "Điều kiện để xe được cấp chứng nhận CPO",
        paragraphs: [
          "CPO (Certified Pre-Owned) là chứng nhận xe qua sử dụng đạt chuẩn của hãng. Theo công bố của MMV ngày 14/10/2026, xe phải đáp ứng đủ các điều kiện sau:",
          "Tuổi xe và quãng đường: không quá 5 năm tính từ ngày bắt đầu bảo hành xe mới, hoặc không quá 140.000 km, tùy điều kiện nào đến trước.",
          "Tình trạng xe: không có dấu hiệu tai nạn nghiêm trọng, không bị thủy kích (ngập nước), không can thiệp đồng hồ công-tơ-mét, không lắp phụ kiện không chính hãng hoặc lắp sai kỹ thuật.",
          "Lịch sử bảo dưỡng: đầy đủ trên hệ thống của MMV.",
          "Kiểm tra kỹ thuật: đạt bài kiểm tra 160 điểm do kỹ thuật viên được MMV đào tạo thực hiện.",
        ],
      },
      {
        heading: "Bảo hành CPO: 12 tháng hoặc 20.000 km",
        paragraphs: [
          "Hạng mục bảo hành: các bộ phận cơ khí bên trong động cơ và ECU động cơ; các bộ phận cơ khí bên trong hộp số và hộp điều khiển hộp số (AT-ECU, CVT-ECU). Ly hợp và biến mô không nằm trong phạm vi bảo hành. Lỗi phải do nhà sản xuất và được nhà phân phối ủy quyền xác nhận.",
          "Thời hạn: 12 tháng hoặc 20.000 km, tùy điều kiện nào đến trước. Nếu xe vẫn còn bảo hành xe mới (hoặc gói bảo hành mở rộng) khi bạn mua, bảo hành CPO bắt đầu ngay sau khi bảo hành đó hết. Nếu đã hết, bảo hành CPO tính từ ngày nhận xe.",
          "Tổng thời gian bảo hành (gồm bảo hành xe mới và CPO) tối đa 6 năm hoặc 160.000 km, tùy điều kiện nào đến trước.",
          "Bảo hành được áp dụng tại tất cả nhà phân phối ủy quyền của Mitsubishi trên toàn quốc. Hiệu lực được ghi nhận trên ứng dụng Mitsubishi Connect+ và sổ bảo hành do nhà phân phối cấp.",
        ],
      },
      {
        heading: "Trường hợp không được bảo hành",
        paragraphs: [
          "Xe đã được chuyển nhượng cho người khác sau khi mua; đồng hồ công-tơ-mét bị can thiệp hoặc không xác định được số km.",
          "Hư hỏng do tự sửa chữa, thay đổi thiết kế, bảo dưỡng không đúng quy định, dùng phụ tùng, dầu nhớt chưa được MMV phê duyệt hoặc sửa chữa ngoài hệ thống nhà phân phối ủy quyền.",
          "Vận hành sai cách, chở quá tải; hư hỏng do tai nạn, ngập nước, hỏa hoạn, thiên tai, hóa chất và các yếu tố bên ngoài khác.",
          "Hao mòn tự nhiên như phai màu sơn, trầy xước, lão hóa vật liệu; tiếng ồn, độ rung không ảnh hưởng đến vận hành.",
        ],
      },
      {
        heading: "Quyền lợi khi bán hoặc đổi xe cũ",
        paragraphs: [
          "Người bán xe: được kiểm tra và định giá miễn phí tại nhà phân phối, có thể yêu cầu thu mua tại địa điểm thuận tiện, nhận báo giá trọn gói.",
          "Người đổi sang xe Mitsubishi mới: được tư vấn ưu đãi thu cũ đổi mới và lãi suất vay theo từng thời điểm.",
          "Người mua xe cũ: xe có nguồn gốc và lịch sử bảo dưỡng rõ ràng, được hỗ trợ vay mua xe qua ngân hàng đối tác tùy chương trình.",
        ],
      },
      {
        heading: "Mua, bán xe Mitsubishi cũ tại Bình Dương",
        paragraphs: [
          "Các xe Mitsubishi đã qua sử dụng Phúc đang có được đăng tại mục Xe cũ trên website, kèm năm sản xuất, số km và hình ảnh thực tế. Khi quan tâm xe nào, bạn hỏi Phúc để biết xe đó có chứng nhận CPO hay không, còn bảo hành xe mới bao lâu và lịch sử bảo dưỡng.",
          "Nếu muốn bán hoặc đổi xe cũ lấy xe Mitsubishi mới, bạn điền thông tin xe tại trang Thu cũ đổi mới, Phúc sẽ liên hệ hẹn lịch kiểm tra và báo giá.",
        ],
      },
    ],

    source: {
      name: "Mitsubishi Motors Việt Nam (Chương trình MMV UCAR, Chính sách bảo hành xe CPO)",
      url: "https://www.mitsubishi-motors.com.vn/tin-tuc/chinh-sach-bao-hanh-xe-cpo-n154558.html",
    },

    originalContent: true,
  },

  {
    id: "news-1791873600000",

    title: "Doanh số Mitsubishi 9 tháng 2026: 31.932 xe, Xpander, Xforce và Destinator cùng vào top 10 xe xăng bán chạy",

    seoTitle: "Doanh số Mitsubishi 9 tháng 2026: 31.932 xe",

    slug: "doanh-so-mitsubishi-9-thang-2026-xpander-xforce-destinator-top-10",

    category: "Thị trường ô tô",

    excerpt:
      "Mitsubishi bán 31.932 xe trong 9 tháng đầu năm 2026. Xpander, Xforce và Destinator cùng nằm trong top 10 xe động cơ đốt trong bán chạy, riêng tháng 9 Xforce bán gần gấp đôi tháng trước.",

    publishedAt: "2026-10-13",

    image: "/images/cars/xforce/gallery/exterior/exterior-01.jpg",

    featured: false,

    content: [
      {
        heading: "31.932 xe sau 9 tháng",
        paragraphs: [
          "Theo số liệu được AutoPro và Autonet tổng hợp ngày 13/10/2026, Mitsubishi bán 31.932 xe tại Việt Nam trong 9 tháng đầu năm 2026. AutoPro cho biết con số này tăng 28% so với cùng kỳ năm 2025 (25.009 xe). Riêng tháng 9, theo Autonet, hãng bán 3.890 xe.",
          "Phần lớn doanh số đến từ ba mẫu xe: Xpander, Xforce và Destinator. Ba mẫu này cộng lại được 27.401 xe, chiếm khoảng 86% lượng xe Mitsubishi bán ra trong 9 tháng.",
        ],
      },
      {
        heading: "Ba mẫu xe trong top 10 xe xăng, dầu bán chạy 9 tháng",
        paragraphs: [
          "Xpander: 10.496 xe (gồm bản nhập khẩu và lắp ráp), trung bình hơn 1.100 xe mỗi tháng, đứng thứ 3 trong nhóm xe động cơ đốt trong, chỉ sau Toyota Yaris Cross (12.646 xe) và Mazda CX-5 (11.893 xe).",
          "Xforce: 9.456 xe, đứng thứ 5, xếp sau Ford Ranger (9.835 xe).",
          "Destinator: 7.449 xe, đứng thứ 9. Đây là mẫu SUV 7 chỗ mới mở bán từ cuối năm 2025 và đã vượt mốc 10.000 xe bàn giao theo công bố của hãng.",
          "Thứ hạng theo bảng tổng hợp lũy kế 9 tháng của AutoPro từ số liệu Hiệp hội các nhà sản xuất ô tô Việt Nam (VAMA). Bảng này chỉ tính xe xăng, dầu và hybrid của các hãng thành viên VAMA, không gồm xe điện.",
        ],
        images: [
          {
            src: "/images/cars/xpander/gallery/exterior/exterior-01.jpg",
            alt: "Mitsubishi Xpander",
          },
        ],
      },
      {
        heading: "Tháng 9: Xforce tăng gần gấp đôi",
        paragraphs: [
          "Xforce bán 1.323 xe trong tháng 9/2026, gần gấp đôi tháng 8 (664 xe), đứng thứ 4 trong top 10 xe xăng, dầu bán chạy của tháng.",
          "Xpander bán 954 xe, tăng 43% so với tháng 8 (668 xe), đứng thứ 10 của tháng.",
        ],
        images: [
          {
            src: "/images/cars/xforce/gallery/exterior/exterior-03.jpg",
            alt: "Mitsubishi Xforce",
          },
        ],
      },
      {
        heading: "Đối thủ của các mẫu Mitsubishi cũng nằm trong top 10",
        paragraphs: [
          "Nhiều mẫu xe khách hàng hay đặt lên bàn cân với Mitsubishi cũng có mặt trong bảng 9 tháng: Ford Ranger (9.835 xe), Toyota Innova Cross (8.959 xe) và Toyota Veloz Cross. Nếu bạn đang phân vân giữa các mẫu này, có thể tham khảo các bài so sánh Triton và Ranger, Destinator và Innova Cross, Xpander và Veloz Cross, Xforce và Hyundai Creta tại mục Tư vấn.",
          "Doanh số cao cho thấy mẫu xe được nhiều gia đình lựa chọn, nhưng xe phù hợp nhất vẫn tùy nhu cầu chở người, quãng đường đi lại và ngân sách của bạn. Lái thử trực tiếp là cách chắc chắn nhất để chọn đúng xe.",
        ],
      },
      {
        heading: "Giá xe và ưu đãi tháng 10",
        paragraphs: [
          "Giá niêm yết tháng 10/2026: Xpander từ 568 triệu đồng, Xforce từ 605 triệu đồng, Destinator từ 780 triệu đồng. Cả ba mẫu đều có chương trình ưu đãi của Mitsubishi Motors Việt Nam trong tháng.",
          "Bạn có thể xem giá lăn bánh và ưu đãi từng phiên bản tại bảng giá xe Mitsubishi trên website, hoặc liên hệ Phúc để nhận báo giá và đăng ký lái thử tận nhà khu vực Bình Dương.",
        ],
      },
    ],

    source: {
      name: "AutoPro (tham khảo thêm Autonet, số liệu VAMA)",
      url: "https://autopro.com.vn/mitsubishi-gop-3-10-mau-xe-xang-dau-ban-chay-nhat-3-quy-dau-2026-xpander-ban-hon-1100-xe-thang-destinator-giup-keo-doanh-so-tang-gan-30-17726101306511066.chn",
    },

    originalContent: true,
  },

  {
    id: "news-1791787200000",

    title: "Mitsubishi Destinator vượt mốc 10.000 xe sau hơn 10 tháng tại Việt Nam",

    seoTitle: "Destinator vượt mốc 10.000 xe tại Việt Nam",

    slug: "mitsubishi-destinator-vuot-moc-10000-xe-tai-viet-nam",

    category: "Thị trường ô tô",

    excerpt:
      "Theo công bố của Mitsubishi, Destinator đã vượt 10.000 xe bán ra sau hơn 10 tháng, nhanh hơn Xpander ở giai đoạn đầu. Tổng hợp doanh số qua từng mốc và cách đọc số liệu VAMA.",

    publishedAt: "2026-10-12",

    image: "/images/cars/destinator/gallery/exterior/exterior-01.jpg",

    featured: false,

    content: [
      {
        heading: "Hơn 10.000 xe sau hơn 10 tháng mở bán",
        paragraphs: [
          "Mitsubishi Motors Việt Nam công bố mẫu SUV 7 chỗ Destinator đã vượt mốc 10.000 xe bàn giao sau hơn 10 tháng có mặt tại Việt Nam. Thông tin được nhiều báo đăng tải đầu tháng 10/2026, trong đó có VOV, Tiền Phong và Autopro.",
          "Để so sánh, Xpander, mẫu xe chủ lực của Mitsubishi, từng mất khoảng một năm sau khi ra mắt mới đạt hơn 10.000 xe. Như vậy Destinator chạm mốc này sớm hơn khoảng hai tháng.",
        ],
      },
      {
        heading: "Doanh số qua từng mốc",
        paragraphs: [
          "Tuần đầu sau khi công bố: theo VOV, xe nhận hơn 2.000 đơn đặt hàng, khoảng 75% khách chọn bản cao nhất Ultimate.",
          "Tháng 12/2025, tháng đầu mở bán: 2.377 xe được bàn giao, mức doanh số tháng đầu kỷ lục của Mitsubishi tại Việt Nam theo công bố của hãng.",
          "Sau khoảng nửa năm: theo Bnews dẫn thông tin từ Mitsubishi, Destinator đạt mốc 7.000 xe.",
          "Tháng 3/2026: theo số liệu VAMA được Tuổi Trẻ dẫn lại, Destinator bán 1.663 xe, lần đầu dẫn đầu nhóm SUV/crossover cỡ C động cơ xăng, vượt Mazda CX-5. Cùng tháng, Xpander bán 1.763 xe và Xforce 1.050 xe.",
          "9 tháng đầu năm 2026: theo thống kê của Hiệp hội các nhà sản xuất ô tô Việt Nam (VAMA), Destinator đạt 7.449 xe và nhiều lần nằm trong top 10 xe xăng, dầu bán chạy theo tháng.",
        ],
        images: [
          {
            src: "/images/cars/destinator/gallery/exterior/exterior-03.jpg",
            alt: "Mitsubishi Destinator",
          },
        ],
      },
      {
        heading: "Vì sao số liệu VAMA và số của hãng khác nhau?",
        paragraphs: [
          "Cộng doanh số tháng 12/2025 (2.377 xe) với 9 tháng đầu năm 2026 theo VAMA (7.449 xe) được khoảng 9.826 xe, thấp hơn một chút so với con số hơn 10.000 xe mà hãng công bố.",
          "Chênh lệch này chủ yếu do thời điểm tính: số VAMA tính đến hết tháng 9, còn con số của hãng tính cho hơn 10 tháng kể từ khi ra mắt, tức đã sang tháng 10. Vì vậy hai con số không mâu thuẫn nhau.",
        ],
      },
      {
        heading: "Một trong ba mẫu xe chủ lực của Mitsubishi",
        paragraphs: [
          "Destinator hiện cùng Xpander và Xforce tạo thành nhóm ba mẫu xe bán chạy của Mitsubishi tại Việt Nam. Theo Tiền Phong dẫn số liệu VAMA, trong 9 tháng đầu năm 2026, ba mẫu này bán tổng cộng 27.401 xe, chiếm khoảng 85% lượng xe Mitsubishi bàn giao.",
        ],
      },
      {
        heading: "Destinator có gì?",
        paragraphs: [
          "Destinator là SUV 7 chỗ 3 hàng ghế, dùng động cơ xăng 1.5L turbo MIVEC công suất 163 PS, mô-men xoắn 250 Nm từ 2.000 vòng/phút, hộp số CVT, khoảng sáng gầm 214 mm và mâm 18 inch. Xe có hai phiên bản Premium và Ultimate, giá niêm yết 780 triệu và 855 triệu đồng, bảo hành 5 năm hoặc 150.000 km.",
          "Bản Ultimate có thêm âm thanh Yamaha 8 loa, camera 360 độ, kiểm soát hành trình thích ứng, cảnh báo và giảm thiểu va chạm phía trước, cảnh báo lệch làn. Cả hai bản đều có 6 túi khí, cảnh báo điểm mù và cảnh báo phương tiện cắt ngang khi lùi.",
          "Đang cân nhắc Destinator? Bạn có thể xem bài so sánh Destinator và Toyota Innova Cross tại mục Tư vấn, xem giá lăn bánh và ưu đãi tháng này tại bảng giá xe Mitsubishi, hoặc liên hệ Phúc để đăng ký lái thử tận nhà khu vực Bình Dương.",
        ],
      },
    ],

    source: {
      name: "Tiền Phong (tham khảo thêm VOV, Autopro, Tuổi Trẻ, Bnews)",
      url: "https://tienphong.vn/mau-suv-7-cho-pha-ky-luc-cua-mitsubishi-xpander-post1884471.tpo",
    },

    originalContent: true,
  },

  {
    id: "news-1790904201775",

    title: "Mitsubishi Attrage sắp có bản nâng cấp tại Việt Nam? Mức tiêu thụ nhiên liệu và ưu đãi tháng 10/2026",

    seoTitle: "Attrage nâng cấp sắp về Việt Nam? Tiêu hao và ưu đãi",

    slug: "mitsubishi-attrage-moi-lo-thong-so-tieu-thu-nhien-lieu-tai-viet-nam-dai-ly-manh-tay-uu-dai-xa-hang-ton",

    category: "Tin Mitsubishi",

    excerpt:
      "Hai phiên bản Attrage GLX và GLS-P vừa xuất hiện trong dữ liệu nhãn năng lượng của Cục Đăng kiểm Việt Nam. Tóm tắt những gì đã biết về bản nâng cấp, so sánh với bản đang bán và ưu đãi hiện có.",

    publishedAt: "2026-10-02",

    image: "/images/cars/attrage/gallery/exterior/exterior-01.jpg",

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

    seoTitle: "Khuyến mãi mua xe Mitsubishi tháng 10/2026",

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

    title: "Mitsubishi Pajero 2026 mở bán tại Thái Lan, giá từ 1,499 triệu baht: 3 phiên bản, máy dầu 2.4L 204 mã lực",

    seoTitle: "Pajero 2026 mở bán Thái Lan, giá từ 1,499 triệu baht",

    slug: "mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc",

    category: "Tin Mitsubishi",

    excerpt:
      "Pajero thế hệ mới mở bán tại Thái Lan từ 19/10/2026, giá 1,499 đến 1,999 triệu baht. Tổng hợp giá, thông số, trang bị từng phiên bản và khả năng về Việt Nam.",

    publishedAt: "2026-10-01",

    updatedAt: "2026-10-21",

    image: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-cover.jpg",

    featured: false,

    content: [
      {
        heading: "Pajero trở lại, đứng trên Pajero Sport",

        paragraphs: [
          "Mitsubishi Pajero thế hệ mới đã mở bán tại Thái Lan từ ngày 19/10/2026 với 3 phiên bản. Giá chính thức theo bảng giá của Mitsubishi Motors Thái Lan: GLS 2WD 1.499.000 baht, GSR 2WD 1.699.000 baht và Super Exceed 4WD 1.999.000 baht. Bản GLS thấp hơn mức dự đoán trước đó (khoảng 1,6 triệu baht).",
          "Quy đổi tham khảo theo tỷ giá chuyển khoản của Vietcombank ngày 21/10/2026 (755 đồng/baht), giá tại Thái Lan tương đương khoảng 1,13 tỷ đồng (GLS), 1,28 tỷ đồng (GSR) và 1,51 tỷ đồng (Super Exceed). Đây là giá bán tại Thái Lan, chưa phải giá bán tại Việt Nam: giá Việt Nam (nếu xe về) còn phụ thuộc thuế, phí và chính sách của Mitsubishi Motors Việt Nam.",
          "Xe dùng khung gầm rời (body-on-frame) phát triển từ nền tảng Triton thế hệ mới, được gia cố cho một mẫu SUV cỡ lớn. Kích thước dài 4.920 mm, rộng 1.925 mm, cao 1.900–1.910 mm, chiều dài cơ sở 2.870 mm, khoảng sáng gầm 230 mm. Góc tiếp cận, góc vượt đỉnh dốc và góc thoát lần lượt là 30,4, 22,6 và 25,8 độ, phù hợp với nhu cầu đi đường xấu.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-01.jpg",
            alt: "Mitsubishi Pajero 2026 chạy trên địa hình sa mạc",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-02.jpg",
            alt: "Đuôi xe Mitsubishi Pajero 2026 màu nâu đồng",
          },
        ],
      },
      {
        heading: "Động cơ chung gốc với Triton nhưng mạnh hơn",

        paragraphs: [
          "Cả 3 phiên bản dùng động cơ dầu 2.4L 4 xi-lanh (mã 4N16) với tăng áp biến thiên VGT, công suất 204 mã lực tại 3.500 vòng/phút, mô-men xoắn 480 Nm tại 1.750–2.500 vòng/phút, đi kèm hộp số tự động 8 cấp có lẫy chuyển số. GLS và GSR dẫn động cầu sau, Super Exceed dẫn động 4 bánh S-AWC.",
          "So với Triton đang bán tại Việt Nam (204 PS, 470 Nm, hộp số tự động 6 cấp), động cơ của Pajero được chỉnh lại bộ tăng áp và nhiều chi tiết bên trong, mô-men xoắn cao hơn 10 Nm, hộp số tăng lên 8 cấp. Bản Thái Lan đạt tiêu chuẩn khí thải mà không cần dung dịch AdBlue.",
          "Hệ S-AWC trên bản Super Exceed có các chế độ 2H, 4H, 4HLc và 4LLc, cùng 7 chế độ lái: Eco, Normal, Gravel, Snow, Mud, Sand và Rock, dùng cho cả đường thường lẫn bề mặt trơn trượt hoặc địa hình khó.",
          "Theo Mitsubishi, khung gầm rời lấy từ Triton nhưng khoang cabin, hệ treo trước và sau được phát triển riêng cho Pajero, nhằm giữ khả năng off-road mà vẫn êm ái khi đi đường trường.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-03.jpg",
            alt: "Động cơ dầu 2.4L 4N16 tăng áp VGT của Mitsubishi Pajero 2026",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-04.jpg",
            alt: "Khung gầm rời (ladder frame) của Mitsubishi Pajero 2026",
          },
        ],
      },
      {
        heading: "Trang bị từng phiên bản",

        paragraphs: [
          "Xe có 3 hàng ghế, 7 chỗ. Hàng ghế thứ hai trượt được 150 mm và gập 60:40, hàng thứ ba gập 50:50 để mở rộng khoang hành lý.",
          "GLS: dù là bản tiêu chuẩn nhưng đã có đồng hồ kỹ thuật số và màn hình giải trí cùng kích thước 12,3 inch, Apple CarPlay và Android Auto không dây, sạc không dây, cổng USB-C, 6 loa, 7 túi khí, camera 360 độ. Gói hỗ trợ lái gồm kiểm soát hành trình thích ứng, cảnh báo điểm mù, hỗ trợ chuyển làn, hỗ trợ giữ làn, cảnh báo lệch làn, giảm thiểu va chạm phía trước và cảnh báo phương tiện cắt ngang phía trước, phía sau.",
          "GSR: thêm mâm 20 inch hai tông màu, đèn LED thích ứng, đèn Dynamic Flow Light trước và sau, điều hòa 2 vùng, lọc không khí Nanoe-X, ghế và vô-lăng nhớ vị trí, hộp làm mát ở bệ tỳ tay và hệ thống âm thanh Yamaha Dynamic Sound Ultimate 12 loa.",
          "Super Exceed: mâm và lưới tản nhiệt riêng, ốp bảo vệ gầm, nội thất đen phối nâu, cửa sổ trời toàn cảnh, ghế da Semi-Aniline có thông gió, gương chiếu hậu kỹ thuật số, kết nối Mitsubishi CONNECT và hệ thống hỗ trợ lái MI-PILOT.",
          "Một chi tiết gợi nhớ các đời Pajero trước là Multi Meter: màn hình hiển thị độ cao, hướng la bàn, nhiệt độ bên ngoài, góc nghiêng dọc, nghiêng ngang của xe và mức phân bổ lực kéo trái phải, rất hữu ích khi đi địa hình.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-05.jpg",
            alt: "Khoang lái Mitsubishi Pajero 2026 với màn hình 12,3 inch, nội thất đen phối nâu",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-06.jpg",
            alt: "Màn hình Multi Meter hiển thị độ cao, la bàn và góc nghiêng trên Mitsubishi Pajero 2026",
          },
          {
            src: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-07.jpg",
            alt: "Bố trí 3 hàng ghế 7 chỗ của Mitsubishi Pajero 2026",
          },
        ],
      },
      {
        heading: "Khi nào Pajero về Việt Nam?",

        paragraphs: [
          "Pajero mới được Mitsubishi ra mắt toàn cầu ngày 2/9/2026 và sản xuất tại Thái Lan. Thái Lan là thị trường mở bán đầu tiên (từ 19/10/2026). Theo kế hoạch của hãng, sau Thái Lan là Nhật Bản và Úc trong năm tài chính 2026, rồi mở rộng ra khoảng 100 quốc gia, gồm cả khu vực ASEAN, từ năm tài chính 2027.",
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

    seoTitle: "Outlander PHEV 2026 tại Đông Nam Á: 302 mã lực",

    slug: "anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang",

    category: "Tin Mitsubishi",

    excerpt:
      "Outlander PHEV phiên bản mới đã được bán tại Philippines. Tổng hợp kích thước, trang bị, cách hoạt động của hệ hybrid sạc điện và những điều cần biết nếu xe về Việt Nam.",

    publishedAt: "2026-10-01",

    image: "/images/news/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang-official.jpg",

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
          "Xe dùng động cơ xăng 2.4L MIVEC, hai mô-tơ điện và pin 22,7 kWh, tổng công suất 302 mã lực (306 PS), mô-men xoắn 450 Nm. Theo Mitsubishi, xe chạy được khoảng 100 km chỉ bằng điện và gần 1.000 km khi kết hợp xăng và điện.",
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
          "Ngày 21/8/2026, Mitsubishi Motors Philippines bắt đầu bán Outlander PHEV. Đây là lần đầu Outlander PHEV thế hệ hiện tại có mặt tại khu vực ASEAN. Giá niêm yết tại Philippines là 2,848 triệu peso, khoảng 1,2 tỷ đồng. Mitsubishi Motors Việt Nam chưa công bố giá và thời gian mở bán. Giá tại Việt Nam còn phụ thuộc thuế và chính sách cho xe hybrid sạc điện, nên chưa thể suy ra từ giá Philippines.",
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

    seoTitle: "Outlander thế hệ thứ năm có thể ra mắt năm 2028",

    slug: "mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028",

    category: "Tin Mitsubishi",

    excerpt:
      "Theo báo chí Nhật Bản, Outlander thế hệ thứ năm có thể ra mắt khoảng năm 2028, lấy cảm hứng từ Elevance Concept và dùng hệ PHEV mới. Đây là thông tin chưa được Mitsubishi xác nhận.",

    publishedAt: "2026-10-01",

    updatedAt: "2026-10-26",

    image: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028/elevance-cover.jpg",

    featured: false,

    content: [
      {
        heading: "Lưu ý: khác với Outlander về Việt Nam năm 2026",
        paragraphs: [
          "Bài này nói về thế hệ Outlander kế tiếp (thế hệ thứ năm), phát triển từ mẫu Elevance Concept và được báo chí nước ngoài dự đoán ra mắt toàn cầu khoảng năm 2028. Mẫu Outlander mà Mitsubishi Motors Việt Nam xác nhận đưa về nước trong năm 2026 (bản hybrid nhẹ) là thế hệ hiện đang bán ở nhiều nước. Xem bài \"Mitsubishi Outlander thế hệ mới xuất hiện tại Việt Nam\" trong mục Tin tức để biết thông tin mới nhất.",
        ],
      },
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
        images: [
          {
            src: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028/elevance-01.jpg",
            alt: "Mitsubishi Elevance Concept nhìn ngang, kéo theo rơ-moóc cắm trại",
          },
          {
            src: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028/elevance-02.jpg",
            alt: "Đuôi xe Mitsubishi Elevance Concept với dải đèn LED nằm ngang",
          },
        ],
      },
      {
        heading: "Hệ PHEV 4 mô-tơ và S-AWC thế hệ mới",

        paragraphs: [
          "Outlander PHEV hiện tại dùng động cơ xăng 2.4L hút khí tự nhiên, hai mô-tơ điện và pin lithium-ion 22,7 kWh. Thế hệ mới được cho là sẽ dùng bốn mô-tơ điện thay vì hai, vừa tăng công suất, vừa giúp hệ S-AWC thế hệ mới phân bổ lực kéo chính xác tới từng bánh xe, cải thiện độ bám và khả năng vào cua.",
          "Theo Mitsubishi, Elevance Concept đã dùng hệ dẫn động 4 bánh với 4 mô-tơ điện và S-AWC, cùng hệ PHEV có động cơ tương thích nhiên liệu trung hòa carbon. Đây là cơ sở để báo chí dự đoán cấu hình của Outlander thế hệ mới.",
          "Lưu ý: công suất và quãng đường chạy điện của Outlander PHEV hiện tại được công bố khác nhau giữa các thị trường (khoảng 297–302 mã lực, chạy điện khoảng 100–106 km) do khác phiên bản và tiêu chuẩn đo. Các con số này chỉ nên dùng để tham khảo.",
        ],
        images: [
          {
            src: "/images/news/mitsubishi-outlander-the-he-moi-co-the-ra-mat-vao-nam-2028/elevance-03.jpg",
            alt: "Mitsubishi Elevance Concept mở cửa, đang cắm sạc điện",
          },
        ],
      },
      {
        heading: "Ý nghĩa với khách hàng Việt Nam",

        paragraphs: [
          "Thông tin về thế hệ thứ năm (khoảng năm 2028) mới là dự đoán của báo chí Nhật Bản, Mitsubishi chưa xác nhận.",
          "Cập nhật 19/10/2026: thế hệ Outlander đang bán ở nhiều nước (không phải thế hệ 2028 nói trong bài này) đã được Mitsubishi Motors Việt Nam xác nhận đưa về nước trong năm 2026 với bản hybrid nhẹ, và vừa xuất hiện trên xe vận chuyển tại Việt Nam. Xem chi tiết ở bài \"Mitsubishi Outlander thế hệ mới xuất hiện tại Việt Nam\" trong mục Tin tức.",
          "Nếu bạn cần xe 7 chỗ ngay, Destinator và Xpander Cross đang có giá và ưu đãi rõ ràng. Liên hệ Lưu Hoàng Phúc để được tư vấn mẫu xe phù hợp và lái thử.",
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

    seoTitle: "Khuyến mãi Mitsubishi tháng 09/2026",

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
  }
];

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
