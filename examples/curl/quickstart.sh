#!/usr/bin/env sh
# Every call is a plain GET. No key, no account.
BASE=https://www.scento.com/api/perfume/v1
curl -s "$BASE/search?q=oud"
curl -s "$BASE/perfumes/aventus-creed"
curl -s "$BASE/materials/bergamot"
curl -s "$BASE/families"
