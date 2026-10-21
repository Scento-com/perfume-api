// Portrait of one perfume.  Usage: node portrait.mjs aventus-creed
import { get, show } from "./perfume-api.mjs";

const answer = await get(`perfumes/${process.argv[2] ?? "aventus-creed"}`);
show(answer);
const { pyramid, notes } = answer.detail;
if (pyramid) {
  for (const tier of ["top", "heart", "base"]) {
    console.log(tier.padEnd(5), (pyramid[tier] ?? []).join(", ") || "-");
  }
} else {
  // some perfumes list their notes without a pyramid
  console.log("notes", notes.join(", "));
}
