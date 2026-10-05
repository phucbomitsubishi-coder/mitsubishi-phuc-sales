import Image from "next/image";

const promotionCars = [
  {
    name: "Xpander",
    image: "/images/news/xpander.png",
    width: 1000,
    height: 500,
  },
  {
    name: "Xforce",
    image: "/images/news/xforce.png",
    width: 1000,
    height: 500,
  },
  {
    name: "Destinator",
    image: "/images/news/destinator.png",
    width: 1600,
    height: 708,
  },
  {
    name: "Triton",
    image: "/images/news/triton.png",
    width: 1000,
    height: 500,
  },
];

export default function NewsPromotionCover() {
  return (
    <div
  className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
  style={{ fontFamily: "var(--font-be-vietnam-pro)" }}
>
      {/* Red accent */}
      <div className="h-2 w-full bg-red-600" />

      {/* Heading */}
      <div className="relative px-6 pb-4 pt-8 text-center sm:px-10 sm:pt-10">
       <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-600 sm:text-sm sm:tracking-[0.28em]">
  Ưu đãi tháng {new Intl.DateTimeFormat("en-GB", {
  month: "2-digit",
  year: "numeric",
  timeZone: "Asia/Ho_Chi_Minh",
}).format(new Date())}
</p>

<h2 className="mt-3 text-[27px] font-extrabold tracking-[0.02em] text-gray-950 sm:text-4xl sm:tracking-[0.04em] lg:text-[46px]">
  MITSUBISHI MOTORS
</h2>

<div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-red-600 sm:mt-4 sm:w-14" />

<p className="mx-auto mt-4 max-w-[310px] text-sm font-medium leading-6 text-gray-600 sm:max-w-none sm:text-lg">
  Ưu đãi phí trước bạ
  <span className="ml-1 font-semibold text-red-600 sm:ml-2">
    • Nhiều quà tặng hấp dẫn
  </span>
</p>
      </div>

      {/* Car lineup */}
      <div className="relative mx-auto max-w-6xl px-4 pb-3 pt-3 sm:px-8">
        <div className="absolute bottom-8 left-[5%] right-[5%] h-16 rounded-[50%] bg-gray-200/60 blur-2xl" />

        <div className="relative grid grid-cols-2 items-end gap-x-1 gap-y-2 sm:grid-cols-4 sm:gap-0">
          {promotionCars.map((car) => (
            <div
              key={car.name}
              className="flex flex-col items-center justify-end"
            >
              <div className="flex h-28 w-full items-end justify-center sm:h-36 lg:h-44">
                <Image
                  src={car.image}
                  alt={`Mitsubishi ${car.name}`}
                  width={car.width}
                  height={car.height}
                  loading="eager"
                  className="max-h-full w-full object-contain"
                />
              </div>

              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-700 sm:text-sm">
                {car.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="mx-6 mb-7 mt-3 border-t border-gray-200 pt-5 text-center sm:mx-10">
        <p className="text-sm leading-6 text-gray-600">
          Mức ưu đãi và điều kiện áp dụng tùy từng mẫu xe, phiên bản
          và thời điểm thực tế.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="grid grid-cols-3 bg-gray-950 text-center text-[10px] font-bold uppercase tracking-wide text-white sm:text-sm">
        <div className="px-2 py-4">
          Đa dạng mẫu xe
        </div>

        <div className="border-x border-white/20 px-2 py-4 text-red-400">
          Tư vấn giá lăn bánh
        </div>

        <div className="px-2 py-4">
          Hỗ trợ trả góp
        </div>
      </div>
    </div>
  );
}