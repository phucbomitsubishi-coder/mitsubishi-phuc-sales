// Màu xe hiển thị mặc định cho từng phiên bản trên trang xe (anh Phúc chọn 21/10/2026).
// Khóa: "<tên xe>|<tên phiên bản>", giá trị phải khớp tên màu trong `colors` của cars.ts.
const chosen: Record<string, string> = {
  "Mitsubishi Attrage|MT": "Trắng",
  "Mitsubishi Attrage|CVT Premium": "Đỏ",
  "Mitsubishi Xpander|MT": "Trắng",
  "Mitsubishi Xpander|AT": "Xám",
  "Mitsubishi Xpander|AT Premium": "Trắng",
  "Mitsubishi Xpander Cross|Xpander Cross": "Trắng",
  "Mitsubishi Xforce|GLX": "Đỏ",
  "Mitsubishi Xforce|Luxury": "Trắng",
  "Mitsubishi Xforce|Ultimate": "Trắng Đen",
  "Mitsubishi Triton|2WD AT GLX": "Xám",
  "Mitsubishi Triton|2WD AT Premium": "Cam",
  "Mitsubishi Triton|4WD AT Premium": "Trắng",
  "Mitsubishi Triton|4WD AT Athlete": "Trắng",
  "Mitsubishi Destinator|Premium": "Trắng",
  "Mitsubishi Destinator|Ultimate": "Xanh Đen",
};

// Xe/phiên bản chưa có trong danh sách: lấy màu nổi bật nhất mà bản trước chưa dùng
const PRIORITY = ["Đỏ", "Cam", "Xanh Đen", "Đỏ Đen", "Nâu", "Xám", "Bạc", "Đen"];

export function featuredColors(variants: { name: string; colors?: string[] }[], carName: string): string[] {
  const used: string[] = [];
  return variants.map((variant) => {
    const colors = variant.colors ?? [];
    const pick = chosen[`${carName}|${variant.name}`];
    if (pick && colors.includes(pick)) {
      used.push(pick);
      return pick;
    }
    const colored = PRIORITY.filter((color) => colors.includes(color));
    const color = colored.find((item) => !used.includes(item)) ?? colored[0] ?? colors[0] ?? "";
    used.push(color);
    return color;
  });
}
