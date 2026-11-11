# Reels hình học 3D (Facebook Reels, TikTok)

Video khổ dọc 1080×1920, dựng bằng Three.js trong trình duyệt rồi xuất từng khung hình sang MP4 (ffmpeg).
Không liên quan đến website, không được build hay deploy.

## Các tập

| Tập | File | Nội dung | Video + caption |
| --- | --- | --- | --- |
| 1 | `tap-01.html` | "Khối này có bao nhiêu mặt?" – nhị thập diện đều, đọc câu hỏi 2,5 giây, đếm ngược 10 giây, gợi ý, đếm 20 mặt trong 5 giây, đáp án (22,5 giây), có hiệu ứng âm thanh | `video/cau-do-hinh-hoc-tap-1.mp4`, `.txt` |

## Xuất lại video

Cần Node, ffmpeg và một trình duyệt Chromium hoặc Edge.

```bash
cd noi-dung/reels-hinh-hoc
npm install
npx playwright install chromium        # hoặc dùng Edge có sẵn: đặt PW_CHANNEL=msedge
node render.mjs tap-01.html video/hinh.mp4          # 1. xuất hình (không tiếng)
python3 am-thanh.py video/am-thanh.wav              # 2. tạo hiệu ứng âm thanh (cần numpy)
ffmpeg -i video/hinh.mp4 -i video/am-thanh.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart video/cau-do-hinh-hoc-tap-1.mp4   # 3. ghép
```

`am-thanh.py` tạo: tiếng vút mở đầu, tích tắc mỗi giây đếm ngược (3 giây cuối cao và to hơn), còi hết giờ,
tiếng "ting" cao dần cho từng mặt sáng lên, chuông hợp âm khi hiện đáp án. Mốc thời gian truyền thêm sau tên file
(`python3 am-thanh.py ra.wav CD0 CD1 RV0 RV1 DUR SO_MAT`), mặc định khớp tập 1; tập mới đổi mốc thì truyền lại cho khớp.

- `DUR=22.5` (biến môi trường, tập 1 dùng 22.5) đặt độ dài video theo giây.
- `ONLY=60,240,440` chỉ chụp các khung hình đó ra `frame-<số>.jpg` để xem nhanh bố cục.
- Mốc thời gian nằm ở dòng `const CD0=…,CD1=…,RV0=…,RV1=…` trong file tập (bắt đầu/kết thúc đếm ngược, bắt đầu/kết thúc đếm mặt).

## Quy tắc khi làm tập mới

- Chữ chỉ đặt trong khoảng 12%–80% chiều cao, chừa lề phải ~150px (giao diện Reels che đáy và cột nút bên phải).
- Có câu mồi ngay giây đầu, cho 2–3 giây đọc câu hỏi; đếm ngược ~10 giây kèm gợi ý giữa chừng; đếm đáp án chậm (~0,25 giây/mặt) để người xem đếm theo (anh Phúc góp ý 8 giây vẫn quá nhanh).
- Video đã có hiệu ứng âm thanh. Nếu thêm nhạc Reels khi đăng, kéo nhạc xuống khoảng 20–30% để vẫn nghe rõ tích tắc.
- Caption kết thúc bằng câu hỏi để kéo bình luận.
