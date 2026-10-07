import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import MoveoLocation from "@/components/MoveoLocation";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Giới thiệu Lưu Hoàng Phúc – Tư vấn bán hàng Mitsubishi Moveo New City",
  description:
    "Lưu Hoàng Phúc – tư vấn kinh doanh Mitsubishi tại Moveo New City. Tư vấn tận tâm, thủ tục nhanh gọn, minh bạch, hỗ trợ trả góp và chăm sóc sau bán hàng.",
  path: "/gioi-thieu",
  hasOgImageFile: true,
});

const { sales, dealer, contact, social } = siteConfig;

// Số liệu Google Maps của showroom đại lý, không phải của riêng người tư vấn (ảnh chụp màn hình khách gửi, 10/2026).
// Luôn ghi rõ tên showroom cạnh con số để khách không hiểu nhầm là đánh giá cá nhân.
const googleRating = { score: "5,0", count: 635 };
const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Mitsubishi+Motors+Moveo+New+City";

const reasons = [
  {
    title: "Tư vấn tận tâm",
    text: "Lắng nghe nhu cầu, so sánh phiên bản rõ ràng và đồng hành từ lúc chọn xe đến khi hoàn tất giấy tờ.",
    icon: "M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z",
  },
  {
    title: "Thủ tục nhanh gọn, minh bạch",
    text: "Chủ động chuẩn bị sẵn hồ sơ, giải thích rõ từng khoản chi phí và từng bước thủ tục.",
    icon: "M9 12l2 2 4-4M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
  },
  {
    title: "Đúng hẹn",
    text: "Lịch lái thử, ký hợp đồng và bàn giao xe được sắp xếp chu đáo, đúng như đã hẹn.",
    icon: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  },
  {
    title: "Chăm sóc sau bán",
    text: "Sau khi nhận xe vẫn chủ động hỏi thăm, nhắc lịch bảo dưỡng. Ngoài giờ làm việc vẫn hỗ trợ 24/7 qua điện thoại và Zalo.",
    icon: "M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 12v5a2 2 0 0 0 2 2h1v-6H4",
  },
];

const steps = [
  {
    title: "Tư vấn chọn xe",
    text: "Tìm hiểu nhu cầu, so sánh mẫu xe và phiên bản, gửi báo giá cùng ưu đãi mới nhất.",
  },
  {
    title: "Lái thử",
    text: "Lái thử tại showroom hoặc tại nhà theo lịch hẹn, để bạn trải nghiệm thực tế trước khi quyết định.",
  },
  {
    title: "Thủ tục & tài chính",
    text: "Hỗ trợ hồ sơ trả góp, hợp đồng, đăng ký xe. Chuẩn bị sẵn giấy tờ để bạn đỡ mất thời gian.",
  },
  {
    title: "Bàn giao & đồng hành",
    text: "Bàn giao xe tại showroom, hướng dẫn sử dụng và tiếp tục hỗ trợ trong suốt quá trình sử dụng.",
  },
];

const testimonials = [
  {
    name: "Anh Nên",
    car: "Chủ xe Mitsubishi Triton",
    quote:
      "Mình rất hài lòng khi mua xe tại showroom Mitsubishi Moveo New City. Không gian sạch đẹp, chuyên nghiệp và hiện đại. Đặc biệt là bạn Phúc tư vấn rất nhiệt tình, hỗ trợ mình từ lúc chọn xe đến khi hoàn tất giấy tờ.",
  },
  {
    name: "Anh Đinh",
    car: "Chủ xe Mitsubishi Xpander",
    quote:
      "Bạn Phúc làm việc chuyên nghiệp, tận tâm và luôn chủ động chuẩn bị sẵn mọi giấy tờ, thủ tục giúp quá trình mua xe diễn ra nhanh chóng, gọn gàng và minh bạch. Từ khâu tư vấn đến bàn giao, mọi thứ đều chu đáo và đúng hẹn.",
  },
  {
    name: "Anh Long",
    car: "Khách hàng Mitsubishi",
    quote:
      "Từ lúc tìm hiểu xe đến khi nhận xe, bạn Phúc luôn hỗ trợ nhanh chóng, giải thích rõ ràng từng thủ tục. Sau khi nhận xe, bạn vẫn chủ động hỏi thăm và hỗ trợ khi mình cần tư vấn thêm về bảo dưỡng.",
  },
];

