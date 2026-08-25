import { BlogList } from "@/components/blog/blog-list";
import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { getContent } from "@/lib/content";
import { listPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [content, posts] = await Promise.all([getContent(), listPublishedPosts()]);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <section className="bg-linear-to-b from-slate-50 to-white px-6 py-16 text-center dark:from-background dark:to-background">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-heading text-3xl font-extrabold text-blue-950 sm:text-4xl dark:text-white">
              {content.blogPage.heading}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">{content.blogPage.subheading}</p>
          </div>
        </section>
        <BlogList posts={posts} />
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
