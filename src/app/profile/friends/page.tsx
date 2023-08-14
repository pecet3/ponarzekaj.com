import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/postView/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { getAuthSession } from "@/lib/auth";
import { isUserThing } from "@/lib/helpers";

interface PageProps {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async () => {
  const session = await getAuthSession();

  const friends = await db.friend.findMany({
    where: {
      userId: session?.user.id,
      accepted: false,
    },
  });

  async function acceptRequest() {
    "use server";
  }

  return (
    <MainTile>
      {friends.map(async (friend) => {
        const userInfo = await db.user.findUnique({
          where: {
            id: friend.friendId,
          },
        });
        return (
          <div key={friend.id} className="flex">
            {userInfo?.name}
            <form action={acceptRequest}>
              <button type="submit" formAction={acceptRequest}>
                accept
              </button>
            </form>
          </div>
        );
      })}
    </MainTile>
  );
};

export default page;
