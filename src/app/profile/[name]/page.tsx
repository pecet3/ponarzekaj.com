import React from "react";
import { db } from "@/lib/db";
import { Error } from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/post/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { getAuthSession } from "@/lib/auth";
import { isUserThing } from "@/lib/helpers";
import { revalidatePath } from "next/cache";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { addFriend } from "../../../next_actions/friends";
import { UserWithFriends } from "../../../types/prisma";
import { FunctionComponent } from "react";
import { Form } from "../../../components/friends/AddFriendForm";

interface PageProps {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const { name } = params;
  const decodedName = decodeURI(name);

  const session = await getAuthSession();
  const data = await db.user.findMany({
    where: {
      name: decodedName,
    },
    include: {
      friends: true,
    },
  });

  if (!data) return <Error />;
  const user = data[0];

  const posts = await db.post.findMany({
    where: {
      authorId: user?.id ?? "",
    },
    include: {
      comments: true,
      author: true,
      likes: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  if (data.length === 0 || !posts) return <Error />;

  const isUserProfile = isUserThing(session?.user.id as string, user.id);

  const isAlreadyFriendList = user.friends.filter(
    (friend) => friend.friendId === session?.user.id
  );
  const pageUserFriend = isAlreadyFriendList[0];

  const isAlreadyFriendLength = isAlreadyFriendList?.length;

  const isAlreadyFriend = isAlreadyFriendLength === 0 ? false : true;

  const displayAddFriendButton =
    isAlreadyFriend || isUserProfile || pageUserFriend?.accepted === true
      ? false
      : true;

  const displayNotifications =
    pageUserFriend?.accepted && !isUserProfile ? true : false;

  const notificationAcceptFriend =
    !pageUserFriend?.accepted &&
    !isUserProfile &&
    pageUserFriend?.initiator === true
      ? true
      : false;

  const notificationIsInvited =
    !pageUserFriend?.accepted &&
    !isUserProfile &&
    pageUserFriend?.initiator === false
      ? true
      : false;

  // const addFriend = async () => {
  //   "use server";
  //   await db.friend.create({
  //     data: {
  //       userId: user.id ?? "",
  //       friendId: session?.user.id ?? "",
  //     },
  //   });
  //   await db.friend.create({
  //     data: {
  //       userId: session?.user.id ?? "",
  //       friendId: user.id ?? "",
  //       initiator: true,
  //     },
  //   });
  //   await db.notification.create({
  //     data: {
  //       userId: user.id ?? "",
  //       authorId: session?.user.id ?? "",
  //       content: "Wysłał Ci zaproszenie do znajomych",
  //       link: `/friends`,
  //     },
  //   });
  //   revalidatePath("/");
  // };

  // pagination things

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = posts.slice(start, end);

  return (
    <MainTile>
      <div className="relative">
        <Image
          src={user.backgroundImage ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={1280}
          width={720}
          className="h-56 sm:h-96 sm:rounded-t-xl  w-screen"
        />
        <Image
          src={user.image ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={700}
          width={700}
          className="absolute rounded-full w-32 h-32  sm:w-40 sm:h-40 left-3 bottom-[-4rem] sm:bottom-[-5rem] "
        />
      </div>
      <div className="flex flex-col sm:ml-48 ml-40 mt-2 text-slate-200 break-words">
        <span className="flex justify-between items-end">
          <p className="text-xl sm:text-2xl  font-bold">{user.name}</p>
          {displayAddFriendButton && session && user ? (
            // <form
            //   action={async () => {
            //     "use server";
            //     const { success, error } = await addFriend(user);
            //     if (success) {
            //       toast.success("Wysłałeś zaproszenie!");
            //     }
            //     if (error) {
            //       toast.error("Ups...coś poszło nie tak");
            //     }
            //   }}
            //   className="bg-slate-900 rounded-lg p-1 mx-2 hover:bg-slate-950 duration-300"
            // >
            //   <button type="submit" className="text-slate-200 flex gap-1">
            //     <Icons.AddFriend size={20} className="text-blue-400" />
            //     Dodaj
            //   </button>
            // </form>
            <Form user={user} />
          ) : notificationAcceptFriend ? (
            <div className="bg-slate-900 rounded-lg p-1 mx-2 hover:bg-slate-950 duration-300">
              <Link href="/friends" className="text-slate-200 flex gap-1">
                Akceptuj zaproszenie
              </Link>
            </div>
          ) : notificationIsInvited ? (
            <div className="bg-slate-900 rounded-lg p-1 mx-2 hover:bg-slate-950 duration-300">
              <Link href="/friends" className="text-slate-200 flex gap-1">
                Wysłano zaproszenie
              </Link>
            </div>
          ) : displayNotifications ? (
            <div className="bg-slate-900 rounded-lg p-1 mx-2 hover:bg-slate-950 duration-300">
              <Link href="/friends" className="text-slate-200 flex gap-1">
                Jesteście znajomymi
              </Link>
            </div>
          ) : null}
        </span>
        <p className="text-base sm:text-xl ">{user.email}</p>
      </div>
      <div className="mt-10  flex flex-col border-t-2 border-slate-400">
        {entries.map((post) => {
          return <PostView post={post} key={post.id} />;
        })}
      </div>
      <PaginationControls
        hasNextPage={end < posts.length}
        hasPrevPage={start > 0}
        postId={decodedName}
        length={posts.length}
      />
    </MainTile>
  );
};

export default page;
