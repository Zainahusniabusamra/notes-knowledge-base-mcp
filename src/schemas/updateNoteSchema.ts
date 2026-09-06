import * as z from "zod/v4";

export const updateNoteInputSchema = z.object({
  note_id: z
    .string()
    .trim()
    .regex(/^[^/\\]+\.md$/, "note_id must be a Markdown filename"),

  content: z
    .string()
    .trim()
    .min(1)
    .max(10000),
});
