# CLAUDE.md - OnlyWorlds MCP Client

## Project Overview

This is the **MCP (Model Context Protocol) Client** for OnlyWorlds - a bridge that allows AI assistants like Claude to access OnlyWorlds API schemas and documentation.

### What is This?

The OnlyWorlds MCP Client is an NPM package that:
- Provides AI assistants access to OnlyWorlds schema information
- Implements the Model Context Protocol for AI tool integration
- Bridges Claude/Cursor and the OnlyWorlds Django backend
- Exposes OnlyWorlds element types, fields, and documentation as MCP resources

**NPM Package**: `npm install -g @onlyworlds/mcp-client`

**Related Projects**:
- **OnlyWorlds Django Backend** - Main API implementation at onlyworlds.com
- **@onlyworlds/sdk** - TypeScript SDK for OnlyWorlds API
- **OnlyWorlds/OnlyWorlds** - Open-source framework and schema definitions

## Architecture

### Directory Structure
```
/mcp-client
├── index.js           # MCP server implementation
├── package.json       # NPM package config
├── README.md          # User-facing documentation
└── LICENSE            # MIT License
```

### How It Works

The MCP client is a **Node.js CLI tool** that runs as an MCP server:

1. **Installed globally**: `npm install -g @onlyworlds/mcp-client`
2. **Configured in Claude/Cursor**: Points to the installed binary
3. **Fetches live schemas**: Retrieves data from onlyworlds.com API
4. **Provides MCP resources**: Exposes schemas as MCP-compatible resources
5. **AI integration**: Claude can read OnlyWorlds schemas to help developers

### MCP Resources Provided

The client exposes these resources to AI assistants:
- **Compact Schema** - Minimal schema with all element types
- **Sectioned Schema** - Schema organized by logical sections
- **Typed Schema** - Full type definitions for all fields
- **Element Schemas** - Individual schemas for each of the 22 element types
- **Field Mappings** - Relationship information between fields

## Development

### Testing Locally
```bash
# Install dependencies
npm install

# Test the MCP server
node index.js
```

### Publishing
```bash
npm version patch|minor|major
npm publish
```

### Configuration

Users configure this in their Claude/Cursor MCP settings:
```json
{
  "mcpServers": {
    "onlyworlds": {
      "command": "onlyworlds-mcp"
    }
  }
}
```

## Key Concepts

### Model Context Protocol (MCP)
MCP is Anthropic's protocol for connecting AI assistants to external data sources. This client implements:
- **Resources**: Schema data that AI can read
- **Tools**: Not currently implemented (read-only access)
- **HTTP Fallback**: Works in WSGI environments

### OnlyWorlds Integration
The client connects to the OnlyWorlds MCP HTTP server at:
- Production: `https://onlyworlds.com/mcp/http/`
- Provides live schema data for all 22 element types
- No authentication required (public schema data)

### Element Types
OnlyWorlds has 22 element types:
- Character, Location, Object, Creature, Species, Event
- Ability, Trait, Title
- Family, Institution, Collective, Construct
- Language, Law, Narrative, Phenomenon, Zone
- Map, Pin, Marker, Relation

## Guidelines

### When Making Changes
- Test with both Claude and Cursor
- Ensure MCP protocol compatibility
- Verify schema fetching works
- Update README.md with examples

### Code Style
- Use ES modules (`type: "module"`)
- Follow MCP SDK patterns
- Keep dependencies minimal
- Use async/await for HTTP requests

### Version Updates
- Patch: Bug fixes only
- Minor: New resources or features
- Major: Breaking changes to MCP interface

## Links

- **Documentation**: https://onlyworlds.github.io/
- **Main Website**: https://onlyworlds.com
- **NPM Package**: https://www.npmjs.com/package/@onlyworlds/mcp-client
- **MCP Spec**: https://modelcontextprotocol.io/
- **Issues**: https://github.com/OnlyWorlds/mcp-client/issues

## Related Packages

- **@onlyworlds/sdk** - TypeScript SDK for OnlyWorlds API
- **@modelcontextprotocol/sdk** - MCP SDK dependency
