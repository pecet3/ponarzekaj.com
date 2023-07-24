"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Icons } from "../../../components/ui/Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
      <div className="flex flex-col  mt-6 mx-auto bg-slate-400 p-2 rounded-md">
        <h1 className="font-bold mb-2 text-xl">Zaloguj się za pomocą:</h1>
        <button
          type="button"
          className="w-full btn btn-primary"
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
    </main>
  );
};

export default UserAuthForm;
