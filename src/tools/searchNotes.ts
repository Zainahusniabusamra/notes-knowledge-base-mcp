import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/searchNotesSchema.js";
import { searchNotes } from "../lib/notes.js";

export function registerSearchNotes(server: McpServer) {
  server.registerTool(
    "search_notes",
    {
      title: "Search Notes",
      description: "Search notes by keyword and return matching notes",
      inputSchema: searchNotesInputSchema,
    },
    async ({ query, limit }) => {
      try {
        const results = await searchNotes(query, limit);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  results,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error searching notes: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );
}