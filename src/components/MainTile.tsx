import React, { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
  noPadding?: boolean;
}

export const MainTile: FunctionComponent<Props> = ({ children, noPadding }) => {
  return (
    <main className="flex min-h-screen flex-col items-center md:my-2">
      <section
        className={`w-full max-w-3xl flex flex-col gap-2 md:rounded-md rounded-b-md bg-indigo-500 bg-opacity-60 ${
          noPadding ? "" : "p-1 sm:p-2"
        }`}
      >
        {children}
      </section>
    </main>
  );
};
