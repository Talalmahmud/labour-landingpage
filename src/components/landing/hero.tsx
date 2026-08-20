"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Search, Star, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { SiteContent } from "@/lib/content-types";
import { getInitials } from "@/lib/format";
import { VideoDialog } from "@/components/landing/video-dialog";
import { WorkerIllustration } from "@/components/landing/worker-illustration";

interface HeroProps {
  content: SiteContent["hero"];
  workerNames: string[];
}

export function Hero({ content, workerNames }: HeroProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const badgeInitials =
    workerNames.length > 0 ? workerNames.map(getInitials) : ["SH"];
  const hasVideo = getYouTubeEmbedUrl(content.howItWorksVideoUrl) !== null;
  console.log(hasVideo);
  function handleFindLabour() {
    const query = location.trim();
    router.push(
      query
        ? `/find-labour?location=${encodeURIComponent(query)}`
        : "/find-labour",
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-background dark:to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-144 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/10"
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
        <div className="flex max-w-xl flex-col gap-6">
          <h1 className="font-heading text-5xl leading-[1.05] font-extrabold tracking-tight text-blue-950 sm:text-6xl dark:text-white">
            {content.titleLine1}
            <br />
            {content.titleLine2}
            <br />
            <span className="text-blue-600">{content.titleHighlight}</span>
          </h1>
          <p className="max-w-md text-base text-muted-foreground">
            {content.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="h-12 gap-2 bg-blue-950 px-6 text-white hover:bg-blue-900"
              render={<Link href="/#how-it-works" />}
              nativeButton={false}
            >
              {content.ctaPrimary}
              <span aria-hidden>→</span>
            </Button>
            {hasVideo ? (
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 border-blue-950/20 px-6 text-blue-950 dark:text-white"
                onClick={() => setVideoOpen(true)}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-blue-950 text-white">
                  <Play className="size-3 fill-current" />
                </span>
                {content.ctaSecondary}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 border-blue-950/20 px-6 text-blue-950 dark:text-white"
                render={<Link href="/#how-it-works" />}
                nativeButton={false}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-blue-950 text-white">
                  <Play className="size-3 fill-current" />
                </span>
                {content.ctaSecondary}
              </Button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-8">
            {content.stats.map((stat) => (
              <Stat
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full">
          <div className="absolute -top-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg ring-1 ring-foreground/10 sm:left-auto sm:right-8 sm:translate-x-0">
            <div className="flex -space-x-2">
              {badgeInitials.slice(0, 4).map((initials, i) => (
                <span
                  key={`${initials}-${i}`}
                  className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700 ring-2 ring-background dark:bg-blue-900/50 dark:text-blue-300"
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="leading-tight">
              <p className="flex items-center gap-1 text-sm font-semibold">
                {content.ratingValue}{" "}
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
              </p>
              <p className="text-xs text-muted-foreground">
                {content.ratingLabel}
              </p>
            </div>
          </div>

          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-blue-950 shadow-2xl">
            {content.imagePublicId ? (
              <Image
                src={cloudinaryUrl(
                  content.imagePublicId,
                  "f_auto,q_auto,w_960,h_1200,c_fill,g_auto",
                )}
                alt="Skilled labour ready for work"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <WorkerIllustration />
            )}
          </div>

          <div className="relative -mt-16 rounded-2xl bg-background p-5 shadow-xl ring-1 ring-foreground/10 sm:mx-8">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-950 dark:text-white">
              <MapPin className="size-4 text-blue-600" />
              {content.searchHeading}
            </p>
            <form
              className="mt-3 flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleFindLabour();
              }}
            >
              <Input
                placeholder={content.searchPlaceholder}
                className="h-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                type="submit"
                className="h-10 gap-2 bg-blue-950 text-white hover:bg-blue-900"
              >
                <Search className="size-4" />
                {content.searchButton}
              </Button>
            </form>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Popular Searches:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {content.popularSearches.map((city) => (
                  <Link
                    key={city}
                    href={`/find-labour?location=${encodeURIComponent(city)}`}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer rounded-md px-2.5 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      {city}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasVideo && (
        <VideoDialog
          videoUrl={content.howItWorksVideoUrl}
          open={videoOpen}
          onOpenChange={setVideoOpen}
        />
      )}
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <DynamicIcon name={icon} className="size-5 text-blue-600" />
      <div className="leading-tight">
        <p className="text-sm font-semibold text-blue-950 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
