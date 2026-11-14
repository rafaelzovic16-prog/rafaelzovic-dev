/** Colunas do grid editorial: 4 no mobile, 5–8 a partir do tablet, 9–12 a partir de 1024 px. */
export function columnVisibility(index: number): string {
  if (index >= 8) return "hidden lg:block";
  if (index >= 4) return "hidden md:block";
  return "";
}
