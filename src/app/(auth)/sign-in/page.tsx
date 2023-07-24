"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";

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
    <div>
      <button
        type="button"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        Google
      </button>
    </div>
  );
};

export default UserAuthForm;
