import * as React from "react";
import type { Friend } from "@prisma/client";
import { db } from "@/lib/db";
import Image from "next/image";
import { Icons } from "../ui/Icons";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
interface IProvidersProps {
  friend: Friend;
}

export const FriendView: React.FunctionComponent<IProvidersProps> = async ({
  friend,
}) => {
  const session = await getAuthSession();
  if (!session) return null;
  const user = await db.user.findUnique({
    where: {
      id: friend.friendId,
    },
  });

  if (!user) return null;

  const encodedUsername = encodeURIComponent(user.name as string);
  return (
    <li className="list-none flex justify-center items-center">
      <Link
        href={`/profile/${encodedUsername}`}
        className="bg-sky-900 text-slate-200 rounded-lg
         shadow-md shadow-gray-800 w-full p-2 flex gap-2 items-center"
      >
        <Image
          src={user.image ?? ""}
          width={96}
          height={96}
          className="rounded-full h-8 w-8 sm:h-12 sm:w-12"
          alt="Zdjęcie użytkownika co chce dodać Cię do znajomych"
        />

        <p className="text-lg sm:text-xl font-semibold">{user.name}</p>
      </Link>
    </li>
  );
};
