import { z } from "zod";

export const createPostValidator = z.object({
  content: z.string().min(1).max(280),
  emoji: z.string().emoji(),
  authorId: z.string(),
});

export const postValidator = z.object({
  userId: z.string(),
  postId: z.string(),
});

export const commentValidator = z.object({
  userId: z.string(),
  commentId: z.string(),
});

export const createCommentValidator = z.object({
  content: z.string().min(1).max(280),
  postId: z.string(),
  authorId: z.string(),
});

export const registerValidator = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string()
})

export const loginValidator = z.object({
  email: z.string(),
  password: z.string(),
}) 