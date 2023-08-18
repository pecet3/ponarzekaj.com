"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Icons } from "../../../components/ui/Icons";
import { useSearchParams } from "next/navigation";

const UserAuthForm: React.FunctionComponent = ({}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const firstTime = searchParams.get("first-time");
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col background min-h-screen">
      {!firstTime ? (
        <div className="flex flex-col  mt-6 mx-auto bg-slate-400 p-2 rounded-md">
          <h1 className="font-bold mb-2 text-xl">Zaloguj się za pomocą:</h1>
          <button
            type="button"
            className="rounded-md p-1 text-xl bg-blue-700 text-slate-300 font-semibold hover:bg-sky-700 duration-300 flex justify-center"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.Spinner size={24} className="animate-spin" />
            ) : (
              <Icons.Google size={24} />
            )}
            Google
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-6 mx-auto bg-slate-400 p-2 rounded-md">
          <h1 className="font-bold mb-2 text-xl">Zarejestruj się za pomocą:</h1>
          <p className="text-sm">
            {" "}
            na ten moment to jest jedyna opcja rejestracji
          </p>
          <button
            type="button"
            className="rounded-md p-1 text-xl bg-blue-700 text-slate-300 font-semibold hover:bg-sky-700 duration-300 flex justify-center"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.Spinner size={24} className="animate-spin" />
            ) : (
              <Icons.Google size={24} />
            )}
            Google
          </button>
        </div>
      )}
    </main>
  );
};

export default UserAuthForm;
