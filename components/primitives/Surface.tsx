import type { ComponentProps } from "react";

/**
 * Superfície Bone (`light`) ou Charcoal (`dark`). Troca os tokens semânticos para tudo o que
 * estiver dentro (DESIGN-SPEC §3.2): os componentes nunca escolhem cor diretamente.
 */
export function Surface({
  tone,
  ...rest
}: { tone: "light" | "dark" } & ComponentProps<"div">) {
  return <div data-surface={tone} {...rest} />;
}
