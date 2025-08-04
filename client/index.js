import { Anthropic } from "@anthropic-ai/sdk";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import{SSEClientTransport} from "@modelcontextprotocol/sdk/client/sse.js";
import readline from "readline/promises";
import dotenv from "dotenv";

dotenv.config();
const MCClient=new Client({
    name: "tukaram",
    version: "1.0.0",
    transport:new SSEClientTransport({
        url: "http://localhost:3000/mcp",   
})})

MCClient.connect(new SSEClientTransport(new URL("http://localhost:3000/mcp"))).then(async()=>{
    console.log("Connected to MCP server");
    const tools=(await MCClient.getTools()).tools;
    console.log("Available tools:", tools);
})

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

class MCPClient {
  constructor() {
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
    this.anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.transport = null;
    this.tools = [];
  }

  // your methods like init() and sendMessage() go here
}
