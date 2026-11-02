import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export async function GET() { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json({ defaultLowStockLevel: user.organization.defaultLowStockLevel, organizationName: user.organization.name }); }
export async function PUT(request: Request) {
  const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = z.object({ defaultLowStockLevel: z.coerce.number().int().min(0).max(100000) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid stock level." }, { status: 400 });
  const org = await db.organization.update({ where: { id: user.organizationId }, data: { defaultLowStockLevel: parsed.data.defaultLowStockLevel } });
  return NextResponse.json({ defaultLowStockLevel: org.defaultLowStockLevel });
}
