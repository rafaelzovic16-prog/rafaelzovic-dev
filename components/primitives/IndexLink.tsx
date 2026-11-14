import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

const arrows = {
  right: { Icon: ArrowRight, className: "arrow-right" },
  down: { Icon: ArrowDown, className: "arrow-down" },
  up: { Icon: ArrowUp, className: "arrow-up" },
  "up-right": { Icon: ArrowUpRight, className: "arrow-up-right" },
} as const;

export type ArrowDirection = keyof typeof arrows;

/**
 * Link com seta (DESIGN-SPEC §12): no hover, o sublinhado é desenhado da esquerda para a
 * direita e a seta desloca 4 px na sua direção (250 ms). Foco visível e estado :active no toque.
 * Endereços internos usam o <Link> do Next; externos, <a>.
 */
export function IndexLink({
  href,
  arrow,
  children,
  className,
  ...rest
}: {
  href: string;
  arrow: ArrowDirection;
  children: React.ReactNode;
} & Omit<ComponentProps<"a">, "href">) {
  const { Icon, className: arrowClass } = arrows[arrow];
  const classes = ["interactive inline-flex items-center gap-2", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="link-underline">{children}</span>
      <Icon
        aria-hidden="true"
        className={`link-arrow ${arrowClass} shrink-0 self-center`}
        size="0.9em"
        strokeWidth={1.5}
      />
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
