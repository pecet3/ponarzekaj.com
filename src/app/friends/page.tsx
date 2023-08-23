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
import { FriendView } from "@/components/FriendView";
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page: FunctionComponent<PageProps> = async ({ searchParams }) => {
  const session = await getAuthSession();

  const notificationId = searchParams["notificationId"] ?? "";

  const friends = await db.friend.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <MainTile>
      <div className="flex max-w-3xl w-full flex-col gap-2 bg-slate-800 p-3 h-64 rounded-t-lg border-b-2 border-slate-400 overflow-y-scroll">
        {friends.map((friend) => {
          if (friend.accepted === true) return;
          return (
            <FriendRequest
              key={friend.id}
              friend={friend}
              notificationId={notificationId as string}
            />
          );
        })}
      </div>
      <div className="flex max-w-3xl w-full flex-col bg-slate-800 gap-2 p-3 h-64 rounded-b-lg overflow-y-scroll">
        {friends.map((friend) => {
          if (friend.accepted === false) return;
          return <FriendView key={friend.id} friend={friend} />;
        })}
      </div>
    </MainTile>
  );
};

export default page;
