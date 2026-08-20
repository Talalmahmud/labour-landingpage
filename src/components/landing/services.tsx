import Link from "next/link";

import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";

interface ServicesProps {
  content: SiteContent["services"];
}

export function Services({ content }: ServicesProps) {
  return (
    <section id="services" className="mx-auto px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-blue-950 sm:text-3xl dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.subheading}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {content.items.map((service) => {
          const isMoreServices = service.title === "More Services";
          const card = (
            <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-950 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400">
                <DynamicIcon name={service.icon} className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {service.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          );

          return isMoreServices ? (
            <Link key={service.title} href="/services">
              {card}
            </Link>
          ) : (
            <div key={service.title}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
