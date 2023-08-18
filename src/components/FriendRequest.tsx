import * as React from "react";
import type { Friend } from "@prisma/client";
import { db } from "@/lib/db";
import Image from "next/image";
import { Icons } from "./ui/Icons";
import { revalidatePath } from "next/cache";
interface IProvidersProps {
  friend: Friend;
}

export const FriendRequest: React.FunctionComponent<IProvidersProps> = async ({
  friend,
}) => {
  const user = await db.user.findUnique({
    where: {
      id: friend.friendId,
    },
  });

  if (!user) return null;
  const acceptFriend = async () => {
    "use server";

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
        content: `Użytkownik ${user.name} dodał Cię do znajomych`,
        link: "/profile/friends",
        authorId: "session.user.id",
      },
    });
    revalidatePath("/profile/friends");
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
      <span className="flex items-center justify-self-end">
        <form action={acceptFriend}>
          <button type="submit">
            <Icons.Confirm size={24} />
          </button>
        </form>
      </span>
    </div>
  );
};
