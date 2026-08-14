import * as z from "zod/v4";

export const createNoteInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  content: z
    .string()
    .trim()
    .min(1)
    .max(10000),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(50)
    )
    .max(10)
    .optional(),
});