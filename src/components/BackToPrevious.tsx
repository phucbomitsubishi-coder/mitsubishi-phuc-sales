"use client";

import { useRouter } from "next/navigation";

export default function BackToPrevious() {
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
      className="mb-4 inline-block cursor-pointer font-semibold text-red-600 transition hover:text-red-700 md:mb-8"
    >
      ← Quay lại
    </button>
  );
}