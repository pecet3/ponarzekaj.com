import {z} from "zod"

export const createPostValidator = z.object({
    content: z.string(),
    authorId: z.string(),
    emoji: z.string().emoji(),
})