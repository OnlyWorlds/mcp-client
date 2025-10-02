#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListResourcesRequestSchema, 
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

const API_BASE = process.env.ONLYWORLDS_API_URL || 'https://www.onlyworlds.com';
const API_KEY = process.env.ONLYWORLDS_API_KEY;
const API_PIN = process.env.ONLYWORLDS_API_PIN;

// Create MCP server with both resources and tools capabilities
const server = new Server({
  name: 'onlyworlds',
  version: '1.1.0'
}, {
  capabilities: {
    resources: {},
    tools: {}
  }
});

// Forward resources/list to HTTP endpoint
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  try {
    const response = await fetch(`${API_BASE}/mcp/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || '',
        'X-API-Pin': API_PIN || ''
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'resources/list',
        id: 1
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.result || { resources: [] };
  } catch (error) {
    console.error('Error listing resources:', error);
    return { resources: [] };
  }
});

// Forward resources/read to HTTP endpoint
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  try {
    const response = await fetch(`${API_BASE}/mcp/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || '',
        'X-API-Pin': API_PIN || ''
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'resources/read',
        params: request.params,
        id: 2
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.result || { contents: [] };
  } catch (error) {
    console.error('Error reading resource:', error);
    throw error;
  }
});

// Forward tools/list to HTTP endpoint
server.setRequestHandler(ListToolsRequestSchema, async () => {
  try {
    const response = await fetch(`${API_BASE}/mcp/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || '',
        'X-API-Pin': API_PIN || ''
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        id: 3
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      console.error('Error from server:', data.error);
      return { tools: [] };
    }
    
    return data.result || { tools: [] };
  } catch (error) {
    console.error('Error listing tools:', error);
    return { tools: [] };
  }
});

// Forward tools/call to HTTP endpoint
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const response = await fetch(`${API_BASE}/mcp/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || '',
        'X-API-Pin': API_PIN || ''
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: request.params,
        id: 4
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (data.error) {
      // Return error in the expected format
      return {
        content: [{
          type: 'text',
          text: `Error: ${data.error.message}`
        }],
        isError: true
      };
    }
    
    return data.result || {
      content: [{
        type: 'text',
        text: 'No result returned'
      }]
    };
  } catch (error) {
    console.error('Error calling tool:', error);
    return {
      content: [{
        type: 'text',
        text: `Error calling tool: ${error.message}`
      }],
      isError: true
    };
  }
});

// Note about authentication (optional for schema access)
if (!API_KEY || !API_PIN) {
  // Silent - authentication not required for schema access
  // API key/PIN only needed if accessing user-specific world data
}

// Start stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);