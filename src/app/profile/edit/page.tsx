import React from "react";
import { db } from "@/lib/db";
import { Error } from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/post/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { getAuthSession } from "@/lib/auth";
import { SubmitButton } from "../../../components/SubmitButton";

const page = async () => {
  const session = await getAuthSession();
  if (!session) return null;
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) return <Error />;

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
      <div className="flex flex-col sm:ml-48 ml-36 mt-2 text-slate-200 break-words">
        <span className="flex justify-between items-end">
          <p className="text-xl sm:text-2xl  font-bold">{user.name}</p>
        </span>
        <p className="text-base sm:text-xl ">{user.email}</p>
      </div>
      <form className="mt-16 flex flex-col justify-center mx-auto gap-2 sm:bg-transparent bg-slate-700 rounded-md p-2">
        <input
          type="name"
          name="name"
          placeholder={user.name || "Wpisz swoje imię"}
          className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-black"
        />
        <input
          type="email"
          name="email"
          placeholder={user.email || "Wpisz swoje imię"}
          className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-black"
        />
      </form>
      <div className="opacity-0">.</div>
    </MainTile>
  );
};

export default page;
