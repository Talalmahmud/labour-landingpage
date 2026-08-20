"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/format";
import { roleToneClasses } from "@/lib/role-tone";
import { MapPreview } from "@/components/landing/map-preview";
import { WorkerProfileDialog } from "@/components/landing/worker-profile-dialog";
import type { SiteContent, Worker } from "@/lib/content-types";

const tabs = [
  { key: "workers", label: "Nearby Workers", icon: Users },
  { key: "locations", label: "Nearby Locations", icon: MapPin },
] as const;

interface FindLabourProps {
  content: SiteContent["findLabour"];
}

export function FindLabour({ content }: FindLabourProps) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["key"]>("workers");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const { heading, subheading, workers, mapPins } = content;

  return (
    <section id="find-labour" className="mx-auto  px-6 py-16">
      <div className="rounded-2xl border border-border bg-background p-6 shadow-xs sm:p-8">
        <h2 className="font-heading text-xl font-bold text-blue-950 sm:text-2xl dark:text-white">
          {heading}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-lg bg-muted p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "bg-background text-blue-950 shadow-xs dark:text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "workers" ? (
              <div className="flex flex-col gap-3">
                {workers.map((worker) => (
                  <div
                    key={worker.name}
                    className="flex items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {getInitials(worker.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-blue-950 dark:text-white">
                          {worker.name}
                        </p>
                        <Badge
                          className={cn(
                            "rounded-full",
                            roleToneClasses[worker.roleTone],
                          )}
                        >
                          {worker.role}
                        </Badge>
                        <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                          {worker.rating}
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {worker.experience}
                      </p>
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
                <Button
                  variant="link"
                  className="w-fit gap-1 self-start px-0 text-blue-600"
                  render={<Link href="/find-labour" />}
                  nativeButton={false}
                >
                  View More Workers
                  <span aria-hidden>→</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {mapPins.map((pin) => (
                  <div
                    key={pin.label}
                    className="flex items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      <MapPin className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-blue-950 dark:text-white">
                        {pin.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <MapPreview mapPins={mapPins} />
        </div>
      </div>

      <WorkerProfileDialog
        worker={selectedWorker}
        onOpenChange={(open) => !open && setSelectedWorker(null)}
      />
    </section>
  );
}
