"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Search, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/format";
import { roleToneClasses } from "@/lib/role-tone";
import { MapPreview } from "@/components/landing/map-preview";
import { WorkerProfileDialog } from "@/components/landing/worker-profile-dialog";
import type { SiteContent, Worker } from "@/lib/content-types";

interface BrowseWorkersProps {
  content: SiteContent["findLabour"];
  page: SiteContent["findLabourPage"];
}

export function BrowseWorkers({ content, page }: BrowseWorkersProps) {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
            {page.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{page.subheading}</p>
        </div>
      </section>

      <Suspense>
        <WorkerBrowser content={content} />
      </Suspense>
    </>
  );
}

function WorkerBrowser({ content }: { content: SiteContent["findLabour"] }) {
  const searchParams = useSearchParams();
  const { workers, mapPins } = content;
  const [query, setQuery] = useState(searchParams.get("location") ?? "");
  const [role, setRole] = useState("all");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const roles = useMemo(
    () => Array.from(new Set(workers.map((w) => w.role))).sort(),
    [workers]
  );

  const filtered = workers.filter((worker) => {
    const matchesRole = role === "all" || worker.role === role;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || worker.name.toLowerCase().includes(q) || worker.location.toLowerCase().includes(q);
    return matchesRole && matchesQuery;
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or location..."
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={(v) => v && setRole(v)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue>{(v: string) => (v === "all" ? "All services" : v)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-3 lg:col-span-3">
          <p className="text-xs text-muted-foreground">
            {filtered.length} worker{filtered.length === 1 ? "" : "s"} found
          </p>
          {filtered.map((worker) => (
            <div
              key={worker.name}
              className="flex items-center gap-3 rounded-xl border border-border p-4"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {getInitials(worker.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-blue-950 dark:text-white">
                    {worker.name}
                  </p>
                  <Badge className={`rounded-full ${roleToneClasses[worker.roleTone]}`}>
                    {worker.role}
                  </Badge>
                  <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                    {worker.rating}
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{worker.experience}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {worker.location}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0"
                onClick={() => setSelectedWorker(worker)}
              >
                View Profile
              </Button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No workers match your search.
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <MapPreview mapPins={mapPins} />
        </div>
      </div>

      <WorkerProfileDialog worker={selectedWorker} onOpenChange={(open) => !open && setSelectedWorker(null)} />
    </section>
  );
}
