import { MapPin } from "lucide-react";

import type { SiteContent } from "@/lib/content-types";

export function MapPreview({ mapPins }: { mapPins: SiteContent["findLabour"]["mapPins"] }) {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGrid)" />
      </svg>
      <div className="absolute top-[30%] left-0 h-10 w-full -rotate-3 bg-slate-200 dark:bg-slate-800" />
      <div className="absolute top-[60%] left-0 h-8 w-full rotate-2 bg-slate-200 dark:bg-slate-800" />
      <div className="absolute top-0 left-[45%] h-full w-8 rotate-6 bg-slate-200 dark:bg-slate-800" />
      <div className="absolute right-0 bottom-0 h-32 w-32 rounded-tl-[6rem] bg-blue-100/70 dark:bg-blue-950/40" />

      <div className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 ring-1 ring-blue-500/30" />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex size-9 items-center justify-center rounded-full bg-blue-950 text-white shadow-md ring-4 ring-white dark:ring-slate-900">
          <MapPin className="size-4 fill-white" />
        </span>
      </div>

      {mapPins.map((pin) => (
        <div
          key={pin.label}
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ top: pin.top, left: pin.left }}
        >
          <MapPin className="size-6 fill-blue-600 text-blue-700 drop-shadow" />
          <span className="-mt-1 rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-blue-950 shadow-xs dark:text-white">
            {pin.label}
          </span>
        </div>
      ))}
    </div>
  );
}
