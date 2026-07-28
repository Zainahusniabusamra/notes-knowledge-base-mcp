import * as z from "zod/v4";

// Tool: create_note
export const createNoteInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .describe("Title of the new note"),

  content: z
    .string()
    .min(1)
    .describe("Content/body of the note"),

  tags: z
    .array(z.string())
    .optional()
    .describe("Optional tags for organizing the note"),
});