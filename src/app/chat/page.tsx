import React from "react";
import { db } from "@/lib/db";
import { Error } from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/post/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";

import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  if (!session) return;

  return (
    <MainTile>
      <p className="text-black">chat</p>
    </MainTile>
  );
};

export default page;
