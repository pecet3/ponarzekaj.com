import type {
  Post,
  Comment,
  User,
  PostLikes,
  CommentLikes,
} from "@prisma/client";

export type FullComment = Comment & {
  likes?: CommentLikes[];
};

export type FullPost = Post & {
  comments: Comment[];
  author: User;
  likes?: PostLikes[];
};
