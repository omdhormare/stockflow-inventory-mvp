import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ProductForm } from "@/components/product-form";
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { const user = await getCurrentUser(); if (!user) return null; const { id } = await params; const product = await db.product.findFirst({ where: { id, organizationId: user.organizationId } }); if (!product) notFound(); return <><div className="mb-7"><Link href="/dashboard/products" className="text-sm font-semibold text-blue-600 hover:underline">← Products</Link><h1 className="mt-3 text-2xl font-bold text-slate-900">Edit product</h1><p className="mt-1 text-sm text-slate-500">Update product details and stock levels.</p></div><ProductForm product={{ ...product, costPrice: product.costPrice?.toString() ?? null, sellingPrice: product.sellingPrice?.toString() ?? null }}/></>; }
