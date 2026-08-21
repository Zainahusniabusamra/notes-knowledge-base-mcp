# Manual Test Plan

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| TC-01 | create_note | Clean test state; use `examples/create_note.json` | `{"title":"Exam Reminder","content":"Review mitosis before the exam","tags":["biology","exam"]}` | Note is created successfully and stored under `data/`. | PASS | Inspector: note created successfully |
| TC-02 | create_note | Clean test state | Content exceeds 10,000 characters | Validation rejects the request with a safe actionable error. | PASS | Inspector: validation rejects content over 10,000 characters |
| TC-03 | get_note | `biology.md` exists in `data/` | `{"note_id":"biology.md"}` | Existing note is returned successfully. | PASS | Inspector: biology note returned |
| TC-04 | get_note | No filesystem changes required | `{"note_id":"../../etc/passwd"}` | Path traversal is rejected with a safe error; no file outside `data/` is accessed. | PASS | Inspector: note not found / safe error |
| TC-05 | search_notes | Test notes exist | `{"query":"photosynthesis","limit":5}` | Matching notes are returned and result count does not exceed the requested limit. | PASS | Inspector: biology.md returned |
| TC-06 | search_notes | Test notes exist | `{"query":"","limit":5}` | Validation rejects the request with a safe actionable error. | PASS | Inspector: empty query rejected |
| TC-07 | search_notes | Test state with no matching notes | `{"query":"term-that-does-not-exist","limit":5}` | Search completes successfully and returns an empty result set without an error. | PASS | Inspector: results are empty |
| TC-08 | create_note | Test notes are available | `{"title":"Test","content":"x","tags":["a","b","c","d","e","f","g","h","i","j","k"]}` | Validation rejects the request because tags exceed the maximum of 10 items. | PASS | Inspector: input validation error, maximum 10 items |