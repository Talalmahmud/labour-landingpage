import { RequestForm } from "@/components/landing/request-form";
import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LabourRequestPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white px-6 py-16 text-center dark:from-background dark:via-background dark:to-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-24 size-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/10" />
            <div className="absolute top-1/3 right-0 size-80 rounded-full bg-amber-100/50 blur-3xl dark:bg-amber-900/10" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
              {content.labourRequestPage.heading}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {content.labourRequestPage.subheading}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-4">
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {content.requestSection.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border p-5 text-center"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-blue-950 dark:text-white">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-12">
          <RequestForm
            content={content.requestSection}
            services={content.services.items}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 shadow-xs sm:p-8"
          />
        </section>
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
