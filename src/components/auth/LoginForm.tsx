"use client";
import { SubmitButton } from "../SubmitButton";
import { toast } from "react-hot-toast";
import { login } from "../../next_actions/auth";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-1 justify-center items-center text-slate-200"
      action={async (form) => {
        await login(form);
        router.push("/sign-in");
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
