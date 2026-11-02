import ZaloIcon from "@/components/ZaloIcon";
type MobileContactBarProps = {
  zaloUrl: string;
  phoneUrl: string;
};

export default function MobileContactBar({
  zaloUrl,
  phoneUrl,
}: MobileContactBarProps) {
  return (
    <div className="mobile-contact-bar fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-3 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 rounded border border-blue-600 bg-white px-4 py-3 font-semibold text-blue-600 items-center justify-center gap-2"
        >
                <ZaloIcon className="h-5 w-5 shrink-0" />
          Zalo
        </a>

        <a
          href={phoneUrl}
          className="flex-1 rounded bg-red-600 px-4 py-3 text-center font-semibold text-white"
        >
          Gọi ngay
        </a>
      </div>
    </div>
  );
}