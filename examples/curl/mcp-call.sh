#!/usr/bin/env sh
# Call one MCP tool directly over streamable HTTP (no session or key needed).
curl -s -X POST https://www.scento.com/mcp \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"perfume-portrait","arguments":{"perfume":"aventus-creed"}}}'
