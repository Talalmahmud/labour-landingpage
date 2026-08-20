import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { ContactForm } from "@/components/contact/contact-form";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getContent();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-slate-50 to-white px-6 pt-16 text-center dark:from-background dark:to-background">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
              {content.contactPage.heading}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">{content.contactPage.subheading}</p>
          </div>
        </div>
        <ContactForm content={content.contactPage} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
