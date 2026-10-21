// Search perfumes, houses and raw materials.  Usage: node search.mjs oud
import { get } from "./compendium.mjs";

const answer = await get("search", { q: process.argv[2] ?? "oud" });
console.log(answer.lede);
for (const m of answer.detail.matches.slice(0, 5)) {
  console.log(`- ${m.kind.padEnd(8)} ${m.name}  (${m.house ?? m.family})  ${m.page}`);
}
