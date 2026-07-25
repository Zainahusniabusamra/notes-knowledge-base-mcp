# Design Doc: Notes Knowledge Base MCP

## Pitch

Many people keep personal notes scattered across plain text and markdown
files but have no fast way to search, summarize, or connect them. This
project is an MCP server that turns a local folder of notes into a
queryable knowledge base. It is aimed at individuals (students,
researchers, engineers) who write notes regularly but rarely revisit or
organize them. The MCP exposes tools to search, retrieve, summarize, and
create notes, so an LLM client can act as a personal research assistant
over the user's own notes.

## User & Demo Story

Imagine a student who has been taking markdown notes all semester across
different classes. During Demo Day, they ask the assistant: "What did I
write about photosynthesis last month?" The assistant calls
`search_notes` with the query "photosynthesis," gets back a ranked list
of matching note files with short snippets, then calls `get_note` on the
best match to pull the full content. It calls `summarize_note` to
condense the note into three key bullet points, and replies with a
short, accurate summary along with a reference to the original file so
the student can open it themselves. Later in the same conversation, the
student says "add a note reminding me to review mitosis before the
exam," and the assistant calls `create_note` to save it to the notes
folder.

## Tool Inventory

| tool_name | description | inputs | output | priority |
|---|---|---|---|---|
| `search_notes` | Search notes by keyword/phrase and return ranked matches with snippets | `query: string`, `limit?: number` | `{ results: [{ file, title, snippet, score }] }` | P0 |
| `get_note` | Retrieve the full content of a specific note by file path or id | `note_id: string` | `{ file, title, content, created_at }` | P0 |
| `create_note` | Create a new note file with a title and body | `title: string`, `content: string`, `tags?: string[]` | `{ file, created: boolean }` | P0 |
| `summarize_note` | Return a short bullet-point summary of a given note | `note_id: string`, `max_points?: number` | `{ file, summary: string[] }` | P1 |
| `list_recent_notes` | List the most recently modified notes | `limit?: number` | `{ notes: [{ file, title, modified_at }] }` | P1 |
| `delete_note` | Delete a note by id (soft-delete to a trash folder) | `note_id: string` | `{ deleted: boolean }` | P1 |

Exactly 3 tools are marked P0 (`search_notes`, `get_note`, `create_note`)
and must work reliably for Demo Day. The remaining P1 tools
(`summarize_note`, `list_recent_notes`, `delete_note`) can remain stubs
if time runs short.

## Out of Scope

- No user authentication or multi-user support (single local user only).
- No paid/external APIs (no cloud storage, no third-party search index).
- No mobile or web UI — MCP Inspector and the LLM client are the only
  interfaces.
- No real-time sync across devices; notes live in a single local folder.
- No support for non-text formats (PDFs, images) in this phase.

## Success Criteria

- [ ] `search_notes` returns at least one correct hit when queried
      against a fixture notes folder with known content.
- [ ] `get_note` returns the full, unmodified content of a note given
      its id/file path.
- [ ] `create_note` successfully writes a new markdown file to the
      notes folder and it is immediately visible to `search_notes` and
      `list_recent_notes`.

## Risks

1. **Search quality on small/messy fixture data.** Simple keyword
   matching may miss relevant notes if fixtures are too sparse or
   inconsistent. *Mitigation:* build a small, deliberately varied set of
   ~10-15 fixture notes covering different topics and phrasings before
   testing search.
2. **Schema/output shape drift between tools.** As more tools get added,
   inconsistent output shapes could break downstream chaining (e.g.
   `search_notes` results not matching what `get_note` expects as
   input). *Mitigation:* lock the `note_id`/`file` field naming early
   and reuse the same identifier across all tool schemas.
   