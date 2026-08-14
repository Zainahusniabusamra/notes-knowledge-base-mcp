# Week 4 Peer Review — review-checklist.md

**Project reviewed:** notes-knowledge-base-mcp (PR #4, branch `week4-hardening`)
**Reviewers:** Mohammad Shamasneh, Nadeen Jaber
**Date:** August 2026

## What worked well
- Each P0 tool (`create_note`, `get_note`, `search_notes`) has its own Zod schema with trimming and length bounds.
- `search_notes` is well bounded: query min/max and an optional integer limit capped at 20.
- `create_note` bounds content (max 10,000 chars) and tags (max 10, each max 50 chars).
- Path containment is implemented centrally in `resolveSafeDataPath`; `get_note` additionally requires a `.md` extension and matches by basename.

## Issues found
1. **get_note — description wording.** `note_id` is described as "Identifier or file path," which invites path-shaped input from the model. Containment still holds (see traversal test), so this is a wording/hardening item, not a break. **(P1)**
2. **get_note / search_notes — error messages.** Both catch blocks return the raw `error.message` (and `get_note` echoes `note_id` back) to the model. Recommend a generic message plus a bounded code, with details logged only to stderr. **(P1)**
3. **search_notes — limit default.** Confirm an explicit cap is always applied even when `limit` is omitted, so an omitted limit can't return an uncontrolled response. **(P1)**
4. **docs/review-checklist.md** was not yet in the PR — required for Task 4.6. *(Resolved by this file.)*

## Traversal test results
Tested `get_note` / `resolveSafeDataPath` against traversal payloads — all rejected:
- `../../etc/passwd` → REJECTED ("Invalid note path")
- `../secret.md` → REJECTED
- `notes/../../secret.md` → REJECTED
- `/etc/passwd` → REJECTED
- `../../../etc/passwd.md` → REJECTED
- URL-encoded `..%2f..` → resolves as a literal filename inside `./data`, further blocked by the `.md` + basename check.

**Containment holds — no file outside `./data` could be read.**

## Action items

| # | Item | Owner | Due | Priority |
|---|---|---|---|---|
| 1 | Reword `get_note` `note_id` description (drop "file path") | Zaina | End of Week 4 | P1 |
| 2 | Tighten error messages in `get_note` and `search_notes` (no raw error/inputs to model) | Zaina | End of Week 4 | P1 |
| 3 | Confirm/enforce explicit search limit cap when `limit` is omitted | Zaina | End of Week 4 | P1 |
| 4 | Add `docs/review-checklist.md` | Zaina | End of Week 4 | P1 |

## Overall status
**No P0 (must-fix) blockers found** — path containment holds and inputs are bounded. Overall: good, with minor-to-moderate hardening recommended before final merge.