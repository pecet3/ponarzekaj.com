"use server"
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db";
import { getAuthSession } from '../lib/auth';
import { UserWithFriends } from '../types/prisma';

export const addFriend = async function addFriend(user: UserWithFriends) {

    const session = await getAuthSession()
    if (!session)
        return

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
};