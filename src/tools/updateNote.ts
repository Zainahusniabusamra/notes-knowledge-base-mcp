import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { updateNoteInputSchema } from "../schemas/updateNoteSchema.js";
import { updateNote } from "../lib/notes.js";

export function registerUpdateNote(server: McpServer) {
  server.registerTool(
    "update_note",
    {
      title: "Update Note",
      description: "Update the content of an existing note by its identifier",
      inputSchema: updateNoteInputSchema,
    },
    async ({ note_id, content }) => {
      try {
        const note = await updateNote(note_id, content);
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
        console.error("[update_note] failed:", error);
        return {
          content: [
            {
              type: "text",
              text: "Unable to update the note. Please check the note identifier and try again.",
            },
          ],
          isError: true,
        };
      }
    }
  );
}