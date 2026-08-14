import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/searchNotesSchema.js";
import { searchNotes } from "../lib/notes.js";

const DEFAULT_SEARCH_LIMIT = 5;
const MAX_SEARCH_LIMIT = 20;

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
        // Explicit cap applied here regardless of the library default,
        // so an omitted limit can never return an unbounded response.
        const safeLimit = Math.min(limit ?? DEFAULT_SEARCH_LIMIT, MAX_SEARCH_LIMIT);
        const results = await searchNotes(query, safeLimit);
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
        // Log full details to stderr only — never expose raw errors to the model.
        console.error("[search_notes] failed:", error);
        return {
          content: [
            {
              type: "text",
              text: "Unable to search notes. Please try again.",
            },
          ],
          isError: true,
        };
      }
    }
  );
}