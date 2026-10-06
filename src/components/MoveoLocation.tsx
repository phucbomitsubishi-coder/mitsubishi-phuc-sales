import { siteConfig } from "@/config/site";

export default function MoveoLocation() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          
          {/* THÔNG TIN ĐỊA ĐIỂM */}
          <div className="p-7 sm:p-10">
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Địa điểm & liên hệ
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Mitsubishi Motors – Moveo New City
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
  Lô C1C, Đường Hùng Vương, Phường Bình Dương, Thành phố Hồ Chí Minh
</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
  href="https://www.google.com/maps/dir/?api=1&destination=Mitsubishi+Motors+Moveo+New+City+Binh+Duong"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-lg bg-red-600 px-6 py-3 text-center font-bold text-white transition hover:bg-red-700"
>
  Chỉ đường
</a>

              <a
  href={siteConfig.contact.zaloUrl}
  target="_blank"
  rel="noopener noreferrer"
 className="rounded-lg border border-gray-300 px-6 py-3 text-center font-bold text-black transition hover:bg-gray-100"
>
  Liên hệ tư vấn
</a>
            </div>
          </div>

          {/* GOOGLE MAPS */}
<div className="min-h-[300px]">
  <iframe
    title="Mitsubishi Motors - Moveo New City"
    src="https://www.google.com/maps?q=Mitsubishi%20Motors%20Moveo%20New%20City%20Binh%20Duong&output=embed"
    width="100%"
    height="100%"
    className="min-h-[300px] w-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
</div>
        </div>
      </div>
    </section>
  );
}