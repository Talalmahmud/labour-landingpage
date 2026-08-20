import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getContent, updateContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }

  await updateContent(body);
  return NextResponse.json({ ok: true });
}
