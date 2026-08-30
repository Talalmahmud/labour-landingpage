"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

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

interface BecomeLabourFormProps {
  content: SiteContent["becomeLabourPage"];
  services: SiteContent["services"]["items"];
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function BecomeLabourForm({ content, services }: BecomeLabourFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [details, setDetails] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    try {
      const res = await fetch("/api/worker-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, location, experience, details }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");

      setState("success");
      setName("");
      setPhone("");
      setService("");
      setLocation("");
      setExperience("");
      setDetails("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-4 pb-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-border p-6 shadow-xs sm:p-8"
      >
        <h2 className="font-heading text-lg font-semibold text-blue-950 dark:text-white">
          {content.formHeading}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name">
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
          <Field label="Your Skill / Service">
            <Select value={service} onValueChange={(v) => v && setService(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a skill" />
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
          <Field label="Your Location">
            <Input
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Field>
          <Field label="Years of Experience" className="sm:col-span-2">
            <Input
              placeholder="e.g. 5 years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </Field>
          <Field label="Tell us about yourself" className="sm:col-span-2">
            <Textarea
              placeholder="Skills, availability, past work..."
              className="min-h-24 resize-none"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Field>
        </div>

        {state === "error" && <p className="text-sm text-destructive">{error}</p>}
        {state === "success" && (
          <p className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="size-4" />
            {content.successMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="h-12 gap-2 bg-blue-950 text-white hover:bg-blue-900"
          disabled={state === "submitting"}
        >
          {state === "submitting" && <Loader2 className="size-4 animate-spin" />}
          {content.submitLabel}
        </Button>
      </form>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
