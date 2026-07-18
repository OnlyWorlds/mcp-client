# OnlyWorlds MCP Client (DEPRECATED)

**This package is deprecated. The OnlyWorlds MCP server is now hosted directly at `https://www.onlyworlds.com/mcp`** (streamable HTTP) -- no local bridge needed.

## Connect instead

Claude Code:

```bash
claude mcp add --transport http onlyworlds https://www.onlyworlds.com/mcp \
  --header "API-Key: <your world key>" --header "API-Pin: <your pin>"
```

Claude Desktop and any streamable-HTTP MCP client: use the same URL and headers. Stdio-only clients can use the community `mcp-remote` shim with that URL.

The hosted server exposes 11 tools: schema lookups need no key; element reads and writes use your world key. Get a key at [onlyworlds.com](https://www.onlyworlds.com); docs at [onlyworlds.github.io](https://onlyworlds.github.io).

## Why deprecated

This package bridged stdio clients to an old endpoint (`/mcp/messages/`) that was retired when the hosted MCP server launched (2026-07-12). That endpoint now returns only a moved-notice, so the bridge cannot serve data. The final version (1.1.2) answers every request with the migration message above instead of failing silently.

## Version History

- **v1.1.2** - Final release: deprecation notice, no forwarding
- **v1.1.0** - Added full tool support (10 tools for schema exploration)
- **v1.0.1** - Bug fixes and improvements
- **v1.0.0** - Initial release with resource support

## License

MIT
