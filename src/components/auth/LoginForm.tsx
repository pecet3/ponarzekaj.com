"use client";
import { SubmitButton } from "../SubmitButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  return (
    <form
      className="flex flex-col gap-1 justify-center items-center text-slate-200"
      action={async (form) => {
        const email = form.getAll("email").toString();
        const password = form.getAll("password").toString();
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      }}
    >
      <input
        type="email"
        className="p-1  rounded-md text-sm"
        name="email"
        placeholder="email"
        required
      />

      <input
        type="password"
        className="p-1 rounded-md text-sm"
        name="password"
        placeholder="hasło"
        required
      />

      <SubmitButton />
    </form>
  );
};
