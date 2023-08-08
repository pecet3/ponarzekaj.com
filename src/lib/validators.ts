import { z } from "zod";

export const createPostValidator = z.object({
  content: z.string(),
  authorId: z.string(),
  emoji: z.string().emoji(),
});

export const LikePostValidator = z.object({
  userId: z.string(),
  postId: z.string(),
});

export const LikeCommentValidator = z.object({
  userId: z.string(),
  commentId: z.string(),
});

export const createCommentValidator = z.object({
  content: z.string(),
  authorId: z.string(),
  postId: z.string(),
});
