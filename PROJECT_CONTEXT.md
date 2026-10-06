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
  config/site.ts          # siteConfig: tên, SĐT, email, Zalo, Facebook, TikTok, địa chỉ đại lý, SEO mặc định
  lib/metadata.ts         # createPageMetadata({ title, description, path }) cho trang tĩnh
  data/
    cars.ts               # Xe mới (~2200 dòng): Car, CarVariant, allCars (nội bộ), cars[] (đã lọc + sắp xếp), getCarBySlug()
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
    not-found.tsx         # Trang 404 tiếng Việt (có header, nút về trang chủ, gọi, Zalo)
    favicon.ico, icon.svg, apple-icon.png  # Icon logo 3 hình thoi Mitsubishi (cắt từ logo-black.svg)
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
  - Đang bán: `destinator`, `triton`, `xforce`, `xpander-cross`, `xpander`, `attrage`.
  - **Đang ẩn (chưa mở bán):** `outlander` (PHEV), `pajero`. Thông số lấy theo bản Đông Nam Á từ các bài tin tức, `price: 0`,
    ảnh tạm lấy từ ảnh tin tức (`public/images/news/...jpg`).
  - **Thứ tự hiển thị** trên toàn site do mảng `displayOrder` cuối `cars.ts` quyết định, không phụ thuộc vị trí trong `allCars`.
    Footer, header, menu mobile, trang chủ, form báo giá và công cụ tính đều dùng `cars`, nên tự đổi theo.
    Các công cụ tính giá dùng `cars[0]` (hiện là Destinator) làm xe mặc định.
  - **Ẩn/hiện xe:** trường `hidden: true`. Xe ẩn không xuất hiện ở bất kỳ đâu, trang `/xe/<slug>` trả 404 và không có trong sitemap.
    Khi chạy `npm run dev` vẫn xem trước được `/xe/mitsubishi-outlander` (getCarBySlug dùng `allCars` ở môi trường development).
  - **Có kiểm tra an toàn:** nếu một xe đang hiển thị mà có phiên bản `price` ≤ 0 thì `cars.ts` sẽ throw, nên build lỗi
    (tránh mở bán khi chưa có giá).
  - **Checklist khi mở bán Outlander/Pajero:**
    1. Cập nhật `price` theo giá Việt Nam, kiểm tra lại tên phiên bản, thông số, `colors`.
    2. Thêm ảnh PNG nền trong `public/images/cars/<id>.png` (rộng ~1200–1600px, < 300 KB) và sửa `image`. Thêm bộ ảnh vào `carGalleries` trong `CarGallery.tsx`
       (nếu chưa có thì gallery dùng tạm `car.image`).
    3. Xóa `hidden: true`, đổi `status` sang `"available"`.
    4. Tùy chọn: thêm khối "Điểm nổi bật" riêng trong `src/app/xe/[slug]/page.tsx` (mặc định lấy 5 dòng từ `highlights`),
       thêm slide `HeroSlider`, thêm vào `detectPromotionCar` trong `scripts/add-news.mjs` để nhận diện bảng khuyến mãi.
    5. `npm run build` → push.
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
  - Nơi đăng ký: chọn 1 trong **34 tỉnh, thành** (dữ liệu ở `src/data/registrationFees.ts`, mặc định TP.HCM).
  - Lệ phí trước bạ = `taxRate` của tỉnh (10%, 11% hoặc 12%). **Triton** (bán tải chở hàng) tính 60% mức đó.
    Khi tỉnh nào đổi mức thu, chỉ cần sửa `taxRate` trong `registrationFees.ts`.
  - Biển số (Thông tư 155/2025/TT-BTC): Hà Nội và TP.HCM 14 triệu, tỉnh khác 140 nghìn (Triton 350k / 100k).
  - Các khoản phí gồm: trước bạ, đăng ký & biển số, đăng kiểm, đường bộ 12 tháng, bảo hiểm TNDS bắt buộc.
    **Không có phí dịch vụ đăng ký** (đã bỏ theo yêu cầu của chủ website).
  - Giao diện: tổng trước, 5 khoản phí thu gọn trong `<details>`. Trừ khuyến mãi từ `promotions.ts`.
    Nút "Nhận báo giá" điền sẵn `?car=&variant=`.
  - Triton được nhận diện bằng `carName === "Mitsubishi Triton"`, nên đổi tên xe sẽ làm sai logic này.
