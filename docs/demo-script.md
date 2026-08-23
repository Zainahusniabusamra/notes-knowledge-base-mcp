# Demo Script — Notes Knowledge Base MCP

## 0:00–0:40 — Problem

Users often have notes stored in local files, but finding specific information across those notes can be slow and inconvenient.

The Notes Knowledge Base MCP connects an AI assistant to a local notes folder so the assistant can search, retrieve, and create notes through MCP tools.

## 0:40–1:10 — Architecture

The project consists of:

- Local Markdown notes stored in the `data/` folder
- A TypeScript MCP server
- MCP tools exposed to an AI client
- MCP Inspector for testing and demonstrating the tools

The main tools are:

1. `search_notes`
2. `get_note`
3. `create_note`

## 1:10–3:30 — Live Demo

### Prompt 1 — Search

> What do I have in my notes about photosynthesis?

Expected tool:

`search_notes`

The server searches the notes and returns the matching `biology.md` note.

### Prompt 2 — Retrieve

> Show me my biology note.

Expected tool:

`get_note`

The server retrieves `biology.md` and returns its content.

### Backup Prompt — Create

> Create a note called "Exam Reminder" and remind me to review mitosis before the exam.

Expected tool:

`create_note`

The server creates a new Markdown note with the requested content.

## 3:30–4:30 — What I Would Build Next

Next, I would add:

- Better note filtering and tagging
- More advanced search
- Note editing and deletion
- More robust validation and error handling
- Integration with an AI client for a complete end-to-end workflow

## 4:30–5:00 — Questions

The project is shipped as version `v1.0.0` and is available as a public GitHub repository.

I am ready for questions about the architecture, MCP tools, testing, and future improvements.
