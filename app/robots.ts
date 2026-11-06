import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/site";

/* Antes da publicação aprovada (Fase 7), nenhum buscador deve indexar o site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
  };
}
