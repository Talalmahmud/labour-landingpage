"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { VideoDialog } from "@/components/landing/video-dialog";
import { getYouTubeVideoId } from "@/lib/youtube";
import type { SiteContent } from "@/lib/content-types";

interface HowItWorksContentProps {
  content: SiteContent["howItWorksPage"];
}

export function HowItWorksContent({ content }: HowItWorksContentProps) {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const videos = content.videos.filter((v) => getYouTubeVideoId(v.youtubeUrl));

  return (
    <>
      <section className="bg-linear-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
            {content.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{content.subheading}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        {videos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No videos yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const videoId = getYouTubeVideoId(video.youtubeUrl);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              return (
                <button
                  key={video.title + video.youtubeUrl}
                  type="button"
                  onClick={() => setActiveUrl(video.youtubeUrl)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background text-left shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-blue-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt={video.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-950/20 transition-colors group-hover:bg-blue-950/30">
                      <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-blue-950 shadow-lg transition-transform group-hover:scale-110">
                        <Play className="size-5 fill-current" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-5">
                    <p className="font-heading text-base font-bold text-blue-950 dark:text-white">
                      {video.title}
                    </p>
                    {video.description && (
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <VideoDialog
        videoUrl={activeUrl ?? ""}
        open={activeUrl !== null}
        onOpenChange={(open) => !open && setActiveUrl(null)}
      />
    </>
  );
}
