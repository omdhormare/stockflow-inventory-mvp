import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const product = await db.product.findFirst({ where: { id, organizationId: user.organizationId } });
  return product ? NextResponse.json(product) : NextResponse.json({ error: "Product not found." }, { status: 404 });
}
export async function PUT(request: Request, context: Context) {
  const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params; const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid product." }, { status: 400 });
  const exists = await db.product.findFirst({ where: { id, organizationId: user.organizationId }, select: { id: true } });
  if (!exists) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  const d = parsed.data;
  try { const product = await db.product.update({ where: { id }, data: { name: d.name, sku: d.sku, description: d.description || null, quantity: d.quantity, costPrice: d.costPrice === "" || d.costPrice === undefined ? null : d.costPrice, sellingPrice: d.sellingPrice === "" || d.sellingPrice === undefined ? null : d.sellingPrice, lowStockLevel: d.lowStockLevel === "" || d.lowStockLevel === undefined ? null : d.lowStockLevel } }); return NextResponse.json(product); }
  catch (error) { if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") return NextResponse.json({ error: "This SKU is already used in your organization." }, { status: 409 }); return NextResponse.json({ error: "Could not update product." }, { status: 500 }); }
}
export async function DELETE(_request: Request, context: Context) {
  const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const result = await db.product.deleteMany({ where: { id, organizationId: user.organizationId } });
  return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ error: "Product not found." }, { status: 404 });
}
