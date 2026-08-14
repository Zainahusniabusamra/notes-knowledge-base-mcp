import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getNoteInputSchema } from "../schemas/getNoteSchema.js";
import { getNote } from "../lib/notes.js";

export function registerGetNote(server: McpServer) {
  server.registerTool(
    "get_note",
    {
      title: "Get Note",
      description: "Retrieve a note by its identifier",
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
                text: "Note not found.",
              },
            ],
            isError: true,
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
        // Log full details to stderr only — never expose raw errors or
        // the requested note_id back to the model.
        console.error("[get_note] failed:", error);
        return {
          content: [
            {
              type: "text",
              text: "Unable to retrieve the note. Please check the note identifier and try again.",
            },
          ],
          isError: true,
        };
      }
    }
  );
}