"use client";
import React from "react";
import type { User } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { Icons } from "../ui/Icons";
import { updateProfile } from "../../next_actions/profile";

const ChangePhoto: React.FunctionComponent<{ content: string }> = ({
  content,
}) => {
  return <div className="rounded-md p-1 text-sm bg-purple-800">{content}</div>;
};

export const EditForm: FunctionComponent<{ user: User }> = ({ user }) => {
  const [isFile, setIsFile] = useState({
    avatar: false,
    background: false,
  });
  return (
    <form
      className="flex flex-col justify-center py-2 sm:py-8 items-center sm:bg-transparent bg-slate-500 rounded-none sm:rounded-md gap-4"
      action={async (formData) => {
        await updateProfile(formData);
      }}
    >
      <div className="flex flex-wrap justify-center mx-auto gap-6 p-1  items-center">
        <div className="flex gap-2 flex-col items-center bg-slate-600 rounded-md p-1">
          <Image
            src={user.image ?? ""}
            alt={`zdjęcie ${user.name}`}
            height={200}
            width={200}
            className="rounded-full w-16 h-16"
          />
          <label className="hover:cursor-pointer">
            <div className="">
              {isFile.avatar ? (
                <Icons.Confirm size={20} className="text-green-600" />
              ) : (
                <ChangePhoto content="Zmień profilowe" />
              )}
            </div>
            <input
              name="avatar"
              type="file"
              className="hidden"
              onChange={() =>
                setIsFile(
                  (prev) =>
                    (prev = {
                      ...prev,
                      avatar: true,
                    })
                )
              }
            />
          </label>
          <Image
            src={user.backgroundImage ?? ""}
            alt={`zdjęcie ${user.name}`}
            height={640}
            width={360}
            className="rounded-sm w-32 h-16"
          />
          <label className="hover:cursor-pointer">
            <div className="">
              {isFile.background ? (
                <Icons.Confirm size={20} className="text-green-600" />
              ) : (
                <ChangePhoto content="Zmień zdjęcie w tle" />
              )}
            </div>
            <input
              name="background"
              type="file"
              className="hidden"
              onChange={() =>
                setIsFile(
                  (prev) =>
                    (prev = {
                      ...prev,
                      avatar: true,
                    })
                )
              }
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col bg-slate-600 rounded-md h-full p-1 flex-grow gap-2">
            <input
              type="text"
              name="name"
              placeholder={user.name || "Wpisz swoje imię"}
              className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
            />
            <input
              type="email"
              name="email"
              placeholder={user.email || "Wpisz swoje imię"}
              className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
            />
            <textarea
              placeholder={user.description || "Twój opis"}
              name="description"
              rows={3}
              autoFocus={true}
              className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black resize-none w-full"
            />
          </div>
          <div className="flex flex-col gap-2 bg-slate-600 rounded-md h-full p-1 flex-grow">
            <input
              type="password"
              name="password"
              className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
              placeholder="*****"
            />
            <input
              type="password"
              name="repeatedPassword"
              className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
              placeholder="*****"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 justify-center items-center">
        <p className="text-xs">
          Nie zapomnij wysłać zmian, po ich wprowadzeniu 😉
        </p>
        <SubmitButton />
      </div>
    </form>
  );
};
