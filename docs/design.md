# Design Doc: Notes Knowledge Base MCP

## Pitch

People often store their notes in multiple Markdown files, making it difficult to quickly find important information later. This project builds an MCP server that allows an AI assistant to search, retrieve, and manage notes stored in a local folder. It is designed for students, developers, and anyone who keeps digital notes. By exposing simple note-management tools, the MCP enables an LLM to act as a personal knowledge assistant over the user's own files.

## User & Demo Story

During Demo Day, a university student asks, "Can you find my notes about operating systems?" The assistant uses the `search_notes` tool to locate the most relevant note and displays a short preview. The student then asks to read the complete note, so the assistant calls `get_note` and returns its full content. Before ending the conversation, the student says, "Create a new note reminding me to review process scheduling next week," and the assistant uses `create_note` to save the new note in the local notes folder.

## Tool Inventory

| Tool Name           | Description                                                       | Inputs                      | Output                                           | Priority |
| ------------------- | ----------------------------------------------------------------- | --------------------------- | ------------------------------------------------ | -------- |
| `search_notes`      | Search notes using keywords and return matching results.          | `query`, `limit?`           | `{ results: [{ file, title, snippet, score }] }` | **P0**   |
| `get_note`          | Retrieve the full content of a selected note.                     | `note_id`                   | `{ file, title, content, created_at }`           | **P0**   |
| `create_note`       | Create and save a new Markdown note.                              | `title`, `content`, `tags?` | `{ file, created }`                              | **P0**   |
| `summarize_note`    | Generate a short summary of a note.                               | `note_id`, `max_points?`    | `{ file, summary }`                              | P1       |
| `list_recent_notes` | Show recently modified notes.                                     | `limit?`                    | `{ notes: [...] }`                               | P1       |
| `delete_note`       | Move a note to a trash folder instead of deleting it permanently. | `note_id`                   | `{ deleted }`                                    | P1       |

The three P0 tools (`search_notes`, `get_note`, and `create_note`) will be fully implemented for Demo Day. The remaining P1 tools may remain basic implementations if time is limited.

## Out of Scope

* User authentication and multi-user support.
* Integration with paid or cloud-based APIs.
* Web or mobile user interfaces.
* Synchronization between multiple devices.
* Support for PDFs, images, or other non-Markdown file types.

## Success Criteria

* [ ] The `search_notes` tool successfully finds matching notes from the sample data.
* [ ] The `get_note` tool returns the complete content of the selected note.
* [ ] The `create_note` tool creates a new Markdown file that can immediately be found through search.

## Risks

1. **Limited search accuracy.** Simple keyword matching may not always find the best note.
   **Mitigation:** Prepare a well-structured sample dataset with meaningful titles and content.

2. **Maintaining consistent data across tools.** Different tools must use the same note identifier and output structure.
   **Mitigation:** Reuse common field names such as `note_id` and `file` in all schemas and tool responses.

## Notes from reading Official MCP Server Examples

- Tool names are usually action-based and clear, such as search, get, list, and create.
- Tool descriptions are short and explain exactly what the tool does.
- Input fields use meaningful names and include validation rules.
- Errors should provide clear information about what went wrong.
- Tools should have a single responsibility instead of combining many actions together.