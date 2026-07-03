/** Hard cap on how long public pages wait for Supabase before using fallbacks. */
export const SUPABASE_QUERY_TIMEOUT_MS = 3000;

export function withQueryTimeout<T>(
  promise: Promise<T>,
  fallback: T,
  timeoutMs = SUPABASE_QUERY_TIMEOUT_MS,
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), timeoutMs);
    }),
  ]);
}
