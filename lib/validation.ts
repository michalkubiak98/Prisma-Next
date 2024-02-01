import { z } from "zod"

export const jobFilterSchema = z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
})

// turns the schema above and turns it into a typescript type
export type JobFilterValues = z.infer<typeof jobFilterSchema>