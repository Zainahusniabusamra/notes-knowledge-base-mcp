import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getNoteInputSchema } from "../schemas/getNoteSchema.js";
import { getNote } from "../lib/notes.js";

export function registerGetNote(server: McpServer) {
  server.registerTool(
    "get_note",
    {
      title: "Get Note",
      description: "Retrieve a note by its id or file path",
      inputSchema: getNoteInputSchema,
    },
    async ({ note_id }) => {
      try {
        const note = await getNote(note_id);

        if (!note) {
          return {
            content: [
              {
                type: "text",
                text: `Note not found: ${note_id}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(note, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting note: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );
}