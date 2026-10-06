import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
