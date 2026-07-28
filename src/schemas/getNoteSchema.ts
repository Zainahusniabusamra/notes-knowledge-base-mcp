import * as z from "zod/v4";

// Tool: get_note
export const getNoteInputSchema = z.object({
  note_id: z
    .string()
    .min(1)
    .describe("Identifier or file path of the note to retrieve"),
});