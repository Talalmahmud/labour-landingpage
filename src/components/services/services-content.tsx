import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import type { SiteContent } from "@/lib/content-types";

interface ServicesContentProps {
  page: SiteContent["servicesPage"];
  services: SiteContent["services"]["items"];
}

export function ServicesContent({ page, services }: ServicesContentProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white px-6 py-20 text-center dark:from-background dark:via-background dark:to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 left-1/4 size-80 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/10" />
          <div className="absolute top-1/2 right-1/4 size-72 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/10" />
        </div>

        <div className="relative px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-white/10 dark:bg-blue-900/30 dark:text-blue-300">
            <Sparkles className="size-3.5" />
            {services.length}+ Services Available
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-balance text-blue-950 sm:text-4xl dark:text-white">
            {page.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {page.subheading}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            {page.intro}
          </p>
        </div>
      </section>

      <section className=" px-6 pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            return (
              <div
                key={service.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xs transition-all hover:-translate-y-1 hover:border-blue-600/20 hover:shadow-lg"
              >
                {service.imagePublicId ? (
                  <div className="relative h-50 w-full shrink-0">
                    <Image
                      src={cloudinaryUrl(
                        service.imagePublicId,
                        "f_auto,q_auto,w_480,h_400,c_fill,g_auto",
                      )}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
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

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 px-8 py-12 text-center sm:px-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-16 size-64 rounded-full bg-blue-800/40 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-64 rounded-full bg-blue-800/40 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Can&apos;t find what you need?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/75">
              Submit a custom request and we&apos;ll match you with the right
              skilled worker for the job.
            </p>
            <Button
              size="lg"
              className="mt-6 gap-2 rounded-full bg-white px-6 text-blue-950 hover:bg-white/90"
              render={<Link href="/#how-it-works" />}
              nativeButton={false}
            >
              Request Custom Service
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
