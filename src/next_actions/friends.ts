"use server"
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db";
import { getAuthSession } from '../lib/auth';

export const addFriend = async function addFriend(user: any) {
    "use server";
    const session = await getAuthSession()
    if (!session)
        return console.log("nieudalo sie");

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