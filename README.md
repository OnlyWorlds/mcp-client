# OnlyWorlds MCP Client

Model Context Protocol (MCP) client for accessing OnlyWorlds API schema and tools.

## Installation

```bash
npm install -g @onlyworlds/mcp-client
```

Or use directly with npx:
```bash
npx @onlyworlds/mcp-client
```

## Usage

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "onlyworlds": {
      "command": "npx",
      "args": ["-y", "@onlyworlds/mcp-client"]
    }
  }
}
```

### Environment Variables

- `ONLYWORLDS_API_URL` - API base URL (optional, defaults to https://www.onlyworlds.com)
- `ONLYWORLDS_API_KEY` - Your API key (optional, only for world-specific data)
- `ONLYWORLDS_API_PIN` - Your API PIN (optional, only for world-specific data)

Note: Authentication is not required for accessing the OnlyWorlds schema and tools.

## What It Does

This NPM package is a lightweight bridge that connects Claude/Cursor to the OnlyWorlds MCP server. It forwards requests to `https://www.onlyworlds.com/mcp/messages/` where the actual MCP implementation runs.

The package enables AI assistants to access:

### Resources
- Access complete OnlyWorlds API documentation
- Get schemas for all 22 element types
- View field formatting guides and examples
- Access authentication and endpoint information

### Tools (v1.1.0+)
- **list_element_types** - List all available element types
- **get_element_schema** - Get complete field list for any element type
- **get_field_relationships** - Get relationship field mappings
- **search_schema_fields** - Search for fields across all schemas
- **get_field_info** - Get detailed information about any field
- **get_api_quickstart** - Get API documentation with examples
- **get_onlyworlds_overview** - Get comprehensive OnlyWorlds overview
- **get_category_icons** - Get icon mappings for categories
- **get_element_sections** - Get field section organization

## Version History

- **v1.1.0** - Added full tool support (10 tools for schema exploration)
- **v1.0.1** - Bug fixes and improvements
- **v1.0.0** - Initial release with resource support

## License

MIT