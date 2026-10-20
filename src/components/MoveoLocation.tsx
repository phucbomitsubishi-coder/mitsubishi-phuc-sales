import { siteConfig } from "@/config/site";

type Props = {
  // Mốc phát triển của hệ thống Moveo (trang Giới thiệu)
  milestones?: { year: string; text: string }[];
};

// Khối "Về đại lý" gộp với địa điểm, giờ làm việc và bản đồ (trước là 2 khối cùng tiêu đề).
export default function MoveoLocation({ milestones = [] }: Props) {
  const { dealer, hours, contact } = siteConfig;
  const dealerName = `${dealer.brand} – ${dealer.name.replace("Mitsubishi ", "")}`;

  return (
    <section className="bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:py-20 lg:grid-cols-2 lg:items-stretch">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Về đại lý & địa điểm</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{dealerName}</h2>
          <p className="mt-5 leading-8 text-gray-700">
            Đại lý chính hãng được Mitsubishi Motors Việt Nam ủy quyền, cung cấp xe mới, dịch vụ bảo dưỡng – sửa chữa, phụ tùng
            chính hãng và xe đã qua sử dụng. Thuộc hệ thống Moveo, phục vụ khách hàng Mitsubishi khu vực {dealer.salesArea}.
          </p>

          {milestones.length > 0 && (
            <ol className="mt-7 grid grid-cols-3 border-y border-gray-300">
              {milestones.map((item, index) => (
                <li key={item.year} className={`py-4 ${index ? "border-l border-gray-300 pl-4" : ""}`}>
                  <p className="text-2xl font-black tabular-nums text-red-700 md:text-3xl">{item.year}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-gray-700 md:text-sm">{item.text}</p>
                </li>
              ))}
            </ol>
          )}

          <dl className="mt-7 grid gap-3 text-gray-800 sm:grid-cols-[auto_1fr] sm:gap-x-6">
            <dt className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600 sm:pt-1">Địa chỉ</dt>
            <dd className="leading-7">{dealer.address}</dd>
            <dt className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600 sm:pt-1">Giờ làm việc</dt>
            <dd className="leading-7">
              {hours.display}
              <span className="block text-sm text-gray-600">{hours.afterHours}</span>
            </dd>
          </dl>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Mitsubishi+Motors+Moveo+New+City+Binh+Duong"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-700"
            >
              Chỉ đường đến showroom
            </a>
            <a
              href={contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-900 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Hẹn xem xe qua Zalo
            </a>
          </div>
        </div>

        {/* GOOGLE MAPS */}
        <div className="min-h-[320px] overflow-hidden bg-gray-200">
          <iframe
            title={`Bản đồ đường đến ${dealerName}`}
            src="https://www.google.com/maps?q=Mitsubishi%20Motors%20Moveo%20New%20City%20Binh%20Duong&output=embed"
            width="100%"
            height="100%"
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
