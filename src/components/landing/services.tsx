import Link from "next/link";
import Image from "next/image";

import { cloudinaryUrl } from "@/lib/cloudinary-url";
import type { SiteContent } from "@/lib/content-types";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {content.items.map((service) => {
          return (
            <div
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xs transition-all hover:-translate-y-1 hover:border-blue-600/20 hover:shadow-lg"
            >
              {service.imagePublicId ? (
                <div className="relative h-62 w-full shrink-0">
                  <Image
                    src={cloudinaryUrl(
                      service.imagePublicId,
                      "f_auto,q_auto,w_900,h_650,c_fill,g_auto",
                    )}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-center"
                  />
                </div>
              ) : (
                <div className="h-50 w-full shrink-0 bg-blue-100 transition-colors group-hover:bg-blue-100/70 dark:bg-blue-900/30" />
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="text-base font-semibold text-blue-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto w-fit gap-1.5 rounded-full border-blue-950/15 text-blue-950 transition-colors group-hover:border-blue-600/40 group-hover:bg-blue-50 group-hover:text-blue-700 dark:text-white dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300"
                  render={
                    <Link
                      href={`/?service=${encodeURIComponent(service.title)}#how-it-works`}
                    />
                  }
                  nativeButton={false}
                >
                  Request This Service
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