const deliveryPhotos = Array.from({ length: 9 }, (_, index) => ({
  src: `/images/about/ban-giao-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Lưu Hoàng Phúc bàn giao xe Mitsubishi cho khách hàng tại Moveo New City – ảnh ${index + 1}`,
}));

const milestones = [
  { year: "2018", text: "Moveo Bình Dương" },
  { year: "2020", text: "Moveo Thuận An" },
  { year: "2024", text: "Moveo New City" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.mitsubishiauto.vn/#person",
  name: sales.name,
  jobTitle: sales.title,
  telephone: `+84${sales.phone.slice(1)}`,
  email: sales.email,
  image: "https://www.mitsubishiauto.vn/images/about/luu-hoang-phuc.jpg",
  url: "https://www.mitsubishiauto.vn/gioi-thieu",
  worksFor: { "@id": "https://www.mitsubishiauto.vn/#autodealer" },
  sameAs: [social.facebook, social.tiktok],
};

function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`tracking-wider text-amber-400 ${className}`}>
      ★★★★★
    </span>
  );
}

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SiteHeader />

      {/* HERO: NGƯỜI TƯ VẤN */}
      <section className="relative overflow-clip bg-neutral-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] rounded-full bg-red-600/25 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-6 pt-12 lg:grid-cols-[7fr_5fr] lg:pt-16">
          <div className="pb-12 lg:pb-20">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">
              {sales.title}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {sales.name}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-300">
              Đồng hành cùng bạn từ lúc chọn xe đến khi nhận xe tại{" "}
              <span className="font-semibold text-white">
                {dealer.brand} – {dealer.name.replace("Mitsubishi ", "")}
              </span>
              , đại lý chính hãng được Mitsubishi Motors Việt Nam ủy quyền.
            </p>

            {/* SỐ LIỆU NỔI BẬT */}
            <dl className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-neutral-800 rounded-2xl border border-neutral-800 bg-neutral-900/60">
              {[
                { value: `${sales.yearsOfExperience}`, suffix: "năm", label: "kinh nghiệm tư vấn" },
                { value: sales.carsDelivered.replace(/^Gần\s*/, ""), prefix: "Gần", label: "xe đã bàn giao" },
                { value: "24/7", label: "hỗ trợ ngoài giờ" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-3 py-4 text-center sm:px-5">
                  <dt className="mt-1 text-xs leading-4 text-neutral-400 sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-extrabold tabular-nums sm:text-3xl">
                    {stat.prefix && (
                      <span className="mr-1 align-middle text-sm font-semibold text-neutral-400">
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                    {stat.suffix && (
                      <span className="ml-1 align-middle text-sm font-semibold text-neutral-400">
                        {stat.suffix}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-sm transition hover:border-neutral-500"
            >
              <Stars />
              <span>
                <span className="font-bold text-white">{googleRating.score}</span>
                <span className="text-neutral-400">
                  {" "}
                  · {googleRating.count} đánh giá Google của showroom {dealer.name}
                </span>
              </span>
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.phoneUrl}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
              >
                Gọi {sales.phoneDisplay}
              </a>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/80 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-neutral-950"
              >
                Nhắn Zalo
              </a>
              <Link
                href="/dang-ky-lai-thu?nguon=Gioi-thieu"
                className="rounded-xl px-4 py-3 font-bold text-neutral-300 underline-offset-4 transition hover:text-white hover:underline"
              >
                Đăng ký lái thử →
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm self-end overflow-clip rounded-t-[2.5rem] bg-gradient-to-b from-neutral-200 to-neutral-100 lg:max-w-none">
            <Image
              src="/images/about/luu-hoang-phuc.jpg"
              alt={`${sales.name} – ${sales.title}`}
              fill
              preload
              sizes="(min-width: 1024px) 460px, 384px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* VÌ SAO CHỌN PHÚC */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
          Vì sao khách hàng chọn Phúc
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Mua xe nhẹ nhàng, rõ ràng và được chăm sóc lâu dài
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-neutral-200 p-6 transition hover:border-red-200 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d={reason.icon} />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold">{reason.title}</h3>
              <p className="mt-2 leading-7 text-neutral-600">{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            Quy trình mua xe
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            4 bước để sở hữu xe Mitsubishi
          </h2>

          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-extrabold tabular-nums text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-7 text-neutral-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* KHOẢNH KHẮC BÀN GIAO */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Khoảnh khắc bàn giao xe
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Niềm vui của khách hàng là động lực của Phúc
            </h2>
          </div>

          <div className="flex gap-3">
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition hover:border-neutral-950"
            >
              Xem video trên TikTok →
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition hover:border-neutral-950"
            >
              Facebook →
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {deliveryPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-clip rounded-2xl bg-neutral-100 ${
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 768px) 50vw, 100vw"
                    : "(min-width: 768px) 25vw, 50vw"
                }
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* KHÁCH HÀNG NÓI GÌ */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Khách hàng nói gì
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Được khách hàng tin tưởng
              </h2>
            </div>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4 transition hover:border-neutral-600"
            >
              <span className="text-4xl font-extrabold">{googleRating.score}</span>
              <span>
                <Stars className="block text-lg" />
                <span className="text-sm text-neutral-400">
                  Showroom {dealer.name} · {googleRating.count} đánh giá trên Google Maps →
                </span>
              </span>
            </a>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/60 p-7"
              >
                <Stars />
                <blockquote className="mt-4 flex-1 leading-7 text-neutral-200">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-neutral-800 pt-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-neutral-400">{item.car}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ĐẠI LÝ MOVEO NEW CITY */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Về đại lý
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              {dealer.brand} – {dealer.name.replace("Mitsubishi ", "")}
            </h2>
            <p className="mt-5 leading-8 text-neutral-600">
              Đại lý chính hãng được Mitsubishi Motors Việt Nam ủy quyền, cung
              cấp xe mới, dịch vụ bảo dưỡng – sửa chữa, phụ tùng chính
              hãng và xe đã qua sử dụng. Thuộc hệ thống Moveo, phục vụ khách
              hàng Mitsubishi khu vực {dealer.salesArea}.
            </p>
          </div>

          <ol className="grid grid-cols-3 gap-3">
            {milestones.map((item) => (
              <li
                key={item.year}
                className="rounded-2xl border border-neutral-200 p-5 text-center"
              >
                <p className="text-2xl font-extrabold text-red-700 sm:text-3xl">
                  {item.year}
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-700">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ĐỊA ĐIỂM & BẢN ĐỒ */}
      <MoveoLocation />

      {/* CTA CUỐI TRANG */}
      <section className="bg-red-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              Kết nối trực tiếp
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Bạn đang quan tâm xe Mitsubishi?
            </h2>
            <p className="mt-2 max-w-2xl text-white">
              Nhắn cho Phúc mẫu xe bạn thích để nhận báo giá, ưu đãi mới nhất và
              lịch lái thử phù hợp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dang-ky-lai-thu?nguon=Gioi-thieu"
              className="rounded-lg bg-white px-6 py-3 font-bold text-red-700 transition hover:bg-gray-100"
            >
              Đăng ký lái thử
            </Link>
            <a
              href={contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-red-700"
            >
              Liên hệ Zalo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
