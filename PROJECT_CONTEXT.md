# Tổng quan dự án: mitsubishi-phuc-sales

> File này giúp Claude (và người phát triển) nắm nhanh dự án ở đầu mỗi phiên làm việc.
> Được nạp tự động qua `CLAUDE.md`. Hãy cập nhật khi cấu trúc dự án thay đổi.

## 1. Mục đích

Website bán hàng cá nhân của **Lưu Hoàng Phúc**, tư vấn kinh doanh tại đại lý **Mitsubishi Moveo New City**
(Bình Dương cũ, nay thuộc TP. Hồ Chí Minh). Domain: **https://www.mitsubishiauto.vn**.

Mục tiêu chính: thu khách hàng tiềm năng (lead) qua báo giá, đăng ký lái thử, gọi điện hoặc Zalo, và làm SEO local
("Mitsubishi Bình Dương"). Toàn bộ nội dung viết bằng **tiếng Việt có dấu**.

## 2. Công nghệ

- **Next.js 16.3.6** (App Router), **React 19.2**, **TypeScript**, **Tailwind CSS v4** (qua `@tailwindcss/postcss`, không có `tailwind.config`).
- ⚠️ Next.js 16 có thay đổi phá vỡ tương thích (breaking change). Đọc `node_modules/next/dist/docs/` trước khi dùng API mới (xem `AGENTS.md`).
  Ví dụ: `params` trong page là `Promise`, cần `await params`; layout dùng kiểu global `LayoutProps<"/">`.
- `cheerio`: chỉ dùng trong script `add-news.mjs` để lấy bài viết từ web.
- Font: chỉ dùng `Roboto` (`next/font/google`, có subset tiếng Việt).
- Không có database và không có backend riêng. **Toàn bộ dữ liệu nằm trong các file TS** ở `src/data/`.
- Form gửi dữ liệu tới **Google Apps Script** bên ngoài:
  - `QuoteForm.tsx` → `process.env.NEXT_PUBLIC_QUOTE_API_URL` (đặt trong `.env.local`, file này bị gitignore).
    Trang chủ render `<Suspense fallback={<QuoteForm />}><QuoteFormFromUrl /></Suspense>`. `QuoteFormFromUrl` đọc
    `?car=&variant=&form=&nguon=` bằng `useSearchParams` và tạo lại form khi URL đổi (`key`). Link `/?car=...#bao-gia` vì vậy dùng được `<Link>`.
  - `dang-ky-lai-thu/page.tsx` → hằng số `SCRIPT_URL` được hardcode trong file.
  - Request gửi `Content-Type: text/plain` (để tránh CORS preflight) và nhận về JSON `{ success, message }`.
- Không có test. Lệnh kiểm tra: `npm run lint`, `npm run build`.
- Remote: `github.com/phucbomitsubishi-coder/mitsubishi-phuc-sales`, nhánh `main`. Có lẽ deploy trên Vercel.

## 3. Lệnh

```bash
npm run dev            # chạy dev server
npm run build          # build production (dùng để kiểm tra lỗi type)
npm run lint
npm run add-used-car   # CLI thêm xe cũ vào src/data/usedCars.ts
npm run sold-used-car  # CLI chuyển xe cũ sang trạng thái "sold"
npm run add-news       # CLI lấy bài viết từ URL → src/data/news.ts (+ promotions.ts)
```

## 4. Cấu trúc thư mục

