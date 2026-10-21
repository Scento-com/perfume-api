#!/usr/bin/env sh
# Ask the MCP server (streamable HTTP, no auth) which tools it offers.
curl -s -X POST https://www.scento.com/mcp \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
