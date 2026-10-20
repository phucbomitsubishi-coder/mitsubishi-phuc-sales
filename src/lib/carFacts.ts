import type { Car, CarVariant } from "@/data/cars";

// Số liệu tóm tắt của một dòng xe, tính từ thông số từng phiên bản trong cars.ts
// (đã đối chiếu trang MMV). Dùng cho hàng số liệu nhanh và câu hỏi thường gặp trên trang xe.

type Group = { value: string; names: string[] };

// Gom các phiên bản có cùng giá trị: [{ value: "6 túi khí", names: ["Luxury", "Ultimate"] }]
function groupBy(variants: CarVariant[], pick: (variant: CarVariant) => string | undefined): Group[] {
  const groups: Group[] = [];
  for (const variant of variants) {
    const value = pick(variant)?.trim();
    if (!value) continue;
    const found = groups.find((group) => group.value === value);
    if (found) found.names.push(variant.name);
    else groups.push({ value, names: [variant.name] });
  }
  return groups;
}

function joinNames(names: string[]) {
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} và ${names[names.length - 1]}` : names[0];
}

// "GLX: 4 túi khí; Luxury và Ultimate: 6 túi khí", hoặc chỉ giá trị nếu mọi phiên bản giống nhau
function describe(groups: Group[]) {
  if (groups.length === 1) return groups[0].value;
  return groups.map((group) => `${joinNames(group.names)}: ${group.value}`).join("; ");
}

function firstNumber(text?: string) {
  const match = text?.replace(/\./g, "").replace(",", ".").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

// Khoảng giá trị số: "219–222 mm", "184–204 PS"
function range(values: (number | undefined)[], unit: string, digits = 0) {
  const nums = values.filter((value): value is number => value !== undefined);
  if (nums.length === 0) return undefined;
  const format = (value: number) => value.toLocaleString("vi-VN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  return min === max ? `${format(min)} ${unit}` : `${format(min)}–${format(max)} ${unit}`;
}

function airbags(variant: CarVariant) {
  return variant.equipment?.safety?.find((item) => /túi khí/i.test(item));
}

export function getCarFacts(car: Car) {
  const variants = car.variants;
  const spec = (variant: CarVariant) => variant.specifications ?? {};
  const seats = spec(variants[0]).seats ?? car.specifications.seats;
  const fuel = spec(variants[0]).fuel ?? car.specifications.fuel;

  const stats = [
    seats && { label: "Số chỗ", value: `${seats} chỗ` },
    { label: "Khoảng sáng gầm", value: range(variants.map((v) => firstNumber(spec(v).groundClearance)), "mm") },
    {
      label: "Động cơ",
      value: [spec(variants[0]).displacement, range(variants.map((v) => firstNumber(spec(v).power)), "PS")]
        .filter(Boolean)
        .join(", "),
    },
    variants.some((v) => spec(v).fuelConsumptionCombined)
      ? { label: "Tiêu hao hỗn hợp", value: range(variants.map((v) => firstNumber(spec(v).fuelConsumptionCombined)), "L/100 km", 2) }
      : { label: "Hộp số", value: groupBy(variants, (v) => spec(v).transmission)[0]?.value },
  ].filter((item): item is { label: string; value: string } => !!item && !!item.value);

  return {
    seats,
    fuel,
    stats,
    engine: describe(groupBy(variants, (v) => [spec(v).engine, spec(v).power, spec(v).torque].filter(Boolean).join(", "))),
    transmission: describe(groupBy(variants, (v) => [spec(v).transmission, spec(v).drivetrain].filter(Boolean).join(", "))),
    dimensions: describe(groupBy(variants, (v) => spec(v).dimensions)),
    groundClearance: describe(groupBy(variants, (v) => spec(v).groundClearance)),
    fuelConsumption: describe(groupBy(variants, (v) => spec(v).fuelConsumptionCombined)),
    airbags: describe(groupBy(variants, airbags)),
  };
}
