"""Search perfumes, houses and raw materials.  Usage: python search.py oud"""
import sys
from compendium import get

q = sys.argv[1] if len(sys.argv) > 1 else "oud"
answer = get("search", q=q)
print(answer["lede"])
for m in answer["detail"]["matches"][:5]:
    print(f'- {m["kind"]:8} {m["name"]}  ({m.get("house", m.get("family"))})  {m["page"]}')
