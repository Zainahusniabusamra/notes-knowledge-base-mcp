# Demo Script — Notes Knowledge Base MCP

**Total time: 5:00**

## 0:00–0:40 — The Problem

"Most of us keep notes scattered across random Markdown files — for class, for projects, for random ideas — and searching through them means opening file after file by hand.

**Notes Knowledge Base MCP** turns a folder of Markdown notes into a searchable knowledge base that an MCP-compatible AI client like Claude Desktop can query and update directly, in natural language."

## 0:40–1:10 — Architecture

"It's a local MCP server, built in TypeScript, running over the standard MCP stdio transport. It exposes three tools to the client:

* `search_notes` — keyword search across all notes
* `get_note` — retrieve a specific note by ID
* `create_note` — create a new Markdown note with title, content, and tags

Notes live as plain `.md` files in a `data/` directory — no database, no external services."

**Architecture:**

`Claude Desktop ⇄ MCP stdio ⇄ TypeScript MCP Server ⇄ data/*.md`

## 1:10–3:30 — Live Tool Calls

Two prompts that always work, based on `examples/conversations.md`:

### Prompt 1 — Search

> Search my notes for photosynthesis.

**Expected tool:** `search_notes`

Show Claude calling `search_notes` and returning the matching `biology.md` note.

### Prompt 2 — Create

> Create a note titled "Exam Reminder" with the content "Review mitosis before the exam".

**Expected tool:** `create_note`

Show Claude creating the new Markdown note and confirm that the new file appears in the `data/` directory.

### Backup Prompt — Retrieve

> Retrieve my biology note.

**Expected tool:** `get_note`

The tool retrieves `biology.md` and returns its content.

## 3:30–4:30 — What I Would Build Next

"Right now the project is local-only and uses keyword search. Next steps I'd want to build:

* Semantic search using embeddings instead of plain keyword matching
* Tagging and filtering in `search_notes`
* Note editing and deletion
* A remote-hosted version that works directly with claude.ai

"

## 4:30–5:00 — Questions

"Happy to answer anything about the architecture, MCP tools, validation rules, testing, or future improvements."

---

## Slide Plan

Five slides maximum:

1. **Title** — Notes Knowledge Base MCP / Zaina Abusamra
2. **Problem** — Scattered notes and difficult manual searching
3. **Architecture** — Claude Desktop ⇄ MCP stdio ⇄ TypeScript server ⇄ `data/*.md`
4. **Tools** — `search_notes`, `get_note`, and `create_note`
5. **Next Steps** — Semantic search, tags, editing/deletion, and remote hosting

---

## Offline Backup Plan

"If Wi-Fi fails, the MCP server is local and does not depend on an external service during the demo. Keep Claude Desktop connected before Demo Day and keep a terminal window ready with `npm run dev` as a fallback to verify that 
 server still runs."
