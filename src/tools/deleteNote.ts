import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteNoteInputSchema } from "../schemas/deleteNoteSchema.js";
import { deleteNote } from "../lib/notes.js";

export function registerDeleteNote(server: McpServer) {
  server.registerTool(
    "delete_note",
    {
      title: "Delete Note",
      description: "Delete a note by its identifier",
      inputSchema: deleteNoteInputSchema,
    },
    async ({ note_id }) => {
      try {
        const deleted = await deleteNote(note_id);
        if (!deleted) {
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
              text: `Note "${note_id}" was deleted successfully.`,
            },
          ],
        };
      } catch (error) {
        console.error("[delete_note] failed:", error);
        return {
          content: [
            {
              type: "text",
              text: "Unable to delete the note. Please check the note identifier and try again.",
            },
          ],
          isError: true,
        };
      }
    }
  );
}