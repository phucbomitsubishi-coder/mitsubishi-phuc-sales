// Số liệu xe đối thủ dùng trong các bài so sánh /tu-van/so-sanh-...
// Mỗi xe cần ít nhất 2 nguồn (VnExpress + trang hãng hoặc đại lý). Số liệu nào các nguồn
// không khớp thì bỏ, không đưa lên trang.
// Khi hãng đổi giá: sửa `variants`, cập nhật `updated` (tháng/năm) và kiểm tra lại nguồn.

export type CompetitorSpecs = {
  type?: string;
  dimensions?: string;
  wheelbase?: string;
  groundClearance?: string;
  engine?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  drivetrain?: string;
  wheels?: string;
  fuelConsumption?: string;
  airbags?: string;
  warranty?: string;
};

export type CompetitorCar = {
  name: string;
  seats: number;
  // Bán tải chở hàng: tính trước bạ 60%, phí biển số và phí đường bộ theo xe tải (giống Triton)
  isPickup?: boolean;
  // Tháng/năm của giá niêm yết, dạng "10/2026"
  updated: string;
  // Ghi chú thêm về giá (phụ phí màu sơn...), hiện dưới bảng giá
  priceNote?: string;
  variants: { name: string; price: number }[];
  specs: CompetitorSpecs;
  sources: { name: string; url: string }[];
};

