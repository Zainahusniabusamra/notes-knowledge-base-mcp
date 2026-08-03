# Week 3 Data Plan

## Project
Notes Knowledge Base MCP

## Data Source

This project uses local Markdown files stored in the project folder.
No external APIs or authentication are required.

| Tool | Source | Fixture Path | Auth | Failure Modes | Example Response |
|------|--------|--------------|------|---------------|------------------|
| search_notes | Local Markdown files | examples/notes/ | None | No matching notes, empty folder | {"results":[{"title":"Biology","snippet":"Photosynthesis is the process..."}]} |
| get_note | Local Markdown files | examples/notes/ | None | Note not found | {"title":"Biology","content":"Photosynthesis is the process by which plants make food."} |
| create_note | Local Markdown files | examples/notes/ | None | Missing title, file write error | {"success":true,"message":"Note created successfully."} |