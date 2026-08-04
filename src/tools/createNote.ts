import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createNoteInputSchema } from "../schemas/createNoteSchema.js";
import { createNote } from "../lib/notes.js";

export function registerCreateNote(server: McpServer) {
  server.registerTool(
    "create_note",
    {
      title: "Create Note",
      description: "Create a new note with title and content",
      inputSchema: createNoteInputSchema,
    },
    async ({ title, content, tags }) => {
      try {
        const note = await createNote(title, content);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ...note,
                  tags,
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
              text: `Error creating note: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );
}