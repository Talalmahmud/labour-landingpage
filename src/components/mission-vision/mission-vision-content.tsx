import { Compass, Target } from "lucide-react";

import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";

interface MissionVisionContentProps {
  content: SiteContent["missionVision"];
}

export function MissionVisionContent({ content }: MissionVisionContentProps) {
  return (
    <>
      <section className="bg-linear-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
            {content.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {content.subheading}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8">
          <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Target className="size-5" />
          </span>
       <h2 className="font-heading text-xl font-bold text-blue-950 dark:text-white">
            {content.missionTitle}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {content.missionText}
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8">
          <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Compass className="size-5" />
          </span>
          <h2 className="font-heading text-xl font-bold text-blue-950 dark:text-white">
            {content.visionTitle}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {content.visionText}
          </p>
        </div>
      </section>

      {content.values.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center font-heading text-xl font-bold text-blue-950 dark:text-white">
            Our Core Values
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {content.values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-border p-6 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                  <DynamicIcon name={value.icon} className="size-5" />
                </span>
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {value.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
