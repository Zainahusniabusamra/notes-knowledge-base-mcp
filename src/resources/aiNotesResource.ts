import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerAiNotesResource(server: McpServer) {
  server.resource(
    "ai-notes",
    "notes://ai-notes",
    async () => ({
      contents: [
        {
          uri: "notes://ai-notes",
          mimeType: "text/markdown",
          text: "MCP allows AI assistants to use external tools and data.",
        },
      ],
    })
  );
}