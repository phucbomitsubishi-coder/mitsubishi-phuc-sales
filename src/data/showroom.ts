// Bộ hình ảnh + nội dung trang xe kiểu trang sản phẩm MMV (banner video, biểu tượng, ảnh phiên bản, khối tính năng).
// Ảnh/video tải từ trang xe trên mitsubishi-motors.com.vn (MMV dùng chung cho web các nhà phân phối),
// đã nén và lưu ở public/images/cars/<id>/showroom/. Xe chưa có mục ở đây thì trang xe dùng giao diện mặc định.
// Tiêu đề khối lấy theo trang MMV; nội dung chi tiết lấy từ trang bị trong cars.ts (đã đối chiếu MMV).

export type ShowroomFeature = {
  kicker: string;
  title: string;
  text?: string;
  image: string;
  // Danh sách gạch đầu dòng tự lấy từ trang bị của phiên bản giá cao nhất
  from?: "exterior" | "interior" | "convenience" | "safety" | "drivingSupport" | "safetyTechnologies";
};

export type Showroom = {
  slogan: string;
  logo: { src: string; width: number; height: number };
  // Video chỉ phát trên máy tính; điện thoại dùng ảnh mobilePoster cho nhẹ
  video?: string;
  poster: string;
  mobilePoster: string;
  specs: { icon: string; label: string }[];
  // Ảnh xe nhìn ngang theo phiên bản → màu (tên màu khớp colors trong cars.ts); màu đầu tiên là ảnh mặc định
  sideImages?: Record<string, Record<string, string>>;
  // Ảnh nền dọc hiện khi rê chuột vào xe ở băng chuyền trang chủ (ảnh nền thanh chọn xe trang chủ MMV)
  hoverBg?: string;
  // Ảnh xe có cảnh nền cho thẻ trang /xe (trang "Tất cả dòng xe" của MMV)
  listImage?: string;
  highlight?: ShowroomFeature;
  // Khối "Phụ kiện chính hãng" (ảnh MMV), dẫn sang bảng phụ kiện của xe
  accessoriesImage?: string;
  features: ShowroomFeature[];
};

const dst = "/images/cars/destinator/showroom";
const xf = "/images/cars/xforce/showroom";
const xp = "/images/cars/xpander/showroom";
const xc = "/images/cars/xpander-cross/showroom";
const tr = "/images/cars/triton/showroom";
const at = "/images/cars/attrage/showroom";

