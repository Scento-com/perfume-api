"""Portrait of one perfume.  Usage: python portrait.py aventus-creed"""
import sys
from perfume_api import get, show

slug = sys.argv[1] if len(sys.argv) > 1 else "aventus-creed"
answer = get(f"perfumes/{slug}")
show(answer)
pyramid = answer["detail"]["pyramid"]
if pyramid:
    for tier in ("top", "heart", "base"):
        print(f"{tier:5}", ", ".join(pyramid.get(tier) or []) or "-")
else:  # some perfumes list their notes without a pyramid
    print("notes", ", ".join(answer["detail"]["notes"]))
