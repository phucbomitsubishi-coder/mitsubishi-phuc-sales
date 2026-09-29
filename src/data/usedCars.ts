export type UsedCar = {
  id: string;
  name: string;
  slug: string;
  modelYear: number;
  firstRegistration: string;
  owners: string;
  serviceHistory: string;
equipment: string[];
  variant: string;
  mileage: number;
  price: number;
  color: string;
  transmission: string;
  fuel: string;
  location: string;
  status: "available" | "sold";
  image: string;
  images: string[];
  description: string;
  commitments: string[];
};

export const usedCars: UsedCar[] = [
  {
    id: "xpander-cross-2025-001",
    name: "Mitsubishi Xpander Cross",
    slug: "mitsubishi-xpander-cross-2025-001",
    modelYear: 2025,
    firstRegistration: "10/2025",
    owners: "1 chủ từ mới",
    serviceHistory: "Bảo dưỡng đầy đủ tại hãng",
equipment: [
  "Lót sàn",
  "Dán phim cách nhiệt",
  "Camera hành trình",
],
    variant: "Xpander Cross",
    mileage: 48000,
    price: 569_000_000,
    color: "Đen",
    transmission: "Số tự động",
    fuel: "Xăng",
    location: "Bình Dương",
    status: "available",
    image: "/images/used-cars/xpander-cross-2025-001/01.jpg",
    images: [
  "/images/used-cars/xpander-cross-2025-001/01.jpg",
  "/images/used-cars/xpander-cross-2025-001/02.jpg",
  "/images/used-cars/xpander-cross-2025-001/03.jpg",
  "/images/used-cars/xpander-cross-2025-001/04.jpg",
  "/images/used-cars/xpander-cross-2025-001/05.jpg",
  "/images/used-cars/xpander-cross-2025-001/06.jpg",
  "/images/used-cars/xpander-cross-2025-001/07.jpg",
  "/images/used-cars/xpander-cross-2025-001/08.jpg",
  "/images/used-cars/xpander-cross-2025-001/09.jpg",
],
    description:
  "Mitsubishi Xpander Cross sản xuất năm 2025, xe một chủ sử dụng từ mới. Xe đang có sẵn, phù hợp với khách hàng cần một mẫu MPV 7 chỗ đa dụng cho gia đình và nhu cầu đi lại hằng ngày.",
      commitments: [
  "Động cơ, hộp số nguyên bản; xe không tai nạn.",
  "Không thủy kích, hỗ trợ kiểm tra xe tại hãng.",
  "Xe đã được kiểm định chính hãng 160 chi tiết.",
  "Bảo vệ giá bán lại lên đến 90% khi sử dụng xe dưới 12 tháng.",
],
  },
  {
  id: "xpander-cross-2025-002",
  name: "Mitsubishi Xpander Cross",
  slug: "mitsubishi-xpander-cross-2025-002",
  modelYear: 2025,
  firstRegistration: "09/2025",
  owners: "1 chủ từ mới",
  variant: "Xpander Cross",
  mileage: 26436,
  price: 579_000_000,
  color: "Xám",
  transmission: "Số tự động",
  fuel: "Xăng",
  location: "Bình Dương",
  status: "available",

  image: "/images/used-cars/xpander-cross-2025-002/01.jpg",

  images: [
    "/images/used-cars/xpander-cross-2025-002/01.jpg",
    "/images/used-cars/xpander-cross-2025-002/02.jpg",
    "/images/used-cars/xpander-cross-2025-002/03.jpg",
    "/images/used-cars/xpander-cross-2025-002/04.jpg",
    "/images/used-cars/xpander-cross-2025-002/05.jpg",
    "/images/used-cars/xpander-cross-2025-002/06.jpg",
    "/images/used-cars/xpander-cross-2025-002/07.jpg",
    "/images/used-cars/xpander-cross-2025-002/08.jpg",
    "/images/used-cars/xpander-cross-2025-002/09.jpg",
    "/images/used-cars/xpander-cross-2025-002/10.jpg",
  ],

  description:
    "Mitsubishi Xpander Cross sản xuất năm 2025, đăng ký lần đầu 09/2025, xe một chủ sử dụng từ mới. Xe đang có sẵn, phù hợp với nhu cầu sử dụng gia đình và đi lại hằng ngày.",

  serviceHistory: "Bảo dưỡng đầy đủ tại hãng",

  equipment: [
    "Lót sàn",
    "Dán phim",
    "Camera hành trình",
    "Thảm cách nhiệt taplo",
    "Bọc trần",
  ],

  commitments: [
    "Động cơ, hộp số nguyên bản; xe không tai nạn.",
    "Bảo vệ giá bán lại lên đến 90% khi sử dụng xe dưới 12 tháng.",
    "Xe đã được kiểm định chính hãng 160 chi tiết.",
    "Không thủy kích, hỗ trợ kiểm tra xe tại hãng.",
  ],
},
{
  "id": "mitsubishi-xforce-2024-003",
  "name": "Mitsubishi Xforce",
  "slug": "mitsubishi-xforce-2024-003",
  "modelYear": 2024,
  "firstRegistration": "07/072024",
  "owners": "1 chủ từ mới",
  "variant": "ultimate",
  "mileage": 61161,
  "price": 575000000,
  "color": "đen",
  "transmission": "Số tự động",
  "fuel": "Xăng",
  "location": "Bình Dương",
  "status": "available",
  "image": "/images/used-cars/mitsubishi-xforce-2024-003/01.jpg",
  "images": [
    "/images/used-cars/mitsubishi-xforce-2024-003/01.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/02.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/03.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/04.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/05.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/06.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/07.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/08.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/09.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/10.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/11.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/12.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/13.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/14.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/15.jpg",
    "/images/used-cars/mitsubishi-xforce-2024-003/16.jpg"
  ],
  "description": "Mitsubishi Xforce sản xuất năm 2024, đăng ký lần đầu 07/072024, xe 1 chủ từ mới. Xe đang có sẵn, phù hợp với nhu cầu sử dụng gia đình và đi lại hằng ngày.",
  "serviceHistory": "Bảo dưỡng đầy đủ tại hãng",
  "equipment": [
    "Trang bị: Lót sàn",
    "Dán phim",
    "Camera hành trình",
    "Thảm cách nhiệt taplo"
  ],
  "commitments": [
    "Động cơ, hộp số nguyên bản; xe không tai nạn.",
    "Bảo vệ giá bán lại lên đến 90% khi sử dụng xe dưới 12 tháng.",
    "Xe đã được kiểm định chính hãng 160 chi tiết.",
    "Không thủy kích, hỗ trợ kiểm tra xe tại hãng."
  ]
},
];