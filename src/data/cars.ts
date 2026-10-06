export type CarVariant = {
  name: string;
  price: number;
  promotionalPrice?: number;

  specifications?: {
    engine?: string;
    displacement?: string;
    transmission?: string;
    drivetrain?: string;
    power?: string;
    torque?: string;
    seats?: number;
    fuel?: string;

    dimensions?: string;
    wheelbase?: string;
    groundClearance?: string;
    fuelTank?: string;
    wheels?: string;

    curbWeight?: string;
    turningRadius?: string;

    fuelConsumptionCombined?: string;
    fuelConsumptionUrban?: string;
    fuelConsumptionExtraUrban?: string;
  };

  equipment?: {
    exterior?: string[];
    interior?: string[];
    convenience?: string[];
    safety?: string[];
    drivingSupport?: string[];
  };

  safetyTechnologies?: {
  code: string;
  name: string;
  description: string;
  group?: string;
}[];

  features?: string[];
  colors?: string[];
};
export type Car = {
  id: string;
  name: string;
  slug: string;
  category: "SUV" | "MPV" | "Sedan" | "Pickup";
  status: "available" | "coming-soon";
  featured: boolean;
  // true = ẩn khỏi toàn bộ website (menu, trang chủ, form, công cụ tính, sitemap).
  // Xóa dòng này (hoặc đặt false) khi xe chính thức mở bán.
  hidden?: boolean;

  shortDescription: string;
  image: string;

  promotion: {
    title: string;
    description: string;
  };

  variants: CarVariant[];

  colors: string[];

  specifications: {
    seats: number;
    engine: string;
    transmission: string;
    fuel: string;
  };

  highlights: {
    exterior: string[];
    interior: string[];
    safety: string[];
    performance: string[];
  };
};

