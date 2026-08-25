import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

import { cloudinaryUrl } from "@/lib/cloudinary-url";
import type { BlogPostDTO } from "@/lib/posts";

interface BlogListProps {
  posts: BlogPostDTO[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No posts published yet — check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-blue-100 dark:bg-blue-900/30">
              {post.coverImagePublicId ? (
                <Image
                  src={cloudinaryUrl(
                    post.coverImagePublicId,
                    "f_auto,q_auto,w_640,h_360,c_fill,g_auto",
                  )}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-blue-700 dark:text-blue-400">
                  <CalendarDays className="size-8" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {formatDate(post.createdAt)}
              </p>
              <p className="font-heading text-lg font-bold text-blue-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                {post.title}
              </p>
              <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
