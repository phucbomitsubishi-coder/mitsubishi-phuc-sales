# Reels hình học 3D (Facebook Reels, TikTok)

Video khổ dọc 1080×1920, dựng bằng Three.js trong trình duyệt rồi xuất từng khung hình sang MP4 (ffmpeg).
Không liên quan đến website, không được build hay deploy.

## Các tập

| Tập | File | Nội dung | Video + caption |
| --- | --- | --- | --- |
| 1 | `tap-01.html` | "Khối này có bao nhiêu mặt?" – nhị thập diện đều, đếm ngược 8 giây, gợi ý, đáp án 20 mặt (15,5 giây) | `video/cau-do-hinh-hoc-tap-1.mp4`, `.txt` |

## Xuất lại video

Cần Node, ffmpeg và một trình duyệt Chromium hoặc Edge.

```bash
cd noi-dung/reels-hinh-hoc
npm install
npx playwright install chromium        # hoặc dùng Edge có sẵn: đặt PW_CHANNEL=msedge
node render.mjs tap-01.html video/cau-do-hinh-hoc-tap-1.mp4
```

- `DUR=15.5` (biến môi trường) đặt độ dài video theo giây.
- `ONLY=60,240,440` chỉ chụp các khung hình đó ra `frame-<số>.jpg` để xem nhanh bố cục.
- Mốc thời gian nằm ở dòng `const CD0=…,CD1=…,RV0=…,RV1=…` trong file tập (bắt đầu/kết thúc đếm ngược, bắt đầu/kết thúc đếm mặt).

## Quy tắc khi làm tập mới

- Chữ chỉ đặt trong khoảng 12%–80% chiều cao, chừa lề phải ~150px (giao diện Reels che đáy và cột nút bên phải).
- Có câu mồi ngay giây đầu; đếm ngược ~8 giây kèm gợi ý giữa chừng.
- Video không có tiếng: chọn nhạc thịnh hành trong thư viện Reels khi đăng.
- Caption kết thúc bằng câu hỏi để kéo bình luận.
