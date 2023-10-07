"use client";
import { SubmitButton } from "../SubmitButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-1 justify-center items-center text-slate-200"
      action={async (form) => {
        const email = form.getAll("email").toString();
        const password = form.getAll("password").toString();
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        if (res?.error) {
          toast.error("Podałeś zły email lub hasło");
          return;
        }
        setTimeout(() => {
          router.refresh();
          router.push("/");
        }, 3000);
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
