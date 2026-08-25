import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, UserRound } from "lucide-react";

import { ContactBar } from "@/components/landing/contact-bar";
import { Navbar } from "@/components/landing/navbar";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { getContent } from "@/lib/content";
import { getPublishedPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [content, post] = await Promise.all([
    getContent(),
    getPublishedPostBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar content={content.siteSettings} />
      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-blue-950 dark:hover:text-white"
          >
            <ChevronLeft className="size-4" />
            Back to Blog
          </Link>

          <h1 className="mt-4 font-heading text-3xl font-extrabold text-balance text-blue-950 sm:text-4xl dark:text-white">
            {post.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <UserRound className="size-4" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {post.coverImagePublicId && (
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={cloudinaryUrl(
                  post.coverImagePublicId,
                  "f_auto,q_auto,w_1200,h_675,c_fill,g_auto",
                )}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="blog-content mt-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </main>
      <ContactBar content={content.contact} />
    </div>
  );
}