```
src/
  config/site.ts          # siteConfig: tên, SĐT, email, Zalo, TikTok, địa chỉ đại lý, SEO mặc định
  data/
    cars.ts               # Xe mới (~1900 dòng): Car, CarVariant, cars[], featuredCars, getCarBySlug()
    usedCars.ts           # Xe cũ: UsedCar, usedCars[]
    news.ts               # Tin tức: NewsArticle, newsArticles[], getNewsArticleBySlug()
    promotions.ts         # Khuyến mãi tháng: currentPromotion, getMaxPromotionValue(carId)
  components/             # SiteHeader, SiteFooter, MobileMenu, MobileContactBar, HeroSlider,
                          # QuoteForm, OnRoadPriceCalculator/Page, InstallmentCalculator,
                          # UsedCarGallery, NewsPromotionCover, Moveo* (trang giới thiệu đại lý)
  app/
    layout.tsx            # metadata toàn site, OG, xác minh Google, JSON-LD AutoDealer, SiteFooter
    page.tsx              # Trang chủ
    xe/[slug]/            # Trang xe mới (+ CarGallery, VariantSelector là client component)
    xe-cu/ , xe-cu/[slug] # Danh sách và chi tiết xe cũ
    tin-tuc/ , tin-tuc/[slug]
    du-toan/gia-lan-banh, du-toan/tra-gop     # Công cụ tính giá lăn bánh và trả góp
    tu-van/ (+3 bài tư vấn tĩnh)
    ho-tro/ (+5 trang: bảo hành, bảo dưỡng, phụ tùng, hướng dẫn sử dụng, FAQ)
    gioi-thieu/, lien-he/, dang-ky-lai-thu/
    sitemap.ts, robots.ts # Sitemap được sinh từ cars/usedCars/news và danh sách trang tĩnh
scripts/                  # Script Node ESM tương tác bằng readline, sửa trực tiếp file trong src/data
public/images/
  cars/<id>/ , cars/<id>.png   # Ảnh xe mới
  used-cars/<slug>/01.jpg..NN.jpg
  news/<slug>.jpg (+ thư mục <slug>/ chứa ảnh trong bài)
  hero/, logo/, og/og-default.jpg
```

Alias import: `@/` → `src/`.

## 5. Mô hình dữ liệu (tóm tắt)

- **Car**: `id` (ví dụ `xforce`), `slug` (`mitsubishi-xforce`), `category` (SUV, MPV, Sedan, Pickup),
  `status` (`available` hoặc `coming-soon`), `featured`, `image`, `promotion`, `variants[]`
  (có `price`, `promotionalPrice?`, `specifications`, `equipment`, `safetyTechnologies`, `colors`),
  `specifications`, `highlights`, ...
  - Các xe hiện có: `xforce`, `xpander`, `attrage`, `triton`, `destinator`, `xpander-cross`.
- **UsedCar**: `id`, `slug`, `modelYear`, `mileage` (km), `price` (đồng), `status` (`available` hoặc `sold`),
  `image`, `images[]`, `equipment[]`, `commitments[]`, ...
- **NewsArticle**: `slug`, `category` (union `NewsCategory`), `publishedAt` (`YYYY-MM-DD`), `image`,
  `content[]` gồm các khối `{ heading?, paragraphs[], images? }`, `source?`.
- **PromotionProgram** (`currentPromotion`): `month`, `year`, `cars[]` gồm `carId` → `variants[]` → `benefits[]`
  (`value` tính bằng đồng, `calculable` cho biết khoản ưu đãi có được trừ vào giá trong công cụ tính hay không).
  `carId` phải khớp với `Car.id`.
- Tiền luôn lưu dưới dạng **số nguyên đồng** (ví dụ `569_000_000`) và hiển thị bằng `toLocaleString("vi-VN")`.

## 6. Logic nghiệp vụ quan trọng

- **Giá lăn bánh** (`OnRoadPriceCalculator.tsx`):
  - Lệ phí trước bạ: xe thường 10% (Hà Nội 12%); **Triton** (bán tải) 6% (Hà Nội 7%).
  - Biển số: TP lớn 14 triệu (Triton 350 nghìn); tỉnh 140 nghìn (Triton 100 nghìn).
  - Có phí đăng kiểm, phí dịch vụ đăng ký và trừ khuyến mãi từ `promotions.ts`.
  - Triton được nhận diện bằng `carName === "Mitsubishi Triton"`, nên đổi tên xe sẽ làm sai logic này.
- **Trả góp** (`InstallmentCalculator.tsx`): chọn trả trước 15–70%, nhập lãi suất năm đầu.
- Trang chủ, trang xe và trang giá lăn bánh đọc `currentPromotion`. Khi sang tháng mới, cần cập nhật `promotions.ts`
  (thường làm qua `npm run add-news` với bài khuyến mãi của MMV).

