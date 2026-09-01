"use client";

import { useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { getInitials } from "@/lib/format";
import type { SiteContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

interface ReviewsProps {
  content: SiteContent["reviews"];
}

export function Reviews({ content }: ReviewsProps) {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  if (content.items.length === 0) return null;

  return (
    <section className=" px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-heading text-2xl font-bold text-blue-950 sm:text-3xl dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.subheading}
        </p>
      </div>

      <Carousel
        opts={{ align: "start", loop: content.items.length > 1 }}
        plugins={[autoplay]}
        className=" mt-10 px-4 "
      >
        <CarouselContent>
          {content.items.map((review, i) => (
            <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-xs">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={cn(
                        "size-4",
                        s < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/25",
                      )}
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.review}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  {review.avatarPublicId ? (
                    <Image
                      src={cloudinaryUrl(
                        review.avatarPublicId,
                        "f_auto,q_auto,w_80,h_80,c_fill,g_face",
                      )}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {getInitials(review.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-blue-950 dark:text-white">
                      {review.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" left-20 " />
        <CarouselNext className="right-20 " />
      </Carousel>
    </section>
  );
}
