"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContent } from "@/lib/content-types";

interface RequestSectionProps {
  content: SiteContent["requestSection"];
  services: SiteContent["services"]["items"];
}

type SubmitState = "idle" | "submitting" | "success" | "error";

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

        <Suspense>
          <RequestForm content={content} services={services} />
        </Suspense>
      </div>
    </section>
  );
}

function RequestForm({ content, services }: RequestSectionProps) {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(searchParams.get("service") ?? "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, location, date, details }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");

      setState("success");
      setName("");
      setPhone("");
      setService("");
      setLocation("");
      setDate("");
      setDetails("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-background p-8 lg:col-span-3 lg:p-10"
    >
      <h3 className="font-heading text-lg font-semibold text-blue-950 dark:text-white">
        {content.formHeading}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your Name">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>
        <Field label="Phone Number">
          <Input
            placeholder="Enter your phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Field>
        <Field label="Work Type / Service">
          <Select value={service} onValueChange={(v) => v && setService(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services
                .filter((s) => s.title !== "More Services")
                .map((s) => (
                  <SelectItem key={s.title} value={s.title}>
                    {s.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Work Location">
          <Input
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Field>
        <Field label="Date Needed">
          <div className="relative">
            <Input
              placeholder="Select date"
              type="date"
              className="pr-9"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Calendar className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>
        <Field label="Additional Details">
          <Textarea
            placeholder="Describe your work..."
            className="min-h-9 resize-none"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Field>
      </div>

      {state === "error" && <p className="text-sm text-destructive">{error}</p>}
      {state === "success" && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-600">
          <CheckCircle2 className="size-4" />
          Request sent — we&apos;ll match you with a worker soon.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="h-12 gap-2 bg-amber-400 text-blue-950 hover:bg-amber-300"
        disabled={state === "submitting"}
      >
        {state === "submitting" && <Loader2 className="size-4 animate-spin" />}
        {content.submitLabel}
        <span aria-hidden>→</span>
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
