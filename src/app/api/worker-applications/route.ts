import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createWorkerApplication, listWorkerApplications } from "@/lib/worker-applications";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const service = typeof body?.service === "string" ? body.service.trim() : "";
  const location = typeof body?.location === "string" ? body.location.trim() : "";
  const experience = typeof body?.experience === "string" ? body.experience.trim() : "";
  const details = typeof body?.details === "string" ? body.details.trim() : "";

  if (!name || !phone || !service || !location) {
    return NextResponse.json(
      { error: "Name, phone, skill, and location are required" },
      { status: 400 }
    );
  }
  if ([name, phone, service, location, experience, details].some((v) => v.length > 2000)) {
    return NextResponse.json({ error: "One of the fields is too long" }, { status: 400 });
  }

  await createWorkerApplication({ name, phone, service, location, experience, details });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await listWorkerApplications();
  return NextResponse.json(applications);
}
