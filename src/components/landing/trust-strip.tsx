import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";

interface TrustStripProps {
  content: SiteContent["trustPoints"];
}

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto grid grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
        {content.map((point) => (
          <div key={point.title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <DynamicIcon name={point.icon} className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-blue-950 dark:text-white">
                {point.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
