# Scento Perfume API — free perfume & fragrance API (REST + MCP)

A free perfume and fragrance API from [Scento](https://www.scento.com), built on Scento's verified perfume database: 1,400+ designer and niche perfumes, 400+ raw materials and 140+ perfume houses, with Scento's own 14-family system. No key, no account, read-only, open CORS.

Every answer is a small JSON "folio": a quotable one-sentence `lede`, a `detail` object, the `scento_page` to read on, `further_reading` links and a `cite` line. The same twelve answers are available as plain REST and as an [MCP](https://modelcontextprotocol.io) server for Claude, ChatGPT, Cursor and any other MCP client.

- Developer page: https://www.scento.com/developers
- REST base URL: `https://www.scento.com/api/perfume/v1`
- OpenAPI 3.1: https://www.scento.com/openapi.json (also at `/api/perfume/v1/openapi.json`; the earlier base `/api/compendium/v1` keeps working)
- MCP endpoint: `https://www.scento.com/mcp` (streamable HTTP, no auth)
- Server card: https://www.scento.com/.well-known/mcp.json
- Official MCP Registry name: `com.scento/perfume-api`

## Provenance

Every perfume and raw-material entry is traced to a saved official house or authorized-retailer source, and every answer links to the matching page on scento.com. Answers are English; `lang` (en de fr es it ro el hu cs pl) switches the language of the scento.com links and labels.

## Quickstart

### curl

```sh
curl -s "https://www.scento.com/api/perfume/v1/search?q=oud"
curl -s "https://www.scento.com/api/perfume/v1/perfumes/aventus-creed"
curl -s "https://www.scento.com/api/perfume/v1/materials/bergamot"
```

### Python (requests)

```python
import requests

r = requests.get("https://www.scento.com/api/perfume/v1/perfumes/aventus-creed", timeout=20)
r.raise_for_status()
answer = r.json()
print(answer["lede"])
print(answer["detail"]["pyramid"])      # {"top": [...], "heart": [...], "base": [...]}
print(answer["scento_page"]["url"])
```

### JavaScript (fetch, Node 18+ or the browser)

```js
const res = await fetch("https://www.scento.com/api/perfume/v1/perfumes/aventus-creed");
const answer = await res.json();
console.log(answer.lede, answer.detail.pyramid, answer.scento_page.url);
```

## MCP

Add the remote server to any MCP client that supports streamable HTTP:

```json
{
  "mcpServers": {
    "scento-perfume-api": { "type": "http", "url": "https://www.scento.com/mcp" }
  }
}
```

For clients that only speak stdio, a small local bridge is published to npm and PyPI (source: [Scento-com/perfume-mcp-server](https://github.com/Scento-com/perfume-mcp-server)):

```sh
npx -y scento-perfume-api        # Node
uvx scento-perfume-api           # Python
```

The twelve tools are read-only: `perfume-search`, `perfume-portrait`, `scent-neighbours`, `perfume-contrast`, `note-portrait`, `material-match`, `house-portrait`, `family-map`, `occasion-edit`, `wardrobe-composer`, `perfumery-lexicon`, `journal-search`. See [`examples/curl/mcp-tools-list.sh`](examples/curl/mcp-tools-list.sh) and [`examples/curl/mcp-call.sh`](examples/curl/mcp-call.sh), which calls `perfume-portrait` with one POST and no session.

## Endpoints

All are `GET` under `https://www.scento.com/api/perfume/v1`. Every endpoint takes an optional `lang`; list endpoints return an opaque `continuation` value to fetch the next part.

| Endpoint | Parameters | Returns | MCP tool |
|---|---|---|---|
| `/search` | `q`, `kind` (perfume, house, material, any) | Matching perfumes, houses and materials | `perfume-search` |
| `/perfumes` | `q` | Perfume search | `perfume-search` |
| `/perfumes/{perfume}` | slug, e.g. `aventus-creed` | Perfume portrait: house, family, note pyramid (or a flat note list), character, seasons | `perfume-portrait` |
| `/perfumes/{perfume}/neighbours` | `same_house` | Perfumes with a similar structure | `scent-neighbours` |
| `/contrast` | `perfumes` (comma-separated slugs) | Side-by-side comparison | `perfume-contrast` |
| `/materials/{material}` | slug, e.g. `bergamot` | Raw material portrait | `note-portrait` |
| `/materials/match` | `materials` (comma-separated), `tier`, `family` | Perfumes built on the given materials | `material-match` |
| `/houses/{house}` | slug, e.g. `dior` | Perfume house portrait | `house-portrait` |
| `/families` and `/families/{family}` | family slug (optional) | Scento's 14-family map | `family-map` |
| `/edits/{occasion}` | occasion, e.g. `office`, `date-night`; `gender_lean` | An edit of perfumes for an occasion | `occasion-edit` |
| `/wardrobe` | `loves`, `avoid`, `size` | A composed fragrance wardrobe | `wardrobe-composer` |
| `/lexicon/{term}` | term, e.g. `sillage` | Perfumery term explained | `perfumery-lexicon` |
| `/journal` | `q` | Search the Scento journal | `journal-search` |

The full schema is in the [OpenAPI document](https://www.scento.com/openapi.json).

## Examples

Runnable scripts live in [`examples/`](examples/): `python/` (requests), `javascript/` (Node 18+, no dependencies) and `curl/`. The Python and JavaScript folders hold the same four scripts (`search`, `portrait`, `contrast`, `material`), each with a small shared helper. Output below is real, captured on 21 Oct 2026 and trimmed.

```console
$ python examples/python/search.py oud
132 entries in Scento's verified perfume database match “oud”; showing 1–10.
- material Oud  (Oud)  https://www.scento.com/note/oud
- perfume  Oud Wood  (Tom Ford)  https://www.scento.com/perfumes/oud-wood-tom-ford
- perfume  Oud for Greatness  (Initio Parfums Prives)  https://www.scento.com/perfumes/initio-parfums-prives-oud-for-greatness
```

```console
$ python examples/python/portrait.py aventus-creed
Aventus by Creed (2010, Erwin Creed and Jean-Christophe Hérault) belongs to Scento’s Orchard Fruit family: bergamot, blackcurrant, apple and pineapple open onto juniper, birch, patchouli and jasmine, settling on musk, oakmoss, ambergris and vanilla.
Page: https://www.scento.com/perfumes/aventus-creed
Cite: Scento Perfume API, scento.com
top   Bergamot, Blackcurrant, Apple, Pineapple
heart Juniper, Birch, Patchouli, Jasmine
base  Musk, Oakmoss, Ambergris, Vanilla
```

```console
$ node examples/javascript/contrast.mjs aventus-creed baccarat-rouge-540-maison-francis-kurkdjian
Aventus and Baccarat Rouge 540 share jasmine and ambergris, but part ways on family.
house    Creed | Maison Francis Kurkdjian
family   Orchard Fruit / Wood & Root | Wood & Root / White Bloom
top      Bergamot, Blackcurrant, Apple, Pineapple | Jasmine, Saffron
heart    Juniper, Birch, Patchouli, Jasmine | Cedarwood
```

```console
$ node examples/javascript/material.mjs bergamot
Bergamot is a natural material from the citrus family: sparkling peel of a green-gold citrus, juicy and slightly floral, with a bitter edge that keeps it elegant.
Page: https://www.scento.com/note/bergamot
Cite: Scento Perfume API, scento.com
```

## Terms and license

The code in this repository is [MIT](LICENSE). The perfume content returned by the API is Scento's and is covered by the [Scento terms](https://www.scento.com/terms-of-service#perfume-api); please keep the `cite` line when you show an answer. Questions: support@scento.com.

See also the curated [awesome-perfume-apis](https://github.com/Scento-com/awesome-perfume-apis) list.
