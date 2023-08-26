import * as React from "react";
import type { Friend } from "@prisma/client";
import { db } from "@/lib/db";
import Image from "next/image";
import { Icons } from "./ui/Icons";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
interface IProvidersProps {
  name: string;
}

export const SearchResults: React.FunctionComponent<IProvidersProps> = async ({
  name,
}) => {
  const session = await getAuthSession();
  if (!session) return null;
  const results = await db.user.findMany({
    where: {
      name: name,
    },
  });

  if (!results) return null;

  return (
    <ul>
      {results.map((user) => (
        <li className="list-none">
          <Link
            href={`/profile/${name}`}
            className="bg-blue-900 text-slate-200 rounded-lg
         shadow-md shadow-gray-800 w-full p-2 flex gap-2"
          >
            <Image
              src={user.image ?? ""}
              width={96}
              height={96}
              className="rounded-full h-14 w-14"
              alt="Zdjęcie użytkownika co chce dodać Cię do znajomych"
            />
            <span>
              <p className="text-lg sm:text-xl font-semibold">{user.name}</p>
              <p className="text-base sm:text-sm text-slate-400">
                {user.email}
              </p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
