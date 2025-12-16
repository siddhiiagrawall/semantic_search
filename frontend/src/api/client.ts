export const API_BASE = "https://semantic-search-kv6d.onrender.com";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
}
