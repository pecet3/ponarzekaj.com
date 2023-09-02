"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { ratelimit } from "./redis";
import { getAuthSession } from "./auth";
import { PostInput } from "@/components/post/CreateAPost";
import { utapi } from "uploadthing/server";

interface FileEsque extends Blob {
  name: string;
}

export const createAPost = async (form: FormData, input: PostInput) => {
  try {
    const { emoji, content } = input;

    const files = form.getAll("files");

    const session = await getAuthSession();
    const authorId = session?.user.id as string;

    if (!session) return;

    const { success } = await ratelimit.post.limit(authorId);

    if (!success) return;

    const response =
      files.length > 0
        ? await utapi.uploadFiles(files as FileEsque | FileEsque[])
        : null;

    console.log(response);
    const post = response
      ? await db.post.create({
          data: {
            authorId,
            emoji,
            content,
          },
        })
      : await db.post.create({
          data: {
            authorId,
            emoji,
            content,
          },
        });

    const user = await db.user.findUnique({
      where: {
        id: authorId,
      },
      select: {
        friends: {
          where: {
            accepted: true,
          },
        },
      },
    });
    if (!user) return;

    for (const friend of user.friends) {
      await db.notification.create({
        data: {
          userId: friend.friendId,
          content: "opublikował post",
          link: `/post/${post.id}`,
          authorId: authorId,
        },
      });
    }

    revalidatePath("/");
  } catch (error) {
    return error;
  }
};
export const createAComment = async (form: FormData, postId: string) => {
  const session = await getAuthSession();
  const content = form.get("content");
  await db.comment.create({
    data: {
      authorId: session?.user.id as string,
      content: content as string,
      postId,
    },
  });
  revalidatePath(`/post/${postId}`);
};
