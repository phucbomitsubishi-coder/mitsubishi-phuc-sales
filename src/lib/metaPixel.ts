// Gửi sự kiện tới Meta Pixel (Facebook) và Google Analytics 4. Cả hai chỉ chạy ở bản production,
// nên ở môi trường dev hoặc khi trình duyệt chặn quảng cáo thì hàm này không làm gì.
// GA4 chỉ nhận Lead (đổi tên thành generate_lead, sự kiện chuẩn để đánh dấu chuyển đổi và nhập vào Google Ads)
// và Contact; lượt xem trang GA4 tự đo (kể cả khi chuyển trang trong website).
type Fbq = (command: "track" | "trackCustom", event: string, params?: Record<string, string>) => void;
type Gtag = (command: "event", event: string, params?: Record<string, string>) => void;

const gaEvents: Record<string, string> = { Lead: "generate_lead", Contact: "contact" };

export function trackPixel(event: string, params?: Record<string, string>) {
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  if (typeof w.fbq === "function") w.fbq("track", event, params);
  const gaEvent = gaEvents[event];
  if (gaEvent && typeof w.gtag === "function") w.gtag("event", gaEvent, params);
}