- **Trả góp** (`InstallmentCalculator.tsx`): chọn trả trước 15–70%, nhập lãi suất năm đầu.
- **Trang Giới thiệu** (`src/app/gioi-thieu/page.tsx`) tập trung vào người tư vấn. Thứ tự các phần: hero có ảnh chân dung,
  số liệu (năm kinh nghiệm, số xe, 24/7) và điểm Google 5,0 (635) → 4 lý do (lấy từ nhận xét thật của khách) →
  quy trình 4 bước → 9 ảnh bàn giao xe (`public/images/about/ban-giao-01..09.jpg`) → 3 nhận xét → đại lý → bản đồ → CTA.
  Có JSON-LD `Person`. Ảnh gốc khách gửi nằm ở `C:\Mitsubishi-Website\anh-gioi-thieu` (ngoài repo).
  Số năm kinh nghiệm, số xe đã bàn giao và giờ làm việc lấy từ `siteConfig.sales` và `siteConfig.hours`
  (giờ làm việc cũng hiện ở footer và nằm trong JSON-LD AutoDealer). Lưới ảnh có ảnh đầu chiếm 2×2, nên cần đúng 9 ảnh để không trống ô.
- **Phần Khuyến mãi trang chủ** (`#khuyen-mai`, nền tối): `src/components/PromotionTabs.tsx` (client), dạng tab theo dòng xe.
  Dữ liệu (`promotionItems`) được dựng sẵn trong `src/app/page.tsx` từ `cars` + `currentPromotion`.
  **Không thêm hàm vào `promotions.ts`**, vì `add-news.mjs` ghi đè toàn bộ file này mỗi tháng.
  Link "Xem toàn bộ chương trình" tự tìm bài trong `news.ts` có `title === currentPromotion.title`.
  Số tiền ưu đãi được tách khỏi label bằng regex `(~ 78 triệu VNĐ)`. Nếu MMV đổi định dạng label thì vẫn hiển thị label gốc.
  Panel bên trái dùng `lg:sticky`, nên thẻ cha phải dùng `overflow-clip` (không dùng `overflow-hidden`, vì sẽ làm hỏng sticky).
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
- Ảnh: **luôn dùng `next/image`**, không dùng `<img>` (lint đang sạch, không còn cảnh báo). Mẫu thường dùng: khung
  `relative` có kích thước cố định (`h-40`, `aspect-[4/3]`, ...) chứa `<Image fill sizes="..." className="object-contain|object-cover" />`.
  Ảnh nằm ở đầu trang dùng `loading="eager"` (Next 16 đã deprecate `priority`). SVG (logo) tự động `unoptimized`.
  `public/` nặng khoảng 51 MB.
- Link nội bộ luôn dùng `<Link>` từ `next/link`, không dùng `<a>` (lint báo lỗi). Link trong `MobileMenu` phải có `onClick={() => setIsOpen(false)}`.
- Link về trang chủ (`href="/"`) nằm **trên chính trang chủ** (logo header, nút trong QuoteForm) phải dùng `ScrollTopLink`
  (`src/components/ScrollTopLink.tsx`). `<Link>` không cuộn khi đã ở đúng trang, nên nếu dùng `<Link>` thì bấm logo sẽ không về đầu trang.
