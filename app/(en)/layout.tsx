import type { Metadata } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata } from "@/lib/metadata";

/* Layout raiz do inglês: define <html lang> no servidor (P2). */
export const metadata: Metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
