"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAComment } from "@/next_actions/comment";
import { SubmitButton } from "../SubmitButton";

export const CreateComment: React.FC<{ user: User | null; postId: string }> = ({
  user,
  postId,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [input, setInput] = useState<string>("");
  const [counter, setCounter] = useState<number>(input.length);
  const maxInputLength = 280;

  useEffect(() => {
    setCounter(input.length);
  }, [input]);

  if (!user) return null;
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const { error, success } = await createAComment(formData, postId);

        if (error) return toast.error("Ups... Coś poszło nie tak");

        if (success) toast.success("Dodałeś post!");

        formRef.current?.reset();
        setInput("");
      }}
      className="flex w-full items-center justify-center gap-1 bg-slate-800 md:gap-2 max-w-3xl p-2 border-b-2 border-t border-slate-400"
    >
      <textarea
        placeholder="Skomentuj..."
        rows={2}
        autoFocus={true}
        className="grow bg-transparent outline-none resize-none placeholder:italic text-slate-200"
        name="content"
        onChange={(e) => setInput(e.target.value)}
      />
      {true ? (
        <>
          <div className="flex flex-col items-center gap-1 self-end">
            <div className="flex flex-col items-center gap-1 justify-center">
              <SubmitButton />

              <p
                className={`text-[10px] text-slate-200 ${
                  counter > maxInputLength ? "text-red-400" : ""
                }`}
              >
                {counter}/{maxInputLength}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </form>
  );
};
