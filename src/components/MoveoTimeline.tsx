"use client";

import { useState } from "react";

const milestones = [
  {
    year: "2018",
    title: "Moveo Bình Dương",
    description:
      "Một trong những dấu mốc đầu tiên trong quá trình phát triển hệ thống Mitsubishi của Moveo tại Bình Dương.",
  },
  {
    year: "2020",
    title: "Moveo Thuận An",
    description:
      "Tiếp tục mở rộng khả năng tiếp cận và phục vụ khách hàng Mitsubishi trong khu vực.",
  },
  {
    year: "2024",
    title: "Moveo New City",
    description:
      "Tiếp nối quá trình phát triển mạng lưới Mitsubishi Motors của hệ thống Moveo.",
  },
];

export default function MoveoTimeline() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* NÚT MỞ / ĐÓNG */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-6 text-left shadow-sm transition hover:border-red-200 hover:shadow-md sm:px-8"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-semibold uppercase tracking-wider text-red-600">
                Hành trình phát triển
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Moveo Auto – Hành trình phát triển hệ thống
              </h2>

              <p className="mt-2 text-gray-600">
                Khám phá những dấu mốc trong quá trình phát triển của hệ thống
                Moveo.
              </p>
            </div>

            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-3xl font-light text-white transition-transform duration-300 ${
                isOpen ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </div>
        </button>

        {/* TIMELINE */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            isOpen
              ? "mt-8 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {/* ĐƯỜNG THỜI GIAN */}
            <div className="relative grid gap-6 md:grid-cols-3">
              <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gray-300 md:block" />

              {milestones.map((item) => (
                <div key={item.year} className="relative">
                  <div className="relative z-10 mx-auto h-5 w-5 rounded-full border-4 border-white bg-red-600 shadow-sm" />

                  <div className="mt-5 h-full rounded-2xl border border-gray-200 bg-white p-7 text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {item.year}
                    </div>

                    <h3 className="mt-3 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Nhấn lại vào tiêu đề phía trên để thu gọn nội dung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}