import { ChoosePath } from "@/components/landing/choose-path";
import { ContactBar } from "@/components/landing/contact-bar";
import { FindLabour } from "@/components/landing/find-labour";
import { Hero } from "@/components/landing/hero";
import { MissionVisionTeaser } from "@/components/landing/mission-vision-teaser";
import { Navbar } from "@/components/landing/navbar";
import { RequestSection } from "@/components/landing/request-section";
import { Reviews } from "@/components/landing/reviews";
import { Services } from "@/components/landing/services";
import { TrustStrip } from "@/components/landing/trust-strip";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  const workerNames = content.findLabour.workers.map((w) => w.name);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <Hero content={content.hero} workerNames={workerNames} />
        <Services content={content.services} />

        <ChoosePath content={content.choosePath} />
        <RequestSection
          content={content.requestSection}
          services={content.services.items}
        />
        {/* <FindLabour content={content.findLabour} /> */}
        {/* <MissionVisionTeaser content={content.missionVision} /> */}
        <Reviews content={content.reviews} />
        <TrustStrip content={content.trustPoints} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
