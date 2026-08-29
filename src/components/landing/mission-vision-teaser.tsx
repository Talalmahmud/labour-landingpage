import Link from "next/link";
import { Compass, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content-types";

interface MissionVisionTeaserProps {
  content: SiteContent["missionVision"];
}

export function MissionVisionTeaser({ content }: MissionVisionTeaserProps) {
  return (
    <section className="mx-auto px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-blue-950 sm:text-3xl dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.subheading}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 shadow-xs">
          <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Target className="size-5" />
          </span>
          <p className="font-heading text-lg font-bold text-blue-950 dark:text-white">
            {content.missionTitle}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {content.missionText}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 shadow-xs">
          <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Compass className="size-5" />
          </span>
          <p className="font-heading text-lg font-bold text-blue-950 dark:text-white">
            {content.visionTitle}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {content.visionText}
          </p>
        </div>
      </div>

      {/* <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="gap-2 border-blue-950/15 text-blue-950 dark:text-white"
          render={<Link href="/mission-vision" />}
          nativeButton={false}
        >
          Learn More
          <span aria-hidden>→</span>
        </Button>
      </div> */}
    </section>
  );
}
