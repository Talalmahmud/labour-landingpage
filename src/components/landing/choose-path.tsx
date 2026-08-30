import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

interface ChoosePathProps {
  content: SiteContent["choosePath"];
}

const THEMES = [
  {
    cardBg:
      "bg-linear-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background",
    hoverRing: "hover:border-blue-400/50 hover:shadow-blue-500/20",
    blob: "bg-blue-400/40",
    iconWrap:
      "bg-linear-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30",
    button:
      "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-blue-600",
  },
  {
    cardBg:
      "bg-linear-to-br from-amber-50 to-white dark:from-amber-950/10 dark:to-background",
    hoverRing: "hover:border-amber-400/50 hover:shadow-amber-500/20",
    blob: "bg-amber-400/40",
    iconWrap:
      "bg-linear-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30",
    button:
      "bg-linear-to-r from-amber-400 to-orange-500 text-blue-950 shadow-lg shadow-amber-500/30 hover:from-amber-300 hover:to-orange-400",
  },
];

export function ChoosePath({ content }: ChoosePathProps) {
  const cards = [
    { ...content.hireLabour, href: "/find-labour", key: "hire" },
    { ...content.becomeLabour, href: "/become-labour", key: "become" },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/4 size-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/10" />
        <div className="absolute -bottom-24 right-1/4 size-80 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-900/10" />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-blue-950 sm:text-3xl dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.subheading}
        </p>
      </div>

      <div className="relative mt-10 grid  grid-cols-1 gap-6 sm:grid-cols-2">
        {cards.map((card, i) => {
          const theme = THEMES[i % THEMES.length];
          return (
            <div
              key={card.key}
              className={cn(
                "group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                theme.cardBg,
                theme.hoverRing,
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-10 -right-10 size-40 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100",
                  theme.blob,
                )}
              />

              <span
                className={cn(
                  "relative flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                  theme.iconWrap,
                )}
              >
                <DynamicIcon name={card.icon} className="size-7" />
              </span>

              <div className="relative">
                <p className="font-heading text-xl font-bold text-blue-950 dark:text-white">
                  {card.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>

              <Button
                className={cn(
                  "relative mt-auto w-fit gap-2 rounded-full border-0 transition-all hover:-translate-y-0.5",
                  theme.button,
                )}
                render={<Link href={card.href} />}
                nativeButton={false}
              >
                {card.buttonLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
