"use client";
import React from "react";
import { Icons } from "@/components/ui/Icons";

import { toast } from "react-hot-toast";

import { addFriend } from "../../../next_actions/friends";
import { UserWithFriends } from "../../../types/prisma";
import { FunctionComponent } from "react";

export const Form: FunctionComponent<{ user: UserWithFriends }> = ({
  user,
}) => {
  return (
    <form
      action={async () => {
        const { success, error } = await addFriend(user);
        if (success) {
          toast.success("Wysłałeś zaproszenie!");
        }
        if (error) {
          toast.error("Ups...coś poszło nie tak");
        }
      }}
      className="bg-slate-900 rounded-lg p-1 mx-2 hover:bg-slate-950 duration-300"
    >
      <button type="submit" className="text-slate-200 flex gap-1">
        <Icons.AddFriend size={20} className="text-blue-400" />
        Dodaj
      </button>
    </form>
  );
};
