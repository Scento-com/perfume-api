// Tiny helper shared by the JavaScript examples (Node 18+, built-in fetch, no dependencies).
export const BASE = "https://www.scento.com/api/perfume/v1";

export async function get(path, params = {}) {
  const url = new URL(`${BASE}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// Print the quotable lede, the scento.com page and the cite line of any answer.
export function show(folio) {
  console.log(folio.lede);
  console.log("Page:", folio.scento_page?.url ?? "-");
  console.log("Cite:", folio.cite);
}