export const showrooms: Record<string, Showroom> = {
  destinator: {
    hoverBg: `${dst}/hover-bg.jpg`,
    listImage: `${dst}/list.png`,
    slogan: "Khởi sự vạn điểm đến",
    logo: { src: `${dst}/logo.png`, width: 1200, height: 124 },
    video: `${dst}/hero.mp4`,
    poster: `${dst}/hero-poster.jpg`,
    mobilePoster: `${dst}/hero-mobile.jpg`,
    specs: [
      { icon: `${dst}/icon-thiet-ke.png`, label: "Thiết kế đẳng cấp" },
      { icon: `${dst}/icon-noi-that.png`, label: "Nội thất sang trọng" },
      { icon: `${dst}/icon-diamond-sense.png`, label: "Diamond Sense" },
      { icon: `${dst}/icon-am-thanh.png`, label: "Dynamic Sound Yamaha Premium" },
    ],
    sideImages: {
      Ultimate: {
        "Trắng Đen": `${dst}/side-ultimate-trang-den.png`,
        "Đỏ Đen": `${dst}/side-ultimate-do-den.png`,
        "Xanh Đen": `${dst}/side-ultimate-xanh-den.png`,
        Đen: `${dst}/side-ultimate-den.png`,
      },
      Premium: {
        Trắng: `${dst}/side-premium-trang.png`,
        Xám: `${dst}/side-premium-xam.png`,
        Đen: `${dst}/side-premium-den.png`,
        Đỏ: `${dst}/side-premium-do.png`,
      },
    },
    accessoriesImage: `${dst}/feature-accessories.jpg`,
    highlight: {
      kicker: "Đặc điểm nổi bật",
      title: "Khởi sự vạn điểm đến",
      text: "SUV 7 chỗ đa năng cho gia đình: động cơ xăng Turbo 1.5L 163 PS, khoảng sáng gầm 214 mm, hộp số CVT.",
      image: `${dst}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Ý tưởng thiết kế", title: "Uy lực & năng động", image: `${dst}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Không gian nội thất", title: "7 chỗ tiện nghi", image: `${dst}/feature-interior.jpg`, from: "interior" },
      {
        kicker: "Động cơ mạnh mẽ",
        title: "Xăng Turbo 1.5L MIVEC",
        text: "Công suất 163 PS, mô-men xoắn 250 Nm từ 2.000 vòng/phút; hệ thống kim phun xăng kép và làm mát khí nạp bằng dung dịch.",
        image: `${dst}/feature-engine.jpg`,
      },
      {
        kicker: "Vận hành linh hoạt",
        title: "5 chế độ lái tùy chọn",
        text: "Đường nhựa, Tiêu chuẩn, Đường ướt, Đường sỏi và Đường bùn lầy, kết hợp hệ thống kiểm soát vào cua chủ động AYC.",
        image: `${dst}/feature-drive-modes.jpg`,
      },
      { kicker: "An toàn", title: "Diamond Sense", text: "Hệ thống an toàn chủ động thông minh trên bản Ultimate.", image: `${dst}/feature-safety.jpg`, from: "safetyTechnologies" },
      {
        kicker: "Tiện nghi vượt trội",
        title: "Âm thanh Dynamic Sound Yamaha Premium",
        text: "8 loa với 4 chế độ tùy chỉnh: Lively, Signature, Powerful và Relaxing (bản Ultimate).",
        image: `${dst}/feature-audio.jpg`,
        from: "convenience",
      },
      {
        kicker: "Kết nối thông minh",
        title: "Mitsubishi Connect",
        text: "Điều khiển điều hòa từ xa, tìm xe và hỗ trợ khẩn cấp qua ứng dụng My Mitsubishi Connect (bản Ultimate).",
        image: `${dst}/feature-connect.jpg`,
      },
    ],
  },
  xforce: {
    hoverBg: `${xf}/hover-bg.jpg`,
    listImage: `${xf}/list.png`,
    slogan: "Vươn tầm vượt chuẩn",
    logo: { src: `${xf}/logo.png`, width: 1200, height: 187 },
    poster: `${xf}/hero-poster.jpg`,
    mobilePoster: `${xf}/hero-mobile.jpg`,
    specs: [
      { icon: `${xf}/icon-1.png`, label: "Ghế lái chỉnh điện" },
      { icon: `${xf}/icon-2.png`, label: "4 chế độ lái" },
      { icon: `${xf}/icon-3.png`, label: "Dynamic Sound Yamaha Premium" },
      { icon: `${xf}/icon-4.png`, label: "Camera 360 mới" },
    ],
    sideImages: {
      Ultimate: { "Trắng Đen": `${xf}/side-ultimate-trang-den.png`, "Đỏ Đen": `${xf}/side-ultimate-do-den.png`, Đen: `${xf}/side-ultimate-den.png` },
      Luxury: { Trắng: `${xf}/side-luxury-trang.png`, Đen: `${xf}/side-luxury-den.png`, Đỏ: `${xf}/side-luxury-do.png`, Xám: `${xf}/side-luxury-xam.png` },
      GLX: { Trắng: `${xf}/side-glx-trang.png`, Đen: `${xf}/side-glx-den.png`, Đỏ: `${xf}/side-glx-do.png` },
    },
    accessoriesImage: `${xf}/feature-accessories.jpg`,
    highlight: {
      kicker: "Đặc điểm nổi bật",
      title: "An toàn 5 sao từ ASEAN NCAP",
      text: "SUV 5 chỗ khoảng sáng gầm 219–222 mm, động cơ 1.5L MIVEC và hộp số CVT; hệ thống an toàn chủ động Diamond Sense trên bản Ultimate.",
      image: `${xf}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Ý tưởng thiết kế", title: "Mượt mà và rắn rỏi", image: `${xf}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Không gian nội thất", title: "Tinh tế và hiện đại", image: `${xf}/feature-interior.jpg`, from: "interior" },
      {
        kicker: "Vận hành linh hoạt",
        title: "4 chế độ lái",
        text: "Đường tiêu chuẩn, Đường sỏi, Đường bùn lầy và Đường ướt, kết hợp hệ thống kiểm soát vào cua chủ động AYC.",
        image: `${xf}/feature-drive-modes.jpg`,
        from: "drivingSupport",
      },
      { kicker: "An toàn vượt trội", title: "Diamond Sense", text: "Hệ thống an toàn chủ động thông minh trên bản Ultimate.", image: `${xf}/feature-safety.jpg`, from: "safetyTechnologies" },
    ],
  },
  xpander: {
    hoverBg: `${xp}/hover-bg.jpg`,
    listImage: `${xp}/list.png`,
    slogan: "Vượt mong đợi – Vững hành trình",
    logo: { src: `${xp}/logo.png`, width: 1200, height: 201 },
    video: `${xp}/hero.mp4`,
    poster: `${xp}/hero-poster.jpg`,
    mobilePoster: `${xp}/hero-mobile.jpg`,
    specs: [
      { icon: `${xp}/icon-1.png`, label: "6 túi khí" },
      { icon: `${xp}/icon-2.png`, label: "Màn hình cảm ứng 10 inch" },
      { icon: `${xp}/icon-3.png`, label: "Đồng hồ kỹ thuật số 8 inch" },
      { icon: `${xp}/icon-4.png`, label: "Kiểm soát vào cua chủ động AYC" },
      { icon: `${xp}/icon-5.png`, label: "Euro 5, tương thích E10" },
    ],
    sideImages: {
      "AT Premium": { Trắng: `${xp}/side-at-premium-trang.png`, Đen: `${xp}/side-at-premium-den.png`, Bạc: `${xp}/side-at-premium-bac.png`, Đỏ: `${xp}/side-at-premium-do.png` },
      AT: { Trắng: `${xp}/side-at-trang.png`, Đen: `${xp}/side-at-den.png`, Xám: `${xp}/side-at-xam.png`, Nâu: `${xp}/side-at-nau.png` },
      MT: { Trắng: `${xp}/side-mt-trang.png` },
    },
    accessoriesImage: `${xp}/feature-accessories.jpg`,
    highlight: {
      kicker: "Đặc điểm nổi bật",
      title: "MPV 7 chỗ cho gia đình",
      text: "Động cơ 1.5L MIVEC đạt chuẩn khí thải Euro 5 và tương thích nhiên liệu E10, khoảng sáng gầm 225 mm.",
      image: `${xp}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Thiết kế ngoại thất", title: "Năng động và tinh tế", image: `${xp}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Không gian nội thất", title: "Rộng rãi & sang trọng", image: `${xp}/feature-interior.jpg`, from: "interior" },
      { kicker: "Tiện nghi", title: "Màn hình 10 inch & đồng hồ 8 inch", text: "Trang bị trên bản AT Premium; bản MT và AT dùng màn hình cảm ứng 7 inch.", image: `${xp}/feature-screen.jpg`, from: "convenience" },
      { kicker: "An toàn", title: "6 túi khí xung quanh xe", text: "Trang bị trên bản AT Premium; bản MT và AT có 2 túi khí phía trước.", image: `${xp}/feature-safety.jpg`, from: "safetyTechnologies" },
      {
        kicker: "An tâm vận hành",
        title: "Kiểm soát vào cua chủ động AYC",
        text: "Giữ thân xe ổn định hơn khi vào cua, đánh lái gấp hoặc đi trên đường trơn trượt. Trang bị trên bản AT Premium.",
        image: `${xp}/feature-ayc.jpg`,
      },
    ],
  },
  "xpander-cross": {
    hoverBg: `${xc}/hover-bg.jpg`,
    listImage: `${xc}/list.png`,
    slogan: "Vượt mong đợi – Vững hành trình",
    logo: { src: `${xc}/logo.png`, width: 1200, height: 347 },
    video: `${xc}/hero.mp4`,
    poster: `${xc}/hero-poster.jpg`,
    mobilePoster: `${xc}/hero-mobile.jpg`,
    specs: [
      { icon: `${xc}/icon-1.png`, label: "6 túi khí an toàn" },
      { icon: `${xc}/icon-2.png`, label: "Vô lăng 3 chấu thiết kế mới" },
      { icon: `${xc}/icon-3.png`, label: "Màn hình cảm ứng 10 inch" },
      { icon: `${xc}/icon-4.png`, label: "Euro 5, tương thích E10" },
    ],
    sideImages: {
      "Xpander Cross": { Trắng: `${xc}/side-xpander-cross-trang.png`, Đen: `${xc}/side-xpander-cross-den.png`, Nâu: `${xc}/side-xpander-cross-nau.png` },
    },
    accessoriesImage: `${xc}/feature-accessories.jpg`,
    highlight: {
      kicker: "Đặc điểm nổi bật",
      title: "Vượt mong đợi, vững hành trình",
      text: "MPV 7 chỗ phong cách SUV: khoảng sáng gầm 225 mm, động cơ 1.5L MIVEC, 6 túi khí.",
      image: `${xc}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Thiết kế ngoại thất", title: "Phong cách SUV", image: `${xc}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Thiết kế nội thất", title: "Đẳng cấp & tinh tế", image: `${xc}/feature-interior.jpg`, from: "interior" },
      { kicker: "Trang bị tiện nghi", title: "Màn hình cảm ứng 10 inch", image: `${xc}/feature-screen.jpg`, from: "convenience" },
      { kicker: "An toàn thiết thực", title: "6 túi khí xung quanh xe", image: `${xc}/feature-safety.jpg`, from: "safetyTechnologies" },
      { kicker: "Vận hành", title: "Vận hành êm ái", text: "Hệ thống treo nâng cấp, khoảng sáng gầm 225 mm.", image: `${xc}/feature-performance.jpg`, from: "drivingSupport" },
    ],
  },
  triton: {
    hoverBg: `${tr}/hover-bg.jpg`,
    listImage: `${tr}/list.png`,
    slogan: "Chiếm lĩnh mọi lãnh địa",
    logo: { src: `${tr}/logo.png`, width: 1200, height: 115 },
    video: `${tr}/hero.mp4`,
    poster: `${tr}/hero-poster.jpg`,
    mobilePoster: `${tr}/hero-mobile.jpg`,
    specs: [
      { icon: `${tr}/icon-1.png`, label: "Thiết kế hoàn toàn mới" },
      { icon: `${tr}/icon-2.png`, label: "Tay lái trợ lực điện" },
      { icon: `${tr}/icon-3.png`, label: "Super Select 4WD-II" },
      { icon: `${tr}/icon-4.png`, label: "An toàn thông minh" },
    ],
    sideImages: {
      "4WD AT Athlete": { Cam: `${tr}/side-4wd-at-athlete-cam.png`, Trắng: `${tr}/side-4wd-at-athlete-trang.png`, Đen: `${tr}/side-4wd-at-athlete-den.png` },
      "4WD AT Premium": { Trắng: `${tr}/side-4wd-at-premium-trang.png`, Đen: `${tr}/side-4wd-at-premium-den.png`, Cam: `${tr}/side-4wd-at-premium-cam.png` },
      "2WD AT Premium": { Trắng: `${tr}/side-2wd-at-premium-trang.png`, Đen: `${tr}/side-2wd-at-premium-den.png`, Cam: `${tr}/side-2wd-at-premium-cam.png` },
      "2WD AT GLX": { Trắng: `${tr}/side-2wd-at-glx-trang.png`, Đen: `${tr}/side-2wd-at-glx-den.png`, Xám: `${tr}/side-2wd-at-glx-xam.png`, Cam: `${tr}/side-2wd-at-glx-cam.png` },
    },
    accessoriesImage: `${tr}/feature-accessories.jpg`,
    highlight: {
      kicker: "Nhà vô địch AXCR 2025–2026",
      title: "Chinh phục ngôi vương",
      text: "Triton bảo vệ thành công ngôi vô địch giải đua Asia Cross Country Rally (AXCR) hai năm liên tiếp 2025 và 2026.",
      image: `${tr}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Diện mạo hoàn toàn mới", title: "Thiết kế Beast Mode", image: `${tr}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Nội thất phong cách SUV", title: "Sang trọng và rộng rãi", image: `${tr}/feature-interior.jpg`, from: "interior" },
      {
        kicker: "Động cơ mạnh mẽ",
        title: "Diesel MIVEC Bi-Turbo 2.4L",
        text: "Bản 4WD AT Athlete: tăng áp kép, 204 PS và 470 Nm. Các bản còn lại: Turbo 2.4L, 184 PS và 430 Nm. Hộp số tự động 6 cấp.",
        image: `${tr}/feature-engine.jpg`,
      },
      { kicker: "Linh hoạt mọi địa hình", title: "7 chế độ lái", image: `${tr}/feature-drive-modes.jpg`, from: "drivingSupport" },
      {
        kicker: "Tiện ích nổi bật",
        title: "Thùng hàng đa năng",
        text: "Chiều cao sàn thùng 821 mm giúp chất hàng dễ dàng, tải trọng tối đa đến 740 kg (theo công bố của Mitsubishi Motors Việt Nam).",
        image: `${tr}/feature-tray.jpg`,
      },
      { kicker: "An toàn", title: "5 sao ASEAN NCAP", text: "7 túi khí trên các bản Premium và Athlete; hệ thống an toàn chủ động MMSS trên bản Athlete.", image: `${tr}/feature-safety.jpg`, from: "safetyTechnologies" },
    ],
  },
  attrage: {
    hoverBg: `${at}/hover-bg.jpg`,
    listImage: `${at}/list.png`,
    slogan: "Khởi đầu vững chắc",
    logo: { src: `${at}/logo.png`, width: 1200, height: 189 },
    poster: `${at}/hero-poster.jpg`,
    mobilePoster: `${at}/hero-mobile.jpg`,
    specs: [
      { icon: `${at}/icon-1.png`, label: "Cân bằng điện tử ASC" },
      { icon: `${at}/icon-2.png`, label: "Đèn chiếu sáng tự động" },
      { icon: `${at}/icon-3.png`, label: "Bán kính quay vòng 4,8 m" },
    ],
    sideImages: {
      "CVT Premium": { Trắng: `${at}/side-cvt-premium-trang.png`, Xám: `${at}/side-cvt-premium-xam.png`, Đỏ: `${at}/side-cvt-premium-do.png` },
      MT: { Trắng: `${at}/side-mt-trang.png`, Xám: `${at}/side-mt-xam.png` },
    },
    highlight: {
      kicker: "Đặc điểm nổi bật",
      title: "Tiện nghi & tiết kiệm",
      text: "Sedan 5 chỗ nhập khẩu nguyên chiếc từ Thái Lan, thiết kế Dynamic Shield, động cơ 1.2L MIVEC tiết kiệm nhiên liệu.",
      image: `${at}/feature-highlight.jpg`,
    },
    features: [
      { kicker: "Thiết kế ngoại thất", title: "Nổi bật trong đô thị", image: `${at}/feature-exterior.jpg`, from: "exterior" },
      { kicker: "Thiết kế nội thất", title: "Rộng rãi cho cả gia đình", image: `${at}/feature-interior.jpg`, from: "interior" },
      {
        kicker: "Khả năng vận hành",
        title: "Hiệu quả & tiết kiệm",
        text: "Động cơ MIVEC 1.2L, hộp số vô cấp INVECS-III trên bản CVT Premium; tiêu hao nhiên liệu kết hợp 5,30–5,59 L/100 km.",
        image: `${at}/feature-performance.jpg`,
      },
      { kicker: "An toàn", title: "Bảo vệ chuẩn mực", text: "Khung xe RISE, phanh ABS và EBD; cân bằng điện tử ASC và hỗ trợ khởi hành ngang dốc HSA trên bản CVT Premium.", image: `${at}/feature-safety.jpg`, from: "safetyTechnologies" },
    ],
  },
};
