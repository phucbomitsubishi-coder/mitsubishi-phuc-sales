// TỰ SINH bởi scripts/sync-accessories.mjs từ app báo giá. Không sửa tay, chạy lại script khi đổi giá.
// Chỉ gồm giá niêm yết (không có giá nội bộ).

export type AccessoryItem = {
  name: string;
  // 5 / 7: chỉ áp dụng xe 5 chỗ / 7 chỗ; 0: mọi xe
  seats: number;
  price: number;
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
        "price": 4250000
      },
      {
        "name": "Ntech Standard – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 2360000
      },
      {
        "name": "Ntech Standard – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 550000
      },
      {
        "name": "Ntech Standard – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 1090000
      },
      {
        "name": "Ntech Standard – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 4920000
      },
      {
        "name": "Ntech Standard – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 2360000
      },
      {
        "name": "Ntech Standard – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 640000
      },
      {
        "name": "Ntech Standard – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 1150000
      },
      {
        "name": "Jafim Platinum – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 5920000
      },
      {
        "name": "Jafim Platinum – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 2910000
      },
      {
        "name": "Jafim Platinum – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 910000
      },
      {
        "name": "Jafim Platinum – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 1450000
      },
      {
        "name": "Jafim Platinum – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 6580000
      },
      {
        "name": "Jafim Platinum – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 2910000
      },
      {
        "name": "Jafim Platinum – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 1090000
      },
      {
        "name": "Jafim Platinum – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 1450000
      },
      {
        "name": "3M Nano Carbon – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 7430000
      },
      {
        "name": "3M Nano Carbon – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 3330000
      },
      {
        "name": "3M Nano Carbon – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 1450000
      },
      {
        "name": "3M Nano Carbon – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 2180000
      },
      {
        "name": "3M Nano Carbon – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 8140000
      },
      {
        "name": "3M Nano Carbon – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 3330000
      },
      {
        "name": "3M Nano Carbon – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 1820000
      },
      {
        "name": "3M Nano Carbon – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 2180000
      },
      {
        "name": "3M Ceramic (IR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 13720000
      },
      {
        "name": "3M Ceramic (IR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 5930000
      },
      {
        "name": "3M Ceramic (IR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 2570000
      },
      {
        "name": "3M Ceramic (IR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 4290000
      },
      {
        "name": "3M Ceramic (IR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 15390000
      },
      {
        "name": "3M Ceramic (IR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 5600000
      },
      {
        "name": "3M Ceramic (IR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 2930000
      },
      {
        "name": "3M Ceramic (IR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 4050000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 16190000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 8090000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 2930000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 4050000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 19110000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 8090000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 2930000
      },
      {
        "name": "3M Siêu cấp (CR-IR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 4050000
      },
      {
        "name": "3M Thương gia (CR-CR) – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 23480000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lái xe 5 chỗ",
        "seats": 5,
        "price": 8090000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính hông xe 5 chỗ",
        "seats": 5,
        "price": 4760000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lưng xe 5 chỗ",
        "seats": 5,
        "price": 6590000
      },
      {
        "name": "3M Thương gia (CR-CR) – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 26660000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lái xe 7 chỗ",
        "seats": 7,
        "price": 8090000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính hông xe 7 chỗ",
        "seats": 7,
        "price": 5440000
      },
      {
        "name": "3M Thương gia (CR-CR) – kính lưng xe 7 chỗ",
        "seats": 7,
        "price": 6980000
      },
      {
        "name": "Wincos Premium – trọn gói xe 5 chỗ",
        "seats": 5,
        "price": 10562400
      },
      {
        "name": "Wincos Premium – trọn gói xe 7 chỗ",
        "seats": 7,
        "price": 11340000
      },
      {
        "name": "Dán phim PPF TPU – AC15C full xe 7 chỗ",
        "seats": 7,
        "price": 25720000
      }
    ]
  },
  {
    "name": "Detailing (phủ, bọc, cách âm)",
    "items": [
      {
        "name": "Phủ gầm Nhật Bản xe 5 chỗ",
        "seats": 5,
        "price": 4670000
      },
      {
        "name": "Phủ gầm Nhật Bản xe 7 chỗ",
        "seats": 7,
        "price": 4930000
      },
      {
        "name": "Phủ gầm Đức xe 5 chỗ",
        "seats": 5,
        "price": 5500000
      },
      {
        "name": "Phủ gầm Đức xe 7 chỗ",
        "seats": 7,
        "price": 6130000
      },
      {
        "name": "Phủ nano kính xe 5 chỗ",
        "seats": 5,
        "price": 1450000
      },
      {
        "name": "Phủ nano kính xe 7 chỗ",
        "seats": 7,
        "price": 1820000
      },
      {
        "name": "Phủ nano xe 5 chỗ",
        "seats": 5,
        "price": 6160000
      },
      {
        "name": "Phủ nano xe 7 chỗ",
        "seats": 7,
        "price": 6430000
      },
      {
        "name": "Phủ ceramic xe 5 chỗ",
        "seats": 5,
        "price": 9520000
      },
      {
        "name": "Phủ ceramic xe 7 chỗ",
        "seats": 7,
        "price": 10480000
      },
      {
        "name": "Bọc trần nilong xe 5 chỗ",
        "seats": 5,
        "price": 1100000
      },
      {
        "name": "Bọc trần nilong xe 7 chỗ",
        "seats": 7,
        "price": 1280000
      },
      {
        "name": "Bọc trần 5D xe 5 chỗ",
        "seats": 5,
        "price": 2390000
      },
      {
        "name": "Bọc trần 5D xe 7 chỗ",
        "seats": 7,
        "price": 2620000
      },
      {
        "name": "Bọc ghế simily xe 5 chỗ",
        "seats": 5,
        "price": 6000000
      },
      {
        "name": "Bọc ghế simily xe 7 chỗ",
        "seats": 7,
        "price": 7630000
      },
      {
        "name": "Bọc ghế da 70% xe 5 chỗ",
        "seats": 5,
        "price": 7750000
      },
      {
        "name": "Bọc ghế da 70% xe 7 chỗ",
        "seats": 7,
        "price": 10890000
      },
      {
        "name": "Bọc ghế da 100% xe 5 chỗ",
        "seats": 5,
        "price": 9600000
      },
      {
        "name": "Bọc ghế da 100% xe 7 chỗ",
        "seats": 7,
        "price": 12570000
      },
      {
        "name": "Bọc ghế da Nappa xe 5 chỗ",
        "seats": 5,
        "price": 14280000
      },
      {
        "name": "Bọc ghế da Nappa xe 7 chỗ",
        "seats": 7,
        "price": 17720000
      },
      {
        "name": "Dán cách âm xe 5 chỗ",
        "seats": 5,
        "price": 11970000
      },
      {
        "name": "Dán cách âm xe 7 chỗ",
        "seats": 7,
        "price": 13790000
      }
    ]
  },
  {
    "name": "Trang trí – điện tử",
    "items": [
      {
        "name": "Áo trùm xe mạ chrome UV xe 5 chỗ",
        "seats": 5,
        "price": 840000
      },
      {
        "name": "Áo trùm xe mạ chrome UV xe 7 chỗ",
        "seats": 7,
        "price": 840000
      },
      {
        "name": "Bạt che nắng kính lái",
        "seats": 0,
        "price": 640000
      },
      {
        "name": "Cặp chắn nắng tròn",
        "seats": 0,
        "price": 160000
      },
      {
        "name": "Tấm che nắng nam châm",
        "seats": 0,
        "price": 1000000
      },
      {
        "name": "Bao da vô lăng nhiều màu",
        "seats": 0,
        "price": 450000
      },
      {
        "name": "Bao da chìa khóa simily MT",
        "seats": 0,
        "price": 360000
      },
      {
        "name": "Bao da chìa khóa Mitsubishi",
        "seats": 0,
        "price": 380000
      },
      {
        "name": "Biển số xe mica",
        "seats": 0,
        "price": 690000
      },
      {
        "name": "Bình cứu hỏa 1000ml",
        "seats": 0,
        "price": 400000
      },
      {
        "name": "Móc khóa Jobon nhiều màu",
        "seats": 0,
        "price": 310000
      },
      {
        "name": "Anten đuôi cá Hybrid Aero",
        "seats": 0,
        "price": 530000
      },
      {
        "name": "Dây sạc điện thoại iPhone TP-X007",
        "seats": 0,
        "price": 160000
      },
      {
        "name": "Dây sạc bình acquy Total",
        "seats": 0,
        "price": 840000
      },
      {
        "name": "Tẩu sạc Pugan 12V 2 đầu USB 4.8A",
        "seats": 0,
        "price": 270000
      },
      {
        "name": "Giá đỡ điện thoại Vent Car Mount",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Nước hoa Dr. Marcus Harmony",
        "seats": 0,
        "price": 470000
      },
      {
        "name": "Nước hoa ô tô 120ST",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Nước hoa ô tô 140ST",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Nước hoa ô tô 160ST",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Chụp van mâm Mitsubishi",
        "seats": 0,
        "price": 130000
      },
      {
        "name": "Gối tựa đầu Moveo",
        "seats": 0,
        "price": 100000
      },
      {
        "name": "Sổ da hồ sơ Mitsubishi",
        "seats": 0,
        "price": 250000
      },
      {
        "name": "Thảm cao su liền sau (5C – đen)",
        "seats": 5,
        "price": 2050000
      },
      {
        "name": "Máy hút bụi Car Cleaners 120W",
        "seats": 0,
        "price": 690000
      },
      {
        "name": "Máy lọc không khí Hyundai",
        "seats": 0,
        "price": 1820000
      },
      {
        "name": "Camera lùi nhấn SP000019",
        "seats": 0,
        "price": 840000
      },
      {
        "name": "Camera lùi PZ451",
        "seats": 0,
        "price": 910000
      },
      {
        "name": "Camera lùi vuông/tròn LED",
        "seats": 0,
        "price": 1350000
      },
      {
        "name": "Camera lùi Waterproof HD",
        "seats": 0,
        "price": 1360000
      },
      {
        "name": "Camera lùi Car Rear View HD",
        "seats": 0,
        "price": 1450000
      },
      {
        "name": "Camera lùi Zestech AHD",
        "seats": 0,
        "price": 1450000
      },
      {
        "name": "Camera lùi Car Camera Hàn Quốc",
        "seats": 0,
        "price": 1560000
      },
      {
        "name": "Camera lùi Car Camera AHD720P",
        "seats": 0,
        "price": 1760000
      },
      {
        "name": "Camera lùi Bravigo",
        "seats": 0,
        "price": 1870000
      },
      {
        "name": "Camera cập lề Bonar",
        "seats": 0,
        "price": 1650000
      },
      {
        "name": "Cảm biến lùi",
        "seats": 0,
        "price": 1270000
      },
      {
        "name": "Cảm biến lùi A11 4 mắt",
        "seats": 0,
        "price": 1270000
      },
      {
        "name": "Cảm biến lùi 6 mắt",
        "seats": 0,
        "price": 2490000
      },
      {
        "name": "Cảm biến lùi Steelmate 4 mắt",
        "seats": 0,
        "price": 2570000
      },
      {
        "name": "Cảm biến đỗ xe Ellisen E48",
        "seats": 0,
        "price": 7040000
      },
      {
        "name": "Cảm biến áp suất lốp C398",
        "seats": 0,
        "price": 4170000
      },
      {
        "name": "Cảm biến áp suất lốp i3 Series",
        "seats": 0,
        "price": 5720000
      },
      {
        "name": "Cảm biến áp suất lốp TN405",
        "seats": 0,
        "price": 4670000
      },
      {
        "name": "Cảm biến áp suất lốp Vietmap TW50",
        "seats": 0,
        "price": 2990000
      },
      {
        "name": "Máy bơm lốp điện tử màn hình LED",
        "seats": 0,
        "price": 1640000
      },
      {
        "name": "Máy bơm lốp + kích bình đa năng",
        "seats": 0,
        "price": 2840000
      },
      {
        "name": "Máy bơm lốp Vietmap MF139 8K mAh",
        "seats": 0,
        "price": 1990000
      },
      {
        "name": "Máy bơm lốp Vietmap MF139 13K mAh",
        "seats": 0,
        "price": 2590000
      },
      {
        "name": "Cảnh báo va chạm Movon HQ",
        "seats": 0,
        "price": 12670000
      },
      {
        "name": "Cảnh báo điểm mù Steelmate SBS-1",
        "seats": 0,
        "price": 7320000
      },
      {
        "name": "Điều khiển lên/xuống kính ô tô",
        "seats": 0,
        "price": 2490000
      },
      {
        "name": "Điều khiển Cruise Control",
        "seats": 0,
        "price": 4290000
      },
      {
        "name": "Giám sát hành trình NASA-4G",
        "seats": 0,
        "price": 2910000
      },
      {
        "name": "Giám sát hành trình BM-4G02",
        "seats": 0,
        "price": 2850000
      },
      {
        "name": "Giám sát hành trình A200 Plus",
        "seats": 0,
        "price": 4350000
      },
      {
        "name": "Giám sát hành trình A500S-1",
        "seats": 0,
        "price": 4980000
      },
      {
        "name": "Giám sát hành trình A510S-1",
        "seats": 0,
        "price": 5830000
      },
      {
        "name": "Cam hành trình Vietmap TS-C1L",
        "seats": 0,
        "price": 3320000
      },
      {
        "name": "Cam hành trình Vietmap TS-H3K",
        "seats": 0,
        "price": 4830000
      },
      {
        "name": "Cam hành trình Vietmap TS-2K Lite",
        "seats": 0,
        "price": 2990000
      },
      {
        "name": "Cam hành trình Vietmap TS-3K",
        "seats": 0,
        "price": 6820000
      },
      {
        "name": "Cam hành trình Vietmap TS-5K",
        "seats": 0,
        "price": 4990000
      },
      {
        "name": "Cam hành trình Vietmap R440",
        "seats": 0,
        "price": 3990000
      },
      {
        "name": "Cam hành trình Vietmap M1 (trước + sau)",
        "seats": 0,
        "price": 6190000
      },
      {
        "name": "Cam hành trình Vietmap M2 (trước + sau)",
        "seats": 0,
        "price": 8980000
      },
      {
        "name": "Cam hành trình Mio-X2",
        "seats": 0,
        "price": 3150000
      },
      {
        "name": "Camera hành trình Mio-X4 (camera trước)",
        "seats": 0,
        "price": 2190000
      },
      {
        "name": "Cam hành trình Mivue 786 Wifi",
        "seats": 0,
        "price": 5790000
      },
      {
        "name": "Cam hành trình Webvision A28",
        "seats": 0,
        "price": 5930000
      },
      {
        "name": "Cam hành trình Webvision M39X AI",
        "seats": 0,
        "price": 10650000
      },
      {
        "name": "Cam hành trình 70mai T400-1 (3 mắt)",
        "seats": 0,
        "price": 6430000
      },
      {
        "name": "Camera Elliview 3 mắt",
        "seats": 0,
        "price": 9520000
      },
      {
        "name": "Camera 360 AVM 2D",
        "seats": 0,
        "price": 12950000
      },
      {
        "name": "Camera 360 Sony 2D",
        "seats": 0,
        "price": 12950000
      },
      {
        "name": "Camera 360 Sony LD-700",
        "seats": 0,
        "price": 18130000
      },
      {
        "name": "Android box Winca WS170+ New 4GB-64GB",
        "seats": 0,
        "price": 8670000
      },
      {
        "name": "Android box Winca W200 4GB-64GB",
        "seats": 0,
        "price": 9960000
      },
      {
        "name": "Android box Vietmap BS10 Lite",
        "seats": 0,
        "price": 4990000
      },
      {
        "name": "Android box Vietmap BS10 4-64GB",
        "seats": 0,
        "price": 6990000
      },
      {
        "name": "Android box Vietmap BS10 6-128GB",
        "seats": 0,
        "price": 8390000
      },
      {
        "name": "Android box Vietmap BS10 8-128GB",
        "seats": 0,
        "price": 9490000
      },
      {
        "name": "Màn hình Winca S170 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 12670000
      },
      {
        "name": "Màn hình Winca S170 Pro 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 14850000
      },
      {
        "name": "Màn hình Winca S200 13 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 16390000
      },
      {
        "name": "Màn hình Winca S200 13 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": 20111111
      },
      {
        "name": "Màn hình Winca S200 QLED 2K Pro +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": 19810000
      },
      {
        "name": "Màn hình Winca S300 Pro 12.3 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": 25910000
      },
      {
        "name": "Màn hình Winca S300 QLED 2K Pro 9 inch +360 (xe chưa có màn hình)",
        "seats": 0,
        "price": 24680000
      },
      {
        "name": "SID Winca S170 + Pro 4GB-32GB +360 (xe đã có màn hình)",
        "seats": 0,
        "price": 17480000
      },
      {
        "name": "SID Winca S200 + Pro 4GB-32GB +360 (xe đã có màn hình)",
        "seats": 0,
        "price": 19730000
      },
      {
        "name": "Màn hình OLED C8S 9 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 17330000
      },
      {
        "name": "Màn hình Ntech 620 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 8390000
      },
      {
        "name": "Màn hình Ntech 620 Plus (xe chưa có màn hình)",
        "seats": 0,
        "price": 14560000
      },
      {
        "name": "Màn hình Ntech 620 Premium 13.1 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 18610000
      },
      {
        "name": "Màn hình Ntech 720 (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 18610000
      },
      {
        "name": "Màn hình Ntech 720 Plus 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 21850000
      },
      {
        "name": "Màn hình Ntech 720 Premium (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 21850000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L Lite 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 7990000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L 9 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 9990000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3L (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 11990000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K 9 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 18390000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K Max 11.5 inch (xe chưa có màn hình)",
        "seats": 0,
        "price": 18990000
      },
      {
        "name": "Màn hình Vietmap Teyes CC3 2K Max 11.5 inch (+360) (xe chưa có màn hình)",
        "seats": 0,
        "price": 24490000
      },
      {
        "name": "Còi Ming Yang Electric HN-70F",
        "seats": 0,
        "price": 1650000
      },
      {
        "name": "Còi hụ bộ đàm Signal Speaker",
        "seats": 0,
        "price": 3250000
      },
      {
        "name": "Đầu MP5 màn hình cảm ứng 7 inch đa chức năng",
        "seats": 0,
        "price": 1820000
      },
      {
        "name": "Bóng đèn siêu sáng Y8 H4 Mini LED Lens",
        "seats": 0,
        "price": 3220000
      },
      {
        "name": "Đèn LED siêu sáng Auto Light",
        "seats": 0,
        "price": 1250000
      },
      {
        "name": "Bóng đèn siêu sáng H7",
        "seats": 0,
        "price": 4000000
      },
      {
        "name": "Đèn nội thất RGB 64 màu",
        "seats": 0,
        "price": 4400000
      },
      {
        "name": "Đèn sương mù theo xe DLAA",
        "seats": 0,
        "price": 3820000
      },
      {
        "name": "Đèn sương mù Aozoom FBL cơ bản",
        "seats": 0,
        "price": 7020000
      },
      {
        "name": "Đèn sương mù Aozoom tiêu chuẩn",
        "seats": 0,
        "price": 7920000
      },
      {
        "name": "Đèn bi gầm 3 màu",
        "seats": 0,
        "price": 6330000
      },
      {
        "name": "Đèn bi pha Red Turbo GTR 3.0",
        "seats": 0,
        "price": 11430000
      },
      {
        "name": "Đèn bi LED Leo Light Aozoom",
        "seats": 0,
        "price": 14480000
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
        "price": 730000
      },
      {
        "name": "Thảm lót cốp nhựa Attrage",
        "seats": 0,
        "price": 1090000
      },
      {
        "name": "Lót sàn simily đen Attrage",
        "seats": 0,
        "price": 1670000
      },
      {
        "name": "Lót sàn 360 độ – có rối Attrage",
        "seats": 0,
        "price": 5280000
      },
      {
        "name": "Bệ tì tay Attrage",
        "seats": 0,
        "price": 1400000
      },
      {
        "name": "Vè che mưa Attrage đen",
        "seats": 0,
        "price": 1160000
      },
      {
        "name": "Ốp nắp bình xăng Attrage chrome",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp tay mở cửa Attrage chrome",
        "seats": 0,
        "price": 530000
      },
      {
        "name": "Ốp cốp ngoài Attrage carbon",
        "seats": 0,
        "price": 930000
      },
      {
        "name": "Ốp cốp trong Attrage carbon",
        "seats": 0,
        "price": 930000
      },
      {
        "name": "Nẹp chân kính Attrage inox",
        "seats": 0,
        "price": 1900000
      },
      {
        "name": "Motor gập gương chiếu hậu Attrage",
        "seats": 0,
        "price": 6160000
      },
      {
        "name": "Bodykit Thái Lan Attrage",
        "seats": 0,
        "price": 19050000
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
        "price": 1070000
      },
      {
        "name": "Lót sàn nhựa 3D Xforce",
        "seats": 0,
        "price": 4520000
      },
      {
        "name": "Lót sàn simily đen Xforce",
        "seats": 0,
        "price": 1670000
      },
      {
        "name": "Lót sàn 5D Xforce",
        "seats": 0,
        "price": 4170000
      },
      {
        "name": "Lót sàn 6D – có rối Xforce",
        "seats": 0,
        "price": 5280000
      },
      {
        "name": "Lót sàn 360 độ – có rối Xforce",
        "seats": 0,
        "price": 5280000
      },
      {
        "name": "Đèn LED cản sau Xforce",
        "seats": 0,
        "price": 4290000
      },
      {
        "name": "Lót 6D gồm khoang hành lý Xforce",
        "seats": 0,
        "price": 2340000
      },
      {
        "name": "Bộ ốp độ Xforce (bodykit)",
        "seats": 0,
        "price": 10480000
      },
      {
        "name": "Bệ bước chân Xforce",
        "seats": 0,
        "price": 6130000
      },
      {
        "name": "Chắn bùn đen Xforce",
        "seats": 0,
        "price": 910000
      },
      {
        "name": "Nẹp chân kính Xforce",
        "seats": 0,
        "price": 910000
      },
      {
        "name": "Chống trầy cốp ngoài nhựa Xforce",
        "seats": 0,
        "price": 1260000
      },
      {
        "name": "Chống trầy cốp trong titan Xforce",
        "seats": 0,
        "price": 880000
      },
      {
        "name": "Chống trầy cốp ngoài titan Xforce",
        "seats": 0,
        "price": 880000
      },
      {
        "name": "Chén chống trầy cửa mạ chrome Xforce",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Tay nắm cửa mạ chrome Xforce",
        "seats": 0,
        "price": 640000
      },
      {
        "name": "Nắp bình xăng mạ chrome Xforce",
        "seats": 0,
        "price": 380000
      },
      {
        "name": "Tấm chắn nắng nam châm Xforce",
        "seats": 0,
        "price": 1040000
      },
      {
        "name": "Nẹp chân ngoài không đèn titan Xforce",
        "seats": 0,
        "price": 780000
      },
      {
        "name": "Nẹp chân trong titan Xforce",
        "seats": 0,
        "price": 1040000
      },
      {
        "name": "Thảm taplo nhung Xforce",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Thảm taplo da Xforce",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Vè che mưa chỉ mạ Xforce",
        "seats": 0,
        "price": 1170000
      },
      {
        "name": "Vè che mưa đen Xforce",
        "seats": 0,
        "price": 1090000
      },
      {
        "name": "Bộ chữ logo chrome Xforce",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Camera 360 ghi hình 12.3 inch",
        "seats": 0,
        "price": 19870000
      },
      {
        "name": "Cốp điện Xforce",
        "seats": 0,
        "price": 18090000
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
        "price": 1090000
      },
      {
        "name": "Vè che mưa chỉ mạ Xpander",
        "seats": 0,
        "price": 1160000
      },
      {
        "name": "Lót 6D gồm khoang hành lý Xpander",
        "seats": 0,
        "price": 2340000
      },
      {
        "name": "Lót sàn nhựa 3D Xpander",
        "seats": 0,
        "price": 4520000
      },
      {
        "name": "Lót sàn simily đen Xpander",
        "seats": 0,
        "price": 1900000
      },
      {
        "name": "Lót sàn 6D – có rối Xpander",
        "seats": 0,
        "price": 6380000
      },
      {
        "name": "Nẹp ốp hông inox Xpander",
        "seats": 0,
        "price": 1220000
      },
      {
        "name": "Nẹp ốp hông chrome Xpander",
        "seats": 0,
        "price": 1220000
      },
      {
        "name": "Tem chữ logo Xpander chrome",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Tem chữ logo Xpander đen",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Thảm taplo nhung Xpander",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Thảm taplo da Xpander",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Nẹp chân kính inox Xpander",
        "seats": 0,
        "price": 1220000
      },
      {
        "name": "Ốp bình nhiên liệu carbon Xpander",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp bình nhiên liệu chrome Xpander",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp bình nhiên liệu titan Xpander",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp nắm cửa chrome Xpander ECO",
        "seats": 0,
        "price": 640000
      },
      {
        "name": "Ốp chén cửa chrome Xpander",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Ốp cốp ngoài titan Xpander",
        "seats": 0,
        "price": 870000
      },
      {
        "name": "Ốp cốp trong titan Xpander",
        "seats": 0,
        "price": 930000
      },
      {
        "name": "Bệ tì tay thấp màu đen Xpander",
        "seats": 0,
        "price": 1350000
      },
      {
        "name": "Nẹp bước ngoài titan Xpander",
        "seats": 0,
        "price": 720000
      },
      {
        "name": "Nẹp bước ngoài LED inox Xpander",
        "seats": 0,
        "price": 1930000
      },
      {
        "name": "Đề nổ từ xa Xpander",
        "seats": 0,
        "price": 15080000
      },
      {
        "name": "Ốp bước chân trong titan Xpander",
        "seats": 0,
        "price": 1040000
      },
      {
        "name": "Ốp bước chân ngoài titan Xpander",
        "seats": 0,
        "price": 780000
      },
      {
        "name": "Giá nóc Xpander",
        "seats": 0,
        "price": 3620000
      },
      {
        "name": "Bệ bước chân cao cấp Xpander",
        "seats": 0,
        "price": 5720000
      },
      {
        "name": "Chắn gầm máy Xpander",
        "seats": 0,
        "price": 4400000
      },
      {
        "name": "Mặt ga lăng titan Xpander",
        "seats": 0,
        "price": 3770000
      },
      {
        "name": "Gập gương điện Xpander",
        "seats": 0,
        "price": 5340000
      },
      {
        "name": "Camera 540 Xpander",
        "seats": 0,
        "price": 18100000
      },
      {
        "name": "Cốp điện Xpander",
        "seats": 0,
        "price": 18090000
      },
      {
        "name": "Bodykit Thái Lan Xpander",
        "seats": 0,
        "price": 30480000
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
        "price": 1250000
      },
      {
        "name": "Thảm taplo nhung Triton",
        "seats": 0,
        "price": 730000
      },
      {
        "name": "Ốp bình nhiên liệu đen Triton",
        "seats": 0,
        "price": 640000
      },
      {
        "name": "Ốp bình nhiên liệu chrome Triton",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp bình nhiên liệu titan Triton",
        "seats": 0,
        "price": 420000
      },
      {
        "name": "Ốp chén cửa đen Triton",
        "seats": 0,
        "price": 670000
      },
      {
        "name": "Ốp chén cửa chrome Triton",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Ốp chén cửa titan Triton",
        "seats": 0,
        "price": 650000
      },
      {
        "name": "Ốp đèn pha đen Triton",
        "seats": 0,
        "price": 1180000
      },
      {
        "name": "Ốp đèn hậu đen Triton",
        "seats": 0,
        "price": 1180000
      },
      {
        "name": "Ốp đèn hậu chrome Triton",
        "seats": 0,
        "price": 930000
      },
      {
        "name": "Ốp đèn hậu titan Triton",
        "seats": 0,
        "price": 930000
      },
      {
        "name": "Ốp viền thùng Triton",
        "seats": 0,
        "price": 2730000
      },
      {
        "name": "Ốp cua lốp Triton",
        "seats": 0,
        "price": 6850000
      },
      {
        "name": "Lót sàn simily đen Triton",
        "seats": 0,
        "price": 1670000
      },
      {
        "name": "Lót sàn 5D Triton",
        "seats": 0,
        "price": 4170000
      },
      {
        "name": "Lót sàn 360 độ – có rối Triton",
        "seats": 0,
        "price": 5280000
      },
      {
        "name": "Giá nóc Triton",
        "seats": 0,
        "price": 4050000
      },
      {
        "name": "Baga mui Triton",
        "seats": 0,
        "price": 3840000
      },
      {
        "name": "Thanh thể thao Triton Athlete",
        "seats": 0,
        "price": 10050000
      },
      {
        "name": "Thanh thể thao Harmer Triton",
        "seats": 0,
        "price": 19520000
      },
      {
        "name": "Khung thể thao VT06 Triton",
        "seats": 0,
        "price": 14160000
      },
      {
        "name": "Khung thể thao Hamer (hàng Thái)",
        "seats": 0,
        "price": 42850000
      },
      {
        "name": "Thanh stylingbar nhựa ABS – Vy Khang",
        "seats": 0,
        "price": 21600000
      },
      {
        "name": "Thanh stylingbar nhựa composite – Vy Khang",
        "seats": 0,
        "price": 15422400
      },
      {
        "name": "Ốp cua lốp đen bóng Triton – Vy Khang",
        "seats": 0,
        "price": 13381200
      },
      {
        "name": "Ốp cản trước Triton – Vy Khang",
        "seats": 0,
        "price": 16459200
      },
      {
        "name": "Ốp cản sau Triton – Vy Khang",
        "seats": 0,
        "price": 12960000
      },
      {
        "name": "Ốp bửng Triton – Vy Khang",
        "seats": 0,
        "price": 12960000
      },
      {
        "name": "Ốp nắp capo Triton – Vy Khang",
        "seats": 0,
        "price": 12960000
      },
      {
        "name": "Ốp hông Triton – Vy Khang",
        "seats": 0,
        "price": 8640000
      },
      {
        "name": "Ốp đuôi gió nhựa composite – Vy Khang",
        "seats": 0,
        "price": 6177600
      },
      {
        "name": "Ốp đuôi gió nhựa ABS – Vy Khang",
        "seats": 0,
        "price": 8218800
      },
      {
        "name": "Khung ống thép VK Top – Vy Khang",
        "seats": 0,
        "price": 13381200
      },
      {
        "name": "Thanh thể thao sắt Ryder VK Top 4x4 – Vy Khang",
        "seats": 0,
        "price": 13381200
      },
      {
        "name": "Thanh thể thao sắt đơn – Vy Khang",
        "seats": 0,
        "price": 8218800
      },
      {
        "name": "Nắp cuộn cơ VK Roller – Vy Khang",
        "seats": 0,
        "price": 25498800
      },
      {
        "name": "Nắp cuộn điện VK Roller – Vy Khang",
        "seats": 0,
        "price": 38264400
      },
      {
        "name": "Nắp 3 tấm nhôm – Vy Khang",
        "seats": 0,
        "price": 17485200
      },
      {
        "name": "Nắp thùng thấp mang cá SCZ 45 độ",
        "seats": 0,
        "price": 30240000
      },
      {
        "name": "Nắp thùng thấp 45 độ kiểu thanh thể thao Athlete – Vy Khang",
        "seats": 0,
        "price": 30240000
      },
      {
        "name": "Nắp thùng thấp mở 90 độ – Vy Khang",
        "seats": 0,
        "price": 35380800
      },
      {
        "name": "Nắp thùng cao không đèn – Vy Khang",
        "seats": 0,
        "price": 31676400
      },
      {
        "name": "Nắp thùng cao có đèn (không đuôi cá) – Vy Khang",
        "seats": 0,
        "price": 37443600
      },
      {
        "name": "Bodykit Victor Triton – Vy Khang",
        "seats": 0,
        "price": 47314800
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
        "price": 5720000
      },
      {
        "name": "Vè che mưa Destinator đen",
        "seats": 0,
        "price": 1170000
      },
      {
        "name": "Vè che mưa Destinator chỉ mạ",
        "seats": 0,
        "price": 1360000
      },
      {
        "name": "Lót sàn simily đen Destinator",
        "seats": 0,
        "price": 1900000
      },
      {
        "name": "Lót sàn 6D – có rối Destinator",
        "seats": 0,
        "price": 6380000
      },
      {
        "name": "Lót sàn 360 độ – có rối Destinator",
        "seats": 0,
        "price": 6380000
      },
      {
        "name": "Nẹp bước chân ngoài Destinator nhựa",
        "seats": 0,
        "price": 1170000
      },
      {
        "name": "Cốp điện Destinator",
        "seats": 0,
        "price": 19050000
      }
    ]
  }
];
