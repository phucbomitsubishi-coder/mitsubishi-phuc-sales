"use client";

import { useRouter } from "next/navigation";

// className: đổi màu khi đặt trên nền tối (mặc định chữ đỏ trên nền sáng)
export default function BackToPrevious({ className = "mb-4 text-red-600 hover:text-red-700 md:mb-8" }: { className?: string }) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#san-pham");
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-block cursor-pointer font-semibold transition ${className}`}
    >
      ← Quay lại
    </button>
  );
}