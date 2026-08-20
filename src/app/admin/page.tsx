import { AdminDashboard } from "@/components/admin/dashboard";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();
  return <AdminDashboard initialContent={content} />;
}
