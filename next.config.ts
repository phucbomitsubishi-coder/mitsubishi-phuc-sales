import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
