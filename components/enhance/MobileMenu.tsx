"use client";

/*
 * Menu do mobile (DESIGN-SPEC §8; ARCHITECTURE §9): sobreposição em tela cheia sobre Bone,
 * com a Popover API nativa. Abre, fecha e responde ao Esc sem JavaScript. O JavaScript só
 * acrescenta o fechamento ao escolher um link (sem ele, o botão "Fechar" continua valendo).
 */
export function MobileMenu({
  id,
  label,
  closeLabel,
  links,
  language,
}: {
  id: string;
  label: string;
  closeLabel: string;
  links: { href: string; label: string }[];
  language: React.ReactNode;
}) {
  return (
    <div
      id={id}
      popover="auto"
      className="bg-surface text-text m-0 size-full max-h-none max-w-none border-0 p-0"
    >
      <div className="container-editorial flex min-h-full flex-col pb-8">
        <div className="flex h-14 items-center justify-end">
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="interactive type-body-sm min-h-12 px-2"
          >
            <span className="link-underline">{closeLabel}</span>
          </button>
        </div>
        <nav aria-label={label} className="mt-8">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-rule border-b">
                <a
                  href={link.href}
                  onClick={() => document.getElementById(id)?.hidePopover()}
                  className="interactive type-h2 flex min-h-16 items-center py-2"
                >
                  <span className="link-underline">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-10">{language}</div>
      </div>
    </div>
  );
}
