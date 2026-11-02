import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/auth-form";
export default async function SignupPage() { if (await getCurrentUser()) redirect("/dashboard"); return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12"><div className="w-full max-w-md"><Link href="/" className="mb-8 block text-center text-2xl font-bold text-slate-900">Stock<span className="text-blue-600">Flow</span></Link><div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-bold text-slate-900">Create your workspace</h1><p className="mb-7 mt-2 text-sm text-slate-500">Start keeping your inventory organized.</p><AuthForm mode="signup"/></div></div></main>; }
