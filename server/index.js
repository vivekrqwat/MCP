import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Simple MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {}
  }
});

server.registerTool(
  "greetPerson",
  {
    title: "Greeter Tool",
    description: "Greets a person by name.",
    inputSchema: {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the person to greet."
        }
      },
      "required": ["name"]
    }
  },
  async (input) => {
    const { name = "" } = input;
    
    if (!name) {
      return {
        content: [{ type: "text", text: "Please provide a name to greet." }]
      };
    }
    
    return {
      content: [
        { type: "text", text: `Hello, ${name}!` }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();