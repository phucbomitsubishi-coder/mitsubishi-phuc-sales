// Nén lại ảnh trong public/images (21/10/2026), giữ nguyên tên và định dạng nên không phải sửa code.
// Cần vì web tắt tối ưu ảnh của Vercel (next.config.ts: images.unoptimized), trình duyệt tải thẳng file gốc.
// - PNG > 30 KB → PNG bảng màu (palette) chất lượng 85 (ảnh xe nền trong suốt giảm ~70%, nhìn không khác)
// - JPG > 150 KB → mozjpeg chất lượng 80, rộng tối đa 1920px
// Chỉ ghi đè khi nhỏ hơn ít nhất 20%; PNG đã là bảng màu thì bỏ qua (không nén chồng).
// Dùng: npm run compress-images (sau khi thêm ảnh mới, trước khi build/push)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false); // không giữ file mở (Windows khóa file khi ghi đè)

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
  );

let before = 0;
let after = 0;
let changed = 0;
for (const file of walk("public/images")) {
  const ext = path.extname(file).toLowerCase();
  const size = fs.statSync(file).size;
  const input = fs.readFileSync(file);
  let output;
  if (ext === ".png" && size > 30 * 1024) {
    // PNG đã là bảng màu (đã nén lần trước) thì bỏ qua, tránh nén chồng làm ảnh xấu dần
    const meta = await sharp(input).metadata();
    if (meta.isPalette || meta.paletteBitDepth) continue;
    output = await sharp(input).png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 }).toBuffer();
  } else if ((ext === ".jpg" || ext === ".jpeg") && size > 150 * 1024) {
    output = await sharp(input).resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  } else {
    continue;
  }
  if (output.length <= size * 0.8) {
    before += size;
    after += output.length;
    changed++;
    fs.writeFileSync(file, output);
    console.log(`${Math.round(size / 1024)} → ${Math.round(output.length / 1024)} KB  ${file}`);
  }
}
console.log(changed ? `Đã nén ${changed} ảnh: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB` : "Không có ảnh nào cần nén thêm.");