## 7. Scripts nội dung (cách người dùng cập nhật website)

- `add-used-car.mjs`: hỏi thông tin xe, kiểm tra ảnh trong `public/images/used-cars/<slug>/`
  (**chỉ nhận JPG**; nếu có PNG hoặc WebP sẽ dừng), đổi tên ảnh thành `01.jpg..NN.jpg`, rồi chèn object vào `usedCars.ts`.
- `sold-used-car.mjs`: tìm xe `available` bằng regex và đổi thành `sold`.
- `add-news.mjs` (~1700 dòng): nhận URL bài viết, dùng cheerio lấy tiêu đề, đoạn văn và ảnh (tối đa 10 ảnh),
  tải ảnh về `public/images/news/`, rồi chèn bài vào `news.ts`. Nếu là bài khuyến mãi, script phân tích bảng ưu đãi
  và **ghi đè `promotions.ts`**.
- Các script sửa file TS bằng **regex hoặc chèn chuỗi**, vì vậy cần giữ định dạng hiện tại của mảng dữ liệu
  (ví dụ `export const usedCars: UsedCar[] = [`) để script không bị hỏng.
- Không giữ bản sao script trong repo vì Git đã lưu lịch sử. File `scripts/*.backup.mjs` đã được thêm vào gitignore.

## 8. Quy ước và lưu ý

- Commit message ngắn, viết **tiếng Việt không dấu** (ví dụ: `Toi uu tai anh xe cu`).
- Ưu tiên mobile: nhiều commit tối ưu cho màn hình nhỏ, tablet và 1024px. `MobileContactBar` cố định ở dưới cùng
  (CSS trong `globals.css` thêm padding cho footer).
- Ảnh: phần lớn dùng `<img>` thường (trang chủ, header, gallery, xe cũ) kèm `loading` hoặc `fetchPriority`;
  `next/image` chỉ dùng ở tin tức, HeroSlider, VariantSelector và NewsPromotionCover. `public/` nặng khoảng 52 MB.
- Link nội bộ luôn dùng `<Link>` từ `next/link`, không dùng `<a>` (lint báo lỗi). Link trong `MobileMenu` phải có `onClick={() => setIsOpen(false)}`.
- Link tới trang xe phải dùng **slug** (`/xe/mitsubishi-xforce`), không dùng id. `next.config.ts` có redirect 308 từ `/xe/<id>` cũ.
- Các trang `/xe/[slug]`, `/xe-cu/[slug]`, `/tin-tuc/[slug]` đều có `generateStaticParams` (tạo sẵn HTML khi build).
- SEO: mỗi trang động có `generateMetadata`; `layout.tsx` chứa JSON-LD `AutoDealer`; sitemap được sinh tự động.
  Khi thêm trang tĩnh mới, **nhớ thêm vào `src/app/sitemap.ts`**.
- Thông tin liên hệ lấy từ `siteConfig` (kể cả metadata và JSON-LD trong `layout.tsx`; riêng địa chỉ tách theo từng phần trong JSON-LD vẫn ghi cứng).
- Không có dark mode. Website luôn dùng nền trắng.
- Ảnh xe dùng cho thẻ `<img>` (ví dụ `public/images/cars/<id>.png`) nên rộng khoảng 1200px và dưới 300 KB. Có thể nén bằng `sharp` (có sẵn trong node_modules).
- Code chưa được format đồng nhất (thụt lề lẫn lộn). Khi sửa code, giữ nguyên phong cách của vùng xung quanh.

## 9. Điểm cần chú ý hoặc rủi ro đã biết

- Danh sách `categories` trong `add-news.mjs` phải khớp chính xác với union `NewsCategory` trong `news.ts`.
  Khi thêm hoặc đổi danh mục, sửa cả hai nơi, nếu không build sẽ lỗi.
- `siteConfig.social.facebook` vẫn là `https://www.facebook.com/` (chưa có link thật).
- `README.md` vẫn là nội dung mặc định của create-next-app.
