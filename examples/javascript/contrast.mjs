// Compare perfumes side by side.
// Usage: node contrast.mjs aventus-creed baccarat-rouge-540-maison-francis-kurkdjian
import { get } from "./perfume-api.mjs";

const slugs = process.argv.slice(2);
const perfumes = (slugs.length ? slugs : ["aventus-creed", "baccarat-rouge-540-maison-francis-kurkdjian"]).join(",");
const answer = await get("contrast", { perfumes });
console.log(answer.lede);
for (const axis of answer.detail.axes.slice(0, 4)) {
  console.log(axis.axis.padEnd(8), axis.values.join(" | "));
}
