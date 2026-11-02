import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "StockFlow | Inventory Management", description: "Simple, secure inventory management for growing teams." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
