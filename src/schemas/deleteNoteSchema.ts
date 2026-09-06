import * as z from "zod/v4";

export const deleteNoteInputSchema = z.object({
  note_id: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(/^[^/\\]+\.md$/, "note_id must be a Markdown filename"),
});