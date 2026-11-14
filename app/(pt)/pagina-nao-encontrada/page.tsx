import type { Metadata } from "next";
import { NotFoundView } from "@/components/views/NotFoundView";
import { notFoundMetadata } from "@/lib/metadata";

/* Servida pelo proxy com status 404 para endereços desconhecidos em português. */
export const metadata: Metadata = notFoundMetadata("pt");

export default function Page() {
  return <NotFoundView locale="pt" />;
}
