import * as React from "react";
import type { Friend } from "@prisma/client";
import { db } from "@/lib/db";
import Image from "next/image";
import { Icons } from "./ui/Icons";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
interface IProvidersProps {
  friend: Friend;
  notificationId?: string;
}

export const FriendRequest: React.FunctionComponent<IProvidersProps> = async ({
  friend,
  notificationId,
}) => {
  const session = await getAuthSession();
  if (!session) return null;
  const user = await db.user.findUnique({
    where: {
      id: friend.friendId,
    },
  });

  if (!user) return null;
  const acceptFriend = async () => {
    "use server";

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
    await db.notification.create({
      data: {
        userId: friend.friendId,
        content: `zaakceptował Twoje zaproszenie`,
        link: `/profile/${user.name}`,
        authorId: session?.user.id as string,
      },
    });

    if (notificationId) {
      await db.notification.delete({
        where: {
          id: notificationId,
        },
      });
    }
    revalidatePath("/profile");
  };
  const denyFriend = async () => {
    "use server";

    await db.friend.deleteMany({
      where: {
        friendId: session?.user.id,
        userId: friend.friendId,
      },
    });
    await db.friend.delete({
      where: {
        id: friend.id,
      },
    });
    await db.notification.delete({
      where: {
        id: notificationId,
      },
    });
    revalidatePath("/profile");
  };
  return (
    <div className="bg-slate-800 text-slate-200 rounded-md shadow-md shadow-gray-800 w-full p-2 flex gap-2">
      <Image
        src={user.image ?? ""}
        width={96}
        height={96}
        className="rounded-full h-14 w-14"
        alt="Zdjęcie użytkownika co chce dodać Cię do znajomych"
      />
      <span className="text-slate-200 flex-1">
        <p className="text-lg sm:text-xl font-semibold">{user.name}</p>
        <p className="text-base sm:text-sm text-slate-300">{user.email}</p>
      </span>
      <span className="flex items-center justify-self-end gap-6">
        <form action={acceptFriend}>
          <button type="submit">
            <Icons.Confirm size={32} />
          </button>
        </form>
        <form action={denyFriend}>
          <button type="submit">
            <Icons.Reject size={32} />
          </button>
        </form>
      </span>
    </div>
  );
};
