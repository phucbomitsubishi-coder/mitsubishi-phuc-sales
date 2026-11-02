// Biểu tượng Zalo (khung chat bo tròn, chữ "Zalo"), vẽ bằng SVG để không phải tải ảnh (01/11/2026).
// variant "solid": khung xanh Zalo, chữ trắng (dùng trên nền sáng/tối); "white": khung trắng, chữ xanh (dùng trên nút xanh).
export default function ZaloIcon({ className = "h-5 w-5", variant = "solid" }: { className?: string; variant?: "solid" | "white" }) {
  const bubble = variant === "white" ? "#ffffff" : "#0068FF";
  const text = variant === "white" ? "#0068FF" : "#ffffff";
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className}>
      <path d="M10 4h28a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H18l-9 6v-6.5A8 8 0 0 1 2 32V12a8 8 0 0 1 8-8z" fill={bubble} />
      {/* Chặn kiểu chữ in hoa, giãn chữ của nút bên ngoài để biểu tượng luôn ghi "Zalo" */}
      <text x="24" y="27.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="14" fill={text} style={{ textTransform: "none", letterSpacing: 0 }}>
        Zalo
      </text>
    </svg>
  );
}
