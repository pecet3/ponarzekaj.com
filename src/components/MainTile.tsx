import React, { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
  paddingBottom?: boolean;
}

export const MainTile: FunctionComponent<Props> = ({
  children,
  paddingBottom,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center md:my-2 ">
      <section
        className={`w-full max-w-3xl flex flex-col gap-2 md:rounded-md rounded-b-md bg-purple-700 shadow-md shadow-indigo-900 ${
          paddingBottom ? "pb-1 sm:pb-2" : "p-1 sm:p-2"
        }`}
      >
        {children}
      </section>
    </main>
  );
};
