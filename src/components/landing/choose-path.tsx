import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";

interface ChoosePathProps {
  content: SiteContent["choosePath"];
}

export function ChoosePath({ content }: ChoosePathProps) {
  const cards = [
    { ...content.hireLabour, href: "/find-labour", key: "hire" },
    { ...content.becomeLabour, href: "/become-labour", key: "become" },
  ];

  return (
    <section className="mx-auto px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-blue-950 sm:text-3xl dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{content.subheading}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.key}
            className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-8 shadow-xs transition-all hover:-translate-y-1 hover:border-blue-600/20 hover:shadow-lg"
          >
            <span className="flex size-13 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition-colors duration-300 group-hover:bg-blue-950 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400">
              <DynamicIcon name={card.icon} className="size-6" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-blue-950 dark:text-white">
                {card.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
            <Button
              className="mt-auto w-fit gap-2 rounded-full bg-blue-950 text-white hover:bg-blue-900"
              render={<Link href={card.href} />}
              nativeButton={false}
            >
              {card.buttonLabel}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
