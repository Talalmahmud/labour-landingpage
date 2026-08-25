import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createPost, listAllPosts, listPublishedPosts, slugify, type PostStatus } from "@/lib/posts";

function parsePostBody(body: unknown) {
  const b = body as Record<string, unknown> | null;
  const title = typeof b?.title === "string" ? b.title.trim() : "";
  const rawSlug = typeof b?.slug === "string" ? b.slug.trim() : "";
  const excerpt = typeof b?.excerpt === "string" ? b.excerpt.trim() : "";
  const bodyText = typeof b?.body === "string" ? b.body.trim() : "";
  const coverImagePublicId =
    typeof b?.coverImagePublicId === "string" ? b.coverImagePublicId : null;
  const author = typeof b?.author === "string" ? b.author.trim() : "";
  const status: PostStatus = b?.status === "published" ? "published" : "draft";
  const slug = slugify(rawSlug || title);

  return { title, slug, excerpt, body: bodyText, coverImagePublicId, author, status };
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  const posts = isAuthed ? await listAllPosts() : await listPublishedPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const input = parsePostBody(body);

  if (!input.title || !input.slug) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const result = await createPost(input);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json(result);
}
