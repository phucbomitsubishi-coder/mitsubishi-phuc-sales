import type { BankPackage } from "@/data/financing";

// Bảng gói vay ngân hàng đối tác (dữ liệu src/data/financing.ts). Dùng ở /du-toan/tra-gop (xe mới + xe cũ)
// và trang chi tiết xe cũ. Điện thoại: mỗi ngân hàng 1 khối dọc; máy tính: bảng.
const rate = (value: number) => `${value.toLocaleString("vi-VN")}%`;

export default function BankRateTable({ packages, caption }: { packages: BankPackage[]; caption: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-gray-950">{caption}</p>

      <div className="mt-3 hidden overflow-x-auto md:block" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th scope="col" className="px-3 py-2 font-bold">Ngân hàng</th>
              <th scope="col" className="px-3 py-2 font-bold">Lãi suất cố định</th>
              <th scope="col" className="px-3 py-2 font-bold">Vay tối đa</th>
              <th scope="col" className="px-3 py-2 font-bold">Thời hạn tối đa</th>
              <th scope="col" className="px-3 py-2 font-bold">Sau ưu đãi</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => (
              <tr key={item.bank} className="border-b border-gray-200 align-top">
                <th scope="row" className="px-3 py-3 font-bold text-gray-950">{item.bank}</th>
                <td className="px-3 py-3 text-gray-700">
                  {item.fixed.map((fixed) => (
                    <span key={fixed.months} className="block">
                      <strong className="text-gray-950">{rate(fixed.ratePercent)}</strong>/năm, {fixed.months} tháng
                    </span>
                  ))}
                  {item.note && <span className="mt-1 block text-xs leading-5 text-gray-600">{item.note}</span>}
                </td>
                <td className="px-3 py-3 text-gray-700">{item.maxLoanPercent} giá xe</td>
                <td className="px-3 py-3 text-gray-700">{item.maxTermMonths / 12} năm</td>
                <td className="px-3 py-3 text-gray-700">Lãi tham chiếu + {item.marginPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 space-y-3 md:hidden">
        {packages.map((item) => (
          <div key={item.bank} className="border border-gray-200 bg-white p-4 text-sm">
            <p className="font-bold text-gray-950">{item.bank}</p>
            <ul className="mt-2 space-y-1 text-gray-700">
              {item.fixed.map((fixed) => (
                <li key={fixed.months}>
                  Cố định {fixed.months} tháng: <strong className="text-gray-950">{rate(fixed.ratePercent)}</strong>/năm
                </li>
              ))}
              <li>Vay tối đa {item.maxLoanPercent} giá xe, tối đa {item.maxTermMonths / 12} năm</li>
              <li>Sau ưu đãi: lãi tham chiếu + {item.marginPercent}%</li>
            </ul>
            {item.note && <p className="mt-2 text-xs leading-5 text-gray-600">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
