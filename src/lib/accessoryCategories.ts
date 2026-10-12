import type { AccessoryGroup, AccessoryItem } from "@/data/accessories";

// Chia mỗi nhóm phụ kiện thành các loại nhỏ (camera hành trình, màn hình, lót sàn...) để trang gọn hơn.
// Phân loại theo tên trong app báo giá; món không khớp quy tắc nào vào "Phụ kiện khác".
// Thứ tự quy tắc quan trọng: quy tắc đứng trước được ưu tiên.

type Rule = { name: string; test: RegExp };

const carRules: Rule[] = [
  { name: "Phụ kiện chính hãng MMV", test: / – MMV$/ },
  { name: "Lót sàn, thảm", test: /Lót sàn|Lót 6D|Thảm/ },
  { name: "Vè che mưa", test: /Vè che mưa/ },
  { name: "Bệ bước chân, nẹp bước", test: /Bệ bước|bước chân|Nẹp bước|Nẹp chân (ngoài|trong)/ },
  {
    name: "Thanh thể thao, nắp thùng, giá nóc",
    test: /Thanh thể thao|Khung|stylingbar|Nắp thùng|Nắp cuộn|Nắp 3 tấm|Giá nóc|Baga|Ty hỗ trợ/,
  },
  {
    name: "Bodykit, ốp thân xe",
    test: /Bodykit|bodykit|Bộ ốp độ|Ốp cản|Ốp hông|Nẹp ốp hông|Ốp nắp capo|Ốp bửng|Ốp đuôi gió|Ốp cua lốp|Ốp viền thùng|Chắn gầm/,
  },
  {
    name: "Ốp, nẹp, logo trang trí",
    test: /^Ốp|^Nẹp|Chén|Tay nắm|Nắp bình|Chống trầy|Tem chữ|Bộ chữ|Mặt ga lăng|Chắn bùn/,
  },
  { name: "Cốp điện, camera, tiện ích điện", test: /Cốp điện|Camera|Đề nổ|Gập gương|gập gương|Đèn LED/ },
];

const generalRules: Rule[] = [
  { name: "Phủ gầm", test: /^Phủ gầm/ },
  { name: "Phủ nano, ceramic", test: /^Phủ nano|^Phủ ceramic/ },
  { name: "Bọc trần", test: /^Bọc trần/ },
  { name: "Bọc ghế da", test: /^Bọc ghế/ },
  { name: "Dán cách âm", test: /^Dán cách âm/ },
  {
    name: "Camera hành trình, giám sát hành trình",
    test: /^Cam hành trình|^Camera hành trình|Giám sát hành trình|Camera Elliview/,
  },
  { name: "Camera 360", test: /^Camera 360/ },
  { name: "Camera lùi, cảm biến đỗ xe", test: /^Camera lùi|Camera cập lề|^Cảm biến lùi|Cảm biến đỗ xe/ },
  { name: "Màn hình, Android box", test: /^Màn hình|^Android box|^SID|Đầu MP5/ },
  { name: "Cảm biến áp suất lốp, bơm lốp", test: /áp suất lốp|bơm lốp/ },
  { name: "Cảnh báo va chạm, điểm mù", test: /^Cảnh báo/ },
  { name: "Đèn, còi", test: /^Đèn|^Bóng đèn|^Còi/ },
  { name: "Nước hoa, lọc không khí, hút bụi", test: /Nước hoa|lọc không khí|hút bụi/ },
  { name: "Sạc, giá đỡ điện thoại", test: /[Ss]ạc|Giá đỡ điện thoại/ },
  { name: "Che nắng, áo trùm xe", test: /che nắng|chắn nắng|Áo trùm/ },
];

const OTHER = "Phụ kiện khác";

export type AccessoryCategory = { name: string; items: AccessoryItem[] };

export function categorizeGroup(group: AccessoryGroup): AccessoryCategory[] {
  // Phim cách nhiệt: gom theo dòng phim (phần tên trước dấu " – ")
  const keyOf =
    group.name === "Phim cách nhiệt"
      ? (item: AccessoryItem) => item.name.split(" – ")[0].replace(/^Dán phim PPF.*/, "Phim PPF bảo vệ sơn")
      : (item: AccessoryItem) =>
          (group.carId ? carRules : generalRules).find((rule) => rule.test.test(item.name))?.name ?? OTHER;

  const map = new Map<string, AccessoryItem[]>();
  for (const item of group.items) {
    const key = keyOf(item);
    map.set(key, [...(map.get(key) ?? []), item]);
  }

  // Loại chỉ có 1 món gộp vào "Phụ kiện khác" cho gọn (trừ nhóm chính hãng MMV và các dòng phim)
  const isFilm = group.name === "Phim cách nhiệt";
  const categories: AccessoryCategory[] = [];
  const others: AccessoryItem[] = [];
  for (const [name, items] of map) {
    if (name === OTHER || (!isFilm && items.length === 1 && !name.includes("MMV"))) others.push(...items);
    else categories.push({ name, items });
  }
  // Xếp theo thứ tự quy tắc (chính hãng MMV đứng đầu); phim giữ thứ tự trong app
  if (!isFilm) {
    const order = (group.carId ? carRules : generalRules).map((rule) => rule.name);
    categories.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }
  if (others.length > 0) categories.push({ name: OTHER, items: others });
  return categories;
}
