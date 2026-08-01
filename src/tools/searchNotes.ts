import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/searchNotesSchema.js";

export function registerSearchNotes(server: McpServer) {
  server.registerTool(
    "search_notes",
    {
      title: "Search Notes",
      description: "Search notes by keyword and return matching notes",
      inputSchema: searchNotesInputSchema,
    },
    async ({ query, limit }) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "search_notes",
                query,
                limit,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}