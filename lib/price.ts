/** Whole-number NPR prices — avoids float drift in forms and Postgres numeric fields. */
export function parseNprPrice(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "").trim();
  if (!/^\d+$/.test(cleaned)) return null;
  return parseInt(cleaned, 10);
}

export function normalizeProductPrice(value: number | string): number {
  return Math.round(Number(value));
}

export function formatNprPrice(value: number): string {
  return normalizeProductPrice(value).toLocaleString("en-NP");
}
