/**
 * Rótulo de seção (DESIGN-SPEC §1.3, §12): "01 — Trabalhos selecionados", em mono e maiúsculas.
 * É o título da seção nos wireframes aprovados, por isso é um <h2>.
 */
export function SectionLabel({
  index,
  children,
  id,
}: {
  index: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2 id={id} className="type-label">
      {index} — {children}
    </h2>
  );
}
