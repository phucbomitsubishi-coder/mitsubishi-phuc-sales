import type { ReactNode } from "react";
import type { CarVariant } from "@/data/cars";

type Props = {
  title: string;
  variant: CarVariant;
};

// Thứ tự và tên nhóm trang bị (key trong CarVariant.equipment)
const equipmentGroups: { key: keyof NonNullable<CarVariant["equipment"]>; title: string }[] = [
  { key: "exterior", title: "Ngoại thất" },
  { key: "interior", title: "Nội thất" },
  { key: "convenience", title: "Tiện nghi" },
  { key: "safety", title: "An toàn" },
  { key: "drivingSupport", title: "Vận hành và hỗ trợ lái" },
];

type Technology = NonNullable<CarVariant["safetyTechnologies"]>[number];

// Mỗi nhóm là 1 <details> thu gọn: nội dung vẫn có trong HTML (Google đọc được), trang ngắn hơn
function Group({
  title,
  count,
  note,
  children,
}: {
  title: string;
  count: number;
  note?: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border-2 border-gray-200 bg-white open:border-red-600">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="font-bold text-gray-900">{title}</span>
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
            {count}
          </span>
          {note && <span className="mt-0.5 block text-sm text-gray-600">{note}</span>}
        </span>
        <span className="shrink-0 text-red-600 transition-transform group-open:rotate-180">▼</span>
      </summary>
      <div className="border-t border-gray-200 px-4 pb-4 pt-3">{children}</div>
    </details>
  );
}

function TechnologyList({ items, codeClassName }: { items: Technology[]; codeClassName: string }) {
  return (
    <ul className="space-y-3">
      {items.map((technology) => (
        <li key={technology.code} className="flex gap-3 text-sm">
          <span className={`w-14 shrink-0 font-bold ${codeClassName}`}>{technology.code}</span>
          <span>
            <span className="font-semibold text-gray-900">{technology.name}</span>
            {technology.description && (
              <span className="mt-0.5 block leading-6 text-gray-600">{technology.description}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function EquipmentList({ title, variant }: Props) {
  const groups = equipmentGroups
    .map((group) => ({ ...group, items: variant.equipment?.[group.key] ?? [] }))
    .filter((group) => group.items.length > 0);
  const technologies = variant.safetyTechnologies ?? [];
  const basic = technologies.filter((technology) => technology.group !== "Diamond Sense");
  const diamondSense = technologies.filter((technology) => technology.group === "Diamond Sense");

  if (groups.length === 0 && technologies.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Trang bị phiên bản</p>
      <h4 className="mt-2 text-2xl font-bold">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">Bấm vào từng nhóm để xem chi tiết.</p>

      <div className="mt-5 grid gap-3">
        {groups.map((group) => (
          <Group key={group.key} title={group.title} count={group.items.length}>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-gray-700">
                  <span className="font-bold text-red-600" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Group>
        ))}

        {basic.length > 0 && (
          <Group
            title="Hệ thống an toàn"
            count={basic.length}
            note={basic.map((technology) => technology.code).join(" · ")}
          >
            <TechnologyList items={basic} codeClassName="text-gray-900" />
          </Group>
        )}

        {diamondSense.length > 0 && (
          <Group
            title="Diamond Sense"
            count={diamondSense.length}
            note="Hệ thống an toàn chủ động thông minh"
          >
            <TechnologyList items={diamondSense} codeClassName="text-red-700" />
          </Group>
        )}
      </div>
    </div>
  );
}
