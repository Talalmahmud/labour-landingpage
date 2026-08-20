import { Headset, MessageCircle, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toTelHref, toWhatsAppHref } from "@/lib/format";
import type { SiteContent } from "@/lib/content-types";

interface ContactBarProps {
  content: SiteContent["contact"];
}

export function ContactBar({ content }: ContactBarProps) {
  return (
    <section className="bg-blue-950 text-white">
      <div className="mx-auto flex flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Headset className="size-5" />
          </span>
          <div>
            <p className="font-medium">{content.helpTitle}</p>
            <p className="text-sm text-white/60">{content.helpText}</p>
          </div>
        </div>

        <a href={toTelHref(content.phone)} className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
            <PhoneCall className="size-5" />
          </span>
          <div>
            <p className="text-sm text-white/60">{content.phoneLabel}</p>
            <p className="text-xl font-bold text-amber-400">{content.phone}</p>
            <p className="text-xs text-white/60">{content.phoneNote}</p>
          </div>
        </a>

        <Button
          className="h-11 gap-2 bg-emerald-500 px-6 text-white hover:bg-emerald-600"
          render={
            <a
              href={toWhatsAppHref(content.phone)}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          nativeButton={false}
        >
          <MessageCircle className="size-4 fill-current" />
          {content.whatsappLabel}
        </Button>
      </div>
    </section>
  );
}
