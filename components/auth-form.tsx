"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const router = useRouter();
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setError(""); setLoading(true); const form = new FormData(e.currentTarget); const body = Object.fromEntries(form.entries());
    try { const res = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Something went wrong."); router.push("/dashboard"); router.refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); } finally { setLoading(false); }
  }
  const field = "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  return <form onSubmit={submit} className="space-y-4">
    {mode === "signup" && <><label className="block text-sm font-medium text-slate-700">Your name<input name="name" required minLength={2} className={field} placeholder="Alex Morgan" /></label><label className="block text-sm font-medium text-slate-700">Organization name<input name="organizationName" required minLength={2} className={field} placeholder="Acme Supplies" /></label></>}
    <label className="block text-sm font-medium text-slate-700">Email address<input name="email" type="email" required className={field} placeholder="you@company.com" /></label>
    <label className="block text-sm font-medium text-slate-700">Password<input name="password" type="password" required minLength={mode === "signup" ? 8 : 1} className={field} placeholder={mode === "signup" ? "At least 8 characters" : "Your password"} /></label>
    {mode === "signup" && <label className="block text-sm font-medium text-slate-700">Confirm password<input name="confirmPassword" type="password" required minLength={8} className={field} placeholder="Enter your password again" /></label>}
    {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    <button disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}</button>
    <p className="text-center text-sm text-slate-500">{mode === "signup" ? "Already have an account? " : "New to StockFlow? "}<Link className="font-semibold text-blue-600 hover:underline" href={mode === "signup" ? "/login" : "/signup"}>{mode === "signup" ? "Log in" : "Create an account"}</Link></p>
  </form>;
}
