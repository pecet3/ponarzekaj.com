"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import type { User } from "@prisma/client";

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
  const [input, setInput] = useState<{ content: string; emoji: string }>({
    content: "",
    emoji: "😐",
  });
  const [counter, setCounter] = useState<number>(input.content.length);
  const maxInputLength = 280;

  useEffect(() => {
    setCounter(input.content.length);
  }, [input]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/add-a-post", {
        content: input.content,
        emoji: input.emoji,
      });
      // toast.success("Dodałeś Post!");
      console.log(response);
    } catch (error) {
      console.log(error);
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-center gap-1 bg-slate-900 p-1 sm:p-2 md:gap-2 rounded-md max-w-3xl"
    >
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
        placeholder="Wpisz to co cię wkurza..."
        rows={2}
        className="grow bg-transparent outline-none resize-none text-slate-200"
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
    </form>
  );
};
