import React, { FunctionComponent } from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/post/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { getAuthSession } from "@/lib/auth";
import { isUserThing } from "@/lib/helpers";
import { FriendRequest } from "@/components/FriendRequest";
import { Main } from "@/components/Main";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page: FunctionComponent<PageProps> = async ({ searchParams }) => {
  const session = await getAuthSession();

  const notificationId = searchParams["notificationId"] ?? "";

  const friends = await db.friend.findMany({
    where: {
      userId: session?.user.id,
      accepted: false,
    },
  });

  return (
    <Main>
      <section className="flex max-w-3xl w-full flex-col gap-2">
        {friends.map((friend) => (
          <FriendRequest
            key={friend.id}
            friend={friend}
            notificationId={notificationId as string}
          />
        ))}
      </section>
    </Main>
  );
};

export default page;
