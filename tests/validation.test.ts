import { describe, expect, it } from "vitest";
import { loginSchema, productSchema, signupSchema } from "@/lib/validation";

describe("signup validation", () => {
  it("normalizes email and accepts valid organization signup details", () => {
    const result = signupSchema.safeParse({ name: "Alex Morgan", email: "ALEX@EXAMPLE.COM", password: "securepass123", confirmPassword: "securepass123", organizationName: "Acme Stock" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("alex@example.com");
  });
  it("rejects short passwords", () => {
    expect(signupSchema.safeParse({ name: "Alex", email: "alex@example.com", password: "123", confirmPassword: "123", organizationName: "Acme" }).success).toBe(false);
  });
  it("rejects passwords that do not match", () => {
    expect(signupSchema.safeParse({ name: "Alex", email: "alex@example.com", password: "securepass123", confirmPassword: "different123", organizationName: "Acme" }).success).toBe(false);
  });
});

describe("login validation", () => {
  it("normalizes email", () => {
    const result = loginSchema.safeParse({ email: "USER@EXAMPLE.COM", password: "pass" });
    expect(result.success && result.data.email).toBe("user@example.com");
  });
});

describe("product validation", () => {
  const valid = { name: "USB-C Cable", sku: "CBL-001", quantity: "12", costPrice: "120.00", sellingPrice: "199.50", lowStockLevel: "" };
  it("converts numeric form values", () => {
    const result = productSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.quantity).toBe(12); expect(result.data.costPrice).toBe(120); expect(result.data.sellingPrice).toBe(199.5); }
  });
  it("rejects negative quantities", () => {
    expect(productSchema.safeParse({ ...valid, quantity: "-1" }).success).toBe(false);
  });
  it("rejects a missing SKU", () => {
    expect(productSchema.safeParse({ ...valid, sku: "" }).success).toBe(false);
  });
});
