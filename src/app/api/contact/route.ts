import { NextResponse } from "next/server";

import { createMessage } from "@/lib/messages";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const contact = typeof body?.contact === "string" ? body.contact.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Name, contact, and message are required" }, { status: 400 });
  }
  if (name.length > 200 || contact.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "One of the fields is too long" }, { status: 400 });
  }

  await createMessage({ name, contact, message });
  return NextResponse.json({ ok: true });
}
