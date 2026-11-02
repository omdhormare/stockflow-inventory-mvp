import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export async function GET() {
  const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [totalProducts, stock, products] = await Promise.all([
    db.product.count({ where: { organizationId: user.organizationId } }),
    db.product.aggregate({ where: { organizationId: user.organizationId }, _sum: { quantity: true } }),
    db.product.findMany({ where: { organizationId: user.organizationId }, orderBy: { quantity: "asc" } }),
  ]);
  const lowStock = products.filter((p) => p.quantity <= (p.lowStockLevel ?? user.organization.defaultLowStockLevel));
  return NextResponse.json({ totalProducts, totalUnits: stock._sum.quantity ?? 0, lowStockCount: lowStock.length, lowStock, organizationName: user.organization.name });
}
