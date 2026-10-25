"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type FinderCar = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  image: string;
  seats: number;
  minPrice: number;
  priceLabel: string;
};

// "Chọn xe giúp tôi" (25/10/2026, kiểu Volvo/Audi): 3 câu hỏi → gợi ý 2 xe hợp nhất, kèm nút xem xe và báo giá.
// Nhu cầu hợp với từng xe ghi tay theo đặc điểm xe (cars.ts); số chỗ và giá lấy từ dữ liệu xe nên tự đúng khi đổi giá.
// Xe mới chưa có trong usesByCar vẫn được gợi ý theo số chỗ và ngân sách.
const usesByCar: Record<string, string[]> = {
  attrage: ["city", "service"],
  xforce: ["city", "trip"],
  xpander: ["family", "service"],
  "xpander-cross": ["family", "trip"],
  destinator: ["family", "trip", "rough"],
  triton: ["rough", "cargo"],
};

const seatOptions = [
  { value: "5", label: "5 chỗ" },
  { value: "7", label: "7 chỗ" },
  { value: "any", label: "Chưa chắc" },
];
const budgetOptions = [
  { value: "600", label: "Dưới 600 triệu", max: 600e6 },
  { value: "750", label: "600 – 750 triệu", max: 750e6 },
  { value: "900", label: "750 – 900 triệu", max: 900e6 },
  { value: "max", label: "Trên 900 triệu", max: Infinity },
];
const useOptions = [
  { value: "city", label: "Đi phố, đi làm hằng ngày" },
  { value: "family", label: "Gia đình đông người" },
  { value: "trip", label: "Hay đi tỉnh, đi xa" },
  { value: "rough", label: "Đường xấu, đồi núi" },
  { value: "cargo", label: "Chở hàng, công trình" },
  { value: "service", label: "Chạy dịch vụ" },
];

function score(car: FinderCar, seats: string, budget: string, use: string) {
  let points = 0;
  if (seats !== "any") points += car.seats >= Number(seats) && (seats === "7" || car.seats < 7) ? 3 : -3;
  const max = budgetOptions.find((option) => option.value === budget)?.max ?? Infinity;
  if (car.minPrice <= max) points += 2;
  else if (car.minPrice <= max * 1.1) points += 0;
  else points -= 3;
  if (usesByCar[car.id]?.includes(use)) points += 3;
  return points;
}

type Question = { key: "seats" | "budget" | "use"; title: string; options: { value: string; label: string }[] };
const questions: Question[] = [
  { key: "seats", title: "1. Cần xe mấy chỗ?", options: seatOptions },
  { key: "budget", title: "2. Ngân sách dự kiến (giá xe)?", options: budgetOptions },
  { key: "use", title: "3. Dùng xe chủ yếu để làm gì?", options: useOptions },
];

export default function CarFinder({ cars }: { cars: FinderCar[] }) {
  const [answers, setAnswers] = useState({ seats: "", budget: "", use: "" });
  const done = answers.seats && answers.budget && answers.use;
  const ranked = done
    ? [...cars]
        .map((car) => ({ car, points: score(car, answers.seats, answers.budget, answers.use) }))
        .sort((a, b) => b.points - a.points || a.car.minPrice - b.car.minPrice)
    : [];
  // Ưu tiên xe đúng nhu cầu sử dụng: chỉ 1 xe đúng (vd chở hàng → Triton) thì chỉ gợi ý 1, không chèn xe lệch nhu cầu
  const matching = ranked.filter(({ car }) => usesByCar[car.id]?.includes(answers.use));
  const results = (matching.length > 0 ? matching : ranked).slice(0, 2);

  return (
    <section id="chon-xe" className="scroll-mt-28 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Chưa biết chọn xe nào?</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Chọn xe giúp tôi</h2>
        <p className="mt-3 max-w-2xl leading-7 text-gray-700">Trả lời 3 câu hỏi, web gợi ý mẫu xe phù hợp nhất. Gợi ý chỉ để tham khảo, Phúc tư vấn kỹ hơn khi bạn nhận báo giá.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {questions.map((question) => (
            <fieldset key={question.key} className="border border-gray-300 bg-white p-5">
              <legend className="px-1 text-sm font-black uppercase tracking-wide">{question.title}</legend>
              <div className="mt-2 grid gap-2">
                {question.options.map((option) => {
                  const active = answers[question.key] === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`cursor-pointer border px-4 py-2.5 text-sm font-semibold transition ${
                        active ? "border-gray-950 bg-gray-950 text-white" : "border-gray-300 text-gray-800 hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`finder-${question.key}`}
                        value={option.value}
                        checked={active}
                        onChange={() => setAnswers((current) => ({ ...current, [question.key]: option.value }))}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div aria-live="polite">
          {done ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {results.map(({ car }, index) => (
                <article key={car.id} className="flex flex-col border border-gray-300 bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">{index === 0 ? "Gợi ý phù hợp" : "Lựa chọn khác"}</p>
                  <div className="relative mt-3 aspect-[16/7]">
                    <Image src={car.image} alt={car.name} fill sizes="(min-width: 768px) 560px, 90vw" className="object-contain" />
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight">{car.shortName}</h3>
                  <p className="mt-1 text-gray-700">{car.seats} chỗ · Giá từ {car.priceLabel}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/xe/${car.slug}`} className="bg-gray-950 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-600">
                      Xem xe
                    </Link>
                    <Link
                      href={`/?car=${encodeURIComponent(car.name)}&nguon=Chon-xe#bao-gia`}
                      className="border-2 border-gray-950 px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-gray-950 hover:text-white"
                    >
                      Nhận báo giá
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-600">Chọn đủ 3 câu để xem gợi ý.</p>
          )}
        </div>
      </div>
    </section>
  );
}
