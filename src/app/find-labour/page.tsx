import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { BrowseWorkers } from "@/components/find-labour/browse-workers";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function FindLabourPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <BrowseWorkers content={content.findLabour} page={content.findLabourPage} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
