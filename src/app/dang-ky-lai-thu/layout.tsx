import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký lái thử xe Mitsubishi",
  description:
    "Đăng ký lái thử xe Mitsubishi Xforce, Xpander, Triton, Destinator và nhận tư vấn tại Mitsubishi Moveo New City.",
  alternates: {
    canonical: "/dang-ky-lai-thu",
  },
};

export default function DangKyLaiThuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}