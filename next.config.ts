import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tắt tối ưu ảnh của Vercel (21/10/2026): gói Hobby hết hạn mức Image Optimization, /_next/image trả 402
  // làm ảnh mới không hiện trên web thật. Ảnh trong public/ đã nén sẵn (~1200–1600px, < 300 KB) nên
  // phục vụ thẳng file gốc qua CDN. Muốn bật lại (khi nâng gói Pro) thì xóa dòng này.
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Không cho trang khác nhúng website vào iframe (chống giả mạo giao diện)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Link cũ trong footer dùng id xe (/xe/xforce) thay vì slug (/xe/mitsubishi-xforce)
    return [
      // Bài tin cũ trùng chủ đề và quá sơ sài, gộp vào bài tư vấn đầy đủ (10/2026)
      {
        source: "/tin-tuc/kinh-nghiem-chon-xe-mitsubishi-phu-hop",
        destination: "/tu-van/chon-xe-mitsubishi-phu-hop",
        permanent: true,
      },
      // Link của web cũ trên tên miền (?s=45/san-pham/mitsubishi-attrage, ?x=31/san-pham/attrage-cvt)
      // vẫn còn trong Search Console: đưa về đúng trang xe thay vì trang chủ (16/10/2026)
      ...["s", "x"].map((key) => ({
        source: "/",
        has: [
          {
            type: "query" as const,
            key,
            value:
              ".*san-pham/(?:mitsubishi-)?(?<model>xpander-cross|xforce|xpander|attrage|triton|destinator).*",
          },
        ],
        destination: "/xe/mitsubishi-:model",
        permanent: true,
      })),
      {
        source:
          "/xe/:id(xforce|xpander|xpander-cross|attrage|triton|destinator)",
        destination: "/xe/mitsubishi-:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
