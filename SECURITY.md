# Security Policy

## Supported Version

This repository supports the current version of the project on the main branch.

## Reporting a Security Issue

If you find a security issue, please report it privately to the project mentor rather than opening a public issue.

## Security Hardening

This project includes the following security measures:

- Zod validation with length limits for tool inputs.
- Safe filesystem path resolution to prevent path traversal outside data/.
- Safe error messages that avoid exposing internal details.
- .env, .env.local, .key, and .pem files are excluded from Git.
- No API keys or external secrets are required by this student project.

These measures are intended for this student project and are not a complete production security system.
