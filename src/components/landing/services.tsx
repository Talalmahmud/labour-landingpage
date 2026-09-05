import Link from "next/link";
import Image from "next/image";

import { cloudinaryUrl } from "@/lib/cloudinary-url";
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

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {content.items.map((service) => {
          const isMoreServices = service.title === "More Services";
          const card = (
            <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background text-center shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
              {service.imagePublicId ? (
                <div className="relative h-50 w-full shrink-0">
                  <Image
                    src={cloudinaryUrl(
                      service.imagePublicId,
                      "f_auto,q_auto,w_900,h_600,c_fill,g_auto",
                    )}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-50 w-full shrink-0 bg-blue-100 transition-colors group-hover:bg-blue-100/70 dark:bg-blue-900/30" />
              )}
              <div className="flex flex-col gap-1 p-5">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {service.title}
                </p>
                <p className="text-xs text-muted-foreground">
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
