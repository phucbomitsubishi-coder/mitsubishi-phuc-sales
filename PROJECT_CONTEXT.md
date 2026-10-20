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
  - **Form báo giá, lái thử và thu cũ đổi mới dùng CHUNG một Apps Script** (cùng URL; `type` "" → sheet "Trang tính1", "test-drive"/"trade-in" → sheet "DangKyLaiThu").
    Từ 13/10/2026 script nhận mọi `source` dài 1–60 ký tự gồm chữ có dấu, số, khoảng trắng, `_`, `-` (trước đó là danh sách cố định nên nhiều nút bị từ chối).
    Web kiểm tra cùng quy tắc bằng `toLeadSource()` trong `src/lib/leadScripts.ts`, nên `?nguon=` mới dùng được ngay. Thử script nên gửi bằng Node `fetch` (curl trong Git Bash làm hỏng chữ có dấu).
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
npm run price-image    # Tạo ảnh bảng giá tháng 1080×1350 để đăng Facebook → ../anh-facebook/ (chụp bằng Edge)
npm run promo-images   # Ảnh khuyến mãi từng dòng xe 1080×1350 + file caption/bình luận → ../anh-facebook/khuyen-mai-MM-YYYY/
npm run sync-accessories # Đồng bộ bảng phụ kiện (CHỈ giá niêm yết của món " – MMV") từ ../bao-gia-xe/phu-kien.js → src/data/accessories.ts (tự sinh, không sửa tay)
npm run compare-images # Ảnh 1080×1350 + caption cho các bài so sánh → ../anh-facebook/so-sanh/ (thêm bài mới: sửa mảng comparisons trong script; ảnh chỉ đặt câu hỏi trung lập, không số liệu hơn thua; ảnh xe đối thủ CHỈ lấy từ Wikimedia Commons CC BY/BY-SA, lưu ../anh-facebook/so-sanh/doi-thu/<khóa>.jpg + credits.json, ảnh tự in dòng ghi tác giả; ảnh anh Phúc tự chụp để ở ../anh-facebook/so-sanh/anh-tu-chup/<tên mẫu xe>.jpg được ưu tiên, không cần ghi tác giả)
npm run indexnow       # Báo Bing/IndexNow mọi URL trong sitemap (chạy SAU khi deploy xong; khóa ở public/<key>.txt). Cốc Cốc không còn webmaster tool, tự thu thập theo robots.txt
npm run sync-dealer-promos # Đồng bộ CHƯƠNG TRÌNH ĐẠI LÝ (PROMO_MONTH, PROMOS) từ ../bao-gia-xe/index.html → src/data/dealerPromotions.ts (tự sinh; KHÔNG đọc .bi-mat). Chỉ landing page /uu-dai/* dùng
npm run ad-images      # Ảnh QUẢNG CÁO Fanpage theo chương trình ĐẠI LÝ (đọc PROMOS/CARS/BHVC từ ../bao-gia-xe/index.html) → ../anh-facebook/quang-cao-MM-YYYY/
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
  Xe cũ lấy từ kho Ucar Moveo (https://ucarmoveo.com/inventory/, Moveo New City tham gia MMV UCAR). 15/10/2026 thêm 12 xe (005–016): chỉ lấy năm, phiên bản, odo, màu, giá, phần mô tả và cam kết;
  **không** lấy danh sách "Trang bị" mẫu của Ucar (hay sai, ví dụ ghi ghế Nappa cho Xpander). Ảnh bỏ banner PNG, tối đa 10 ảnh, nén 1280px. Thông tin không xác định để chuỗi rỗng (`firstRegistration`, `owners`, `serviceHistory`) hoặc `equipment: []`, trang chi tiết tự ẩn mục đó (anh Phúc chọn bỏ qua phần không xác định).
- **NewsArticle**: có thể thêm `seoTitle` (khoảng 60 ký tự) làm tiêu đề trên Google, vì `title` bài thường dài và bị cắt. `slug`, `category` (union `NewsCategory`), `publishedAt` (`YYYY-MM-DD`), `image`,
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
    Bảo hiểm TNDS lấy theo Phụ lục I Nghị định 67/2023/NĐ-CP, **đã gồm VAT**: xe không kinh doanh dưới 6 chỗ và bán tải 480.700đ, 6–11 chỗ 873.400đ;
    xe kinh doanh dưới 6 chỗ 831.600đ, 7 chỗ 1.188.000đ, bán tải 1.026.300đ (anh Phúc xác nhận lấy theo nghị định, 10/2026).
    **Không có phí dịch vụ đăng ký** (đã bỏ theo yêu cầu của chủ website).
  - Giao diện: tổng trước, 5 khoản phí thu gọn trong `<details>`. Trừ khuyến mãi từ `promotions.ts`.
    Nút "Nhận báo giá" điền sẵn `?car=&variant=`.
  - Triton được nhận diện bằng `carName === "Mitsubishi Triton"`, nên đổi tên xe sẽ làm sai logic này.
  - Công thức nằm trong `src/lib/onRoadPrice.ts` (`calculateOnRoadPrice`), dùng chung cho công cụ tính và trang bảng giá.
    Sửa phí ở đó, không viết lại công thức trong component.
- **Bài tư vấn** (`/tu-van/...`): danh sách nằm ở `src/data/advisory.ts`, dùng chung cho trang `/tu-van`, khối "Tư vấn chọn xe"
  trên `/tin-tuc` và trang xe (bài có `carIds` chứa id xe hiện ở mục "So sánh và tư vấn" của trang xe đó).
  Thêm bài mới: tạo trang, thêm vào `advisory.ts` và `sitemap.ts`. `/tu-van` có link ở footer và menu mobile.
- **Bài so sánh với xe đối thủ** (`/tu-van/so-sanh-...`: Xforce–Creta, Xpander–Veloz Cross, Triton–Ranger, Attrage–Vios, Destinator–Innova Cross, Xpander Cross–XL7, Xforce–Yaris Cross, Triton–Hilux, Xpander–Avanza Premio, Attrage–Accent, Xforce–Kia Seltos, Xpander–Kia Carens, Destinator–Hyundai Santa Fe):
  giá, thông số và nguồn của xe đối thủ nằm ở `src/data/competitors.ts` (có `updated` = tháng của giá; khi hãng đổi giá chỉ sửa ở đó).
  Giao diện dùng chung trong `src/components/CarComparison.tsx` (bảng giá + lăn bánh, bảng thông số, 2 cột danh sách, CTA, nguồn);
  phần nhận xét viết riêng trong từng trang. Xe bán tải đối thủ có `isPickup: true` để tính trước bạ 60% như Triton.
  Mỗi xe đối thủ cần ≥ 2 nguồn; số liệu các nguồn ghi khác nhau thì bỏ. Tránh từ "nhất" khi không có số liệu chứng minh (Luật Quảng cáo).
- **Bảng giá xe** (`/bang-gia-xe-mitsubishi`, trang SEO chính cho từ khóa "giá xe Mitsubishi"): URL cố định, tiêu đề và nội dung
  tự đổi theo tháng của `currentPromotion`. Giá niêm yết lấy từ `cars.ts`, ưu đãi khớp theo `variantName === variant.name`,
  lăn bánh tính cho TP.HCM. Có link ở menu "Dự toán chi phí", menu mobile và footer. Mỗi tháng chỉ cần cập nhật `promotions.ts`.
- **Mua xe từ tỉnh khác** (`/mua-xe-mitsubishi-toan-quoc`): anh Phúc bán xe toàn quốc. Trang gồm quy trình 5 bước, thời gian giao (TP.HCM 7–10 ngày, tỉnh 10–15 ngày),
  phí vận chuyển (miễn phí 10 km, ngoài đó tham khảo 30.000đ/km; các hằng số ở đầu file) và bảng lăn bánh 34 tỉnh (tự tính từ `registrationFees.ts`).
  **Không tạo hàng loạt trang "Mitsubishi <tỉnh>"** (doorway page); chỉ làm trang riêng cho tỉnh nào Search Console cho thấy có nhu cầu thật.
- **Thu cũ đổi mới** (`/thu-cu-doi-moi`, form `TradeInForm.tsx`): gửi qua script lái thử (`TEST_DRIVE_SCRIPT_URL` trong `src/lib/leadScripts.ts`),
  gửi `source: "Thu cũ đổi mới"`, `type: "trade-in"` (email báo về ghi "Thu cũ đổi mới"), thông tin xe cũ gom vào `note`, `car` = xe Mitsubishi muốn đổi. Pixel Lead "Thu cu doi moi". Có link ở footer, menu mobile, trang /xe-cu.
- **Nút "Báo giá nhanh"** (`QuickQuote.tsx`, gắn trong layout): nổi góc phải mọi trang (ẩn ở /du-toan/gia-lan-banh và các trang có form).
  Chọn xe → phiên bản → tỉnh → lăn bánh đã trừ ưu đãi tháng; nút Zalo chép sẵn tin nhắn (Zalo không cho điền sẵn qua link).
  Dữ liệu xe dựng gọn trong layout.tsx (`quickQuoteCars`) để không đưa cả cars.ts vào bundle client.
- **Lối vào các trang tiện ích:** menu desktop (`SiteHeader.tsx`) có dropdown "Xe cũ" (Xe đã qua sử dụng, Thu cũ đổi mới) và hàng nút cuối dropdown "Sản phẩm" (Phụ kiện, So sánh với xe đối thủ → /tu-van, Đăng ký lái thử).
  Trang chủ có khối "Dịch vụ & công cụ" (mảng `serviceLinks` trong `src/app/page.tsx`, sau phần Khuyến mãi). Thêm trang tiện ích mới thì thêm vào cả hai chỗ và `MobileMenu`.
- **Phụ kiện** (`/phu-kien-xe-mitsubishi`): đọc `src/data/accessories.ts` (`npm run sync-accessories`). Tên có đuôi " – MMV" hiện nhãn "Chính hãng MMV" và là món **duy nhất có giá**; món khác `price: null`, hiện "Liên hệ" (anh Phúc chọn 12/10/2026, script sync bỏ giá ngay từ đầu). Bảng theo dòng xe dạng `<details>` thu gọn, có nút Zalo. Trong mỗi nhóm, phụ kiện chia thành loại nhỏ (camera hành trình, màn hình, lót sàn...) bằng quy tắc theo tên trong `src/lib/accessoryCategories.ts`; app thêm loại phụ kiện mới không khớp quy tắc thì rơi vào "Phụ kiện khác", nên thêm quy tắc. Giá hiện đã gồm VAT 8%, kèm dòng "MMV chưa VAT" (giá ÷ 1,08, khớp trang MMV).
  Trang `/ho-tro/phu-tung-chinh-hang` vẫn noindex.
- **Màu xe hiển thị mặc định** (20/10/2026, anh Phúc yêu cầu hạn chế màu trắng): trang xe dùng `featuredColors()` trong `src/lib/carColors.ts` (mỗi phiên bản lấy màu nổi bật nhất mà bản trước chưa dùng, thứ tự Đỏ, Cam, Xanh Đen, Đỏ Đen, Nâu, Xám, Bạc, Đen; bản chỉ có trắng thì giữ trắng). Menu Sản phẩm, bảng giá, trang phụ kiện, "Có thể bạn quan tâm", khối chọn xe dùng `featuredImages` / `cardColors` trong `src/lib/carCards.ts` (ảnh nhìn ngang màu đặc trưng của từng xe).
- **Form báo giá / lái thử trên trang xe** (20/10/2026): ẩn, chỉ mở hộp thoại khi khách bấm nút (`src/components/QuoteDialog.tsx`, thẻ `<dialog>`). QuoteDialog bắt (giai đoạn capture, chạy trước `<Link>`) link `/?car=<tên xe này>&variant=...&nguon=...#bao-gia` → form báo giá `VariantLeadForm.tsx` (sheet báo giá); link `/dang-ky-lai-thu?xe=<id xe này>&nguon=...` → form lái thử `TestDriveLeadForm.tsx` (script lái thử, type "test-drive"; phiên bản, nơi lái thử tại showroom/tại nhà, địa chỉ/thời gian, dự định mua gộp vào `note`). Điền sẵn phiên bản và nguồn của link. Ctrl/Cmd + bấm hoặc không có JS thì link vẫn mở trang như cũ. Thêm nút mới chỉ cần dùng đúng dạng link. Form ô gạch chân kiểu MMV, dùng `useId` vì một trang có thể có nhiều form. Mục #lan-banh vẫn có form báo giá hiện sẵn bên trái và thẻ lăn bánh thu gọn bên phải.
- **Phiên bản, thông số, trang bị trên trang xe** (20/10/2026, theo trang sản phẩm MMV): `VariantSelector.tsx` gồm hàng ảnh phiên bản (ảnh nhìn ngang nếu có `sideImages` trong showroom.ts), khối chi tiết phiên bản (tab phiên bản, tên lớn, giá, danh sách trang bị có "Xem thêm", ảnh màu nền xám + chọn màu), #lan-banh (bên trái form VariantLeadForm "1. Thông tin cá nhân" hiện sẵn; bên phải thẻ lăn bánh thu gọn gồm giá niêm yết + ưu đãi tháng của phiên bản, bấm "Xem giá lăn bánh" mới mở OnRoadPriceCalculator), rồi `VariantCompare.tsx` = khối **"Trang thiết bị"** (#trang-bi): cột từng phiên bản (ảnh đổi theo chấm màu, giá), hàng tên + giá bám đầu khi cuộn, các nhóm bấm mở (3 nhóm thông số theo `src/lib/specGroups.ts` + Ngoại thất, Nội thất, Tiện nghi, An toàn, Vận hành; trang bị ghi "Có"/"–" theo đúng chuỗi trong `equipment`), nút Xem thêm/Thu gọn (nhóm ẩn vẫn trong HTML). Điện thoại so sánh 2 phiên bản (xe > 2 bản có 2 ô chọn). `SpecSheet.tsx`, `EquipmentList.tsx` không còn dùng trên trang xe.
- **Trang bị phiên bản** (`src/app/xe/[slug]/EquipmentList.tsx`): mỗi nhóm `equipment` (ngoại thất, nội thất, tiện nghi, an toàn, vận hành và hỗ trợ lái), "Hệ thống an toàn" và "Diamond Sense" (`safetyTechnologies`, kèm giải thích) là một `<details>` thu gọn có số đếm.
- **Tiêu đề trang xe** (`generateMetadata` trong `src/app/xe/[slug]/page.tsx`): "Giá xe <tên xe> tháng MM/YYYY: lăn bánh, ưu đãi", mô tả có cụm từ khách hay tìm (`carSeoTags`, ví dụ Xforce "SUV 5 chỗ gầm cao 222 mm"), giá thấp nhất và ưu đãi cao nhất, tự đổi theo `currentPromotion` (15/10/2026, theo số liệu Search Console).
- **Landing page quảng cáo** (`/uu-dai/<xe>`: destinator, xforce, xpander (gộp cả Xpander Cross qua `extraCarSlugs`), triton; 10/2026; khuôn chung `src/components/AdLandingPage.tsx`): cho người bấm quảng cáo Facebook/Google. `robots: noindex, nofollow`, KHÔNG có trong sitemap, KHÔNG link từ web chính.
  Không có menu; footer chung và nút Báo giá nhanh bị ẩn bằng `HideOnLanding` (layout) cho mọi đường dẫn `/uu-dai/`; trang tự có footer ngắn (người bán, địa chỉ, chính sách bảo mật: Google Ads yêu cầu).
  Ưu đãi ghi theo **chương trình đại lý** (anh Phúc chọn "cách B" 16/10/2026) từ `dealerPromotions.ts` (`npm run sync-dealer-promos` mỗi tháng), vẫn kèm câu "không phải tiền mặt"; hết tháng mà chưa đồng bộ thì phần ưu đãi tự ẩn khi build.
  **Không bao giờ** đưa quyền linh động/LNG (.bi-mat) vào repo (repo công khai). Form `LandingLeadForm` gửi vào sheet báo giá, nguồn = `?nguon=` của URL quảng cáo (mặc định "Landing Destinator"), Pixel Lead.
  Thêm xe mới: chép `src/app/uu-dai/xforce/page.tsx`, đổi metadata (giữ `robots` noindex), `carSlug`, `defaultSource`, `kicker`, ảnh, `highlights` (chỉ số liệu đã đối chiếu MMV).
- **Trả góp** (`InstallmentCalculator.tsx`): chọn trả trước 20–70%, thời hạn 1–8 năm, nhập lãi suất năm đầu.
- **Trang Giới thiệu** (`src/app/gioi-thieu/page.tsx`) tập trung vào người tư vấn. Thứ tự các phần: hero có ảnh chân dung,
  số liệu (năm kinh nghiệm, số xe, 24/7) và điểm Google 5,0 (635) **của showroom** (luôn ghi rõ tên showroom, không phải đánh giá cá nhân) → 4 lý do (lấy từ nhận xét thật của khách) →
  quy trình 4 bước → 9 ảnh bàn giao xe (`public/images/about/ban-giao-01..09.jpg`) → 3 nhận xét → "Các dòng xe Phúc đang tư vấn" (CarLineup, dữ liệu chung `src/lib/carCards.ts` với trang chủ) → khối gộp Về đại lý + địa điểm + bản đồ (`MoveoLocation.tsx`, nhận `milestones`) → dải chốt nền tối (Lái thử / Nhận báo giá / Zalo). Nút và tiêu đề đồng bộ trang chủ, trang xe (nút vuông chữ in hoa, h2 `font-black md:text-5xl`; 20/10/2026).
  Có JSON-LD `Person`. Ảnh gốc khách gửi nằm ở `C:\Mitsubishi-Website\anh-gioi-thieu` (ngoài repo).
  Số năm kinh nghiệm, số xe đã bàn giao và giờ làm việc lấy từ `siteConfig.sales` và `siteConfig.hours`
  (giờ làm việc cũng hiện ở footer và nằm trong JSON-LD AutoDealer). Lưới ảnh có ảnh đầu chiếm 2×2, nên cần đúng 9 ảnh để không trống ô.
- **Trang chủ** (thiết kế lại 19/10/2026): **HeroShowroom** (`src/components/HeroShowroom.tsx`, đồng bộ banner trang xe 20/10/2026: ảnh/video thật tràn màn hình lấy từ `src/data/showroom.ts`, logo chữ tên xe, khẩu hiệu, giá + ưu đãi, nút vuông Xem chi tiết / Nhận báo giá, hàng tên xe ở đáy có thanh chạy, tự chuyển 7 giây tới khi khách bấm; video chỉ phát trên máy tính sau khi trang tải xong; điện thoại ảnh phía trên, chữ trên nền đen; chứa **h1 duy nhất** "Tư vấn mua xe Mitsubishi Bình Dương – Lưu Hoàng Phúc") → thẻ "Người tư vấn của bạn" (ảnh chân dung, số liệu từ `siteConfig.sales`) → "Xe nào hợp với bạn?" (`CarLineup.tsx`, băng chuyền kiểu trang chủ MMV: xe giữa rõ, hai bên ảnh mờ (chữ vẫn đủ tương phản), mũi tên ← → máy tính, vuốt điện thoại; tab nhu cầu gạch chân; ảnh nhìn ngang mỗi xe một màu theo `cardColors` trong `src/lib/carCards.ts`; nút Xem bảng giá; dùng chung trang Giới thiệu) + hàng "Sắp ra mắt" (map `upcomingNews`) → "Khách hàng nhận xe" (`HandoverStrip.tsx`, 9 ảnh bàn giao chạy ngang; điểm Google lấy từ `siteConfig.dealer.googleRating`, luôn ghi là của showroom) → Khuyến mãi → form báo giá (#bao-gia) → Dịch vụ & công cụ (thẻ có biểu tượng) → "Bài viết mới" (3 bài so sánh + 3 tin mới nhất được lập chỉ mục) → Liên hệ. Tiêu đề khối dùng kiểu chung: dòng nhỏ chữ hoa đỏ + h2 `font-black md:text-5xl`. Class `.reveal` (globals.css) cho hiệu ứng hiện dần khi cuộn (chỉ trình duyệt hỗ trợ animation-timeline; tắt khi giảm chuyển động; không gắn vào khối có phần tử sticky). `HeroSlider.tsx` (banner ảnh cũ) không còn dùng, giữ lại để quay về nếu cần.
- **Giao diện điện thoại (19/10/2026, tham khảo web MMV, Toyota, Ford, Hyundai, Ucar Moveo):**
  - Header (từ 20/10/2026 nền đen trên mọi màn hình, logo trắng, nút Zalo/Gọi vuông chữ in hoa; tự ẩn khi cuộn cả trên máy tính): điện thoại cao ~65px, tự ẩn khi cuộn xuống và hiện khi cuộn lên (`HeaderAutoHide.tsx` + CSS `.site-header` trong globals.css; không ẩn khi menu mở; đặt biến CSS `--header-offset`). Header **không được có transform** khi đang hiện, vì menu mobile nằm trong header.
  - Footer: nhóm Sản phẩm, Mua xe, Hỗ trợ thu gọn trên điện thoại (`FooterSection.tsx`, link vẫn trong HTML); từ md luôn mở.
  - **Trang xe** (bố cục kiểu trang sản phẩm MMV, 20/10/2026): xe có mục trong `src/data/showroom.ts` (đủ 6 xe đang bán từ 20/10/2026; Xforce và Attrage không có video nên banner là ảnh tĩnh; banner có dòng ghi chú "Một số trang bị chỉ có trên phiên bản cao cấp" vì biểu tượng theo MMV thường là trang bị bản cao nhất) dùng `ShowroomHero.tsx` (video nén chỉ phát trên máy tính ≥768px sau khi trang tải xong, không phát khi tiết kiệm dữ liệu/giảm chuyển động; điện thoại dùng ảnh dọc phía trên + chữ trên nền đen; logo chữ tên xe trong h1, khẩu hiệu, biểu tượng, giá + ưu đãi, nút Nhận báo giá/Lái thử/Tải brochure) và `ShowroomFeatures.tsx` (ảnh lớn có thẻ đen + các khối ảnh/chữ, tiêu đề theo MMV, gạch đầu dòng từ trang bị bản cao nhất); xe chưa có dùng banner tối mặc định + `CarFeatures.tsx`. Thứ tự (20/10/2026): banner (xe có showroom: 4 số liệu nhanh `getCarFacts` nằm ở đáy banner, nền tối mờ; biểu tượng trùng nghĩa với số liệu đã bỏ) → `CarSectionNav` (Giá & phiên bản, Lăn bánh, Trang thiết bị, Tính năng, Hình ảnh, Hỏi đáp; nút Báo giá) → VariantSelector + VariantCompare → khối tính năng (+ khối "Phụ kiện chính hãng" ảnh MMV `accessoriesImage`, dẫn tới `/phu-kien-xe-mitsubishi#<id xe>`, trang phụ kiện tự mở nhóm nhờ `OpenDetailsFromHash.tsx`) → thư viện ảnh (CarGallery: tab + hàng ảnh lớn vuốt ngang) → "Khách hàng nhận xe" (HandoverStrip) → hỏi đáp → dải chốt cuối trang nền tối (Lái thử / Nhận báo giá mở hộp thoại, Zalo, link trả góp, thu cũ đổi mới, brochure) → liên quan. Đã bỏ khối ưu đãi nền đen (#uu-dai) và 4 ô "Công cụ mua": ưu đãi nằm ở banner, thẻ lăn bánh, form. Ảnh showroom ở `public/images/cars/<id>/showroom/`, lấy từ trang xe MMV (MMV dùng chung cho web nhà phân phối): script tạm đọc trang (cheerio), tải ảnh, ffmpeg cắt viền đen + nén video (~0,5 MB), sharp nén ảnh. Thêm xe: làm tương tự rồi thêm mục vào showroom.ts.
  - Form báo giá và lái thử có ô không bắt buộc "Dự định mua xe" (`PurchaseTimeline.tsx`). Apps Script không có cột riêng nên ghép vào `variant` (báo giá) hoặc `note` (lái thử) dạng "... | Dự định mua: 1–3 tháng".
  - /xe-cu: `UsedCarList.tsx` lọc theo dòng xe, sắp xếp (giá, đời, km), thẻ 2 cột trên điện thoại. /tin-tuc (20/10/2026): banner là bài nổi bật ảnh tràn ngang (bỏ khung NewsPromotionCover), "Tư vấn chọn xe" thẻ có ảnh = `<href>/opengraph-image` của bài, 6 bài mới nhất (còn lại ẩn trong HTML), rồi `NewsList.tsx` lọc theo chủ đề, thẻ ngang trên điện thoại, "Xem thêm" 6 bài/lần (bài ẩn chỉ ẩn bằng CSS); khối Tư vấn chọn xe hiện 6 bài trên điện thoại.
  - Không làm: popup che màn hình (Google phạt trên mobile), chatbot, trang con tính năng chép từ MMV (trùng lặp).
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
  - Ảnh chia sẻ riêng (1200×630): tạo `opengraph-image.tsx` trong thư mục trang, gọi `renderOgImage({ kicker, title, subtitle, images, versus })`
    từ `@/lib/ogImage` (font Roboto ở `src/assets/fonts`), **và** thêm `hasOgImageFile: true` vào `createPageMetadata`.
    Nếu thiếu `hasOgImageFile`, ảnh mặc định `og-default.jpg` sẽ được dùng thay cho ảnh riêng. Đã có ảnh riêng cho: bảng giá (tự đổi theo tháng),
    các trang `/tu-van/*`, `/du-toan/*`, `/xe-cu`, `/gioi-thieu`.
  - Schema: đặt `<PageSchema metadata={metadata} path="..." parents={[...]} datePublished="YYYY-MM-DD" hasOgImage />` ngay trước `<SiteHeader />`
    (`src/components/PageSchema.tsx`, xuất Article/WebPage có tác giả `#person` + BreadcrumbList). Đã có ở bảng giá, `/tu-van/*`, `/du-toan/*`.
    Khi sửa nội dung bài tư vấn hoặc so sánh, nhớ cập nhật `dateModified`.
  - **Nhớ thêm trang vào `src/app/sitemap.ts`**.
- Next 16: thuộc tính `priority` của `<Image>` đã bị deprecate. Ảnh lớn ở đầu trang (LCP) dùng `preload`, các ảnh khác ở đầu trang dùng `loading="eager"`.
- Thông tin liên hệ **luôn lấy từ `siteConfig`**, không ghi cứng số điện thoại, Zalo hay email trong trang
  (`siteConfig.contact.phoneUrl/zaloUrl/emailUrl`, `siteConfig.sales.phoneDisplay/email`). Riêng địa chỉ tách theo từng phần trong JSON-LD ở `layout.tsx` vẫn ghi cứng.
- `next.config.ts` có header bảo mật (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) và redirect `/xe/<id>`.
- Sitemap: chỉ tin tức có `lastModified` (lấy theo `publishedAt`). Không đặt `new Date()` cho trang tĩnh.
- **Chính sách Google (rà soát 10/2026):**
  - Bài tin có `source` không thuộc `mitsubishi-motors.com.vn` (bài chép từ xehay, autodaily...) tự động bị `noindex`
    và bỏ khỏi sitemap (`isRepublishedArticle` trong `src/lib/news.ts`). Muốn bài được lập chỉ mục thì phải viết lại bằng lời mình
    rồi thêm `originalContent: true` (giữ `source` làm link tham khảo). 4 bài Attrage, Pajero, Outlander PHEV, Outlander 2028 đã được viết lại (10/2026).
  - JSON-LD toàn site (`layout.tsx`) là `@graph`: `WebSite` + `Person #person` (SĐT, email của Phúc) + `AutoDealer #autodealer`
    (chỉ tên, địa chỉ, giờ mở cửa). **Không gắn SĐT, email hay logo cá nhân vào AutoDealer**, vì như vậy là khai báo website cá nhân thành website đại lý.
    Bài tin dùng `author/publisher` = `#person`.
  - Footer ghi rõ đây là website cá nhân, không phải website chính thức, và © thuộc về Lưu Hoàng Phúc (không ghi tên đại lý).
  - `/chinh-sach-bao-mat` (theo Nghị định 13/2023) có link ở footer và dưới 2 form. Nếu thêm form hoặc thêm công cụ theo dõi
    (Google Analytics, Facebook Pixel) thì phải cập nhật nội dung trang này và `lastUpdated`.
  - **Meta Pixel** (`src/components/MetaPixel.tsx`, ID trong `siteConfig.tracking.metaPixelId`, chỉ chạy ở production): PageView (kể cả khi chuyển trang),
    Từ 19/10/2026 Pixel chỉ tải khi khách bắt đầu thao tác (cuộn, chạm, gõ) hoặc sau 4 giây để trang nhanh hơn (fbevents.js ~200 KB); landing /uu-dai/* vẫn tải ngay. Sự kiện theo dõi không đổi.
    Contact khi bấm link `tel:`/`zalo.me` (bắt bằng click toàn trang, nên link gọi/Zalo mới tự được đếm), Lead khi QuoteForm hoặc form lái thử gửi thành công (`trackPixel` trong `src/lib/metaPixel.ts`).
    Không gửi họ tên/SĐT cho Meta. Kiểm tra bằng Edge headless phải đặt user agent thường (UA "HeadlessEdg" bị Meta bỏ qua, không gửi /tr).
  - Không dùng schema `aggregateRating`/`Review` cho chính mình (Google cấm đánh giá tự đăng). Điểm 5,0 (635) chỉ hiển thị dạng chữ.
- **Mỗi trang tự bọc nội dung trong `<main>`** (layout chỉ dùng `<div className="flex-1">`). Trang mới phải có đúng 1 `<main>`, không lồng nhau (axe: landmark-no-duplicate-main).
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
