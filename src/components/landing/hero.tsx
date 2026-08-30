"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Search,
  ShieldCheck,
  Star,
  MapPin,
  User,
} from "lucide-react";

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
  const gallerySlots = Array.from(
    { length: 5 },
    (_, i) => content.galleryImagePublicIds[i] ?? null,
  );

  function handleFindLabour() {
    const query = location.trim();
    router.push(
      query
        ? `/find-labour?location=${encodeURIComponent(query)}`
        : "/find-labour",
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-background dark:via-background dark:to-background">
      {/* decorative background layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-24 size-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/10" />
        <div className="absolute top-1/3 right-0 size-112 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/10" />
      </div>

      <div className="relative mx-auto  px-6 pt-14 pb-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* left column */}
          <div className="animate-in fade-in slide-in-from-bottom-4 flex max-w-xl flex-col gap-6 duration-700">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-950/10 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-white/10 dark:bg-blue-900/30 dark:text-blue-300">
              <ShieldCheck className="size-3.5" />
              {content.ratingLabel}
            </div>

            <h1 className="font-heading text-5xl leading-[1.05] font-extrabold tracking-tight text-balance text-blue-950 sm:text-6xl dark:text-white">
              {content.titleLine1}
              <br />
              {content.titleLine2}
              <br />
              <span className="text-blue-600">{content.titleHighlight}</span>
            </h1>
            <p className="max-w-md text-base text-pretty text-muted-foreground">
              {content.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="h-13 gap-3 rounded-full bg-blue-950 pr-2 pl-6 text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl"
                render={<Link href="/#how-it-works" />}
                nativeButton={false}
              >
                {content.ctaPrimary}
                <span
                  aria-hidden
                  className="flex size-9 items-center justify-center rounded-full bg-white text-blue-950"
                >
                  <ArrowRight className="size-4" />
                </span>
              </Button>
              {hasVideo ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 gap-3 rounded-full border-blue-950/15 pr-6 pl-2 text-blue-950 dark:text-white"
                  onClick={() => setVideoOpen(true)}
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-blue-950 text-white">
                    <Play className="size-3.5 fill-current" />
                  </span>
                  {content.ctaSecondary}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 gap-3 rounded-full border-blue-950/15 pr-6 pl-2 text-blue-950 dark:text-white"
                  render={<Link href="/#how-it-works" />}
                  nativeButton={false}
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-blue-950 text-white">
                    <Play className="size-3.5 fill-current" />
                  </span>
                  {content.ctaSecondary}
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {content.badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full bg-blue-50 py-1.5 pr-3.5 pl-2 text-xs font-medium text-blue-950 dark:bg-white/5 dark:text-white"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    <DynamicIcon name={badge.icon} className="size-3.5" />
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* right column: photo collage */}
          <div className="animate-in fade-in slide-in-from-bottom-6 relative mx-auto w-full duration-700 delay-150">
            <div className="absolute -top-6 left-4 z-10 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg ring-1 ring-foreground/10 sm:left-8">
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
                <p className="flex items-center gap-1 text-sm font-semibold text-blue-950 dark:text-white">
                  {content.ratingValue}{" "}
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-xs text-muted-foreground">
                  {content.ratingLabel}
                </p>
              </div>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-blue-950 shadow-2xl ring-1 ring-black/5">
              {content.imagePublicId ? (
                <Image
                  src={cloudinaryUrl(
                    content.imagePublicId,
                    "f_auto,q_auto,w_1200,h_900,c_fill,g_auto",
                  )}
                  alt="Skilled labour ready for work"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <WorkerIllustration />
              )}
            </div>

            <div className="relative z-10 -mt-8 flex justify-center gap-3 px-4 sm:justify-start sm:px-8">
              {gallerySlots.map((publicId, i) => (
                <div
                  key={i}
                  className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-blue-100 shadow-lg ring-4 ring-background sm:size-20 dark:bg-blue-900/40"
                >
                  {publicId ? (
                    <Image
                      src={cloudinaryUrl(
                        publicId,
                        "f_auto,q_auto,w_160,h_160,c_fill,g_auto",
                      )}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-blue-400 dark:text-blue-600">
                      <User className="size-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* search + stats panel */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mt-16 rounded-3xl bg-background p-6 shadow-xl ring-1 ring-foreground/10 duration-700 delay-300 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <p className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-950 dark:text-white">
              <MapPin className="size-4 text-blue-600" />
              {content.searchHeading}
            </p>
            <form
              className="flex flex-1 flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                handleFindLabour();
              }}
            >
              <Input
                placeholder={content.searchPlaceholder}
                className="h-11"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                type="submit"
                className="h-11 shrink-0 gap-2 rounded-full bg-blue-950 px-6 text-white transition-all hover:bg-blue-900 active:scale-[0.98]"
              >
                <Search className="size-4" />
                {content.searchButton}
              </Button>
            </form>
            <div className="flex flex-wrap items-center gap-1.5 lg:shrink-0">
              <p className="mr-1 text-xs whitespace-nowrap text-muted-foreground">
                Popular Searches:
              </p>
              {content.popularSearches.slice(0, 5).map((city) => (
                <Link
                  key={city}
                  href={`/find-labour?location=${encodeURIComponent(city)}`}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer rounded-full px-2.5 py-1 text-xs transition-colors hover:border-blue-600/40 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                  >
                    {city}
                  </Badge>
                </Link>
              ))}
              <Link
                href="/find-labour"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {content.stats.map((stat) => (
              <Stat
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                sublabel={stat.sublabel}
              />
            ))}
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
  sublabel,
}: {
  icon: string;
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
        <DynamicIcon name={icon} className="size-5" />
      </span>
      <div className="leading-tight">
        <p className="text-lg font-bold text-blue-950 dark:text-white">
          {value}
        </p>
        <p className="text-xs font-medium text-foreground">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
