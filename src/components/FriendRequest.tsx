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
    if (!!notificationId) {
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
    await db.friend.delete({
      where: {
        id: friend.id,
      },
    });
    await db.friend.deleteMany({
      where: {
        friendId: session?.user.id,
        userId: friend.friendId,
      },
    });
    if (notificationId) {
      const notification = await db.notification.findUnique({
        where: {
          id: notificationId,
        },
      });

      notification &&
        (await db.notification.delete({
          where: {
            id: notificationId,
          },
        }));
    }
    revalidatePath("/profile");
  };
  return (
    <li className="bg-blue-900 text-slate-200 rounded-lg shadow-md shadow-gray-800 w-full px-1 sm:p-2 flex gap-0.5 sm:gap-2 items-center ">
      <Image
        src={user.image ?? ""}
        width={96}
        height={96}
        className="rounded-full h-8 w-8 sm:h-12 sm:w-12"
        alt="Zdjęcie użytkownika co chce dodać Cię do znajomych"
      />
      <span className="text-slate-200 flex-1 w-24 break-words">
        <p className="text-lg sm:text-xl font-semibold m-0">{user.name}</p>
        <p className="text-base sm:text-sm text-slate-400 m-0">{user.email}</p>
      </span>
      <span className="flex items-center justify-self-end gap-1 sm:gap-2">
        <form action={acceptFriend}>
          <button type="submit" className="sm:hidden block">
            <Icons.Confirm size={24} />
          </button>
          <button type="submit" className="hidden sm:block">
            <Icons.Confirm size={32} />
          </button>
        </form>
        <form action={denyFriend}>
          <button type="submit" className="sm:hidden block">
            <Icons.Reject size={24} />
          </button>
          <button type="submit" className="hidden sm:block">
            <Icons.Reject size={32} />
          </button>
        </form>
      </span>
    </li>
  );
};