const allCars: Car[] = [
  {
    id: "xforce",
    name: "Mitsubishi Xforce",
    slug: "mitsubishi-xforce",
    category: "SUV",
    status: "available",
    featured: true,

    shortDescription:
      "SUV đô thị 5 chỗ với thiết kế hiện đại, khoảng sáng gầm cao và nhiều công nghệ hỗ trợ người lái.",

image: "/images/cars/xforce.png",
    promotion: {
      title: "Ưu đãi Mitsubishi Xforce",
      description:
  "Liên hệ Lưu Hoàng Phúc để nhận báo giá Mitsubishi Xforce, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

    variants: [
  {
    name: "GLX",
    price: 605000000,
    specifications: {
  engine: "Xăng 1.5L MIVEC",
  displacement: "1.5L",
  transmission: "CVT",
  drivetrain: "Cầu trước",
  power: "105 PS / 6.000 rpm",
  torque: "141 Nm / 4.000 rpm",
  seats: 5,
  fuel: "Xăng",
  dimensions: "4.390 × 1.810 × 1.660 mm",
  wheelbase: "2.650 mm",
  groundClearance: "219 mm",
  fuelTank: "42 L",
  wheels: "205/60R17 - Mâm hợp kim 17 inch",
  curbWeight: "1.210 kg",
turningRadius: "5,2 m",
fuelConsumptionCombined: "6,30 L/100 km",
fuelConsumptionUrban: "7,70 L/100 km",
fuelConsumptionExtraUrban: "5,50 L/100 km",
},

equipment: {
  exterior: [
    "Đèn chiếu sáng LED T-Shape",
    "Đèn sương mù phía trước LED",
    "Cảm biến bật/tắt đèn chiếu sáng và gạt mưa tự động",
    "Mâm hợp kim 17 inch",
  ],
  interior: [
    "Màn hình giải trí 8 inch kết nối Android Auto và Apple CarPlay",
    "Hệ thống âm thanh 6 loa",
  ],
  convenience: [
    "Phanh tay điện tử và Auto Hold",
    "Cổng sạc USB-A và USB-C cho cả hai hàng ghế",
    "Khoang hành lý rộng rãi",
  ],
  safety: [
    "4 túi khí",
    "Cảm biến lùi",
  ],
  drivingSupport: [
    "Hệ thống kiểm soát vào cua chủ động AYC",
  ],
},

safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
],

    colors: ["Trắng", "Đen", "Đỏ"],
  },
  {
    name: "Luxury",
    price: 665000000,
    specifications: {
  engine: "Xăng 1.5L MIVEC",
  displacement: "1.5L",
  transmission: "CVT",
  drivetrain: "Cầu trước",
  power: "105 PS / 6.000 rpm",
  torque: "141 Nm / 4.000 rpm",
  seats: 5,
  fuel: "Xăng",
  dimensions: "4.390 × 1.810 × 1.660 mm",
  wheelbase: "2.650 mm",
  groundClearance: "222 mm",
  fuelTank: "42 L",
  wheels: "225/50R18 - Mâm hợp kim 18 inch",
  curbWeight: "1.240 kg",
turningRadius: "5,2 m",
fuelConsumptionCombined: "6,30 L/100 km",
fuelConsumptionUrban: "7,70 L/100 km",
fuelConsumptionExtraUrban: "5,50 L/100 km",
},

equipment: {
  exterior: [
    "Đèn chiếu sáng LED T-Shape",
    "Đèn sương mù phía trước LED",
    "Cảm biến bật/tắt đèn chiếu sáng và gạt mưa tự động",
    "Mâm hợp kim 18 inch",
  ],
  interior: [
    "Màn hình giải trí 12,3 inch",
    "Màn hình thông tin kỹ thuật số 8 inch",
    "Vô lăng bọc da",
  ],
  convenience: [
    "Phanh tay điện tử và Auto Hold",
    "Điều hòa tự động",
    "Cổng sạc USB-A và USB-C",
    "Chìa khóa thông minh và khởi động nút bấm",
  ],
  safety: [
    "6 túi khí",
    "Camera lùi",
    "Cảm biến hỗ trợ đỗ xe",
  ],
  drivingSupport: [
    "Hệ thống kiểm soát vào cua chủ động AYC",
    "4 chế độ lái",
  ],
},

safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
],

    colors: ["Trắng", "Đen", "Đỏ", "Xám"],
  },
  {
    name: "Ultimate",
    price: 720000000,
    specifications: {
  engine: "Xăng 1.5L MIVEC",
  displacement: "1.5L",
  transmission: "CVT",
  drivetrain: "Cầu trước",
  power: "105 PS / 6.000 rpm",
  torque: "141 Nm / 4.000 rpm",
  seats: 5,
  fuel: "Xăng",
  dimensions: "4.390 × 1.810 × 1.660 mm",
  wheelbase: "2.650 mm",
  groundClearance: "222 mm",
  fuelTank: "42 L",
  wheels: "225/50R18 - Mâm hợp kim 18 inch",
  curbWeight: "1.250 kg",
turningRadius: "5,2 m",
fuelConsumptionCombined: "6,30 L/100 km",
fuelConsumptionUrban: "7,70 L/100 km",
fuelConsumptionExtraUrban: "5,50 L/100 km",
},

equipment: {
  exterior: [
    "Đèn chiếu sáng LED T-Shape",
    "Đèn sương mù phía trước LED",
    "Cảm biến bật/tắt đèn chiếu sáng và gạt mưa tự động",
    "Mâm hợp kim 18 inch",
    "Cốp sau đóng/mở điện rảnh tay",
  ],
  interior: [
    "Màn hình giải trí 12,3 inch",
    "Màn hình thông tin kỹ thuật số 8 inch",
    "Hệ thống âm thanh Dynamic Sound Yamaha Premium 8 loa",
    "Ghế lái chỉnh điện",
  ],
  convenience: [
    "Phanh tay điện tử và Auto Hold",
    "Điều hòa tự động hai vùng độc lập",
    "Cổng sạc USB-A và USB-C",
    "Chìa khóa thông minh và khởi động nút bấm",
  ],
  safety: [
    "6 túi khí",
    "Camera toàn cảnh 360 độ",
    "Cảm biến hỗ trợ đỗ xe",
  ],
  drivingSupport: [
    "Hệ thống kiểm soát vào cua chủ động AYC",
    "4 chế độ lái",
    "Hệ thống an toàn chủ động Mitsubishi Motors Safety Sensing - Diamond Sense",
  ],
},

safetyTechnologies: [
    {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
  {
    code: "BSW",
    name: "Cảnh báo điểm mù",
    description:
      "Hỗ trợ cảnh báo khi phát hiện phương tiện nằm trong vùng điểm mù bên hông xe.",
    group: "Diamond Sense",
  },
  {
    code: "LCA",
    name: "Hỗ trợ chuyển làn",
    description:
      "Hỗ trợ cảnh báo phương tiện đang tiếp cận khi người lái có ý định chuyển làn.",
    group: "Diamond Sense",
  },
  {
    code: "RCTA",
    name: "Cảnh báo phương tiện cắt ngang khi lùi",
    description:
      "Hỗ trợ phát hiện và cảnh báo phương tiện đang di chuyển cắt ngang phía sau khi lùi xe.",
    group: "Diamond Sense",
  },
  {
    code: "ACC",
    name: "Kiểm soát hành trình thích ứng",
    description:
      "Hỗ trợ tự động điều chỉnh tốc độ để duy trì khoảng cách phù hợp với phương tiện phía trước.",
    group: "Diamond Sense",
  },
  {
    code: "AHB",
    name: "Đèn pha tự động",
    description:
      "Hỗ trợ tự động chuyển đổi đèn chiếu xa và chiếu gần theo điều kiện giao thông.",
    group: "Diamond Sense",
  },
  {
    code: "FCM",
    name: "Cảnh báo và giảm thiểu va chạm phía trước",
    description:
      "Hỗ trợ cảnh báo nguy cơ va chạm phía trước và can thiệp phanh nhằm giảm thiểu va chạm.",
    group: "Diamond Sense",
  },
  {
    code: "LCDN",
    name: "Thông báo xe phía trước khởi hành",
    description:
      "Thông báo cho người lái khi phương tiện phía trước đã bắt đầu di chuyển.",
    group: "Diamond Sense",
  },
],

    colors: ["Trắng Đen", "Đỏ Đen", "Đen"],
  },
],

colors: ["Trắng", "Đen", "Đỏ", "Vàng", "Xám"],

specifications: {
  seats: 5,
  engine: "1.5L",
  transmission: "CVT",
  fuel: "Xăng",
},

    highlights: {
      exterior: [
        "Thiết kế Dynamic Shield",
        "Khoảng sáng gầm cao",
        "Hệ thống đèn LED hiện đại",
      ],
      interior: [
        "Khoang nội thất rộng rãi",
        "Màn hình giải trí trung tâm",
        "Điều hòa tự động",
      ],
      safety: [
        "Hệ thống hỗ trợ an toàn chủ động",
        "Camera hỗ trợ quan sát",
        "Nhiều túi khí",
      ],
      performance: [
        "Động cơ xăng 1.5L",
        "Hộp số CVT",
        "Nhiều chế độ lái",
      ],
    },
  },

  {
    id: "xpander",
    name: "Mitsubishi Xpander",
    slug: "mitsubishi-xpander",
    category: "MPV",
    status: "available",
    featured: true,

    shortDescription:
      "MPV 7 chỗ thực dụng dành cho gia đình và kinh doanh dịch vụ, nổi bật với không gian rộng và khả năng vận hành linh hoạt.",

    image: "/images/cars/xpander.png",


    promotion: {
      title: "Ưu đãi Mitsubishi Xpander",
      description:
  "Liên hệ Lưu Hoàng Phúc để nhận báo giá Mitsubishi Xpander, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

   variants: [
    {
  name: "MT",
  price: 568000000,
  specifications: {
    engine: "1.5L MIVEC - Euro 5, tương thích E10",
    displacement: "1.5L",
    transmission: "Số sàn 5 cấp",
    drivetrain: "Cầu trước",
    power: "105 PS / 6.000 rpm",
    torque: "141 Nm / 4.000 rpm",
    seats: 7,
    fuel: "Xăng",
    dimensions: "4.595 × 1.750 × 1.730 mm",
    wheelbase: "2.775 mm",
    groundClearance: "225 mm",
    fuelTank: "45 L",
    wheels: "195/65R16 - Mâm hợp kim 16 inch",
  },
   colors: ["Trắng"],

  equipment: {
    exterior: [
      "Đèn chiếu sáng Halogen",
      "Đèn hậu LED",
      "Gương chiếu hậu chỉnh điện",
      "Mâm hợp kim 16 inch",
    ],

    interior: [
      "Nội thất 7 chỗ",
      "Ghế bọc nỉ",
      "Hàng ghế thứ hai gập 60:40",
      "Hàng ghế thứ ba gập 50:50",
    ],

    convenience: [
      "Điều hòa chỉnh cơ",
      "Cửa gió điều hòa cho hàng ghế sau",
      "Hệ thống giải trí hỗ trợ kết nối cơ bản",
      "Nhiều ngăn chứa đồ trong khoang cabin",
    ],

    safety: [
      "2 túi khí phía trước",
      "Camera lùi",
    ],
  },
  safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
},
  {
  name: "AT",
  price: 598000000,
  specifications: {
    engine: "1.5L MIVEC - Euro 5, tương thích E10",
    displacement: "1.5L",
    transmission: "Tự động 4 cấp",
    drivetrain: "Cầu trước",
    power: "105 PS / 6.000 rpm",
    torque: "141 Nm / 4.000 rpm",
    seats: 7,
    fuel: "Xăng",
    dimensions: "4.595 × 1.750 × 1.730 mm",
    wheelbase: "2.775 mm",
    groundClearance: "225 mm",
    fuelTank: "45 L",
    wheels: "195/65R16 - Mâm hợp kim 16 inch",
  },
  colors: ["Trắng", "Đen", "Nâu", "Xám"],

equipment: {
  exterior: [
    "Đèn chiếu sáng Halogen",
    "Đèn hậu LED",
    "Gương chiếu hậu chỉnh điện",
    "Mâm hợp kim 16 inch",
  ],

  interior: [
    "Nội thất 7 chỗ",
    "Ghế bọc nỉ",
    "Hàng ghế thứ hai gập 60:40",
    "Hàng ghế thứ ba gập 50:50",
  ],

  convenience: [
    "Điều hòa chỉnh cơ",
    "Cửa gió điều hòa cho hàng ghế sau",
    "Hệ thống giải trí hỗ trợ kết nối cơ bản",
    "Nhiều ngăn chứa đồ trong khoang cabin",
  ],

  safety: [
    "2 túi khí phía trước",
    "Camera lùi",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
},  
  

  {
  name: "AT Premium",
  price: 659000000,
  specifications: {
    engine: "1.5L MIVEC - Euro 5, tương thích E10",
    displacement: "1.5L",
    transmission: "Tự động 4 cấp",
    drivetrain: "Cầu trước",
    power: "105 PS / 6.000 rpm",
    torque: "141 Nm / 4.000 rpm",
    seats: 7,
    fuel: "Xăng",
    dimensions: "4.595 × 1.750 × 1.750 mm",
    wheelbase: "2.775 mm",
    groundClearance: "225 mm",
    fuelTank: "45 L",
    wheels: "205/55R17 - Mâm hợp kim 17 inch",
  },
  colors: ["Trắng", "Đen", "Xám", "Đỏ"],

equipment: {
  exterior: [
    "Đèn chiếu sáng LED",
    "Đèn định vị ban ngày LED",
    "Đèn hậu LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 17 inch",
  ],

  interior: [
    "Nội thất 7 chỗ",
    "Ghế bọc da",
    "Vô lăng bọc da",
    "Hàng ghế thứ hai gập 60:40",
    "Hàng ghế thứ ba gập 50:50",
  ],

  convenience: [
    "Màn hình giải trí cảm ứng",
    "Điều hòa tự động",
    "Cửa gió điều hòa cho hàng ghế sau",
    "Phanh tay điện tử và Auto Hold",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Nhiều ngăn chứa đồ trong khoang cabin",
  ],

  safety: [
    "2 túi khí phía trước",
    "Camera lùi",
    "Cảm biến hỗ trợ đỗ xe",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
},
],
    colors: ["Trắng", "Đen", "Bạc", "Xám"],

    specifications: {
      seats: 7,
      engine: "1.5L",
      transmission: "MT / AT",
      fuel: "Xăng",
    },

    highlights: {
      exterior: [
        "Thiết kế MPV hiện đại",
        "Khoảng sáng gầm phù hợp điều kiện Việt Nam",
        "Đèn LED",
      ],
      interior: [
        "Không gian 7 chỗ",
        "Hàng ghế linh hoạt",
        "Nhiều vị trí chứa đồ",
      ],
      safety: [
        "Hệ thống cân bằng điện tử",
        "Hỗ trợ khởi hành ngang dốc",
        "Camera lùi",
      ],
      performance: [
        "Động cơ 1.5L",
        "Vận hành linh hoạt trong đô thị",
        "Tối ưu cho nhu cầu gia đình",
      ],
    },
  },

  {
    id: "attrage",
    name: "Mitsubishi Attrage",
    slug: "mitsubishi-attrage",
    category: "Sedan",
    status: "available",
    featured: false,

    shortDescription:
      "Sedan tiết kiệm nhiên liệu, kích thước gọn gàng và phù hợp với nhu cầu đi lại hằng ngày.",

    image: "/images/cars/attrage.png",

    promotion: {
      title: "Ưu đãi Mitsubishi Attrage",
      description:
  "Liên hệ Lưu Hoàng Phúc để nhận báo giá Mitsubishi Attrage, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

    variants: [
  {
  name: "MT",
  price: 380000000,
  specifications: {
    engine: "3A92 DOHC MIVEC 1.2L - 3 xi lanh",
    displacement: "1.193 cc",
    transmission: "Số sàn 5 cấp",
    drivetrain: "Cầu trước",
    power: "78 PS / 6.000 rpm",
    torque: "100 Nm / 4.000 rpm",
    seats: 5,
    fuel: "Xăng",
    dimensions: "4.305 × 1.670 × 1.515 mm",
    wheelbase: "2.550 mm",
    groundClearance: "170 mm",
    fuelTank: "42 L",
    wheels: "Mâm hợp kim 15 inch",
    curbWeight: "875 kg",
turningRadius: "4,8 m",
  },
  equipment: {
  exterior: [
    "Đèn chiếu sáng Halogen",
    "Đèn hậu",
    "Gương chiếu hậu chỉnh điện",
    "Mâm hợp kim 15 inch",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế bọc nỉ",
    "Vô lăng 3 chấu",
    "Hàng ghế sau có tựa đầu",
  ],
  convenience: [
    "Điều hòa chỉnh cơ",
    "Hệ thống âm thanh 2 loa",
    "Kết nối USB",
    "Khoang hành lý rộng rãi",
  ],
  safety: [
    "2 túi khí phía trước",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
],
  colors: ["Trắng", "Xám"],
},
  {
  name: "CVT Premium",
  price: 490000000,
  specifications: {
    engine: "3A92 DOHC MIVEC 1.2L - 3 xi lanh",
    displacement: "1.193 cc",
    transmission: "INVECS-III CVT",
    drivetrain: "Cầu trước",
    power: "78 PS / 6.000 rpm",
    torque: "100 Nm / 4.000 rpm",
    seats: 5,
    fuel: "Xăng",
    dimensions: "4.305 × 1.670 × 1.515 mm",
    wheelbase: "2.550 mm",
    groundClearance: "170 mm",
    fuelTank: "42 L",
    wheels: "Mâm hợp kim 15 inch",
    curbWeight: "905 kg",
turningRadius: "4,8 m",
  },
  equipment: {
  exterior: [
    "Đèn chiếu sáng Bi-LED",
    "Đèn định vị ban ngày LED",
    "Đèn hậu",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 15 inch",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế bọc da",
    "Vô lăng bọc da",
    "Hàng ghế sau có tựa đầu",
  ],
  convenience: [
    "Màn hình giải trí cảm ứng",
    "Điều hòa tự động",
    "Kết nối Apple CarPlay và Android Auto",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Kiểm soát hành trình Cruise Control",
    "Khoang hành lý rộng rãi",
  ],
  safety: [
    "2 túi khí phía trước",
    "Camera lùi",
    "Cảm biến hỗ trợ đỗ xe",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
  colors: ["Trắng", "Xám", "Đỏ"],
},
],
    colors: ["Trắng", "Đỏ", "Xám", "Bạc"],

    specifications: {
      seats: 5,
      engine: "1.2L",
      transmission: "MT / CVT",
      fuel: "Xăng",
    },

    highlights: {
      exterior: ["Thiết kế sedan nhỏ gọn", "Đèn chiếu sáng hiện đại"],
      interior: ["Không gian thực dụng", "Khoang hành lý tiện dụng"],
      safety: ["ABS", "EBD", "Camera lùi"],
      performance: [
        "Động cơ 1.2L",
        "Ưu tiên khả năng tiết kiệm nhiên liệu",
      ],
    },
  },

  {
    id: "triton",
    name: "Mitsubishi Triton",
    slug: "mitsubishi-triton",
    category: "Pickup",
    status: "available",
    featured: true,

    shortDescription:
      "Mẫu bán tải mạnh mẽ dành cho nhu cầu gia đình, công việc và những hành trình cần khả năng vận hành đa địa hình.",

    image: "/images/cars/triton.png",

    promotion: {
      title: "Ưu đãi Mitsubishi Triton",
      description:
  "Liên hệ Lưu Hoàng Phúc để nhận báo giá Mitsubishi Triton, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

   variants: [
  {
    name: "2WD AT GLX",
    price: 655000000,
    specifications: {
  engine: "MIVEC Turbo Diesel 2.4L - Euro 5",
  displacement: "2.4L",
  transmission: "Tự động 6 cấp",
  drivetrain: "Một cầu chủ động (Cầu sau)",
  power: "184 PS",
  torque: "430 Nm",
  seats: 5,
  fuel: "Dầu",
  dimensions: "5.320 × 1.865 × 1.795 mm",
  wheelbase: "3.130 mm",
  groundClearance: "222 mm",
  wheels: "Mâm hợp kim 16 inch",
  fuelTank: "75 L",
curbWeight: "1.935 kg",
turningRadius: "6,2 m",
},
equipment: {
  exterior: [
    "Đèn chiếu sáng phía trước",
    "Đèn hậu",
    "Gương chiếu hậu chỉnh điện",
    "Mâm hợp kim 16 inch",
    "Bậc lên xuống hai bên",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế bọc nỉ",
    "Vô lăng đa chức năng",
    "Cụm đồng hồ kỹ thuật số 7 inch",
  ],
  convenience: [
    "Màn hình giải trí 8 inch",
    "Kết nối điện thoại thông minh",
    "Điều hòa",
    "Cruise Control",
    "Cổng kết nối USB",
  ],
  safety: [
    "Túi khí phía trước",
    "Camera lùi",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
    features: [
  "Mâm hợp kim 16 inch",
  "Màn hình giải trí 8 inch",
  "Camera lùi",
  "Cụm đồng hồ kỹ thuật số 7 inch",
  "Cruise Control",
],
    colors: ["Trắng", "Đen", "Xám", "Cam"],
  },

  {
    name: "2WD AT Premium",
    price: 782000000,
    specifications: {
  engine: "MIVEC Turbo Diesel 2.4L - Euro 5",
  displacement: "2.4L",
  transmission: "Tự động 6 cấp",
  drivetrain: "Một cầu chủ động (Cầu sau)",
  power: "184 PS",
  torque: "430 Nm",
  seats: 5,
  fuel: "Dầu",
  dimensions: "5.320 × 1.865 × 1.795 mm",
  wheelbase: "3.130 mm",
  groundClearance: "222 mm",
  wheels: "Mâm hợp kim 18 inch",
  fuelTank: "75 L",
curbWeight: "1.970 kg",
turningRadius: "6,2 m",
},
equipment: {
  exterior: [
    "Đèn LED T-Shape",
    "Đèn định vị ban ngày LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 18 inch",
    "Bậc lên xuống hai bên",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế bọc da",
    "Ghế lái chỉnh điện 8 hướng",
    "Vô lăng đa chức năng",
    "Cụm đồng hồ kỹ thuật số 7 inch",
  ],
  convenience: [
    "Màn hình giải trí 9 inch",
    "Apple CarPlay và Android Auto",
    "Điều hòa tự động",
    "Cruise Control",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Cổng kết nối USB",
  ],
  safety: [
    "7 túi khí",
    "Camera lùi",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
],
    features: [
  "7 túi khí",
  "Đèn LED T-Shape",
  "Mâm hợp kim 18 inch",
  "Ghế da",
  "Ghế lái chỉnh điện 8 hướng",
  "Màn hình giải trí 9 inch",
  "Apple CarPlay & Android Auto",
  "Cụm đồng hồ kỹ thuật số 7 inch",
],
    colors: ["Trắng", "Đen", "Cam"],
  },

  {
    name: "4WD AT Premium",
    price: 782000000,
    specifications: {
  engine: "MIVEC Turbo Diesel 2.4L",
  displacement: "2.4L",
  transmission: "Tự động 6 cấp",
  drivetrain: "Super Select 4WD-II",
  power: "184 PS",
  torque: "430 Nm",
  seats: 5,
  fuel: "Dầu",
  dimensions: "5.320 × 1.865 × 1.795 mm",
  wheelbase: "3.130 mm",
  groundClearance: "222 mm",
  wheels: "Mâm hợp kim 18 inch",
  fuelTank: "75 L",
curbWeight: "2.045 kg",
turningRadius: "6,2 m",
},
equipment: {
  exterior: [
    "Đèn LED T-Shape",
    "Đèn định vị ban ngày LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 18 inch",
    "Bậc lên xuống hai bên",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế bọc da",
    "Ghế lái chỉnh điện 8 hướng",
    "Vô lăng đa chức năng",
    "Cụm đồng hồ kỹ thuật số 7 inch",
  ],
  convenience: [
    "Màn hình giải trí 9 inch",
    "Apple CarPlay và Android Auto",
    "Điều hòa tự động",
    "Cruise Control",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Cổng kết nối USB",
  ],
  safety: [
    "7 túi khí",
    "Camera lùi",
  ],
  drivingSupport: [
    "Hệ dẫn động Super Select 4WD-II",
    "7 chế độ lái",
    "Khóa vi sai cầu sau",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "HDC",
    name: "Hỗ trợ xuống dốc",
    description:
      "Hỗ trợ kiểm soát tốc độ xe khi xuống dốc, giúp người lái tập trung hơn vào việc điều khiển hướng di chuyển.",
  },
],
    features: [
  "Hệ dẫn động Super Select 4WD-II",
  "7 chế độ lái",
  "7 túi khí",
  "Khóa vi sai cầu sau",
  "Đèn LED T-Shape",
  "Mâm hợp kim 18 inch",
  "Màn hình giải trí 9 inch",
  "Apple CarPlay & Android Auto",
],
    colors: ["Trắng", "Đen", "Cam"],
  },

  {
    name: "4WD AT Athlete",
    price: 924000000,
    specifications: {
  engine: "MIVEC Bi-Turbo Diesel 2.4L - Euro 5",
  displacement: "2.4L",
  transmission: "Tự động 6 cấp",
  drivetrain: "Super Select 4WD-II",
  power: "204 PS",
  torque: "470 Nm",
  seats: 5,
  fuel: "Dầu",
  dimensions: "5.360 × 1.930 × 1.815 mm",
  wheelbase: "3.130 mm",
  groundClearance: "222 mm",
  wheels: "Mâm hợp kim 18 inch",
  fuelTank: "75 L",
curbWeight: "2.115 kg",
turningRadius: "6,2 m",
},
equipment: {
  exterior: [
    "Đèn LED T-Shape",
    "Đèn định vị ban ngày LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 18 inch",
    "Bậc lên xuống hai bên",
    "Ngoại thất phong cách Athlete thể thao",
  ],
  interior: [
    "Nội thất 5 chỗ",
    "Ghế da phối da lộn",
    "Ghế lái chỉnh điện 8 hướng",
    "Vô lăng đa chức năng",
    "Cụm đồng hồ kỹ thuật số 7 inch",
  ],
  convenience: [
    "Màn hình giải trí 9 inch",
    "Apple CarPlay và Android Auto",
    "Điều hòa tự động",
    "Cruise Control",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Cổng kết nối USB",
  ],
  safety: [
    "7 túi khí",
    "Camera toàn cảnh 360 độ",
  ],
  drivingSupport: [
    "Hệ dẫn động Super Select 4WD-II",
    "7 chế độ lái",
    "Khóa vi sai cầu sau",
    "Kiểm soát vào cua chủ động AYC",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "HDC",
    name: "Hỗ trợ xuống dốc",
    description:
      "Hỗ trợ kiểm soát tốc độ xe khi xuống dốc.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định khi vào cua.",
  },
  {
    code: "FCM",
    name: "Cảnh báo và giảm thiểu va chạm phía trước",
    description:
      "Hỗ trợ cảnh báo nguy cơ va chạm phía trước và can thiệp phanh trong một số tình huống.",
    group: "MMSS",
  },
  {
    code: "BSW",
    name: "Cảnh báo điểm mù",
    description:
      "Hỗ trợ cảnh báo khi phát hiện phương tiện trong khu vực điểm mù.",
    group: "MMSS",
  },
  {
    code: "LCA",
    name: "Hỗ trợ chuyển làn",
    description:
      "Hỗ trợ cảnh báo phương tiện tiếp cận khi người lái có ý định chuyển làn.",
    group: "MMSS",
  },
  {
    code: "RCTA",
    name: "Cảnh báo phương tiện cắt ngang khi lùi",
    description:
      "Hỗ trợ cảnh báo phương tiện đang di chuyển cắt ngang phía sau khi xe lùi.",
    group: "MMSS",
  },
],
    features: [
  "Hệ thống Mitsubishi Motors Safety Sensing (MMSS)",
  "Hệ dẫn động Super Select 4WD-II",
  "7 chế độ lái",
  "Khóa vi sai cầu sau",
  "Camera toàn cảnh 360 độ",
  "Mâm hợp kim 18 inch",
  "Ghế lái chỉnh điện 8 hướng",
  "Ghế da phối da lộn",
  "Kiểm soát vào cua chủ động AYC",
],
    colors: ["Trắng", "Đen", "Cam"],
  },
],

    colors: ["Trắng", "Đen", "Xám", "Cam"],

    specifications: {
      seats: 5,
      engine: "Diesel",
      transmission: "AT",
      fuel: "Dầu",
    },

    highlights: {
      exterior: ["Thiết kế bán tải mạnh mẽ", "Thùng hàng rộng"],
      interior: ["Cabin tiện nghi", "Không gian 5 chỗ"],
      safety: ["Các hệ thống hỗ trợ an toàn", "Camera hỗ trợ quan sát"],
      performance: [
        "Động cơ Diesel",
        "Khả năng vận hành đa địa hình",
        "Tùy chọn dẫn động 4 bánh",
      ],
    },
  },

  {
    id: "destinator",
    name: "Mitsubishi Destinator",
    slug: "mitsubishi-destinator",
    category: "SUV",
    status: "available",
    featured: true,

    shortDescription:
      "SUV Mitsubishi hướng đến khách hàng cần không gian rộng, thiết kế hiện đại và trải nghiệm tiện nghi cho gia đình.",

    image: "/images/cars/destinator.png",

    promotion: {
      title: "Thông tin Mitsubishi Destinator",
      description:
  "Liên hệ Lưu Hoàng Phúc để nhận báo giá Mitsubishi Destinator, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

    variants: [
  {
  name: "Premium",
  price: 780000000,
  specifications: {
    engine: "Xăng Turbo 1.5L MIVEC",
    displacement: "1.499 cc",
    transmission: "CVT",
    drivetrain: "Cầu trước",
    power: "163 PS / 5.000 rpm",
    torque: "250 Nm / 2.000 - 4.000 rpm",
    seats: 7,
    fuel: "Xăng",
    dimensions: "4.680 × 1.840 × 1.780 mm",
    wheelbase: "2.815 mm",
    groundClearance: "214 mm",
    fuelTank: "45 L",
    wheels: "225/55R18 - Mâm hợp kim 18 inch",
    curbWeight: "1.495 kg",
turningRadius: "5,4 m",
fuelConsumptionCombined: "Khoảng 6,8 L/100 km",
  },
  equipment: {
  exterior: [
    "Đèn chiếu sáng LED",
    "Đèn định vị ban ngày LED",
    "Đèn hậu LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 18 inch",
    "Thanh giá nóc",
  ],
  interior: [
    "Nội thất 7 chỗ",
    "Ghế bọc da",
    "Vô lăng bọc da đa chức năng",
    "Hàng ghế thứ hai gập linh hoạt",
    "Hàng ghế thứ ba gập linh hoạt",
  ],
  convenience: [
    "Màn hình giải trí cảm ứng",
    "Kết nối Apple CarPlay và Android Auto",
    "Điều hòa tự động",
    "Cửa gió điều hòa cho hàng ghế sau",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Phanh tay điện tử và Auto Hold",
  ],
  safety: [
    "Túi khí",
    "Camera lùi",
    "Cảm biến hỗ trợ đỗ xe",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
],
  colors: ["Trắng", "Xám", "Đen", "Đỏ"],
},
  {
  name: "Ultimate",
  price: 855000000,
  specifications: {
    engine: "Xăng Turbo 1.5L MIVEC",
    displacement: "1.499 cc",
    transmission: "CVT",
    drivetrain: "Cầu trước",
    power: "163 PS / 5.000 rpm",
    torque: "250 Nm / 2.000 - 4.000 rpm",
    seats: 7,
    fuel: "Xăng",
    dimensions: "4.680 × 1.840 × 1.780 mm",
    wheelbase: "2.815 mm",
    groundClearance: "214 mm",
    fuelTank: "45 L",
    wheels: "225/55R18 - Mâm hợp kim 18 inch",
    curbWeight: "1.495 kg",
turningRadius: "5,4 m",
fuelConsumptionCombined: "Khoảng 6,8 L/100 km",
  },
  equipment: {
  exterior: [
    "Đèn chiếu sáng LED",
    "Đèn định vị ban ngày LED",
    "Đèn hậu LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 18 inch",
    "Thanh giá nóc",
    "Ngoại thất phối hai tông màu",
  ],
  interior: [
    "Nội thất 7 chỗ",
    "Ghế bọc da",
    "Ghế lái chỉnh điện",
    "Vô lăng bọc da đa chức năng",
    "Hàng ghế thứ hai gập linh hoạt",
    "Hàng ghế thứ ba gập linh hoạt",
  ],
  convenience: [
    "Màn hình giải trí cảm ứng",
    "Kết nối Apple CarPlay và Android Auto",
    "Điều hòa tự động",
    "Cửa gió điều hòa cho hàng ghế sau",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Phanh tay điện tử và Auto Hold",
    "Hệ thống âm thanh cao cấp",
  ],
  safety: [
    "Túi khí",
    "Camera toàn cảnh 360 độ",
    "Cảm biến hỗ trợ đỗ xe",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
  {
    code: "FCM",
    name: "Cảnh báo và giảm thiểu va chạm phía trước",
    description:
      "Hỗ trợ cảnh báo nguy cơ va chạm phía trước và can thiệp phanh trong một số tình huống.",
    group: "Diamond Sense",
  },
  {
    code: "BSW",
    name: "Cảnh báo điểm mù",
    description:
      "Hỗ trợ cảnh báo khi phát hiện phương tiện trong khu vực điểm mù.",
    group: "Diamond Sense",
  },
  {
    code: "LCA",
    name: "Hỗ trợ chuyển làn",
    description:
      "Hỗ trợ cảnh báo phương tiện tiếp cận khi người lái có ý định chuyển làn.",
    group: "Diamond Sense",
  },
  {
    code: "RCTA",
    name: "Cảnh báo phương tiện cắt ngang khi lùi",
    description:
      "Hỗ trợ cảnh báo phương tiện đang di chuyển cắt ngang phía sau khi xe lùi.",
    group: "Diamond Sense",
  },
  {
    code: "ACC",
    name: "Kiểm soát hành trình thích ứng",
    description:
      "Hỗ trợ duy trì tốc độ và khoảng cách phù hợp với phương tiện phía trước.",
    group: "Diamond Sense",
  },
],
  colors: ["Trắng Đen", "Xanh Đen", "Đỏ Đen", "Đen"],
},
],

    colors: ["Trắng", "Xám", "Đen", "Đỏ", "Trắng Đen", "Xanh Đen", "Đỏ Đen"],

    specifications: {
      seats: 7,
      engine: "Xăng Turbo 1.5L MIVEC",
transmission: "CVT",
      fuel: "Xăng",
    },

    highlights: {
  exterior: [
    "Thiết kế SUV 7 chỗ hiện đại",
    "Hệ thống đèn LED",
    "Mâm hợp kim 18 inch",
  ],
  interior: [
    "Không gian 7 chỗ rộng rãi",
    "Khoang hành lý linh hoạt",
    "Tiện nghi hướng đến gia đình",
  ],
  safety: [
    "Hệ thống hỗ trợ an toàn chủ động",
    "Trang bị an toàn hỗ trợ người lái",
    "Cấu trúc thân xe an toàn",
  ],
  performance: [
    "Động cơ Xăng Turbo 1.5L MIVEC",
    "Công suất 163 PS",
    "Mô-men xoắn 250 Nm",
    "Hộp số CVT",
  ],
},
  },

  {
    id: "xpander-cross",
name: "Mitsubishi Xpander Cross",
slug: "mitsubishi-xpander-cross",
category: "MPV",
status: "available",
featured: true,

shortDescription:
  "MPV 7 chỗ phong cách SUV, thiết kế mạnh mẽ, không gian rộng rãi và phù hợp cho gia đình.",

image: "/images/cars/xpander-cross.png",

    promotion: {
      title: "Ưu đãi Mitsubishi Xpander Cross",
      description:
  "Liên hệ tư vấn để nhận báo giá Mitsubishi Xpander Cross, chương trình ưu đãi hiện hành và phương án hỗ trợ trả góp phù hợp.",
    },

   variants: [
  {
    name: "Xpander Cross",
    price: 699000000,
    specifications: {
  engine: "1.5L MIVEC - Euro 5, tương thích E10",
  displacement: "1.5L",
  transmission: "Tự động 4 cấp",
  drivetrain: "Cầu trước",
  power: "105 PS / 6.000 rpm",
  torque: "141 Nm / 4.000 rpm",
  seats: 7,
  fuel: "Xăng",
  dimensions: "4.595 × 1.790 × 1.750 mm",
  wheelbase: "2.775 mm",
  groundClearance: "225 mm",
  fuelTank: "45 L",
  wheels: "205/55R17 - Mâm hợp kim 17 inch",
curbWeight: "1.275 kg",
turningRadius: "5,2 m",
fuelConsumptionCombined: "7,10 L/100 km",
fuelConsumptionUrban: "8,60 L/100 km",
},
equipment: {
  exterior: [
    "Đèn chiếu sáng LED",
    "Đèn định vị ban ngày LED",
    "Đèn hậu LED",
    "Gương chiếu hậu chỉnh điện, gập điện",
    "Mâm hợp kim 17 inch",
    "Ốp ngoại thất phong cách SUV",
  ],
  interior: [
    "Nội thất 7 chỗ",
    "Ghế bọc da",
    "Vô lăng bọc da",
    "Hàng ghế thứ hai gập 60:40",
    "Hàng ghế thứ ba gập 50:50",
  ],
  convenience: [
    "Màn hình giải trí cảm ứng",
    "Điều hòa tự động",
    "Cửa gió điều hòa cho hàng ghế sau",
    "Phanh tay điện tử và Auto Hold",
    "Chìa khóa thông minh và khởi động nút bấm",
    "Nhiều ngăn chứa đồ trong khoang cabin",
  ],
  safety: [
    "2 túi khí phía trước",
    "Camera lùi",
    "Cảm biến hỗ trợ đỗ xe",
  ],
  drivingSupport: [
    "Hệ thống kiểm soát vào cua chủ động AYC",
  ],
},
safetyTechnologies: [
  {
    code: "ABS",
    name: "Chống bó cứng phanh",
    description:
      "Giúp hạn chế bánh xe bị khóa cứng khi phanh gấp, hỗ trợ người lái duy trì khả năng điều khiển xe.",
  },
  {
    code: "EBD",
    name: "Phân phối lực phanh điện tử",
    description:
      "Hỗ trợ phân bổ lực phanh phù hợp giữa các bánh xe để tăng hiệu quả phanh.",
  },
  {
    code: "BA",
    name: "Hỗ trợ lực phanh khẩn cấp",
    description:
      "Hỗ trợ tăng lực phanh khi hệ thống nhận biết tình huống phanh khẩn cấp.",
  },
  {
    code: "ASC",
    name: "Cân bằng điện tử",
    description:
      "Hỗ trợ duy trì độ ổn định của xe khi hệ thống phát hiện nguy cơ mất cân bằng hoặc trượt bánh.",
  },
  {
    code: "TCL",
    name: "Kiểm soát lực kéo",
    description:
      "Hỗ trợ hạn chế bánh xe quay trượt khi tăng tốc trên bề mặt có độ bám thấp.",
  },
  {
    code: "HSA",
    name: "Hỗ trợ khởi hành ngang dốc",
    description:
      "Hỗ trợ giữ phanh trong thời gian ngắn khi khởi hành trên dốc, hạn chế xe bị trôi về phía sau.",
  },
  {
    code: "AYC",
    name: "Kiểm soát vào cua chủ động",
    description:
      "Hỗ trợ kiểm soát lực phanh giữa các bánh xe để tăng độ ổn định và khả năng kiểm soát khi vào cua.",
  },
],
    colors: ["Trắng", "Đen", "Nâu"],
  },
],colors: ["Trắng", "Đen", "Nâu"],

    specifications: {
      seats: 7,
      engine: "1.5L MIVEC",
transmission: "Tự động 4 cấp",
      fuel: "Xăng",
    },

     highlights: {
  exterior: [
    "Thiết kế SUV mạnh mẽ",
    "Đèn LED hiện đại",
    "Mâm hợp kim 17 inch",
  ],
  interior: [
    "Khoang nội thất 7 chỗ rộng rãi",
    "Vô lăng bọc da",
    "Màn hình giải trí cảm ứng",
  ],
  safety: [
    "Hệ thống kiểm soát vào cua chủ động AYC",
    "Cân bằng điện tử ASC",
    "Hỗ trợ khởi hành ngang dốc HSA",
  ],
  performance: [
    "Động cơ 1.5L MIVEC",
    "Hộp số tự động 4 cấp",
    "Khoảng sáng gầm cao phù hợp nhiều điều kiện đường",
  ],
},
  },

  // ===== CHƯA MỞ BÁN (đang ẩn) =====
  // Thông số lấy theo bản Đông Nam Á (Thái Lan / Philippines) trong các bài tin tức.
  // Trước khi bỏ `hidden`: cập nhật giá Việt Nam (price đang = 0), phiên bản, màu, ảnh xe (PNG nền trong).
  {
    id: "outlander",
    name: "Mitsubishi Outlander",
    slug: "mitsubishi-outlander",
    category: "SUV",
    status: "coming-soon",
    featured: false,
    hidden: true,

    shortDescription:
      "SUV cỡ C plug-in hybrid 7 chỗ (5+2), mạnh 302 mã lực, chạy thuần điện khoảng 100 km.",

    image: "/images/news/anh-thuc-te-mitsubishi-outlander-phev-2026-tai-dna-suv-co-c-manh-302-ma-luc-chay-100-km-khong-ton-xang-official.jpg",

    promotion: {
      title: "Đăng ký nhận thông tin Mitsubishi Outlander",
      description:
        "Liên hệ Lưu Hoàng Phúc để nhận thông tin sớm nhất về giá bán, phiên bản và thời gian mở bán Mitsubishi Outlander tại Việt Nam.",
    },

    variants: [
      {
        name: "PHEV",
        price: 0,
        specifications: {
          engine: "Xăng MIVEC 2.4L + 2 mô-tơ điện (Plug-in Hybrid)",
          drivetrain: "4 bánh toàn thời gian S-AWC",
          power: "Tổng công suất 302 mã lực",
          torque: "450 Nm",
          seats: 7,
          fuel: "Xăng + Điện (PHEV)",
          dimensions: "4.710 × 1.862 × 1.740 mm",
          wheelbase: "2.706 mm",
          groundClearance: "210 mm",
        },
        equipment: {
          exterior: [
            "Ngôn ngữ thiết kế Dynamic Shield",
            "Đèn LED định vị ban ngày đặt cao",
            "Đèn chiếu sáng chính LED",
          ],
          interior: [
            "3 hàng ghế cấu hình 5+2",
            "Hàng ghế thứ ba gập phẳng",
            "Cửa sổ trời toàn cảnh",
          ],
          convenience: [
            "Màn hình cảm ứng trung tâm 12,3 inch",
            "Apple CarPlay và Android Auto không dây",
            "Bảng đồng hồ kỹ thuật số",
            "Màn hình hiển thị trên kính lái (HUD)",
            "Sạc không dây",
            "Âm thanh Yamaha",
            "Điều hòa tự động 3 vùng độc lập",
            "Pin 22,7 kWh, chạy thuần điện khoảng 100 km",
          ],
          safety: ["Hệ thống túi khí", "Camera 360 độ"],
          drivingSupport: [
            "Giảm thiểu va chạm phía trước",
            "Cảnh báo điểm mù",
            "Hỗ trợ chuyển làn",
            "Cảnh báo phương tiện cắt ngang phía sau",
            "Cảnh báo chệch làn",
            "Theo dõi sự chú ý của người lái",
          ],
        },
      },
    ],

    colors: [],

    specifications: {
      seats: 7,
      engine: "2.4L PHEV",
      transmission: "S-AWC",
      fuel: "Xăng + Điện",
    },

    highlights: {
      exterior: ["Thiết kế Dynamic Shield mới", "Kích thước lớn hơn thế hệ trước"],
      interior: ["3 hàng ghế 5+2", "Màn hình 12,3 inch, HUD, cửa sổ trời toàn cảnh"],
      safety: ["Mitsubishi Safety Sensing", "Camera 360 độ"],
      performance: [
        "Tổng công suất 302 mã lực, 450 Nm",
        "Chạy thuần điện khoảng 100 km",
        "Dẫn động 4 bánh S-AWC",
      ],
    },
  },

  {
    id: "pajero",
    name: "Mitsubishi Pajero",
    slug: "mitsubishi-pajero",
    category: "SUV",
    status: "coming-soon",
    featured: false,
    hidden: true,

    shortDescription:
      "SUV 7 chỗ khung gầm rời đầu bảng của Mitsubishi, động cơ diesel 2.4L 204 mã lực, hộp số tự động 8 cấp.",

    image: "/images/news/mitsubishi-pajero-2026-se-ra-mat-dong-nam-a-vao-thang-10-co-3-phien-ban-may-diesel-204-ma-luc/official-cover.jpg",

    promotion: {
      title: "Đăng ký nhận thông tin Mitsubishi Pajero",
      description:
        "Liên hệ Lưu Hoàng Phúc để nhận thông tin sớm nhất về giá bán, phiên bản và thời gian mở bán Mitsubishi Pajero tại Việt Nam.",
    },

    variants: [
      {
        name: "GLS 2WD",
        price: 0,
        specifications: {
          engine: "4N16 Diesel 2.4L, tăng áp VGT Wide-Range",
          transmission: "Tự động 8 cấp, lẫy chuyển số",
          drivetrain: "Cầu sau (2WD)",
          power: "204 mã lực / 3.500 vòng/phút",
          torque: "480 Nm / 1.750 - 2.500 vòng/phút",
          seats: 7,
          fuel: "Dầu",
          dimensions: "4.920 × 1.925 × 1.900 - 1.910 mm",
          wheelbase: "2.870 mm",
          groundClearance: "230 mm",
        },
        equipment: {
          interior: [
            "7 chỗ, 3 hàng ghế",
            "Hàng ghế 2 trượt 150 mm, gập 60:40",
            "Hàng ghế 3 gập 50:50",
          ],
          convenience: [
            "Màn hình giải trí 12,3 inch",
            "Bảng đồng hồ kỹ thuật số 12,3 inch",
            "Apple CarPlay và Android Auto không dây",
            "Sạc không dây, cổng USB Type-C",
            "Âm thanh 6 loa",
          ],
          safety: ["7 túi khí", "Camera 360 độ"],
          drivingSupport: [
            "Kiểm soát hành trình thích ứng",
            "Cảnh báo điểm mù và hỗ trợ chuyển làn",
            "Hỗ trợ giữ làn, cảnh báo lệch làn",
            "Giảm thiểu va chạm phía trước",
            "Cảnh báo phương tiện cắt ngang phía trước và phía sau",
          ],
        },
      },
      {
        name: "GSR 2WD",
        price: 0,
        specifications: {
          engine: "4N16 Diesel 2.4L, tăng áp VGT Wide-Range",
          transmission: "Tự động 8 cấp, lẫy chuyển số",
          drivetrain: "Cầu sau (2WD)",
          power: "204 mã lực / 3.500 vòng/phút",
          torque: "480 Nm / 1.750 - 2.500 vòng/phút",
          seats: 7,
          fuel: "Dầu",
          dimensions: "4.920 × 1.925 × 1.900 - 1.910 mm",
          wheelbase: "2.870 mm",
          groundClearance: "230 mm",
          wheels: "Mâm 20 inch hai tông màu",
        },
        equipment: {
          exterior: [
            "Mâm 20 inch hai tông màu",
            "Đèn LED thích ứng",
            "Đèn Dynamic Flow Light trước và sau",
          ],
          interior: [
            "7 chỗ, 3 hàng ghế",
            "Ghế và vô lăng nhớ vị trí",
            "Tựa lưng ghế chỉnh điện",
            "Hộp làm mát trong bệ tỳ tay",
          ],
          convenience: [
            "Màn hình giải trí 12,3 inch",
            "Apple CarPlay và Android Auto không dây",
            "Điều hòa 2 vùng độc lập",
            "Lọc không khí Nanoe-X",
            "Âm thanh Yamaha Dynamic Sound Ultimate 12 loa",
          ],
          safety: ["7 túi khí", "Camera 360 độ"],
          drivingSupport: [
            "Kiểm soát hành trình thích ứng",
            "Cảnh báo điểm mù và hỗ trợ chuyển làn",
            "Hỗ trợ giữ làn, cảnh báo lệch làn",
            "Giảm thiểu va chạm phía trước",
          ],
        },
      },
      {
        name: "Super Exceed 4WD",
        price: 0,
        specifications: {
          engine: "4N16 Diesel 2.4L, tăng áp VGT Wide-Range",
          transmission: "Tự động 8 cấp, lẫy chuyển số",
          drivetrain: "4WD S-AWC (2H, 4H, 4HLC, 4LLC)",
          power: "204 mã lực / 3.500 vòng/phút",
          torque: "480 Nm / 1.750 - 2.500 vòng/phút",
          seats: 7,
          fuel: "Dầu",
          dimensions: "4.920 × 1.925 × 1.900 - 1.910 mm",
          wheelbase: "2.870 mm",
          groundClearance: "230 mm",
        },
        equipment: {
          exterior: [
            "Bộ mâm thiết kế riêng",
            "Lưới tản nhiệt dạng tổ ong",
            "Chi tiết bảo vệ gầm",
          ],
          interior: [
            "Nội thất đen phối nâu",
            "Ghế da Semi-Aniline thông gió",
            "Cửa sổ trời toàn cảnh",
            "Gương chiếu hậu kỹ thuật số",
          ],
          convenience: [
            "Màn hình giải trí 12,3 inch",
            "Kết nối Mitsubishi CONNECT",
            "Âm thanh Yamaha Dynamic Sound Ultimate 12 loa",
          ],
          safety: ["7 túi khí", "Camera 360 độ"],
          drivingSupport: [
            "Hệ thống hỗ trợ lái MI-PILOT",
            "Dẫn động S-AWC",
            "7 chế độ lái: Eco, Normal, Gravel, Snow, Mud, Sand, Rock",
          ],
        },
      },
    ],

    colors: [],

    specifications: {
      seats: 7,
      engine: "2.4L Diesel",
      transmission: "AT 8 cấp",
      fuel: "Dầu",
    },

    highlights: {
      exterior: ["SUV khung gầm rời cỡ lớn", "Khoảng sáng gầm 230 mm"],
      interior: ["7 chỗ, 3 hàng ghế linh hoạt", "Màn hình 12,3 inch"],
      safety: ["7 túi khí", "Camera 360 độ", "Gói hỗ trợ lái ADAS"],
      performance: [
        "Diesel 2.4L 204 mã lực, 480 Nm",
        "Hộp số tự động 8 cấp",
        "S-AWC trên bản Super Exceed",
      ],
    },
  },
];

// Thứ tự hiển thị xe trên toàn website (trang chủ, menu, footer, form báo giá, công cụ tính).
const displayOrder = [
  "destinator",
  "triton",
  "xforce",
  "xpander-cross",
  "xpander",
  "attrage",
  "outlander",
  "pajero",
];

const orderOf = (car: Car) => {
  const index = displayOrder.indexOf(car.id);
  return index === -1 ? displayOrder.length : index;
};

// Chỉ các xe đang mở bán (không có `hidden`), theo thứ tự displayOrder.
export const cars: Car[] = allCars
  .filter((car) => !car.hidden)
  .sort((a, b) => orderOf(a) - orderOf(b));

// Xe đang ẩn (chưa mở bán): chỉ hiện dạng thẻ "Sắp ra mắt" trên trang chủ và trong form báo giá,
// không có trang chi tiết, không vào sitemap.
export const upcomingCars: Car[] = allCars
  .filter((car) => car.hidden)
  .sort((a, b) => orderOf(a) - orderOf(b));

// Chặn lỡ tay hiển thị xe khi chưa có giá: build sẽ báo lỗi.
for (const car of cars) {
  if (car.variants.length === 0 || car.variants.some((variant) => !(variant.price > 0))) {
    throw new Error(
      `${car.name} đang hiển thị nhưng chưa có giá bán. Cập nhật price cho các phiên bản hoặc đặt lại hidden: true.`
    );
  }
}

export const featuredCars = cars.filter((car) => car.featured);

export function getCarBySlug(slug: string) {
  // Khi chạy `npm run dev` vẫn xem trước được trang xe đang ẩn (ví dụ /xe/mitsubishi-outlander).
  const source = process.env.NODE_ENV === "development" ? allCars : cars;
  return source.find((car) => car.slug === slug);
}