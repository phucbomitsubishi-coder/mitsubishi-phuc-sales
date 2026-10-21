import Image from "next/image";

// Dải ảnh khách nhận xe tự chạy ngang (ảnh đã được khách đồng ý, dùng chung với /gioi-thieu).
// Danh sách nhân đôi để chạy vòng liên tục; khách bật "giảm chuyển động" thì thành hàng vuốt tay.
const photos = Array.from({ length: 9 }, (_, index) => ({
  src: `/images/about/ban-giao-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Lưu Hoàng Phúc bàn giao xe Mitsubishi cho khách hàng – ảnh ${index + 1}`,
}));

export default function HandoverStrip() {
  return (
    <div className="marquee group relative overflow-hidden">
      <div className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused] sm:gap-4">
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            aria-hidden={index >= photos.length}
            className="relative h-48 w-40 shrink-0 overflow-hidden rounded-2xl bg-gray-200 sm:h-64 sm:w-52"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 208px, 160px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />
    </div>
  );
}
