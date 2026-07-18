#!/usr/bin/env node
// @onlyworlds/mcp-client 1.1.2 -- FINAL RELEASE (deprecated).
//
// This package was a stdio bridge to the old OnlyWorlds MCP endpoint
// (POST /mcp/messages/), which was retired when the real MCP server went
// live at https://www.onlyworlds.com/mcp (streamable HTTP, 2026-07-12).
// The bridge's forwards now receive only a moved-notice, so instead of
// silently returning empty results, this final version answers every
// request with the migration message. Connect directly instead:
//
//   claude mcp add --transport http onlyworlds https://www.onlyworlds.com/mcp \
//     --header "API-Key: <your world key>" --header "API-Pin: <your pin>"
//
// Docs: https://onlyworlds.github.io
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

const MOVED =
  'The OnlyWorlds MCP server is now hosted at https://www.onlyworlds.com/mcp ' +
  '(streamable HTTP). This stdio bridge (@onlyworlds/mcp-client) is deprecated ' +
  'and no longer forwards requests. Connect directly: ' +
  'claude mcp add --transport http onlyworlds https://www.onlyworlds.com/mcp ' +
  '--header "API-Key: <your world key>" --header "API-Pin: <your pin>". ' +
  'Claude Desktop and other streamable-HTTP clients can use the same URL and ' +
  'headers; stdio-only clients can use the community mcp-remote shim. ' +
  'Docs: https://onlyworlds.github.io';

console.error('[onlyworlds] ' + MOVED);

const server = new Server(
  { name: 'onlyworlds', version: '1.1.2' },
  { capabilities: { resources: {}, tools: {} } }
);

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [{
    uri: 'onlyworlds://moved',
    name: 'OnlyWorlds MCP has moved',
    description: MOVED,
    mimeType: 'text/plain'
  }]
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => ({
  contents: [{ uri: request.params?.uri || 'onlyworlds://moved', mimeType: 'text/plain', text: MOVED }]
}));

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'onlyworlds_moved',
    description: MOVED,
    inputSchema: { type: 'object', properties: {} }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async () => ({
  content: [{ type: 'text', text: MOVED }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
