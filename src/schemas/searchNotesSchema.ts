import * as z from "zod/v4";

// Tool: search_notes
export const searchNotesInputSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .describe("Search text to look for across notes"),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of results to return"),
});