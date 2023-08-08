"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const CreateComment: React.FC<{ user: User | null; postId: string }> = ({
  user,
  postId,
}) => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const [counter, setCounter] = useState<number>(input.length);
  const maxInputLength = 280;

  useEffect(() => {
    setCounter(input.length);
  }, [input]);

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    try {
      await axios.post("/api/comment/create", {
        content: input,
        postId,
        authorId: user?.id,
      });
      toast.success("Dodałeś komentarz!");
      setInput("");
      router.refresh();
    } catch (error) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  if (!user) return null;
  return (
    <section className="flex w-full items-center justify-center gap-1 bg-indigo-950 p-1 sm:p-2 md:gap-2 rounded-b-md max-w-3xl">
      <textarea
        placeholder="Skomentuj..."
        rows={2}
        autoFocus={true}
        className="grow bg-transparent outline-none resize-none placeholder:italic text-slate-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              handleSubmit(e);
            }
          }
        }}
      />
      {true ? (
        <>
          <div className="flex flex-col items-center gap-1 self-end">
            <div className="flex flex-col items-center gap-1 justify-center">
              <button
                onClick={handleSubmit}
                className="m-auto text-slate-200 rounded-md bg-fuchsia-700 p-1 text-sm transition-all duration-300 hover:bg-fuchsia-600 md:text-base"
                disabled={counter > maxInputLength}
              >
                Dodaj
              </button>
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
    </section>
  );
};
