import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

const variants = {
  solid: "bg-text text-surface",
  outline: "border border-text text-text",
} as const;

/**
 * Botão dos estudos de caso (DESIGN-SPEC §12): leva a uma demonstração ou repositório, por isso
 * é um link. Altura de 48 px, raio de 4 px. Quando o destino não existe, o estudo de caso mostra
 * um texto ("Demo não publicada") no lugar do botão; nunca um botão desativado.
 */
export function ButtonLink({
  href,
  variant,
  children,
  ...rest
}: {
  href: string;
  variant: keyof typeof variants;
  children: React.ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className">) {
  return (
    <a
      href={href}
      className={`interactive type-body-sm inline-flex min-h-12 items-center gap-2 rounded px-6 ${variants[variant]}`}
      {...rest}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="link-arrow arrow-up-right shrink-0"
        size="1em"
        strokeWidth={1.5}
      />
    </a>
  );
}
