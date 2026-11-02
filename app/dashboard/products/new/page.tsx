import Link from "next/link";
import { ProductForm } from "@/components/product-form";
export default function NewProductPage() { return <><div className="mb-7"><Link href="/dashboard/products" className="text-sm font-semibold text-blue-600 hover:underline">← Products</Link><h1 className="mt-3 text-2xl font-bold text-slate-900">Add product</h1><p className="mt-1 text-sm text-slate-500">Add a new item to your inventory.</p></div><ProductForm/></>; }
