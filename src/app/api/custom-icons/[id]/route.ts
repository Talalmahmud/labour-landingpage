import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteCustomIcon } from "@/lib/custom-icons";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteCustomIcon(id);
  return NextResponse.json({ ok: true });
}
