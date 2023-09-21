"use client";
import { SubmitButton } from "../SubmitButton";
import { toast } from "react-hot-toast";
import { register } from "../../next_actions/auth";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-1 justify-center items-center text-slate-200"
      action={async (form) => {
        const password = form.getAll("password");
        const repeatedPassword = form.getAll("repeatedPassword");
        console.log(
          "p1: " + password,
          "p2: " + repeatedPassword,
          form.getAll("name").toString()
        );
        if (password == repeatedPassword)
          return toast.error("Hasła nie są takie same!");
        await register(form);
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
        type="text"
        className="p-1  rounded-md text-sm"
        name="name"
        placeholder="imię i nazwisko"
        required
      />
      <input
        type="password"
        className="p-1 rounded-md text-sm"
        name="password"
        placeholder="hasło"
        required
      />
      <input
        type="password"
        className="p-1 rounded-md text-sm"
        name="repeatedPassword"
        placeholder="powtórz hasło"
        required
      />
      <SubmitButton />
    </form>
  );
};
