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
import { getServerSession } from "next-auth";
import { config } from "../../../middleware";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await getServerSession();
  if (!session) return;
  const { id } = params;

  return (
    <MainTile>
      <p className="">chat: {id}</p>
    </MainTile>
  );
};

export default page;
// kocham kube bardzo bardzo <3
// kuba śmierdzi
// aga umie programować
// hahahahahahahahahahhahahahah
// jestem hakerem
// config PageProps=async{ PropTypes.any
// metadata PropTypes.any impokkksjjdhjdrt { connect } from 'react-redux' }kkkskubaniec
// FriendRequest = for(let for await (const IoMdNotifications of HiPencilAlt
//   kuba sie umyl w koncu hayhaobject) {
//   first
// } of second) {third}
