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
];