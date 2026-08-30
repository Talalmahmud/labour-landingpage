import { RequestForm } from "@/components/landing/request-form";
import type { SiteContent } from "@/lib/content-types";

interface RequestSectionProps {
  content: SiteContent["requestSection"];
  services: SiteContent["services"]["items"];
}

export function RequestSection({ content, services }: RequestSectionProps) {
  return (
    <section id="how-it-works" className="mx-auto px-6 py-8">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10 lg:grid-cols-5">
        <div className="flex flex-col gap-8 bg-blue-950 p-8 text-white lg:col-span-2 lg:p-10">
          <h2 className="font-heading text-2xl font-bold leading-snug">
            {content.headingLine1}
            <br />
            in{" "}
            <span className="text-amber-400">{content.headingHighlight}</span>
          </h2>

          <ol className="relative flex flex-col gap-8">
            <span className="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 border-l border-dashed border-white/25" />
            {content.steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4">
                <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-blue-950">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-0.5 text-sm text-white/70">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <RequestForm content={content} services={services} />
      </div>
    </section>
  );
}
