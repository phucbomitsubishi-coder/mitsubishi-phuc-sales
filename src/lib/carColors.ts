// Chọn màu xe hiển thị mặc định: ưu tiên màu nổi bật, hạn chế trắng (anh Phúc yêu cầu 20/10/2026).
const PRIORITY = ["Đỏ", "Cam", "Xanh Đen", "Đỏ Đen", "Nâu", "Xám", "Bạc", "Đen"];

// Màu mặc định cho từng phiên bản của một xe: mỗi bản lấy màu nổi bật nhất mà các bản trước chưa dùng
// (Xforce: GLX đỏ, Luxury xám, Ultimate đỏ đen). Bản chỉ có màu trắng thì giữ trắng.
export function featuredColors(variants: { colors?: string[] }[]): string[] {
  const used: string[] = [];
  return variants.map((variant) => {
    const colors = variant.colors ?? [];
    const colored = PRIORITY.filter((color) => colors.includes(color));
    const color = colored.find((item) => !used.includes(item)) ?? colored[0] ?? colors[0] ?? "";
    used.push(color);
    return color;
  });
}
