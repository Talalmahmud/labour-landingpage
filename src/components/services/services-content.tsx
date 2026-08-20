import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { SiteContent } from "@/lib/content-types";

interface ServicesContentProps {
  page: SiteContent["servicesPage"];
  services: SiteContent["services"]["items"];
}

export function ServicesContent({ page, services }: ServicesContentProps) {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
            {page.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{page.subheading}</p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">{page.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            return (
              <div
                key={service.title}
                className="flex flex-col gap-3 rounded-2xl border border-border p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <DynamicIcon name={service.icon} className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-blue-950 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto w-fit"
                  render={<Link href={`/?service=${encodeURIComponent(service.title)}#how-it-works`} />}
                  nativeButton={false}
                >
                  Request This Service
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
