# Notes Knowledge Base MCP

A local Model Context Protocol (MCP) server that turns a folder of Markdown notes into a searchable knowledge base.

The server provides tools for searching notes, retrieving a specific note, and creating new notes.

## Requirements

* Node.js 22 or newer
* npm
* Git
* An MCP-compatible client or the MCP Inspector

## Install

Clone the repository:

```bash
git clone https://github.com/Zainahusniabusamra/notes-knowledge-base-mcp.git
cd notes-knowledge-base-mcp
```

Install the dependencies:

```bash
npm install
```

## Run

Start the MCP server with:

```bash
npm run dev
```

The server uses the standard MCP stdio transport.

Your notes are stored as Markdown files inside the `data/` directory.

## Run with MCP Inspector

To test the server interactively with MCP Inspector, run:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

MCP Inspector will start a local web interface. Open the URL shown in the terminal, then initialize the server and select one of the available tools.

The server currently exposes:

* `search_notes`
* `get_note`
* `create_note`

## Tools

| Tool           | Description                                        | Main inputs                         |
| -------------- | -------------------------------------------------- | ----------------------------------- |
| `search_notes` | Search notes by keyword and return matching notes. | `query`, optional `limit`           |
| `get_note`     | Retrieve a note by its identifier.                 | `note_id`                           |
| `create_note`  | Create a new Markdown note.                        | `title`, `content`, optional `tags` |

### search_notes

Searches the notes stored in the `data/` directory.

Example input:

```json
{
  "query": "photosynthesis",
  "limit": 5
}
```

The search limit defaults to 5 and is capped at 20.

### get_note

Retrieves an existing note using its identifier.

Example input:

```json
{
  "note_id": "biology.md"
}
```

### create_note

Creates a new note from a title and content.

Example input:

```json
{
  "title": "Exam Reminder",
  "content": "Review mitosis before the exam",
  "tags": ["biology", "exam"]
}
```

Validation rules include:

* Title must contain 1–200 characters.
* Content must contain 1–10,000 characters.
* A maximum of 10 tags is allowed.
* Each tag must contain 1–50 characters.

## Example Prompts

Here are example requests that can be used with an MCP-compatible AI client:

```text
Search my notes for photosynthesis.
```

```text
Retrieve my biology note.
```

```text
Create a note titled "Exam Reminder" with the content "Review mitosis before the exam".
```

## Troubleshooting

### 1. `npm run build` says "Missing script: build"

This project currently provides a `dev` script rather than a `build` script.

Use:

```bash
npm run dev
```

### 2. MCP Inspector does not show the tools

Make sure the server is started through the Inspector command:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

Then initialize the connection in the Inspector. The available tools should include:

* `search_notes`
* `get_note`
* `create_note`

### 3. A note cannot be found

Check that the note exists inside the `data/` directory and use its exact identifier, for example:

```json
{
  "note_id": "biology.md"
}
```

If the identifier is invalid or the note does not exist, the server returns a safe error instead of exposing filesystem details.

## License

This project is licensed under the ISC License.
