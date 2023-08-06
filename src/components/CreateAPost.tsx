"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const emojiList = [
  {
    value: "😐",
    id: 1,
  },
  {
    value: "😠",
    id: 2,
  },
  {
    value: "😡",
    id: 3,
  },
  {
    value: "🤬",
    id: 4,
  },
];

export const CreatePost: React.FC<{ user: User | null }> = ({ user }) => {
  const router = useRouter();

  const [input, setInput] = useState<{ content: string; emoji: string }>({
    content: "",
    emoji: "😐",
  });
  const [counter, setCounter] = useState<number>(input.content.length);
  const maxInputLength = 280;

  useEffect(() => {
    setCounter(input.content.length);
  }, [input]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await axios.post("/api/post/create", {
        content: input.content,
        emoji: input.emoji,
        authorId: user?.id,
      });
      toast.success("Dodałeś Post!");
      setInput(
        (prev) =>
          (prev = {
            ...prev,
            content: "",
          })
      );
      router.refresh();
    } catch (error) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  if (!user) return null;
  return (
    // <form onSubmit={handleSubmit}>
    //   <textarea
    //     rows={2}
    //     value={input.content}
    //     className="text-black"
    //     onChange={(e) =>
    //       setInput(
    //         (prev) =>
    //           (prev = {
    //             ...prev,
    //             content: e.target.value,
    //           })
    //       )
    //     }
    //   />
    //   <button>submit</button>
    // </form>
    <section className="flex w-full items-center justify-center gap-1 bg-slate-900 p-1 sm:p-2 md:gap-2 rounded-md max-w-3xl">
      <Link href={`/profile/${user?.name}`}>
        <Image
          src={user?.image || ""}
          className={`h-12 w-12 rounded-full md:h-16 md:w-16 ${
            input.content ? "hidden md:flex" : ""
          }`}
          alt="Your profile photo"
          width={64}
          height={64}
        />
      </Link>
      <textarea
        placeholder="Wyrzuć swoje frustracje...śmiało"
        rows={2}
        autoFocus={true}
        className="grow bg-transparent outline-none resize-none placeholder:italic text-slate-200"
        value={input.content}
        onChange={(e) =>
          setInput(
            (prev) =>
              (prev = {
                ...prev,
                content: e.target.value,
              })
          )
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input.content !== "") {
            }
          }
        }}
      />
      {input.content !== "" ? (
        <>
          <div className="flex flex-col items-center gap-1 self-end">
            <div className="m-auto flex flex-wrap justify-center rounded-lg bg-slate-600">
              {emojiList.map((emoji) => (
                <button
                  key={emoji.id}
                  className={`${
                    emoji.value === input.emoji ? "rounded-md bg-slate-400" : ""
                  }`}
                  onClick={() =>
                    setInput(
                      (prev) =>
                        (prev = {
                          ...prev,
                          emoji: emoji.value,
                        })
                    )
                  }
                >
                  {emoji.value}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1 md:flex-row">
              <button
                onClick={handleSubmit}
                className="m-auto rounded-md bg-slate-500 p-1 text-sm transition-all duration-300 hover:bg-slate-400 md:text-base"
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
