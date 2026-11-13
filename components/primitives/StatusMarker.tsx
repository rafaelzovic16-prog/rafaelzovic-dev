const markers = {
  done: "bg-text",
  "in-progress": "bg-accent",
  planned: "border border-text",
} as const;

export type ProjectStatus = keyof typeof markers;

/**
 * Status de projeto ou funcionalidade (DESIGN-SPEC §12): ■ graphite = concluído,
 * ■ sage = em desenvolvimento, □ = planejado. O texto sempre acompanha o marcador:
 * o status nunca é comunicado só pela cor.
 */
export function StatusMarker({
  status,
  children,
}: {
  status: ProjectStatus;
  children: React.ReactNode;
}) {
  return (
    <span className="type-meta inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 ${markers[status]}`}
      />
      {children}
    </span>
  );
}
