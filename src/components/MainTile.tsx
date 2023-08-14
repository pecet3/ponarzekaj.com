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
    <main className="flex min-h-screen flex-col items-center sm:my-2 ">
      <section
        className={`w-full max-w-3xl flex flex-col sm:rounded-md bg-transparent sm:bg-slate-800 sm:shadow-lg shadow-gray-800 ${
          paddingBottom ? "" : ""
        }`}
      >
        {children}
      </section>
    </main>
  );
};
