import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  const products = await db.product.findMany({ where: { organizationId: user.organizationId, ...(query ? { OR: [{ name: { contains: query, mode: "insensitive" } }, { sku: { contains: query, mode: "insensitive" } }] } : {}) }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(products);
}
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid product." }, { status: 400 });
  const data = parsed.data;
  try {
    const product = await db.product.create({ data: { organizationId: user.organizationId, name: data.name, sku: data.sku, description: data.description || null, quantity: data.quantity, costPrice: data.costPrice === "" || data.costPrice === undefined ? null : data.costPrice, sellingPrice: data.sellingPrice === "" || data.sellingPrice === undefined ? null : data.sellingPrice, lowStockLevel: data.lowStockLevel === "" || data.lowStockLevel === undefined ? null : data.lowStockLevel } });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") return NextResponse.json({ error: "This SKU is already used in your organization." }, { status: 409 });
    return NextResponse.json({ error: "Could not save product." }, { status: 500 });
  }
}
