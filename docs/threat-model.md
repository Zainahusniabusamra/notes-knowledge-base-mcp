# Threat Model - Notes Knowledge Base MCP

## Assets

* Local Markdown notes stored under `data/`
* Note contents and metadata
* MCP tool inputs and outputs
* Filesystem access and application code
* User-created notes

## Trust Boundaries

1. **MCP client -> MCP server**
   Tool inputs are untrusted and must be validated before use.

2. **MCP server -> local filesystem**
   File paths and file contents must be treated as untrusted data.

3. **Tool output -> AI model/client**
   Outputs should be concise, structured, and must not expose unintended files or sensitive data.

## Top 5 Risks and Mitigations

| Risk                                                   | Mitigation                                                                                    |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Path traversal (`../`) accessing files outside `data/` | Resolve paths and reject paths outside the allowed `data/` directory.                         |
| Invalid or unexpected tool input                       | Validate all tool inputs with Zod schemas before processing.                                  |
| Malformed or unexpected file contents                  | Validate parsed data and handle invalid files safely.                                         |
| File or network operation hangs                        | Use request timeouts for external calls and avoid indefinite waits.                           |
| Errors expose internal details                         | Log detailed failures to stderr while returning short, safe error messages to the user/model. |

## Week 4 Hardening Plan

* Enforce safe filesystem path handling.
* Validate all external and file data with Zod.
* Add consistent timeout handling for network requests.
* Review secrets and `.env` handling.
* Improve error messages and avoid leaking internal information.
