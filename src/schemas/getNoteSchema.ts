import * as z from "zod/v4";

// Tool: get_note
export const getNoteInputSchema = z.object({
  note_id: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .describe("Identifier or file path of the note to retrieve"),
});