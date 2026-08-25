import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deletePost, getPostById, slugify, updatePost, type PostStatus } from "@/lib/posts";

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const input = parsePostBody(body);

  if (!input.title || !input.slug) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const result = await updatePost(id, input);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json(result);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
