"use client";

import { useState } from "react";

export default function MoveoEcosystem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-6 py-6 sm:py-8">
      {/* NÚT MỞ / ĐÓNG */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group w-full rounded-2xl border border-gray-200 bg-white px-6 py-6 text-left shadow-sm transition hover:border-red-200 hover:shadow-md sm:px-8"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="font-semibold uppercase tracking-wider text-red-600">
              Hệ sinh thái Moveo Auto
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Khám phá các lĩnh vực hoạt động
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-gray-600">
              Tìm hiểu thêm về các lĩnh vực phát triển trong hệ sinh thái
              Moveo Auto.
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

      {/* NỘI DUNG CÂY */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "mt-8 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* GỐC CÂY */}
          <div className="flex justify-center">
            <div className="rounded-xl bg-black px-8 py-4 text-center text-lg font-bold text-white">
              MOVEO AUTO
            </div>
          </div>

          {/* ĐƯỜNG NỐI DỌC */}
          <div className="mx-auto h-8 w-px bg-gray-300" />

          {/* 3 NHÁNH */}
          <div className="relative">
            <div className="absolute left-[16.66%] right-[16.66%] top-0 hidden h-px bg-gray-300 md:block" />

            <div className="grid gap-5 md:grid-cols-3">
              <div className="relative pt-5">
                <div className="absolute left-1/2 top-0 hidden h-5 w-px -translate-x-1/2 bg-gray-300 md:block" />

                <div className="h-full rounded-2xl bg-gray-50 p-7">
                  <div className="text-3xl font-bold text-red-600">01</div>

                  <h3 className="mt-4 text-xl font-bold">
                    Kinh doanh ô tô
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Phát triển hệ thống kinh doanh và dịch vụ ô tô với nhiều
                    đơn vị trong hệ sinh thái Moveo.
                  </p>
                </div>
              </div>

              <div className="relative pt-5">
                <div className="absolute left-1/2 top-0 hidden h-5 w-px -translate-x-1/2 bg-gray-300 md:block" />

                <div className="h-full rounded-2xl bg-gray-50 p-7">
                  <div className="text-3xl font-bold text-red-600">02</div>

                  <h3 className="mt-4 text-xl font-bold">
                    Phân phối lốp xe
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Mở rộng hoạt động sang lĩnh vực phân phối sản phẩm lốp
                    phục vụ nhu cầu vận hành và chăm sóc phương tiện.
                  </p>
                </div>
              </div>

              <div className="relative pt-5">
                <div className="absolute left-1/2 top-0 hidden h-5 w-px -translate-x-1/2 bg-gray-300 md:block" />

                <div className="h-full rounded-2xl bg-gray-50 p-7">
                  <div className="text-3xl font-bold text-red-600">03</div>

                  <h3 className="mt-4 text-xl font-bold">
                    Đào tạo lái xe
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Phát triển hoạt động đào tạo lái xe, mở rộng hệ sinh thái
                    dịch vụ gắn với nhu cầu sử dụng ô tô.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Nhấn lại vào tiêu đề phía trên để thu gọn nội dung.
          </p>
        </div>
      </div>
    </section>
  );
}