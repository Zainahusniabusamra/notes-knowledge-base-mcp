# Example Conversations

This document shows how a person can use the Notes Knowledge Base MCP server with an AI model.

## Conversation A — Search Notes

**User prompt:**

> What do I have in my notes about photosynthesis?

**Expected tool calls:**

1. `search_notes`

   * `query`: `"photosynthesis"`
   * `limit`: `5`

**Good final answer:**

> I found one note about photosynthesis. Your biology note says that photosynthesis is the process by which plants produce food using sunlight.

---

## Conversation B — Retrieve a Note

**User prompt:**

> Show me my biology note.

**Expected tool calls:**

1. `get_note`

   * `note_id`: `"biology.md"`

**Good final answer:**

> Your biology note says: “Photosynthesis is the process by which plants produce food using sunlight.”

---

## Conversation C — Create a Note

**User prompt:**

> Create a note called “Exam Reminder” and remind me to review mitosis before the exam.

**Expected tool calls:**

1. `create_note`

   * `title`: `"Exam Reminder"`
   * `content`: `"Review mitosis before the exam"`
   * `tags`: `["biology", "exam"]`

**Good final answer:**

> Done — I created the “Exam Reminder” note with the reminder to review mitosis before the exam.
