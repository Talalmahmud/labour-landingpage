import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { MissionVisionContent } from "@/components/mission-vision/mission-vision-content";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function MissionVisionPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <MissionVisionContent content={content.missionVision} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
