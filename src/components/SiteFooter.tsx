import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const { sales, dealer, contact, social } = siteConfig;

  return (
    <footer className="mt-auto bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
  {/* Showroom */}
  <div className="lg:col-span-1">
    <h2 className="text-lg font-bold">
      {dealer.name}
    </h2>

    <p className="mt-4 text-sm leading-6 text-gray-300">
      Tư vấn Kinh doanh:{" "}
      <span className="font-semibold text-white">
        {sales.name}
      </span>
    </p>

    <p className="mt-2 text-sm leading-6 text-gray-300">
      {dealer.address}
    </p>

    <p className="mt-2 text-sm leading-6 text-gray-300">
      Khu vực phục vụ: {dealer.salesArea}
    </p>
  </div>

  {/* Sản phẩm */}
  <div>
    <h3 className="font-bold uppercase tracking-wide">
      Sản phẩm
    </h3>

    <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
      <Link href="/xe/destinator" className="hover:text-white">
        Destinator
      </Link>

      <Link href="/xe/xforce" className="hover:text-white">
        Xforce
      </Link>

      <Link href="/xe/xpander" className="hover:text-white">
        Xpander
      </Link>

      <Link href="/xe/xpander-cross" className="hover:text-white">
        Xpander Cross
      </Link>

      <Link href="/xe/triton" className="hover:text-white">
        Triton
      </Link>

      <Link href="/xe/attrage" className="hover:text-white">
        Attrage
      </Link>
    </div>
  </div>

  {/* Mua xe */}
  <div>
    <h3 className="font-bold uppercase tracking-wide">
      Mua xe
    </h3>

    <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
      <Link href="/#khuyen-mai" className="hover:text-white">
        Khuyến mãi
      </Link>

      <Link
        href="/du-toan/gia-lan-banh"
        className="hover:text-white"
      >
        Dự toán giá lăn bánh
      </Link>

      <Link
        href="/du-toan/tra-gop"
        className="hover:text-white"
      >
        Dự toán trả góp
      </Link>

      <Link href="/xe-cu" className="hover:text-white">
        Xe đã qua sử dụng
      </Link>

      <Link href="/lien-he" className="hover:text-white">
        Yêu cầu báo giá
      </Link>
    </div>
  </div>

  {/* Hỗ trợ khách hàng */}
  <div>
    <h3 className="font-bold uppercase tracking-wide">
      Hỗ trợ khách hàng
    </h3>

    <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
      <Link
        href="/ho-tro/chinh-sach-bao-hanh"
        className="hover:text-white"
      >
        Chính sách bảo hành
      </Link>

      <Link
  href="/ho-tro/bao-duong-dinh-ky"
  className="hover:text-white"
>
  Bảo dưỡng định kỳ
</Link>

      <Link
  href="/ho-tro/phu-tung-chinh-hang"
  className="hover:text-white"
>
  Phụ tùng chính hãng
</Link>

      <Link
  href="/ho-tro/huong-dan-su-dung"
  className="hover:text-white"
>
  Hướng dẫn sử dụng
</Link>

      <Link
  href="/ho-tro/cau-hoi-thuong-gap"
  className="hover:text-white"
>
  Câu hỏi thường gặp
</Link>
    </div>
  </div>

  {/* Liên hệ */}
  <div>
    <h3 className="font-bold uppercase tracking-wide">
      Liên hệ
    </h3>

    <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
      <a
        href={contact.phoneUrl}
        className="hover:text-white"
      >
        Hotline: {sales.phoneDisplay}
      </a>

      <a
        href={contact.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        Zalo: {sales.phoneDisplay}
      </a>

      <a
        href={contact.emailUrl}
        className="break-all hover:text-white"
      >
        {sales.email}
      </a>

      <a
        href={social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        TikTok
      </a>
    </div>
  </div>
</div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-xs leading-5 text-gray-400">
            Website Tư vấn Kinh doanh Mitsubishi của {sales.name}.
            Thông tin giá bán, khuyến mãi và chính sách có thể thay đổi
            theo từng thời điểm. Vui lòng liên hệ trực tiếp để nhận thông
            tin cập nhật.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            © {new Date().getFullYear()} {dealer.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}