- Link tới trang xe phải dùng **slug** (`/xe/mitsubishi-xforce`), không dùng id. `next.config.ts` có redirect 308 từ `/xe/<id>` cũ.
- Các trang `/xe/[slug]`, `/xe-cu/[slug]`, `/tin-tuc/[slug]` đều có `generateStaticParams` (tạo sẵn HTML khi build).
- SEO: mỗi trang động có `generateMetadata`; `layout.tsx` chứa JSON-LD `AutoDealer` (kèm `sameAs` Facebook/TikTok); sitemap được sinh tự động.
  Khi thêm trang tĩnh mới:
  - Dùng `export const metadata: Metadata = createPageMetadata({ title, description, path })` từ `@/lib/metadata`.
    Nếu chỉ khai báo `title/description`, trang sẽ kế thừa Open Graph của trang chủ, và khi chia sẻ qua Zalo/Facebook sẽ hiện sai tiêu đề và URL.
    Hàm này tự thêm "| Lưu Hoàng Phúc" vào tiêu đề nếu thiếu.
  - **Nhớ thêm trang vào `src/app/sitemap.ts`**.
- Next 16: thuộc tính `priority` của `<Image>` đã bị deprecate. Ảnh lớn ở đầu trang (LCP) dùng `preload`, các ảnh khác ở đầu trang dùng `loading="eager"`.
- Thông tin liên hệ **luôn lấy từ `siteConfig`**, không ghi cứng số điện thoại, Zalo hay email trong trang
  (`siteConfig.contact.phoneUrl/zaloUrl/emailUrl`, `siteConfig.sales.phoneDisplay/email`). Riêng địa chỉ tách theo từng phần trong JSON-LD ở `layout.tsx` vẫn ghi cứng.
- `next.config.ts` có header bảo mật (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) và redirect `/xe/<id>`.
- Sitemap: chỉ tin tức có `lastModified` (lấy theo `publishedAt`). Không đặt `new Date()` cho trang tĩnh.
- Không có dark mode. Website luôn dùng nền trắng.
- **Độ tương phản chữ nhỏ** (WCAG 4,5:1, đã đạt 0 lỗi trên toàn site):
  - Trên nền trắng/xám nhạt/hồng nhạt (`bg-gray-50/100`, `bg-red-50`): chữ xám dùng `text-gray-600` trở lên, chữ đỏ dùng `text-red-700`.
    `text-gray-500` và `text-red-600` chỉ dùng trên nền trắng hoặc cho chữ lớn.
  - Trên nền đen: chữ xám dùng `text-gray-400` (không dùng `gray-500`).
  - Trên nền đỏ `bg-red-600`: dùng `text-white` (không dùng `text-red-100`).
  - Kiểm tra: dùng axe-core qua Edge headless (CDP), rule `color-contrast`, quét mọi URL trong sitemap.
- Ảnh gốc trong `public/` nên rộng khoảng 1200–1600px và dưới 300 KB (`next/image` vẫn tự tạo bản nhỏ hơn). Có thể nén bằng `sharp` (có sẵn trong node_modules).
- Kiểm tra giao diện bằng Edge headless (PowerShell): `msedge --headless --disable-gpu --user-data-dir=<thư mục mới> --window-size=1366,1000 --virtual-time-budget=15000 --screenshot=<file.png> <url>`.
  Mỗi lần chụp cần profile riêng hoặc phải tắt tiến trình Edge headless cũ trước (nếu không sẽ lỗi exit code 21).
  Để thử bấm thật (click, cuộn, đọc URL): chạy Edge với `--headless=new --remote-debugging-port=9333`, rồi điều khiển qua
  Chrome DevTools Protocol bằng `WebSocket` có sẵn trong Node 24 (`Input.dispatchMouseEvent`, `Runtime.evaluate`). Không cần cài Playwright.
- Code chưa được format đồng nhất (thụt lề lẫn lộn). Khi sửa code, giữ nguyên phong cách của vùng xung quanh.

## 9. Điểm cần chú ý hoặc rủi ro đã biết

- Danh sách `categories` trong `add-news.mjs` phải khớp chính xác với union `NewsCategory` trong `news.ts`.
  Khi thêm hoặc đổi danh mục, sửa cả hai nơi, nếu không build sẽ lỗi.
- Website chạy trên **Vercel**, tự deploy khi push lên `main`. Có thể kiểm tra trạng thái deploy qua
  `https://api.github.com/repos/phucbomitsubishi-coder/mitsubishi-phuc-sales/commits/<sha>/status` (không cần `gh`, máy chưa cài).
