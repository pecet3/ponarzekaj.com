"use client";
import React from "react";
import type { User } from "@prisma/client";
import { SubmitButton } from "./SubmitButton";

import { FunctionComponent } from "react";

export const EditForm: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
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
      <SubmitButton />
    </form>
  );
};
