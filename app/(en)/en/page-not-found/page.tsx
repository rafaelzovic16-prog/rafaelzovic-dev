import type { Metadata } from "next";
import { NotFoundView } from "@/components/views/NotFoundView";
import { notFoundMetadata } from "@/lib/metadata";

/* Servida pelo proxy com status 404 para endereços desconhecidos em inglês. */
export const metadata: Metadata = notFoundMetadata("en");

export default function Page() {
  return <NotFoundView locale="en" />;
}
