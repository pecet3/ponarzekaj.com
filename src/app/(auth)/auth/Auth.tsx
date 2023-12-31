"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Icons } from "../../../components/ui/Icons";
import { useSearchParams } from "next/navigation";
import { RegisterForm } from "../../../components/auth/RegisterForm";
import { LoginForm } from "../../../components/auth/LoginForm";
import Link from "next/link";

export const Auth = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  const error = searchParams.get("error");
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  if (error) return <p>error</p>;
  return (
    <main className="flex flex-col background min-h-screen text-slate-800">
      {!register ? (
        <section className="flex flex-col  mt-6 mx-auto bg-slate-400 p-2 rounded-md">
          <h1 className="font-bold mb-2 text-xl">Zaloguj się</h1>
          <LoginForm />
          <h2 className="my-4 text-base font-serif text-center font-bold">
            lub wejdź inaczej...
          </h2>
          <button
            type="button"
            className="rounded-md p-1 text-xl bg-blue-700 text-slate-300 font-semibold hover:bg-blue-600 duration-300 flex justify-center items-center"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.Spinner size={20} className="animate-spin my-1" />
            ) : (
              <span className="flex">
                <Icons.Google size={24} className="mr-2" />
                Google
              </span>
            )}
          </button>

          <Link
            href="/auth?register=true"
            className="text-sm text-blue-800 underline text-center mt-2"
          >
            Zarejestruj się
          </Link>
        </section>
      ) : (
        <section className="flex flex-col  mt-6 mx-auto bg-slate-400 p-2 rounded-md">
          <h1 className="font-bold text-xl">Zarejestruj się</h1>
          <RegisterForm />
          <h2 className="my-4 text-base font-serif text-center font-bold">
            lub wejdź inaczej...
          </h2>
          <button
            type="button"
            className="rounded-md p-1 text-xl bg-blue-700 text-slate-300 font-semibold hover:bg-blue-600 duration-300 flex justify-center items-center"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.Spinner size={20} className="animate-spin my-1" />
            ) : (
              <span className="flex">
                <Icons.Google size={24} className="mr-2" />
                Google
              </span>
            )}
          </button>
          <Link
            href="/auth"
            className="text-sm text-blue-800 underline text-center my-2"
          >
            Mam już konto
          </Link>
        </section>
      )}
      <p className="w-48 my-2 mx-auto text-black text-xs text-center font-mono space-y-0">
        Proszę nie zapominać haseł, jeszcze nie mamy podłączonego serwera email
        do stronki
      </p>
    </main>
  );
};

export default Auth;
