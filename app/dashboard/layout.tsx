import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) { const user = await getCurrentUser(); if (!user) redirect("/login"); return <DashboardShell organizationName={user.organization.name} userName={user.name || user.email}>{children}</DashboardShell>; }
