import type { Metadata } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata } from "@/lib/metadata";

/* Layout raiz do português: define <html lang> no servidor (P2). */
export const metadata: Metadata = rootMetadata("pt");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="pt">{children}</RootDocument>;
}
