import { getCurrentUser } from "@/lib/auth";
import { ProductList } from "@/components/product-list";
export default async function ProductsPage() { const user = await getCurrentUser(); if (!user) return null; return <><div className="mb-7"><h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1><p className="mt-1 text-sm text-slate-500">Manage your products, quantities, and stock levels.</p></div><ProductList defaultThreshold={user.organization.defaultLowStockLevel}/></>; }
