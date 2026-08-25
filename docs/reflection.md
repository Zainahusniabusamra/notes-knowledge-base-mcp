# Final Reflection — Notes Knowledge Base MCP

## Wins

- Built a working MCP server in TypeScript using the Model Context Protocol SDK.
- Designed and implemented three tools: `search_notes`, `get_note`, and `create_note`.
- Added Zod validation for tool inputs and tested the tools with MCP Inspector.
- Organized the project with documentation, example conversations, test evidence, and a clear README.
- Updated dependencies, fixed reported security vulnerabilities, and shipped the project publicly on GitHub as `v1.0.0`.
- Successfully connected the project to Claude Desktop and demonstrated the tools working with real notes.

## Blockers

One of the biggest challenges was understanding how MCP tools, schemas, the server, and the client work together. I also had to troubleshoot TypeScript and dependency issues, including security vulnerabilities reported by `npm audit`. Testing the server through MCP Inspector and then connecting it to Claude Desktop helped me understand the complete workflow much better.

## Resume Blurb

Built and shipped a public Notes Knowledge Base MCP server using TypeScript, the Model Context Protocol SDK, and Zod. Implemented three validated MCP tools for searching, retrieving, and creating Markdown notes, and tested the server with MCP Inspector and Claude Desktop. Published the project on GitHub with documentation, test evidence, and a `v1.0.0` release.

## LinkedIn Draft

I’m excited to have completed my six-week MCP project: Notes Knowledge Base MCP. I built a TypeScript MCP server that lets an AI client search, retrieve, and create notes stored as Markdown files, and connected it successfully to Claude Desktop. This project gave me hands-on experience with MCP, tool design, Zod validation, testing, documentation, Git/GitHub, and shipping a public project. I’m looking forward to building on this experience with more AI and developer-tooling projects.

## Next Improvement

Over the next two weeks, I would improve the project by adding semantic search with embeddings, stronger tagging and filtering, and note editing and deletion. I would also explore hosting the MCP server remotely so it could be used from web-based AI clients such as claude.ai.