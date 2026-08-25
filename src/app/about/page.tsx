import { AboutContent } from "@/components/about/about-content";
import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <AboutContent content={content.aboutPage} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
