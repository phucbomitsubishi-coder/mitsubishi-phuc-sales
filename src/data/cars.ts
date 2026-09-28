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
};

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

export const cars: Car[] = [
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
},
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
},
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
},
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
  },
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
  },
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
},
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
},
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
},
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
},
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
  },
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
  },
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
},
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
];

export const featuredCars = cars.filter((car) => car.featured);

export function getCarBySlug(slug: string) {
  return cars.find((car) => car.slug === slug);
}