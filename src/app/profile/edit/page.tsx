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
import { EditForm } from "../../../components/editProfile/EditForm";

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
      <EditForm user={user} />
    </MainTile>
  );
};

export default page;
