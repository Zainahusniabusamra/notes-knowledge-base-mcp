import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchNotes } from "./tools/searchNotes.js";
import { registerGetNote } from "./tools/getNote.js";
import { registerCreateNote } from "./tools/createNote.js";

const server = new McpServer({
  name: "notes-knowledge-base-mcp",
  version: "0.1.0",
});
registerSearchNotes(server);
registerGetNote(server);
registerCreateNote(server);
const transport = new StdioServerTransport();

await server.connect(transport);

