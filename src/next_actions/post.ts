"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth";
import { PostInput } from "@/components/post/CreateAPost";
import { utapi } from "uploadthing/server";
import { createPostValidator } from '../lib/validators';

interface FileEsque extends Blob {
  name: string;
}

export const createAPost = async (form: FormData, input: PostInput) => {
  try {
    const session = await getAuthSession();
    const authorId = session?.user.id as string;

    const { emoji, content } = createPostValidator.parse({ emoji: input.emoji, content: input.content });


    const files = form.getAll("files");

    const file = files[0] as FileEsque;



    if (!session) throw new Error();

    const { success } = await ratelimit.post.limit(authorId);

    if (!success) throw new Error();

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
    if (!user) throw new Error();

    if (file.size > 0) {
      const response = await utapi.uploadFiles(file as FileEsque);

      const post = await db.post.create({
        data: {
          authorId,
          emoji,
          content,
          fileUrl: response.data?.url,
          fileKey: response.data?.key,
        },
      });

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
      return { success: true };
    }

    const post = await db.post.create({
      data: {
        authorId,
        emoji,
        content,
      },
    });

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
    return { success: true };
  } catch (error) {
    return { error };
  } finally {
    revalidatePath("/");
  }
};
