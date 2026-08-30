import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createCustomIcon, listCustomIcons } from "@/lib/custom-icons";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const icons = await listCustomIcons();
  return NextResponse.json(icons);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const imagePublicId = typeof body?.imagePublicId === "string" ? body.imagePublicId.trim() : "";

  if (!name || !imagePublicId) {
    return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
  }
  if (name.length > 100) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }

  await createCustomIcon({ name, imagePublicId });
  return NextResponse.json({ ok: true });
}
