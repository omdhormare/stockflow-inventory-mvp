import { getCurrentUser } from "@/lib/auth";
import { SettingsForm } from "@/components/settings-form";
export default async function SettingsPage() { const user = await getCurrentUser(); if (!user) return null; return <><div className="mb-7"><h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1><p className="mt-1 text-sm text-slate-500">Manage your workspace inventory preferences.</p></div><SettingsForm organizationName={user.organization.name} defaultThreshold={user.organization.defaultLowStockLevel}/></>; }
