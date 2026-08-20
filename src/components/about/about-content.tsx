import Image from "next/image";

import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { getInitials } from "@/lib/format";
import type { SiteContent } from "@/lib/content-types";

interface AboutContentProps {
  content: SiteContent["aboutPage"];
}

export function AboutContent({ content }: AboutContentProps) {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
            {content.heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{content.subheading}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-4 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-xl font-bold text-blue-950 dark:text-white">
            {content.storyHeading}
          </h2>
          <div className="mt-3 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
            {content.storyParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-blue-950 p-8 text-white">
          <h2 className="font-heading text-xl font-bold">{content.missionHeading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{content.missionText}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 py-16 sm:grid-cols-4">
        {content.stats.map((stat) => {
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border p-5 text-center"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                <DynamicIcon name={stat.icon} className="size-5" />
              </span>
              <p className="text-lg font-bold text-blue-950 dark:text-white">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </section>

      {content.team.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <h2 className="text-center font-heading text-xl font-bold text-blue-950 dark:text-white">
            Meet the Team
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {content.team.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-3 text-center">
                {member.imagePublicId ? (
                  <Image
                    src={cloudinaryUrl(member.imagePublicId, "f_auto,q_auto,w_200,h_200,c_fill,g_face")}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="size-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-24 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {getInitials(member.name)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-blue-950 dark:text-white">{member.name}</p>
                  <p className="text-xs text-blue-600">{member.role}</p>
                  <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
