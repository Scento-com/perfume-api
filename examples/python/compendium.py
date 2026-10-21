"""Tiny helper shared by the Python examples: GET one Scento Perfume API endpoint."""
import requests

BASE = "https://www.scento.com/api/compendium/v1"


def get(path, **params):
    r = requests.get(f"{BASE}/{path}", params=params, timeout=20)
    r.raise_for_status()
    return r.json()


def show(folio):
    """Print the quotable lede, the scento.com page and the cite line of any answer."""
    print(folio["lede"])
    print("Page:", folio["scento_page"]["url"] if folio.get("scento_page") else "-")
    print("Cite:", folio["cite"])
