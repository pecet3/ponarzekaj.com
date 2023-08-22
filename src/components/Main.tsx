import React, { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
}

export const Main: FunctionComponent<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center md:mx-1 md:my-2 ">
      {children}
    </main>
  );
};
