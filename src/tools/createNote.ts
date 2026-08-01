import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createNoteInputSchema } from "../schemas/createNoteSchema.js";

export function registerCreateNote(server: McpServer) {
  server.registerTool(
    "create_note",
    {
      title: "Create Note",
      description: "Create a new note with title and content",
      inputSchema: createNoteInputSchema,
    },
    async ({ title, content, tags }) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "create_note",
                title,
                content,
                tags,
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