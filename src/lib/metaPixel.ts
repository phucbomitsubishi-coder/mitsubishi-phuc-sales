// Gửi sự kiện tới Meta Pixel (Facebook). Pixel chỉ chạy ở bản production,
// nên ở môi trường dev hoặc khi trình duyệt chặn quảng cáo thì hàm này không làm gì.
type Fbq = (command: "track" | "trackCustom", event: string, params?: Record<string, string>) => void;

export function trackPixel(event: string, params?: Record<string, string>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
