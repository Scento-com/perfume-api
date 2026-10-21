"""Compare perfumes side by side.
Usage: python contrast.py aventus-creed baccarat-rouge-540-maison-francis-kurkdjian"""
import sys
from compendium import get

slugs = sys.argv[1:] or ["aventus-creed", "baccarat-rouge-540-maison-francis-kurkdjian"]
answer = get("contrast", perfumes=",".join(slugs))
print(answer["lede"])
for axis in answer["detail"]["axes"][:4]:
    print(f'{axis["axis"]:8}', " | ".join(axis["values"]))
