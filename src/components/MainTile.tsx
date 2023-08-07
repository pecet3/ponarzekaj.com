import React, { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
}

export const MainTile: FunctionComponent<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full max-w-3xl flex flex-col gap-2 sm:mt-2 sm:rounded-md rounded-b-md bg-indigo-500 bg-opacity-60 p-1 sm:p-2">
        {children}
      </section>
    </main>
  );
};
