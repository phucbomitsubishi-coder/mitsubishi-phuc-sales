// TỰ SINH bởi scripts/sync-accessories.mjs từ app báo giá. Không sửa tay, chạy lại script khi đổi giá.
// Chỉ gồm giá niêm yết của phụ kiện chính hãng MMV; món khác price: null (hiện "Liên hệ"). Không có giá nội bộ.

export type AccessoryItem = {
  name: string;
  // 5 / 7: chỉ áp dụng xe 5 chỗ / 7 chỗ; 0: mọi xe
  seats: number;
  // Giá niêm yết, chỉ có ở phụ kiện chính hãng MMV; null = liên hệ
  price: number | null;
};

export type AccessoryGroup = {
  name: string;
  // Có carId: phụ kiện riêng của dòng xe đó (Xpander Cross dùng chung với Xpander)
  carId?: string;
  items: AccessoryItem[];
};

export const accessoriesMonth = "10/2026";

export const accessoryGroups: AccessoryGroup[] = [
  {
    "name": "Phim cách nhiệt",
    "items": [
      {
        "name": "Ntech Standard – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Ntech Standard – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Ntech Standard – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Ntech Standard – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Ntech Standard – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Ntech Standard – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Ntech Standard – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Ntech Standard – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Jafim Platinum – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Jafim Platinum – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Jafim Platinum – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Nano Carbon – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Nano Carbon – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Nano Carbon – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Ceramic (IR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Wincos Premium – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Wincos Premium – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Dán phim PPF TPU – AC15C full xe 7 chỗ",
        "seats": 7,
        "price": null
      }
    ]
  },
  {
    "name": "Detailing (phủ, bọc, cách âm)",
    "items": [
      {
        "name": "Phủ gầm Nhật Bản xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Phủ gầm Nhật Bản xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Phủ gầm Đức xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Phủ gầm Đức xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Phủ nano kính xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Phủ nano kính xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Phủ nano xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Phủ nano xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Phủ ceramic xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Phủ ceramic xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc trần nilong xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc trần nilong xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc trần 5D xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc trần 5D xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc ghế simily xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc ghế simily xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc ghế da 70% xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc ghế da 70% xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc ghế da 100% xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc ghế da 100% xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bọc ghế da Nappa xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Bọc ghế da Nappa xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Dán cách âm xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Dán cách âm xe 7 chỗ",
        "seats": 7,
        "price": null
      }
    ]
  },
  {
    "name": "Trang trí – điện tử",
    "items": [
      {
        "name": "Áo trùm xe mạ chrome UV xe 5 chỗ",
        "seats": 5,
        "price": null
      },
      {
        "name": "Áo trùm xe mạ chrome UV xe 7 chỗ",
        "seats": 7,
        "price": null
      },
      {
        "name": "Bạt che nắng kính lái",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cặp chắn nắng tròn",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tấm che nắng nam châm",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bao da vô lăng nhiều màu",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bao da chìa khóa simily MT",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bao da chìa khóa Mitsubishi",
        "seats": 0,
        "price": null
      },
      {
        "name": "Biển số xe mica",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bình cứu hỏa 1000ml",
        "seats": 0,
        "price": null
      },
      {
        "name": "Móc khóa Jobon nhiều màu",
        "seats": 0,
        "price": null
      },
      {
        "name": "Anten đuôi cá Hybrid Aero",
        "seats": 0,
        "price": null
      },
      {
        "name": "Dây sạc điện thoại iPhone TP-X007",
        "seats": 0,
        "price": null
      },
      {
        "name": "Dây sạc bình acquy Total",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tẩu sạc Pugan 12V 2 đầu USB 4.8A",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giá đỡ điện thoại Vent Car Mount",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nước hoa Dr. Marcus Harmony",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nước hoa ô tô 120ST",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nước hoa ô tô 140ST",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nước hoa ô tô 160ST",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chụp van mâm Mitsubishi",
        "seats": 0,
        "price": null
      },
      {
        "name": "Gối tựa đầu Moveo",
        "seats": 0,
        "price": null
      },
      {
        "name": "Sổ da hồ sơ Mitsubishi",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm cao su liền sau (5C – đen)",
        "seats": 5,
        "price": null
      },
      {
        "name": "Máy hút bụi Car Cleaners 120W",
        "seats": 0,
        "price": null
      },
      {
        "name": "Máy lọc không khí Hyundai",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi nhấn SP000019",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi PZ451",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi vuông/tròn LED",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Waterproof HD",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Car Rear View HD",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Zestech AHD",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Car Camera Hàn Quốc",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Car Camera AHD720P",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera lùi Bravigo",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera cập lề Bonar",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến lùi",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến lùi A11 4 mắt",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến lùi 6 mắt",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến lùi Steelmate 4 mắt",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến đỗ xe Ellisen E48",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến áp suất lốp C398",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến áp suất lốp i3 Series",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến áp suất lốp TN405",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảm biến áp suất lốp Vietmap TW50",
        "seats": 0,
        "price": null
      },
      {
        "name": "Máy bơm lốp điện tử màn hình LED",
        "seats": 0,
        "price": null
      },
      {
        "name": "Máy bơm lốp + kích bình đa năng",
        "seats": 0,
        "price": null
      },
      {
        "name": "Máy bơm lốp Vietmap MF139 8K mAh",
        "seats": 0,
        "price": null
      },
      {
        "name": "Máy bơm lốp Vietmap MF139 13K mAh",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảnh báo va chạm Movon HQ",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cảnh báo điểm mù Steelmate SBS-1",
        "seats": 0,
        "price": null
      },
      {
        "name": "Điều khiển lên/xuống kính ô tô",
        "seats": 0,
        "price": null
      },
      {
        "name": "Điều khiển Cruise Control",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giám sát hành trình NASA-4G",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giám sát hành trình BM-4G02",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giám sát hành trình A200 Plus",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giám sát hành trình A500S-1",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giám sát hành trình A510S-1",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap TS-C1L",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap TS-H3K",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap TS-2K Lite",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap TS-3K",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap TS-5K",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap R440",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap M1 (trước + sau)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Vietmap M2 (trước + sau)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Mio-X2",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera hành trình Mio-X4 (camera trước)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Mivue 786 Wifi",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Webvision A28",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình Webvision M39X AI",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cam hành trình 70mai T400-1 (3 mắt)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera Elliview 3 mắt",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera 360 AVM 2D",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera 360 Sony 2D",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera 360 Sony LD-700",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Winca WS170+ New 4GB-64GB",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Winca W200 4GB-64GB",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Vietmap BS10 Lite",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Vietmap BS10 4-64GB",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Vietmap BS10 6-128GB",
        "seats": 0,
        "price": null
      },
      {
        "name": "Android box Vietmap BS10 8-128GB",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S170 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S170 Pro 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S200 13 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S200 13 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S200 QLED 2K Pro +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S300 Pro 12.3 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Winca S300 QLED 2K Pro 9 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "SID Winca S170 + Pro 4GB-32GB +360 (xe đã có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "SID Winca S200 + Pro 4GB-32GB +360 (xe đã có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình OLED C8S 9 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 620 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 620 Plus (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 620 Premium 13.1 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 720 (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 720 Plus 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Ntech 720 Premium (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L Lite 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K 9 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K Max 11.5 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K Max 11.5 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Còi Ming Yang Electric HN-70F",
        "seats": 0,
        "price": null
      },
      {
        "name": "Còi hụ bộ đàm Signal Speaker",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đầu MP5 màn hình cảm ứng 7 inch đa chức năng",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bóng đèn siêu sáng Y8 H4 Mini LED Lens",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn LED siêu sáng Auto Light",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bóng đèn siêu sáng H7",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn nội thất RGB 64 màu",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn sương mù theo xe DLAA",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn sương mù Aozoom FBL cơ bản",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn sương mù Aozoom tiêu chuẩn",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn bi gầm 3 màu",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn bi pha Red Turbo GTR 3.0",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn bi LED Leo Light Aozoom",
        "seats": 0,
        "price": null
      }
    ]
  },
  {
    "name": "Phụ kiện Attrage",
    "carId": "attrage",
    "items": [
      {
        "name": "Thảm taplo nhung Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm lót cốp nhựa Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn simily đen Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 360 độ – có rối Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bệ tì tay Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa Attrage đen",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp nắp bình xăng Attrage chrome",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp tay mở cửa Attrage chrome",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cốp ngoài Attrage carbon",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cốp trong Attrage carbon",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp chân kính Attrage inox",
        "seats": 0,
        "price": null
      },
      {
        "name": "Motor gập gương chiếu hậu Attrage",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bodykit Thái Lan Attrage",
        "seats": 0,
        "price": null
      }
    ]
  },
  {
    "name": "Phụ kiện Xforce",
    "carId": "xforce",
    "items": [
      {
        "name": "Thảm lót cốp nhựa Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn nhựa 3D Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn simily đen Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 5D Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 6D – có rối Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 360 độ – có rối Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đèn LED cản sau Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót 6D gồm khoang hành lý Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bộ ốp độ Xforce (bodykit)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bệ bước chân Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chắn bùn đen Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp chân kính Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chống trầy cốp ngoài nhựa Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chống trầy cốp trong titan Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chống trầy cốp ngoài titan Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chén chống trầy cửa mạ chrome Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tay nắm cửa mạ chrome Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp bình xăng mạ chrome Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tấm chắn nắng nam châm Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp chân ngoài không đèn titan Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp chân trong titan Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm taplo nhung Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm taplo da Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa chỉ mạ Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa đen Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bộ chữ logo chrome Xforce",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera 360 ghi hình 12.3 inch",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cốp điện Xforce",
        "seats": 0,
        "price": null
      }
    ]
  },
  {
    "name": "Phụ kiện Xpander",
    "carId": "xpander",
    "items": [
      {
        "name": "Vè che mưa Xpander đen",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa chỉ mạ Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót 6D gồm khoang hành lý Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn nhựa 3D Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn simily đen Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 6D – có rối Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp ốp hông inox Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp ốp hông chrome Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tem chữ logo Xpander chrome",
        "seats": 0,
        "price": null
      },
      {
        "name": "Tem chữ logo Xpander đen",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm taplo nhung Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm taplo da Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp chân kính inox Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu carbon Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu chrome Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp nắm cửa chrome Xpander ECO",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp chén cửa chrome Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cốp ngoài titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cốp trong titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bệ tì tay thấp màu đen Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp bước ngoài titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp bước ngoài LED inox Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Đề nổ từ xa Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bước chân trong titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bước chân ngoài titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giá nóc Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bệ bước chân cao cấp Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Chắn gầm máy Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Mặt ga lăng titan Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Gập gương điện Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Camera 540 Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cốp điện Xpander",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bodykit Thái Lan Xpander",
        "seats": 0,
        "price": null
      }
    ]
  },
  {
    "name": "Phụ kiện Triton",
    "carId": "triton",
    "items": [
      {
        "name": "Ốp chén cửa carbon Triton – MMV",
        "seats": 0,
        "price": 1458000
      },
      {
        "name": "Thảm cao su sàn Triton – MMV",
        "seats": 0,
        "price": 2484000
      },
      {
        "name": "Tem chữ logo Triton chrome – MMV",
        "seats": 0,
        "price": 1188000
      },
      {
        "name": "Vè che mưa đen Triton – MMV",
        "seats": 0,
        "price": 3186000
      },
      {
        "name": "Ốp bệ bước chân có đèn LED – MMV",
        "seats": 0,
        "price": 5346000
      },
      {
        "name": "Ốp bình nhiên liệu nhựa Triton – MMV",
        "seats": 0,
        "price": 1479600
      },
      {
        "name": "Thanh thể thao – MMV",
        "seats": 0,
        "price": 27540000
      },
      {
        "name": "Ty hỗ trợ nâng hạ bửng thùng sau – MMV",
        "seats": 0,
        "price": 4050000
      },
      {
        "name": "Vè che mưa đen New Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thảm taplo nhung Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu đen Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu chrome Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bình nhiên liệu titan Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp chén cửa đen Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp chén cửa chrome Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp chén cửa titan Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đèn pha đen Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đèn hậu đen Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đèn hậu chrome Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đèn hậu titan Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp viền thùng Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cua lốp Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn simily đen Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 5D Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 360 độ – có rối Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Giá nóc Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Baga mui Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh thể thao Triton Athlete",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh thể thao Harmer Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Khung thể thao VT06 Triton",
        "seats": 0,
        "price": null
      },
      {
        "name": "Khung thể thao Hamer (hàng Thái)",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh stylingbar nhựa ABS – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh stylingbar nhựa composite – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cua lốp đen bóng Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cản trước Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp cản sau Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp bửng Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp nắp capo Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp hông Triton – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đuôi gió nhựa composite – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Ốp đuôi gió nhựa ABS – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Khung ống thép VK Top – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh thể thao sắt Ryder VK Top 4x4 – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Thanh thể thao sắt đơn – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp cuộn cơ VK Roller – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp cuộn điện VK Roller – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp 3 tấm nhôm – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp thùng thấp mang cá SCZ 45 độ",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp thùng thấp 45 độ kiểu thanh thể thao Athlete – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp thùng thấp mở 90 độ – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp thùng cao không đèn – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nắp thùng cao có đèn (không đuôi cá) – Vy Khang",
        "seats": 0,
        "price": null
      },
      {
        "name": "Bodykit Victor Triton – Vy Khang",
        "seats": 0,
        "price": null
      }
    ]
  },
  {
    "name": "Phụ kiện Destinator",
    "carId": "destinator",
    "items": [
      {
        "name": "Bộ chữ \"Destinator\" – MMV",
        "seats": 0,
        "price": 1944000
      },
      {
        "name": "Thảm lót khoang hành lý – MMV",
        "seats": 0,
        "price": 3456000
      },
      {
        "name": "Ốp bệ bước chân có đèn LED – MMV",
        "seats": 0,
        "price": 5022000
      },
      {
        "name": "Ốp lướt gió đuôi xe – MMV",
        "seats": 0,
        "price": 6318000
      },
      {
        "name": "Ốp cản trước – MMV",
        "seats": 0,
        "price": 8532000
      },
      {
        "name": "Ốp cản sau – MMV",
        "seats": 0,
        "price": 9612000
      },
      {
        "name": "Bệ bước chân Destinator",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa Destinator đen",
        "seats": 0,
        "price": null
      },
      {
        "name": "Vè che mưa Destinator chỉ mạ",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn simily đen Destinator",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 6D – có rối Destinator",
        "seats": 0,
        "price": null
      },
      {
        "name": "Lót sàn 360 độ – có rối Destinator",
        "seats": 0,
        "price": null
      },
      {
        "name": "Nẹp bước chân ngoài Destinator nhựa",
        "seats": 0,
        "price": null
      },
      {
        "name": "Cốp điện Destinator",
        "seats": 0,
        "price": null
      }
    ]
  }
];
