"use server"
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db";
import { getAuthSession } from '../lib/auth';
import { UserWithFriends } from '../types/prisma';
import { Friend } from "@prisma/client"
export const addFriend = async (user: UserWithFriends) => {
  "use server"
  try {
    const session = await getAuthSession()
    if (!session) throw new Error();

    await db.friend.create({
      data: {
        userId: user.id ?? "",
        friendId: session?.user.id ?? "",
      },
    });
    await db.friend.create({
      data: {
        userId: session?.user.id ?? "",
        friendId: user.id ?? "",
        initiator: true,
      },
    });
    await db.notification.create({
      data: {
        userId: user.id ?? "",
        authorId: session.user.id ?? "",
        content: "Wysłał Ci zaproszenie do znajomych",
        link: `/friends`,
      },
    });
    revalidatePath("/");
    return { success: true }
  } catch (error) {
    return { error: true }
  }
};

export const acceptFriend = async (friend: Friend) => {
  try {
    const session = await getAuthSession()

    await db.friend.updateMany({
      where: {
        friendId: session?.user.id,
        userId: friend.friendId,
      },
      data: {
        accepted: true,
      },
    });

    await db.friend.update({
      where: {
        id: friend.id,
      },
      data: {
        accepted: true,
      },
    });
    const friendData = await db.user.findUnique({
      where: {
        id: friend.friendId,
      },
    });
    await db.notification.create({
      data: {
        userId: friend.friendId,
        content: `zaakceptował Twoje zaproszenie`,
        link: `/profile/${friendData?.name}`,
        authorId: session?.user.id as string,
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    return { error }
  }
};