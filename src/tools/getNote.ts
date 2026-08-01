import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getNoteInputSchema } from "../schemas/getNoteSchema.js";

export function registerGetNote(server: McpServer) {
  server.registerTool(
    "get_note",
    {
      title: "Get Note",
      description: "Retrieve a note by its id or file path",
      inputSchema: getNoteInputSchema,
    },
    async ({ note_id }) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "get_note",
                note_id,
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