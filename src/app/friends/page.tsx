import React, { FunctionComponent } from "react";
import { db } from "@/lib/db";

import { MainTile } from "@/components/MainTile";
import { getAuthSession } from "@/lib/auth";
import { FriendRequest } from "@/components/friends/FriendRequest";
import { FriendView } from "@/components/friends/FriendView";
import { SearchUser } from "@/components/SearchAUser";
import { acceptFriend } from "../../next_actions/friends";
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

  const notAcceptedFriends = friends.filter(
    (friend) => friend.accepted === false && friend.initiator === false
  );
  console.log(notAcceptedFriends);
  return (
    <MainTile>
      <section>
        <p className="ml-3 mt-1">Zaproszenia do znajomych</p>
        <ul className="flex max-w-3xl w-full flex-col gap-2 bg-slate-800 p-3 h-32 rounded-t-lg border-b-2 border-slate-400 overflow-y-scroll">
          {notAcceptedFriends.length > 0 ? (
            notAcceptedFriends.map((friend) => {
              return (
                <FriendRequest
                  key={friend.id}
                  friend={friend}
                  notificationId={notificationId as string}
                />
              );
            })
          ) : (
            <p className="text-center italic font-thin">
              Nie masz żadnych nowych zaproszeń
            </p>
          )}
        </ul>
      </section>

      <section className="flex max-w-3xl w-full flex-col gap-2 bg-slate-800 pl-3 py-3 h-48 rounded-t-lg border-b-2 border-slate-400">
        <SearchUser />
      </section>
      <section>
        <p className="ml-3 mt-1">Lista znajomych</p>
        <ul className="flex max-w-3xl w-full flex-col bg-slate-800 gap-2 p-3 h-64 rounded-b-lg overflow-y-scroll">
          {friends.map((friend) => {
            if (friend.accepted === false) return;
            return <FriendView key={friend.id} friend={friend} />;
          })}
        </ul>
      </section>
      <div className="opacity-0">.</div>
    </MainTile>
  );
};

export default page;