export const competitors = {
  hyundaiCreta: {
    name: "Hyundai Creta",
    seats: 5,
    updated: "09/2026",
    variants: [
      { name: "1.5 Tiêu chuẩn", price: 599_000_000 },
      { name: "1.5 Đặc biệt", price: 659_000_000 },
      { name: "1.5 Cao cấp", price: 705_000_000 },
      { name: "1.5 N Line", price: 715_000_000 },
    ],
    specs: {
      type: "SUV cỡ B, 5 chỗ",
      dimensions: "4.330 × 1.790 × 1.660 mm",
      wheelbase: "2.610 mm",
      groundClearance: "200 mm",
      engine: "Xăng 1.5L Smartstream",
      power: "115 mã lực / 6.300 vòng/phút",
      torque: "144 Nm / 4.500 vòng/phút",
      transmission: "IVT (vô cấp), cầu trước",
      wheels: "17 inch, 18 inch (N Line)",
    },
    sources: [
      {
        name: "VnExpress – Hyundai Creta: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/hyundai-creta-204",
      },
      {
        name: "Hyundai City – New Hyundai Creta 2026: giá và thông số",
        url: "https://hyundaicity.com.vn/hyundai-creta",
      },
    ],
  },

  toyotaVelozCross: {
    name: "Toyota Veloz Cross",
    seats: 7,
    updated: "10/2026",
    priceNote: "màu trắng ngọc trai cộng thêm 8 triệu đồng",
    variants: [
      { name: "Veloz Cross CVT", price: 638_000_000 },
      { name: "Veloz Cross CVT Top", price: 660_000_000 },
    ],
    specs: {
      type: "MPV 7 chỗ",
      dimensions: "4.475 × 1.750 × 1.700 mm",
      wheelbase: "2.750 mm",
      groundClearance: "205 mm",
      engine: "Xăng 1.5L 2NR-VE",
      power: "105 mã lực / 6.000 vòng/phút",
      torque: "138 Nm / 4.200 vòng/phút",
      transmission: "Vô cấp CVT",
      wheels: "16 inch (CVT), 17 inch (CVT Top)",
      airbags: "6 túi khí (CVT Top)",
    },
    sources: [
      {
        name: "VnExpress – Toyota Veloz Cross: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/toyota-veloz-cross-205",
      },
      {
        name: "Toyota Việt Nam – Giá xe Veloz Cross",
        url: "https://www.toyota.com.vn/tin-tuc/thong-tin-bo-tro/gia-xe-veloz-cross-43152",
      },
    ],
  },

  // Số túi khí và màn hình bản E các nguồn ghi khác nhau nên chỉ ghi theo bản G.
  toyotaVios: {
    name: "Toyota Vios",
    seats: 5,
    updated: "10/2026",
    priceNote: "màu trắng ngọc trai cộng thêm 8 triệu đồng",
    variants: [
      { name: "1.5E MT", price: 458_000_000 },
      { name: "1.5E CVT", price: 488_000_000 },
      { name: "1.5G CVT", price: 545_000_000 },
    ],
    specs: {
      type: "Sedan hạng B, 5 chỗ",
      dimensions: "4.425 × 1.730 × 1.475 mm (bản G cao 1.480 mm)",
      wheelbase: "2.550 mm",
      groundClearance: "133 mm",
      engine: "Xăng 1.5L, 4 xi-lanh",
      power: "106 mã lực / 6.000 vòng/phút",
      torque: "140 Nm / 4.200 vòng/phút",
      transmission: "Số sàn 5 cấp (E MT), vô cấp CVT",
      fuelConsumption: "Khoảng 5,8–6,0 lít/100 km",
      airbags: "7 túi khí (bản G)",
    },
    sources: [
      {
        name: "VnExpress – Toyota Vios: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/toyota-vios-147",
      },
      {
        name: "Toyota Việt Nam – Giá Toyota Vios",
        url: "https://www.toyota.com.vn/tin-tuc/thong-tin-bo-tro/gia-vios-42970",
      },
      {
        name: "Bonbanh – Thông số kỹ thuật Toyota Vios G 1.5 CVT 2026",
        url: "https://bonbanh.com/chi-tiet-thong-so-ky-thuat-xe-toyota-vios-g-1.5-cvt-nam-2026-18601",
      },
    ],
  },

  // Giá từ 01/10/2026 (bản 2.0L tăng 19–24 triệu). Khoảng sáng gầm và số túi khí từng bản
  // các nguồn ghi khác nhau nên chưa đưa vào.
  fordRanger: {
    name: "Ford Ranger",
    seats: 5,
    isPickup: true,
    updated: "10/2026",
    priceNote: "một số màu như cam, đỏ cộng thêm 8 triệu đồng",
    variants: [
      { name: "XLS 2.0L AT 4x2", price: 726_000_000 },
      { name: "XLS 2.0L AT 4x4", price: 795_000_000 },
      { name: "Wildtrak 2.0L AT 4x4", price: 973_000_000 },
      { name: "Wildtrak 3.0L V6 AT 4x4", price: 1_093_000_000 },
    ],
    specs: {
      type: "Bán tải cỡ trung, 5 chỗ",
      dimensions: "Dài khoảng 5.350–5.370 mm, rộng 1.918 mm",
      wheelbase: "3.270 mm",
      engine: "Dầu 2.0L Turbo (XLS, Wildtrak 2.0L), dầu V6 3.0L (Wildtrak 3.0L)",
      power: "170 PS (2.0L), 250 PS (V6 3.0L)",
      torque: "405 Nm (2.0L), 600 Nm (V6 3.0L)",
      transmission: "Tự động 10 cấp",
      drivetrain: "Cầu sau (4x2) hoặc hai cầu (4x4)",
      warranty: "5 năm hoặc 150.000 km",
    },
    sources: [
      {
        name: "VnExpress – Ford Ranger: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/ford-ranger-39",
      },
      {
        name: "Dân trí – Ford Ranger tăng giá tại Việt Nam, bản Wildtrak 2.0L sát mốc 1 tỷ đồng",
        url: "https://dantri.com.vn/o-to-xe-may/ford-ranger-sap-tang-gia-tai-viet-nam-ban-wildtrak-20l-sat-moc-1-ty-dong-20260914124448765.htm",
      },
      {
        name: "Tuổi Trẻ – Ford Ranger 2026 bản rẻ nhất được bổ sung nhiều trang bị",
        url: "https://tuoitre.vn/ford-ranger-2026-ban-re-nhat-gia-nhu-ban-cu-duoc-bo-sung-nhieu-trang-bi-tien-nghi-dau-hilux-triton-100260701233836365.htm",
      },
    ],
  },

  // Giá và thông số lấy từ trang chính thức toyota.com.vn (API thông số từng phiên bản, 10/2026),
  // đối chiếu giá 2.0G với VietnamNet và giá các bản với Bonbanh.
  toyotaInnovaCross: {
    name: "Toyota Innova Cross",
    seats: 8,
    updated: "10/2026",
    variants: [
      { name: "2.0G", price: 730_000_000 },
      { name: "2.0V", price: 825_000_000 },
      { name: "2.0 HEV (hybrid)", price: 960_000_000 },
    ],
    specs: {
      type: "MPV gầm cao, 8 chỗ (2.0G, 2.0V), 7 chỗ (HEV)",
      dimensions: "4.755 × 1.845 × 1.785–1.790 mm (HEV rộng 1.850 mm)",
      wheelbase: "2.850 mm",
      groundClearance: "170 mm (HEV 167 mm)",
      engine: "Xăng 2.0L (2.0G, 2.0V); xăng 2.0L kết hợp mô-tơ điện (HEV)",
      power: "172 mã lực (2.0G, 2.0V); máy xăng 150 mã lực + mô-tơ điện 83 kW (HEV)",
      torque: "205 Nm (2.0G, 2.0V); máy xăng 188 Nm + mô-tơ điện 206 Nm (HEV)",
      transmission: "Vô cấp CVT (2.0G, 2.0V), e-CVT (HEV)",
      drivetrain: "Cầu trước",
      wheels: "16 inch (2.0G), 17 inch (2.0V), 18 inch (HEV)",
      fuelConsumption: "7,1–7,2 lít/100 km (2.0G, 2.0V); 4,7 lít/100 km (HEV), kết hợp",
      airbags: "6 túi khí",
    },
    sources: [
      {
        name: "Toyota Việt Nam – Innova Cross: giá và thông số kỹ thuật từng phiên bản",
        url: "https://www.toyota.com.vn/innova-cross",
      },
      {
        name: "VietnamNet – Giá trên 700 triệu: mua Toyota Innova Cross 2.0G hay Mitsubishi Destinator?",
        url: "https://vietnamnet.vn/gia-tren-700-trieu-mua-toyota-innova-cross-hay-mitsubishi-destinator-2468435.html",
      },
      {
        name: "Bonbanh – Giá xe Toyota Innova Cross",
        url: "https://bonbanh.com/gia-xe-oto-toyota-innova",
      },
    ],
  },

  // Kích thước, gầm, khoang hành lý, tiêu hao, giá: trang chính thức suzuki.com.vn (10/2026).
  // Công suất, mô-men, hộp số, mâm: VnExpress và 24h (Suzuki không công bố). Số túi khí và
  // chiều dài cơ sở chưa có hai nguồn khớp nhau nên chưa đưa vào.
  suzukiXL7: {
    name: "Suzuki XL7 Hybrid",
    seats: 7,
    updated: "10/2026",
    variants: [{ name: "Hybrid 1.5 AT", price: 599_900_000 }],
    specs: {
      type: "MPV phong cách SUV, 7 chỗ",
      dimensions: "4.450 × 1.775 × 1.710 mm",
      groundClearance: "200 mm",
      engine: "Xăng 1.5L K15B, hybrid nhẹ (máy phát khởi động ISG)",
      power: "103 mã lực / 6.000 vòng/phút",
      torque: "138 Nm / 4.400 vòng/phút",
      transmission: "Tự động 4 cấp",
      drivetrain: "Cầu trước",
      wheels: "16 inch",
      fuelConsumption: "5,9 lít/100 km (kết hợp)",
    },
    sources: [
      {
        name: "Suzuki Việt Nam – XL7 Hybrid: giá và thông số kỹ thuật",
        url: "https://suzuki.com.vn/cars/xl7-hybrid",
      },
      {
        name: "VnExpress – Suzuki XL7: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/suzuki-xl7-hybrid-144",
      },
      {
        name: "24h – Giá xe Suzuki XL7 Hybrid lăn bánh tháng 10/2026",
        url: "https://www.24h.com.vn/o-to/gia-xe-suzuki-xl7-hybrid-lan-banh-thang-10-2026-uu-dai-100-phi-truoc-ba-c747a1800936.html",
      },
    ],
  },

  toyotaYarisCross: {
    name: "Toyota Yaris Cross",
    seats: 5,
    updated: "10/2026",
    variants: [
      { name: "1.5 xăng", price: 650_000_000 },
      { name: "1.5 HEV (hybrid)", price: 728_000_000 },
    ],
    specs: {
      type: "SUV cỡ B, 5 chỗ",
      dimensions: "4.310 × 1.770 × 1.655 mm",
      wheelbase: "2.620 mm",
      groundClearance: "210 mm",
      engine: "Xăng 1.5L 2NR-VE; bản HEV: 1.5L + mô-tơ điện (hybrid)",
      power: "105 mã lực / 6.000 vòng/phút; HEV: máy xăng 90 mã lực + mô-tơ 79 mã lực",
      torque: "138 Nm / 4.200 vòng/phút; HEV: máy xăng 121 Nm + mô-tơ 141 Nm",
      transmission: "Vô cấp (CVT), cầu trước",
      drivetrain: "Cầu trước",
      wheels: "18 inch",
      fuelConsumption: "5,95 lít/100 km; HEV 3,8 lít/100 km (kết hợp)",
      airbags: "6",
    },
    sources: [
      {
        name: "Toyota Việt Nam – Yaris Cross: giá và thông số kỹ thuật từng phiên bản",
        url: "https://www.toyota.com.vn/yaris-cross",
      },
      {
        name: "Bonbanh – Giá xe Toyota Yaris Cross",
        url: "https://bonbanh.com/gia-xe-oto-toyota-yaris-cross",
      },
    ],
  },

  // Giá, thông số: API thông số từng phiên bản trên toyota.com.vn (15/10/2026), đối chiếu giá với
  // VnExpress và thông số với Bonbanh. Toyota không công bố mức tiêu hao nhiên liệu Hilux mới nên chưa đưa vào.
  toyotaHilux: {
    name: "Toyota Hilux",
    seats: 5,
    isPickup: true,
    updated: "10/2026",
    priceNote: "màu trắng ngọc trai cộng thêm 8 triệu đồng",
    variants: [
      { name: "Standard 2.8 4x2 MT", price: 632_000_000 },
      { name: "Pro 2.8 4x2 AT", price: 706_000_000 },
      { name: "Trailhunter 2.8 4x4 AT", price: 903_000_000 },
    ],
    specs: {
      type: "Bán tải cỡ trung, 5 chỗ",
      dimensions: "5.320 × 1.885 × 1.815 mm (Standard rộng 1.855 mm)",
      wheelbase: "3.085 mm",
      groundClearance: "312 mm",
      engine: "Dầu 2.8L Turbo (1GD-FTV)",
      power: "201 mã lực",
      torque: "420 Nm (số sàn), 500 Nm (số tự động)",
      transmission: "Số sàn 6 cấp (Standard), tự động 6 cấp (Pro, Trailhunter)",
      drivetrain: "Cầu sau (Standard, Pro), hai cầu bán thời gian (Trailhunter)",
      wheels: "17 inch (Standard, Pro), 18 inch (Trailhunter)",
      airbags: "3 túi khí (Standard, Pro), 7 túi khí (Trailhunter)",
    },
    sources: [
      {
        name: "Toyota Việt Nam – Hilux: giá và thông số kỹ thuật từng phiên bản",
        url: "https://www.toyota.com.vn/hilux",
      },
      {
        name: "VnExpress – Toyota Hilux: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/toyota-hilux-159",
      },
      {
        name: "Bonbanh – Thông số kỹ thuật Toyota Hilux Pro 2.8L 4x2 AT 2026",
        url: "https://bonbanh.com/chi-tiet-thong-so-ky-thuat-xe-toyota-hilux-pro-2.8l-4x2-at-2026-18478",
      },
    ],
  },

  // Giá, thông số: toyota.com.vn (15/10/2026), giá đối chiếu VnExpress, thông số đối chiếu Bonbanh.
  // Mức tiêu hao nhiên liệu Toyota và Bonbanh ghi khác nhau nên chưa đưa vào.
  toyotaAvanzaPremio: {
    name: "Toyota Avanza Premio",
    seats: 7,
    updated: "10/2026",
    variants: [
      { name: "MT", price: 558_000_000 },
      { name: "CVT", price: 598_000_000 },
    ],
    specs: {
      type: "MPV 7 chỗ",
      dimensions: "4.395 × 1.730 × 1.700 mm",
      wheelbase: "2.750 mm",
      groundClearance: "205 mm",
      engine: "Xăng 1.5L (2NR-VE)",
      power: "105 mã lực / 6.000 vòng/phút",
      torque: "138 Nm / 4.200 vòng/phút",
      transmission: "Số sàn (MT), vô cấp CVT (CVT)",
      drivetrain: "Cầu trước",
      wheels: "16 inch",
      airbags: "2 túi khí (MT), 6 túi khí (CVT)",
    },
    sources: [
      {
        name: "Toyota Việt Nam – Avanza Premio: giá và thông số kỹ thuật từng phiên bản",
        url: "https://www.toyota.com.vn/avanza-premio",
      },
      {
        name: "VnExpress – Toyota Avanza Premio: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/toyota-avanza-151",
      },
      {
        name: "Bonbanh – Thông số kỹ thuật Toyota Avanza Premio 1.5 AT 2026",
        url: "https://bonbanh.com/chi-tiet-thong-so-ky-thuat-xe-toyota-avanza-premio-1.5-at-2026-18617",
      },
    ],
  },

  // Giá: VnExpress (10/2026), đối chiếu Bonbanh và Báo Lâm Đồng (bản Cao cấp 569 triệu, 09/2026).
  // Thông số: trang Hyundai Thành Công, đối chiếu Bonbanh. Cỡ lốp hai nguồn ghi khác nhau (185/55R15
  // và 185/65R15), mức tiêu hao chỉ có một nguồn, nên chưa đưa vào.
  hyundaiAccent: {
    name: "Hyundai Accent",
    seats: 5,
    updated: "10/2026",
    variants: [
      { name: "1.5 MT", price: 439_000_000 },
      { name: "1.5 AT", price: 489_000_000 },
      { name: "1.5 AT Đặc biệt", price: 529_000_000 },
      { name: "1.5 AT Cao cấp", price: 569_000_000 },
    ],
    specs: {
      type: "Sedan hạng B, 5 chỗ",
      dimensions: "4.535 × 1.765 × 1.485 mm",
      wheelbase: "2.670 mm",
      groundClearance: "165 mm",
      engine: "Xăng 1.5L Smartstream",
      power: "115 PS / 6.300 vòng/phút",
      torque: "144 Nm / 4.500 vòng/phút",
      transmission: "Số sàn 6 cấp (MT), vô cấp CVT (các bản AT)",
      drivetrain: "Cầu trước",
      wheels: "15 inch, 16 inch (Cao cấp)",
      airbags: "2 túi khí (MT, AT), 4 (Đặc biệt), 6 (Cao cấp)",
    },
    sources: [
      {
        name: "VnExpress – Hyundai Accent: giá lăn bánh, thông số kỹ thuật",
        url: "https://vnexpress.net/oto-xe-may/v-car/dong-xe/hyundai-accent-47",
      },
      {
        name: "Hyundai Thành Công – All New Accent",
        url: "https://hyundai.thanhcong.vn/all-new-accent",
      },
      {
        name: "Bonbanh – Thông số kỹ thuật Hyundai Accent Cao cấp 1.5 AT 2026",
        url: "https://bonbanh.com/chi-tiet-thong-so-ky-thuat-xe-hyundai-accent-cao-cap-1.5-at-2026-18420",
      },
      {
        name: "Báo Lâm Đồng – Đánh giá Hyundai Accent 2026 bản 1.5 AT Cao cấp",
        url: "https://baolamdong.vn/danh-gia-xe-hyundai-accent-2026-ban-15-at-cao-cap-dot-pha-thiet-ke-va-goi-an-toan-smartsense-466178.html",
      },
    ],
  },
} satisfies Record<string, CompetitorCar>;
