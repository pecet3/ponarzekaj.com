import { z } from "zod";

export const createPostValidator = z.object({
  content: z.string(),
  authorId: z.string(),
  emoji: z.string().emoji(),
});

export const LikeValidator = z.object({
  userId: z.string(),
  postId: z.string(),
});

export const createCommentValidator = z.object({
  content: z.string(),
  authorId: z.string(),
  postId: z.string(),
});
