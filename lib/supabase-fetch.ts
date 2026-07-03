/** Fail fast when Supabase is unreachable — avoids 10s+ hangs per request. */
export const SUPABASE_FETCH_TIMEOUT_MS = 3000;

/** After a timeout, skip further Supabase calls briefly so pages don't stack delays. */
const CIRCUIT_COOLDOWN_MS = 60_000;
let circuitOpenUntil = 0;

export function supabaseFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  if (Date.now() < circuitOpenUntil) {
    return Promise.reject(
      new Error("Supabase temporarily unreachable (circuit open)"),
    );
  }

  return fetch(input, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(SUPABASE_FETCH_TIMEOUT_MS),
  }).catch((err) => {
    circuitOpenUntil = Date.now() + CIRCUIT_COOLDOWN_MS;
    throw err;
  });
}
