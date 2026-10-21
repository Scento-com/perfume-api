// Describe a raw material.  Usage: node material.mjs bergamot
import { get, show } from "./perfume-api.mjs";

show(await get(`materials/${process.argv[2] ?? "bergamot"}`));
