| Tool | Source | Fixture Path | Auth | Failure Modes | Example Response |
|------|--------|--------------|------|---------------|------------------|
| search_notes | Local Markdown files | data/ | None | No matching notes, empty folder | {"results":[{"title":"Biology","snippet":"Photosynthesis is the process..."}]} |
| get_note | Local Markdown files | data/ | None | Note not found | {"title":"Biology","content":"Photosynthesis is the process by which plants make food."} |
| create_note | Local Markdown files | data/ | None | Missing title, file write error | {"success":true,"message":"Note created successfully."} |