"use client";

import { FormEvent, Suspense, useState } from "react";
import { cars } from "@/data/cars";
import { useSearchParams } from "next/navigation";
import PurchaseTimeline, { withTimeline } from "@/components/PurchaseTimeline";
import TestDriveSlot, { slotNote } from "@/components/TestDriveSlot";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import { trackPixel } from "@/lib/metaPixel";
import { siteConfig } from "@/config/site";
import { TEST_DRIVE_SCRIPT_URL as SCRIPT_URL, toLeadSource } from "@/lib/leadScripts";

const carNames: Record<string, string> = {
  triton: "Mitsubishi Triton",
  xforce: "Mitsubishi Xforce",
  destinator: "Mitsubishi Destinator",
  xpander: "Mitsubishi Xpander",
  attrage: "Mitsubishi Attrage",
  "xpander-cross": "Mitsubishi Xpander Cross",
};

function DangKyLaiThuForm() {
  const searchParams = useSearchParams();
  const selectedCar = searchParams.get("xe") || "";
  const leadSource = searchParams.get("nguon") || "Đăng ký lái thử";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = String(formData.get("website") || "").trim();

    if (website) {
      form.reset();
      setIsSubmitting(false);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const carId = String(formData.get("car") || "").trim();
    const note = withTimeline(
      [
        String(formData.get("place") || "").trim(),
        slotNote(String(formData.get("tdDay") || ""), String(formData.get("tdSlot") || "")),
        String(formData.get("note") || "").trim(),
      ].filter(Boolean).join(" | "),
      String(formData.get("timeline") || "").trim()
    );

    if (!name || !phone || !carId) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      setIsSubmitting(false);
      return;
    }
    const normalizedPhone = phone.replace(/[\s.-]/g, "");

    if (!/^0\d{9}$/.test(normalizedPhone)) {
      setErrorMessage(
        "Số điện thoại chưa đúng. Vui lòng nhập 10 số, bắt đầu bằng số 0."
      );
      setIsSubmitting(false);
      return;
    }

    const payload = {
      customerName: name,
      phone: normalizedPhone,
      car: carNames[carId] || carId,
      note,
      source: toLeadSource(leadSource, "Đăng ký lái thử"),
      type: "test-drive",
      website,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi đăng ký.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Không thể gửi đăng ký.");
      }

      trackPixel("Lead", { content_name: "Lai thu" });
      setSuccessMessage(
        "Đăng ký lái thử thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
      );

      form.reset();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Chưa thể gửi đăng ký. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* FORM */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="bg-white p-6 shadow-lg sm:p-10">
          <h2 className="mb-8 text-2xl font-black text-gray-900 tracking-tight">
            Thông tin đăng ký
          </h2>

          {!successMessage ? (
            <form
              onSubmit={handleSubmit}
              className="grid gap-6 sm:grid-cols-2"
            >
              <div
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {/* HỌ TÊN */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Họ và tên *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* SỐ ĐIỆN THOẠI */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Số điện thoại *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="09xx xxx xxx"
                  className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* MẪU XE */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="car"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Mẫu xe muốn lái thử *
                </label>

                <select
                  id="car"
                  name="car"
                  required
                  defaultValue={selectedCar}
                  className="w-full border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                >
                  <option value="" disabled>
                    Chọn mẫu xe
                  </option>

                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* NƠI LÁI THỬ: 3 showroom Phúc tiếp khách hoặc tại nhà (siteConfig.dealer.showrooms) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="place"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nơi lái thử
                </label>

                <select
                  id="place"
                  name="place"
                  defaultValue={`Lái thử tại showroom ${siteConfig.dealer.showrooms[0].short}`}
                  className="w-full border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                >
                  {siteConfig.dealer.showrooms.map((showroom) => (
                    <option key={showroom.short} value={`Lái thử tại showroom ${showroom.short}`}>
                      Showroom {showroom.short}
                    </option>
                  ))}
                  <option value="Lái thử tại nhà">Tại nhà (ghi địa chỉ ở ô ghi chú)</option>
                </select>
              </div>

              <TestDriveSlot ids={{ day: "td-day", slot: "td-slot" }} look="box" fieldClass="w-full border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" />

              <PurchaseTimeline className="sm:col-span-2" />

              {/* GHI CHÚ */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="note"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Ghi chú
                </label>

                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  placeholder="Muốn lái thử tại nhà, vui lòng ghi địa chỉ. Hoặc ghi thời gian cụ thể khác..."
                  className="w-full resize-none border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* THÔNG BÁO */}

              {errorMessage && (
                <div className="border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:col-span-2">
                  {errorMessage}
                </div>
              )}

              {/* BUTTON */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đăng ký lái thử"}
                </button>              </div>
            </form>
          ) : (
            <div className="border border-green-200 bg-green-50 p-6 text-center">
              <div className="text-2xl font-bold text-green-700">
                ✓ Đăng ký lái thử thành công
              </div>
              <p className="mt-3 text-gray-700">
                Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ xác nhận lịch lái thử trong thời gian sớm nhất.
              </p>
              <Link
                href="/"
                className="mx-auto mt-6 hidden w-fit bg-red-600 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-700 md:block"
              >
                ← Quay về trang chủ
              </Link>
            </div>
          )}

          <p className="mt-6 text-sm leading-6 text-gray-500">
            Thông tin của khách hàng được sử dụng để tư vấn và xác nhận nhu cầu
            đăng ký lái thử. Xem{" "}
            <Link href="/chinh-sach-bao-mat" className="underline hover:text-red-700">
              Chính sách bảo mật
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export default function DangKyLaiThuPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-gray-50">
        {/* TIÊU ĐỀ: nằm ngoài Suspense để có sẵn trong HTML (Google đọc được H1 ngay) */}
        <section className="bg-black py-12 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Mitsubishi Motors
            </p>

            <h1 className="text-3xl font-black sm:text-4xl tracking-tight">
              Đăng ký lái thử
            </h1>

            <p className="mt-3 max-w-2xl text-gray-300">
              Trải nghiệm thực tế mẫu xe Mitsubishi bạn quan tâm, tại showroom hoặc
              tại nhà. Vui lòng để lại thông tin, chúng tôi sẽ liên hệ xác nhận lịch
              lái thử.
            </p>
          </div>
        </section>

        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="text-gray-600">
                Đang tải form đăng ký lái thử...
              </p>
            </div>
          }
        >
          <DangKyLaiThuForm />
        </Suspense>
      </main>
    </>
  );
}