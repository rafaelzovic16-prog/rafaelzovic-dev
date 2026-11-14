/**
 * Moldura da fotografia (DESIGN-SPEC §7): 4:5, Stone, com o rótulo "Fotografia — pendente"
 * enquanto a foto real de Rafa não existir. Nunca uma imagem de substituição. Marcada com
 * `data-pending`, como os demais conteúdos pendentes (bloqueia a publicação na Fase 7).
 * A variante com a foto entra quando o arquivo for entregue (pendência do inventário de conteúdo).
 */
export function PhotoFrame({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      data-pending={label}
      className="bg-placeholder relative flex aspect-4/5 w-full items-end p-4"
    >
      <span className="type-meta">{label}</span>
    </div>
  );
}
