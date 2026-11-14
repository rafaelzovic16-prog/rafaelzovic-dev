/**
 * Conteúdo que Rafa ainda vai fornecer (CONTENT-INVENTORY; regra C2). Mostra o nome do item
 * e a palavra "pendente", nunca um texto provisório que pareça real. O atributo
 * `data-pending` permite que o `check:release` da Fase 7 bloqueie a publicação.
 */
export function Pending({
  item,
  label,
  id = item,
  className = "type-meta text-text-muted",
}: {
  item: string;
  label: string;
  /** Identificador único do item pendente, quando o nome visível se repete. */
  id?: string;
  className?: string;
}) {
  return (
    <p className={className} data-pending={id}>
      {item} — {label}
    </p>
  );
}
