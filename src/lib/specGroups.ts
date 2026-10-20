import type { CarVariant } from "@/data/cars";

export type Spec = NonNullable<CarVariant["specifications"]>;
export type SpecRow = { key: keyof Spec; label: string; format?: (value: string | number) => string };

// Nhóm và thứ tự dòng theo bảng thông số trên trang MMV
export const specGroups: { title: string; rows: SpecRow[] }[] = [
  {
    title: "Kích thước & trọng lượng",
    rows: [
      { key: "dimensions", label: "Kích thước D × R × C" },
      { key: "wheelbase", label: "Chiều dài cơ sở" },
      { key: "frontTrack", label: "Khoảng cách hai bánh trước" },
      { key: "rearTrack", label: "Khoảng cách hai bánh sau" },
      { key: "groundClearance", label: "Khoảng sáng gầm" },
      { key: "turningRadius", label: "Bán kính quay vòng tối thiểu" },
      { key: "curbWeight", label: "Trọng lượng không tải" },
      { key: "seats", label: "Số chỗ ngồi", format: (value) => `${value} chỗ` },
      { key: "fuelTank", label: "Dung tích bình nhiên liệu" },
    ],
  },
  {
    title: "Động cơ & nhiên liệu",
    rows: [
      { key: "engine", label: "Động cơ" },
      { key: "displacement", label: "Dung tích xi lanh" },
      { key: "power", label: "Công suất cực đại" },
      { key: "torque", label: "Mô-men xoắn cực đại" },
      { key: "fuel", label: "Nhiên liệu" },
      { key: "fuelConsumptionCombined", label: "Tiêu hao nhiên liệu kết hợp" },
      { key: "fuelConsumptionUrban", label: "Tiêu hao trong đô thị" },
      { key: "fuelConsumptionExtraUrban", label: "Tiêu hao ngoài đô thị" },
    ],
  },
  {
    title: "Truyền động, khung gầm & phanh",
    rows: [
      { key: "transmission", label: "Hộp số" },
      { key: "drivetrain", label: "Dẫn động" },
      { key: "rearDiffLock", label: "Khóa vi sai cầu sau" },
      { key: "steering", label: "Trợ lực lái" },
      { key: "frontSuspension", label: "Treo trước" },
      { key: "rearSuspension", label: "Treo sau" },
      { key: "wheels", label: "Lốp và mâm xe" },
      { key: "frontBrakes", label: "Phanh trước" },
      { key: "rearBrakes", label: "Phanh sau" },
    ],
  },
];
