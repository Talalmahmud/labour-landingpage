import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { ServicesContent } from "@/components/services/services-content";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ServicesContent page={content.servicesPage} services={content.services.items} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
