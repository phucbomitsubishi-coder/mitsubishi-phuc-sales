# Mitsubishi Lưu Hoàng Phúc

Website tư vấn bán xe Mitsubishi của Lưu Hoàng Phúc, Mitsubishi Moveo New City.

- Website: https://www.mitsubishiauto.vn
- Công nghệ: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Hosting: Vercel. Mỗi lần push lên nhánh `main`, Vercel sẽ tự động deploy.

Tài liệu chi tiết về cấu trúc dự án, dữ liệu và quy ước: xem [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md).

## Chạy trên máy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # kiểm tra trước khi push
npm run lint
```

Form báo giá cần biến môi trường `NEXT_PUBLIC_QUOTE_API_URL` trong file `.env.local`.

## Cập nhật nội dung

```bash
npm run add-used-car   # thêm xe đã qua sử dụng
npm run sold-used-car  # chuyển xe sang trạng thái đã bán
npm run add-news       # thêm bài viết từ URL (bài khuyến mãi sẽ cập nhật cả promotions.ts)
```

Dữ liệu xe, tin tức và khuyến mãi nằm trong `src/data/`. Thông tin liên hệ nằm trong `src/config/site.ts`.
