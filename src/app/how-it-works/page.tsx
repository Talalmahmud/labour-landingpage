import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { HowItWorksContent } from "@/components/how-it-works/how-it-works-content";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HowItWorksPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <HowItWorksContent content={content.howItWorksPage} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
