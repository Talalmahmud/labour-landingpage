"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContent } from "@/lib/content-types";

interface ContactFormProps {
  content: SiteContent["contactPage"];
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ content }: ContactFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");

      setState("success");
      setName("");
      setContact("");
      setMessage("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-5">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <ContactDetail icon={Mail} label="Email" value={content.email} />
        <ContactDetail icon={Phone} label="Phone" value={content.phone} />
        <ContactDetail icon={MapPin} label="Address" value={content.address} />
        <p className="text-sm text-muted-foreground">{content.hours}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border p-6 lg:col-span-3">
        <h2 className="font-heading text-lg font-semibold text-blue-950 dark:text-white">
          {content.formHeading}
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="contact-name">
            Your Name
          </label>
          <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="contact-info">
            Email or Phone
          </label>
          <Input id="contact-info" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="contact-message">
            Message
          </label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28 resize-none"
            required
          />
        </div>

        {state === "error" && <p className="text-sm text-destructive">{error}</p>}
        {state === "success" && (
          <p className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="size-4" />
            Message sent — we&apos;ll get back to you soon.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="h-11 gap-2 bg-blue-950 text-white hover:bg-blue-900"
          disabled={state === "submitting"}
        >
          {state === "submitting" && <Loader2 className="size-4 animate-spin" />}
          Send Message
        </Button>
      </form>
    </section>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-blue-950 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
